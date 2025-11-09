/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class WastelandersActor extends Actor {
  /** @inheritdoc */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    const prototypeToken = {
      actorLink: true,
      disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
      displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    };

    this.updateSource({ prototypeToken });
  }

  async _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);

    if (this.type != "character") return;

    const expOptions = [
      {
        name: game.i18n.localize(
          "WASTELANDERS.Actor.Character.Experience.NewPerk",
        ),
      },
      {
        name: game.i18n.localize(
          "WASTELANDERS.Actor.Character.Experience.LearnSkill",
        ),
      },
      {
        name: game.i18n.localize(
          "WASTELANDERS.Actor.Character.Experience.SkillToJourneyman",
        ),
        max: 2,
      },
      {
        name: game.i18n.localize(
          "WASTELANDERS.Actor.Character.Experience.SkillToMaster",
        ),
        price: 15,
        max: 1,
      },
      {
        name: game.i18n.localize(
          "WASTELANDERS.Actor.Character.Experience.AttributeToPlus2",
        ),
      },
      {
        name: game.i18n.localize(
          "WASTELANDERS.Actor.Character.Experience.AttributeToPlus3",
        ),
        price: 15,
        max: 2,
      },
      {
        name: game.i18n.localize(
          "WASTELANDERS.Actor.Character.Experience.AttributeToPlus4",
        ),
        price: 20,
        max: 1,
      },
    ];

    await this.update({ "system.exp.options": expOptions });
  }

  _onCreateDescendantDocuments(
    parent,
    collection,
    documents,
    data,
    options,
    userId,
  ) {
    super._onCreateDescendantDocuments(
      parent,
      collection,
      documents,
      data,
      options,
      userId,
    );

    if (game.user.id === userId) {
      for (const dataItem of data) {
        if (dataItem.type != "perk") return
        this._perkRequirements(dataItem);
      }
    }
  }

  _onUpdateDescendantDocuments(
    parent,
    collection,
    documents,
    changes,
    options,
    userId,
  ) {
    super._onUpdateDescendantDocuments(
      parent,
      collection,
      documents,
      changes,
      options,
      userId,
    );

    if (game.user.id === userId) {
      for (const changeData of changes) {
        const item = this.items.get(changeData._id);
        if (item.type != "perk") return
        this._perkRequirements(item);
      }
    }
  }

  async _perkRequirements(item) {
    const actorData = this.system;
    const itemData = item.system;

    if (!itemData.active) return

    const failed = {
      result: false
    };

    for (const key in itemData.attributes) {
      const requirement = itemData.attributes[key];
      const actorValue = actorData.attributes[key];

      if (!requirement || requirement === 0) continue;

      if (!actorValue || actorValue < requirement) {
        failed.result = true;
        failed.check = "Attribute";
        failed.item = key;
        failed.requirement = requirement;
        break;
      }
    }

    if (!failed.result) {
      for (const key in itemData.skills) {
        const requirement = itemData.skills[key];
        const actorValue = actorData.skills[key];

        if (!requirement || requirement === 0) continue;

        if (!actorValue || actorValue < requirement) {
          failed.result = true;
          failed.check = "Skill";
          failed.item = key;
          failed.requirement = requirement;
          break;
        }
      }
    }

    if (failed.result) {
      const localizeKey = `WASTELANDERS.Actor.Character.${failed.check}.` + failed.item.charAt(0).toUpperCase() + failed.item.slice(1);
      const localizedItem = game.i18n.localize(localizeKey);
      const notification = game.i18n.format(
        "WASTELANDERS.Actor.Character.FailedPerkCheck",
        {
          perk: item.name,
          requirement: `${localizedItem} ${failed.requirement}`
        }
      )

      ui.notifications.info(notification);
      await item.update({ "system.active" : false })
    }
  }
}
