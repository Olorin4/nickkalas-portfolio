import { ImageResponse } from "next/og";
import { identity } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${identity.name} — ${identity.role}`;

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0b0f14",
        color: "#e6edf3",
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 6,
          color: "#f5a623",
          textTransform: "uppercase",
        }}
      >
        {identity.role}
      </div>
      <div style={{ fontSize: 84, fontWeight: 800, marginTop: 16 }}>
        {identity.name}
      </div>
      <div style={{ fontSize: 32, color: "#9fb0bf", marginTop: 24 }}>
        Built Kelévo — a TMS SaaS — solo, zero to launch.
      </div>
    </div>,
    size,
  );
}
