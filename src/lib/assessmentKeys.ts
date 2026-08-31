/**
 * Server-only Module 1 answer key. Do not import from Client Components —
 * bundling this file would leak the Cisco-grade preview key into the browser.
 */

import { ASSESSMENT_MODULE_1_SIZE } from "@/src/config/constants";

/** Correct choice id per Module 1 scenario (1–3). */
export const MODULE_1_CORRECT_CHOICE_IDS: Readonly<Record<number, string>> = {
  1: "b",
  2: "b",
  3: "a",
};

export function isModule1ScenarioId(id: number): boolean {
  return Number.isInteger(id) && id >= 1 && id <= ASSESSMENT_MODULE_1_SIZE;
}

export function isCorrectModule1Choice(
  scenarioId: number,
  choiceId: string,
): boolean {
  return MODULE_1_CORRECT_CHOICE_IDS[scenarioId] === choiceId;
}
