/**
 * Lightweight durable JSON file store for serverless-friendly local persistence.
 * Writes under `.data/` when the filesystem is writable; falls back to an
 * in-process Map when the environment is read-only (e.g. some edge/cold hosts).
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");

/** Process-local fallback when `.data` cannot be written. */
const memoryFallback = new Map<string, string>();

export type DbCollection =
  | "submissions"
  | "attestations"
  | "bookings"
  | "licenses";

/** Serialize read-modify-write per collection to avoid lost updates on one instance. */
const writeLocks = new Map<DbCollection, Promise<unknown>>();

function collectionPath(name: DbCollection): string {
  return path.join(DATA_DIR, `${name}.json`);
}

function withCollectionLock<T>(
  name: DbCollection,
  fn: () => Promise<T>,
): Promise<T> {
  const previous = writeLocks.get(name) ?? Promise.resolve();
  const run = previous.then(fn, fn);
  writeLocks.set(
    name,
    run.then(
      () => undefined,
      () => undefined,
    ),
  );
  return run;
}

async function ensureDataDir(): Promise<boolean> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    return true;
  } catch (err) {
    console.warn("[db] Unable to create .data directory — using memory fallback.", err);
    return false;
  }
}

async function readRaw(name: DbCollection): Promise<string | null> {
  try {
    return await readFile(collectionPath(name), "utf8");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") return null;
    console.warn(`[db] Read failed for ${name}; trying memory fallback.`, err);
    return memoryFallback.get(name) ?? null;
  }
}

async function writeRaw(name: DbCollection, json: string): Promise<void> {
  const writable = await ensureDataDir();
  if (!writable) {
    memoryFallback.set(name, json);
    return;
  }
  try {
    await writeFile(collectionPath(name), json, "utf8");
    memoryFallback.set(name, json);
  } catch (err) {
    console.warn(
      `[db] Write failed for ${name} (read-only FS?) — persisting in memory only.`,
      err,
    );
    memoryFallback.set(name, json);
  }
}

export async function readCollection<T extends { id: string }>(
  name: DbCollection,
): Promise<T[]> {
  const raw = await readRaw(name);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err) {
    console.warn(`[db] Corrupt JSON for ${name}; resetting empty.`, err);
    return [];
  }
}

export async function writeCollection<T extends { id: string }>(
  name: DbCollection,
  records: T[],
): Promise<void> {
  await withCollectionLock(name, () =>
    writeRaw(name, JSON.stringify(records, null, 2)),
  );
}

export async function upsertRecord<T extends { id: string }>(
  name: DbCollection,
  record: T,
): Promise<T> {
  return withCollectionLock(name, async () => {
    const records = await readCollection<T>(name);
    const idx = records.findIndex((r) => r.id === record.id);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.push(record);
    }
    await writeRaw(name, JSON.stringify(records, null, 2));
    return record;
  });
}

export async function findRecordById<T extends { id: string }>(
  name: DbCollection,
  id: string,
): Promise<T | undefined> {
  const records = await readCollection<T>(name);
  return records.find((r) => r.id === id);
}

export async function findRecordWhere<T extends { id: string }>(
  name: DbCollection,
  predicate: (record: T) => boolean,
): Promise<T | undefined> {
  const records = await readCollection<T>(name);
  return records.find(predicate);
}
