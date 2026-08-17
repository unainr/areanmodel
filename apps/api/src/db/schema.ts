// db/schema.ts
import { pgTable, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["buyer", "seller"]);

// ---------------- PROPERTIES (seller only) ----------------
export const properties = pgTable("properties", {
  id: text("id").primaryKey(), // e.g. crypto.randomUUID()
  sellerId: text("seller_id").notNull(), // clerk userId
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------------- PROPERTY IMAGES ----------------
export const propertyImages = pgTable("property_images", {
  id: text("id").primaryKey(),
  propertyId: text("property_id").notNull().references(() => properties.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------------- MESSAGES (buyer <-> seller) ----------------
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  propertyId: text("property_id").notNull().references(() => properties.id),
  senderId: text("sender_id").notNull(), // clerk userId
  receiverId: text("receiver_id").notNull(), // clerk userId
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------------- TYPES ----------------
export type Property = InferSelectModel<typeof properties>;
export type NewProperty = InferInsertModel<typeof properties>;

export type PropertyImage = InferSelectModel<typeof propertyImages>;
export type NewPropertyImage = InferInsertModel<typeof propertyImages>;

export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>;