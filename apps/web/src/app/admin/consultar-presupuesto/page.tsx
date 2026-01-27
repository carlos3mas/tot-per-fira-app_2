"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Calendar, User, Phone, Mail, Package, ArrowLeft, Home, LogOut, ArrowUpDown, Eye, Download } from "lucide-react";
import Button from "@/components/ui/retro-btn";
import { Input } from "@/components/ui/input";
import { getOrderById, getAllOrders, getAllOrdersWithItems, updateOrderStatus } from "@/lib/actions/orders";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Session } from "@/types/auth";
import { exportOrdersToExcel, exportSingleOrderToExcel } from "@/lib/utils/excel-export";

export default function ConsultarPresupuestoPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isPending, startTransition] = useTransition();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();

  // Cargar todos los presupuestos al inicio
  useEffect(() => {
    if (session && (session as Session).user.role === "admin") {
      loadAllOrders();
    }
  }, [session]);

  // Filtrar y ordenar presupuestos
  useEffect(() => {
    let filtered = allOrders;

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.numeroTelefono.includes(searchTerm)
      );
    }

    // Ordenar por fecha
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.fechaCreacion).getTime();
      const dateB = new Date(b.fechaCreacion).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(filtered);
  }, [searchTerm, allOrders, sortOrder]);

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

  const loadAllOrders = async () => {
    setLoading(true);
    try {
      const result = await getAllOrders();
      if (result.success && result.data) {
        setAllOrders(result.data);
      } else {
        toast.error(result.error || "Error al cargar presupuestos");
        setAllOrders([]);
      }
    } catch (error) {
      console.error("Error cargando presupuestos:", error);
      toast.error("Error al cargar los presupuestos");
      setAllOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = async (orderId: string) => {
    startTransition(async () => {
      try {
        const result = await getOrderById(orderId);
        if (result.success) {
          setSelectedOrder(result.data);
        } else {
          toast.error(result.error || "Presupuesto no encontrado");
        }
      } catch (error) {
        console.error("Error buscando presupuesto:", error);
        toast.error("Error al buscar el presupuesto");
      }
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const handleExportToExcel = async () => {
    try {
      toast.loading("Generando archivo Excel...");
      const result = await getAllOrdersWithItems();
      
      if (result.success && result.data) {
        const { orders, itemsByOrderId } = result.data;
        exportOrdersToExcel(orders, itemsByOrderId);
        toast.dismiss();
        toast.success("Excel descargado correctamente");
      } else {
        toast.dismiss();
        toast.error(result.error || "Error al generar Excel");
      }
    } catch (error) {
      console.error("Error exportando a Excel:", error);
      toast.dismiss();
      toast.error("Error al generar el archivo Excel");
    }
  };

  const handleExportSingleOrder = () => {
    if (!selectedOrder) return;
    
    try {
      toast.loading("Generando archivo Excel...");
      exportSingleOrderToExcel(selectedOrder.order, selectedOrder.items);
      toast.dismiss();
      toast.success("Excel descargado correctamente");
    } catch (error) {
      console.error("Error exportando presupuesto:", error);
      toast.dismiss();
      toast.error("Error al generar el archivo Excel");
    }
  };

  const handleStatusChange = async (newStatus: "pendiente" | "confirmado" | "en_proceso" | "completado" | "cancelado") => {
    if (!selectedOrder) return;

    startTransition(async () => {
      try {
        const result = await updateOrderStatus(selectedOrder.order.id, newStatus);
        
        if (result.success) {
          // Actualizar el estado local
          setSelectedOrder({
            ...selectedOrder,
            order: {
              ...selectedOrder.order,
              estado: newStatus
            }
          });
          
          // Actualizar también en la lista de todos los presupuestos
          setAllOrders(prevOrders => 
            prevOrders.map(order => 
              order.id === selectedOrder.order.id 
                ? { ...order, estado: newStatus }
                : order
            )
          );
          
          toast.success("Estado actualizado correctamente");
        } else {
          toast.error(result.error || "Error al actualizar el estado");
        }
      } catch (error) {
        console.error("Error actualizando estado:", error);
        toast.error("Error al actualizar el estado");
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
                  Gestión de presupuestos ({filteredOrders.length} {filteredOrders.length === 1 ? 'presupuesto' : 'presupuestos'})
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
            {selectedOrder ? 'Detalles del presupuesto seleccionado' : 'Busca y visualiza todos los presupuestos solicitados'}
          </p>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por ID, nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 border-gray-300 rounded-none shadow-[2px_2px_0px_0px_#000]"
                disabled={loading}
              />
            </div>
            <Button
              onClick={toggleSortOrder}
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
            >
              <ArrowUpDown size={16} className="mr-2" />
              {sortOrder === 'desc' ? 'Más recientes' : 'Más antiguos'}
            </Button>
          </div>
          {selectedOrder && (
            <Button
              onClick={() => setSelectedOrder(null)}
              variant="outline"
              size="sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver al listado
            </Button>
          )}
        </div>

        {/* Listado de Presupuestos */}
        {!selectedOrder && (
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 mb-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
                <p className="font-clash-display text-gray-600">Cargando presupuestos...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="font-clash-display text-gray-600">
                  {searchTerm ? 'No se encontraron presupuestos con ese criterio' : 'No hay presupuestos registrados'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        ID
                      </th>
                      <th className="text-left py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Cliente
                      </th>
                      <th className="text-left py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Fecha
                      </th>
                      <th className="text-center py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Estado
                      </th>
                      <th className="text-right py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Total
                      </th>
                      <th className="text-center py-3 px-2 font-bold font-clash-display text-[var(--secondary-color)]">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order: any) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="py-3 px-2">
                          <span className="text-xs font-mono text-gray-600">
                            {order.id.substring(0, 12)}...
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div>
                            <p className="font-medium font-clash-display text-[var(--secondary-color)]">
                              {order.nombreCompleto}
                            </p>
                            <p className="text-xs text-gray-500">{order.correoElectronico}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm font-clash-display text-gray-600">
                            {new Date(order.fechaCreacion).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-clash-display border ${getEstadoColor(order.estado)}`}>
                            {getEstadoLabel(order.estado)}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          {order.totalEstimado ? (
                            <span className="font-bold font-khand text-[var(--primary-color)] text-lg">
                              €{order.totalEstimado.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Button
                            onClick={() => handleViewOrder(order.id)}
                            variant="default"
                            size="sm"
                          >
                            <Eye size={14} className="mr-1" />
                            Ver
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Detalles del Presupuesto Seleccionado */}
        {selectedOrder && (
          <div className="space-y-6">
            {/* Información del presupuesto */}
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-2xl font-bold font-khand text-[var(--secondary-color)] mb-2 sm:mb-0">
                  Presupuesto #{selectedOrder.order.id}
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-clash-display text-gray-600">Estado del presupuesto:</label>
                    <select
                      value={selectedOrder.order.estado}
                      onChange={(e) => handleStatusChange(e.target.value as any)}
                      className={`px-3 py-2 rounded-full text-sm font-clash-display border-2 font-medium cursor-pointer ${getEstadoColor(selectedOrder.order.estado)}`}
                      disabled={isPending}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="en_proceso">En Proceso</option>
                      <option value="completado">Completado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleExportSingleOrder}
                    variant="default"
                    size="sm"
                    className="mt-6"
                  >
                    <Download size={14} className="mr-2" />
                    Descargar Excel
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">{selectedOrder.order.nombreCompleto}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">{selectedOrder.order.correoElectronico}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">{selectedOrder.order.numeroTelefono}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">
                      {formatDate(selectedOrder.order.fechaCreacion)}
                    </span>
                  </div>
                  {selectedOrder.order.totalEstimado && (
                    <div className="bg-[var(--complementary-color-pink)]/10 border-2 border-[var(--primary-color)] p-3 rounded">
                      <p className="text-sm font-clash-display text-gray-600 mb-1">Total Estimado:</p>
                      <p className="text-2xl font-bold font-khand text-[var(--primary-color)]">
                        €{selectedOrder.order.totalEstimado.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Comentarios Adicionales */}
              {selectedOrder.order.comentarios && (
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FileText className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-bold font-khand text-yellow-800">
                        Comentarios Adicionales
                      </h3>
                      <div className="mt-2 text-sm font-clash-display text-yellow-700">
                        <p>{selectedOrder.order.comentarios}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                    {selectedOrder.items.map((item: any, index: number) => (
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

      </div>
    </div>
  );
}
