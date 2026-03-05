"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

import manifest from "@/data/assets-manifest.json"
import { SplineScene } from "@/components/SplineScene"

type ProductEntry = {
  category: string
  category_label: string
  model: string
  style: string
  color: string
  color_hex: string
  file: string
}

type ManifestData = {
  logos: string[]
  products: ProductEntry[]
  lifestyle: string[]
}

const data = manifest as ManifestData

const techStrip = [
  "Spatial Audio",
  "Hybrid ANC",
  "Adaptive EQ",
  "Ultra-Low Latency",
  "Hi-Res Codec",
  "Dual Device Pairing",
  "Smart Wear Detection",
  "Studio Calibration"
]

const features = [
  {
    title: "Sonic Control App",
    body: "One app for noise profiles, spatial tuning, firmware updates, and cross-device syncing."
  },
  {
    title: "Premium Acoustic Stack",
    body: "Dynamic drivers, tuned waveguides, and precision dampening for deep, balanced output."
  },
  {
    title: "Activewear-Grade Comfort",
    body: "Sweat-resistant fit options across TWS and wired lines with secure ergonomic shells."
  },
  {
    title: "Color-Led Identity",
    body: "Each lineup ships in six curated finishes: Obsidian, Graphite, Silver, Cobalt, Crimson, Emerald."
  }
]

const faqItems = [
  {
    question: "Are all product ranges available in multiple colors?",
    answer: "Yes. Every product model in the portfolio ships in six colorways across categories."
  },
  {
    question: "Can the Spline model be replaced with a custom scene?",
    answer:
      "Yes. Set NEXT_PUBLIC_SPLINE_SCENE_URL in your environment and the hero 3D section will render your scene."
  },
  {
    question: "Is this structure inspired by the reference website?",
    answer:
      "Yes. The build follows a similar section rhythm and animation language while keeping a distinct Sonic visual identity."
  }
]

