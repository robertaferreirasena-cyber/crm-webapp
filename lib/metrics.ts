import { Etapa, FUNIL_ORDER, Lead, Qualificacao } from "./types";

export interface FunilEtapaStat {
  etapa: Etapa;
  label: string;
  count: number;
  pctDoTotal: number;
  taxaConversao: number | null;
}

export interface Metricas {
  total: number;
  funil: FunilEtapaStat[];
  fechados: number;
  perdidos: number;
  emAndamento: number;
  taxaFechamento: number;
  taxaPerda: number;
  temperatura: { qualificacao: Qualificacao | "sem_qualificacao"; label: string; count: number; pct: number }[];
}

const LABELS: Record<Etapa, string> = {
  prospectado: "Prospectado",
  contatado: "Contatado",
  reuniao_marcada: "Reunião marcada",
  reuniao_feita: "Reunião feita",
  proposta: "Proposta",
  fechado: "Fechado",
  perdido: "Perdido",
};

const TEMP_LABELS: Record<Qualificacao | "sem_qualificacao", string> = {
  quente: "Quente",
  morno: "Morno",
  frio: "Frio",
  sem_qualificacao: "Sem qualificação",
};

export function computeMetricas(leads: Lead[]): Metricas {
  const total = leads.length;
  const indexOf = new Map(FUNIL_ORDER.map((etapa, i) => [etapa, i]));

  const funil: FunilEtapaStat[] = FUNIL_ORDER.map((etapa, i) => {
    const count =
      i === 0
        ? total
        : leads.filter((l) => {
            const idx = indexOf.get(l.etapa);
            return idx !== undefined && idx >= i;
          }).length;
    return {
      etapa,
      label: LABELS[etapa],
      count,
      pctDoTotal: total > 0 ? (count / total) * 100 : 0,
      taxaConversao: null,
    };
  });

  for (let i = 1; i < funil.length; i++) {
    const prev = funil[i - 1].count;
    funil[i].taxaConversao = prev > 0 ? (funil[i].count / prev) * 100 : 0;
  }

  const fechados = leads.filter((l) => l.etapa === "fechado").length;
  const perdidos = leads.filter((l) => l.etapa === "perdido").length;
  const emAndamento = total - fechados - perdidos;

  const temperaturaOrdem: (Qualificacao | "sem_qualificacao")[] = ["quente", "morno", "frio", "sem_qualificacao"];
  const temperatura = temperaturaOrdem.map((q) => {
    const count =
      q === "sem_qualificacao"
        ? leads.filter((l) => !l.qualificacao).length
        : leads.filter((l) => l.qualificacao === q).length;
    return {
      qualificacao: q,
      label: TEMP_LABELS[q],
      count,
      pct: total > 0 ? (count / total) * 100 : 0,
    };
  });

  return {
    total,
    funil,
    fechados,
    perdidos,
    emAndamento,
    taxaFechamento: total > 0 ? (fechados / total) * 100 : 0,
    taxaPerda: total > 0 ? (perdidos / total) * 100 : 0,
    temperatura,
  };
}
