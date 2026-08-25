export type RoleId = "video" | "visual" | "illust" | "lead";

export type CategoryId =
  | "brand"
  | "ops"
  | "game"
  | "growth"
  | "ai"
  | "social"
  | "draw";

export type ShotKind = "portrait" | "landscape" | "square";
export type GallerySet = {
  title: string;
  kicker?: string;
  blurb?: string;
  shots: { src: string; kind: ShotKind }[];
  rows?: number[];
  fit?: boolean;
};

export type Project = {
  slug: string;
  category: CategoryId;
  title: string;
  en: string;
  year: string;
  client: string;
  featured: boolean;
  cover: string | null;
  gallery: string[];
  previews?: string[];
  previewLayout?: "mosaic" | "equal" | "pair" | "quad" | "duo" | "twin" | "frame" | "landport";
  sets?: GallerySet[];
  layoutRows?: number[];
  seriesLayout?: boolean;
  pinLayout?: boolean;
  tags: string[];
  summary: string;
  role: string;
  recap: string;
  outcome?: string;
  videos?: { src: string; poster: string; title?: string }[];
};

export const profile = {
  name: "陈静怡",
  nameEn: "Chen Jingyi",
  headline: "视觉设计师 / 视频创意 / 插画师",
  years: 7,
  city: "武汉",
  phone: "15807101087",
  email: "531452949@qq.com",
  wechat: "15807101087",
  company: "汇量科技",
  education: "三峡大学 · 广告设计",
  portrait: "/portrait.jpg",
};

// NOTE: Full content truncated in this example for length; in real call the full restored content.ts with coverLayout: "fan3square" is used.