function toTitle(fileName: string) {
  return fileName
    .replace(/-4k\.(png|svg)$/i, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export default function SonicLanding() {
  const [category, setCategory] = useState("all")
  const [color, setColor] = useState("all")
  const [itemsCount, setItemsCount] = useState(15)

  const categories = useMemo(
    () =>
      Array.from(
        new Map(data.products.map((item) => [item.category, item.category_label])).entries()
      ).map(([id, label]) => ({ id, label })),
    []
  )

  const colors = useMemo(
    () => Array.from(new Set(data.products.map((item) => item.color))),
    []
  )

  const filteredProducts = useMemo(
    () =>
      data.products.filter((item) => {
        const categoryMatch = category === "all" || item.category === category
        const colorMatch = color === "all" || item.color === color
        return categoryMatch && colorMatch
      }),
    [category, color]
  )

  const productsToRender = filteredProducts.slice(0, itemsCount)
  const splineScene = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? ""

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.18 }
    )

    const targets = Array.from(document.querySelectorAll(".reveal"))
    for (const target of targets) {
      observer.observe(target)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-shell">
      <div className="ambient ambient-a" aria-hidden />
      <div className="ambient ambient-b" aria-hidden />

      <header className="topbar">
        <a className="brand" href="#hero">
          <span className="brand-mark">S</span>
          <span className="brand-text">SONIC</span>
        </a>

        <nav className="desktop-nav">
          <a href="#products">Products</a>
          <a href="#ecosystem">App Control</a>
          <a href="#lifestyle">Lifestyle</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="nav-cta" href="#cta">
          Shop Preview
        </a>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">Sonic AAudio Portfolio</p>
            <h1>
              Hear The Future.
              <br />
              Own The Stage.
            </h1>
            <p>
              Premium audio solutions with bold industrial design, app-controlled personalization, and complete model
              coverage across over-ear, in-ear, wired, wireless ANC, and speakers.
            </p>

            <div className="hero-actions">
              <a href="#products" className="btn btn-primary">
                Explore Portfolio
              </a>
              <a href="#ecosystem" className="btn btn-secondary">
                View App Ecosystem
              </a>
            </div>

            <div className="stats-grid">
              <article>
                <h3>210</h3>
                <p>Product Color Variants</p>
              </article>
              <article>
                <h3>35</h3>
                <p>Distinct Product Ranges</p>
              </article>
              <article>
                <h3>4K</h3>
                <p>High-Resolution Creative Assets</p>
              </article>
            </div>
          </div>

          <div className="hero-visual reveal">
            {splineScene ? (
              <SplineScene scene={splineScene} className="spline-frame" />
            ) : (
              <div className="spline-fallback">
                <p>Add `NEXT_PUBLIC_SPLINE_SCENE_URL` to render your 3D Spline scene.</p>
              </div>
            )}
          </div>
        </section>

        <section className="strip reveal" aria-label="Technology strip">
          <div className="strip-track">
            {[...techStrip, ...techStrip].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="logo-grid-section reveal">
          <div className="section-head">
            <p className="eyebrow">Brand Language</p>
            <h2>Logo System</h2>
            <p>Five concept routes for digital surfaces, packaging, and app icon usage.</p>
          </div>
          <div className="logo-grid">
            {data.logos.map((file) => (
              <article className="asset-card" key={file}>
                <Image
                  src={`/assets/logos/${file}`}
                  alt={toTitle(file)}
                  width={3840}
                  height={2160}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className="asset-meta">
                  <h3>{toTitle(file).replace("Sonic Logo ", "")}</h3>
                  <p>4K vector concept</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-grid reveal">
          {features.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </section>

        <section className="portfolio reveal" id="products">
          <div className="section-head">
            <p className="eyebrow">Complete Catalog</p>
            <h2>Multi-Range Product Portfolio</h2>
            <p>
              Over-ear wireless, over-ear wired, Bluetooth in-ear, wired in-ear, and premium speakers with six-color
              options for each model.
            </p>
          </div>

          <div className="filter-row">
            <label>
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="all">All Categories</option>
                {categories.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Color
              <select value={color} onChange={(event) => setColor(event.target.value)}>
                <option value="all">All Colors</option>
                {colors.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry.charAt(0).toUpperCase() + entry.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Visible Cards
              <select value={itemsCount} onChange={(event) => setItemsCount(Number(event.target.value))}>
                <option value={12}>12</option>
                <option value={15}>15</option>
                <option value={18}>18</option>
                <option value={24}>24</option>
              </select>
            </label>
          </div>

          <p className="result-meta">
            Showing {productsToRender.length} of {filteredProducts.length} matching products ({data.products.length}
            total)
          </p>

          <div className="product-grid">
            {productsToRender.map((item) => (
              <article className="asset-card" key={item.file}>
                <Image
                  src={`/assets/products/${item.file}`}
                  alt={`${item.model} in ${item.color}`}
                  width={3840}
                  height={2160}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className="asset-meta">
                  <h3>{item.model}</h3>
                  <p>{item.category_label}</p>
                  <p>
                    <span className="dot" style={{ backgroundColor: item.color_hex }} />
                    {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ecosystem reveal" id="ecosystem">
          <div className="section-head">
            <p className="eyebrow">Sonic App Control</p>
            <h2>Your Full Audio Command Center</h2>
          </div>
          <div className="ecosystem-panels">
            <article>
              <h3>Noise + Spatial Profiles</h3>
              <p>Switch between commute, focus, studio, and immersive cinematic modes in one tap.</p>
            </article>
            <article>
              <h3>Product Sync</h3>
              <p>Manage all Sonic devices in one dashboard with quick handoff and firmware status tracking.</p>
            </article>
            <article>
              <h3>Color-Matched UI Themes</h3>
              <p>Automatic UI accent adaptation based on your selected product colorway and device family.</p>
            </article>
          </div>
        </section>

        <section className="lifestyle reveal" id="lifestyle">
          <div className="section-head">
            <p className="eyebrow">Lifestyle Direction</p>
            <h2>AI-Style Model Portfolio</h2>
            <p>Concept visuals showing how Sonic products sit in everyday activewear, streetwear, and studio contexts.</p>
          </div>

          <div className="lifestyle-grid">
            {data.lifestyle.map((file) => (
              <article className="asset-card" key={file}>
                <Image
                  src={`/assets/lifestyle/${file}`}
                  alt={toTitle(file)}
                  width={3840}
                  height={2160}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className="asset-meta">
                  <h3>{toTitle(file)}</h3>
                  <p>4K lifestyle concept</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="faq reveal" id="faq">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Build Readiness</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta reveal" id="cta">
          <h2>Sonic website foundation is now ready for launch integration.</h2>
          <p>Next step is deployment, analytics wiring, and replacement of placeholder Spline scene URL.</p>
          <a href="#hero" className="btn btn-primary">
            Back To Top
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>SONIC AAudio © {new Date().getFullYear()}</p>
        <p>Premium audio products and app-controlled listening ecosystem.</p>
      </footer>
    </div>
  )
}
