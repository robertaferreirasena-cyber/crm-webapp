export type Etapa =
  | "prospectado"
  | "contatado"
  | "reuniao_marcada"
  | "reuniao_feita"
  | "proposta"
  | "fechado"
  | "perdido";

export type Qualificacao = "quente" | "morno" | "frio";

export interface Lead {
  id: string;
  nome: string;
  telefone?: string;
  nota?: number;
  avaliacoes?: number;
  categoria?: string;
  endereco?: string;
  site?: string;
  maps?: string;
  rede_social?: string;
  contexto?: string;
  origem?: string;
  etapa: Etapa;
  qualificacao?: Qualificacao;
  notas?: string;
}

export interface Chamada {
  id: string;
  leadId?: string;
  leadNome?: string;
  data?: string;
  duracao?: string;
  transcricao?: string;
  resumo?: string;
  qualificacao?: Qualificacao;
}

export interface EtapaInfo {
  id: Etapa;
  label: string;
}

export const ETAPAS: EtapaInfo[] = [
  { id: "prospectado", label: "Prospectado" },
  { id: "contatado", label: "Contatado" },
  { id: "reuniao_marcada", label: "Reunião marcada" },
  { id: "reuniao_feita", label: "Reunião feita" },
  { id: "proposta", label: "Proposta" },
  { id: "fechado", label: "Fechado" },
  { id: "perdido", label: "Perdido" },
];

export const FUNIL_ORDER: Etapa[] = [
  "prospectado",
  "contatado",
  "reuniao_marcada",
  "reuniao_feita",
  "proposta",
  "fechado",
];

export const QUALIFICACOES: { id: Qualificacao; label: string }[] = [
  { id: "quente", label: "Quente" },
  { id: "morno", label: "Morno" },
  { id: "frio", label: "Frio" },
];
