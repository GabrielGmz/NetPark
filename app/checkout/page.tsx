"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
} from "../components/icons";

type CardBrandId = "visa" | "mastercard" | "amex" | "discover";

type CardBrand = {
  id: CardBrandId;
  name: string;
  short: string;
  maxDigits: number;
  cvcLength: number;
  numberPlaceholder: string;
  cvcPlaceholder: string;
};

const cardBrands: CardBrand[] = [
  {
    id: "visa",
    name: "Visa",
    short: "VISA",
    maxDigits: 16,
    cvcLength: 3,
    numberPlaceholder: "0000 0000 0000 0000",
    cvcPlaceholder: "123",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    short: "MC",
    maxDigits: 16,
    cvcLength: 3,
    numberPlaceholder: "0000 0000 0000 0000",
    cvcPlaceholder: "123",
  },
  {
    id: "amex",
    name: "Amex",
    short: "AMEX",
    maxDigits: 15,
    cvcLength: 4,
    numberPlaceholder: "0000 000000 00000",
    cvcPlaceholder: "1234",
  },
  {
    id: "discover",
    name: "Discover",
    short: "DISC",
    maxDigits: 16,
    cvcLength: 3,
    numberPlaceholder: "0000 0000 0000 0000",
    cvcPlaceholder: "123",
  },
];

function detectBrandFromDigits(digits: string): CardBrandId | null {
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^(6011|65|64[4-9])/.test(digits)) return "discover";
  return null;
}

function formatCardNumber(raw: string, brand: CardBrandId): string {
  const maxDigits = brand === "amex" ? 15 : 16;
  const digits = raw.replace(/\D/g, "").slice(0, maxDigits);

  if (brand === "amex") {
    const part1 = digits.slice(0, 4);
    const part2 = digits.slice(4, 10);
    const part3 = digits.slice(10, 15);
    return [part1, part2, part3].filter(Boolean).join(" ");
  }

  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw: string, previous: string): string {
  const isDeleting = raw.length < previous.length;
  let digits = raw.replace(/\D/g, "").slice(0, 4);

  if (isDeleting && previous.endsWith("/") && raw === previous.slice(0, -1)) {
    digits = digits.slice(0, -1);
  }

  if (digits.length === 0) return "";

  if (digits.length === 1) {
    if (Number(digits) > 1) {
      return `0${digits}/`;
    }
    return digits;
  }

  let month = digits.slice(0, 2);
  const monthNum = Number(month);
  if (monthNum === 0) {
    month = "01";
  } else if (monthNum > 12) {
    month = "12";
  }

  const year = digits.slice(2, 4);
  if (digits.length === 2) {
    return isDeleting ? month : `${month}/`;
  }

  return `${month}/${year}`;
}

function formatCvc(raw: string, brand: CardBrandId): string {
  const maxLength = brand === "amex" ? 4 : 3;
  return raw.replace(/\D/g, "").slice(0, maxLength);
}

function formatCardholder(raw: string): string {
  return raw
    .replace(/[^a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s.-]/g, "")
    .replace(/\s{2,}/g, " ")
    .toUpperCase();
}

function BrandMark({
  brand,
  active,
}: {
  brand: CardBrandId;
  active: boolean;
}) {
  if (brand === "mastercard") {
    return (
      <svg viewBox="0 0 28 18" className="w-6 h-4 shrink-0" aria-hidden="true">
        <circle cx="10.5" cy="9" r="6.5" fill="#EB001B" fillOpacity={active ? "0.95" : "0.85"} />
        <circle cx="17.5" cy="9" r="6.5" fill="#F79E1B" fillOpacity={active ? "0.95" : "0.85"} />
      </svg>
    );
  }

  if (brand === "visa") {
    return (
      <span
        className={`font-mono text-[10px] font-extrabold tracking-tighter italic px-1.5 py-0.5 rounded border ${
          active
            ? "bg-white/10 border-white/25 text-white"
            : "bg-stone-100 border-stone-200 text-[#1A1F71]"
        }`}
      >
        VISA
      </span>
    );
  }

  if (brand === "amex") {
    return (
      <span
        className={`font-mono text-[10px] font-extrabold tracking-tight px-1.5 py-0.5 rounded border ${
          active
            ? "bg-sky-500/20 border-sky-400/40 text-sky-200"
            : "bg-sky-50 border-sky-200 text-sky-800"
        }`}
      >
        AMEX
      </span>
    );
  }

  return (
    <span
      className={`font-mono text-[10px] font-extrabold tracking-tight px-1.5 py-0.5 rounded border ${
        active
          ? "bg-amber-500/20 border-amber-400/40 text-amber-200"
          : "bg-amber-50 border-amber-200 text-amber-800"
      }`}
    >
      DISC
    </span>
  );
}

