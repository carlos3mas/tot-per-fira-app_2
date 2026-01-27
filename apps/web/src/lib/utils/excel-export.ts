import * as XLSX from 'xlsx';

interface OrderItem {
  nombre: string;
  unidades: number;
  precio: number | null;
  categoria: string;
}

interface Order {
  id: string;
  nombreCompleto: string;
  correoElectronico: string;
  numeroTelefono: string;
  direccion: string;
  nombrePenya: string | null;
  fechaCreacion: Date;
  totalEstimado: number | null;
  estado: string;
}

export function exportSingleOrderToExcel(order: Order, items: OrderItem[], orderNumber: number = 1) {
  const workbook = XLSX.utils.book_new();
  
  // Calcular subtotal, IVA y total
  const subtotal = items.reduce((sum, item) => {
    return sum + ((item.precio || 0) * item.unidades);
  }, 0);
  const iva = subtotal * 0.21; // 21% IVA
  const total = subtotal + iva;

  // Crear datos para la hoja
  const sheetData: any[][] = [
    ['TOT PER FIRA'],
    [],
    ['Emisor de Factura:', '', '', 'Factura Emitida a:'],
    ['Nombre:', 'Carlos Más Iserte', '', 'Nombre:', order.nombreCompleto],
    ['DNI/CIF:', '53382123-C', '', 'DNI/CIF:', ''],
    ['E-mail:', 'totperfira@gmail.com', '', 'Dirección:', order.direccion],
    ['Dirección:', 'Carretera C/ Faro Miguel Ximeno, 8 1-D, Onda, Castellón. 12200'],
    ['N.º Teléfono:', '618 12 15 97'],
    [],
    ['Fecha:', new Date(order.fechaCreacion).toLocaleDateString('es-ES'), '', `N° Factura: ${String(orderNumber).padStart(3, '0')}`],
    [],
    ['Descripción', 'Cantidad', 'Precio', 'Total'],
  ];

  // Añadir items
  items.forEach(item => {
    const itemTotal = (item.precio || 0) * item.unidades;
    sheetData.push([
      item.nombre,
      item.unidades,
      item.precio ? `${item.precio.toFixed(2)}€` : '-',
      item.precio ? `${itemTotal.toFixed(2)}€` : '-'
    ]);
  });

  // Añadir líneas vacías si hay menos de 3 items
  const emptyRows = Math.max(0, 3 - items.length);
  for (let i = 0; i < emptyRows; i++) {
    sheetData.push(['', '', '', '']);
  }

  // Añadir totales
  sheetData.push(
    ['', '', 'Total', `${subtotal.toFixed(2)}€`],
    ['', '', 'IVA (21%)', `${iva.toFixed(2)}€`],
    ['', '', 'Total', `${total.toFixed(2)}€`]
  );

  // Añadir información de pago
  sheetData.push(
    [],
    ['Información de Pago'],
    ['Fecha de pago:', '', 'Nombre del Banco: N26'],
    ['Titular de la cuenta:', '', 'Numero de la cuenta:'],
    ['Carlos Mas Iserte', '', 'ES1415632626393267355399']
  );

  // Crear hoja
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  // Configurar anchos de columna
  worksheet['!cols'] = [
    { wch: 40 }, // Descripción
    { wch: 12 }, // Cantidad
    { wch: 12 }, // Precio
    { wch: 12 }  // Total
  ];

  // Añadir la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Presupuesto');

  // Generar el archivo
  const fileName = `Presupuesto_${order.nombreCompleto.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

export function exportOrdersToExcel(orders: Order[], orderItems: Map<string, OrderItem[]>) {
  const workbook = XLSX.utils.book_new();

  orders.forEach((order, index) => {
    const items = orderItems.get(order.id) || [];
    
    // Calcular subtotal, IVA y total
    const subtotal = items.reduce((sum, item) => {
      return sum + ((item.precio || 0) * item.unidades);
    }, 0);
    const iva = subtotal * 0.21; // 21% IVA
    const total = subtotal + iva;

    // Crear datos para la hoja
    const sheetData: any[][] = [
      ['TOT PER FIRA'],
      [],
      ['Emisor de Factura:', '', '', 'Factura Emitida a:'],
      ['Nombre:', 'Carlos Más Iserte', '', 'Nombre:', order.nombreCompleto],
      ['DNI/CIF:', '53382123-C', '', 'DNI/CIF:', ''],
      ['E-mail:', 'totperfira@gmail.com', '', 'Dirección:', order.direccion],
      ['Dirección:', 'Carretera C/ Faro Miguel Ximeno, 8 1-D, Onda, Castellón. 12200'],
      ['N.º Teléfono:', '618 12 15 97'],
      [],
      ['Fecha:', new Date(order.fechaCreacion).toLocaleDateString('es-ES'), '', `N° Factura: ${String(index + 1).padStart(3, '0')}`],
      [],
      ['Descripción', 'Cantidad', 'Precio', 'Total'],
    ];

    // Añadir items
    items.forEach(item => {
      const itemTotal = (item.precio || 0) * item.unidades;
      sheetData.push([
        item.nombre,
        item.unidades,
        item.precio ? `${item.precio.toFixed(2)}€` : '-',
        item.precio ? `${itemTotal.toFixed(2)}€` : '-'
      ]);
    });

    // Añadir líneas vacías si hay menos de 3 items
    const emptyRows = Math.max(0, 3 - items.length);
    for (let i = 0; i < emptyRows; i++) {
      sheetData.push(['', '', '', '']);
    }

    // Añadir totales
    sheetData.push(
      ['', '', 'Total', `${subtotal.toFixed(2)}€`],
      ['', '', 'IVA (21%)', `${iva.toFixed(2)}€`],
      ['', '', 'Total', `${total.toFixed(2)}€`]
    );

    // Añadir información de pago
    sheetData.push(
      [],
      ['Información de Pago'],
      ['Fecha de pago:', '', 'Nombre del Banco: N26'],
      ['Titular de la cuenta:', '', 'Numero de la cuenta:'],
      ['Carlos Mas Iserte', '', 'ES1415632626393267355399']
    );

    // Crear hoja
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Configurar anchos de columna
    worksheet['!cols'] = [
      { wch: 40 }, // Descripción
      { wch: 12 }, // Cantidad
      { wch: 12 }, // Precio
      { wch: 12 }  // Total
    ];

    // Añadir la hoja al libro con el nombre del cliente (limitado a 31 caracteres)
    const sheetName = `${order.nombreCompleto.substring(0, 25)}_${String(index + 1).padStart(3, '0')}`;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  // Generar el archivo
  const fileName = `Presupuestos_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
