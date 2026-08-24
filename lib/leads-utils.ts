import { Etapa, Lead, Qualificacao } from "./types";

const VALID_ETAPAS: Etapa[] = [
  "prospectado",
  "contatado",
  "reuniao_marcada",
  "reuniao_feita",
  "proposta",
  "fechado",
  "perdido",
];

const VALID_QUALIFICACOES: Qualificacao[] = ["quente", "morno", "frio"];

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeLeads(raw: unknown): Lead[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, index) => normalizeLead(item, index));
}

function normalizeLead(item: unknown, index: number): Lead {
  const source = (item ?? {}) as Record<string, unknown>;
  const nome = typeof source.nome === "string" && source.nome.trim() ? source.nome.trim() : `Lead ${index + 1}`;
  const etapaRaw = typeof source.etapa === "string" ? (source.etapa as string) : "";
  const etapa = VALID_ETAPAS.includes(etapaRaw as Etapa) ? (etapaRaw as Etapa) : "prospectado";
  const qualificacaoRaw = typeof source.qualificacao === "string" ? (source.qualificacao as string) : "";
  const qualificacao = VALID_QUALIFICACOES.includes(qualificacaoRaw as Qualificacao)
    ? (qualificacaoRaw as Qualificacao)
    : undefined;

  return {
    id: typeof source.id === "string" && source.id ? source.id : `${slugify(nome)}-${index}`,
    nome,
    telefone: asString(source.telefone),
    nota: typeof source.nota === "number" ? source.nota : asNumberOrUndefined(source.nota),
    avaliacoes: typeof source.avaliacoes === "number" ? source.avaliacoes : asNumberOrUndefined(source.avaliacoes),
    categoria: asString(source.categoria),
    endereco: asString(source.endereco),
    site: asString(source.site),
    maps: asString(source.maps),
    rede_social: asString(source.rede_social),
    contexto: asString(source.contexto),
    origem: asString(source.origem),
    etapa,
    qualificacao,
    notas: asString(source.notas),
  };
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumberOrUndefined(value: unknown): number | undefined {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && !Number.isNaN(n) ? n : undefined;
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function toWhatsAppLink(telefone: string): string {
  let digits = onlyDigits(telefone);
  if (digits.length <= 11) digits = `55${digits}`;
  return `https://wa.me/${digits}`;
}

export function toTelLink(telefone: string): string {
  const digits = onlyDigits(telefone);
  return `tel:+${digits.length <= 11 ? `55${digits}` : digits}`;
}

export function toExternalLink(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export function formatPhone(telefone: string): string {
  const digits = onlyDigits(telefone);
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return telefone;
}
