import { useState, useEffect, useRef, type ReactNode } from "react"

import clientBBefore from "./imports/client_B-_before.png"
import clientBAfter from "./imports/client_B-after.png"
import clientABefore from "./imports/Client_A_-_Before.png"
import clientAAfter from "./imports/client_A_-_after.png"
import clientAHeroBefore from "./imports/client-a-before-hero.png"
import clientAHeroAfter from "./imports/client-a-after-hero.png"
import logoImg from "./imports/bd63982f-fc2a-4e6e-88e1-ab0ae24e1450.png"
import michaelleImg from "./imports/michaelle_-_Copy-1.jpg"
import tomMyersImg from "./imports/image-26.png"
import maryBondImg from "./imports/mary_bond.jpg"
import kathleenPorterImg from "./imports/Kathleen-Porter-.jpg"

const appBaseUrl = import.meta.env.BASE_URL

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  )
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth)
    window.addEventListener("resize", fn, { passive: true })
    return () => window.removeEventListener("resize", fn)
  }, [])
  return width
}

// ─── Reveal ───────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function SectionTag({ label }: { label: string }) {
  return (
    <div
      className="section-eyebrow"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <div style={{ width: "32px", height: "1px", background: "#c9a96e" }} />
      <span
        style={{
          fontSize: "12px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#c9a96e",
        }}
      >
        {label}
      </span>
    </div>
  )
}

