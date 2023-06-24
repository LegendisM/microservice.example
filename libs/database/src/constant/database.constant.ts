import { DatabaseType } from "typeorm";
import { Database } from "../interface/database.interface";

export const DATABASE_CONFIG: Record<Database, { type: DatabaseType, env: string, }> = {
    primary: {
        type: 'postgres',
        env: 'PRIMARY',

    },
    secondary: {
        type: 'postgres',
        env: 'SECONDARY'
    }
};