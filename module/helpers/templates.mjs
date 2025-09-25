/**
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {
  return foundry.applications.handlebars.loadTemplates([
    "systems/wastelanders/templates/actor/parts/attributes.hbs",
    "systems/wastelanders/templates/actor/parts/skills.hbs"
  ]);
};
