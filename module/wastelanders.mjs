import * as models from "./data/_module.mjs";
import { WastelandersActor } from "./documents/actor.mjs";
import { WastelandersItem } from "./documents/item.mjs";
import { WastelandersActorSheet } from "./sheets/actor-sheet.mjs";
import { WastelandersCharacterSheet } from "./sheets/character-sheet.mjs";
import { WastelandersCaravanSheet } from "./sheets/caravan-sheet.mjs";
import { WastelandersItemSheet } from "./sheets/item-sheet.mjs";

// Import modules
import {
  preprocessChatMessage,
  renderChatMessage,
} from "./applications/chat-portraits.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { registerHandlebarsHelpers } from "./helpers/handlebars-helpers.mjs";
import { WASTELANDERS } from "./helpers/config.mjs";

Hooks.once("init", async function () {
  game.wastelanders = {
    WastelandersActor,
    WastelandersItem,
  };

  CONFIG.WASTELANDERS = WASTELANDERS;

  // Define custom Entity classes and Data Models
  CONFIG.Actor.documentClass = WastelandersActor;
  CONFIG.Actor.dataModels = {
    character: models.CharacterData,
    caravan: models.CaravanData,
  };

  CONFIG.Item.documentClass = WastelandersItem;
  CONFIG.Item.dataModels = {
    feat: models.FeatData,
    perk: models.PerkData,
    tool: models.WeaponData,
    tool: models.ArmorData,
    tool: models.ToolData,
  };

  // Register sheet application classes
  foundry.documents.collections.Actors.unregisterSheet(
    "core",
    foundry.appv1.sheets.ActorSheet,
  );
  foundry.documents.collections.Actors.registerSheet(
    "wastelanders",
    WastelandersActorSheet,
    { makeDefault: true },
  );
  foundry.documents.collections.Actors.registerSheet(
    "wastelanders",
    WastelandersCharacterSheet,
    {
      types: ["character"],
      makeDefault: true,
    },
  );
  foundry.documents.collections.Actors.registerSheet(
    "wastelanders",
    WastelandersCaravanSheet,
    {
      types: ["caravan"],
      makeDefault: true,
    },
  );

  foundry.documents.collections.Items.unregisterSheet(
    "core",
    foundry.appv1.sheets.ItemSheet,
  );
  foundry.documents.collections.Items.registerSheet(
    "wastelanders",
    WastelandersItemSheet,
    { makeDefault: true },
  );

  registerHandlebarsHelpers();

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

// Preprocess chat message before it is created hook
Hooks.on("preCreateChatMessage", preprocessChatMessage);

// Render chat message hook
Hooks.on("renderChatMessageHTML", renderChatMessage);
