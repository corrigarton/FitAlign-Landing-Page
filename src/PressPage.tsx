import { useEffect, useState } from "react"
import { Footer, Nav } from "./App"

type PressItem = {
  publication: string
  title: string
  date: string
  url: string
}

const pressItems: PressItem[] = [
  {
    publication: "Spinal Research Journal",
    title: "Sit, Breathe, and Align Your Spine",
    date: "Spring 2018",
    url: "https://yogalign.com/wp-content/uploads/2021/01/Spinal-research-foundation-article.pdf",
  },
  {
    publication: "Huffington Post",
    title: "Stop Stretching Your Hamstrings",
    date: "03-22-17",
    url: "https://www.huffpost.com/entry/stop-stretching-your-hamstrings_n_58cdb802e4b0e0d348b34421",
  },
  {
    publication: "Huffington Post",
    title: "Leave the Yoga Plow in the Field",
    date: "12-07-17",
    url: "https://www.huffpost.com/entry/leave-the-yoga-plow-in-th_n_10907212",
  },
  {
    publication: "Breaking Muscle",
    title: "Stretching Doesn’t Work (the Way You Think It Does)",
    date: "",
    url: "http://breakingmuscle.com/mobility-recovery/stretching-doesnt-work-the-way-you-think-it-does",
  },
  {
    publication: "Elephant Journal",
    title: "How William Broad Is Helping Yoga Be Safer and Smarter",
    date: "11-23-13",
    url: "http://www.elephantjournal.com/2013/11/how-william-broad-is-helping-yoga-be-safer-smarter-michaelle-edwards/",
  },
  {
    publication: "Elephant Journal",
    title: "Can Yogis Be Flexible in Our Minds, Too?",
    date: "11-06-13",
    url: "http://www.elephantjournal.com/2013/11/can-yogis-be-flexible-in-our-minds-too-michaelle-edwards/",
  },
  {
    publication: "The New York Times",
    title: "Women’s Flexibility Is a Liability (in Yoga)",
    date: "11-02-13",
    url: "http://www.nytimes.com/2013/11/03/sunday-review/womens-flexibility-is-a-liability-in-yoga.html?_r=1",
  },
  {
    publication: "Huffington Post",
    title: "Yoga Poses That Can Hurt You",
    date: "12-07-17",
    url: "https://www.huffpost.com/entry/yoga-poses_n_3943130",
  },
  {
    publication: "Elephant Journal",
    title: "When Flexibility Becomes a Liability",
    date: "07-11-13",
    url: "http://www.elephantjournal.com/2013/07/when-flexibility-becomes-a-liability-michaelle-edwards/",
  },
  {
    publication: "Elephant Journal",
    title: "Yoga Twists & Turns: How to Stay Safe",
    date: "06-04-13",
    url: "http://www.elephantjournal.com/2013/06/yoga-twists-turns-how-to-stay-safe-michaelle-edwards/",
  },
  {
    publication: "Huffington Post",
    title: "Physician, Heal Thyself: An Interview with Michaelle Edwards",
    date: "02-15-13",
    url: "http://www.huffingtonpost.com/stewart-j-lawrence/physician-heal-thyself-an_b_2695785.html",
  },
  {
    publication: "Inspiration Journal",
    title: "How to Easily Live Pain-Free",
    date: "Fall 2014",
    url: "http://yogalign.com/wp-content/uploads/2015/09/inspiration-fall-2014.pdf",
  },
  {
    publication: "Inspiration Journal",
    title: "A Transformation from Skier and Musician to Yoga Innovator",
    date: "Winter 2013",
    url: "http://yogalign.com/wp-content/uploads/2015/09/Inspiration_winter13web1.pdf",
  },
  {
    publication: "Inspiration Journal",
    title: "Why You Need to Avoid Slouching",
    date: "Summer 2013",
    url: "http://yogalign.com/wp-content/uploads/2015/09/Inspiration_summer-2013-issue.pdf",
  },
  {
    publication: "Inspiration Journal",
    title: "Natural Alignment for Functional Pain-Free Living",
    date: "Winter 2011",
    url: "http://yogalign.com/wp-content/uploads/2015/09/inspiration-11-01.pdf",
  },
  {
    publication: "Inspiration Journal",
    title: "Psoas Power with YogAlign®?",
    date: "March/April 2010",
    url: "http://yogalign.com/wp-content/uploads/2015/09/IJ_2010-3.pdf",
  },
  {
    publication: "Inspiration Journal",
    title: "Is Your Yoga Doing More Harm Than Good?",
    date: "November/December 2009",
    url: "http://yogalign.com/wp-content/uploads/2015/09/IJ_2009-11.pdf",
  },
  {
    publication: "Inspiration Journal",
    title: "Living in a Round Body in a Linear World",
    date: "March/April 2009",
    url: "http://yogalign.com/wp-content/uploads/2015/09/IJ_2009-2.pdf",
  },
  {
    publication: "Inspiration Journal",
    title: "Breathing Naturally from Your Core",
    date: "May/June 2008",
    url: "http://yogalign.com/wp-content/uploads/2015/09/IJ_2008-5.pdf",
  },
]

const featuredOutlets = [
  "All",
  "The New York Times",
  "Huffington Post",
  "Spinal Research Journal",
  "Elephant Journal",
  "Breaking Muscle",
  "Inspiration Journal",
]

