"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Camera,
  Receipt,
  TrendingUp,
  Share2,
  ShieldAlert,
  Zap,
  ChevronDown,
  ArrowRight,
  Flame,
} from "lucide-react";

// ── Animation helpers ────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Fake receipt data for demo ──────────────────────────
const receiptItems = [
  { name: "Woolworths Milk 2L", paid: 3.50, fair: 2.89, status: "rip-off" },
  { name: "White Bread Loaf", paid: 3.80, fair: 3.20, status: "overpriced" },
  { name: "Bananas 1kg", paid: 5.90, fair: 3.50, status: "rip-off" },
  { name: "Tim Tams Original", paid: 4.50, fair: 4.50, status: "fair" },
  { name: "Chicken Breast 500g", paid: 10.00, fair: 7.50, status: "rip-off" },
  { name: "Cheddar Cheese 500g", paid: 7.00, fair: 6.80, status: "fair" },
];

function ReceiptDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-sm"
    >
      {/* Receipt card */}
      <div className="bg-[#faf9f6] rounded-t-lg p-6 text-zinc-900 font-mono text-sm receipt-bg">
        <div className="text-center mb-4 border-b border-dashed border-zinc-300 pb-4">
          <p className="text-[10px] tracking-widest uppercase text-zinc-400">Receipt Rage Report</p>
          <p className="text-lg font-bold mt-1 text-zinc-800">WOOLWORTHS</p>
          <p className="text-[10px] text-zinc-400">16/03/2026 • Forbes NSW</p>
        </div>

        <div className="space-y-2">
          {receiptItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center justify-between gap-2"
            >
              <span className="truncate flex-1 text-zinc-700">{item.name}</span>
              <span className="text-zinc-400 line-through text-xs">${item.fair.toFixed(2)}</span>
              <span className={`font-bold ${item.status === "rip-off" ? "text-red-600" : item.status === "overpriced" ? "text-orange-500" : "text-green-600"}`}>
                ${item.paid.toFixed(2)}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-dashed border-zinc-300">
          <div className="flex justify-between font-bold text-base">
            <span>You paid</span>
            <span>$34.70</span>
          </div>
          <div className="flex justify-between text-green-700 text-sm">
            <span>Fair price</span>
            <span>$28.39</span>
          </div>
          <div className="flex justify-between text-red-600 font-bold text-sm mt-1">
            <span>Overpaid</span>
            <span>+$6.31</span>
          </div>
        </div>
      </div>

      {/* Rip-off stamp */}
      {inView && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-stamp pointer-events-none"
        >
          <div className="border-4 border-red-600 rounded-lg px-6 py-3 rotate-[-12deg] opacity-80">
            <p className="text-red-600 font-black text-3xl tracking-widest uppercase">RIP-OFF</p>
            <p className="text-red-500 text-xs text-center font-bold">SCORE: 72/100</p>
          </div>
        </motion.div>
      )}

      {/* Torn bottom edge */}
      <div className="h-5 bg-[#faf9f6] receipt-tear" />
    </motion.div>
  );
}

// ── Step card ────────────────────────────────────────────
function StepCard({ icon: Icon, step, title, desc, delay }: {
  icon: React.ElementType;
  step: number;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={delay}>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 hover:border-red-500/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-zinc-500">Step {step}</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Stat card ────────────────────────────────────────────
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={delay}
      className="text-center"
    >
      <p className="text-4xl md:text-5xl font-black text-gradient-rage">{value}</p>
      <p className="text-sm text-zinc-400 mt-2">{label}</p>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────────────
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Nav ────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-500" />
            <span className="font-black text-lg tracking-tight">Receipt Rage</span>
          </div>
          <a
            href="#waitlist"
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-red-400 uppercase tracking-widest mb-8">
                <ShieldAlert className="w-3.5 h-3.5" />
                Australian Grocery Price Detector
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={0.1}
              className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6"
            >
              Are you getting{" "}
              <span className="text-gradient-rage">ripped off</span>
              ?
            </motion.h1>

            <motion.p variants={fadeUp} custom={0.2}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Snap your grocery receipt. We&apos;ll scan every item, compare it against real supermarket prices, and give you a{" "}
              <span className="text-white font-semibold">rip-off score</span> you can share.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#waitlist" className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors pulse-glow flex items-center gap-2">
                Get Early Access <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white font-medium flex items-center gap-1 transition-colors">
                See how it works <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Receipt Demo ──────────────────────────────── */}
      <section className="py-16 px-6">
        <ReceiptDemo />
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-zinc-800/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value="$1,600" label="Avg. Aussie family overpays per year" delay={0} />
          <StatCard value="22%" label="Price markup on everyday items" delay={0.1} />
          <StatCard value="$3.5B" label="Supermarket profits (2025)" delay={0.2} />
          <StatCard value="1 snap" label="All it takes to find out" delay={0.3} />
        </div>
      </section>

      {/* ── How it Works ───────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-red-400 mb-3 block">How it works</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Three steps to the truth
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              icon={Camera}
              step={1}
              title="Snap your receipt"
              desc="Take a photo of any Woolworths or Coles receipt. Our AI reads every item instantly."
              delay={0}
            />
            <StepCard
              icon={TrendingUp}
              step={2}
              title="Get your rip-off score"
              desc="We compare every item against real prices from competing stores. See exactly where you're overpaying."
              delay={0.15}
            />
            <StepCard
              icon={Share2}
              step={3}
              title="Share the rage"
              desc="Get a shareable scorecard. Post it. Tag the supermarket. Let everyone see the markup."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── Why it Matters ─────────────────────────────── */}
      <section className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-3 block">Why it matters</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              They profit. You pay.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
            >
              <Receipt className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">ACCC Investigation</h3>
              <p className="text-zinc-400 leading-relaxed">
                The ACCC is actively investigating supermarket pricing practices. Australians are paying more than they should — and the data proves it.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
            >
              <Zap className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Price Transparency</h3>
              <p className="text-zinc-400 leading-relaxed">
                Supermarkets make it hard to compare. Receipt Rage makes it impossible to ignore. Real prices, real comparisons, no spin.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Waitlist CTA ───────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} custom={0}>
              <Flame className="w-12 h-12 text-red-500 mx-auto mb-6" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={0.1}
              className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            >
              Join the rage
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.2}
              className="text-lg text-zinc-400 mb-10"
            >
              Be first to know when Receipt Rage launches. Free for all Australians.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.3}>
              {!submitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full transition-colors whitespace-nowrap"
                  >
                    Notify me
                  </button>
                </form>
              ) : (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                  <p className="text-red-400 font-bold text-lg">You&apos;re in.</p>
                  <p className="text-zinc-400 text-sm mt-1">We&apos;ll email you when Receipt Rage is ready to expose the markups.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-zinc-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Flame className="w-4 h-4 text-red-500" />
            <span>Receipt Rage</span>
            <span className="text-zinc-700">|</span>
            <span>Made in Australia</span>
          </div>
          <p className="text-zinc-600 text-xs">
            Prices sourced from publicly available supermarket data.
          </p>
        </div>
      </footer>
    </div>
  );
}
