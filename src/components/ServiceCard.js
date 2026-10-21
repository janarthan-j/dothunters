import Link from "next/link";
import Image from "next/image";
import { ArrowCircle } from "@/components/SectionHeader";
import { getServiceArt } from "@/data/serviceArt";

// Tall service card with its artwork (or lucide `Icon` if it has none) bleeding
// off the bottom-right corner. Frosted glass at rest; the whole card fills brand red on hover.
// `text` defaults to the service description.
export default function ServiceCard({ service, Icon, text, className = "min-h-[440px] lg:min-h-[540px]" }) {
  const art = getServiceArt(service.slug);
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`service-card arrow-link group relative flex flex-col h-full rounded-[2rem] p-8 md:p-10 overflow-hidden border backdrop-blur-xl backdrop-saturate-150 bg-white/[0.45] border-white/70 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.18)] dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none text-gray-900 dark:text-white hover:bg-red-500 hover:border-red-500 dark:hover:bg-red-500 dark:hover:border-red-500 hover:text-white ${className}`}
    >
      <h3 className="relative z-10 text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-6 max-w-[14ch]">
        {service.title}
      </h3>
      <p className="relative z-10 text-base leading-relaxed line-clamp-4 max-w-sm text-gray-500 dark:text-gray-400 group-hover:text-white/90">
        {text ?? service.description}
      </p>

      <span className="relative z-10 mt-auto pt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
        Know more
        <ArrowCircle className="w-12 h-12 bg-gray-900 text-white dark:bg-white dark:text-gray-900 group-hover:bg-white group-hover:text-red-500" />
      </span>

      {art ? (
        <Image
          src={art.src}
          alt=""
          width={art.width}
          height={art.height}
          sizes="(min-width: 1024px) 260px, (min-width: 768px) 30vw, 60vw"
          className="absolute -right-6 -bottom-8 w-[62%] max-w-[300px] h-auto pointer-events-none select-none drop-shadow-2xl group-hover:-translate-y-3 group-hover:scale-105"
        />
      ) : Icon && (
        <Icon
          aria-hidden="true"
          strokeWidth={0.75}
          className="absolute -right-14 -bottom-14 w-72 h-72 lg:w-80 lg:h-80 rotate-[-14deg] group-hover:rotate-0 group-hover:scale-110 text-gray-900/10 dark:text-white/10 group-hover:text-white/25"
        />
      )}
    </Link>
  );
}
