export default class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      archetype: new fields.StringField(),
      race: new fields.StringField(),
      concept: new fields.StringField(),
      problem: new fields.StringField(),
      goal: new fields.StringField(),

      hp: new fields.SchemaField({
        value: new fields.NumberField({
          requiredPositiveInteger,
          initial: 15,
        }),
        max: new fields.NumberField({
          requiredPositiveInteger,
          initial: 15,
        }),
      }),

      fate: new fields.SchemaField({
        value: new fields.NumberField({
          requiredPositiveInteger,
          initial: 2,
        }),
        recover: new fields.NumberField({
          requiredPositiveInteger,
          initial: 2,
        }),
      }),

      consequences: new fields.SchemaField({
        light: new fields.StringField(),
        moderate: new fields.StringField(),
        heavy: new fields.StringField(),
      }),

      attributes: new fields.SchemaField({
        strength: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        perception: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        endurance: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        attractiveness: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        dexterity: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        luck: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
      }),

      skills: new fields.SchemaField({
        athletics: new fields.StringField(),
        thievery: new fields.StringField(),
        marksmanship: new fields.StringField(),
        dueling: new fields.StringField(),
        medicine: new fields.StringField(),
        mechanics: new fields.StringField(),
        knowledge: new fields.StringField(),
        survival: new fields.StringField(),
        manipulation: new fields.StringField(),
        intimidation: new fields.StringField(),
      }),

      supplies: new fields.NumberField({
        requiredPositiveInteger,
        initial: 3,
      }),
      caps: new fields.NumberField({
        requiredPositiveInteger,
        initial: 15,
      }),

      description: new fields.HTMLField(),
      notes: new fields.HTMLField(),
    };
  }
}
