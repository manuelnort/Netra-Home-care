import { Check } from "lucide-react";

export type TrailItem = {
  title: string;
  desc?: string;
  state: "done" | "current" | "todo";
  stateLabel?: string;
};

/** A vertical status line. Each state has its own shape, not only a colour. */
export function Trail({ items, roomy = false }: { items: TrailItem[]; roomy?: boolean }) {
  return (
    <ol className={`trail${roomy ? " trail--roomy" : ""}`}>
      {items.map((item) => (
        <li key={item.title} className={`is-${item.state}`}>
          <span className="trail-node" aria-hidden>
            {item.state === "done" && <Check size={15} strokeWidth={3} />}
          </span>
          <div className="trail-text">
            <p className="trail-title">{item.title}</p>
            {item.stateLabel && <p className="trail-state">{item.stateLabel}</p>}
            {item.desc && <p className="trail-desc">{item.desc}</p>}
            <span className="visually-hidden">
              {item.state === "done" ? "(completed)" : item.state === "current" ? "(in progress)" : "(not started)"}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
