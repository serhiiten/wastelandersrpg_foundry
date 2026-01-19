import { WastelandersActorSheet } from "./actor-sheet.mjs";

/**
 * Extend the WastelandersActorSheet
 */

export class WastelandersEnemySheet extends WastelandersActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["wastelanders", "sheet", "actor", "enemy"],
      width: 450,
      height: 600,
    });
  }

  /** @override */
  async getData() {
    const context = await super.getData();

    // Add the actor's data to context.data for easier access, as well as flags.
    this._prepareItems(context);

    return context;
  }

  _prepareItems(context) {
    // Initialize containers.
    const attacks = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to item.
      if (i.type === "attack") {
        attacks.push(i);
      }
    }

    // Assign and return
    context.attacks = attacks;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Roll dice
    html.find(".damage-roll").click(this._onDamageRoll.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle damage rolls.
   * @param {Event} the originating click event
   * @private
   */
  async _onDamageRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const damage = element.dataset.formula;

    if (!damage) return;

    const roll = await new Roll(damage).evaluate();
    roll.toMessage();
  }
}
