export interface LineaPresupuesto {
  nombre: string;
  unidades: number;
  precio?: number;
  categoria: 'alcohol' | 'cervezas' | 'bebida' | 'congelador' | 'hielo' | 'altavoces' | 'pack_limpieza' | 'pack_menaje' | 'vasos';
}

export interface Presupuesto {
  nombreCompleto: string;
  correoElectronico: string;
  numeroTelefono: string;
  direccion: string;
  objetosPedido: LineaPresupuesto[];
  nombrePenya?: string;
  segundoNumeroTelefono?: string;
  comentarios?: string;
} 