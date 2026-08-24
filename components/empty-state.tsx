import { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--r)] border border-dashed border-[var(--borda)] bg-[var(--painel2)]/40 px-6 py-16 text-center">
      {icon && <div className="text-[var(--fraco)]">{icon}</div>}
      <p className="text-base font-medium text-[var(--texto)]">{title}</p>
      <p className="max-w-sm text-sm text-[var(--fraco)]">{description}</p>
    </div>
  );
}
