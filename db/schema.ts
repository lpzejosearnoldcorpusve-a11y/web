import { pgTable, text, serial, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Enum para roles de usuario
export const roleEnum = pgEnum("role", ["admin", "editor", "user"])

// Tabla de usuarios
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").default("user").notNull(),
  activo: text("activo").default("true").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Relaciones
export const usersRelations = relations(users, ({ many }) => ({
  // Aquí puedes agregar más relaciones en el futuro
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
