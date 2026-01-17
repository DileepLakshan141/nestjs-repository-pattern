import { Model } from "objection";
export declare class BaseModel extends Model {
    id: number;
    created_at: Date;
    updated_at: Date;
    $beforeInsert(): void;
    $beforeUpdate(): void;
    $formatJson(json: any): any;
    $parseDatabaseJson(json: any): import("objection").Pojo;
}
