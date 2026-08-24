"use client";

import { useMemo } from "react";
import { Lead } from "@/lib/types";
import { computeMetricas } from "@/lib/metrics";
import { EmptyState } from "@/components/empty-state";
import { BarChart3 } from "lucide-react";

function StatTile({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-[var(--r)] border border-[var(--borda)] bg-[var(--painel)] p-4 shadow-[var(--sombra)]">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fraco)]">{label}</p>
      <p className="mt-1.5 text-[clamp(1.5rem,4vw,1.9rem)] font-bold leading-none" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

const TEMP_COLORS: Record<string, string> = {
  quente: "var(--vermelho)",
  morno: "var(--amarelo)",
  frio: "var(--azul)",
  sem_qualificacao: "var(--fraco)",
};

export function MetricsSection({ leads }: { leads: Lead[] }) {
  const metricas = useMemo(() => computeMetricas(leads), [leads]);

  if (leads.length === 0) {
    return (
      <EmptyState
        icon={<BarChart3 className="h-8 w-8" />}
        title="Sem dados ainda"
        description="Assim que houver leads na base, as métricas de funil, conversão e temperatura aparecem aqui."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        <StatTile label="Total de leads" value={String(metricas.total)} />
        <StatTile label="Em andamento" value={String(metricas.emAndamento)} accent="var(--azul)" />
        <StatTile label="Fechados" value={String(metricas.fechados)} accent="var(--verde)" />
        <StatTile label="Perdidos" value={String(metricas.perdidos)} accent="var(--vermelho)" />
        <StatTile label="Taxa de fechamento" value={`${metricas.taxaFechamento.toFixed(0)}%`} accent="var(--verde)" />
        <StatTile label="Taxa de perda" value={`${metricas.taxaPerda.toFixed(0)}%`} accent="var(--vermelho)" />
      </div>

      <section className="rounded-[var(--r)] border border-[var(--borda)] bg-[var(--painel)] p-4 shadow-[var(--sombra)] sm:p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--fraco)]">
          Funil por etapa
        </h2>
        <div className="flex flex-col gap-3.5">
          {metricas.funil.map((etapa, i) => (
            <div key={etapa.etapa}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="text-sm font-medium">{etapa.label}</span>
                <span className="text-xs text-[var(--fraco)]">
                  {etapa.count} leads
                  {i > 0 && etapa.taxaConversao !== null && (
                    <> · {etapa.taxaConversao.toFixed(0)}% vieram da etapa anterior</>
                  )}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--painel2)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--azul)] to-[#1479a8] transition-all"
                  style={{ width: `${Math.max(etapa.pctDoTotal, etapa.count > 0 ? 2 : 0)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[var(--r)] border border-[var(--borda)] bg-[var(--painel)] p-4 shadow-[var(--sombra)] sm:p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--fraco)]">
          Temperatura dos leads
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
          {metricas.temperatura.map((t) => (
            <div key={t.qualificacao}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 font-medium">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: TEMP_COLORS[t.qualificacao] }}
                  />
                  {t.label}
                </span>
                <span className="text-[var(--fraco)]">{t.count}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--painel2)]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.max(t.pct, t.count > 0 ? 2 : 0)}%`, background: TEMP_COLORS[t.qualificacao] }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
