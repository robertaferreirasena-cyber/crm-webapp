"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { EtapaInfo, Lead } from "@/lib/types";
import { PipelineCard } from "@/components/sections/pipeline-card";

export function PipelineColumn({ etapa, leads }: { etapa: EtapaInfo; leads: Lead[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: `col-${etapa.id}` });

  return (
    <div className="flex w-[82vw] shrink-0 flex-col sm:w-[300px]">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold">{etapa.label}</h3>
        <span className="rounded-full bg-[var(--painel2)] px-2 py-0.5 text-xs text-[var(--fraco)]">
          {leads.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex min-h-[120px] flex-1 flex-col gap-2 rounded-[var(--r)] border p-2 transition-colors ${
          isOver ? "border-[var(--azul)] bg-[var(--painel2)]/60" : "border-[var(--borda)] bg-[var(--painel)]"
        }`}
      >
        <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <PipelineCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        {leads.length === 0 && (
          <p className="flex flex-1 items-center justify-center py-6 text-center text-xs text-[var(--fraco)]">
            Arraste um card para cá
          </p>
        )}
      </div>
    </div>
  );
}
