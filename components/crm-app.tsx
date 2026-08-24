"use client";

import { useEffect, useMemo, useState } from "react";
import leadsBase from "@/data/leads_base.json";
import callsBase from "@/data/calls_base.json";
import { Chamada, Lead } from "@/lib/types";
import { normalizeLeads } from "@/lib/leads-utils";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/storage";
import { MetricsSection } from "@/components/sections/metrics-section";
import { PipelineSection } from "@/components/sections/pipeline-section";
import { LeadsSection } from "@/components/sections/leads-section";
import { CallsSection } from "@/components/sections/calls-section";
import { ConnectionSection } from "@/components/sections/connection-section";
import { BarChart3, KanbanSquare, Users, PhoneCall, Plug } from "lucide-react";

type Tab = "metricas" | "pipeline" | "leads" | "calls" | "conexao";

const TABS: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
  { id: "metricas", label: "Métricas", icon: BarChart3 },
  { id: "pipeline", label: "Pipeline", icon: KanbanSquare },
  { id: "leads", label: "Leads", icon: Users },
  { id: "calls", label: "Calls", icon: PhoneCall },
  { id: "conexao", label: "Conexão", icon: Plug },
];

export default function CrmApp() {
  const [tab, setTab] = useState<Tab>("metricas");
  const [leads, setLeads] = useState<Lead[]>(() =>
    loadFromStorage(STORAGE_KEYS.leads, normalizeLeads(leadsBase))
  );
  const [calls] = useState<Chamada[]>(() => loadFromStorage(STORAGE_KEYS.calls, callsBase as Chamada[]));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.leads, leads);
  }, [leads]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.calls, calls);
  }, [calls]);

  const activeLabel = useMemo(() => TABS.find((t) => t.id === tab)?.label ?? "", [tab]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--fundo)] text-[var(--texto)]">
      <header className="sticky top-0 z-30 border-b border-[var(--borda)] bg-[var(--fundo)]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[var(--azul)] to-[#1479a8] text-sm font-bold text-[#04121f]">
                CJ
              </div>
              <div className="leading-tight">
                <p className="text-[15px] font-semibold tracking-tight">CRM JARVIS</p>
                <p className="text-xs text-[var(--fraco)]">{activeLabel}</p>
              </div>
            </div>
          </div>
          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1" aria-label="Seções do CRM">
            {TABS.map(({ id, label, icon: Icon }) => {
              const active = id === tab;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-[10px] px-3.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--painel)] text-[var(--texto)] shadow-[var(--sombra)] ring-1 ring-[var(--borda)]"
                      : "text-[var(--fraco)] hover:bg-[var(--painel2)] hover:text-[var(--texto)]"
                  }`}
                >
                  <Icon className="h-4 w-4" style={{ color: active ? "var(--azul)" : undefined }} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 sm:px-6 sm:py-6">
        {tab === "metricas" && <MetricsSection leads={leads} />}
        {tab === "pipeline" && <PipelineSection leads={leads} setLeads={setLeads} />}
        {tab === "leads" && <LeadsSection leads={leads} setLeads={setLeads} />}
        {tab === "calls" && <CallsSection calls={calls} />}
        {tab === "conexao" && <ConnectionSection />}
      </main>
    </div>
  );
}
