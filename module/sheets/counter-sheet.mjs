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

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Activation dots
    html.find(".check-description").change(this._onUpdateDesc.bind(this));
  }

  /* -------------------------------------------- */

  async _onUpdateDesc(event) {
    const element = event.currentTarget;
    const index = element.dataset.index;

    const descriptions = this.actor.system.progress.descriptions;
    descriptions[index] = element.value;

    console.log(descriptions);

    await this.actor.update({ "system.progress.descriptions": descriptions });
  }
}
