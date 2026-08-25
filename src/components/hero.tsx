import { Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToWork, useSelection } from "@/lib/selection";
import BorderGlow from "@/components/ui/border-glow";

type Variant = "deep" | "mid" | "frost" | "void" | "lime";
type Flip = "lime" | "pink" | "blue" | "purple" | "orange";

function onCanvasMove(e: React.MouseEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
  e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
}

function onBlobMove(e: React.MouseEvent<HTMLElement>) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--lx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
  e.currentTarget.style.setProperty("--ly", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
}

function GlassLayers() {
  return (
    <>
      <span className="lg-fill" />
      <span className="lg-iridescent" />
      <span className="lg-volume" />
      <span className="lg-fresnel" />
      <span className="lg-spec" />
      <span className="lg-caustic" />
      <span className="lg-noise" />
    </>
  );
}

function GlassBlob({
  variant,
  className,
  delay,
  onClick,
  children,
  label,
  embedded,
}: {
  variant: Variant;
  className?: string;
  delay?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  label?: string;
  embedded?: boolean;
}) {
  const Comp = (onClick ? "button" : "div") as "button" | "div";
  return (
    <Comp
      {...(onClick ? { type: "button" as const } : {})}
      aria-label={label}
      onClick={onClick}
      className={cn("lg-blob", !embedded && "hero-mod", `lg-${variant}`, className)}
      style={{ animationDelay: delay }}
    >
      <span className="lg-clip">
        <GlassLayers />
        {children}
      </span>
      <span className="lg-rim" />
    </Comp>
  );
}

function FlipTile({
  variant,
  flip,
  slug,
  word,
  kicker,
  title,
  meta,
  index,
  mark,
  className,
  delay,
  pillClass,
  copyClass,
  embedded,
}: {
  variant: Variant;
  flip: Flip;
  slug: string;
  word: string;
  kicker: string;
  title: string;
  meta: string;
  index?: string;
  mark?: string;
  className?: string;
  delay?: string;
  pillClass?: string;
  copyClass?: string;
  embedded?: boolean;
}) {
  const { setSlug } = useSelection();
  return (
    <button
      type="button"
      aria-label={`${title} — ${meta}`}
      onMouseEnter={() => setSlug(slug)}
      onMouseMove={onBlobMove}
      onClick={() => {
        setSlug(slug);
        scrollToWork();
      }}
      className={cn(
        "lg-blob lg-flip-host is-hit",
        !embedded && "hero-mod",
        `lg-${variant}`,
        `lg-flip-${flip}`,
        className,
      )}
      style={{ animationDelay: delay }}
    >
      <span className="lg-clip">
        <span className="lg-fill" />
        <span className="lg-back-fill" />
        <span className="lg-iridescent" />
        <span className="lg-volume" />
        <span className="lg-fresnel" />
        <span className="lg-spec" />
        <span className="lg-caustic" />
        <span className="lg-noise" />
        {index ? <span className="lg-idx">{index}</span> : null}
        {mark ? <span className="lg-mark">{mark}</span> : null}
        <span className={cn("lg-front-copy", pillClass)}>
          <span className="lg-pill">
            <i className="lg-pill-dot" />
            {word}
          </span>
        </span>
        <span className={cn("lg-back-copy", copyClass)}>
          <em>{kicker}</em>
          <strong>{title}</strong>
          <b>
            {meta}
            <span>↗</span>
          </b>
        </span>
      </span>
      <span className="lg-rim" />
    </button>
  );
}

const GLOW_BLUE = {
  glowColor: "222 92 70",
  colors: ["#7EB0FF", "#4D8AFF", "#243CFF"],
} as const;
const GLOW_LIME = {
  glowColor: "78 92 62",
  colors: ["#B8FF36", "#8FA8FF", "#7DD3FC"],
} as const;
const GLOW_MAGENTA = {
  glowColor: "328 88 68",
  colors: ["#FF4D9A", "#F472B6", "#C084FC"],
} as const;
const GLOW_PURPLE = {
  glowColor: "268 78 70",
  colors: ["#C4B5FD", "#A78BFA", "#7C3AED"],
} as const;
const GLOW_ORANGE = {
  glowColor: "32 94 62",
  colors: ["#FFD36A", "#FF9F1A", "#FF7A00"],
} as const;

