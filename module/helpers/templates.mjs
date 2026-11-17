/**
 * Partials of the item sheets (the actor sheets load their own).
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return foundry.applications.handlebars.loadTemplates([
    // a perk's requirements (attributes and skills) on the perk item sheet
    "systems/wastelanders/templates/actor/parts/attributes.hbs",
    "systems/wastelanders/templates/actor/parts/skills.hbs",
    "systems/wastelanders/templates/item/parts/linked-item.hbs",
  ]);
};
