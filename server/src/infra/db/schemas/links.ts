import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable('links', {
    id: text('id').primaryKey().$defaultFn(() => uuidv7()),
    originalLink: text('original_link').notNull(),
    shortLink: text('short_link').notNull(),
    hits: integer('hits').notNull().default(0),
    remoteKey: text('remote_key').notNull().unique(),
    remoteUrl: text('remote_url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})