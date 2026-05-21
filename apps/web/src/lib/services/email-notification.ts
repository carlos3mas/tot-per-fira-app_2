import nodemailer from "nodemailer";

interface OrderNotification {
  orderId: string;
  nombreCompleto: string;
  nombrePenya?: string;
  correoElectronico: string;
  numeroTelefono: string;
  totalEstimado: number | null;
  cantidadProductos: number;
  tipoEvento?: string;
  localizacionEvento?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00").toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function sendEmailNotification(orderData: OrderNotification) {
  const user = process.env.NOTIFY_EMAIL_USER;
  const pass = process.env.NOTIFY_EMAIL_PASS;
  const to = process.env.NOTIFY_EMAIL_TO || user;

  if (!user || !pass) {
    console.error("Faltan credenciales de email (NOTIFY_EMAIL_USER / NOTIFY_EMAIL_PASS)");
    return { success: false, error: "Configuración de email incompleta" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const fechaInicioStr = formatDate(orderData.fechaInicio);
  const fechaFinStr = formatDate(orderData.fechaFin);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="background: #7c3aed; color: white; padding: 20px 24px; border-radius: 6px 6px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">🎉 Nuevo presupuesto recibido</h1>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 6px 6px;">
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">ID del pedido</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">${orderData.orderId.substring(0, 16)}...</td>
          </tr>
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Cliente</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">${orderData.nombreCompleto}</td>
          </tr>
          ${orderData.nombrePenya ? `
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Penya</td>
            <td style="padding: 8px 0; font-size: 14px;">${orderData.nombrePenya}</td>
          </tr>` : ""}
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 8px 0; font-size: 14px;">${orderData.correoElectronico}</td>
          </tr>
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Teléfono</td>
            <td style="padding: 8px 0; font-size: 14px;">${orderData.numeroTelefono}</td>
          </tr>
          ${orderData.tipoEvento ? `
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Tipo de evento</td>
            <td style="padding: 8px 0; font-size: 14px;">${orderData.tipoEvento}</td>
          </tr>` : ""}
          ${orderData.localizacionEvento ? `
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Localización</td>
            <td style="padding: 8px 0; font-size: 14px;">${orderData.localizacionEvento}</td>
          </tr>` : ""}
          ${fechaInicioStr ? `
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Fecha inicio</td>
            <td style="padding: 8px 0; font-size: 14px;">${fechaInicioStr}</td>
          </tr>` : ""}
          ${fechaFinStr ? `
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Fecha fin</td>
            <td style="padding: 8px 0; font-size: 14px;">${fechaFinStr}</td>
          </tr>` : ""}
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Productos</td>
            <td style="padding: 8px 0; font-size: 14px;">${orderData.cantidadProductos} artículos</td>
          </tr>
          ${orderData.totalEstimado ? `
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Total estimado</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 18px; color: #7c3aed;">€${orderData.totalEstimado.toFixed(2)}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://totperfira.es/admin/consultar-presupuesto" style="background: #7c3aed; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Ver en el panel de administrador
          </a>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Tot per Fira" <${user}>`,
      to,
      subject: `🎉 Nuevo presupuesto de ${orderData.nombrePenya || orderData.nombreCompleto}`,
      html,
    });

    console.log("Notificación de email enviada correctamente");
    return { success: true };
  } catch (error) {
    console.error("Error enviando notificación de email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}
