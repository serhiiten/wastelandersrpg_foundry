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

    console.log(this.system.exp);
    await this.update({ "system.exp.options": expOptions });
  }
}