function PrimaryBtn({
  children,
  large,
  href = "#course",
}: {
  children: ReactNode
  large?: boolean
  href?: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        background: hover
          ? "linear-gradient(160deg, #d8c07a 0%, #c9a96e 55%, #b8905e 100%)"
          : "linear-gradient(160deg, #cdb472 0%, #c2a068 55%, #b08860 100%)",
        color: "#1a1208",
        padding: large ? "17px 46px" : "12px 28px",
        fontSize: large ? "12px" : "11px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "8px",
        border: "1px solid rgba(201,169,110,0.45)",
        boxShadow: hover
          ? "0 6px 20px rgba(201,169,110,0.28), 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)"
          : "0 2px 8px rgba(201,169,110,0.14), 0 1px 2px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  )
}

// ─── Contained card (the lino.systems-style element wrapper) ──────────────────

function Card({
  children,
  padded = true,
  style,
}: {
  children: ReactNode
  padded?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.033)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 48px rgba(0,0,0,0.5)",
        overflow: "hidden",
        ...(padded ? { padding: "clamp(36px, 6vw, 72px)" } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Section shell ────────────────────────────────────────────────────────────

function Section({
  children,
  style,
}: {
  children: ReactNode
  style?: React.CSSProperties
}) {
  const isMobile = useWindowWidth() < 768

  return (
    <section
      className="section-shell"
      style={{
        padding: isMobile
          ? "clamp(56px, 8vw, 96px) 28px"
          : "clamp(56px, 8vw, 96px) clamp(16px, 3vw, 32px)",
        ...style,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>{children}</div>
    </section>
  )
}

// ─── Before / After panel ─────────────────────────────────────────────────────

function BeforeAfterPanel({
  before,
  after,
  beforeAlt,
  afterAlt,
  showLabels = false,
  showDivider = true,
  mobileHeight,
  mobileBeforeObjectPosition,
  mobileAfterObjectPosition,
  mobileImageScale,
  mobileImageTranslateY,
  mobileBeforeImageTranslateY,
  mobileImageTopCrop,
  mobileBeforeImageTopCrop,
  mobileImageBottomCrop,
}: {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  showLabels?: boolean
  showDivider?: boolean
  mobileHeight?: string
  mobileBeforeObjectPosition?: string
  mobileAfterObjectPosition?: string
  mobileImageScale?: number
  mobileImageTranslateY?: string
  mobileBeforeImageTranslateY?: string
  mobileImageTopCrop?: string
  mobileBeforeImageTopCrop?: string
  mobileImageBottomCrop?: string
}) {
  const w = useWindowWidth()
  const isMobile = w < 768
  const labelStyle: React.CSSProperties = {
    flexShrink: 0,
    textAlign: "center" as const,
    padding: "14px 0 10px",
    fontSize: "12px",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    color: "rgba(240,236,227,0.45)",
  }
  const panelHeight = isMobile
    ? mobileHeight ?? "72vh"
    : "clamp(480px, 62vh, 680px)"

  return (
    <div style={{ display: "flex", gap: "0", height: panelHeight }}>
      {/* Before */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {showLabels && <span style={labelStyle}>Before</span>}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            src={before}
            alt={beforeAlt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition:
                isMobile && mobileBeforeObjectPosition
                  ? mobileBeforeObjectPosition
                  : "bottom center",
              clipPath:
                isMobile &&
                (mobileBeforeImageTopCrop ||
                  mobileImageTopCrop ||
                  mobileImageBottomCrop)
                  ? `inset(${mobileBeforeImageTopCrop ?? mobileImageTopCrop ?? 0} 0 ${mobileImageBottomCrop ?? 0} 0)`
                  : undefined,
              transform:
                isMobile &&
                (mobileImageScale ||
                  mobileBeforeImageTranslateY ||
                  mobileImageTranslateY)
                  ? `translateY(${mobileBeforeImageTranslateY ?? mobileImageTranslateY ?? 0}) scale(${mobileImageScale ?? 1})`
                  : undefined,
              transformOrigin: "bottom center",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Vertical divider */}
      <div
        style={{
          width: showDivider ? "1px" : 0,
          flexShrink: 0,
          background: showDivider
            ? "linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.5) 12%, rgba(201,169,110,0.5) 88%, transparent 100%)"
            : "none",
        }}
      />

      {/* After */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {showLabels && <span style={labelStyle}>After</span>}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            src={after}
            alt={afterAlt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition:
                isMobile && mobileAfterObjectPosition
                  ? mobileAfterObjectPosition
                  : "bottom center",
              clipPath:
                isMobile && (mobileImageTopCrop || mobileImageBottomCrop)
                  ? `inset(${mobileImageTopCrop ?? 0} 0 ${mobileImageBottomCrop ?? 0} 0)`
                  : undefined,
              transform:
                isMobile && (mobileImageScale || mobileImageTranslateY)
                  ? `translateY(${mobileImageTranslateY ?? 0}) scale(${mobileImageScale ?? 1})`
                  : undefined,
              transformOrigin: "bottom center",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function NavLink({
  children,
  href,
  muted,
}: {
  children: ReactNode
  href: string
  muted?: boolean
}) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontSize: "12px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        textDecoration: "none",
        color: hover
          ? muted
            ? "rgba(240,236,227,0.9)"
            : "#c9a96e"
          : muted
            ? "rgba(240,236,227,0.55)"
            : "rgba(240,236,227,0.5)",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 768

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const navBg = scrolled || menuOpen

  return (
    <header
      className="nav-intro"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: "10px 16px 0",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: isMobile ? "#0a0a0e" : "rgba(10,10,14,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.13)",
          borderLeft: "1px solid rgba(255,255,255,0.13)",
          borderRight: "1px solid rgba(255,255,255,0.13)",
          borderBottom: menuOpen
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(255,255,255,0.13)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          borderBottomLeftRadius: menuOpen ? 0 : "12px",
          borderBottomRightRadius: menuOpen ? 0 : "12px",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)",
          pointerEvents: "auto",
          transition: "border-color 0.4s ease",
        }}
      >
        <div
          style={{
            padding: "0 20px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href={appBaseUrl} style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#f0ece3",
                letterSpacing: "-0.02em",
              }}
            >
              FitAlign
            </span>
          </a>

          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: "36px" }}>
              {[
                { label: "Studio", href: "#" },
                { label: "Workshops", href: "#" },
                { label: "Teach", href: "#" },
                { label: "Press", href: `${appBaseUrl}press` },
              ].map((item) => (
                <NavLink key={item.label} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {!isMobile && (
              <NavLink href="#" muted>
                Login
              </NavLink>
            )}
            {!isMobile && <PrimaryBtn>Join</PrimaryBtn>}
            {isMobile && (
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "flex-end",
                  width: "32px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: i === 1 ? "16px" : "22px",
                      height: "1.5px",
                      background: "#f0ece3",
                      borderRadius: "1px",
                      transition:
                        "transform 0.3s ease, opacity 0.3s ease, width 0.3s ease",
                      ...(menuOpen && i === 0
                        ? {
                            transform: "translateY(6.5px) rotate(45deg)",
                            width: "22px",
                          }
                        : {}),
                      ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                      ...(menuOpen && i === 2
                        ? {
                            transform: "translateY(-6.5px) rotate(-45deg)",
                            width: "22px",
                          }
                        : {}),
                    }}
                  />
                ))}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobile && (
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            overflow: "hidden",
            maxHeight: menuOpen ? "360px" : "0",
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
            background: "#0c0c10",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            borderTop: "0px solid transparent",
            borderLeft: menuOpen
              ? "1px solid rgba(255,255,255,0.08)"
              : "0px solid transparent",
            borderRight: menuOpen
              ? "1px solid rgba(255,255,255,0.08)"
              : "0px solid transparent",
            borderBottom: menuOpen
              ? "1px solid rgba(255,255,255,0.08)"
              : "0px solid transparent",
            borderRadius: "0 0 12px 12px",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              padding: "20px 20px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {[
              { label: "Studio", href: "#" },
              { label: "Workshops", href: "#" },
              { label: "Teach", href: "#" },
              { label: "Press", href: `${appBaseUrl}press` },
              { label: "Login", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "15px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,227,0.65)",
                  textDecoration: "none",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {item.label}
              </a>
            ))}
            <div style={{ marginTop: "24px" }}>
              <PrimaryBtn href="#course">Begin FitAlign</PrimaryBtn>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── HERO CTA ─────────────────────────────────────────────────────────────────

function HeroCTA({
  light = false,
  label = "Start FitAlign Online",
}: {
  light?: boolean
  label?: string
}) {
  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)
  return (
    <a
      href="#course"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setPressed(false)
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: light ? "11px" : "12px",
        padding: light ? "15px 28px" : "16px 40px",
        border: `1px solid ${
          light
            ? hover || pressed
              ? "rgba(241,220,174,0.72)"
              : "rgba(235,211,163,0.38)"
            : hover || pressed
              ? "rgba(255,255,255,0.2)"
              : "rgba(255,255,255,0.13)"
        }`,
        borderRadius: light ? "999px" : "12px",
        background: light
          ? hover || pressed
            ? "linear-gradient(135deg, #d9bf87 0%, #caa96c 58%, #bc9657 100%)"
            : "linear-gradient(135deg, #d2b77e 0%, #c5a367 58%, #b99154 100%)"
          : hover || pressed
            ? "rgba(10,10,14,0.96)"
            : "rgba(10,10,14,0.88)",
        color: light ? "#0a0a0e" : hover ? "rgba(240,236,227,1)" : "rgba(240,236,227,0.9)",
        fontSize: "12px",
        fontWeight: light ? 700 : 600,
        letterSpacing: light ? "0.18em" : "0.24em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        textDecoration: "none",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        backdropFilter: light ? "none" : "blur(24px)",
        WebkitBackdropFilter: light ? "none" : "blur(24px)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: pressed ? "scale(0.975)" : "scale(1)",
        boxShadow: light
          ? "0 7px 18px rgba(0,0,0,0.28), 0 2px 8px rgba(201,169,110,0.1), inset 0 1px 0 rgba(255,255,255,0.22)"
          : "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.035), inset 0 1px 0 rgba(255,255,255,0.07)",
        cursor: "pointer",
      }}
    >
      {label}
      <svg
        width="13"
        height="9"
        viewBox="0 0 13 9"
        fill="none"
        style={{
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          transform: hover || pressed ? "translateX(3px)" : "translateX(0)",
        }}
      >
        <path
          d="M1 4.5h11M7.5 1l4 3.5-4 3.5"
          stroke={light ? "#0a0a0e" : "rgba(201,169,110,0.9)"}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const isMobile = useWindowWidth() < 768
  const nytRowRef = useRef<HTMLDivElement>(null)
  const [nytRowInView, setNytRowInView] = useState(false)
  const [scrollCueVisible, setScrollCueVisible] = useState(true)
  useEffect(() => {
    const updateScrollCue = () => setScrollCueVisible(window.scrollY < 16)
    updateScrollCue()
    window.addEventListener("scroll", updateScrollCue, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollCue)
  }, [])
  useEffect(() => {
    const el = nytRowRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNytRowInView(true)
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const heroPanel = (
    <div
      style={{
        animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both",
        width: "100%",
      }}
    >
      <BeforeAfterPanel
        before={clientAHeroBefore}
        after={clientAHeroAfter}
        beforeAlt="Client A before FitAlign"
        afterAlt="Client A after FitAlign"
        showLabels={false}
        showDivider={false}
        mobileHeight="clamp(430px, 55vh, 510px)"
        mobileBeforeObjectPosition="44% bottom"
        mobileAfterObjectPosition="52% bottom"
        mobileImageScale={0.95}
        mobileImageTranslateY="-45px"
        mobileBeforeImageTranslateY="-35px"
        mobileImageTopCrop="15px"
        mobileBeforeImageTopCrop="0px"
        mobileImageBottomCrop="18px"
      />
    </div>
  )

  return (
    <>
      <section
        style={{
          position: "relative",
          minHeight: isMobile ? "auto" : "100svh",
          display: "flex",
          flexDirection: "column",
          background: "#06060a",
          overflow: "hidden",
          padding: isMobile ? "0 0 100px" : 0,
        }}
      >
      {/* Noise texture */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <filter id="heroNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#heroNoise)"
          opacity="0.06"
        />
      </svg>

      {/* Gold radial glow — shifts right on desktop to complement the left-aligned copy */}
      <div
        className="hero-intro"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background: isMobile
            ? "radial-gradient(ellipse 80% 55% at 50% 44%, rgba(160,119,58,0.08) 0%, rgba(105,72,24,0.03) 45%, transparent 70%)"
            : "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(160,119,58,0.09) 0%, rgba(105,72,24,0.03) 50%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(ellipse 110% 40% at 50% 100%, rgba(0,0,0,0.7) 0%, transparent 55%)",
        }}
      />

      {/* ════ Main content row ════ */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: isMobile ? "none" : 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "center",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: isMobile
            ? "94px 32px 0"
            : "88px clamp(32px, 4vw, 72px) 24px",
          gap: isMobile ? "0" : "clamp(40px, 5vw, 80px)",
          boxSizing: "border-box",
        }}
      >
        {/* ── LEFT: Identity + (mobile: tagline first, then transformation, then description+CTA) ── */}
        <div
          style={{
            flex: isMobile ? "none" : "0 0 auto",
            width: isMobile ? "100%" : "clamp(340px, 42%, 540px)",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* Badge */}
          <div
            className="hero-intro hero-intro-badge"
            style={{
              display: isMobile ? "none" : "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: isMobile ? "10px" : "20px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "1px",
                background: "#c9a96e",
                opacity: 0.6,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.85)",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              Established 1996
            </span>
            <div
              style={{
                width: "28px",
                height: "1px",
                background: "#c9a96e",
                opacity: 0.6,
              }}
            />
          </div>

          {/* Wordmark */}
          <h1
            className="hero-intro hero-intro-title"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: isMobile
                ? "clamp(4.2rem, 18vw, 5.5rem)"
                : "clamp(7rem, 11vw, 10rem)",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            FitAlign
          </h1>

          <p
            className="hero-intro hero-intro-tagline"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: isMobile
                ? "clamp(1.3rem, 5.2vw, 1.65rem)"
                : "clamp(1.6rem, 2.1vw, 2rem)",
              fontWeight: 500,
              color: "rgba(240,236,227,0.72)",
              margin: isMobile ? "6px 0 0" : "12px 0 0",
              letterSpacing: "-0.01em",
            }}
          >
            Access your full capacity.
          </p>

          {/* On mobile: transformation goes here between tagline and description */}
          {isMobile && (
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "430px",
                margin: "8px auto 0",
              }}
            >
              {heroPanel}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "calc(50% + 97px)",
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HeroCTA light label="Apply Now" />
              </div>
            </div>
          )}

          {!isMobile && (
            <>
              <p
                className="hero-intro hero-intro-copy"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: "rgba(255,255,255,0.52)",
                  fontSize: "15.5px",
                  lineHeight: 1.68,
                  maxWidth: "420px",
                  margin: "20px 0 0",
                  letterSpacing: "0.01em",
                }}
              >
                From elite performance to lifelong mobility, <br />
                FitAlign helps people move with greater power, <br />
                ease, and control.
              </p>

              <div className="hero-intro hero-intro-cta" style={{ marginTop: "36px" }}>
                <HeroCTA />
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT: Transformation (desktop only) ── */}
        {!isMobile && (
          <div
            style={{
              flex: 1,
              minWidth: 0,
              maxWidth: "430px",
              marginInline: "auto",
              animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.28s both",
            }}
          >
            {heroPanel}
          </div>
        )}
      </div>

      {/* ════ NYT stats bar ════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          marginTop: isMobile ? "-47px" : 0,
          padding: isMobile ? "0 0 34px" : "0 0 45px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: isMobile ? "calc(100% - 32px)" : "100%",
            margin: isMobile ? "0 16px" : 0,
            borderRadius: isMobile ? "16px" : 0,
            overflow: "hidden",
            boxShadow: isMobile
              ? "0 8px 48px rgba(0,0,0,0.5)"
              : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isMobile ? "rgba(255,255,255,0.033)" : "rgba(10,10,14,0.96)",
              border: isMobile ? "1px solid rgba(255,255,255,0.08)" : undefined,
              borderTop: isMobile ? undefined : "1px solid rgba(255,255,255,0.13)",
              borderBottom: isMobile ? undefined : "1px solid rgba(255,255,255,0.13)",
              borderRadius: isMobile ? "16px" : 0,
              boxShadow: isMobile
                ? "inset 0 1px 0 rgba(255,255,255,0.05)"
                : "0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)",
              backdropFilter: isMobile ? "blur(20px)" : "blur(24px)",
              WebkitBackdropFilter: isMobile ? "blur(20px)" : "blur(24px)",
            }}
          />
          <div
            ref={nytRowRef}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: isMobile ? "4px" : "0",
              padding: isMobile ? "13px 20px" : "18px 24px",
              opacity: nytRowInView ? 1 : 0,
              transform: nytRowInView ? "translateY(0)" : "translateY(20px)",
              filter: nytRowInView ? "blur(0)" : "blur(6px)",
              transition:
                "opacity 1.5s cubic-bezier(0.16,1,0.3,1), transform 1.5s cubic-bezier(0.16,1,0.3,1), filter 1.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {[
              "Featured in The New York Times",
              "500+ Teachers Certified",
              "Practiced Worldwide",
            ].map((stat, i, arr) => (
              <span
                key={stat}
                style={{ display: isMobile ? "flex" : "contents" }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    letterSpacing: isMobile ? "0.06em" : "0.18em",
                    textTransform: isMobile ? "none" : "uppercase",
                    color: isMobile
                      ? "rgba(240,236,227,0.82)"
                      : "rgba(240,236,227,0.62)",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    whiteSpace: isMobile ? "nowrap" : "normal",
                  }}
                >
                  {stat}
                </span>
                {i < arr.length - 1 && (
                  <span
                    className="stat-dot"
                    style={{
                      margin: "0 10px",
                      fontSize: "12px",
                      color: "rgba(240,236,227,0.2)",
                      display: isMobile ? "none" : "inline-block",
                    }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: isMobile ? "2px" : "10px",
            opacity: scrollCueVisible ? 1 : 0,
            transform: scrollCueVisible
              ? "translateX(-50%) translateY(0) scale(1)"
              : "translateX(-50%) translateY(-10px) scale(0.94)",
            width: isMobile ? "52px" : "54px",
            height: isMobile ? "13px" : "16px",
            filter: scrollCueVisible
              ? "drop-shadow(0 0 8px rgba(240,236,227,0.42)) blur(0)"
              : "drop-shadow(0 0 0 rgba(240,236,227,0)) blur(5px)",
            transition:
              "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 850ms cubic-bezier(0.16,1,0.3,1), filter 700ms cubic-bezier(0.16,1,0.3,1)",
            willChange: "opacity, transform, filter",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 132 36"
            fill="none"
            preserveAspectRatio="none"
            style={{ animation: "scrollPulse 2.8s ease-in-out infinite" }}
          >
            <path
              d="M3 4L66 32L129 4"
              stroke="rgba(240,236,227,0.82)"
              strokeWidth={isMobile ? "0.9" : "1.4"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      </section>

    </>
  )
}

// ─── CLIENT B — "When Support Changes" ────────────────────────────────────────

type TransformationNarrativeProps = {
  items: { label: string; body: string }[]
  takeaway: string
  caption: string
}

function TransformationNarrative({ items, takeaway, caption }: TransformationNarrativeProps) {
  const isMobile = useWindowWidth() < 768

  return (
    <div>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.022)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.16)",
        }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              padding: "clamp(18px, 2.5vw, 24px)",
              borderBottom: "1px solid rgba(255,255,255,0.065)",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "minmax(92px, 0.34fr) 1fr",
              gap: isMobile ? "8px" : "clamp(16px, 2.5vw, 28px)",
              alignItems: "start",
            }}
          >
            <p
              style={{
                color: "#c9a96e",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                lineHeight: 1.5,
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                color: "rgba(240,236,227,0.72)",
                fontSize: "clamp(0.95rem, 1.3vw, 1rem)",
                lineHeight: 1.72,
              }}
            >
              {item.body}
            </p>
          </div>
        ))}
        <div
          style={{
            padding: "clamp(20px, 3vw, 28px)",
            background:
              "linear-gradient(110deg, rgba(201,169,110,0.1), rgba(201,169,110,0.025))",
            borderLeft: "2px solid rgba(201,169,110,0.72)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              color: "rgba(240,236,227,0.92)",
              fontSize: "clamp(1.05rem, 1.7vw, 1.25rem)",
              lineHeight: 1.5,
            }}
          >
            {takeaway}
          </p>
        </div>
      </div>
      <p
        style={{
          marginTop: "18px",
          fontSize: "14px",
          fontStyle: "italic",
          color: "rgba(240,236,227,0.38)",
          lineHeight: 1.6,
        }}
      >
        {caption}
      </p>
    </div>
  )
}

function ClientBSection() {
  const isMobile = useWindowWidth() < 768
  const narrative = (
    <TransformationNarrative
      items={[
        {
          label: "The shift",
          body: "His head, rib cage, pelvis, and legs moved into a more balanced relationship around the vertical line.",
        },
        {
          label: "What changed",
          body: "The whole body began organizing itself differently, rather than holding a corrected pose.",
        },
      ]}
      takeaway="Better posture wasn't something he forced. It emerged from better support."
      caption="Before and after working with Michaelle Edwards."
    />
  )

  if (isMobile) {
    return (
      <Section style={{ paddingTop: "clamp(20px, 3vw, 32px)" }}>
        <Reveal>
          <SectionTag label="Client Transformation" />
        </Reveal>
        <Reveal delay={70}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#f0ece3",
              marginBottom: "10px",
            }}
          >
            When Support Changes, the Whole Body Changes
          </h2>
        </Reveal>
        <BeforeAfterPanel
          before={clientBBefore}
          after={clientBAfter}
          mobileHeight="clamp(420px, 56vh, 510px)"
          beforeAlt="Side profile showing forward head posture and compensatory pattern"
          afterAlt="Side profile after sessions — body organized around a balanced vertical line"
        />
        <Reveal delay={80}>
          <div style={{ marginTop: "18px" }}>{narrative}</div>
        </Reveal>
      </Section>
    )
  }

  return (
    <Section style={{ paddingTop: "clamp(20px, 3vw, 32px)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* Copy */}
        <div>
          <Reveal>
            <SectionTag label="Client Transformation" />
          </Reveal>
          <Reveal delay={70}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#f0ece3",
                marginBottom: "28px",
              }}
            >
              When Support Changes, the Whole Body Changes
            </h2>
          </Reveal>
          <Reveal delay={140}>
            {narrative}
          </Reveal>
        </div>

        {/* Photos */}
        <Reveal delay={120}>
          <BeforeAfterPanel
            before={clientBBefore}
            after={clientBAfter}
            beforeAlt="Side profile showing forward head posture and compensatory pattern"
            afterAlt="Side profile after sessions — body organized around a balanced vertical line"
          />
        </Reveal>
      </div>
    </Section>
  )
}

