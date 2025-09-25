export default class CaravanData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      description: new fields.HTMLField(),
      notes: new fields.HTMLField(),
    };
  }
}
