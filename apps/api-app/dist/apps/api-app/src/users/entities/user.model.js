"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const orm_lib_1 = require("../../../../../common/orm-lib");
class User extends orm_lib_1.BaseModel {
    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }
}
exports.User = User;
User.tableName = 'users';
User.jsonSchema = {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
        id: { type: 'integer' },
        name: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
        },
        email: {
            type: 'string',
            format: 'email',
            maxLength: 255,
        },
        password: {
            type: 'string',
            minLength: 6,
        },
        role: {
            type: 'string',
            enum: ['user', 'admin', 'moderator'],
            default: 'user',
        },
        is_active: {
            type: 'boolean',
            default: true,
        },
        created_at: {
            type: 'string',
            format: 'date-time',
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
        },
        deleted_at: {
            type: ['string', 'null'],
            format: 'date-time',
        },
    },
};
//# sourceMappingURL=user.model.js.map