import { pgTable, text, jsonb, timestamp, uuid } from "drizzle-orm/pg-core"

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id").notNull(),
  name: text("name").notNull(),
  graph: jsonb("graph").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
})