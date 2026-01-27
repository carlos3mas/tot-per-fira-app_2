"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Calendar, User, Phone, Mail, Package, ArrowLeft, Home, LogOut } from "lucide-react";
import Button from "@/components/ui/retro-btn";
import { Input } from "@/components/ui/input";
import { getOrderById } from "@/lib/actions/orders";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Session } from "@/types/auth";

export default function ConsultarPresupuestoPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();

  // Verificar autenticación y rol
  React.useEffect(() => {
    if (!isSessionLoading && session) {
      if ((session as Session).user.role !== "admin") {
        toast.error("Acceso denegado: Se requieren permisos de administrador");
        router.push("/");
        return;
      }
    }
    
    if (!isSessionLoading && !session) {
      router.push("/admin/login");
    }
  }, [session, isSessionLoading, router]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Sesión cerrada correctamente");
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  // Mostrar loading mientras se verifica la sesión
  if (isSessionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4 pt-20">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
          <p className="font-clash-display text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no hay sesión o no es admin, no renderizar nada (se redirigirá)
  if (!session || (session as Session).user.role !== "admin") {
    return null;
  }

  const handleSearch = () => {
    if (!orderId.trim()) {
      toast.error("Por favor, introduce un número de presupuesto");
      return;
    }

    startTransition(async () => {
      setLoading(true);
      try {
        const result = await getOrderById(orderId.trim());
        
        if (result.success) {
          setOrderData(result.data);
        } else {
          toast.error(result.error || "Presupuesto no encontrado");
          setOrderData(null);
        }
      } catch (error) {
        console.error("Error buscando presupuesto:", error);
        toast.error("Error al buscar el presupuesto");
        setOrderData(null);
      } finally {
        setLoading(false);
      }
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      alcohol: 'Alcohol',
      cervezas: 'Cervezas',
      bebida: 'Bebidas',
      congelador: 'Congeladores',
      hielo: 'Hielo',
      altavoces: 'Altavoces',
      pack_limpieza: 'Packs de Limpieza',
      pack_menaje: 'Packs de Menaje',
      vasos: 'Vasos'
    };
    return labels[categoria] || categoria;
  };

  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmado: 'bg-blue-100 text-blue-800 border-blue-300',
      en_proceso: 'bg-purple-100 text-purple-800 border-purple-300',
      completado: 'bg-green-100 text-green-800 border-green-300',
      cancelado: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[estado] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getEstadoLabel = (estado: string) => {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      confirmado: 'Confirmado',
      en_proceso: 'En Proceso',
      completado: 'Completado',
      cancelado: 'Cancelado'
    };
    return labels[estado] || estado;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center mb-4 sm:mb-0">
              <FileText size={40} className="mr-3 text-[var(--primary-color)]" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-khand text-[var(--secondary-color)]">
                  Panel de Administrador
                </h1>
                <p className="text-gray-600 font-clash-display">
                  Consulta de presupuestos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600 font-clash-display">
                  Conectado como:
                </p>
                <p className="font-bold font-clash-display text-[var(--secondary-color)]">
                  {session?.user?.name || session?.user?.email}
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut size={16} className="mr-2" />
                Salir
              </Button>
            </div>
          </div>
          <p className="text-gray-600 font-clash-display">
            Introduce el número de presupuesto para ver todos los detalles
          </p>
        </div>

        {/* Búsqueda */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Número de presupuesto (ej: abc123def456)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="border-2 border-gray-300 rounded-none shadow-[2px_2px_0px_0px_#000]"
                disabled={loading}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || isPending}
              variant="default"
              size="md"
              className="w-full sm:w-auto"
            >
              <Search size={16} className="mr-2" />
              {loading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </div>

        {/* Resultados */}
        {orderData && (
          <div className="space-y-6">
            {/* Información del presupuesto */}
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-2xl font-bold font-khand text-[var(--secondary-color)] mb-2 sm:mb-0">
                  Presupuesto #{orderData.order.id}
                </h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-clash-display border-2 ${getEstadoColor(orderData.order.estado)}`}>
                  {getEstadoLabel(orderData.order.estado)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">{orderData.order.nombreCompleto}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">{orderData.order.correoElectronico}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">{orderData.order.numeroTelefono}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">
                      {formatDate(orderData.order.fechaCreacion)}
                    </span>
                  </div>
                  {orderData.order.totalEstimado && (
                    <div className="bg-[var(--complementary-color-pink)]/10 border-2 border-[var(--primary-color)] p-3 rounded">
                      <p className="text-sm font-clash-display text-gray-600 mb-1">Total Estimado:</p>
                      <p className="text-2xl font-bold font-khand text-[var(--primary-color)]">
                        €{orderData.order.totalEstimado.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Items del presupuesto */}
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6">
              <h3 className="text-xl font-bold font-khand text-[var(--secondary-color)] mb-4 flex items-center">
                <Package size={24} className="mr-2 text-[var(--primary-color)]" />
                Productos Solicitados
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Producto
                      </th>
                      <th className="text-center py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)] min-w-[80px]">
                        Cantidad
                      </th>
                      <th className="text-left py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Categoría
                      </th>
                      <th className="text-right py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="py-3 px-2">
                          <span className="font-medium font-clash-display text-[var(--secondary-color)]">
                            {item.nombre}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-full font-bold font-khand text-lg inline-block min-w-[50px]">
                            {item.unidades}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-gray-600 font-clash-display bg-gray-100 px-2 py-1 rounded">
                            {getCategoriaLabel(item.categoria)}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          {item.precio ? (
                            <div>
                              <div className="font-bold font-khand text-[var(--primary-color)] text-lg">
                                €{(item.precio * item.unidades).toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 font-clash-display">
                                €{item.precio.toFixed(2)}/ud
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm font-clash-display">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Navegación */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={() => router.push("/solicitar-presupuesto")}
            variant="outline"
            size="md"
            className="flex-1"
          >
            <ArrowLeft size={16} className="mr-2" />
            Nuevo Presupuesto
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="default"
            size="md"
            className="flex-1"
          >
            <Home size={16} className="mr-2" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
} 