export default function NetParkCheckout() {
  const [enviado, setEnviado] = useState(false);
  const [marca, setMarca] = useState<CardBrandId>("visa");
  const [empresa, setEmpresa] = useState("");
  const [titular, setTitular] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvc, setCvc] = useState("");

  const activeBrand =
    cardBrands.find((item) => item.id === marca) ?? cardBrands[0];

  function handleSelectBrand(nextBrand: CardBrandId) {
    setMarca(nextBrand);
    setNumeroTarjeta((prev) => formatCardNumber(prev, nextBrand));
    setCvc((prev) => formatCvc(prev, nextBrand));
  }

  function handleCardNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const rawDigits = e.target.value.replace(/\D/g, "");
    const detected = detectBrandFromDigits(rawDigits);
    const resolvedBrand = detected ?? marca;

    if (detected && detected !== marca) {
      setMarca(detected);
      setCvc((prev) => formatCvc(prev, detected));
    }

    setNumeroTarjeta(formatCardNumber(e.target.value, resolvedBrand));
  }

  function handleExpiryChange(e: ChangeEvent<HTMLInputElement>) {
    setExpiracion((prev) => formatExpiry(e.target.value, prev));
  }

  function handleCvcChange(e: ChangeEvent<HTMLInputElement>) {
    setCvc(formatCvc(e.target.value, marca));
  }

  function handleCardholderChange(e: ChangeEvent<HTMLInputElement>) {
    setTitular(formatCardholder(e.target.value));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
  }

  const lastFour = numeroTarjeta.replace(/\D/g, "").slice(-4);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111315] font-sans flex flex-col selection:bg-emerald-200 selection:text-[#111315]">
      <header className="bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#111315] text-white font-mono font-bold text-sm flex items-center justify-center">
              P
            </span>
            <span className="text-lg font-bold tracking-tight text-[#111315]">
              NetPark
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-[#111315] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-16">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-2">
            Activación de piloto
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#111315]">
            Empieza tu prueba de 14 días sin hardware
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-5 bg-[#111315] text-white rounded-2xl p-8 border border-[#111315] shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                Suscripción SaaS
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                14 días gratis
              </span>
            </div>

            <div className="mb-6 pb-6 border-b border-stone-800">
              <div className="text-xs text-stone-400 mb-1">Total a cobrar hoy</div>
              <div className="font-mono text-4xl font-extrabold text-white">$0.00</div>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Después del periodo de piloto se cobrarán $80.00 mensuales si decides continuar.
              </p>
            </div>

            <div className="space-y-3.5 text-sm pb-6 border-b border-stone-800">
              <div className="flex justify-between items-center">
                <span className="text-stone-300">Licencia mensual</span>
                <span className="font-mono font-semibold text-white">$80.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Instalación de hardware</span>
                <span className="font-mono text-stone-300">$0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Piloto inicial (14 días)</span>
                <span className="font-mono text-emerald-400">Gratis</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-stone-300 pt-6">
              {[
                "Conexión remota a tus cámaras IP en menos de 48h",
                "Evidencia fotográfica de cada placa detectada",
                "Cancelación libre antes de terminar los 14 días",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          <section className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            {enviado ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-[#111315]">
                  Solicitud de piloto registrada
                </h2>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Nuestro equipo técnico coordinará la conexión con tus cámaras IP en menos de 48 horas.
                  {lastFour ? (
                    <>
                      {" "}
                      Método respaldado con{" "}
                      <span className="font-semibold text-[#111315]">
                        {activeBrand.name}
                      </span>{" "}
                      terminada en{" "}
                      <span className="font-mono font-semibold text-[#111315]">
                        {lastFour}
                      </span>
                      .
                    </>
                  ) : null}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    href="/reporte"
                    className="inline-flex items-center justify-center gap-2 bg-[#111315] hover:bg-stone-800 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
                  >
                    Ver panel de auditoría
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setEnviado(false)}
                    className="inline-flex items-center justify-center bg-white hover:bg-stone-100 text-stone-700 text-sm font-semibold px-5 py-3 rounded-lg border border-stone-300 transition-colors cursor-pointer"
                  >
                    Editar datos
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#111315]">
                    Configurar método de pago
                  </h2>
                  <p className="text-sm text-stone-500 mt-1">
                    No se realizará ningún cargo durante tus primeros 14 días.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="empresa"
                      className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
                    >
                      Nombre del parqueo o empresa
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Ej. Parqueos San Salvador S.A."
                      autoComplete="organization"
                      className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-3 text-sm text-[#111315] placeholder:text-stone-400 focus:outline-none focus:border-[#111315] focus:ring-1 focus:ring-[#111315] transition-colors"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-2">
                      Marca de tarjeta
                    </span>
                    <div
                      role="radiogroup"
                      aria-label="Marca de tarjeta de crédito"
                      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                    >
                      {cardBrands.map((item) => {
                        const isActive = item.id === marca;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={isActive}
                            onClick={() => handleSelectBrand(item.id)}
                            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                              isActive
                                ? "bg-[#111315] border-[#111315] text-white shadow-sm"
                                : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"
                            }`}
                          >
                            <BrandMark brand={item.id} active={isActive} />
                            <span>{item.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="titular"
                      className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
                    >
                      Nombre en la tarjeta
                    </label>
                    <input
                      id="titular"
                      type="text"
                      value={titular}
                      onChange={handleCardholderChange}
                      placeholder="NOMBRE APELLIDO"
                      autoComplete="cc-name"
                      className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-3 text-sm font-mono tracking-wide text-[#111315] placeholder:text-stone-400 focus:outline-none focus:border-[#111315] focus:ring-1 focus:ring-[#111315] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="tarjeta"
                      className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
                    >
                      Número de tarjeta
                    </label>
                    <div className="relative">
                      <input
                        id="tarjeta"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={numeroTarjeta}
                        onChange={handleCardNumberChange}
                        maxLength={activeBrand.id === "amex" ? 17 : 19}
                        placeholder={activeBrand.numberPlaceholder}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-3 pr-20 text-sm font-mono tracking-wider text-[#111315] placeholder:text-stone-400 focus:outline-none focus:border-[#111315] focus:ring-1 focus:ring-[#111315] transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        <BrandMark brand={marca} active={false} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiracion"
                        className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
                      >
                        Expiración
                      </label>
                      <input
                        id="expiracion"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        value={expiracion}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        placeholder="MM/AA"
                        className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-3 text-sm font-mono tracking-wider text-[#111315] placeholder:text-stone-400 focus:outline-none focus:border-[#111315] focus:ring-1 focus:ring-[#111315] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5"
                      >
                        {activeBrand.id === "amex" ? "CID (4 dígitos)" : "CVC"}
                      </label>
                      <input
                        id="cvc"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={cvc}
                        onChange={handleCvcChange}
                        maxLength={activeBrand.cvcLength}
                        placeholder={activeBrand.cvcPlaceholder}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-3 text-sm font-mono tracking-wider text-[#111315] placeholder:text-stone-400 focus:outline-none focus:border-[#111315] focus:ring-1 focus:ring-[#111315] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-stone-600 bg-[#FAFAF9] border border-stone-200 px-3.5 py-3 rounded-lg">
                    <LockIcon className="w-4 h-4 shrink-0 text-emerald-700" />
                    <span>Pago protegido con cifrado SSL de 256 bits.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#111315] hover:bg-stone-800 text-white font-semibold text-sm py-3.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Iniciar piloto seguro
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    <Link
                      href="/"
                      className="text-stone-500 text-xs hover:text-[#111315] font-medium transition-colors"
                    >
                      Volver a la información del sistema
                    </Link>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
