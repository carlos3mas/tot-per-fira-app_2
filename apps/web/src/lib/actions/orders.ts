"use server";

import { z } from "zod";
import { createOrderInDB, getOrderByIdFromDB, getAllOrdersFromDB, getAllOrdersWithItemsFromDB, updateOrderStatusInDB } from "@/lib/db/orders";
import { type Presupuesto } from "@/types/presupuesto";
import { sendWhatsAppNotification } from "@/lib/services/whatsapp-notification";

const createOrderSchema = z.object({
  nombreCompleto: z.string().min(1, "El nombre es obligatorio"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  correoElectronico: z.string().email("Email inválido"),
  numeroTelefono: z.string().min(1, "El teléfono es obligatorio"),
  segundoNumeroTelefono: z.string().optional(),
  nombrePenya: z.string().optional(),
  comentarios: z.string().optional(),
  objetosPedido: z.array(z.object({
    nombre: z.string(),
    unidades: z.number().min(1),
    precio: z.number().optional(),
    categoria: z.enum(["alcohol", "cervezas", "bebida", "congelador", "hielo", "altavoces", "pack_limpieza", "pack_menaje", "vasos"])
  })).min(1, "Debe incluir al menos un producto")
});

export async function createOrder(presupuesto: Presupuesto) {
  try {
    // Validar los datos
    const validatedData = createOrderSchema.parse(presupuesto);

    // Crear el pedido en la base de datos
    const result = await createOrderInDB(validatedData);

    // Enviar notificación de WhatsApp (no bloqueante)
    sendWhatsAppNotification({
      orderId: result.orderId,
      nombreCompleto: validatedData.nombreCompleto,
      correoElectronico: validatedData.correoElectronico,
      numeroTelefono: validatedData.numeroTelefono,
      totalEstimado: result.totalEstimado,
      cantidadProductos: validatedData.objetosPedido.length
    }).catch(error => {
      // Log del error pero no fallar la creación del pedido
      console.error('Error enviando notificación de WhatsApp:', error);
    });

    return {
      success: true,
      data: {
        orderId: result.orderId,
        totalEstimado: result.totalEstimado,
        message: "Pedido creado exitosamente"
      }
    };

  } catch (error) {

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Datos inválidos: " + error.message
      };
    }

    return {
      success: false,
      error: "Error interno del servidor"
    };
  }
}

export async function getOrderById(orderId: string) {
  try {
    const result = await getOrderByIdFromDB(orderId);

    if (!result) {
      return {
        success: false,
        error: "Pedido no encontrado"
      };
    }

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      success: false,
      error: "Error al obtener el pedido"
    };
  }
}

export async function getAllOrders() {
  try {
    const orders = await getAllOrdersFromDB();

    return {
      success: true,
      data: orders
    };
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return {
      success: false,
      error: "Error al obtener los pedidos"
    };
  }
}

export async function getAllOrdersWithItems() {
  try {
    const data = await getAllOrdersWithItemsFromDB();

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("Error fetching all orders with items:", error);
    return {
      success: false,
      error: "Error al obtener los pedidos con items"
    };
  }
}

export async function updateOrderStatus(orderId: string, newStatus: "pendiente" | "confirmado" | "en_proceso" | "completado" | "cancelado") {
  try {
    await updateOrderStatusInDB(orderId, newStatus);

    return {
      success: true,
      message: "Estado actualizado correctamente"
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false,
      error: "Error al actualizar el estado del pedido"
    };
  }
}