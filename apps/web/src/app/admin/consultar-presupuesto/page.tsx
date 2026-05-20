"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Calendar, User, Phone, Mail, Package, ArrowLeft, Home, LogOut, ArrowUpDown, Eye, Download, List, Trash2 } from "lucide-react";
import CalendarioPresupuestos from "@/components/admin/CalendarioPresupuestos";
import Button from "@/components/ui/retro-btn";
import { Input } from "@/components/ui/input";
import { getOrderById, getAllOrders, getAllOrdersWithItems, updateOrderStatus, deleteOrder, updateOrderDates } from "@/lib/actions/orders";
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
  const [editFechaInicio, setEditFechaInicio] = useState("");
  const [editFechaFin, setEditFechaFin] = useState("");
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [filtroTipoEvento, setFiltroTipoEvento] = useState<string>("");
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

    if (searchTerm.trim()) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.numeroTelefono.includes(searchTerm)
      );
    }

    if (filtroEstado !== "todos") {
      filtered = filtered.filter(order => order.estado === filtroEstado);
    }

    if (filtroTipoEvento.trim()) {
      filtered = filtered.filter(order =>
        (order.tipoEvento || "").toLowerCase().includes(filtroTipoEvento.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.fechaCreacion).getTime();
      const dateB = new Date(b.fechaCreacion).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(filtered);
  }, [searchTerm, allOrders, sortOrder, filtroEstado, filtroTipoEvento]);

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
          setEditFechaInicio(result.data?.order?.fechaInicio || "");
          setEditFechaFin(result.data?.order?.fechaFin || "");
        } else {
          toast.error(result.error || "Presupuesto no encontrado");
        }
      } catch (error) {
        console.error("Error buscando presupuesto:", error);
        toast.error("Error al buscar el presupuesto");
      }
    });
  };

  const handleUpdateDates = () => {
    startTransition(async () => {
      try {
        const result = await updateOrderDates(
          selectedOrder.order.id,
          editFechaInicio || null,
          editFechaFin || null
        );
        if (result.success) {
          toast.success("Fechas actualizadas correctamente");
          setSelectedOrder((prev: any) => ({
            ...prev,
            order: { ...prev.order, fechaInicio: editFechaInicio || null, fechaFin: editFechaFin || null }
          }));
          await loadAllOrders();
        } else {
          toast.error(result.error || "Error al actualizar las fechas");
        }
      } catch (error) {
        console.error("Error actualizando fechas:", error);
        toast.error("Error al actualizar las fechas");
      }
    });
  };

  const handleDeleteOrder = async (orderId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteOrder(orderId);
        if (result.success) {
          toast.success("Pedido eliminado correctamente");
          setSelectedOrder(null);
          await loadAllOrders();
        } else {
          toast.error(result.error || "Error al eliminar el pedido");
        }
      } catch (error) {
        console.error("Error eliminando pedido:", error);
        toast.error("Error al eliminar el pedido");
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
            {/* Toggle vista */}
            <div className="flex border-2 border-black shadow-[2px_2px_0px_0px_#000] overflow-hidden self-start">
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-clash-display font-bold transition-colors ${
                  view === 'list' ? 'bg-[var(--primary-color)] text-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <List size={16} />
                Lista
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-clash-display font-bold border-l-2 border-black transition-colors ${
                  view === 'calendar' ? 'bg-[var(--primary-color)] text-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <Calendar size={16} />
                Calendario
              </button>
            </div>
          </div>
          {/* Filtros de estado y tipo de evento */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <select
                value={filtroEstado}
                onChange={e => setFiltroEstado(e.target.value)}
                className="w-full h-10 border-2 border-gray-300 shadow-[2px_2px_0px_0px_#000] font-clash-display px-3 text-sm rounded-none bg-white"
                disabled={loading}
              >
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div className="flex-1">
              <Input
                placeholder="Filtrar por tipo de evento..."
                value={filtroTipoEvento}
                onChange={e => setFiltroTipoEvento(e.target.value)}
                className="border-2 border-gray-300 rounded-none shadow-[2px_2px_0px_0px_#000]"
                disabled={loading}
              />
            </div>
            {(filtroEstado !== "todos" || filtroTipoEvento) && (
              <button
                onClick={() => { setFiltroEstado("todos"); setFiltroTipoEvento(""); }}
                className="text-sm font-clash-display text-gray-500 hover:text-red-600 border border-gray-300 px-3 py-2 whitespace-nowrap transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {selectedOrder && (
            <Button
              onClick={() => setSelectedOrder(null)}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver al listado
            </Button>
          )}
        </div>

        {/* Vista Calendario */}
        {!selectedOrder && view === 'calendar' && (
          <div className="mb-6">
            <CalendarioPresupuestos
              orders={filteredOrders}
              onViewOrder={handleViewOrder}
            />
          </div>
        )}

        {/* Listado de Presupuestos */}
        {!selectedOrder && view === 'list' && (
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
                          <div>
                            {order.fechaInicio && (
                              <span className="block text-sm font-bold font-clash-display text-amber-700">
                                📅 {new Date(order.fechaInicio + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                              </span>
                            )}
                            <span className="text-xs font-clash-display text-gray-400">
                              Pedido: {new Date(order.fechaCreacion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </span>
                          </div>
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
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              onClick={() => handleViewOrder(order.id)}
                              variant="default"
                              size="sm"
                            >
                              <Eye size={14} className="mr-1" />
                              Ver
                            </Button>
                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar el pedido de ${order.nombreCompleto}? Esta acción no se puede deshacer.`)) {
                                  handleDeleteOrder(order.id);
                                }
                              }}
                              disabled={isPending}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 transition-colors disabled:opacity-50"
                              title="Eliminar pedido"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
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
                  <div className="flex gap-2 mt-6">
                    <Button
                      onClick={handleExportSingleOrder}
                      variant="default"
                      size="sm"
                    >
                      <Download size={14} className="mr-2" />
                      Descargar Excel
                    </Button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar el pedido de ${selectedOrder.order.nombreCompleto}? Esta acción no se puede deshacer.`)) {
                          handleDeleteOrder(selectedOrder.order.id);
                        }
                      }}
                      disabled={isPending}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-clash-display font-medium text-red-600 bg-white border-2 border-red-500 shadow-[2px_2px_0px_0px_#ef4444] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User size={20} className="mr-2 text-[var(--primary-color)]" />
                    <div>
                      <p className="font-clash-display font-bold">{selectedOrder.order.nombreCompleto}</p>
                      {selectedOrder.order.nombrePenya && (
                        <p className="font-clash-display text-sm text-gray-500">{selectedOrder.order.nombrePenya}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display">{selectedOrder.order.correoElectronico}</span>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <Phone size={20} className="mr-2 text-[var(--primary-color)] flex-shrink-0" />
                    <div>
                      <p className="font-clash-display">{selectedOrder.order.numeroTelefono}</p>
                      {selectedOrder.order.segundoNumeroTelefono && (
                        <p className="font-clash-display text-sm text-gray-500">{selectedOrder.order.segundoNumeroTelefono}</p>
                      )}
                    </div>
                  </div>
                  {selectedOrder.order.direccion && selectedOrder.order.direccion !== 'sin_direccion' && (
                    <div className="flex items-start text-gray-700">
                      <Package size={20} className="mr-2 text-[var(--primary-color)] flex-shrink-0 mt-0.5" />
                      <span className="font-clash-display text-sm">{selectedOrder.order.direccion}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-2 text-[var(--primary-color)]" />
                    <span className="font-clash-display text-sm text-gray-500">
                      Pedido: {formatDate(selectedOrder.order.fechaCreacion)}
                    </span>
                  </div>
                  {selectedOrder.order.fechaInicio && (
                    <div className="flex items-center bg-amber-50 border-2 border-amber-400 px-3 py-2">
                      <Calendar size={20} className="mr-2 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-clash-display text-amber-700 font-bold uppercase tracking-wide">Fecha del Evento</p>
                        <p className="font-clash-display font-bold text-amber-900">
                          {new Date(selectedOrder.order.fechaInicio + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                          {selectedOrder.order.fechaFin && ` → ${new Date(selectedOrder.order.fechaFin + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}`}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedOrder.order.tipoEvento && (
                    <div className="flex items-center text-gray-700">
                      <FileText size={20} className="mr-2 text-[var(--primary-color)]" />
                      <div>
                        <p className="text-xs font-clash-display text-gray-500 uppercase tracking-wide">Tipo de evento</p>
                        <p className="font-clash-display font-bold">{selectedOrder.order.tipoEvento}</p>
                      </div>
                    </div>
                  )}
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

              {/* Fechas del evento — editable */}
              <div className="mt-6 border-2 border-black shadow-[2px_2px_0px_0px_#000] p-4">
                <h4 className="font-bold font-khand text-[var(--secondary-color)] text-lg mb-3 flex items-center gap-2">
                  <Calendar size={18} className="text-[var(--primary-color)]" />
                  Fechas del Evento
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-clash-display text-gray-600 block mb-1">Fecha de Inicio *</label>
                    <input
                      type="date"
                      value={editFechaInicio}
                      onChange={e => setEditFechaInicio(e.target.value)}
                      className="w-full h-10 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display px-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-clash-display text-gray-600 block mb-1">Fecha de Fin <span className="text-gray-400">(opcional)</span></label>
                    <input
                      type="date"
                      value={editFechaFin}
                      min={editFechaInicio || undefined}
                      onChange={e => setEditFechaFin(e.target.value)}
                      className="w-full h-10 border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] font-clash-display px-3 focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={handleUpdateDates}
                  disabled={isPending || !editFechaInicio}
                  className="mt-3 flex items-center gap-2 px-4 py-2 text-sm font-clash-display font-bold bg-[var(--primary-color)] text-[var(--secondary-color)] border-2 border-[#000000] shadow-[2px_2px_0px_0px_#000000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
                >
                  <Calendar size={14} />
                  Guardar fechas
                </button>
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
