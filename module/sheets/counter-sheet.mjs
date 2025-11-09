import { WastelandersActorSheet } from "./actor-sheet.mjs";

/**
 * Extend the WastelandersActorSheet
 */

export class WastelandersCounterSheet extends WastelandersActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["wastelanders", "sheet", "actor", "counter"],
      width: 400,
      height: 500,
    });
  }
}
