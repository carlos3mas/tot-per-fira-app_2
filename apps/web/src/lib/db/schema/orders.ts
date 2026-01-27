import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  nombreCompleto: text("nombre_completo").notNull(),
  nombrePenya: text("nombre_penya"),
  direccion: text("direccion").notNull().default("sin_direccion"),
  correoElectronico: text("correo_electronico").notNull(),
  numeroTelefono: text("numero_telefono").notNull(),
  segundoNumeroTelefono: text("segundo_numero_telefono"),
  estado: text("estado", {
    enum: ["pendiente", "confirmado", "en_proceso", "completado", "cancelado"]
  }).notNull().default("pendiente"),
  totalEstimado: real("total_estimado"),
  fechaCreacion: integer("fecha_creacion", { mode: "timestamp" }).notNull(),
  fechaActualizacion: integer("fecha_actualizacion", { mode: "timestamp" }).notNull(),
  comentarios: text("comentarios"),
  notas: text("notas"),
});

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  nombre: text("nombre").notNull(),
  unidades: integer("unidades").notNull(),
  precio: real("precio"),
  categoria: text("categoria", {
    enum: ["alcohol", "cervezas", "bebida", "congelador", "hielo", "altavoces", "pack_limpieza", "pack_menaje", "vasos"]
  }).notNull(),
  fechaCreacion: integer("fecha_creacion", { mode: "timestamp" }).notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert; 