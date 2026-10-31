import { TriangleAlert } from "lucide-react";
import { isPreviewMode } from "@/lib/forms";

/** Shown above every form until NEXT_PUBLIC_FORMS_ENDPOINT is set. */
export function PreviewNotice() {
  if (!isPreviewMode) return null;
  return (
    <div className="callout callout--gold" style={{ marginBottom: "1.25rem" }}>
      <TriangleAlert size={20} aria-hidden />
      <p>
        <strong>Preview site</strong>
        Forms on this site aren&apos;t connected to Netra Home Care&apos;s system yet, so nothing
        you enter is sent.
      </p>
    </div>
  );
}
