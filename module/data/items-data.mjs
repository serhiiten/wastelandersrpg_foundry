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

    return {
      active: new fields.BooleanField({ initial: false }),
      description: new fields.HTMLField(),
      attributes: new fields.SchemaField({
        strength: new fields.NumberField({
          integer: true
        }),
        perception: new fields.NumberField({
          integer: true
        }),
        endurance: new fields.NumberField({
          integer: true
        }),
        attractiveness: new fields.NumberField({
          integer: true
        }),
        intelligence: new fields.NumberField({
          integer: true
        }),
        dexterity: new fields.NumberField({
          integer: true
        }),
        luck: new fields.NumberField({
          integer: true
        }),
      }),
      skills: new fields.SchemaField({
        athletics: new fields.NumberField({
          integer: true
        }),
        thievery: new fields.NumberField({
          integer: true
        }),
        marksmanship: new fields.NumberField({
          integer: true
        }),
        dueling: new fields.NumberField({
          integer: true
        }),
        medicine: new fields.NumberField({
          integer: true
        }),
        mechanics: new fields.NumberField({
          integer: true
        }),
        knowledge: new fields.NumberField({
          integer: true
        }),
        survival: new fields.NumberField({
          integer: true
        }),
        manipulation: new fields.NumberField({
          integer: true
        }),
        intimidation: new fields.NumberField({
          integer: true
        }),
      }),
    };
  }
}

export class WeaponData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      description: new fields.HTMLField(),
      price: new fields.NumberField({
        requiredPositiveInteger,
        initial: 0,
      }),
      damage: new fields.StringField(),
    };
  }
}

export class ArmorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      description: new fields.HTMLField(),
      price: new fields.NumberField({
        requiredPositiveInteger,
        initial: 0,
      }),
      protection: new fields.NumberField({
        requiredPositiveInteger,
        initial: 0,
      }),
    };
  }
}

export class ToolData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      description: new fields.HTMLField(),
      price: new fields.NumberField({
        requiredPositiveInteger,
        initial: 0,
      }),
    };
  }
}

export class UpgradeData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      description: new fields.HTMLField(),
      active: new fields.SchemaField({
        value: new fields.NumberField({
          requiredPositiveInteger,
          initial: 0,
        }),
        max: new fields.NumberField({
          requiredPositiveInteger,
          initial: 1,
        }),
      }),
    };
  }
}

export class CargoData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      description: new fields.HTMLField(),
      price: new fields.NumberField({
        requiredPositiveInteger,
        initial: 0,
      }),
      quantity: new fields.NumberField({
        requiredPositiveInteger,
        initial: 1,
      }),
    };
  }
}

export class PassengerData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      description: new fields.HTMLField(),
    };
  }
}
