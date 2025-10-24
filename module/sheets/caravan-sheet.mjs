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
}
