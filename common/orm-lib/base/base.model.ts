import { Model } from "objection";

export class BaseModel extends Model {
  id!: number;
  created_at!: Date;
  updated_at!: Date;

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  $formatJson(json: any) {
    json = super.$formatJson(json);
    return Object.keys(json).reduce((result: any, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      result[camelKey] = json[key];
      return result;
    }, {});
  }

  $parseDatabaseJson(json: any) {
    json = Object.keys(json).reduce((result: any, key: string) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`,
      );
      result[snakeKey] = json[key];
      return result;
    }, {});
    return super.$parseDatabaseJson(json);
  }
}
