import { WastelandersItemSheet } from "./item-sheet.mjs";

/**
 * Extend the basic WastelandersItemSheet
 * @extends {WastelandersItemSheet}
 */
export class WastelandersSpeciesSheet extends WastelandersItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      dragDrop: [
        { dragSelector: ".item", dropSelector: ".species" },
      ],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;
    // Delete linked item
    html.find(".link-delete").click(this._onRemoveLink.bind(this));
  }


  /* -------------------------------------------- */
  /* Handle removing liked item */
  _onRemoveLink(event) {
    const button = event.currentTarget;
    const parent = $(button.parentNode);
    const link = parent.find(".content-link");
    const targetId = link[0].dataset.id;

    const block = button.closest(".linked-items");
    const key = block.dataset.array;
    const path = "system." + key;
    const newArray = this.item.system[key].filter(
      (link) => link.id !== targetId,
    );

    this.item.update({ [path]: newArray });
  }


  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @inheritdoc */
  async _onDrop(event) {
    super._onDrop(event);

    if (!this.isEditable) return;
    const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);

    if (data.type === "Item") {
      this.item._addLinkedItem(data);
    }
  }
}
