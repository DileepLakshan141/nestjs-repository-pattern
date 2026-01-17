import { BaseModel } from '@common/orm-lib';

/**
 * User Model
 * Represents a user in the system
 *
 * Inherits from BaseModel:
 * - id: number
 * - created_at: Date
 * - updated_at: Date
 * - Auto timestamps
 * - Snake/Camel case conversion
 */
export class User extends BaseModel {
  // Define table name
  static tableName = 'users';

  // User-specific fields
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  is_active!: boolean;
  deleted_at?: Date;

  // JSON Schema validation (Objection.js feature)
  static jsonSchema = {
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

  // Override to hide password when converting to JSON
  $formatJson(json: any) {
    json = super.$formatJson(json);

    // Never send password to client
    delete json.password;

    return json;
  }
}
