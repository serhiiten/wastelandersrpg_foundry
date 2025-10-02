export class FeatData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      active: new fields.BooleanField({ initial: false }),
      description: new fields.HTMLField(),
    };
  }
}

export class PerkData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };

    return {
      active: new fields.BooleanField({ initial: false }),
      description: new fields.HTMLField(),
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
        athletics: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        thievery: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        marksmanship: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        dueling: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        medicine: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        mechanics: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        knowledge: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        survival: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        manipulation: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
        intimidation: new fields.NumberField({
          requiredInteger,
          initial: 0,
        }),
      }),
    };
  }
}

export class ToolData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      description: new fields.HTMLField(),
    };
  }
}
