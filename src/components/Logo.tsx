/**
 * The "open door" mark: an arched doorway that reads as a lowercase n.
 * Artwork matches netra-brand/kit/master. At 32px and below the small-size
 * drawing is used (wider door, bigger dot) so the dot doesn't disappear.
 */
export function LogoMark({ size = 28, title }: { size?: number; title?: string }) {
  const small = size <= 32;
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d={
          small
            ? "M52 212V124A76 76 0 0 1 204 124V212ZM92 212V124A36 38 0 0 1 164 124V212Z"
            : "M52 212V124A76 76 0 0 1 204 124V212ZM94 212V124A34 37 0 0 1 162 124V212Z"
        }
      />
      <circle cx="128" cy={small ? 176 : 179} r={small ? 20 : 15.5} fill="currentColor" />
    </svg>
  );
}
