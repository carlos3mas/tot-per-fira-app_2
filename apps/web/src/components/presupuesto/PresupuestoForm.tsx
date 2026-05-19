"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Send, Info, Loader2 } from "lucide-react";
import { createOrder } from "@/lib/actions/orders";

import Button from "@/components/ui/retro-btn";
import PersonalInfoStep from "./PersonalInfoStep";
import BebidasStep from "./BebidasStep";
import CongeladorHielosStep from "./CongeladorHielosStep";
import AltavocesStep from "./AltavocesStep";
import PackLimpiezaStep from "./PackLimpiezaStep";
import PackMenajeStep from "./PackMenajeStep";
import ResumenStep from "./ResumenStep";
import CartModal from "./CartModal";
import CartBar from "./CartBar";
import PackInfoModal from "./PackInfoModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type Presupuesto, type LineaPresupuesto } from "@/types/presupuesto";

const PASOS = [
  { id: 1, titulo: "Información de Contacto", required: true },
  { id: 2, titulo: "Altavoces", required: false },
  { id: 3, titulo: "Congelador y Hielos", required: false },
  { id: 4, titulo: "Bebidas", required: false },
  { id: 5, titulo: "Pack Limpieza", required: false },
  { id: 6, titulo: "Pack Menaje", required: false },
  { id: 7, titulo: "Resumen", required: true },
];

