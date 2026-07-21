import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const cardKeys = pgTable("card_keys", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  type: text("type").notNull(),
  userId: integer("user_id"),
  expiresAt: timestamp("expires_at"),
  activatedAt: timestamp("activated_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  note: text("note"),
});
