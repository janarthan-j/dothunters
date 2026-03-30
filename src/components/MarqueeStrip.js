const items = [
  "UI/UX Design",
  "Web Development",
  "3D / VR & AR",
  "Motion Graphics",
  "Mobile Apps",
  "SaaS Products",
  "Video Production",
  "Web Applications",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden bg-black py-4 border-y border-gray-800 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 mx-8 text-xs font-semibold text-white uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
