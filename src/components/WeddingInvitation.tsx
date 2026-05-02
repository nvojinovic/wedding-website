import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  EASY-TO-EDIT CONFIG                                                */
/* ------------------------------------------------------------------ */

// Replace with the bride/groom's WhatsApp number in international format
// (no leading "+", no spaces). Example: "381641234567"
const whatsappNumber = "381XXXXXXXXX";

const confirmHref = `https://wa.me/${whatsappNumber}?text=Pozdrav%2C%20potvr%C4%91ujem%20dolazak%20na%20ven%C4%8Danje%20Ivane%20i%20Dimitrija.`;
const declineHref = `https://wa.me/${whatsappNumber}?text=Pozdrav%2C%20na%C5%BEalost%20ne%C4%87u%20mo%C4%87i%20da%20do%C4%91em%20na%20ven%C4%8Danje%20Ivane%20i%20Dimitrija.`;

// Google Maps placeholder links — replace with the real ones
const officersHomeMapUrl =
  "https://www.google.com/maps/search/?api=1&query=Oficirski+dom+Ni%C5%A1";
const fortressMapUrl =
  "https://www.google.com/maps/search/?api=1&query=Letnja+pozornica+Tvr%C4%91ava+Ni%C5%A1";

const proposalImage = "/couple-3.jpeg";

const galleryImages = [
  "/couple-1.jpeg",
  "/couple-2.jpeg",
  "/couple-4.jpeg",
];

/* ------------------------------------------------------------------ */
/*  DECORATIVE SVG (sage leaves)                                       */
/* ------------------------------------------------------------------ */

function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M60 10 C 60 60, 60 140, 60 195"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[30, 55, 80, 110, 140, 170].map((y, i) => (
        <g key={i}>
          <path
            d={`M60 ${y} C 30 ${y - 10}, 15 ${y - 5}, 8 ${y + 8} C 25 ${y + 6}, 45 ${y + 4}, 60 ${y + 4}`}
            fill="currentColor"
            opacity={0.85}
          />
          <path
            d={`M60 ${y + 8} C 90 ${y - 2}, 105 ${y + 3}, 112 ${y + 16} C 95 ${y + 14}, 75 ${y + 12}, 60 ${y + 12}`}
            fill="currentColor"
            opacity={0.7}
          />
        </g>
      ))}
    </svg>
  );
}

