"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const objection_1 = require("objection");
class BaseModel extends objection_1.Model {
    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    $beforeUpdate() {
        this.updated_at = new Date();
    }
    $formatJson(json) {
        json = super.$formatJson(json);
        return Object.keys(json).reduce((result, key) => {
            const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            result[camelKey] = json[key];
            return result;
        }, {});
    }
    $parseDatabaseJson(json) {
        json = Object.keys(json).reduce((result, key) => {
            const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            result[snakeKey] = json[key];
            return result;
        }, {});
        return super.$parseDatabaseJson(json);
    }
}
exports.BaseModel = BaseModel;
