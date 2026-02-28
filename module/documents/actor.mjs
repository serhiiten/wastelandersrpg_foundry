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

  /** @override */
  static getDefaultArtwork(actorData) {
    const data = super.getDefaultArtwork(actorData);

    const icons = {
      character: "systems/wastelanders/assets/vault-boy.webp",
      caravan: "systems/wastelanders/assets/cartwheel.png",
      enemy: "systems/wastelanders/assets/daemon-skull.png",
      counter: "systems/wastelanders/assets/time-bomb.png",
    };

    const defaultIcon = icons[actorData.type] || "icons/svg/mystery-man.svg";

    // Set the Default Token Image (Prototype Token)
    data.img = defaultIcon;
    data.texture.src = defaultIcon;

    return data;
  }

  // Add exp options to actor
  async _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);

    if (this.type === "character") {
      this._addExpOptions();
    }

    if (this.type === "counter") {
      this._counterDescriptions();
    }
  }

  // Hook for adding perks
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

    if (game.user.id != userId) return;

    for (const dataItem of data) {
      const item = this.items.get(dataItem._id);

      if (item.type === "perk") {
        this._perkRequirements(item);
        this._updateActorHP();
      } else if (item.type === "feat") {
        this._updateActorHP();
      }
    }
  }

  // Hook for updating perks
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

    if (game.user.id != userId) return;

    for (const changeData of changes) {
      const item = this.items.get(changeData._id);
      if (item.type === "perk") {
        this._perkRequirements(item);
        this._updateActorHP();
      } else if (item.type === "feat") {
        this._updateActorHP();
      }
    }
  }

  /** @inheritdoc */
  _preUpdate(changed, options, user) {
    super._preUpdate(changed, options, user);

    if (game.user.id != user.id) return;

    if (this.type === "character") {
      // Save automatically counted fate points recover before disabling
      if (changed.system.fate?.countAutomatically === false) {
        changed.system.fate = changed.system.fate || {};
        changed.system.fate.recover = this.system.fate.recover;
      }
    }
  }

  /** @inheritdoc */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);

    if (game.user.id != userId) return;

    if (this.type === "counter") {
      if (changed?.system?.progress?.max !== undefined) {
        this._counterDescriptions();
      }
    } else if (this.type === "character") {
      if (
        changed?.system?.attributes !== undefined ||
        changed?.system?.skills !== undefined
      ) {
        for (let i of this.items) {
          if (i.type === "perk") this._perkRequirements(i);
        }
      }
    }
  }

  // Add exp options
  async _addExpOptions() {
    const expOptions = CONFIG.WASTELANDERS.expOptions;
    const localizedOptions = expOptions.map((option) => {
      return {
        ...option,
        name: game.i18n.localize(option.name),
      };
    });
    await this.update({ "system.exp.options": localizedOptions });
  }

  // Make counter description array
  async _counterDescriptions() {
    const progress = this.system.progress;
    const currentLength = progress.descriptions.length;

    if (currentLength < progress.max) {
      const diff = progress.max - currentLength;
      progress.descriptions.push(...Array(diff).fill(""));
    } else if (currentLength > progress.max) {
      progress.descriptions.length = progress.max;
    }

    await this.update({
      "system.progress.descriptions": progress.descriptions,
    });
  }

  // Check if perk meets requirements
  async _perkRequirements(item) {
    const actorData = this.system;
    const itemData = item.system;

    const failed = {
      result: false,
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
      const localizeKey =
        `WASTELANDERS.Actor.Character.${failed.check}.` +
        failed.item.charAt(0).toUpperCase() +
        failed.item.slice(1);
      const localizedItem = game.i18n.localize(localizeKey);
      const notification = game.i18n.format(
        "WASTELANDERS.Actor.Character.FailedPerkCheck",
        {
          perk: item.name,
          requirement: `${localizedItem} ${failed.requirement}`,
        },
      );

      ui.notifications.info(notification);

      await item.update({ "system.notMetRequirements": true });
    } else {
      await item.update({ "system.notMetRequirements": false });
    }
  }

  async _updateActorHP() {
    const toCount = [];

    for (let i of this.items) {
      if (i.type === "feat" || i.type === "perk") {
        toCount.push(i);
      }
    }

    const totalHpBonus = toCount.reduce((sum, item) => {
      const bonus = item?.system?.hpBonus || 0;
      return sum + bonus;
    }, 0);

    await this.update({ "system.hp.perkBonus": totalHpBonus })
  }
}
