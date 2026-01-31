import { WastelandersActorSheet } from "./actor-sheet.mjs";

/**
 * Extend the WastelandersActorSheet
 */

export class WastelandersCaravanSheet extends WastelandersActorSheet {
  /** @override */
  async getData() {
    const context = await super.getData();

    // Encrich editor content
    context.enrichedNotes =
      await foundry.applications.ux.TextEditor.implementation.enrichHTML(
        this.object.system.notes,
        {
          async: true,
          secrets: this.actor.isOwner,
        },
      );

    // Add the actor's data to context.data for easier access, as well as flags.
    this._prepareItems(context);

    return context;
  }

  _prepareItems(context) {
    // Initialize containers.
    const upgrades = [];
    const cargo = [];
    const passengers = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to item.
      if (i.type === "upgrade") {
        upgrades.push(i);
      } else if (i.type === "cargo") {
        cargo.push(i);
      } else if (i.type === "passenger") {
        passengers.push(i);
      }
    }

    // Assign and return
    context.upgrades = upgrades;
    context.cargo = cargo;
    context.passengers = passengers;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Activation dots
    html
      .find(".multiple-activation > .value-step")
      .click(this._onDotChange.bind(this));

    // Roll luck
    html.find(".luck-roll").click(this._luckRoll.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle dot counter.
   * @param {Event} the originating click event
   * @private
   */
  async _onDotChange(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    const index = Number(dataset.index);
    const parent = $(element.parentNode);
    const steps = parent.find(".value-step");
    const key = parent[0].dataset.key;

    let value = index + 1;

    const itemElement = $(event.currentTarget).parents(".item");
    const item = this.actor.items.get(itemElement.data("itemId"));

    const nextElement =
      index === steps.length - 1 ||
      !steps[index + 1].classList.contains("active");

    if (element.classList.contains("active") && nextElement) {
      steps.removeClass("active");
      steps.each(function (i) {
        if (i < index) {
          $(this).addClass("active");
        }
      });
      value = index;
    } else {
      steps.removeClass("active");
      steps.each(function (i) {
        if (i <= index) {
          $(this).addClass("active");
        }
      });
    }

    await item.update({ [key]: value });
  }

  async _luckRoll(event) {
    const formula = "1d10+" + this.actor.system.luck;
    const roll = await new Roll(formula).evaluate();
    roll.toMessage();
  }
}
