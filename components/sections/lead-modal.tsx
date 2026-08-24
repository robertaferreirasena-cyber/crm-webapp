"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead, QUALIFICACOES, Qualificacao } from "@/lib/types";
import { formatPhone, toExternalLink, toTelLink, toWhatsAppLink } from "@/lib/leads-utils";
import { MapPin, MessageCircle, Phone, Save } from "lucide-react";

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fraco)]">{label}</p>
      <p className="mt-0.5 text-sm">{value}</p>
    </div>
  );
}

export function LeadModal({
  lead,
  onClose,
  onSave,
}: {
  lead: Lead | null;
  onClose: () => void;
  onSave: (lead: Lead) => void;
}) {
  const [notas, setNotas] = useState("");
  const [qualificacao, setQualificacao] = useState<Qualificacao | "">("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (lead) {
      setNotas(lead.notas ?? "");
      setQualificacao(lead.qualificacao ?? "");
      setSaved(false);
    }
  }, [lead]);

  if (!lead) return null;

  function handleSave() {
    if (!lead) return;
    onSave({ ...lead, notas, qualificacao: qualificacao || undefined });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <Dialog open={!!lead} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[88vh] w-full max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">{lead.nome}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-1">
          {lead.telefone && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-[var(--fraco)]">{formatPhone(lead.telefone)}</span>
              <a
                href={toWhatsAppLink(lead.telefone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[var(--borda)] bg-[var(--painel2)] px-3 text-xs font-medium text-[var(--verde)] transition-colors hover:border-[var(--verde)]"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a
                href={toTelLink(lead.telefone)}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[var(--borda)] bg-[var(--painel2)] px-3 text-xs font-medium text-[var(--azul)] transition-colors hover:border-[var(--azul)]"
              >
                <Phone className="h-3.5 w-3.5" /> Ligar
              </a>
            </div>
          )}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
            <Field label="Categoria" value={lead.categoria} />
            <Field
              label="Avaliação"
              value={
                typeof lead.nota === "number"
                  ? `${lead.nota}${lead.avaliacoes ? ` (${lead.avaliacoes} avaliações)` : ""}`
                  : undefined
              }
            />
            <Field label="Origem" value={lead.origem} />
          </div>

          <Field label="Endereço" value={lead.endereco} />
          <Field label="Contexto" value={lead.contexto} />

          <div className="flex flex-wrap gap-3 text-sm">
            {lead.site && (
              <a
                href={toExternalLink(lead.site)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--azul)] underline-offset-2 hover:underline"
              >
                Site
              </a>
            )}
            {lead.rede_social && (
              <a
                href={toExternalLink(lead.rede_social)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--azul)] underline-offset-2 hover:underline"
              >
                Rede social
              </a>
            )}
            {lead.maps && (
              <a
                href={toExternalLink(lead.maps)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[var(--azul)] underline-offset-2 hover:underline"
              >
                <MapPin className="h-3.5 w-3.5" /> Ver no Maps
              </a>
            )}
          </div>

          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--fraco)]">
              Qualificação
            </p>
            <Select value={qualificacao || undefined} onValueChange={(v) => setQualificacao(v as Qualificacao)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sem qualificação" />
              </SelectTrigger>
              <SelectContent>
                {QUALIFICACOES.map((q) => (
                  <SelectItem key={q.id} value={q.id}>
                    {q.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--fraco)]">
              Notas
            </p>
            <Textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Anotações sobre esse lead…"
              className="min-h-[100px] resize-y"
            />
          </div>

          <Button onClick={handleSave} className="mt-1 gap-2 self-end">
            <Save className="h-4 w-4" /> {saved ? "Salvo!" : "Salvar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
