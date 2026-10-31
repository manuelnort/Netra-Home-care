/** The door mark in the small-size drawing, for tiles and icons. */
export function BrandMark({ dot = "var(--gold)" }: { dot?: string }) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M52 212V124A76 76 0 0 1 204 124V212ZM92 212V124A36 38 0 0 1 164 124V212Z"
      />
      <circle cx="128" cy="176" r="20" fill={dot} />
    </svg>
  );
}
