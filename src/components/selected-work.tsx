import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { selectedFive } from "../lib/data/content";
import { BorderGlow } from "./ui/border-glow";

export function SelectedWork() {
  const [slug, setSlug] = useState(selectedFive[0].slug);
  const active = selectedFive.find((i) => i.slug === slug) ?? selectedFive[0];

  return (
    <section id="work" className="relative px-5 pb-24 pt-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/40">SELECTED WORK</p>
            <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-medium tracking-tight text-white">
              精选项目
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] tracking-wider text-white/70 transition hover:border-white/25 hover:text-white"
          >
            VIEW ALL
            <ArrowUpRight className="size-3.5" />
          </Link>
        </header>

        <div className="flex gap-3 overflow-x-auto pb-2 md:gap-4">
          {selectedFive.map((item) =>
            item.slug === active.slug ? (
              <BorderGlow
                key={item.slug}
                className="relative min-w-[min(100%,420px)] flex-1 overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0d14]/90"
                style={{
                  boxShadow: `0 0 0 1px ${item.accent}33, 0 0 40px ${item.accent}22`,
                }}
              >
                <article className="relative flex h-full min-h-[420px] flex-col p-6 md:p-8">
                  <div className="relative z-[5] flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] tracking-[0.22em]" style={{ color: item.accent }}>
                        {item.kicker}
                      </p>
                      <h3 className="mt-2 text-[clamp(1.4rem,2vw,1.9rem)] font-medium tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[12px] tracking-[0.18em] text-white/45">{item.word}</p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-[11px] tracking-wider"
                      style={{
                        background: `${item.accent}22`,
                        color: item.accent,
                        border: `1px solid ${item.accent}44`,
                      }}
                    >
                      {item.no}
                    </span>
                  </div>
                  <div className="relative mt-6 flex-1">
                    <CoverStack item={item} />
                    <p className="absolute bottom-4 left-5 z-[6] text-[10px] tracking-[0.22em] text-white/30">
                      Visual archive · 2026
                    </p>
                  </div>
                </article>
              </BorderGlow>
            ) : (
              <button
                key={item.slug}
                type="button"
                onMouseEnter={() => setSlug(item.slug)}
                onFocus={() => setSlug(item.slug)}
                onClick={() => setSlug(item.slug)}
                className="relative flex w-[54px] shrink-0 flex-col items-center rounded-[28px] border border-white/8 bg-[#0b0d14]/80 py-4 backdrop-blur-xl transition-[box-shadow,border-color] hover:border-white/20"
                style={{
                  boxShadow: `inset 0 1.5px 0 ${item.accent}`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = `inset 0 1.5px 0 ${item.accent}, 0 0 0 1px ${item.accent}55, 0 0 22px ${item.accent}44`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = `inset 0 1.5px 0 ${item.accent}`;
                }}
              >
                <span
                  className="text-[11px] font-medium tracking-widest"
                  style={{ color: item.accent }}
                >
                  {item.no}
                </span>
                <span className="mt-6 flex-1 text-[11px] tracking-[0.28em] text-white/70 [writing-mode:vertical-rl]">
                  {item.tab}
                </span>
                <span className="mt-6 text-[9px] tracking-[0.2em] text-white/35 [writing-mode:vertical-rl]">
                  {item.lane}
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function CoverStack({
  item,
}: {
  item: (typeof selectedFive)[number];
}) {
  const covers = item.covers.filter(Boolean);
  const layout =
    "coverLayout" in item && item.coverLayout
      ? item.coverLayout
      : covers.length >= 5
        ? "fan5"
        : covers.length >= 3
          ? "fan3"
          : "single";
  const shown =
    layout === "fan5"
      ? covers.slice(0, 5)
      : layout === "fan4"
        ? covers.slice(0, 4)
        : layout === "fan3" || layout === "fan3square"
          ? covers.slice(0, 3)
          : covers;
  if (shown.length >= 3) {
    return (
      <div
        className={`cover-collage is-${layout}`}
        aria-hidden
      >
        <span
          className="cover-plate"
          style={
            layout === "fan5"
              ? {
                  background: item.accent,
                  opacity: 0.42,
                  left: "4%",
                  top: "56%",
                  width: "32%",
                  height: "36%",
                  transform: "rotate(-18deg)",
                }
              : layout === "fan4"
                ? { display: "none" }
              : layout === "fan3" || layout === "fan3square"
                ? {
                    background: item.accent,
                    opacity: 0.3,
                    left: "26%",
                    top: "44%",
                    width: "28%",
                    height: "34%",
                    transform: "rotate(-13deg)",
                  }
                : {
                    background: item.accent,
                    opacity: 0.22,
                    transform: "translate(-8%, 6%) rotate(-12deg)",
                  }
          }
        />
        <span
          className="cover-plate"
          style={
            layout === "fan5"
              ? {
                  background: item.accent,
                  opacity: 0.36,
                  left: "62%",
                  top: "46%",
                  width: "32%",
                  height: "38%",
                  transform: "rotate(16deg)",
                }
              : layout === "fan4"
                ? { display: "none" }
              : layout === "fan3" || layout === "fan3square"
                ? {
                    background: item.accent,
                    opacity: 0.1,
                    left: "56%",
                    top: "42%",
                    width: "28%",
                    height: "38%",
                    transform: "rotate(16deg)",
                  }
                : {
                    background: item.accent,
                    opacity: 0.32,
                    transform: "translate(14%, 4%) rotate(11deg)",
                  }
          }
        />
        {layout === "fan3" || layout === "fan3square" ? (
          <span
            className="cover-plate"
            style={{
              background: item.accent,
              opacity: 0.3,
              left: "18%",
              top: "4%",
              width: "32%",
              height: "30%",
              transform: "rotate(-11deg)",
            }}
          />
        ) : null}
        {layout === "fan4" ? (
          <>
            <span
              className="cover-plate"
              style={{
                background: item.accent,
                opacity: 0.1,
                left: "20%",
                top: "calc(4% - 34px)",
                width: "33%",
                height: "86%",
                zIndex: 0,
                transform: "rotate(-16deg)",
              }}
            />
            <span
              className="cover-plate"
              style={{
                background: item.accent,
                opacity: 0.2,
                left: "50%",
                top: "calc(2% - 34px)",
                width: "33%",
                height: "86%",
                zIndex: 0,
                transform: "rotate(11deg)",
              }}
            />
          </>
        ) : null}
        {shown.map((src, i) => (
          <figure key={src} className={`cover-piece cover-piece-${i}`}>
            <img src={src} alt="" decoding="async" />
          </figure>
        ))}
      </div>
    );
  }

  const src = covers[0];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        aria-hidden
        className="absolute rounded-[22px]"
        style={{
          width: "58%",
          height: "62%",
          transform: "translate(-42px, 10px) rotate(-10deg)",
          background: item.accent,
          opacity: 0.22,
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-[22px]"
        style={{
          width: "54%",
          height: "58%",
          transform: "translate(46px, 8px) rotate(10deg)",
          background: item.accent,
          opacity: 0.38,
          zIndex: 1,
        }}
      />
      <div
        className="absolute z-[2] overflow-hidden rounded-[22px] border border-white/10 bg-[#10131c] shadow-[0_28px_60px_-24px_rgba(0,0,0,.75)]"
        style={{ width: "78%", height: "82%" }}
      >
        {src ? (
          <img src={src} alt="" className="absolute inset-0 size-full object-cover" decoding="async" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        <p
          className="absolute bottom-8 left-7 text-[clamp(1.6rem,2.4vw,2.6rem)] leading-none font-medium tracking-tight"
          style={{ color: item.accent }}
        >
          {item.word}
        </p>
      </div>
    </div>
  );
}
