"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertIcon,
  ArrowLeftIcon,
  CalendarIcon,
  CameraIcon,
  CarIcon,
  CheckIcon,
  DownloadIcon,
  VehicleFrontGraphic,
} from "../components/icons";

type AuditStatus = "cuadrado" | "fuga" | "abonado";

type ReportRow = {
  id: number;
  placa: string;
  entrada: string;
  salida: string;
  tiempo: string;
  ticket: string;
  cobro: string;
  estado: AuditStatus;
  cam: string;
};

const reportData: ReportRow[] = [
  { id: 1, placa: "P-789 123", entrada: "14:15", salida: "16:30", tiempo: "2h 15m", ticket: "#4092", cobro: "$4.50", estado: "cuadrado", cam: "CAM_01_ENTRADA" },
  { id: 2, placa: "P-112 554", entrada: "12:00", salida: "14:15", tiempo: "2h 15m", ticket: "No registrado", cobro: "$0.00", estado: "fuga", cam: "CAM_02_SALIDA" },
  { id: 3, placa: "M-443 991", entrada: "15:10", salida: "15:32", tiempo: "0h 22m", ticket: "#4091", cobro: "$1.50", estado: "cuadrado", cam: "CAM_01_ENTRADA" },
  { id: 4, placa: "P-555 777", entrada: "08:30", salida: "17:45", tiempo: "9h 15m", ticket: "Abonado Mensual", cobro: "-", estado: "abonado", cam: "CAM_02_SALIDA" },
  { id: 5, placa: "C-102 304", entrada: "18:05", salida: "18:45", tiempo: "0h 40m", ticket: "No registrado", cobro: "$0.00", estado: "fuga", cam: "CAM_02_SALIDA" },
];

const filters: { key: "todos" | AuditStatus; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "fuga", label: "Alertas de fuga" },
  { key: "cuadrado", label: "Cuadrados" },
  { key: "abonado", label: "Abonados" },
];

