"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertIcon,
  ArrowRightIcon,
  CameraIcon,
  CheckIcon,
  PlusIcon,
  VehicleFrontGraphic,
} from "./components/icons";

type DemoEvent = {
  id: string;
  placa: string;
  hora: string;
  estadia: string;
  camara: string;
  estado: "fuga" | "cuadrado";
  etiqueta: string;
  caja: string;
  detalle: string;
};

const demoEvents: DemoEvent[] = [
  {
    id: "p112",
    placa: "P-112 554",
    hora: "14:15",
    estadia: "2h 15m",
    camara: "CAM_02_SALIDA",
    estado: "fuga",
    etiqueta: "Sin ticket",
    caja: "$0.00 registrados",
    detalle: "El vehículo salió hace 14 minutos sin registro de cobro en caja.",
  },
  {
    id: "p789",
    placa: "P-789 123",
    hora: "14:02",
    estadia: "1h 40m",
    camara: "CAM_01_ENTRADA",
    estado: "cuadrado",
    etiqueta: "Cuadrado",
    caja: "$3.50 (Ticket #4092)",
    detalle: "Tiempo en cámara coincide exactamente con el ticket facturado.",
  },
  {
    id: "c102",
    placa: "C-102 304",
    hora: "13:48",
    estadia: "0h 40m",
    camara: "CAM_02_SALIDA",
    estado: "fuga",
    etiqueta: "Sin ticket",
    caja: "$0.00 registrados",
    detalle: "Salida confirmada en video sin comprobante emitido en sistema.",
  },
];

const steps = [
  {
    num: "01",
    title: "Conectamos tus cámaras",
    desc: "Enlazamos nuestro software en la nube a las cámaras IP que ya vigilan tu entrada y salida.",
  },
  {
    num: "02",
    title: "Lectura automática de placas",
    desc: "Cada vehículo queda registrado con fotografía, hora exacta de ingreso, salida y duración.",
  },
  {
    num: "03",
    title: "Auditoría contra caja",
    desc: "El sistema cruza los registros físicos con los tickets cobrados y alerta cualquier diferencia.",
  },
];

const faqs = [
  {
    q: "¿De verdad no tengo que comprar cámaras nuevas?",
    a: "Exacto. Si tu parqueo ya tiene cámaras IP de seguridad en la entrada, nuestro software se conecta a ellas sin instalar hardware adicional.",
  },
  {
    q: "¿Es un sistema para vigilar a mis empleados?",
    a: "No. Auditar no es vigilar. NetPark brinda cuentas claras para el dueño y protege al personal con reglas transparentes y evidencia objetiva.",
  },
  {
    q: "¿Qué pasa con la privacidad de los clientes?",
    a: "Cuidamos las imágenes y placas como datos sensibles. El acceso está restringido por roles y cumple con buenas prácticas de privacidad desde el diseño.",
  },
  {
    q: "¿Cómo recupero el 15% de fuga de efectivo?",
    a: "Al existir un registro inalterable de cada vehículo que entra y sale, ningún ticket pasa desapercibido. Cada cobro queda respaldado por fotografía.",
  },
  {
    q: "¿Funciona si llueve o es de noche?",
    a: "Sí. Siempre que las cámaras actuales de tu parqueo cuenten con visión nocturna y claridad suficiente, el motor lee las placas con precisión.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Al no requerir obra civil ni talanqueras, dejamos la conexión configurada en menos de 48 horas después de evaluar tus cámaras.",
  },
  {
    q: "¿Necesito un servidor en mi local?",
    a: "No. NetPark opera en la nube y puedes revisar tu panel de auditoría desde cualquier computadora o teléfono.",
  },
  {
    q: "¿Puedo probarlo antes de comprometerme?",
    a: "Sí. Incluimos un piloto de 14 días para que compruebes el retorno de inversión directamente en tu caja.",
  },
];

