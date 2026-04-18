//
/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class WastelandersItem extends Item {
  prepareData() {
    super.prepareData();
  }

  /**
   * Handle clickable show description.
   * @param {Event} event   The originating click event
   * @private
   */
  async show() {
    const item = this;

    const renderData = {
      name: item.name,
      type: game.i18n.localize("TYPES.Item." + item.type),
      description: item.system.description,
    };

    const message = await foundry.applications.handlebars.renderTemplate(
      "systems/wastelanders/templates/apps/rollItem.hbs",
      renderData,
    );
    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: message,
    };
    ChatMessage.create(chatData);
  }


  // Handle adding another items in container
  async _addLinkedItem(data) {
    const item = await fromUuid(data.uuid);
    const supported = CONFIG.WASTELANDERS.supportedLinks[this.type];
    const key = supported[item.type];

    const localizeType = game.i18n.localize("TYPES.Item." + item.type);
    if (!key) {
      return ui.notifications.warn(
        game.i18n.format("WASTELANDERS.Errors.Item.NotSupported", {
          item: item.name,
          type: localizeType,
        }),
      );
    }

    const container = this.system[key];
    console.log(this)
    console.log(container)
    const idExist = container.some(
      (existingItem) => existingItem.id === item.id,
    );
    const nameExist = container.some(
      (existingItem) => existingItem.name === item.name,
    );

    if (idExist) {
      return ui.notifications.error(
        game.i18n.localize("BITD.Errors.Item.ExistsId"),
      );
    } else if (nameExist) {
      ui.notifications.warn(game.i18n.localize("BITD.Errors.Item.ExistsName"));
    }

    const path = "system." + key;
    const link = {
      id: item.id,
      uuid: item.uuid,
      type: item.type,
      name: item.name,
      title: game.i18n.localize("TYPES.Item." + item.type),
      docType: "Item",
    };
    container.push(link);
    await this.update({ [path]: container });
    console.log(this)
  }
}
