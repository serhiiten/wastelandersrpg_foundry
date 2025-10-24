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
  }
}
