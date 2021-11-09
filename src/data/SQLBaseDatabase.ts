import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export abstract class SQLBaseDatabase {

    private static connection: Knex | null = null;

    protected getConnection(): Knex {
        if (!SQLBaseDatabase.connection) {
            SQLBaseDatabase.connection = knex({
                client: 'mysql',
                connection: {
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME,
                    multipleStatements: true
                }
            })
        }
        return SQLBaseDatabase.connection
    }

    public static async destroyConnection(): Promise<void> {
        if (SQLBaseDatabase.connection) {
            await SQLBaseDatabase.connection.destroy();
            SQLBaseDatabase.connection = null;
        }
    }

}