const personalInfoSchema = z.object({
  nombreCompleto: z.string().min(1, "El nombre es obligatorio"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  correoElectronico: z.string().email("Introduce un email válido"),
  numeroTelefono: z.string().min(1, "El teléfono es obligatorio"),
  segundoNumeroTelefono: z.string(),
  nombrePenya: z.string(),
});

export default function PresupuestoForm() {
  const router = useRouter();
  const [pasoActual, setPasoActual] = useState(1);
  const [presupuesto, setPresupuesto] = useState<Presupuesto>({
    nombreCompleto: "",
    direccion: "",
    correoElectronico: "",
    numeroTelefono: "",
    objetosPedido: [],
    nombrePenya: "",
    segundoNumeroTelefono: "",
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPackInfoOpen, setIsPackInfoOpen] = useState(false);
  const [packInfoType, setPackInfoType] = useState<'limpieza' | 'menaje'>('limpieza');
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      nombreCompleto: presupuesto.nombreCompleto,
      direccion: presupuesto.direccion,
      correoElectronico: presupuesto.correoElectronico,
      numeroTelefono: presupuesto.numeroTelefono,
      nombrePenya: presupuesto.nombrePenya || "",
      segundoNumeroTelefono: presupuesto.segundoNumeroTelefono || "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:");
    },
    validators: {
      onChange: personalInfoSchema,
    },
  });

  const actualizarPresupuesto = (datos: Partial<Presupuesto>) => {
    setPresupuesto(prev => ({ ...prev, ...datos }));
  };

  const añadirProducto = (producto: LineaPresupuesto) => {
    setPresupuesto(prev => ({
      ...prev,
      objetosPedido: [...prev.objetosPedido, producto]
    }));
    toast.success(`${producto.nombre} añadido al carrito`);
  };

  const eliminarProducto = (productoAEliminar: LineaPresupuesto) => {
    setPresupuesto(prev => ({
      ...prev,
      objetosPedido: prev.objetosPedido.filter(
        (item, index) => !(
          item.nombre === productoAEliminar.nombre &&
          item.categoria === productoAEliminar.categoria &&
          index === prev.objetosPedido.findIndex(p => 
            p.nombre === productoAEliminar.nombre && 
            p.categoria === productoAEliminar.categoria
          )
        )
      )
    }));
    toast.success(`${productoAEliminar.nombre} eliminado del carrito`);
  };

  const puedeAvanzar = () => {
    // Si estamos en el paso de información personal, validar que esté completa
    if (pasoActual === 1) {
      return presupuesto.nombreCompleto.trim() !== '' &&
             presupuesto.direccion.trim() !== '' &&
             presupuesto.correoElectronico.trim() !== '' &&
             presupuesto.numeroTelefono.trim() !== '';
    }
    // Para otros pasos, siempre se puede avanzar
    return true;
  };

  const siguientePaso = () => {
    if (pasoActual < PASOS.length && puedeAvanzar()) {
      setPasoActual(pasoActual + 1);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };

  const puedeEnviar = () => {
    const infoCompleta = presupuesto.nombreCompleto && 
                        presupuesto.direccion &&
                        presupuesto.correoElectronico && 
                        presupuesto.numeroTelefono;
    const tieneProductos = presupuesto.objetosPedido.length > 0;
    
    return infoCompleta && tieneProductos;
  };

  const enviarPresupuesto = () => {
    if (!puedeEnviar()) {
      toast.error("Complete la información requerida y añada al menos un producto");
      return;
    }

    startTransition(async () => {
      try {
        const presupuestoToSend = {
          ...presupuesto,
          segundoNumeroTelefono: presupuesto.segundoNumeroTelefono?.trim() === "" ? undefined : presupuesto.segundoNumeroTelefono,
          nombrePenya: presupuesto.nombrePenya?.trim() === "" ? undefined : presupuesto.nombrePenya,
        };
        const result = await createOrder(presupuestoToSend);
        
        if (result.success) {
          toast.success("¡Pedido creado exitosamente! Redirigiendo...");
          
          // Redirigir a la página de confirmación con el ID del pedido
          router.push(`/presupuesto-confirmado/${result.data?.orderId}`);
        } else {
          toast.error(result.error || "Error al crear el pedido");
        }
      } catch (error) {
        console.error("Error enviando pedido:", error);
        toast.error("Error inesperado al enviar el pedido");
      }
    });
  };

  const renderPaso = () => {
    switch (pasoActual) {
      case 1:
        return (
          <PersonalInfoStep
            form={form}
            presupuesto={presupuesto}
            onUpdate={actualizarPresupuesto}
          />
        );
      case 2:
        return (
          <AltavocesStep
            objetosPedido={presupuesto.objetosPedido}
            onAddProduct={añadirProducto}
            onRemoveProduct={eliminarProducto}
          />
          
        );
      case 3:
        return (
          <CongeladorHielosStep
            objetosPedido={presupuesto.objetosPedido}
            onAddProduct={añadirProducto}
            onRemoveProduct={eliminarProducto}
          />
        );
      case 4:
        return (
          <BebidasStep
            objetosPedido={presupuesto.objetosPedido}
            onAddProduct={añadirProducto}
            onRemoveProduct={eliminarProducto}
          />
        );
      case 5:
        return (
          <PackLimpiezaStep
            objetosPedido={presupuesto.objetosPedido}
            onAddProduct={añadirProducto}
            onRemoveProduct={eliminarProducto}
          />
        );
      case 6:
        return (
          <PackMenajeStep
            objetosPedido={presupuesto.objetosPedido}
            onAddProduct={añadirProducto}
            onRemoveProduct={eliminarProducto}
          />
        );
      case 7:
        return (
          <ResumenStep
            presupuesto={presupuesto}
            onEnviar={enviarPresupuesto}
            puedeEnviar={puedeEnviar() as boolean}
            isLoading={isPending}
            onUpdate={actualizarPresupuesto}
          />
        );
      default:
        return null;
    }
  };

  const pasoActualData = PASOS[pasoActual - 1];

  const openPackInfo = (type: 'limpieza' | 'menaje') => {
    setPackInfoType(type);
    setIsPackInfoOpen(true);
  };

  const shouldShowInfoButton = () => {
    return pasoActual === 5 || pasoActual === 6; // Pack Limpieza o Pack Menaje
  };

  const getInfoButtonType = (): 'limpieza' | 'menaje' => {
    return pasoActual === 5 ? 'limpieza' : 'menaje';
  };

  // Función para obtener pasos visibles en móvil
  const getPasosMovil = () => {
    const pasos = [];
    
    // Solo mostrar el actual
    pasos.push(PASOS[pasoActual - 1]);
    
    return pasos;
  };

  return (
    <>
      <div className=""> {/* Padding bottom para la barra del carrito */}
        <div>
          {/* Indicador de progreso - solo desktop */}
          <div className="hidden lg:block border-b border-gray-300 pb-6 mb-0 p-4">
            {/* Versión desktop - todos los pasos */}
            <div>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                {PASOS.map((paso, index) => (
                  <div key={paso.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-clash-display ${
                        paso.id < pasoActual
                          ? "bg-[var(--complementary-color-green)] text-white"
                          : paso.id === pasoActual
                          ? "bg-[var(--primary-color)] text-white"
                          : "bg-gray-200 text-[var(--secondary-color)]"
                      }`}
                    >
                      {paso.id < pasoActual ? <Check size={16} /> : paso.id}
                    </div>
                    <span className={`ml-2 text-sm font-clash-display ${paso.id === pasoActual ? "font-bold text-[var(--primary-color)]" : "text-[var(--secondary-color)]"}`}>
                      {paso.titulo}
                    </span>
                    {index < PASOS.length - 1 && (
                      <div className="w-8 h-px bg-gray-300 mx-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[var(--primary-color)] h-full rounded-full transition-all duration-300"
                style={{ width: `${(pasoActual / PASOS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Título del paso */}
          <div className="border-b border-gray-300 bg-[var(--complementary-color-yellow)]/10 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-4xl font-bold font-khand text-[var(--secondary-color)]">
                  {pasoActualData.titulo}
                  {!pasoActualData.required && (
                    <span className="text-sm font-normal text-gray-600 ml-2 font-clash-display">(Opcional)</span>
                  )}
                </h2>
              </div>
              
              {shouldShowInfoButton() && (
                <button
                  onClick={() => openPackInfo(getInfoButtonType())}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-clash-display font-medium bg-[var(--primary-color)] text-white border-2 border-[#000000] shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-200 flex-shrink-0"
                >
                  <Info size={16} />
                  <span className="hidden sm:inline">¿Qué incluye?</span>
                </button>
              )}
            </div>
          </div>

          {/* Contenido del paso */}
          <div className="border-b border-gray-300">
            {renderPaso()}
          </div>

          {/* Navegación */}
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-2 gap-4 md:flex md:justify-between md:items-center">
              <Button
                onClick={pasoAnterior}
                disabled={pasoActual === 1}
                variant="outline"
                size="md"
                className="w-full md:w-auto"
              >
                <ChevronLeft size={16} className="mr-2" />
                Anterior
              </Button>

              {pasoActual < PASOS.length ? (
                <Button
                  onClick={siguientePaso}
                  disabled={!puedeAvanzar()}
                  variant="default"
                  size="md"
                  className="w-full md:w-auto"
                >
                  Siguiente
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={!puedeEnviar() || isPending}
                      variant="default"
                      size="md"
                      className="w-full md:w-auto"
                    >
                      {isPending ? (
                        <Loader2 size={16} className="mr-2 animate-spin" />
                      ) : (
                        <Send size={16} className="mr-2" />
                      )}
                      {isPending ? "Procesando..." : "Completar Pedido"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border border-gray-300 rounded-none">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-bold font-khand text-[var(--secondary-color)]">
                        ¿Confirmar pedido?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="font-clash-display text-[var(--secondary-color)]">
                        ¿Estás seguro de que quieres enviar este presupuesto? Una vez enviado, nos pondremos en contacto contigo lo antes posible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3">
                      <AlertDialogCancel className="border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] rounded-none font-clash-display">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={enviarPresupuesto}
                        disabled={isPending}
                        className="bg-[var(--primary-color)] text-[var(--secondary-color)] border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] rounded-none font-clash-display hover:bg-[var(--primary-color)]/90 disabled:opacity-50"
                      >
                        {isPending ? (
                          <div className="flex items-center">
                            <Loader2 size={16} className="mr-2 animate-spin" />
                            Procesando...
                          </div>
                        ) : (
                          "Confirmar Pedido"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de ayuda para información personal */}
      {pasoActual === 1 && !puedeAvanzar() && (
        <div className="p-4 border border-yellow-600 shadow-[2px_2px_0px_0px_orange] bg-yellow-50 mx-4 md:mx-6 mb-4">
          <p className="text-yellow-700 font-clash-display font-medium text-center">
            Complete todos los campos de información personal para continuar
          </p>
        </div>
      )}

      {/* Mensaje de error si no puede enviar */}
      {pasoActual === PASOS.length && !puedeEnviar() && (
        <div className="p-4 border border-red-600 shadow-[2px_2px_0px_0px_red] bg-red-50 mx-4 md:mx-6 mb-4">
          <p className="text-red-600 font-clash-display font-medium text-center">
            Debe completar la información personal y añadir al menos un producto para completar el pedido
          </p>
        </div>
      )}

      {/* Cart Bar */}
            <CartBar 
        productos={presupuesto.objetosPedido} 
        onOpenCart={() => setIsCartOpen(true)}
        pasoActual={pasoActual}
        totalPasos={PASOS.length}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        productos={presupuesto.objetosPedido}
        onRemoveProduct={eliminarProducto}
      />

      {/* Pack Info Modal */}
      <PackInfoModal
        isOpen={isPackInfoOpen}
        onClose={() => setIsPackInfoOpen(false)}
        packType={packInfoType}
      />
    </>
  );
} 