// ─── STOP STRETCHING — tabbed card ───────────────────────────────────────────

function StretchingSection() {
  const isMobile = useWindowWidth() < 768

  const dotStyle: React.CSSProperties = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    flexShrink: 0,
    marginTop: "7px",
    border: "1px solid rgba(201,169,110,0.5)",
    background: "rgba(201,169,110,0.12)",
  }

  return (
    <Section>
      {/* Header */}
      <div style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
        <Reveal>
          <SectionTag label="Stop Stretching" />
        </Reveal>
        <Reveal delay={60}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#f0ece3",
              maxWidth: "560px",
            }}
          >
            Your body is not asking to be pushed farther.
          </h2>
        </Reveal>
      </div>

      {/* Beats 1 & 2 — four cards in a 2-col layout on desktop */}
      <Reveal delay={80}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "clamp(12px, 2vw, 16px)",
            marginBottom: "clamp(16px, 3vw, 24px)",
          }}
        >
          {/* Left column — Forced Range + Resistance stacked */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(12px, 2vw, 16px)",
            }}
          >
            {[
              {
                label: "Forced Range",
                headline: "Your joints are paying for your flexibility.",
                body: "Stretching forces the body past its normal range by loading the joints and connective tissue.",
                points: [
                  "The muscles are not creating more movement.",
                  "The joints are being pushed farther.",
                ],
              },
              {
                label: "Resistance",
                headline: "You pull on a tight muscle expecting it to release.",
                body: "Instead, forced stretching often causes the muscle to tighten and resist the pull.",
                points: [
                  "You're trying to release the muscle.",
                  "Your body is tightening it.",
                ],
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "clamp(24px, 4vw, 40px)",
                  background: "rgba(255,255,255,0.022)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                    marginBottom: "14px",
                  }}
                >
                  {item.label}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 500,
                    lineHeight: 1.2,
                    color: "#f0ece3",
                    marginBottom: "14px",
                  }}
                >
                  {item.headline}
                </h3>
                <p
                  style={{
                    color: "rgba(240,236,227,0.6)",
                    lineHeight: 1.8,
                    fontSize: "0.9375rem",
                    marginBottom: "20px",
                  }}
                >
                  {item.body}
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {item.points.map((pt) => (
                    <div
                      key={pt}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={dotStyle} />
                      <span
                        style={{
                          color: "rgba(240,236,227,0.55)",
                          fontSize: "15px",
                          lineHeight: 1.65,
                        }}
                      >
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right column — Signal card + Misread card stacked */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(12px, 2vw, 16px)",
            }}
          >
            {/* You feel your body resisting */}
            <div
              style={{
                flex: 1,
                padding: "clamp(24px, 4vw, 40px)",
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,227,0.35)",
                  marginBottom: "20px",
                }}
              >
                You feel your body resisting
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {["Muscle tightens", "Pressure builds in the joints"].map(
                  (item, i, arr) => (
                    <div
                      key={item}
                      style={{
                        padding: "14px 0",
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "none",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div style={dotStyle} />
                      <span
                        style={{
                          color: "#f0ece3",
                          fontSize: "1rem",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* But read as connector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0 4px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(201,169,110,0.22)",
                }}
              />
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                but read as
              </p>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(201,169,110,0.22)",
                }}
              />
            </div>

            {/* What we've been taught */}
            <div
              style={{
                flex: 1,
                padding: "clamp(24px, 4vw, 40px)",
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,227,0.35)",
                  marginBottom: "20px",
                }}
              >
                What we've been taught
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {["Effort", "Discipline", "Effectiveness"].map(
                  (item, i, arr) => (
                    <div
                      key={item}
                      style={{
                        padding: "14px 0",
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "none",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          ...dotStyle,
                          border: "1px solid rgba(255,255,255,0.2)",
                          background: "transparent",
                        }}
                      />
                      <span
                        style={{
                          color: "rgba(240,236,227,0.55)",
                          fontSize: "1rem",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Beat 3 — The reversal (full width, high emphasis) */}
      <Reveal delay={160}>
        <div
          style={{
            background: "rgba(201,169,110,0.04)",
            border: "1px solid rgba(201,169,110,0.18)",
            borderRadius: "16px",
            padding: "clamp(36px, 6vw, 64px)",
            marginBottom: "clamp(16px, 3vw, 24px)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#f0ece3",
              marginBottom: "20px",
            }}
          >
            Discomfort is not release.
          </h3>
          <p
            style={{
              color: "rgba(240,236,227,0.62)",
              lineHeight: 1.8,
              fontSize: "1.0625rem",
              maxWidth: "540px",
              margin: "0 auto 28px",
            }}
          >
            It is what muscle resistance and pressure in the joints feel like.
          </p>
          <div
            style={{
              display: "inline-block",
              borderTop: "1px solid rgba(201,169,110,0.25)",
              paddingTop: "22px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                fontStyle: "italic",
                color: "rgba(240,236,227,0.82)",
                lineHeight: 1.6,
              }}
            >
              You cannot create comfort through discomfort.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Beat 4 — The alternative */}
      <Reveal delay={200}>
        <div
          style={{
            background: "rgba(255,255,255,0.022)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "clamp(28px, 5vw, 48px)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "clamp(24px, 4vw, 48px)",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "14px",
              }}
            >
              A better way forward
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.35rem, 2.4vw, 1.95rem)",
                fontWeight: 500,
                lineHeight: 1.2,
                color: "#f0ece3",
              }}
            >
              Build range instead of forcing it.
            </h3>
          </div>
          <p
            style={{
              color: "rgba(240,236,227,0.62)",
              lineHeight: 1.85,
              fontSize: "1rem",
            }}
          >
            The goal is not to push the body farther. It is to build range the
            body can create and control with strength, support, and precision.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

// ─── FOUNDATIONS — tabbed card ───────────────────────────────────────────────

function FoundationsSection() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)
  const isMobile = useWindowWidth() < 768

  const tabs = isMobile
    ? ["STABILITY", "COMPENSATION", "Why Fixes Fail"]
    : ["BUILT-IN STABILITY", "HOW PATTERNS FORM", "Why Fixes Fail"]

  const switchTo = (i: number) => {
    if (i === active) return
    setVisible(false)
    setTimeout(() => {
      setActive(i)
      setVisible(true)
    }, 200)
  }

  const panels = [
    {
      category: "A WHOLE-BODY PROCESS",
      headline: "Standing isn't passive.",
      body: [
        "Your body is held upright by hundreds of muscles making tiny, automatic adjustments.",
      ],
      callout: "",
    },
    {
      category: "AN INTELLIGENT ADAPTATION",
      headline: "When support is missing in one area, effort shifts elsewhere.",
      body: ["Repeated often enough, that solution becomes automatic."],
      callout: "",
    },
    {
      category: "The Missing Piece",
      headline: "Most treatments address symptoms, not the cause.",
      body: [
        "Without changing the underlying movement pattern, the body recreates the same conditions.",
      ],
      callout: "",
    },
  ]

  const consequences = [
    "Poor posture",
    "Restricted movement",
    "Fatigue and stiffness",
    "Persistent pain",
  ]
  const stabilityCascade = [
    "Muscles pull in different directions",
    "The forces balance",
    "Your body stays upright",
  ]
  const approaches = [
    {
      label: "Targeted Release",
      pills: ["Stretching", "Massage"],
      gap: "Muscles may be working harder to compensate for missing support",
      gap2: "Symptoms return",
    },
    {
      label: "Strength Training",
      pills: [] as string[],
      gap: "Reinforces the compensation pattern",
    },
  ]

  const panel = panels[active]

  return (
    <Section>
      <div style={{ marginBottom: "28px" }}>
        <Reveal>
          <SectionTag label="The Ideas Behind the Method" />
        </Reveal>
        <Reveal delay={60}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#f0ece3",
              maxWidth: "560px",
            }}
          >
            Understanding how movement actually works
          </h2>
        </Reveal>
      </div>

      <Card padded={false}>
        {/* Tab bar */}
        <div
          style={{
            padding: isMobile
              ? "12px"
              : "clamp(18px, 2.5vw, 26px) clamp(28px, 5vw, 48px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: isMobile ? "grid" : "flex",
            gridTemplateColumns: isMobile ? "9fr 12fr 14fr" : undefined,
            alignItems: "center",
            gap: isMobile ? "0" : "8px",
            flexWrap: isMobile ? undefined : "wrap",
            background: isMobile ? "rgba(255,255,255,0.018)" : undefined,
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => switchTo(i)}
              style={{
                position: "relative",
                padding: isMobile ? "13px 3px 14px" : "7px 17px",
                border: `1px solid ${
                  isMobile
                    ? "transparent"
                    : i === active
                    ? "rgba(201,169,110,0.55)"
                    : "rgba(255,255,255,0.1)"
                }`,
                borderLeft: isMobile && i > 0
                  ? "1px solid rgba(255,255,255,0.07)"
                  : undefined,
                borderRadius: isMobile ? "7px" : "100px",
                background: i === active
                  ? isMobile
                    ? "linear-gradient(180deg, rgba(201,169,110,0.1), rgba(201,169,110,0.035))"
                    : "rgba(201,169,110,0.09)"
                  : "transparent",
                color: i === active ? "#c9a96e" : "rgba(240,236,227,0.42)",
                fontSize: isMobile ? "11.5px" : "12px",
                letterSpacing: isMobile ? "0.07em" : "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.22s ease",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: i === active ? 600 : 400,
                whiteSpace: "nowrap",
                boxShadow:
                  isMobile && i === active
                    ? "inset 0 -1px 0 rgba(201,169,110,0.8)"
                    : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Animated content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          {/* Left — text */}
          <div
            style={{
              padding: isMobile
                ? "20px clamp(28px, 5vw, 52px)"
                : "clamp(28px, 5vw, 52px)",
              borderRight: isMobile
                ? "none"
                : "1px solid rgba(255,255,255,0.07)",
              borderBottom: isMobile
                ? "1px solid rgba(255,255,255,0.07)"
                : "none",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "16px",
              }}
            >
              {panel.category}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.35rem, 2.4vw, 1.95rem)",
                fontWeight: 500,
                lineHeight: 1.2,
                color: "#f0ece3",
                marginBottom: "22px",
              }}
            >
              {panel.headline}
            </h3>
            {panel.body.map((para, i) => (
              <p
                key={i}
                style={{
                  color: "rgba(240,236,227,0.65)",
                  lineHeight: 1.85,
                  fontSize: "1rem",
                  marginBottom:
                    i < panel.body.length - 1 ? "14px" : isMobile ? 0 : "24px",
                }}
              >
                {para}
              </p>
            ))}
            {panel.callout && (
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  paddingTop: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                    fontStyle: "italic",
                    color: "rgba(240,236,227,0.8)",
                    lineHeight: 1.65,
                    whiteSpace: "pre-line",
                  }}
                >
                  {panel.callout}
                </p>
              </div>
            )}
          </div>

          {/* Right — visual */}
          <div
            style={{
              padding: isMobile
                ? "20px clamp(28px, 5vw, 52px) 12px"
                : "clamp(28px, 5vw, 52px)",
            }}
          >
            {active === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                  textAlign: "center",
                }}
              >
                {stabilityCascade.map((item, i) => (
                  <div key={item}>
                    <p
                      style={{
                        color: "rgba(240,236,227,0.85)",
                        fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                        fontWeight: 600,
                        lineHeight: 1.45,
                      }}
                    >
                      {item}
                    </p>
                    {i < stabilityCascade.length - 1 && (
                      <div
                        aria-hidden="true"
                        style={{
                          color: "#c9a96e",
                          fontSize: "22px",
                          lineHeight: 1,
                          padding: "14px 0",
                        }}
                      >
                        ↓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {active === 1 && (
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(240,236,227,0.35)",
                    marginBottom: "12px",
                  }}
                >
                  The compensation cascade
                </p>
                {consequences.map((item, i) => (
                  <div key={item}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "8px 0",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          border: "1px solid rgba(201,169,110,0.55)",
                          background: "rgba(201,169,110,0.1)",
                        }}
                      />
                      <span
                        style={{
                          color: "rgba(240,236,227,0.72)",
                          fontSize: "16px",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                    {i < consequences.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          height: "6px",
                          background: "rgba(201,169,110,0.18)",
                          marginLeft: "3.5px",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {active === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {approaches.map((a) => (
                  <div
                    key={a.label}
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.015)",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "14px 18px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "12px",
                            letterSpacing: "0.26em",
                            textTransform: "uppercase",
                            color: "#c9a96e",
                            margin: 0,
                          }}
                        >
                          {a.label}
                        </p>
                        {a.pills.map((pill) => (
                          <span
                            key={pill}
                            style={{
                              fontSize: "11px",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "rgba(240,236,227,0.45)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: "100px",
                              padding: "2px 9px",
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "14px 18px" }}>
                      {a.gap2 ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                            textAlign: "center",
                          }}
                        >
                          <p
                            style={{
                              color: "rgba(240,236,227,0.48)",
                              fontSize: "15px",
                              lineHeight: 1.6,
                            }}
                          >
                            {a.gap}
                          </p>
                          <svg
                            width="10"
                            height="14"
                            viewBox="0 0 10 14"
                            fill="none"
                          >
                            <line
                              x1="5"
                              y1="0"
                              x2="5"
                              y2="10"
                              stroke="rgba(240,236,227,0.22)"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M1 8l4 5 4-5"
                              stroke="rgba(240,236,227,0.22)"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              style={{ flexShrink: 0 }}
                            >
                              <circle
                                cx="7"
                                cy="7"
                                r="6"
                                stroke="rgba(255,255,255,0.12)"
                                strokeWidth="1"
                              />
                              <path
                                d="M5 5l4 4M9 5l-4 4"
                                stroke="rgba(240,236,227,0.28)"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                            </svg>
                            <p
                              style={{
                                color: "rgba(240,236,227,0.48)",
                                fontSize: "15px",
                                lineHeight: 1.6,
                              }}
                            >
                              {a.gap2}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            style={{ flexShrink: 0 }}
                          >
                            <circle
                              cx="7"
                              cy="7"
                              r="6"
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1"
                            />
                            <path
                              d="M5 5l4 4M9 5l-4 4"
                              stroke="rgba(240,236,227,0.28)"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <p
                            style={{
                              color: "rgba(240,236,227,0.48)",
                              fontSize: "15px",
                              lineHeight: 1.6,
                            }}
                          >
                            {a.gap}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Section>
  )
}

// ─── (legacy stubs kept for reference) ───────────────────────────────────────

function BodyPhilosophySection() {
  return (
    <Section>
      <Card>
        <div style={{ maxWidth: "720px" }}>
          <Reveal>
            <SectionTag label="The Foundation" />
          </Reveal>
          <Reveal delay={70}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                color: "#f0ece3",
                marginBottom: "36px",
              }}
            >
              Your body already knows how to move well.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                color: "rgba(240,236,227,0.68)",
                lineHeight: 1.88,
                marginBottom: "20px",
                fontSize: "1.0625rem",
              }}
            >
              Efficient movement, stable joints, and balanced muscle activation
              are automatic processes your body is designed to perform.
            </p>
            <p
              style={{
                color: "rgba(240,236,227,0.68)",
                lineHeight: 1.88,
                marginBottom: "20px",
                fontSize: "1.0625rem",
              }}
            >
              But injury, inactivity, repetitive habits, and stress can teach
              the body to favor movement patterns that are no longer useful.
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "rgba(240,236,227,0.88)",
                lineHeight: 1.65,
              }}
            >
              Over time, those patterns begin to feel normal.
            </p>
          </Reveal>
        </div>
      </Card>
    </Section>
  )
}

// ─── STABILITY SCIENCE ────────────────────────────────────────────────────────

function StabilitySection() {
  return (
    <Section>
      <Card padded={false}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          <div
            style={{
              padding: "clamp(36px, 6vw, 72px)",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Reveal>
              <SectionTag label="How the Body Works" />
            </Reveal>
            <Reveal delay={60}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "#f0ece3",
                  marginBottom: "28px",
                }}
              >
                Your Body Is Constantly Creating Stability
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p
                style={{
                  color: "rgba(240,236,227,0.68)",
                  lineHeight: 1.88,
                  marginBottom: "18px",
                }}
              >
                Standing is not passive. Muscles throughout your body are
                constantly pulling against one another through continuous,
                automatic adjustments.
              </p>
              <p
                style={{
                  color: "rgba(240,236,227,0.68)",
                  lineHeight: 1.88,
                  marginBottom: "18px",
                }}
              >
                Imagine trying to balance a broom upright on your palm. You
                wouldn't hold it perfectly still — you would make constant tiny
                corrections to keep it from falling.
              </p>
              <p style={{ color: "rgba(240,236,227,0.68)", lineHeight: 1.88 }}>
                Your body maintains stability in the same way.
              </p>
            </Reveal>
          </div>

          <div style={{ padding: "clamp(36px, 6vw, 72px)" }}>
            <Reveal delay={80}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  fontWeight: 500,
                  color: "#f0ece3",
                  lineHeight: 1.2,
                  marginBottom: "20px",
                }}
              >
                When one area stops contributing, other muscles chip in to
                maintain stability.
              </h3>
              {/* <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '18px' }}>
                other muscles automatically increase their effort to preserve it.
              </p> */}
              <p
                style={{
                  color: "rgba(240,236,227,0.68)",
                  lineHeight: 1.88,
                  marginBottom: "32px",
                }}
              >
                These compensations allow you to keep moving, but they change
                how force travels through the body.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div
                style={{
                  border: "1px solid rgba(201,169,110,0.18)",
                  padding: "28px 32px",
                  background: "rgba(201,169,110,0.03)",
                  marginBottom: "28px",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                    marginBottom: "20px",
                  }}
                >
                  Over time, this can contribute to:
                </p>
                {[
                  "Poor posture",
                  "Restricted movement",
                  "Fatigue and stiffness",
                  "Uneven joint loading",
                  "Persistent pain",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#c9a96e",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(240,236,227,0.7)",
                        fontSize: "16px",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p style={{ color: "rgba(240,236,227,0.68)", lineHeight: 1.88 }}>
                The symptom may appear in one area, while the pattern involves
                the entire body.
              </p>
            </Reveal>
          </div>
        </div>
      </Card>
    </Section>
  )
}

// ─── WHY FIXES FAIL ───────────────────────────────────────────────────────────

function WhyFailsSection() {
  const solutions = [
    {
      label: "Relaxation & Release",
      headline: "Targeting the muscles that hurt",
      body: "Many approaches focus on loosening or relaxing wherever pain appears — massage, stretching, or manual therapy applied directly to the tense area.",
      limitation:
        "Those muscles may be working harder to compensate for missing support elsewhere. When the underlying movement pattern stays unchanged, the body tends to recreate the tension.",
    },
    {
      label: "Strength Training",
      headline: "Building more capacity",
      body: "Strength training can build valuable capacity — developing muscle that supports joints and enables more demanding movement.",
      limitation:
        "But when strength is added without changing how the body coordinates movement, it may further reinforce the same compensation pattern.",
    },
  ]

  return (
    <Section>
      <Card padded={false}>
        <div
          style={{
            padding: "clamp(36px, 6vw, 72px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Reveal>
            <SectionTag label="A Different Approach" />
          </Reveal>
          <Reveal delay={70}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#f0ece3",
                maxWidth: "640px",
              }}
            >
              Why common solutions often don't last
            </h2>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {solutions.map((s, i) => (
            <Reveal
              key={s.label}
              delay={100 + i * 80}
              style={{
                borderRight:
                  i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div
                style={{
                  padding: "clamp(32px, 5vw, 56px)",
                  height: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                    marginBottom: "18px",
                  }}
                >
                  {s.label}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                    fontWeight: 500,
                    color: "#f0ece3",
                    lineHeight: 1.2,
                    marginBottom: "20px",
                  }}
                >
                  {s.headline}
                </h3>
                <p
                  style={{
                    color: "rgba(240,236,227,0.65)",
                    lineHeight: 1.85,
                    marginBottom: "28px",
                    fontSize: "1rem",
                  }}
                >
                  {s.body}
                </p>
                {s.limitation && (
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      paddingTop: "24px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(240,236,227,0.4)",
                        marginBottom: "14px",
                      }}
                    >
                      Why it doesn't last
                    </p>
                    <p
                      style={{
                        color: "rgba(240,236,227,0.68)",
                        lineHeight: 1.85,
                        fontSize: "1rem",
                      }}
                    >
                      {s.limitation}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Card>
    </Section>
  )
}

// ─── CLIENT A — Kelly ─────────────────────────────────────────────────────────

function ClientASection() {
  const isMobile = useWindowWidth() < 768
  const narrative = (
    <TransformationNarrative
      items={[
        {
          label: "Starting point",
          body: "Kelly already had strength, body awareness, and muscular control, but her body was organizing them through compensation.",
        },
        {
          label: "After training",
          body: "Her head, rib cage, abdomen, pelvis, and overall silhouette visibly reorganized.",
        },
      ]}
      takeaway="She didn't need more strength. She needed to use the strength she already had differently."
      caption="Before and after 10 days of teacher training with Michaelle Edwards."
    />
  )

  if (isMobile) {
    return (
      <Section>
        <Reveal>
          <SectionTag label="Client Transformation" />
        </Reveal>
        <Reveal delay={70}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#f0ece3",
              marginBottom: "10px",
            }}
          >
            She Was Already a Pilates Instructor
          </h2>
        </Reveal>
        <BeforeAfterPanel
          before={clientABefore}
          after={clientAAfter}
          mobileHeight="clamp(420px, 56vh, 510px)"
          beforeAlt="Kelly before sessions — strength organized through a compensatory pattern"
          afterAlt="Kelly after 3 sessions — head, rib cage, pelvis and silhouette visibly reorganized"
        />
        <Reveal delay={80}>
          <div style={{ marginTop: "18px" }}>{narrative}</div>
        </Reveal>
      </Section>
    )
  }

  return (
    <Section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* Photos */}
        <Reveal delay={120}>
          <BeforeAfterPanel
            before={clientABefore}
            after={clientAAfter}
            beforeAlt="Kelly before sessions — strength organized through a compensatory pattern"
            afterAlt="Kelly after 3 sessions — head, rib cage, pelvis and silhouette visibly reorganized"
          />
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <SectionTag label="Client Transformation" />
          </Reveal>
          <Reveal delay={70}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#f0ece3",
                marginBottom: "28px",
              }}
            >
              She Was Already a Pilates Instructor
            </h2>
          </Reveal>
          <Reveal delay={140}>
            {narrative}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

// ─── THE METHOD ───────────────────────────────────────────────────────────────

function MethodSection() {
  const isMobile = useWindowWidth() < 768
  const steps = [
    { n: 1, label: "Understand", desc: "What your body is designed to do" },
    {
      n: 2,
      label: "Recognize",
      desc: "Where compensation has changed the pattern",
    },
    { n: 3, label: "Experience", desc: "A more efficient alternative" },
    {
      n: 4,
      label: "Repeat",
      desc: "Until the movement becomes increasingly automatic",
    },
  ]

  return (
    <Section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}
      >
        <div>
          <Reveal>
            <SectionTag label="The Method" />
          </Reveal>
          <Reveal delay={60}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#f0ece3",
                marginBottom: "28px",
              }}
            >
              Give the Body a Better Movement Solution
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p
              style={{
                color: "rgba(240,236,227,0.68)",
                lineHeight: 1.88,
                marginBottom: "18px",
              }}
            >
              The body can establish a new pattern when it experiences a way of
              moving that provides greater stability with less effort.
            </p>
            <p style={{ color: "rgba(240,236,227,0.68)", lineHeight: 1.88 }}>
              Each FitAlign lesson combines explanation with guided movement so
              you can build a different relationship with how your body creates
              support.
            </p>
          </Reveal>
        </div>

        <div>
          {steps.map((step, i) => (
            <Reveal key={step.label} delay={140 + i * 70}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? "18px" : "24px",
                  paddingBottom: "28px",
                  marginBottom: i < steps.length - 1 ? "28px" : 0,
                  borderBottom:
                    i < steps.length - 1
                      ? "1px solid rgba(255,255,255,0.055)"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "36px" : "40px",
                    height: isMobile ? "36px" : "40px",
                    borderRadius: "10px",
                    border: "1px solid rgba(201,169,110,0.25)",
                    background:
                      "linear-gradient(145deg, rgba(201,169,110,0.1), rgba(201,169,110,0.025))",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    letterSpacing: "0.12em",
                    color: "rgba(201,169,110,0.82)",
                    fontWeight: 600,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {String(step.n).padStart(2, "0")}
                </div>
                <div>
                  <p
                    style={{
                      color: "#f0ece3",
                      fontWeight: 500,
                      marginBottom: "6px",
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      color: "rgba(240,236,227,0.5)",
                      fontSize: "15px",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={500}>
            <div
              style={{
                marginTop: "8px",
                padding: "14px 20px",
                background: "rgba(201,169,110,0.05)",
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
                gap: isMobile ? "8px" : "10px",
                flexWrap: isMobile ? "nowrap" : "wrap",
              }}
            >
              {["Knowledge", "Experience", "Automatic Pattern"].map(
                (item, i, arr) => (
                  <span
                    key={item}
                    style={{
                      display: isMobile ? "flex" : "contents",
                      flexDirection: isMobile ? "column" : undefined,
                      alignItems: isMobile ? "center" : undefined,
                      gap: isMobile ? "8px" : undefined,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#c9a96e",
                      }}
                    >
                      {item}
                    </span>
                    {i < arr.length - 1 && (
                      <span
                        style={{
                          color: "rgba(201,169,110,0.35)",
                          fontSize: "12px",
                        }}
                      >
                        {isMobile ? "↓" : "→"}
                      </span>
                    )}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────

function TestimonialSection() {
  const [hovered, setHovered] = useState(false)
  return (
    <Section>
      <Reveal>
        <SectionTag label="Student Experience" />
      </Reveal>
      <Reveal delay={80}>
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%",
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${
              hovered ? "rgba(201,169,110,0.28)" : "rgba(255,255,255,0.07)"
            }`,
            borderRadius: "12px",
            cursor: "pointer",
            overflow: "hidden",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                border: `1px solid ${
                  hovered ? "rgba(201,169,110,0.6)" : "rgba(201,169,110,0.3)"
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.3s, transform 0.3s",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                background: hovered ? "rgba(201,169,110,0.08)" : "transparent",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M8 5.5l9 5.5-9 5.5V5.5z" fill="#c9a96e" />
              </svg>
            </div>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(240,236,227,0.3)",
              }}
            >
              Student Testimonial
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

// ─── ABOUT MICHAELLE ──────────────────────────────────────────────────────────

function AboutSection() {
  const w = useWindowWidth()
  const isMobile = w < 768
  const featuredBy = [
    "The New York Times",
    "Huffington Post",
    "Spinal Research Journal",
    "More +",
  ]
  const trustedBy = [
    "Professional athletes",
    "Dancers",
    "Physicians",
    "Personal trainers",
    "Pilates teachers",
    "Yoga instructors",
    "Surfers",
    "People of all ages",
  ]

  const headerBlock = (
    <div style={{ marginBottom: "24px" }}>
      <Reveal>
        <SectionTag label="The Founder" />
      </Reveal>
      <Reveal delay={70}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#f0ece3",
          }}
        >
          A Pioneer in Human Movement
        </h2>
      </Reveal>
    </div>
  )

  const firstStoryBlock = (
    <p
      style={{
        color: "rgba(240,236,227,0.78)",
        fontSize: "clamp(1rem, 1.45vw, 1.08rem)",
        lineHeight: 1.82,
      }}
    >
      Michaelle Edwards began studying yoga at 18 under Swami Satchidananda.
      After experiencing injury and instability within her own practice, she
      began questioning whether commonly taught movements reflected the body's
      natural design.
    </p>
  )

  const secondStoryBlock = (
    <p style={{ color: "rgba(240,236,227,0.66)", lineHeight: 1.82 }}>
      Through decades of studying anatomy, breathing, fascia, posture, massage,
      and human movement &mdash; and working directly with thousands of students
      and clients &mdash; she developed a method for restoring alignment through
      movement rather than forcing the body into static positions.
    </p>
  )

  const bioBlock = (
    <Reveal delay={100}>
      <div
        style={{
          paddingLeft: "22px",
          borderLeft: "1px solid rgba(201,169,110,0.32)",
          marginBottom: "24px",
        }}
      >
        <div style={{ marginBottom: "18px" }}>{firstStoryBlock}</div>
        {secondStoryBlock}
      </div>
    </Reveal>
  )

  const credentialsBlock = (
    <div>
      <Reveal delay={160}>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#c9a96e",
            marginBottom: "20px",
            textAlign: isMobile ? "left" : "center",
          }}
        >
          A Body of Work
        </p>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.075)",
            borderRadius: "12px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.018)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              background:
                "linear-gradient(110deg, rgba(201,169,110,0.08), rgba(201,169,110,0.015))",
            }}
          >
            {[
              ["500+", "Teachers trained worldwide"],
              ["02", "Published books"],
            ].map(([value, label], i) => (
              <div
                key={label}
                style={{
                  padding: isMobile ? "20px 16px" : "22px",
                  borderLeft:
                    i === 1 ? "1px solid rgba(255,255,255,0.075)" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#c9a96e",
                    fontSize: "clamp(1.65rem, 2.6vw, 2rem)",
                    fontWeight: 600,
                    lineHeight: 1,
                    marginBottom: "10px",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    color: "rgba(240,236,227,0.76)",
                    fontSize: isMobile ? "14px" : "15px",
                    fontWeight: 500,
                    lineHeight: 1.45,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
          {[
            ["Featured by", featuredBy],
            ["Trusted by", trustedBy],
          ].map(([heading, entries]) => (
            <div
              key={heading as string}
              style={{
                padding: isMobile ? "18px 16px" : "18px 22px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "110px 1fr",
                gap: isMobile ? "9px" : "20px",
              }}
            >
              <p
                style={{
                  color: "rgba(240,236,227,0.88)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                }}
              >
                {heading as string}
              </p>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
              >
                {(entries as string[]).map((entry) => (
                  <span
                    key={entry}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.085)",
                      background:
                        heading === "Trusted by"
                          ? "rgba(201,169,110,0.065)"
                          : "rgba(255,255,255,0.025)",
                      color:
                        heading === "Trusted by"
                          ? "rgba(240,236,227,0.8)"
                          : "rgba(240,236,227,0.68)",
                      fontSize: isMobile ? "13px" : "13.5px",
                      fontWeight: heading === "Trusted by" ? 500 : 400,
                      lineHeight: 1.35,
                    }}
                  >
                    {entry === "More +" ? (
                      <a
                        href={`${appBaseUrl}press`}
                        aria-label="View more press features"
                        style={{
                          color: "#c9a96e",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        {entry}
                      </a>
                    ) : (
                      entry
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "12px",
            padding: "18px 20px",
            border: "1px solid rgba(201,169,110,0.16)",
            borderRadius: "10px",
            background: "rgba(201,169,110,0.045)",
          }}
        >
          <p
            style={{
              color: "rgba(240,236,227,0.68)",
              fontSize: "14px",
              lineHeight: 1.65,
            }}
          >
            FitAlign brings this body of work into a structured digital course
            that can be learned from anywhere.
          </p>
        </div>
      </Reveal>
    </div>
  )

  const photoBlock = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: isMobile ? "28px" : 0,
      }}
    >
      <img
        src={michaelleImg}
        alt="Michaelle Edwards demonstrating a balance pose outdoors"
        style={{
          width: isMobile ? "72%" : "100%",
          maxHeight: isMobile ? "none" : "420px",
          height: "auto",
          objectFit: "contain",
          display: "block",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
        }}
      />
    </div>
  )

  if (isMobile) {
    return (
      <Section>
        {headerBlock}
        <Reveal delay={100}>
          <div
            style={{
              marginBottom: "20px",
              padding: "22px",
              border: "1px solid rgba(255,255,255,0.075)",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.022)",
            }}
          >
            {firstStoryBlock}
          </div>
        </Reveal>
        {photoBlock}
        <Reveal delay={120}>
          <div
            style={{
              marginBottom: "24px",
              padding: "22px",
              border: "1px solid rgba(255,255,255,0.075)",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.022)",
            }}
          >
            {secondStoryBlock}
          </div>
        </Reveal>
        {credentialsBlock}
      </Section>
    )
  }

  return (
    <Section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(340px, 0.78fr) minmax(0, 1.22fr)",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "stretch",
          maxWidth: "1080px",
          margin: "0 auto",
        }}
      >
        {/* Photo */}
        <div
          style={{
            aspectRatio: "374 / 558",
            overflow: "hidden",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
          }}
        >
          <img
            src={michaelleImg}
            alt="Michaelle Edwards demonstrating a balance pose outdoors"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        {/* Header + Bio */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "590px",
          }}
        >
          {headerBlock}
          {bioBlock}
        </div>
      </div>
      <div style={{ maxWidth: "760px", margin: "48px auto 0" }}>
        {credentialsBlock}
      </div>
    </Section>
  )
}

// ─── COURSE / PRICING ─────────────────────────────────────────────────────────

// ─── TESTIMONIAL SLIDER ───────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "Michaelle Edwards bases her YogAlign® system on sound principles, with practical and useful exercises and awareness's.",
    name: "Tom Myers",
    role: "Author of Anatomy Trains and Fascial Release for Structural Balance",
    photo: tomMyersImg,
  },
  {
    quote:
      "YogAlign is packed with well-described anatomy and well-researched principles of body structure. The author's dedication and spirit will inspire you with her vision of a pain-free yoga path to a naturally aligned body.",
    name: "Mary Bond",
    role: "Author of The New Rules of Posture: How to Sit, Stand and Move in the Modern World",
    photo: maryBondImg,
  },
  {
    quote:
      "Michaelle Edwards raises a red flag on the prevalence of injuries experienced by people practicing yoga today. Not only does she detail common poses and practices that are at odds with the natural human design, she provides safe, rehabilitative alternatives throughout this richly-illustrated, well-researched guide.",
    name: "Kathleen Porter",
    role: "Natural Posture Solutions",
    photo: kathleenPorterImg,
  },
]

function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMobile = useWindowWidth() < 768

  const goTo = (index: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(index)
      setFading(false)
    }, 700)
  }

  const advance = (dir: number) => {
    goTo((current + dir + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => advance(1), 20000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current])

  const t = testimonials[current]

  return (
    <div
      style={{
        padding: "22px 24px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        position: "relative",
      }}
    >
      {/* Quote — fixed height so the card never resizes between slides */}
      <div
        className="overflow-hidden h-[280px] md:h-[220px]"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 0.7s ease",
          //height: '200px',
          //overflow: 'hidden',
        }}
      >
        <p
          style={{
            color: "rgba(240,236,227,0.65)",
            fontSize: isMobile ? "15px" : "14.5px",
            lineHeight: 1.75,
            fontStyle: "italic",
            marginBottom: "18px",
          }}
        >
          "{t.quote}"
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src={t.photo}
            alt={t.name}
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center top",
              flexShrink: 0,
              border: "1px solid rgba(201,169,110,0.35)",
            }}
          />
          <div>
            <p
              style={{
                fontSize: "15px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "4px",
              }}
            >
              {t.name}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(240,236,227,0.5)",
                lineHeight: 1.5,
              }}
            >
              {t.role}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: isMobile ? "20px" : 0,
        }}
      >
        {/* Dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? "#c9a96e" : "rgba(201,169,110,0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
        {/* Prev / Next */}
        <div style={{ display: "flex", gap: "8px" }}>
          {["←", "→"].map((label, i) => (
            <button
              key={label}
              onClick={() => advance(i === 0 ? -1 : 1)}
              style={{
                background: "none",
                border: "1px solid rgba(201,169,110,0.25)",
                color: "rgba(201,169,110,0.7)",
                cursor: "pointer",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                borderRadius: "2px",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── COURSE / PRICING ─────────────────────────────────────────────────────────

function CoursePricingSection() {
  const features = [
    "Progressive educational lessons",
    "Guided movement practices",
    "Visual explanations and demonstrations",
    "Direct instruction from Michaelle Edwards",
    "A structured method developed over more than 30 years",
    "Mobile and desktop access",
    "Lifetime access",
  ]

  const [btnHover, setBtnHover] = useState(false)

  return (
    <Section>
      <Card padded={false}>
        {/* Header — title left, price right */}
        <div
          style={{
            padding: "clamp(36px, 6vw, 72px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 340px" }}>
            <Reveal>
              <SectionTag label="The Course" />
            </Reveal>
            <Reveal delay={60}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "#f0ece3",
                  marginBottom: "20px",
                }}
              >
                FitAlign Online Course
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p
                style={{
                  color: "rgba(240,236,227,0.65)",
                  lineHeight: 1.82,
                  fontSize: "1.0125rem",
                  maxWidth: "420px",
                }}
              >
                Learn how the body creates stability, how compensation patterns
                become automatic, and how to restore more efficient movement
                through education and guided experience.
              </p>
            </Reveal>
          </div>

          {/* Price — moved up into header */}
          <Reveal delay={100}>
            <div style={{ textAlign: "left", flexShrink: 0 }}>
              <p
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  marginBottom: "20px",
                }}
              >
                One-time payment
              </p>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4.5rem, 8vw, 7.5rem)",
                  fontWeight: 300,
                  color: "#f0ece3",
                  lineHeight: 1,
                }}
              >
                $249
              </div>
              <p
                style={{
                  color: "rgba(240,236,227,0.4)",
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                Lifetime access · All devices
              </p>
            </div>
          </Reveal>
        </div>

        {/* Two-column body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {/* Feature list */}
          <Reveal
            delay={80}
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div style={{ padding: "clamp(36px, 6vw, 72px)" }}>
              <p
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,227,0.45)",
                  marginBottom: "28px",
                }}
              >
                What's included
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "14px",
                  alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: "1px solid rgba(201,169,110,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path
                          d="M1 3.5l2.5 2.5L8 1"
                          stroke="#c9a96e"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      style={{
                        color: "rgba(240,236,227,0.72)",
                        lineHeight: 1.65,
                        fontSize: "16px",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Testimonial + CTA — centered against the feature list */}
          <Reveal delay={160} style={{ height: "100%" }}>
            <div
              style={{
                padding: "clamp(36px, 6vw, 72px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "stretch",
                gap: "24px",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <a
                href="#"
                style={{
                  display: "block",
                  background: btnHover
                    ? "linear-gradient(160deg, #d8c07a 0%, #c9a96e 55%, #b8905e 100%)"
                    : "linear-gradient(160deg, #cdb472 0%, #c2a068 55%, #b08860 100%)",
                  color: "#1a1208",
                  padding: "18px 32px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  transform: btnHover ? "translateY(-2px)" : "translateY(0)",
                  borderRadius: "8px",
                  border: "1px solid rgba(201,169,110,0.4)",
                  boxShadow: btnHover
                    ? "0 6px 20px rgba(201,169,110,0.28), 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)"
                    : "0 2px 8px rgba(201,169,110,0.14), 0 1px 2px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
              >
                Begin FitAlign — $249
              </a>

              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(240,236,227,0.32)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                Secure checkout. Lifetime access immediately upon purchase.
              </p>

              <TestimonialSlider />
            </div>
          </Reveal>
        </div>
      </Card>
    </Section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <Section
      style={{
        textAlign: "center",
        padding: "clamp(80px, 12vw, 140px) clamp(16px, 3vw, 32px)",
      }}
    >
      <Reveal>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.6rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#f0ece3",
            marginBottom: "24px",
          }}
        >
          Stop Treating Each Symptom as a Separate Problem
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p
          style={{
            color: "rgba(240,236,227,0.55)",
            lineHeight: 1.88,
            fontSize: "1.0625rem",
            maxWidth: "540px",
            margin: "0 auto 44px",
          }}
        >
          Learn to recognize how your body is organizing itself and give it a
          more stable, efficient way to move.
        </p>
      </Reveal>
      <Reveal delay={190}>
        <PrimaryBtn large>Enroll Now</PrimaryBtn>
      </Reveal>
    </Section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

export function Footer() {
  const [hovered, setHovered] = useState<string | null>(null)

  const FooterLink = ({
    id,
    children,
    href = "#",
  }: {
    id: string
    children: string
    href?: string
  }) => (
    <a
      href={href}
      style={{
        display: "block",
        fontSize: "15px",
        color:
          hovered === id ? "rgba(240,236,227,0.85)" : "rgba(240,236,227,0.42)",
        marginBottom: "10px",
        transition: "color 0.25s ease",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {children}
    </a>
  )

  return (
    <Section
      style={{ padding: "clamp(56px, 8vw, 96px) clamp(16px, 3vw, 32px) 10px" }}
    >
      <Card style={{ padding: "clamp(36px, 6vw, 64px)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "40px",
            marginBottom: "56px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "#f0ece3",
                letterSpacing: "-0.02em",
                display: "block",
                marginBottom: "16px",
              }}
            >
              FitAlign
            </span>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(240,236,227,0.38)",
                lineHeight: 1.72,
              }}
            >
              Movement education grounded in 30+ years of investigation by
              Michaelle Edwards.
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "18px",
              }}
            >
              Learn
            </p>
            <FooterLink id="course">The FitAlign Course — $249</FooterLink>
            <FooterLink id="method">How It Works</FooterLink>
            <FooterLink id="about">About Michaelle</FooterLink>
          </div>
          <div>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "18px",
              }}
            >
              Experience
            </p>
            <FooterLink id="studio">Flagship Studio</FooterLink>
            <FooterLink id="classes">Weekly Classes</FooterLink>
            <FooterLink id="workshops">Workshops & Retreats</FooterLink>
          </div>
          <div>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "18px",
              }}
            >
              Teach
            </p>
            <FooterLink id="cert">Teacher Certification</FooterLink>
            <FooterLink id="dir">Teacher Directory</FooterLink>
            <FooterLink id="pro">For Professionals</FooterLink>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "15px", color: "rgba(240,236,227,0.28)" }}>
            © 2025 FitAlign. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: "15px",
                  color: "rgba(240,236,227,0.28)",
                  textDecoration: "none",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      style={{
        background: "#050507",
        color: "#f0ece3",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <Nav />
      <Hero />
      <ClientBSection />
      <FoundationsSection />
      <Section>
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <Reveal>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                fontStyle: "italic",
                color: "rgba(240,236,227,0.85)",
                lineHeight: 1.7,
              }}
            >
              Pain is not a malfunction.
              <br />
              It&apos;s a signal that something needs to change.
            </p>
          </Reveal>
        </div>
      </Section>
      <ClientASection />
      <StretchingSection />
      <MethodSection />
      <TestimonialSection />
      <AboutSection />
      <CoursePricingSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}
