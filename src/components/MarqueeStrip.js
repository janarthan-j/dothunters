const items = [
  "UI/UX Design",
  "Web Development",
  "3D / VR & AR",
  "Motion Graphics",
  "Mobile Apps",
  "SaaS Products",
  "Video Production",
  "Digital Marketing",
  "Web Applications",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden bg-black py-5 md:py-6 border-y border-gray-800 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3.5 mx-10 text-sm md:text-base font-semibold text-white uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
