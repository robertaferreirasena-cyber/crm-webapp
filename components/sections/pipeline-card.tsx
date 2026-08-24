"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lead } from "@/lib/types";
import { formatPhone } from "@/lib/leads-utils";
import { GripVertical, Phone, Star } from "lucide-react";

const TEMP_COLOR: Record<string, string> = {
  quente: "var(--vermelho)",
  morno: "var(--amarelo)",
  frio: "var(--azul)",
};

export function PipelineCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group flex cursor-grab flex-col gap-1.5 rounded-[10px] border border-[var(--borda)] bg-[var(--painel2)] p-3 shadow-[var(--sombra)] active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-tight">{lead.nome}</p>
        <GripVertical className="h-4 w-4 shrink-0 text-[var(--fraco)] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      {lead.categoria && <p className="text-xs text-[var(--fraco)]">{lead.categoria}</p>}
      <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-[var(--fraco)]">
        {lead.telefone && (
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" /> {formatPhone(lead.telefone)}
          </span>
        )}
        {typeof lead.nota === "number" && (
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" /> {lead.nota}
          </span>
        )}
      </div>
      {lead.qualificacao && (
        <span
          className="mt-0.5 w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
          style={{
            color: TEMP_COLOR[lead.qualificacao],
            borderColor: TEMP_COLOR[lead.qualificacao],
          }}
        >
          {lead.qualificacao}
        </span>
      )}
    </div>
  );
}
