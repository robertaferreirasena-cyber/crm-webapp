"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ETAPAS, Etapa, Lead } from "@/lib/types";
import { PipelineColumn } from "@/components/sections/pipeline-column";
import { PipelineCard } from "@/components/sections/pipeline-card";
import { EmptyState } from "@/components/empty-state";
import { KanbanSquare } from "lucide-react";

export function PipelineSection({
  leads,
  setLeads,
}: {
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  if (leads.length === 0) {
    return (
      <EmptyState
        icon={<KanbanSquare className="h-8 w-8" />}
        title="Pipeline vazio"
        description="Quando houver leads na base, eles aparecem aqui como cards que você arrasta entre as etapas."
      />
    );
  }

  const activeLead = activeId ? leads.find((l) => l.id === activeId) ?? null : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    setLeads((prev) => {
      const activeLead = prev.find((l) => l.id === activeId);
      if (!activeLead) return prev;

      const overIsColumn = overId.startsWith("col-");
      const destEtapa = (overIsColumn ? overId.slice(4) : prev.find((l) => l.id === overId)?.etapa) as
        | Etapa
        | undefined;
      if (!destEtapa) return prev;

      const rest = prev.filter((l) => l.id !== activeId);
      const updatedActive: Lead = { ...activeLead, etapa: destEtapa };

      if (overIsColumn) {
        let insertAt = rest.length;
        for (let i = rest.length - 1; i >= 0; i--) {
          if (rest[i].etapa === destEtapa) {
            insertAt = i + 1;
            break;
          }
        }
        rest.splice(insertAt, 0, updatedActive);
      } else {
        const overIndex = rest.findIndex((l) => l.id === overId);
        rest.splice(overIndex, 0, updatedActive);
      }

      return rest;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-3">
        {ETAPAS.map((etapa) => (
          <PipelineColumn key={etapa.id} etapa={etapa} leads={leads.filter((l) => l.etapa === etapa.id)} />
        ))}
      </div>
      <DragOverlay>{activeLead ? <PipelineCard lead={activeLead} /> : null}</DragOverlay>
    </DndContext>
  );
}
