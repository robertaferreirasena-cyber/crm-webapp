"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plug } from "lucide-react";

export function ConnectionSection() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5 rounded-[var(--r)] border border-[var(--borda)] bg-[var(--painel)] p-5 shadow-[var(--sombra)] sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--painel2)] text-[var(--fraco)]">
          <Plug className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">Evolution API · WhatsApp</p>
          <p className="text-xs text-[var(--fraco)]">Integração ainda não conectada</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-[var(--borda)] px-2.5 py-1 text-xs font-medium text-[var(--fraco)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--vermelho)]" /> Desconectado
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="evo-url">URL da instância</Label>
          <Input id="evo-url" disabled placeholder="https://sua-evolution-api.com" className="h-11" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="evo-instance">Nome da instância</Label>
          <Input id="evo-instance" disabled placeholder="jarvis-crm" className="h-11" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="evo-token">Token / API Key</Label>
          <Input id="evo-token" disabled type="password" placeholder="••••••••••••" className="h-11" />
        </div>
      </div>

      <Button disabled className="h-11 w-full">
        Conectar
      </Button>

      <p className="text-xs text-[var(--fraco)]">
        Quando a integração com a Evolution API estiver disponível, esta tela conecta o WhatsApp do
        negócio para captar leads e chamadas automaticamente.
      </p>
    </div>
  );
}
