import { WastelandersActorSheet } from "./actor-sheet.mjs";

/**
 * Extend the WastelandersActorSheet
 */

export class WastelandersCharacterSheet extends WastelandersActorSheet {
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
    const feats = [];
    const perks = [];
    const weapons = [];
    const armors = [];
    const tools = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to item.
      if (i.type === "feat") {
        feats.push(i);
      } else if (i.type === "perk") {
        perks.push(i);
      } else if (i.type === "weapon") {
        weapons.push(i);
      } else if (i.type === "armor") {
        armors.push(i);
      } else if (i.type === "tool") {
        tools.push(i);
      }
    }

    // Assign and return
    context.feats = feats;
    context.perks = perks;
    context.weapons = weapons;
    context.armors = armors;
    context.tools = tools;
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
    const arrayIndex = parent[0].dataset.arrayIndex;

    let value = index + 1;

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

    const array = this.actor.system.exp.options;
    array[arrayIndex].active = value;
    await this.actor.update({ "system.exp.options" : array });
  }
}
