import { ImageResponse } from "next/og";
import { BrandMark } from "../../components/brand-mark";
import { getContent } from "../../lib/content";

export const dynamic = "force-static";

export function GET() {
  const content = getContent("en");
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "55px 80px", background: "#f4f1e9", color: "#292b25", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24 }}><div style={{ display: "flex", width: 54, height: 62 }}><BrandMark /></div>Fausto Santos<span style={{ marginLeft: "auto", color: "#a8442b", fontSize: 16 }}>ONE BRICK AT A TIME ↗</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 61, letterSpacing: -3, lineHeight: 1.12 }}>{content.hero.title.map((line, index) => <span key={line} style={{ color: index === 2 ? "#a8442b" : "#292b25" }}>{line}</span>)}</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", color: "#65665b", fontSize: 20 }}><span style={{ display: "flex", padding: "12px 20px", background: "#d9decb", border: "1px solid #292b25" }}>SOEL</span><span style={{ display: "flex", padding: "12px 20px", background: "#e6bca3", border: "1px solid #292b25" }}>Sistema San</span><span style={{ display: "flex", padding: "12px 20px", background: "#e9d8b8", border: "1px solid #292b25" }}>OBECON · Top 45</span><span style={{ marginLeft: "auto", fontSize: 16 }}>Rio de Janeiro, Brazil</span></div>
    </div>,
    { width: 1200, height: 630 },
  );
}
