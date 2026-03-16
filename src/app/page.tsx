"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Flame, ArrowDown, ExternalLink } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

// ── Fake receipt for demo ────────────────────────────────
const receiptItems = [
  { name: "Woolworths Milk 2L", paid: 3.50, fair: 2.89, bad: true },
  { name: "White Bread Loaf", paid: 3.80, fair: 3.20, bad: true },
  { name: "Bananas 1kg", paid: 5.90, fair: 3.50, bad: true },
  { name: "Tim Tams Original", paid: 4.50, fair: 4.50, bad: false },
  { name: "Chicken Breast 500g", paid: 10.00, fair: 7.50, bad: true },
  { name: "Cheddar Cheese 500g", paid: 7.00, fair: 6.80, bad: false },
];

function ReceiptCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
      className="relative max-w-[340px] mx-auto lg:mx-0"
    >
      <div className="bg-[#faf9f6] rounded-t-md p-5 text-zinc-900 font-mono text-sm">
        <div className="text-center mb-3 border-b border-dashed border-zinc-300 pb-3">
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400">Receipt Rage Report</p>
          <p className="text-base font-bold mt-1 text-zinc-800">WOOLWORTHS</p>
          <p className="text-[10px] text-zinc-400">Forbes NSW</p>
        </div>
        <div className="space-y-1.5">
          {receiptItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2 text-xs">
              <span className="truncate flex-1 text-zinc-600">{item.name}</span>
              {item.bad && <span className="text-zinc-400 line-through">${item.fair.toFixed(2)}</span>}
              <span className={`font-bold ${item.bad ? "text-red-600" : "text-zinc-700"}`}>${item.paid.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-dashed border-zinc-300 text-xs">
          <div className="flex justify-between font-bold text-sm"><span>You paid</span><span>$34.70</span></div>
          <div className="flex justify-between text-green-700"><span>Fair price</span><span>$28.39</span></div>
          <div className="flex justify-between text-red-600 font-bold mt-1"><span>Overpaid</span><span>+$6.31</span></div>
        </div>
      </div>
      {/* Stamp */}
      {inView && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-stamp pointer-events-none">
          <div className="border-4 border-red-600 rounded-md px-5 py-2 rotate-[-12deg] opacity-80">
            <p className="text-red-600 font-black text-2xl tracking-widest">RIP-OFF</p>
            <p className="text-red-500 text-[10px] text-center font-bold">SCORE: 72/100</p>
          </div>
        </div>
      )}
      {/* Torn edge */}
      <div className="h-4 bg-[#faf9f6]" style={{
        maskImage: "conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) 50%/16px 100%",
        WebkitMaskImage: "conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) 50%/16px 100%",
      }} />
    </motion.div>
  );
}

// ── Phone mockup ─────────────────────────────────────────
function PhoneMockup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-zinc-900 rounded-[2.5rem] border-[3px] border-zinc-700 p-3 shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-900 rounded-b-2xl z-10" />
        <div className="bg-[#0a0a0a] rounded-[2rem] overflow-hidden w-[260px] h-[520px] flex flex-col items-center justify-center p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Score screen mockup (inside phone) ───────────────────
