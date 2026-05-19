export default function NewsLoading() {
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="flex flex-col gap-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-14 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
