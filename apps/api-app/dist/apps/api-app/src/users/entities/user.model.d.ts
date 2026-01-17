import { BaseModel } from '@common/orm-lib';
export declare class User extends BaseModel {
    static tableName: string;
    name: string;
    email: string;
    password: string;
    role: string;
    is_active: boolean;
    deleted_at?: Date;
    static jsonSchema: {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
            };
            name: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            email: {
                type: string;
                format: string;
                maxLength: number;
            };
            password: {
                type: string;
                minLength: number;
            };
            role: {
                type: string;
                enum: string[];
                default: string;
            };
            is_active: {
                type: string;
                default: boolean;
            };
            created_at: {
                type: string;
                format: string;
            };
            updated_at: {
                type: string;
                format: string;
            };
            deleted_at: {
                type: string[];
                format: string;
            };
        };
    };
    $formatJson(json: any): any;
}