function pressDateValue(date: string) {
  const numericDate = date.match(/^(\d{2})-(\d{2})-(\d{2})$/)
  if (numericDate) {
    const [, month, day, year] = numericDate
    return new Date(2000 + Number(year), Number(month) - 1, Number(day)).getTime()
  }

  const year = Number(date.match(/\d{4}/)?.[0])
  if (!year) return Number.NEGATIVE_INFINITY

  const monthByLabel: Record<string, number> = {
    Winter: 12,
    Fall: 10,
    Summer: 7,
    Spring: 4,
    "November/December": 11,
    "May/June": 5,
    "March/April": 3,
  }
  const month = Object.entries(monthByLabel).find(([label]) => date.startsWith(label))?.[1] ?? 1
  return new Date(year, month - 1, 1).getTime()
}

const chronologicalPressItems = [...pressItems].sort(
  (a, b) => pressDateValue(b.date) - pressDateValue(a.date),
)

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  )

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return isMobile
}

export default function PressPage() {
  const isMobile = useIsMobile()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeOutlet, setActiveOutlet] = useState("All")
  const visibleItems =
    activeOutlet === "All"
      ? chronologicalPressItems
      : chronologicalPressItems.filter((item) => item.publication === activeOutlet)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050507",
        color: "#f0ece3",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <Nav />

      <main
        style={{
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "120px 28px 56px" : "156px 32px 80px",
        }}
      >
        <div
          aria-hidden="true"
          className="hero-intro press-intro-glow"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 65% 35% at 50% 0%, rgba(180,138,72,0.1) 0%, rgba(120,85,30,0.035) 50%, transparent 75%)",
          }}
        />

        <div style={{ position: "relative", maxWidth: "1120px", margin: "0 auto" }}>
          <div
            className="hero-intro press-intro-label mobile-eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "22px",
            }}
          >
            <span style={{ width: "28px", height: "1px", background: "#c9a96e", opacity: 0.55 }} />
            <span
              style={{
                color: "rgba(201,169,110,0.86)",
                fontSize: "11px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              Press & Media
            </span>
          </div>

          <h1
            className="hero-intro press-intro-title mobile-heading"
            style={{
              margin: 0,
              fontSize: isMobile ? "clamp(2.7rem, 13vw, 4.2rem)" : "clamp(4rem, 7vw, 6.6rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              color: "#f5f2eb",
            }}
          >
            Coverage & Features
          </h1>

          <p
            className="hero-intro press-intro-copy mobile-body-copy"
            style={{
              maxWidth: "610px",
              margin: isMobile ? "22px 0 42px" : "28px 0 56px",
              color: "rgba(240,236,227,0.55)",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: 1.75,
            }}
          >
            Michaelle Edwards and FitAlign have been featured in leading publications on movement,
            health, and yoga science.
          </p>

          <div
            className="hero-intro press-intro-filters"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: isMobile ? "48px" : "64px",
            }}
          >
            {featuredOutlets.map((outlet) => (
              <button
                key={outlet}
                type="button"
                aria-pressed={activeOutlet === outlet}
                onClick={() => {
                  setActiveOutlet(outlet)
                  setHoveredIndex(null)
                }}
                style={{
                  padding: "8px 15px",
                  border: `1px solid ${
                    activeOutlet === outlet
                      ? "rgba(201,169,110,0.62)"
                      : "rgba(201,169,110,0.22)"
                  }`,
                  borderRadius: "999px",
                  background:
                    activeOutlet === outlet
                      ? "rgba(201,169,110,0.14)"
                      : "rgba(201,169,110,0.04)",
                  color:
                    activeOutlet === outlet
                      ? "rgba(240,236,227,0.94)"
                      : "rgba(201,169,110,0.76)",
                  fontSize: "10px",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 180ms ease, border-color 180ms ease, color 180ms ease",
                }}
              >
                {outlet}
              </button>
            ))}
          </div>

          <div
            className="hero-intro press-intro-list"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {visibleItems.map((item, index) => {
              const hovered = hoveredIndex === index

              return (
                <a
                  className="press-row-intro"
                  key={`${item.publication}-${item.title}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "210px minmax(0, 1fr) 150px 22px",
                    alignItems: "center",
                    gap: isMobile ? "3px" : "24px",
                    margin: "0 -12px",
                    padding: isMobile ? "15px 12px" : "23px 12px",
                    borderBottom: "1px solid rgba(255,255,255,0.075)",
                    borderRadius: "4px",
                    background: hovered ? "rgba(201,169,110,0.045)" : "transparent",
                    color: "inherit",
                    textDecoration: "none",
                    transition: "background 180ms ease",
                    animationDelay: `${560 + Math.min(index, 8) * 45}ms`,
                  }}
                >
                  <span
                    style={{
                      color: hovered ? "rgba(201,169,110,0.95)" : "rgba(201,169,110,0.66)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      lineHeight: 1.5,
                      textTransform: "uppercase",
                      transition: "color 180ms ease",
                    }}
                  >
                    {item.publication}
                  </span>

                  <span
                    style={{
                      color: hovered ? "#f5f2eb" : "rgba(240,236,227,0.84)",
                      fontSize: isMobile ? "15px" : "16px",
                      fontWeight: 500,
                      lineHeight: 1.45,
                      transition: "color 180ms ease",
                    }}
                  >
                    {item.title}
                  </span>

                  <span
                    style={{
                      color: "rgba(240,236,227,0.36)",
                      fontSize: "12px",
                      letterSpacing: "0.04em",
                      textAlign: isMobile ? "left" : "right",
                      minHeight: isMobile ? "18px" : undefined,
                    }}
                  >
                    {item.date}
                  </span>

                  {!isMobile && (
                    <span
                      aria-hidden="true"
                      style={{
                        color: "rgba(201,169,110,0.9)",
                        fontSize: "18px",
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? "translateX(0)" : "translateX(-5px)",
                        transition: "opacity 180ms ease, transform 180ms ease",
                      }}
                    >
                      →
                    </span>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
