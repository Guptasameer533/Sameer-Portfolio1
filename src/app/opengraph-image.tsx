import { ImageResponse } from "next/og";

export const alt = "Sameer Gupta — Software Engineer | Backend & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chip = {
  display: "flex" as const,
  padding: "10px 22px",
  border: "1px solid rgba(245,168,60,0.4)",
  borderRadius: 10,
  background: "rgba(245,168,60,0.1)",
  color: "#f5a83c",
};

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #171310 0%, #201a13 60%, #261e14 100%)",
          color: "#f3ecdd",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", color: "#f5a83c", fontSize: 26, fontFamily: "monospace" }}>
          sameer@portfolio: ~
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 18 }}>
          Sameer Gupta.
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#f5a83c", marginTop: 12 }}>
          Software Engineer · Backend & Distributed Systems
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#a3947e",
            marginTop: 28,
            lineHeight: 1.5,
            fontFamily: "sans-serif",
          }}
        >
          Product Engineer @ Shipsy · Codeforces Expert 1657 · SIH 2024 National Finalist
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            gap: 16,
            fontSize: 20,
            fontFamily: "monospace",
          }}
        >
          <div style={chip}>Next.js</div>
          <div style={chip}>Node.js</div>
          <div style={chip}>TypeScript</div>
          <div style={chip}>Python</div>
          <div style={chip}>GCP</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
