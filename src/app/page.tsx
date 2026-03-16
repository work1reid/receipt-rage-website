"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, ExternalLink } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: d, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  }),
};

const APP_STORE_URL = "https://apps.apple.com/app/id6760627172";

// ── Phone frame ──────────────────────────────────────────
function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${className}`}>
      <div className="bg-zinc-900 rounded-[2.2rem] border-[3px] border-zinc-700 p-2.5 shadow-2xl shadow-black/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-900 rounded-b-xl z-10" />
        <div className="bg-[#0a0a0a] rounded-[1.8rem] overflow-hidden w-[240px] h-[480px] flex flex-col items-center justify-center p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Score screen (inside phone) ──────────────────────────
function ScoreScreen() {
  return (
    <div className="text-center w-full">
      <p className="text-red-500 text-[10px] font-black tracking-[0.2em] mb-4">RECEIPT RAGE</p>
      <p className="text-zinc-600 text-[9px] font-semibold tracking-[0.15em] mb-2">RIP-OFF SCORE</p>
      <div className="w-20 h-20 rounded-full border-[3px] border-red-500 flex items-center justify-center mx-auto bg-zinc-900/50">
        <span className="text-red-500 text-3xl font-black">83</span>
      </div>
      <p className="text-red-500 text-xs font-bold mt-2">Price Gouged</p>
      <p className="text-zinc-500 text-[10px] mt-1">You overpaid $9.42</p>
      <div className="mt-4 space-y-1.5 text-left">
        <div className="flex justify-between text-[9px]">
          <span className="text-zinc-400">Chicken Breast 500g</span>
          <span className="text-red-400 font-semibold">save $2.50</span>
        </div>
        <div className="flex justify-between text-[9px]">
          <span className="text-zinc-400">Bananas 1kg</span>
          <span className="text-red-400 font-semibold">save $2.40</span>
        </div>
        <div className="flex justify-between text-[9px]">
          <span className="text-zinc-400">Milk 2L</span>
          <span className="text-red-400 font-semibold">save $0.61</span>
        </div>
      </div>
      <div className="mt-4 bg-[#1a1a1a] border border-[#22c55e]/30 rounded-lg p-2.5">
        <p className="text-white text-[10px] font-medium">{"Next time, shop at"} <span className="text-[#22c55e] font-bold">Aldi</span></p>
        <p className="text-[#22c55e] text-base font-black">{"You'd save $9.42"}</p>
      </div>
    </div>
  );
}

// ── Scan screen (inside phone) ───────────────────────────
function ScanScreenMock() {
  return (
    <div className="text-center w-full">
      <p className="text-red-500 text-[10px] font-black tracking-[0.2em] mb-6">RECEIPT RAGE</p>
      <p className="text-white text-base font-bold mb-1">Scan your receipt</p>
      <p className="text-zinc-500 text-[10px] mb-8">Find out if you got ripped off</p>
      <div className="space-y-2">
        <div className="bg-red-500 rounded-lg py-3"><p className="text-white text-xs font-bold">Take Photo</p></div>
        <div className="border border-red-500 rounded-lg py-3"><p className="text-red-500 text-xs font-bold">Upload</p></div>
      </div>
    </div>
  );
}

// ── Share card (inside phone) ────────────────────────────
function ShareCardMock() {
  return (
    <div className="text-center w-full">
      <p className="text-red-500 text-[10px] font-black tracking-[0.2em] mb-3">RECEIPT RAGE</p>
      <p className="text-zinc-600 text-[8px] tracking-[0.15em] mb-1">RIP-OFF SCORE</p>
      <p className="text-red-500 text-4xl font-black">83</p>
      <p className="text-red-500 text-[10px] font-bold mt-0.5 mb-2">Price Gouged</p>
      <p className="text-zinc-500 text-[9px] mb-3">Woolworths — 16 Mar 2026</p>
      <div className="text-left space-y-1 mb-3">
        <p className="text-[8px] text-zinc-600 font-semibold">Top rip-offs:</p>
        <div className="flex justify-between text-[9px]"><span className="text-zinc-400">Chicken Breast</span><span className="text-red-400">$10.00 → $7.50</span></div>
        <div className="flex justify-between text-[9px]"><span className="text-zinc-400">Bananas 1kg</span><span className="text-red-400">$5.90 → $3.50</span></div>
        <div className="flex justify-between text-[9px]"><span className="text-zinc-400">Milk 2L</span><span className="text-red-400">$3.50 → $2.89</span></div>
      </div>
      <p className="text-red-500 text-xs font-bold">You overpaid $9.42</p>
      <p className="text-zinc-700 text-[7px] mt-6">Scanned with Receipt Rage</p>
    </div>
  );
}

// ── Social proof share card (not in a phone) ─────────────
function SocialShareCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 max-w-[320px] mx-auto text-center"
    >
      <p className="text-red-500 text-sm font-black tracking-[0.15em] mb-5">RECEIPT RAGE</p>
      <p className="text-zinc-600 text-[10px] font-semibold tracking-[0.15em] mb-2">RIP-OFF SCORE</p>
      <p className="text-red-500 text-6xl font-black">83</p>
      <p className="text-red-500 text-base font-bold mt-1 mb-3">Price Gouged</p>
      <p className="text-zinc-500 text-xs mb-5">Woolworths — Forbes NSW</p>
      <div className="text-left space-y-2 mb-5">
        <p className="text-zinc-500 text-xs font-semibold">Top rip-offs:</p>
        <div className="flex justify-between text-sm"><span className="text-zinc-300">Chicken Breast 500g</span><span className="text-red-400 font-semibold">$10.00 → $7.50</span></div>
        <div className="flex justify-between text-sm"><span className="text-zinc-300">Bananas 1kg</span><span className="text-red-400 font-semibold">$5.90 → $3.50</span></div>
        <div className="flex justify-between text-sm"><span className="text-zinc-300">Milk 2L</span><span className="text-red-400 font-semibold">$3.50 → $2.89</span></div>
      </div>
      <p className="text-red-500 text-lg font-bold mb-6">You overpaid $9.42 total</p>
      <p className="text-zinc-700 text-xs">Scanned with Receipt Rage</p>
    </motion.div>
  );
}

// ── Download button ──────────────────────────────────────
function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full transition-colors text-lg min-h-[48px] ${className}`}
    >
      Download on the App Store <ExternalLink className="w-4 h-4" />
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-[family-name:var(--font-dm-sans)]">

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/40">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <span className="font-black text-base">Receipt Rage</span>
          </div>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors min-h-[40px] flex items-center"
          >
            Get the app
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
          <div>
            <motion.h1 variants={fade} initial="hidden" animate="visible" custom={0}
              className="text-[2.5rem] sm:text-[3.2rem] md:text-[4rem] font-black leading-[1.05] tracking-[-0.03em] mb-5"
            >
              Your supermarket is{" "}
              <span className="text-red-500">ripping you off.</span>
            </motion.h1>

            <motion.p variants={fade} initial="hidden" animate="visible" custom={0.1}
              className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed"
            >
              Scan your receipt. We compare every item across Woolworths, Coles and Aldi. See exactly how much you overpaid.
            </motion.p>

            <motion.div variants={fade} initial="hidden" animate="visible" custom={0.2}
              className="space-y-3"
            >
              <DownloadButton />
              <p className="text-zinc-600 text-sm">Free. No sign-up required.</p>
            </motion.div>
          </div>

          <motion.div variants={fade} initial="hidden" animate="visible" custom={0.25}
            className="flex justify-center lg:justify-end"
          >
            <Phone>
              <ScoreScreen />
            </Phone>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────── */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center text-zinc-500 text-sm font-semibold tracking-wide uppercase mb-8"
          >
            This is what people are sharing.
          </motion.p>
          <SocialShareCard />
          <motion.p variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2}
            className="text-center text-zinc-600 text-sm mt-6"
          >
            Same receipt. Same items. Wildly different prices.
          </motion.p>
        </div>
      </section>

      {/* ── RAGE STATS ───────────────────────────────── */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-red-500 text-5xl md:text-7xl font-black">$1,600</p>
            <p className="text-zinc-400 text-lg mt-2">What the average Aussie family overpays on groceries. Every year.</p>
          </motion.div>
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-red-500 text-5xl md:text-7xl font-black">22%</p>
            <p className="text-zinc-400 text-lg mt-2">The markup on everyday items compared to the cheapest option down the road.</p>
          </motion.div>
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-red-500 text-5xl md:text-7xl font-black">$3.5B</p>
            <p className="text-zinc-400 text-lg mt-2">Supermarket profits in 2025. While you cut back on groceries, they posted record numbers.</p>
          </motion.div>

          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <p className="text-zinc-300 text-base leading-relaxed">
              The ACCC is investigating supermarket pricing right now.{" "}
              <span className="text-white font-bold">We&apos;re giving you the receipts.</span>{" "}
              Literally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="py-20 px-5 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black tracking-tight text-center mb-14"
          >
            Takes 10 seconds.
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="text-center md:-rotate-2"
            >
              <Phone className="scale-[0.78] md:scale-[0.82]">
                <ScanScreenMock />
              </Phone>
              <p className="text-zinc-400 text-sm font-bold mt-3">Snap it</p>
            </motion.div>

            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}
              className="text-center md:z-10 md:scale-105"
            >
              <Phone className="scale-[0.78] md:scale-[0.9]">
                <ScoreScreen />
              </Phone>
              <p className="text-zinc-400 text-sm font-bold mt-3">Score it</p>
            </motion.div>

            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.24}
              className="text-center md:rotate-2"
            >
              <Phone className="scale-[0.78] md:scale-[0.82]">
                <ShareCardMock />
              </Phone>
              <p className="text-zinc-400 text-sm font-bold mt-3">Share it</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
          >
            Stop guessing.{" "}
            <span className="text-red-500">Start scanning.</span>
          </motion.h2>
          <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
            className="space-y-3 mt-8"
          >
            <DownloadButton />
            <p className="text-zinc-600 text-sm">Free. Takes 10 seconds.</p>
            <p className="text-zinc-700 text-xs mt-4">Android coming soon.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-zinc-800/50 py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="font-bold text-zinc-400">Receipt Rage</span>
            <span className="text-zinc-700">·</span>
            <span>Made in Australia</span>
          </div>
          <div className="flex items-center gap-5 text-zinc-500 text-sm">
            <a href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="mailto:support@receiptrageapp.com" className="hover:text-zinc-300 transition-colors">Support</a>
          </div>
          <p className="text-zinc-700 text-xs text-center md:text-right">
            Prices compared from publicly available supermarket data.
          </p>
        </div>
      </footer>
    </div>
  );
}