export default function NetParkLanding() {
  const [selectedId, setSelectedId] = useState<string>(demoEvents[0].id);
  const [evidenciaAbierta, setEvidenciaAbierta] = useState<boolean>(true);

  const activeEvent =
    demoEvents.find((event) => event.id === selectedId) ?? demoEvents[0];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111315] font-sans selection:bg-emerald-200 selection:text-[#111315]">
      <header className="sticky top-0 z-40 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#111315] text-white font-mono font-bold text-sm flex items-center justify-center">
              P
            </span>
            <span className="text-lg font-bold tracking-tight text-[#111315]">
              NetPark
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#demo" className="hover:text-[#111315] transition-colors">
              Demo en vivo
            </a>
            <a href="#como-funciona" className="hover:text-[#111315] transition-colors">
              Cómo funciona
            </a>
            <a href="#precios" className="hover:text-[#111315] transition-colors">
              Precios
            </a>
            <a href="#faq" className="hover:text-[#111315] transition-colors">
              Preguntas
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/reporte"
              className="hidden sm:inline-flex text-sm font-medium text-stone-700 hover:text-[#111315] px-3 py-2 transition-colors"
            >
              Ver reporte
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-1.5 bg-[#111315] hover:bg-stone-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Solicitar piloto
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono uppercase tracking-wider text-stone-600 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Auditoría de parqueos sin hardware
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.06] text-[#111315] mb-6">
                Recupera el dinero que se escapa de tu parqueo.
              </h1>

              <p className="text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
                <strong className="text-[#111315] font-semibold">Cada placa cuenta.</strong>{" "}
                Audita y gestiona cobros leyendo las placas con las cámaras IP que ya tienes instaladas. Sin talanqueras. Sin terminales nuevas. Sin obra.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 bg-[#111315] hover:bg-stone-800 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors"
                >
                  Pide tu piloto sin hardware
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/reporte"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-[#111315] font-semibold px-6 py-3.5 rounded-lg border border-stone-300 transition-colors"
                >
                  Ver reporte de auditoría
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200 max-w-lg">
                <div>
                  <div className="font-mono text-2xl font-bold text-[#111315]">$0</div>
                  <div className="text-xs text-stone-500 mt-1">Inversión en equipo</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-[#111315]">&lt; 48h</div>
                  <div className="text-xs text-stone-500 mt-1">Puesta en marcha</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-emerald-700">+15%</div>
                  <div className="text-xs text-stone-500 mt-1">Ingreso recuperable</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-xs font-semibold text-stone-700">
                      FLUJO EN TIEMPO REAL
                    </span>
                  </div>
                  <span className="font-mono text-xs text-stone-500">Sucursal Centro</span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="bg-[#111315] rounded-xl p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-3">
                      <span>CAM_02_SALIDA</span>
                      <span className="text-emerald-400">LPR ACTIVO</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-stone-400 mb-1">Última lectura</div>
                        <div className="font-mono text-2xl font-bold text-white tracking-wider">
                          P-112 554
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-300 border border-amber-500/40 font-mono text-xs px-2.5 py-1 rounded">
                        <AlertIcon className="w-3.5 h-3.5" />
                        Sin ticket
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                    {demoEvents.map((row) => (
                      <div
                        key={row.id}
                        className="px-4 py-3 flex items-center justify-between bg-white text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#111315]">
                            {row.placa}
                          </span>
                          <span className="text-xs text-stone-400 font-mono">{row.hora}</span>
                        </div>
                        {row.estado === "fuga" ? (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                            Alerta de fuga
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            Cuadrado
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-stone-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-3">
                El problema silencioso
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#111315] leading-tight">
                Hasta un 15% de los ingresos de un parqueo se pierden sin dejar rastro.
              </h2>
            </div>

            <div className="md:col-span-7 space-y-6">
              <p className="text-base md:text-lg text-stone-600 leading-relaxed">
                Un ticket que no se registra, un cobro que no coincide, una caja que no cuadra. El dinero se escapa en montos pequeños que nadie percibe durante el turno. NetPark hace visible cada movimiento para que tu caja cuadre al centavo.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  {
                    label: "Salidas sin ticket",
                    desc: "Vehículos que salen sin registro en el punto de cobro.",
                  },
                  {
                    label: "Estadías alteradas",
                    desc: "Diferencias entre el tiempo real y el tiempo facturado.",
                  },
                  {
                    label: "Cierres manuales",
                    desc: "Control que depende únicamente de reportes en papel.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-[#FAFAF9] border border-stone-200"
                  >
                    <div className="font-semibold text-sm text-[#111315] mb-1">
                      {item.label}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 px-6 bg-[#111315] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-emerald-400 mb-2">
                  Demo interactiva
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Así detecta NetPark cada diferencia en caja
                </h2>
              </div>
              <Link
                href="/reporte"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 px-4 py-2 rounded-lg transition-colors self-start md:self-auto"
              >
                Explorar reporte completo
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-[#181B1F] border border-stone-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-4">
                    Selecciona un evento detectado
                  </div>

                  <div className="space-y-2.5">
                    {demoEvents.map((event) => {
                      const isSelected = event.id === activeEvent.id;
                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => {
                            setSelectedId(event.id);
                            setEvidenciaAbierta(true);
                          }}
                          className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#22262C] border-stone-500"
                              : "bg-[#111315]/60 border-stone-800 hover:border-stone-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono font-bold text-base text-white">
                              {event.placa}
                            </span>
                            {event.estado === "fuga" ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                <AlertIcon className="w-3 h-3" />
                                {event.etiqueta}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                <CheckIcon className="w-3 h-3" />
                                {event.etiqueta}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                            <span>Salida: {event.hora}</span>
                            <span>Estadía: {event.estadia}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => setEvidenciaAbierta((prev) => !prev)}
                    className="w-full bg-white hover:bg-stone-200 text-[#111315] font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CameraIcon className="w-4 h-4" />
                    {evidenciaAbierta ? "Ocultar lectura de placa" : "Mostrar lectura de placa"}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#181B1F] border border-stone-800 rounded-2xl overflow-hidden flex flex-col">
                <div className="px-5 py-3 border-b border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{activeEvent.camara}</span>
                  </div>
                  <span>15-11-2026 | {activeEvent.hora}</span>
                </div>

                <div className="relative bg-[#0D0F12] h-56 sm:h-64 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:18px_18px] opacity-50"></div>

                  <VehicleFrontGraphic className="w-48 sm:w-56 h-28 sm:h-36 -translate-y-3 relative z-10" />

                  {evidenciaAbierta && (
                    <div
                      className={`absolute bottom-5 z-10 border-2 px-3.5 py-1 rounded bg-black/80 font-mono font-bold text-base sm:text-lg tracking-wider ${
                        activeEvent.estado === "fuga"
                          ? "border-amber-400 text-amber-300"
                          : "border-emerald-400 text-emerald-300"
                      }`}
                    >
                      {activeEvent.placa}
                    </div>
                  )}
                </div>

                <div className="p-5 grid sm:grid-cols-2 gap-4 border-t border-stone-800">
                  <div>
                    <div className="text-xs font-mono uppercase text-stone-500 mb-1">
                      Registro en caja
                    </div>
                    <div className="font-semibold text-sm text-white">{activeEvent.caja}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-stone-500 mb-1">
                      Diagnóstico
                    </div>
                    <p className="text-sm text-stone-300">{activeEvent.detalle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-20 px-6 border-b border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-2">
                Implementación
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111315]">
                Menos obra, más control. En tres pasos.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white p-7 rounded-2xl border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-sm font-bold text-emerald-700 mb-6">
                      {step.num}
                    </div>
                    <h3 className="text-xl font-bold text-[#111315] mb-3">{step.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="precios" className="py-20 px-6 bg-white border-b border-stone-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-2">
                Retorno de inversión
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111315] mb-3">
                Sin inversión inicial en hardware
              </h2>
              <p className="text-stone-600">
                Compara lo que cuesta modernizar un parqueo con equipo físico frente a conectar tus cámaras actuales.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="rounded-2xl border border-stone-200 bg-[#FAFAF9] p-8 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-2">
                    Esquema tradicional
                  </div>
                  <div className="text-3xl font-bold text-stone-400 line-through mb-6">
                    $3,850 iniciales
                  </div>

                  <ul className="space-y-4 text-sm text-stone-600 border-t border-stone-200 pt-6">
                    <li className="flex justify-between">
                      <span>Instalación de talanqueras nuevas</span>
                      <span className="font-mono text-stone-500">$2,500</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Terminales de cobro físico</span>
                      <span className="font-mono text-stone-500">$1,200</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Licencias de software tradicional</span>
                      <span className="font-mono text-stone-500">$150/mes</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obra civil y mantenimiento técnico</span>
                      <span className="font-mono text-stone-500">Variable</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200 text-xs text-stone-500">
                  Semanas de instalación y altos costos fijos de mantenimiento.
                </div>
              </div>

              <div className="rounded-2xl border border-[#111315] bg-[#111315] text-white p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                      NetPark en la nube
                    </span>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      14 días gratis
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-extrabold font-mono">$80</span>
                    <span className="text-stone-400 text-sm">/ mes por sucursal</span>
                  </div>
                  <p className="text-xs text-stone-400 mb-6">$0 en hardware y $0 en obra civil.</p>

                  <ul className="space-y-3.5 text-sm text-stone-200 border-t border-stone-800 pt-6">
                    {[
                      "Conexión directa a tus cámaras IP existentes",
                      "Lectura automática de placas con evidencia fotográfica",
                      "Alertas de salidas sin ticket en tiempo real",
                      "Panel de auditoría diaria y exportación a CSV",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5">
                        <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/checkout"
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#111315] font-bold py-3.5 rounded-lg transition-colors"
                >
                  Comenzar mi piloto hoy
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-stone-200">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-2">
                Impacto operativo
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#111315]">
                Lo que cambia en un parqueo mediano
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-stone-200">
                <div className="inline-block font-mono text-xs uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded mb-5">
                  Antes de NetPark
                </div>
                <p className="text-stone-700 leading-relaxed text-base">
                  &quot;No sabíamos cuántos carros entraban realmente. La caja variaba sin explicación y dependíamos totalmente de lo que nos reportaba el personal a mano.&quot;
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-emerald-200 ring-1 ring-emerald-100">
                <div className="inline-block font-mono text-xs uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded mb-5">
                  Con NetPark
                </div>
                <p className="text-[#111315] leading-relaxed text-base font-medium">
                  &quot;Todo cuadra. El software nos muestra las fotos de las placas. El personal trabaja con reglas transparentes y nosotros recuperamos ese 15% de ingresos perdidos.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-2">
                  Preguntas frecuentes
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-[#111315] mb-4">
                  Resolvemos tus dudas antes del piloto
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Si ya cuentas con cámaras de seguridad en el acceso de tu parqueo, estás listo para empezar.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 divide-y divide-stone-200 border-y border-stone-200">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-base text-[#111315]">
                    <span>{faq.q}</span>
                    <PlusIcon className="w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed pr-8">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 bg-[#FAFAF9]">
          <div className="max-w-5xl mx-auto bg-[#111315] text-white rounded-3xl p-10 md:p-16 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-emerald-400 mb-4">
              Piloto de 14 días sin compromiso
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl mx-auto">
              ¿Quieres probarlo en tu parqueo sin riesgo?
            </h2>
            <p className="text-stone-400 text-lg mb-8 max-w-xl mx-auto">
              Programa un piloto medible. Se paga solo con el dinero que recuperas desde la primera semana.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#111315] font-bold px-8 py-4 rounded-xl transition-colors"
              >
                Solicitar piloto ahora
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/reporte"
                className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold px-8 py-4 rounded-xl border border-stone-700 transition-colors"
              >
                Ver ejemplo de reporte
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#111315] text-white font-mono font-bold text-xs flex items-center justify-center">
              P
            </span>
            <span className="font-semibold text-[#111315]">NetPark</span>
            <span className="text-stone-400">/</span>
            <span>Auditoría de parqueos</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/reporte" className="hover:text-[#111315] transition-colors">
              Reporte demo
            </Link>
            <Link href="/checkout" className="hover:text-[#111315] transition-colors">
              Solicitar piloto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
