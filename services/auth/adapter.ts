import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from "../db/drizzle";
import { sessionTable, userTable } from "../db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export default adapter;
