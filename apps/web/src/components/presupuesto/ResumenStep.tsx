"use client";

import Button from "@/components/ui/retro-btn";
import { CheckCircle, Send } from "lucide-react";
import { type Presupuesto } from "@/types/presupuesto";

import { Textarea } from "@/components/ui/textarea";

interface ResumenStepProps {
  presupuesto: Presupuesto;
  onEnviar: () => void;
  puedeEnviar: boolean;
  isLoading?: boolean;
  onUpdate: (data: Partial<Presupuesto>) => void;
}

export default function ResumenStep({ presupuesto, onEnviar, puedeEnviar, isLoading = false, onUpdate }: ResumenStepProps) {
  const calcularTotal = () => {
    return presupuesto.objetosPedido.reduce((total, producto) => {
      return total + (producto.precio ? producto.precio * producto.unidades : 0);
    }, 0);
  };

  const productosAgrupados = presupuesto.objetosPedido.reduce((grupos, producto) => {
    if (!grupos[producto.categoria]) {
      grupos[producto.categoria] = [];
    }
    grupos[producto.categoria].push(producto);
    return grupos;
  }, {} as Record<string, typeof presupuesto.objetosPedido>);

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      alcohol: 'Alcohol',
      cervezas: 'Cervezas',
      bebida: 'Bebidas no alcohólicas',
      congelador: 'Congeladores',
      hielo: 'Hielo',
      altavoces: 'Altavoces',
      pack_limpieza: 'Packs de Limpieza',
      pack_menaje: 'Packs de Menaje'
    };
    return labels[categoria] || categoria;
  };

  return (
    <div className="space-y-0">
      {/* Información Personal */}
      <div className="border-b border-gray-300 bg-[var(--complementary-color-pink)]/10 p-4">
        <h3 className="text-xl md:text-2xl font-bold font-khand text-[var(--secondary-color)]">
          Información Personal
        </h3>
      </div>
      <div className="border-b border-gray-300 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-bold font-clash-display text-[var(--primary-color)] text-sm block mb-2">Nombre</span>
            <div className="p-3 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50">
              <p className="text-[var(--secondary-color)] font-clash-display text-sm font-bold">{presupuesto.nombreCompleto}</p>
            </div>
          </div>
          
          {presupuesto.nombrePenya && (
            <div>
              <span className="font-bold font-clash-display text-[var(--primary-color)] text-sm block mb-2">Nombre de Peña</span>
              <div className="p-3 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50">
                <p className="text-[var(--secondary-color)] font-clash-display text-sm font-bold">{presupuesto.nombrePenya}</p>
              </div>
            </div>
          )}

          <div>
            <span className="font-bold font-clash-display text-[var(--primary-color)] text-sm block mb-2">Email</span>
            <div className="p-3 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50">
              <p className="text-[var(--secondary-color)] font-clash-display text-sm font-bold">{presupuesto.correoElectronico}</p>
            </div>
          </div>

          <div>
            <span className="font-bold font-clash-display text-[var(--primary-color)] text-sm block mb-2">Teléfono Principal</span>
            <div className="p-3 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50">
              <p className="text-[var(--secondary-color)] font-clash-display text-sm font-bold">{presupuesto.numeroTelefono}</p>
            </div>
          </div>

          {presupuesto.segundoNumeroTelefono && (
            <div>
              <span className="font-bold font-clash-display text-[var(--primary-color)] text-sm block mb-2">Segundo Teléfono</span>
              <div className="p-3 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50">
                <p className="text-[var(--secondary-color)] font-clash-display text-sm font-bold">{presupuesto.segundoNumeroTelefono}</p>
              </div>
            </div>
          )}

          <div>
            <span className="font-bold font-clash-display text-[var(--primary-color)] text-sm block mb-2">Dirección de Entrega</span>
            <div className="p-3 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50">
              <p className="text-[var(--secondary-color)] font-clash-display text-sm font-bold">{presupuesto.direccion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Productos Seleccionados */}
      <div className="border-b border-gray-300 bg-[var(--complementary-color-pink)]/10 p-4">
        <h3 className="text-xl md:text-2xl font-bold font-khand text-[var(--secondary-color)]">
          Productos Seleccionados - Total Unidades: {presupuesto.objetosPedido.reduce((total, producto) => total + producto.unidades, 0)}
        </h3>
      </div>
      <div className="border-b border-gray-300 p-4">
        {Object.keys(productosAgrupados).length === 0 ? (
          <div className="text-center py-6 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50">
            <p className="font-clash-display text-[var(--secondary-color)] text-base">No se han añadido productos al presupuesto</p>
            <p className="text-sm mt-1 font-clash-display text-gray-600">Vuelve a los pasos anteriores para añadir productos</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(productosAgrupados).map(([categoria, productos]) => (
              <div key={categoria}>
                <h4 className="font-bold text-lg mb-2 font-khand text-[var(--primary-color)]">
                  {getCategoriaLabel(categoria)}
                </h4>
                <div className="space-y-2">
                  {productos.map((producto, index) => (
                    <div
                      key={`${producto.nombre}-${index}`}
                      className="flex justify-between items-center p-3 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold font-clash-display text-[var(--secondary-color)] text-sm">{producto.nombre}</span>
                        <span className="text-[var(--primary-color)] font-clash-display text-sm">x{producto.unidades}</span>
                      </div>
                      {producto.precio && (
                        <span className="font-bold font-clash-display text-[var(--primary-color)] text-base">
                          €{(producto.precio * producto.unidades).toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total */}
      {calcularTotal() > 0 && (
        <>
          <div className="border-b border-gray-300 bg-[var(--complementary-color-pink)]/10 p-4">
            <h3 className="text-xl md:text-2xl font-bold font-khand text-[var(--secondary-color)]">Total Estimado</h3>
          </div>
          <div className="border-b border-gray-300 p-4">
            <div className="flex justify-between items-center text-xl md:text-2xl font-bold font-khand">
              <span className="text-[var(--secondary-color)]">Total:</span>
              <span className="text-[var(--primary-color)]">€{calcularTotal().toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 font-clash-display">
              *Este es un precio estimado. El precio final puede variar según disponibilidad y condiciones específicas.
            </p>
          </div>
        </>
      )}

      {/* Comentarios Adicionales */}
      <div className="border-b border-gray-300 bg-[var(--complementary-color-pink)]/10 p-4">
        <h3 className="text-xl md:text-2xl font-bold font-khand text-[var(--secondary-color)]">
          Comentarios Adicionales
        </h3>
      </div>
      <div className="border-b border-gray-300 p-4">
        <label htmlFor="comentarios" className="font-bold font-clash-display text-[var(--primary-color)] text-sm block mb-2">
          ¿Hay algo más que debamos tener en cuenta?
        </label>
        <Textarea
          id="comentarios"
          placeholder="Ej: Horario preferente de entrega, detalles sobre el acceso al local, etc."
          value={presupuesto.comentarios || ""}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onUpdate({ comentarios: e.target.value })}
          className="min-h-[100px] border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] bg-gray-50 font-clash-display rounded-none focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all p-3"
        />
      </div>
    </div>
  );
} 