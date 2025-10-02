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
}
