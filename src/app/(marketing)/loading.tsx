/**
 * Instant route-change skeleton for the marketing route group.
 *
 * Next.js streams this in the moment a Link is clicked, so the user sees
 * Sildel chrome immediately while the next page's data resolves —
 * eliminates the "blank-then-content" flash that made navigation feel slow.
 */
export default function MarketingLoading() {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center min-h-[60vh] bg-background"
      aria-label="Loading"
    >
      <div
        className="h-px w-32 overflow-hidden bg-border"
        role="status"
        aria-label="Loading content"
      >
        <span
          className="block h-full w-full bg-foreground"
          style={{ animation: "sildelLoading 1200ms ease-in-out infinite" }}
        />
      </div>
      <style>{`
        @keyframes sildelLoading {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}