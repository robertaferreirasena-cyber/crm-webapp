"use client";

import { Chamada } from "@/lib/types";
import { EmptyState } from "@/components/empty-state";
import { PhoneCall } from "lucide-react";

const TEMP_COLOR: Record<string, string> = {
  quente: "var(--vermelho)",
  morno: "var(--amarelo)",
  frio: "var(--azul)",
};

export function CallsSection({ calls }: { calls: Chamada[] }) {
  if (calls.length === 0) {
    return (
      <EmptyState
        icon={<PhoneCall className="h-8 w-8" />}
        title="Sem chamadas registradas"
        description="Transcrições e qualificações de chamadas aparecem aqui assim que a conexão com o WhatsApp/Evolution API estiver ativa."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {calls.map((call) => (
        <div
          key={call.id}
          className="flex flex-col gap-2 rounded-[var(--r)] border border-[var(--borda)] bg-[var(--painel)] p-4 shadow-[var(--sombra)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">{call.leadNome ?? "Lead não identificado"}</p>
            <div className="flex items-center gap-2 text-xs text-[var(--fraco)]">
              {call.data && <span>{call.data}</span>}
              {call.duracao && <span>· {call.duracao}</span>}
              {call.qualificacao && (
                <span
                  className="rounded-full border px-2 py-0.5 font-medium uppercase tracking-wide"
                  style={{ color: TEMP_COLOR[call.qualificacao], borderColor: TEMP_COLOR[call.qualificacao] }}
                >
                  {call.qualificacao}
                </span>
              )}
            </div>
          </div>
          {call.resumo && <p className="text-sm text-[var(--texto)]">{call.resumo}</p>}
          {call.transcricao && (
            <p className="whitespace-pre-wrap text-xs text-[var(--fraco)]">{call.transcricao}</p>
          )}
        </div>
      ))}
    </div>
  );
}
