import { DataSource } from "typeorm";
import { Book } from "./entities/Book.js";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./env.js";

export const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Book],
  migrations: [],
  subscribers: [],
});

export async function initializeDataSource(): Promise<void> {
  console.log(`Initializing database connection to ${DB_HOST}:${DB_PORT}...`);
  await dataSource.initialize();
  const result: unknown = await dataSource.manager.query("SELECT NOW()");
  console.log("Database connection established: ", result);
}
