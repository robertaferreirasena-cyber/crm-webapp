"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Lead } from "@/lib/types";
import { LeadRow } from "@/components/sections/lead-row";
import { LeadModal } from "@/components/sections/lead-modal";
import { EmptyState } from "@/components/empty-state";
import { Search, Users } from "lucide-react";

export function LeadsSection({
  leads,
  setLeads,
}: {
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
}) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.nome, l.telefone, l.categoria, l.endereco, l.contexto]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    );
  }, [leads, query]);

  const selectedLead = leads.find((l) => l.id === selectedId) ?? null;

  function handleSave(updated: Lead) {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-8 w-8" />}
        title="Nenhum lead cadastrado"
        description="Rode uma prospecção para popular a base — os leads aparecem aqui com ficha completa e edição de notas."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--fraco)]" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, telefone, categoria…"
          className="h-11 pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search className="h-8 w-8" />}
          title="Nenhum resultado"
          description="Ajuste a busca para encontrar o lead que você procura."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((lead) => (
            <LeadRow key={lead.id} lead={lead} onClick={() => setSelectedId(lead.id)} />
          ))}
        </div>
      )}

      <LeadModal lead={selectedLead} onClose={() => setSelectedId(null)} onSave={handleSave} />
    </div>
  );
}