export function Hero() {
  const { setSlug } = useSelection();

  const openWork = (slug: string) => {
    setSlug(slug);
    scrollToWork();
  };

  return (
    <section
      id="hero"
      className="hero-canvas relative h-[100svh] min-h-[720px] overflow-hidden"
      onMouseMove={onCanvasMove}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id="lg-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.08" />
          </feComponentTransfer>
        </filter>
      </svg>

      <div className="hero-grid-layer" />
      <div className="hero-glow left-[-10%] top-[6%] h-[68vh] w-[68vh] bg-violet/[0.12]" />
      <div
        className="hero-glow right-[-14%] top-[18%] h-[58vh] w-[58vh] bg-pink/[0.08]"
        style={{ animationDelay: "120ms" }}
      />
      <div
        className="hero-glow left-[44%] top-[36%] h-[16vh] w-[16vh] bg-accent/[0.055]"
        style={{ animationDelay: "220ms" }}
      />

      <div className="checker pointer-events-none absolute inset-y-0 left-0 hidden w-7 opacity-35 md:block" />
      <div className="checker pointer-events-none absolute inset-y-0 right-0 hidden w-7 opacity-35 md:block" />

      {/* Desktop — figure 1 irregular archive, chromatic fluid glass */}
      <div className="relative mx-auto hidden h-full w-full max-w-[1440px] md:block">
        <div className="hero-archive absolute inset-x-10 top-[max(80px,9vh)] bottom-[max(72px,9vh)] xl:inset-x-[56px]">
          {/* 01 MAIN identity squircle — GLOBAL / PUBG */}
          <BorderGlow
            className="hero-mod absolute top-[3%] left-0 z-[2] h-[66%] w-[40%]"
            borderRadius={100}
            glowRadius={40}
            glowIntensity={1.35}
            {...GLOW_BLUE}
          >
            <FlipTile
              embedded
              variant="deep"
              flip="blue"
              slug="mintegral-overseas"
              word="GLOBAL"
              kicker="01 · Large campaign"
              title="PUBG"
              meta="GLOBAL CAMPAIGN"
              className="lg-chroma-a inset-0 rounded-[100px]"
              pillClass="left-6 bottom-[20%]"
              copyClass="left-[18%] bottom-10"
            />
          </BorderGlow>

          {/* overlapping orb — GUI */}
          <BorderGlow
            className="hero-mod absolute top-[-1%] left-[32.5%] z-[3] aspect-square w-[29%]"
            borderRadius="999px"
            glowRadius={38}
            glowIntensity={1.35}
            {...GLOW_MAGENTA}
          >
            <FlipTile
              embedded
              variant="mid"
              flip="pink"
              slug="yumeng-gui"
              word="GUI"
              kicker="03 · Game interface"
              title="元梦之星"
              meta="GAME GUI"
              className="lg-chroma-b inset-0 rounded-full"
              pillClass="left-[18%] bottom-[16%]"
              copyClass="left-0 right-0 top-[14%] items-center px-5 text-center"
            />
          </BorderGlow>

          {/* acid lime tile — PDF DNA, keep the one over RT */}
          <GlassBlob
            variant="lime"
            delay="260ms"
            className="top-[10%] left-[34%] z-[8] size-[72px] rounded-[18px] xl:size-[80px]"
          />

          {/* 03 RIGHT TOP stadium — H5 */}
          <BorderGlow
            className="hero-mod absolute top-[3%] right-0 z-[4] h-[24%] w-[33%]"
            borderRadius={80}
            glowRadius={34}
            glowIntensity={1.35}
            {...GLOW_LIME}
          >
            <FlipTile
              embedded
              variant="mid"
              flip="lime"
              slug="nye-gala"
              word="H5"
              kicker="02 · Live ops"
              title="不夜星球"
              meta="INTERACTIVE H5"
              className="lg-chroma-c inset-0 rounded-[80px]"
              pillClass="left-6 bottom-5"
              copyClass="left-7 top-8"
            />
          </BorderGlow>

          {/* 04 RIGHT D — AI */}
          <GlassBlob
            variant="frost"
            delay="440ms"
            className="lg-chroma-f right-[0.5%] top-[63%] z-[1] aspect-square w-[13.5%] rounded-full"
          />
          <BorderGlow
            className="hero-mod absolute top-[30%] right-0 z-[4] h-[40%] w-[33%]"
            borderRadius="40px 999px 999px 40px"
            glowRadius={40}
            glowIntensity={1.35}
            {...GLOW_PURPLE}
          >
            <FlipTile
              embedded
              variant="deep"
              flip="purple"
              slug="dawn-of-gods"
              word="AI"
              kicker="04 · AI workflow"
              title="喵将三国"
              meta="AI CREATIVE"
              className="lg-chroma-d inset-0 rounded-[40px_999px_999px_40px]"
              pillClass="left-7 bottom-10"
              copyClass="left-8 bottom-12"
            />
          </BorderGlow>
          <GlassBlob
            variant="mid"
            delay="380ms"
            className="lg-chroma-e right-[19%] top-[67%] z-[6] h-[13%] w-[15.5%] rounded-[40px]"
          />

          {/* lime slab behind GLOBAL — yellow-box zone */}
          <GlassBlob
            variant="lime"
            delay="340ms"
            className="hero-mod hero-lime-under absolute top-[calc(69%-58px)] left-0 z-[1] size-[88px] rounded-[20px] xl:top-[calc(69%-64px)] xl:size-[96px]"
          />

          {/* 05 GROWTH bar — left of name, orange / feed ads */}
          <BorderGlow
            className="hero-mod absolute top-[68%] left-[20%] z-[5] h-[12%] w-[24%]"
            borderRadius="999px 28px 28px 999px"
            glowRadius={32}
            glowIntensity={1.35}
            {...GLOW_ORANGE}
          >
            <FlipTile
              embedded
              variant="deep"
              flip="orange"
              slug="zaizai"
              word="GROWTH"
              kicker="05 · Feed & motion"
              title="信息流"
              meta="FEED ADS"
              className="lg-chroma-a inset-0 rounded-[999px_28px_28px_999px]"
              pillClass="left-5 bottom-3"
              copyClass="left-5 bottom-3"
            />
          </BorderGlow>

          {/* name chip — blue-black fluid glass, 3 labels centered */}
          <GlassBlob
            variant="deep"
            delay="500ms"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            label="About Chen Jingyi"
            className="hero-name-chip lg-chroma-d top-[calc(61%+8pt)] left-[calc(50%-min(134px,11%))] z-[9] h-[42px] w-[min(268px,22%)] rounded-full"
          >
            <span className="hero-name-lime-leak" aria-hidden />
            <div className="relative z-[2] flex h-full w-full items-center justify-center gap-2 px-3">
              <span className="text-[12px] tracking-wide text-white/92">陈静怡</span>
              <span className="hero-name-years">7 years</span>
              <span className="text-[11px] tracking-[0.06em] text-white/55">Chen Jingyi</span>
            </div>
          </GlassBlob>

          <div className="hero-title-device">
            <div className="hero-title-wrap">
              <div className="hero-title-block">
                <h1 className="hero-title leading-[0.9]">
                  <span className="hero-title-fill hero-title-left hero-title-p">P</span>
                  <span className="hero-title-fill hero-title-left hero-title-o">O</span>
                  <span className="hero-title-fill hero-title-left">RTF</span>
                  <span className="fp-mark" aria-hidden="true">
                    <span className="fp-halo" />
                    <span className="fp-disc" />
                    <Fingerprint className="fp-icon" strokeWidth={1.6} />
                  </span>
                  <span className="hero-title-fill hero-title-right">LIO</span>
                </h1>
                <span className="hero-title-glass" aria-hidden="true">
                  <span className="hero-title-glass-clone">PO</span>
                </span>
              </div>
              <span className="hero-role-chip">Visual design · AI-enabled</span>
            </div>
          </div>
          <span
            className="hero-float hero-late top-[14.5%] left-[7%]"
            style={{ animationDelay: "820ms" }}
          >
            Global campaign
          </span>
          <span
            className="hero-float hero-late top-[15%] right-[36%]"
            style={{ animationDelay: "920ms" }}
          >
            Interactive H5
          </span>
          <p
            className="hero-late pointer-events-none absolute top-[48%] left-[6.5%] z-[12] font-mono text-[12px] tracking-[0.22em] text-white/45"
            style={{ animationDelay: "700ms" }}
          >
            2019 — 2026
          </p>
        </div>
      </div>

      {/* Mobile — 3–4 primary slabs, no hover flip */}
      <div className="relative flex h-full flex-col overflow-hidden px-5 pt-24 pb-8 md:hidden">
        <GlassBlob variant="deep" className="lg-chroma-a relative mb-3 h-[168px] w-full rounded-[40px]">
          <div className="relative z-[2] flex h-full flex-col justify-between p-6">
            <p className="text-[10px] tracking-[0.28em] text-white/60">VISUAL DESIGN · AI-ENABLED</p>
            <p className="font-mono text-[11px] text-white/40">2019 — 2026</p>
          </div>
        </GlassBlob>
        <GlassBlob variant="mid" className="lg-chroma-b absolute top-[86px] right-[-28px] z-[3] size-32 rounded-full" />
        <GlassBlob variant="lime" className="absolute top-[100px] right-10 z-10 size-12 rounded-[14px]" />
        <h1 className="hero-title relative z-10 -mt-10 text-[2.6rem] leading-[0.92]">
          <span className="hero-title-fill hero-title-left">PORTF</span>
          <span className="fp-mark" aria-hidden="true">
            <span className="fp-halo" />
            <span className="fp-disc" />
            <Fingerprint className="fp-icon" strokeWidth={1.6} />
          </span>
          <span className="hero-title-fill hero-title-right">LIO</span>
        </h1>
        <button
          type="button"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl"
        >
          <span>陈静怡</span>
          <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-semibold text-black">7Y</span>
          <span className="text-white/50">Chen Jingyi</span>
        </button>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {(
            [
              { slug: "mintegral-overseas", word: "GLOBAL", title: "PUBG", tone: "lg-chroma-a" },
              { slug: "nye-gala", word: "H5", title: "不夜星球", tone: "lg-chroma-c" },
              { slug: "yumeng-gui", word: "GUI", title: "元梦之星", tone: "lg-chroma-b" },
              { slug: "dawn-of-gods", word: "AI", title: "喵将三国", tone: "lg-chroma-d" },
              { slug: "zaizai", word: "GROWTH", title: "信息流", tone: "lg-chroma-a" },
            ] as const
          ).map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => openWork(item.slug)}
              className={cn("lg-blob lg-deep relative h-[72px] overflow-hidden rounded-[22px] text-left", item.tone)}
            >
              <span className="lg-clip">
                <span className="lg-fill" />
                <span className="lg-iridescent" />
                <span className="lg-volume" />
                <span className="relative z-[2] flex h-full flex-col justify-end p-3">
                  <span className="text-[10px] tracking-[0.18em] text-white/50">{item.word}</span>
                  <span className="text-[13px] text-white/90">{item.title}</span>
                </span>
              </span>
              <span className="lg-rim" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
