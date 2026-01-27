import twilio from 'twilio';

interface OrderNotification {
  orderId: string;
  nombreCompleto: string;
  correoElectronico: string;
  numeroTelefono: string;
  totalEstimado: number | null;
  cantidadProductos: number;
}

export async function sendWhatsAppNotification(orderData: OrderNotification) {
  // Verificar que las variables de entorno estén configuradas
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM; // Formato: whatsapp:+14155238886
  const whatsappTo = process.env.TWILIO_WHATSAPP_TO; // Formato: whatsapp:+34123456789

  if (!accountSid || !authToken || !whatsappFrom || !whatsappTo) {
    console.error('Faltan credenciales de Twilio en las variables de entorno');
    return {
      success: false,
      error: 'Configuración de WhatsApp incompleta'
    };
  }

  try {
    const client = twilio(accountSid, authToken);

    // Crear el mensaje
    const mensaje = `🎉 *NUEVO PRESUPUESTO RECIBIDO* 🎉

📋 *ID:* ${orderData.orderId.substring(0, 12)}...
👤 *Cliente:* ${orderData.nombreCompleto}
📧 *Email:* ${orderData.correoElectronico}
📱 *Teléfono:* ${orderData.numeroTelefono}
📦 *Productos:* ${orderData.cantidadProductos} artículos
${orderData.totalEstimado ? `💰 *Total estimado:* €${orderData.totalEstimado.toFixed(2)}` : ''}

🔗 Revisa el presupuesto en el panel de administrador.`;

    // Enviar el mensaje
    const message = await client.messages.create({
      from: whatsappFrom,
      to: whatsappTo,
      body: mensaje
    });

    console.log('Notificación de WhatsApp enviada:', message.sid);

    return {
      success: true,
      messageSid: message.sid
    };
  } catch (error) {
    console.error('Error enviando notificación de WhatsApp:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}
