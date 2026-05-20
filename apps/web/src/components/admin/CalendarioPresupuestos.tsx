"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react";

interface Order {
  id: string;
  nombreCompleto: string;
  nombrePenya?: string;
  fechaInicio?: string | null;
  fechaFin?: string | null;
  tipoEvento?: string | null;
  localizacionEvento?: string | null;
  estado: string;
  fechaCreacion?: Date | string | number | null;
}

interface CalendarioPresupuestosProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
}

const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];
const DIAS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

const ESTADO_COLORS: Record<string, string> = {
  pendiente:   "bg-yellow-400",
  confirmado:  "bg-blue-500",
  en_proceso:  "bg-purple-500",
  completado:  "bg-green-500",
  cancelado:   "bg-red-400",
};

const ESTADO_LABELS: Record<string, string> = {
  pendiente:  "Pendiente",
  confirmado: "Confirmado",
  en_proceso: "En Proceso",
  completado: "Completado",
  cancelado:  "Cancelado",
};

function toLocalDateStr(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CalendarioPresupuestos({ orders, onViewOrder }: CalendarioPresupuestosProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const ordersConFecha = useMemo(() => orders.filter(o => o.fechaInicio), [orders]);
  const ordersSinFecha = useMemo(() => orders.filter(o => !o.fechaInicio), [orders]);

  // Construir mapa día -> órdenes (solo pedidos con fechaInicio)
  const ordersByDay = useMemo(() => {
    const map: Record<string, Order[]> = {};
    ordersConFecha.forEach(order => {
      const start = new Date(order.fechaInicio! + "T00:00:00");
      const rawEnd = order.fechaFin ? new Date(order.fechaFin + "T00:00:00") : start;
      // si fechaFin es anterior a fechaInicio (año mal escrito, etc.) se ignora
      const end = rawEnd >= start ? rawEnd : start;
      const cur = new Date(start);
      while (cur <= end) {
        const key = toLocalDateStr(cur);
        if (!map[key]) map[key] = [];
        if (!map[key].find(o => o.id === order.id)) map[key].push(order);
        cur.setDate(cur.getDate() + 1);
      }
    });
    return map;
  }, [ordersConFecha]);

  // Días del mes en una cuadrícula lun-dom
  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    // 0=dom → convertir a lun=0
    const startDow = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(startDow).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [year, month]);

  const todayStr = toLocalDateStr(today);

  const selectedOrders = selectedDay ? (ordersByDay[selectedDay] || []) : [];

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4 md:p-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarDays size={28} className="text-[var(--primary-color)]" />
          <h2 className="text-2xl font-bold font-khand text-[var(--secondary-color)]">
            Calendario de Eventos
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-lg font-bold font-khand text-[var(--secondary-color)] min-w-[160px] text-center">
            {MESES[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Leyenda estados */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(ESTADO_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full ${ESTADO_COLORS[key]}`} />
            <span className="text-xs font-clash-display text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Aviso pedidos sin fecha de evento */}
      {ordersSinFecha.length > 0 && (
        <div className="mb-4 border border-amber-300 bg-amber-50 p-3 text-sm font-clash-display text-amber-800">
          <span className="font-bold">{ordersSinFecha.length} pedido{ordersSinFecha.length !== 1 ? 's' : ''}</span> sin fecha de evento — ábrelos desde la lista y asigna las fechas para que aparezcan aquí.
        </div>
      )}

      {/* Grid días semana */}
      <div className="grid grid-cols-7 mb-1">
        {DIAS.map(d => (
          <div key={d} className="text-center text-xs font-bold font-clash-display text-gray-500 py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Grid días */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200">
        {days.map((day, i) => {
          if (day === null) {
            return <div key={i} className="bg-gray-50 h-16 md:h-20" />;
          }
          const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const dayOrders = ordersByDay[dateStr] || [];
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDay;

          return (
            <div
              key={i}
              onClick={() => setSelectedDay(isSelected ? null : dateStr)}
              className={`bg-white h-16 md:h-20 p-1 cursor-pointer transition-all hover:bg-purple-50 ${
                isSelected ? "ring-2 ring-[var(--primary-color)] ring-inset" : ""
              }`}
            >
              <div className={`text-xs font-bold font-clash-display mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                isToday
                  ? "bg-[var(--primary-color)] text-white"
                  : "text-[var(--secondary-color)]"
              }`}>
                {day}
              </div>
              {/* Puntos de eventos (máx 3 visibles) */}
              <div className="flex flex-wrap gap-0.5">
                {dayOrders.slice(0, 3).map((o, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${ESTADO_COLORS[o.estado] || "bg-gray-400"}`}
                    title={o.nombreCompleto}
                  />
                ))}
                {dayOrders.length > 3 && (
                  <span className="text-[10px] text-gray-500 font-clash-display leading-none mt-0.5">
                    +{dayOrders.length - 3}
                  </span>
                )}
              </div>
              {/* Nombres (solo desktop) */}
              <div className="hidden md:block mt-0.5 space-y-0.5">
                {dayOrders.slice(0, 1).map((o, idx) => (
                  <p key={idx} className="text-[10px] font-clash-display text-gray-600 truncate leading-tight">
                    {o.nombrePenya || o.nombreCompleto}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensaje si no hay pedidos en absoluto */}
      {orders.length === 0 && (
        <div className="mt-4 text-center py-6 border border-dashed border-gray-300">
          <CalendarDays size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm font-clash-display text-gray-500">No hay pedidos que mostrar.</p>
        </div>
      )}

      {/* Panel detalle día seleccionado */}
      {selectedDay && (
        <div className="mt-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold font-khand text-[var(--secondary-color)] text-xl">
              {new Date(selectedDay + "T00:00:00").toLocaleDateString("es-ES", {
                weekday: "long", day: "numeric", month: "long", year: "numeric"
              })}
            </h3>
            <button
              onClick={() => setSelectedDay(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={18} />
            </button>
          </div>

          {selectedOrders.length === 0 ? (
            <p className="text-gray-500 font-clash-display text-sm">Sin eventos este día.</p>
          ) : (
            <div className="space-y-3">
              {selectedOrders.map(order => (
                <div
                  key={order.id}
                  className="flex items-start justify-between gap-4 border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${ESTADO_COLORS[order.estado]}`} />
                    <div className="min-w-0">
                      <p className="font-bold font-clash-display text-[var(--secondary-color)] truncate">
                        {order.nombrePenya || order.nombreCompleto}
                      </p>
                      {order.nombrePenya && (
                        <p className="text-xs text-gray-500 font-clash-display truncate">{order.nombreCompleto}</p>
                      )}
                      {order.tipoEvento && (
                        <p className="text-xs text-[var(--primary-color)] font-clash-display">{order.tipoEvento}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-clash-display ${
                          order.estado === "pendiente"  ? "bg-yellow-100 text-yellow-800" :
                          order.estado === "confirmado" ? "bg-blue-100 text-blue-800" :
                          order.estado === "en_proceso" ? "bg-purple-100 text-purple-800" :
                          order.estado === "completado" ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {ESTADO_LABELS[order.estado]}
                        </span>
                        {order.fechaInicio && order.fechaFin && order.fechaInicio !== order.fechaFin && (
                          <span className="text-xs text-gray-400 font-clash-display">
                            hasta {new Date(order.fechaFin + "T00:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onViewOrder(order.id)}
                    className="flex-shrink-0 text-xs font-clash-display font-bold text-[var(--primary-color)] border border-[var(--primary-color)] px-2 py-1 hover:bg-[var(--primary-color)] hover:text-white transition-colors"
                  >
                    Ver
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