function ScoreScreenMockup() {
  return (
    <div className="text-center">
      <p className="text-zinc-500 text-[10px] font-semibold tracking-[0.15em] mb-3">RIP-OFF SCORE</p>
      <div className="w-24 h-24 rounded-full border-[3px] border-red-500 flex items-center justify-center mx-auto bg-zinc-900/50">
        <span className="text-red-500 text-4xl font-black">83</span>
      </div>
      <p className="text-red-500 text-sm font-bold mt-3">Price Gouged</p>
      <p className="text-zinc-500 text-xs mt-1">You overpaid $9.42</p>
      <div className="mt-5 w-full space-y-2">
        <div className="flex justify-between text-[10px]">
          <span className="text-zinc-400">Bananas 1kg</span>
          <span className="text-red-400 font-semibold">save $2.40</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-zinc-400">Chicken Breast 500g</span>
          <span className="text-red-400 font-semibold">save $2.50</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-zinc-400">Milk 2L</span>
          <span className="text-red-400 font-semibold">save $0.61</span>
        </div>
      </div>
      <div className="mt-5 bg-[#1a1a1a] border border-[#22c55e]/30 rounded-lg p-3">
        <p className="text-white text-[11px] font-medium">Next time, shop at <span className="text-[#22c55e] font-bold">Aldi</span></p>
        <p className="text-[#22c55e] text-lg font-black">{"You'd save $9.42"}</p>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-[family-name:var(--font-dm-sans)]">

      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <span className="font-black text-base tracking-tight">Receipt Rage</span>
          </div>
          <a href="#download" className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors">
            Get the app
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div variants={fade} initial="hidden" animate="visible" custom={0}>
              <span className="inline-block bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-red-400 tracking-wide mb-6">
                FOR AUSSIE SHOPPERS
              </span>
            </motion.div>

            <motion.h1 variants={fade} initial="hidden" animate="visible" custom={0.1}
              className="text-[2.8rem] sm:text-[3.5rem] md:text-[4rem] font-black leading-[1.05] tracking-[-0.03em] mb-5"
            >
              Your supermarket is charging you more.{" "}
              <span className="text-red-500">Now you can prove it.</span>
            </motion.h1>

            <motion.p variants={fade} initial="hidden" animate="visible" custom={0.2}
              className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed"
            >
              Snap your receipt. See exactly where you got ripped off at the checkout.
            </motion.p>

            <motion.div variants={fade} initial="hidden" animate="visible" custom={0.3}
              className="flex flex-wrap gap-4"
            >
              <a href="#download" className="bg-red-500 hover:bg-red-600 text-white font-bold px-7 py-3.5 rounded-full transition-colors pulse-cta text-base">
                Download the app
              </a>
              <a href="#how" className="text-zinc-400 hover:text-white font-medium flex items-center gap-2 transition-colors text-base">
                See how it works <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right — Phone mockup */}
          <motion.div variants={fade} initial="hidden" animate="visible" custom={0.3}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup>
              <ScoreScreenMockup />
            </PhoneMockup>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6"
          >
            <div className="border-l-2 border-red-500 pl-5">
              <p className="text-4xl md:text-5xl font-black text-white">$1,600</p>
              <p className="text-zinc-500 text-sm mt-1">What the average Aussie family overpays on groceries. Every single year.</p>
            </div>
            <div className="border-l-2 border-red-500 pl-5">
              <p className="text-4xl md:text-5xl font-black text-white">22%</p>
              <p className="text-zinc-500 text-sm mt-1">Average markup on everyday items compared to the cheapest option at a competitor.</p>
            </div>
            <div className="border-l-2 border-red-500 pl-5">
              <p className="text-4xl md:text-5xl font-black text-white">$3.5B</p>
              <p className="text-zinc-500 text-sm mt-1">Combined supermarket profits in 2025 while Aussie families cut back on groceries.</p>
            </div>
          </motion.div>

          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
            className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8"
          >
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
              The ACCC is investigating supermarket pricing practices right now.{" "}
              <span className="text-white font-bold">Receipt Rage gives you the receipts.</span>{" "}
              Literally. Scan what you bought, see what you should have paid.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────── */}
      <section id="how" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-zinc-500 text-xs font-bold tracking-[0.15em] uppercase mb-3"
          >
            How it works
          </motion.p>
          <motion.h2 variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
            className="text-3xl md:text-5xl font-black tracking-tight mb-14"
          >
            Three taps. That&apos;s it.
          </motion.h2>

          {/* Three phones side by side */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6">
            {/* Phone 1 — Scan */}
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="md:-rotate-3"
            >
              <PhoneMockup className="scale-[0.85] md:scale-90">
                <div className="text-center">
                  <p className="text-red-500 text-xs font-black tracking-widest mb-4">RECEIPT RAGE</p>
                  <p className="text-white text-lg font-bold mb-2">Scan your grocery receipt</p>
                  <p className="text-zinc-500 text-xs mb-6">Find out if you got ripped off</p>
                  <div className="bg-red-500 rounded-lg py-3 px-6 mb-2">
                    <p className="text-white text-sm font-bold">Take Photo</p>
                  </div>
                  <div className="border border-red-500 rounded-lg py-3 px-6">
                    <p className="text-red-500 text-sm font-bold">Upload</p>
                  </div>
                </div>
              </PhoneMockup>
              <p className="text-center text-zinc-500 text-sm mt-4 font-medium">Snap your receipt</p>
            </motion.div>

            {/* Phone 2 — Score */}
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}
              className="md:z-10"
            >
              <PhoneMockup className="scale-[0.85] md:scale-100">
                <ScoreScreenMockup />
              </PhoneMockup>
              <p className="text-center text-zinc-500 text-sm mt-4 font-medium">See your rip-off score</p>
            </motion.div>

            {/* Phone 3 — Share */}
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}
              className="md:rotate-3"
            >
              <PhoneMockup className="scale-[0.85] md:scale-90">
                <div className="text-center">
                  <p className="text-red-500 text-xs font-black tracking-widest mb-3">RECEIPT RAGE</p>
                  <p className="text-zinc-500 text-[10px] tracking-widest mb-2">RIP-OFF SCORE</p>
                  <p className="text-red-500 text-5xl font-black">83</p>
                  <p className="text-red-500 text-sm font-bold mt-1 mb-3">Price Gouged</p>
                  <p className="text-zinc-500 text-xs mb-4">Woolworths — 16 Mar 2026</p>
                  <div className="text-left space-y-1 mb-4">
                    <p className="text-[10px] text-zinc-500 font-semibold">Top rip-offs:</p>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-400">Chicken Breast 500g</span>
                      <span className="text-red-400">$10.00 → $7.50</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-400">Bananas 1kg</span>
                      <span className="text-red-400">$5.90 → $3.50</span>
                    </div>
                  </div>
                  <p className="text-red-500 text-sm font-bold">You overpaid $9.42</p>
                  <p className="text-zinc-600 text-[9px] mt-4">Scanned with Receipt Rage</p>
                </div>
              </PhoneMockup>
              <p className="text-center text-zinc-500 text-sm mt-4 font-medium">Share the proof</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Receipt demo ─────────────────────────────── */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-zinc-500 text-xs font-bold tracking-[0.15em] uppercase mb-3"
            >
              Real comparison
            </motion.p>
            <motion.h2 variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="text-3xl md:text-4xl font-black tracking-tight mb-5"
            >
              See exactly where your local Woolies<br className="hidden md:block" /> is taking the piss.
            </motion.h2>
            <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
              className="text-zinc-400 text-base leading-relaxed mb-6 max-w-md"
            >
              Every item on your receipt gets compared against real prices from Coles, Aldi, and more.
              Red means you overpaid. It&apos;s that simple.
            </motion.p>
            <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}
              className="text-zinc-500 text-sm"
            >
              Prices sourced from publicly available supermarket data, updated regularly.
            </motion.p>
          </div>
          <ReceiptCard />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section id="download" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Flame className="w-10 h-10 text-red-500 mx-auto mb-6" />
          </motion.div>
          <motion.h2 variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
          >
            Stop getting ripped off at the checkout.
          </motion.h2>
          <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
            className="text-zinc-400 text-lg mb-8"
          >
            Free for all Aussie shoppers. No signup required.
          </motion.p>

          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3}>
            {!submitted ? (
              <div className="space-y-4">
                <a href="https://apps.apple.com/app/id6760627172" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full transition-colors text-lg pulse-cta"
                >
                  Download on the App Store <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-zinc-600 text-sm">or get notified when we launch on Android</p>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input type="email" required placeholder="your@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition-colors text-sm"
                  />
                  <button type="submit"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap"
                  >
                    Notify me
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                <p className="text-red-400 font-bold text-lg">{"You're on the list."}</p>
                <p className="text-zinc-400 text-sm mt-1">{"We'll let you know when Receipt Rage hits Android."}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-zinc-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="font-bold text-zinc-400">Receipt Rage</span>
            <span className="text-zinc-700">·</span>
            <span>Made in Australia</span>
          </div>
          <div className="flex items-center gap-6 text-zinc-500 text-sm">
            <a href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="mailto:support@receiptrageapp.com" className="hover:text-zinc-300 transition-colors">Support</a>
          </div>
          <p className="text-zinc-700 text-xs text-center md:text-right">
            Prices sourced from publicly available supermarket data.
          </p>
        </div>
      </footer>
    </div>
  );
}
