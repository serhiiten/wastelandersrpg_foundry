/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class WastelandersItemSheet extends foundry.appv1.sheets.ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["wastelanders", "sheet", "item"],
      width: 450,
      height: 450,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
        },
      ],
    });
  }

  /** @override */
  get template() {
    const sheetTemplate = `systems/wastelanders/templates/item/${this.item.type}-sheet.hbs`;

    return sheetTemplate;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = await super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = {};
    let actor = this.object?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    // Encrich editor content
    context.enrichedDescription = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      this.object.system.description,
      { async: true },
    );

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;
    context.config = CONFIG.WASTELANDERS;

    return context;
  }
}
