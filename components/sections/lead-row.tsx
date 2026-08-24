"use client";

import { ETAPAS, Lead } from "@/lib/types";
import { formatPhone } from "@/lib/leads-utils";
import { Phone, Star } from "lucide-react";

const TEMP_COLOR: Record<string, string> = {
  quente: "var(--vermelho)",
  morno: "var(--amarelo)",
  frio: "var(--azul)",
};

export function LeadRow({ lead, onClick }: { lead: Lead; onClick: () => void }) {
  const etapaLabel = ETAPAS.find((e) => e.id === lead.etapa)?.label ?? lead.etapa;

  return (
    <button
      onClick={onClick}
      className="flex w-full min-h-[64px] flex-col gap-1.5 rounded-[var(--r)] border border-[var(--borda)] bg-[var(--painel)] p-3.5 text-left shadow-[var(--sombra)] transition-colors hover:border-[var(--azul)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-sm font-semibold">{lead.nome}</p>
        <p className="truncate text-xs text-[var(--fraco)]">
          {[lead.categoria, lead.endereco].filter(Boolean).join(" · ") || "Sem detalhes"}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--fraco)] sm:shrink-0">
        {lead.telefone && (
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" /> {formatPhone(lead.telefone)}
          </span>
        )}
        {typeof lead.nota === "number" && (
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" /> {lead.nota}
            {lead.avaliacoes ? ` (${lead.avaliacoes})` : ""}
          </span>
        )}
        <span className="rounded-full bg-[var(--painel2)] px-2 py-0.5 font-medium">{etapaLabel}</span>
        {lead.qualificacao && (
          <span
            className="rounded-full border px-2 py-0.5 font-medium uppercase tracking-wide"
            style={{ color: TEMP_COLOR[lead.qualificacao], borderColor: TEMP_COLOR[lead.qualificacao] }}
          >
            {lead.qualificacao}
          </span>
        )}
      </div>
    </button>
  );
}
