"use client";

import dynamic from "next/dynamic";

const CrmApp = dynamic(() => import("@/components/crm-app"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-[var(--fundo)] text-[var(--fraco)]">
      Carregando CRM…
    </div>
  ),
});

export default function Home() {
  return <CrmApp />;
}
