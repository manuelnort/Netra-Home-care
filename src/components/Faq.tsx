import { Plus } from "lucide-react";
import type { Faq } from "@/lib/faqs";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            <span>{item.q}</span>
            <Plus className="chev" aria-hidden />
          </summary>
          <div className="answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
