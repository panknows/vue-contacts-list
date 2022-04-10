export const TYPES = {
  email: 'email',
  phone: 'phone',
  address: 'address',
};

export class Field {
  constructor(id, type = null) {
    this.id = id;
    this.type = type;
    this.value = null;
  }
}

export function getField(fieldsArray, fieldType = null) {
  const { id = 0, type = fieldType } = fieldsArray.at(-1) || {};
  const newId = id + 1;

  return new Field(newId, type);
}