function MonogramSeal() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600 shadow-soft ring-2 ring-cream/60">
      <span className="font-serif-display text-2xl italic text-cream">
        I&nbsp;&amp;&nbsp;D
      </span>
      <span className="absolute inset-0 rounded-full ring-1 ring-gold/40" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
      {/* Decorative background leaves with slow drift */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -left-10 top-10 z-0"
      >
        <LeafSprig className="h-72 w-40 text-sage-300/40 md:h-96 md:w-56" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [180, 178, 180] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -right-10 bottom-10 z-0"
      >
        <LeafSprig className="h-72 w-40 text-sage-300/40 md:h-96 md:w-56" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <EnvelopeIntro key="envelope" onOpen={() => setIsOpened(true)} />
        ) : (
          <Invitation key="invitation" />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  ENVELOPE INTRO                                                     */
/* ------------------------------------------------------------------ */

function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  function handleClick() {
    if (opening) return;
    setOpening(true);
    // Wait for the flap + letter animation to finish before swapping screens
    window.setTimeout(onOpen, 1700);
  }

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative flex min-h-screen items-center justify-center px-6 py-12"
    >
      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-2 text-xs uppercase tracking-[0.4em] text-sage-600/80"
        >
          Pozivnica
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif-display mb-10 text-2xl italic text-sage-700 sm:text-3xl"
        >
          Ivana &amp; Dimitrije
        </motion.h2>

        {/* Envelope */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="Otvori pozivnicu"
          className="envelope-perspective group relative cursor-pointer focus:outline-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: opening ? 1 : 1.02 }}
            style={{ width: "min(22rem, calc(100vw - 3rem))", aspectRatio: "22/15" }}
            className="relative"
          >
            {/* Envelope body */}
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-ivory to-beige shadow-envelope ring-1 ring-sage-200/60" />

            {/* Inner letter */}
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={
                opening
                  ? { y: -90, opacity: 1, transition: { delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
                  : { y: 0 }
              }
              className="absolute inset-x-6 top-6 bottom-10 z-10 flex flex-col items-center justify-center rounded-sm bg-cream paper-texture px-6 text-center shadow-md ring-1 ring-sage-200/50"
            >
              <div className="mb-3 h-px w-16 gold-divider" />
              <p className="font-serif-display text-lg italic text-sage-700 sm:text-xl">
                Ivana &amp; Dimitrije
              </p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.35em] text-sage-600/80">
                31 · maj
              </p>
              <div className="mt-3 h-px w-16 gold-divider" />
            </motion.div>

            {/* Bottom triangular fold (front of envelope) */}
            <div
              className="absolute inset-x-0 bottom-0 z-20 h-1/2"
              style={{
                clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
                background:
                  "linear-gradient(180deg, #efe6d6 0%, #e3d6c0 100%)",
              }}
            />
            {/* Side folds */}
            <div
              className="absolute inset-y-0 left-0 z-10 w-1/2"
              style={{
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                background:
                  "linear-gradient(90deg, #f1e8d8 0%, #e8dcc6 100%)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 z-10 w-1/2"
              style={{
                clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                background:
                  "linear-gradient(270deg, #f1e8d8 0%, #e8dcc6 100%)",
              }}
            />

            {/* Top flap (animated open) */}
            <motion.div
              className="flap absolute inset-x-0 top-0 z-30 h-1/2 origin-top"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(180deg, #efe6d6 0%, #d9c9ac 100%)",
                boxShadow: "0 6px 20px -8px rgba(86,110,67,0.35)",
              }}
              initial={{ rotateX: 0 }}
              animate={
                opening
                  ? { rotateX: -180, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }
                  : { rotateX: 0 }
              }
            />

            {/* Wax seal */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                opening
                  ? { scale: 0.4, opacity: 0, transition: { duration: 0.4 } }
                  : { scale: 1, opacity: 1 }
              }
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sage-500 to-sage-700 shadow-lg ring-2 ring-sage-300/60">
                <span className="font-serif-display text-xl italic text-cream">
                  I&amp;D
                </span>
                <span className="absolute inset-1 rounded-full ring-1 ring-gold/50" />
              </div>
            </motion.div>
          </motion.div>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: opening ? 0 : 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <button
            onClick={handleClick}
            className="font-serif-display text-base italic text-sage-700 hover:text-sage-900"
          >
            Kliknite da otvorite
          </button>
          <ChevronDown className="h-4 w-4 animate-floatY text-sage-500" />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  INVITATION (revealed content)                                      */
/* ------------------------------------------------------------------ */

function Invitation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      className="relative"
    >
      <Hero />
      <Letter />
      <Schedule />
      <Locations />
      <Gallery />
      <Rsvp />
      <Footer />
      <StickyRsvpBar />
    </motion.div>
  );
}

/* Sticky bottom bar — mobile only, quick RSVP for WhatsApp visitors */
function StickyRsvpBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mx-4 mb-3 overflow-hidden rounded-2xl border border-sage-200/60 bg-cream/95 shadow-envelope backdrop-blur-md">
            <p className="border-b border-sage-100 px-4 py-2 text-center text-[0.65rem] uppercase tracking-[0.3em] text-sage-600/80">
              Potvrdi dolazak
            </p>
            <div className="flex">
              <a
                href={confirmHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 py-4 text-sm font-medium text-sage-700 transition active:bg-sage-50"
              >
                <Check className="h-4 w-4 text-sage-600" />
                Dolazim
              </a>
              <span className="w-px bg-sage-100" />
              <a
                href={declineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 py-4 text-sm text-sage-500 transition active:bg-sage-50"
              >
                <X className="h-4 w-4" />
                Ne dolazim
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------- Hero ------- */

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-12 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-3xl"
      >
        <p className="text-xs uppercase tracking-[0.45em] text-sage-600/80">
          Sa ljubavlju vas pozivamo
        </p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="my-6 flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Heart className="h-4 w-4 text-gold" fill="currentColor" />
          </motion.span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        <h1 className="font-serif-display text-[3.5rem] leading-[1.05] text-sage-800 text-shadow-soft sm:text-6xl md:text-7xl lg:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block italic"
          >
            Ivana
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="my-2 block text-3xl italic text-gold sm:text-4xl"
          >
            &amp;
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block italic"
          >
            Dimitrije
          </motion.span>
        </h1>

        <div className="mt-10 flex items-center justify-center gap-3 text-sage-700">
          <span className="h-px w-10 bg-sage-400" />
          <span className="font-serif-display text-xl italic sm:text-2xl">
            31. maj
          </span>
          <span className="h-px w-10 bg-sage-400" />
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-10 flex justify-center sm:mt-16"
        >
          <ChevronDown className="h-5 w-5 text-sage-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------- Letter (the invitation text) ------- */

function Letter() {
  const text = `Sa velikom radošću vas pozivamo da budete deo našeg posebnog dana i da zajedno sa nama proslavite početak našeg zajedničkog života.

Vaše prisustvo će nam ulepšati ovaj dan i učiniti ga još posebnijim.`;

  return (
    <section className="relative px-4 py-10 sm:px-6 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-2xl rounded-2xl bg-cream/80 paper-texture p-6 shadow-soft ring-1 ring-sage-200/60 backdrop-blur-sm sm:p-12"
      >
        {/* corner leaves */}
        <LeafSprig className="pointer-events-none absolute -left-6 -top-6 h-24 w-16 -rotate-12 text-sage-400/50" />
        <LeafSprig className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-16 rotate-180 text-sage-400/50" />

        <p className="text-center font-serif-display text-2xl italic text-sage-700 sm:text-3xl">
          Dragi naši,
        </p>

        <div className="mx-auto my-6 h-px w-24 gold-divider" />

        {text.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="mb-5 text-center text-base leading-relaxed text-sage-800 sm:text-lg"
          >
            {para}
          </p>
        ))}

        <div className="mx-auto my-6 h-px w-24 gold-divider" />

        <p className="text-center font-serif-display text-2xl italic text-sage-700 sm:text-3xl">
          Ivana &amp; Dimitrije
        </p>
      </motion.div>
    </section>
  );
}

/* ------- Schedule ------- */

const scheduleItems = [
  {
    time: "12:30",
    title: "Opštinsko venčanje",
    place: "Oficirski dom",
    icon: Calendar,
  },
  {
    time: "14:00",
    title: "Svečani ručak",
    place: "Letnja pozornica, Tvrđava",
    icon: Heart,
  },
];

function Schedule() {
  return (
    <section className="relative px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow="Raspored" title="Tok dana" subtitle="31. maj" />

        <ol className="relative mt-10 space-y-5">
          {/* vertical line */}
          <span className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sage-300 via-sage-400/60 to-sage-300" />

          {scheduleItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start gap-5 pl-14"
              >
                {/* dot */}
                <div className="absolute left-6 top-4 -translate-x-1/2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600 text-cream shadow-soft ring-4 ring-cream">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                </div>

                {/* card */}
                <div className="flex-1 rounded-2xl bg-cream/90 paper-texture p-5 shadow-soft ring-1 ring-sage-200/60">
                  <div className="mb-1 flex items-center gap-2 text-sage-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs uppercase tracking-[0.3em]">{item.time}</span>
                  </div>
                  <h3 className="font-serif-display text-2xl italic text-sage-800">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-sage-600">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gold" />
                    {item.place}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------- Locations ------- */

const locations = [
  {
    title: "Oficirski dom",
    desc: "Opštinsko venčanje",
    time: "12:30",
    img: "/oficirski-dom.jpg",
    map: officersHomeMapUrl,
  },
  {
    title: "Letnja pozornica, Tvrđava",
    desc: "Svečani ručak",
    time: "14:00",
    img: "/fortress.jpg",
    map: fortressMapUrl,
  },
];

function Locations() {
  return (
    <section className="relative px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Mesta proslave"
          title="Lokacije"
          subtitle="Radujemo se vašem dolasku"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {locations.map((loc, idx) => (
            <motion.article
              key={loc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-cream shadow-soft ring-1 ring-sage-200/60"
            >
              <div
                className="relative h-56 overflow-hidden bg-sage-100"
                style={{ backgroundImage: `url(${loc.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <img
                  src={loc.img}
                  alt={loc.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sage-700 backdrop-blur">
                  {loc.time}
                </span>
              </div>
              <div className="p-6 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-sage-600/80">
                  {loc.desc}
                </p>
                <h3 className="mt-2 font-serif-display text-2xl italic text-sage-800 sm:text-3xl">
                  {loc.title}
                </h3>
                <a
                  href={loc.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-sage-400/60 bg-cream py-3.5 text-sm text-sage-700 transition active:bg-sage-50 sm:inline-flex sm:w-auto sm:px-5 sm:py-2.5"
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  Otvori mapu
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------- Gallery ------- */

function Gallery() {
  return (
    <section className="relative px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Sećanja" title="Naša priča" />

        {/* Featured proposal — portrait with slow ken-burns zoom + gold frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 mx-auto max-w-sm"
        >
          {/* Eyebrow above the photo */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gold/50" />
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-sage-600">
              Pariz · Tu je sve počelo
            </p>
            <div className="h-px w-8 bg-gold/50" />
          </div>

          <div className="group relative">
            {/* Soft glow halo */}
            <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/25 via-transparent to-sage-300/30 opacity-70 blur-xl" />

            {/* Decorative corner leaves */}
            <LeafSprig className="pointer-events-none absolute -left-6 -top-6 z-20 h-16 w-10 -rotate-12 text-sage-500/70" />
            <LeafSprig className="pointer-events-none absolute -right-6 -bottom-6 z-20 h-16 w-10 rotate-[200deg] text-sage-500/70" />

            <div className="relative overflow-hidden rounded-3xl shadow-envelope ring-1 ring-gold/30">
              {/* Ken-burns slow zoom */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="aspect-[9/16] origin-center"
                style={{
                  backgroundImage: `url(${proposalImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              >
                <img
                  src={proposalImage}
                  alt="Prsten"
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>

              {/* Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sage-900/75 via-sage-900/15 to-transparent" />

              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-x-0 bottom-0 p-7 text-center"
              >
                <div className="mx-auto mb-3 h-px w-10 bg-gold/70" />
                <p className="font-serif-display text-3xl italic text-cream sm:text-4xl">
                  Rekla je da
                </p>
                <div className="mx-auto mt-3 h-px w-10 bg-gold/70" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative ornament divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="my-14 flex items-center justify-center gap-4"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60 sm:w-32" />
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Heart className="h-4 w-4 text-gold" fill="currentColor" />
          </motion.span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60 sm:w-32" />
        </motion.div>

        {/* Grid — equal square tiles, centered, with hover lift */}
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
          {galleryImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl bg-sage-100 shadow-soft ring-1 ring-sage-200/60 transition-shadow duration-500 hover:shadow-envelope"
            >
              <div
                className="aspect-square"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sage-900/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------- RSVP ------- */

function Rsvp() {
  return (
    <section className="relative px-4 pb-32 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-sage-50 via-cream to-sage-100 p-6 text-center shadow-soft ring-1 ring-sage-200/70 sm:p-12"
      >
        <LeafSprig className="pointer-events-none absolute -right-8 -top-8 h-32 w-20 rotate-12 text-sage-400/40" />
        <LeafSprig className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-20 -rotate-12 text-sage-400/40" />

        <div className="mb-6 flex justify-center">
          <MonogramSeal />
        </div>

        <p className="text-xs uppercase tracking-[0.4em] text-sage-600/80">
          Potvrda dolaska
        </p>
        <h2 className="mt-3 font-serif-display text-4xl italic text-sage-800 sm:text-5xl">
          RSVP
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sage-700 sm:text-lg">
          Molimo vas potvrdite dolazak do{" "}
          <span className="whitespace-nowrap font-medium text-sage-900">
            15. maja
          </span>
          .
        </p>

        <div className="mx-auto my-8 h-px w-24 gold-divider" />

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <a
            href={confirmHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-sage-500 to-sage-700 px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-soft transition active:from-sage-600 active:to-sage-800 sm:py-3.5"
          >
            <Check className="h-4 w-4" />
            Potvrđujem dolazak
          </a>
          <a
            href={declineHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-sage-400/70 bg-cream px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-sage-700 shadow-soft transition active:bg-sage-50 sm:py-3.5"
          >
            <X className="h-4 w-4" />
            Ne dolazim
          </a>
        </div>

        <p className="mt-8 text-xs text-sage-600/80">
          Klikom se otvara WhatsApp sa unapred pripremljenom porukom.
        </p>
      </motion.div>
    </section>
  );
}

/* ------- Footer ------- */

function Footer() {
  return (
    <footer className="px-6 pb-16 pt-4 text-center">
      <div className="mx-auto mb-5 h-px w-32 gold-divider" />
      <p className="font-serif-display text-2xl italic text-sage-700">
        Ivana &amp; Dimitrije
      </p>
      <p className="mt-2 text-[0.7rem] uppercase tracking-[0.35em] text-sage-600/80">
        31. maj • Oficirski dom • Letnja pozornica
      </p>
    </footer>
  );
}

/* ------- Helpers ------- */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-sage-600/80">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif-display text-4xl italic text-sage-800 sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-sage-600">{subtitle}</p>
      )}
      <div className="mx-auto mt-5 h-px w-24 gold-divider" />
    </motion.div>
  );
}
