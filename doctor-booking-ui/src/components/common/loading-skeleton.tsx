export function LoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-[28px] border border-slate-200 bg-white"
        />
      ))}
    </div>
  );
}