export default function ReporteCompleto() {
  const [registroActivo, setRegistroActivo] = useState<ReportRow | null>(null);
  const [filtro, setFiltro] = useState<"todos" | AuditStatus>("todos");

  useEffect(() => {
    if (!registroActivo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setRegistroActivo(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [registroActivo]);

  const filasFiltradas =
    filtro === "todos"
      ? reportData
      : reportData.filter((row) => row.estado === filtro);

  const totalCuadrados = reportData.filter((r) => r.estado === "cuadrado").length;
  const totalFugas = reportData.filter((r) => r.estado === "fuga").length;

  function exportarCsv() {
    const encabezados = [
      "Placa",
      "Entrada",
      "Salida",
      "Estadia",
      "Ticket",
      "Cobro",
      "Estado",
      "Camara",
    ];
    const lineas = [
      encabezados.join(","),
      ...filasFiltradas.map((r) =>
        [
          r.placa,
          r.entrada,
          r.salida,
          r.tiempo,
          r.ticket,
          r.cobro,
          r.estado,
          r.cam,
        ].join(",")
      ),
    ];
    const blob = new Blob([lineas.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "netpark-auditoria-2026-11-15.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-[#111315] flex flex-col selection:bg-emerald-200 selection:text-[#111315]">
      <header className="sticky top-0 z-30 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#111315] text-white font-mono font-bold text-sm flex items-center justify-center">
                P
              </span>
              <span className="text-lg font-bold tracking-tight text-[#111315]">
                NetPark
              </span>
            </Link>
            <span className="hidden sm:inline-block text-stone-300">/</span>
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-stone-600 bg-white border border-stone-200 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Centro Histórico
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-stone-600 hover:text-[#111315] transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Volver al inicio
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#111315] text-white flex items-center justify-center font-mono font-bold text-xs">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-1.5">
              Panel de auditoría
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#111315]">
              Auditoría diaria de placas
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Corte correspondiente al{" "}
              <span className="font-mono font-semibold text-[#111315]">
                15 de Noviembre, 2026
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              className="px-4 py-2 bg-white border border-stone-300 text-[#111315] rounded-lg text-sm font-medium hover:bg-stone-100 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <CalendarIcon className="w-4 h-4 text-stone-500" />
              15 Nov 2026
            </button>
            <button
              type="button"
              onClick={exportarCsv}
              className="px-4 py-2 bg-[#111315] text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mb-2">
              Vehículos leídos
            </div>
            <div className="font-mono text-2xl font-bold text-[#111315]">
              {reportData.length}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mb-2">
              Cobros cuadrados
            </div>
            <div className="font-mono text-2xl font-bold text-emerald-700">
              {totalCuadrados}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-amber-200 p-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-amber-700 mb-2">
              Alertas de fuga
            </div>
            <div className="font-mono text-2xl font-bold text-amber-700">
              {totalFugas}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mb-2">
              Cobrado en caja
            </div>
            <div className="font-mono text-2xl font-bold text-[#111315]">$6.00</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-stone-200">
            {filters.map((item) => {
              const activo = filtro === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFiltro(item.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activo
                      ? "bg-[#111315] text-white"
                      : "text-stone-600 hover:text-[#111315] hover:bg-stone-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs text-stone-500">
            Mostrando {filasFiltradas.length} de {reportData.length} registros
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-mono text-[11px] uppercase tracking-wider border-b border-stone-200">
                  <th className="px-5 py-3.5 font-semibold">Placa detectada</th>
                  <th className="px-5 py-3.5 font-semibold">Entrada / Salida</th>
                  <th className="px-5 py-3.5 font-semibold">Estadía</th>
                  <th className="px-5 py-3.5 font-semibold">Ticket de caja</th>
                  <th className="px-5 py-3.5 font-semibold">Cobro</th>
                  <th className="px-5 py-3.5 font-semibold">Estado</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Evidencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filasFiltradas.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FAFAF9] transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-[#111315] bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                        {row.placa}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-stone-600">
                      <div className="text-[#111315] font-medium">{row.entrada}</div>
                      <div className="text-stone-400">{row.salida}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs font-medium text-[#111315]">
                      {row.tiempo}
                    </td>
                    <td className="px-5 py-4 text-stone-600">{row.ticket}</td>
                    <td className="px-5 py-4 font-mono font-semibold text-[#111315]">
                      {row.cobro}
                    </td>
                    <td className="px-5 py-4">
                      {row.estado === "cuadrado" && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-md text-xs border border-emerald-200">
                          <CheckIcon className="w-3.5 h-3.5" />
                          Cuadrado
                        </span>
                      )}
                      {row.estado === "fuga" && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 font-semibold px-2.5 py-1 rounded-md text-xs border border-amber-200">
                          <AlertIcon className="w-3.5 h-3.5" />
                          Alerta de fuga
                        </span>
                      )}
                      {row.estado === "abonado" && (
                        <span className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-600 font-semibold px-2.5 py-1 rounded-md text-xs border border-stone-200">
                          <CarIcon className="w-3.5 h-3.5" />
                          Abonado
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setRegistroActivo(row)}
                        className="inline-flex items-center gap-1.5 text-[#111315] hover:bg-[#111315] hover:text-white transition-colors font-medium text-xs bg-white px-3 py-1.5 rounded-lg border border-stone-300 cursor-pointer"
                      >
                        <CameraIcon className="w-3.5 h-3.5" />
                        Ver foto
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {registroActivo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-evidencia-titulo"
          onClick={() => setRegistroActivo(null)}
          className="fixed inset-0 z-50 bg-[#111315]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] overflow-hidden border border-stone-200 flex flex-col my-auto"
          >
            <div className="shrink-0 bg-[#111315] px-5 py-3.5 flex justify-between items-center text-white">
              <div>
                <h3
                  id="modal-evidencia-titulo"
                  className="font-semibold text-base flex items-center gap-2"
                >
                  <CameraIcon className="w-4 h-4 text-emerald-400" />
                  Evidencia de cámara
                </h3>
                <p className="text-stone-400 text-xs font-mono mt-0.5">
                  {registroActivo.cam}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRegistroActivo(null)}
                aria-label="Cerrar"
                className="text-stone-400 hover:text-white text-2xl font-bold px-2 leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="bg-[#0D0F12] h-44 sm:h-52 relative flex items-center justify-center border-y border-stone-800 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:18px_18px] opacity-50"></div>

                <VehicleFrontGraphic className="w-44 h-28 sm:w-48 sm:h-32 -translate-y-3 relative z-10" />

                <div
                  className={`absolute bottom-4 z-10 border-2 bg-black/80 px-3 py-1 rounded font-mono font-bold text-base tracking-wider ${
                    registroActivo.estado === "fuga"
                      ? "border-amber-400 text-amber-300"
                      : registroActivo.estado === "cuadrado"
                        ? "border-emerald-400 text-emerald-300"
                        : "border-stone-400 text-stone-200"
                  }`}
                >
                  {registroActivo.placa}
                </div>

                <div className="absolute top-3 left-3 bg-black/70 text-stone-300 font-mono text-[11px] px-2 py-0.5 rounded border border-stone-700">
                  15-11-2026 | {registroActivo.entrada} | LECTURA LPR
                </div>
              </div>

              <div className="p-5 bg-[#FAFAF9]">
                <h4 className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-3">
                  Cruce de auditoría
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                    <p className="text-xs text-stone-500 mb-1">Registro físico (cámara)</p>
                    <p className="font-mono font-bold text-sm text-[#111315]">
                      {registroActivo.tiempo} de estadía
                    </p>
                    <p className="font-mono text-xs text-stone-400 mt-1">
                      {registroActivo.entrada} - {registroActivo.salida}
                    </p>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      registroActivo.estado === "fuga"
                        ? "bg-amber-50/70 border-amber-200"
                        : "bg-white border-stone-200"
                    }`}
                  >
                    <p className="text-xs text-stone-500 mb-1">Registro financiero (caja)</p>
                    <p
                      className={`font-semibold text-sm ${
                        registroActivo.estado === "fuga"
                          ? "text-amber-800"
                          : "text-[#111315]"
                      }`}
                    >
                      Ticket: {registroActivo.ticket}
                    </p>
                    <p className="font-mono text-xs text-stone-500 mt-1">
                      Cobro: {registroActivo.cobro}
                    </p>
                  </div>
                </div>

                <div className="mt-3.5">
                  {registroActivo.estado === "fuga" ? (
                    <p className="text-sm text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-start gap-2.5">
                      <AlertIcon className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                      <span>
                        <strong>Fuga de efectivo detectada:</strong> El vehículo salió de las instalaciones pero el sistema de caja reporta $0.00 cobrados.
                      </span>
                    </p>
                  ) : registroActivo.estado === "cuadrado" ? (
                    <p className="text-sm text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                      <CheckIcon className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
                      <span>
                        <strong>Auditoría exitosa:</strong> El tiempo de estadía coincide con los {registroActivo.cobro} facturados en caja.
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-stone-700 bg-stone-100 p-3 rounded-xl border border-stone-200 flex items-start gap-2.5">
                      <CarIcon className="w-4 h-4 shrink-0 mt-0.5 text-stone-500" />
                      <span>
                        Vehículo autorizado por pago mensual. No requiere ticket de salida.
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
