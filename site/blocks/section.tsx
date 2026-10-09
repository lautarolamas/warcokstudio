import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Contenedor angosto que usan las páginas de texto (Sobre mí, Contacto).
// El primer bloque deja lugar para el header fijo.
export function NarrowSection({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("px-6", index === 0 && "pt-32")}>
      <div className={cn("container mx-auto max-w-4xl", className)}>
        {children}
      </div>
    </section>
  );
}
