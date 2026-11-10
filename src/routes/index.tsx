import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight, MapPin, Pause, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import tile from "@/assets/floral-tile.webp.asset.json";
import flower from "@/assets/flower.webp.asset.json";
import frame from "@/assets/hero-frame.webp.asset.json";
import bell from "@/assets/bell.webp.asset.json";
import bird from "@/assets/bird.webp.asset.json";
import ring from "@/assets/ring.webp.asset.json";
import music from "@/assets/wedding_music.mp3.asset.json";
import gTable from "@/assets/gallery_table.jpg";
import gBouquet from "@/assets/gallery_bouquet.jpg";
import gKosha from "@/assets/gallery_kosha.jpg";
import gCoffee from "@/assets/gallery_coffee.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdullah & Reem — Wedding Invitation" },
      { name: "description", content: "Join us on Tuesday, 23 February 2027 at the Four Seasons Kingdom Centre, Riyadh." },
      { property: "og:title", content: "Abdullah & Reem — Wedding Invitation" },
      { property: "og:description", content: "Save the date: 23 February 2027, Riyadh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WEDDING = new Date("2027-02-23T18:00:00+03:00");
const VENUE = "Four Seasons Kingdom Centre, Riyadh, Saudi Arabia";

/* ---------- helpers ---------- */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "is-shown" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function CreamCard({ children, flowers = true }: { children: ReactNode; flowers?: boolean }) {
  return (
    <div className="relative mx-auto w-[min(92vw,560px)] overflow-hidden rounded-md bg-card px-8 py-10 text-center shadow-luxe sm:px-16 sm:py-14">
      <div className="pointer-events-none absolute inset-2 rounded-sm border border-gold/50" />
      <div className="pointer-events-none absolute inset-3.5 rounded-sm border border-gold/25" />
      {flowers && (
        <>
          <img src={flower.url} alt="" className="sway pointer-events-none absolute -left-[18%] top-1/2 w-[28%] -translate-y-1/2 sm:-left-[13%] sm:w-[30%]" />
          <img src={flower.url} alt="" className="sway-r pointer-events-none absolute -right-[18%] top-1/2 w-[28%] -translate-y-1/2 sm:-right-[13%] sm:w-[30%]" />
        </>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

const Divider = () => <div className="mx-auto my-6 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />;
const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-gold-text sm:text-xs sm:tracking-[0.4em]">{children}</p>
);

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="flex justify-center px-4">
      <div className="plaque relative w-[min(92vw,430px)] overflow-hidden rounded-md px-6 py-6 text-center sm:px-10 sm:py-7">
        <div className="pointer-events-none absolute inset-2 rounded-sm border border-gold/45" />
        <div className="relative">
          <Label>{kicker}</Label>
          <p className="mt-2 font-script text-4xl leading-none text-rose sm:text-5xl">{title}</p>
          {sub && <p className="mt-3 font-serif text-[10px] uppercase tracking-[0.28em] text-gold-text sm:text-xs">{sub}</p>}
        </div>
      </div>
    </Reveal>
  );
}

function DateBlock({ time }: { time: string }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-3 font-serif text-gold-text sm:gap-4">
      <div className="text-right text-[10px] uppercase leading-5 tracking-[0.2em] sm:text-xs sm:leading-5 sm:tracking-[0.25em]">
        <div>At {time}</div>
        <div>Tuesday</div>
      </div>
      <div className="border-x border-gold/50 px-3 font-script text-5xl leading-none text-rose sm:px-4 sm:text-6xl">23</div>
      <div className="text-left text-[10px] uppercase leading-5 tracking-[0.2em] sm:text-xs sm:leading-5 sm:tracking-[0.25em]">
        <div>February</div>
        <div>2027</div>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => {
        const a = Math.random() * Math.PI * 2;
        const d = 160 + Math.random() * 420;
        return { i, x: Math.cos(a) * d, y: Math.sin(a) * d - 120, r: Math.random() * 720 - 360, dl: Math.random() * 0.25, c: ["var(--gold)", "var(--blush)", "var(--gold-soft)", "var(--rose)"][i % 4], w: 6 + Math.random() * 8, round: i % 3 === 0 };
      }),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {pieces.map((p) => (
        <span key={p.i} className="confetti-piece absolute" style={{ width: p.w, height: p.round ? p.w : p.w * 1.8, borderRadius: p.round ? "50%" : 2, background: p.c, animationDelay: `${p.dl}s`, "--x": `${p.x}px`, "--y": `${p.y}px`, "--r": `${p.r}deg` } as React.CSSProperties} />
      ))}
    </div>
  );
}

/* ---------- sections ---------- */
function Hero() {
  return (
    <section className="hero-in relative flex min-h-[100svh] items-center justify-center px-4 py-10">
      <div className="relative w-[min(90vw,440px)]">
        <img src={frame.url} alt="" className="w-full drop-shadow-2xl" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-10">
          <p className="rise foil-text font-script text-4xl leading-none sm:text-6xl" style={{ animationDelay: "0.3s" }}>Save The Date</p>
          <div className="rise mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent sm:mt-6 sm:w-28" style={{ animationDelay: "0.6s" }} />
          <h2 className="rise mt-6 font-script text-5xl leading-none text-rose sm:mt-8 sm:text-8xl" style={{ animationDelay: "0.9s" }}>Abdullah</h2>
          <span className="rise my-2 font-script text-3xl text-gold-text sm:my-3 sm:text-5xl" style={{ animationDelay: "1.2s" }}>&</span>
          <h2 className="rise font-script text-5xl leading-none text-rose sm:text-8xl" style={{ animationDelay: "1.5s" }}>Reem</h2>
        </div>
      </div>
    </section>
  );
}

function Ceremony() {
  return (
    <section className="px-4 py-14 sm:py-16">
      <Reveal>
        <CreamCard>
          <Label>Ceremony Info</Label>
          <div className="mt-6 grid grid-cols-2 gap-3 font-serif text-xs text-muted-foreground sm:mt-8 sm:gap-4 sm:text-sm">
            <div><p className="text-gold-text">Mr. &amp; Mrs.</p><p>Abdullah Al Qahtani</p><p>Reem Al Qahtani</p></div>
            <div><p className="text-gold-text">Mr. &amp; Mrs.</p><p>Abdullah Al Harbi</p><p>Reem Al Harbi</p></div>
          </div>
          <p className="mt-6 font-script text-2xl leading-snug text-gold-text sm:mt-8 sm:text-3xl">With hearts full of happiness<br />we announce our wedding</p>
          <h3 className="mt-5 font-script text-3xl leading-none text-rose sm:mt-6 sm:text-5xl">Abdullah Al Qahtani</h3>
          <p className="font-script text-2xl text-gold-text sm:text-3xl">&</p>
          <h3 className="font-script text-3xl leading-none text-rose sm:text-5xl">Reem Al Harbi</h3>
          <Divider />
          <Label>Katb Al-Kitab</Label>
          <p className="mt-2 font-script text-2xl text-rose sm:text-3xl">Al Faisaliah Ballroom</p>
          <DateBlock time="18:00" />
          <Divider />
          <Label>Walima</Label>
          <p className="mt-2 font-script text-2xl text-rose sm:text-3xl">Four Seasons Kingdom Centre</p>
          <DateBlock time="19:30" />
        </CreamCard>
      </Reveal>
    </section>
  );
}

const PHOTOS = [
  { src: gKosha, cap: "The Kosha" },
  { src: gBouquet, cap: "Her Bouquet" },
  { src: gTable, cap: "The Reception Table" },
  { src: gCoffee, cap: "Dates & Arabic Coffee" },
];

function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = PHOTOS.length;

  const cards = () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-photo]") ?? []);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    const c = cards()[Math.max(0, Math.min(n - 1, i))];
    if (!el || !c) return;
    el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  };

  const step = (d: number) => {
    setPaused(true);
    scrollToIndex(idxRef.current + d);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bd = Infinity;
    cards().forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (d < bd) { bd = d; best = i; }
    });
    idxRef.current = best;
    setIdx(best);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => scrollToIndex(idxRef.current + 1 >= n ? 0 : idxRef.current + 1), 4500);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section className="py-14 sm:py-16">
      <SectionTitle kicker="Gallery" title="Our Moments" sub="A little glimpse of the day ahead" />
      <div className="relative mt-8">
        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={() => setPaused(true)}
          onWheel={() => setPaused(true)}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-2 sm:gap-6"
          style={{
            paddingInline: "max(14vw, calc((100vw - 320px) / 2))",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 11%, #000 89%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, #000 11%, #000 89%, transparent 100%)",
          }}
        >
          {PHOTOS.map((p, i) => (
            <figure
              key={p.cap}
              data-photo
              className={`shrink-0 snap-center transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${idx === i ? "scale-100 opacity-100" : "scale-[0.9] opacity-60"}`}
              style={{ width: "min(72vw, 320px)" }}
            >
              <div className="relative overflow-hidden rounded-md border-[6px] border-card bg-card shadow-luxe">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img src={p.src} alt={p.cap} loading="lazy" className="h-full w-full object-cover transition-transform duration-[2500ms] hover:scale-110" />
                </div>
                <figcaption className="px-2 pb-3 pt-2 text-center">
                  <div className="mx-auto mb-1.5 h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <p className="font-script text-2xl leading-none text-rose sm:text-3xl">{p.cap}</p>
                </figcaption>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30" />
              </div>
            </figure>
          ))}
        </div>

        <button onClick={() => step(-1)} aria-label="Previous photo" className="btn-gold absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-primary-foreground sm:left-4 sm:h-12 sm:w-12">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => step(1)} aria-label="Next photo" className="btn-gold absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-primary-foreground sm:right-4 sm:h-12 sm:w-12">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {PHOTOS.map((p, i) => (
          <button key={p.cap} onClick={() => { setPaused(true); scrollToIndex(i); }} aria-label={`Show ${p.cap}`} className={`h-2 rounded-full transition-all duration-500 ${idx === i ? "w-8 btn-gold" : "w-2 bg-gold/30 hover:bg-gold/60"}`} />
        ))}
      </div>
    </section>
  );
}

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));
  return { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
}

function MiniCalendar() {
  // February 2027 starts on a Monday
  const cells = [null, ...Array.from({ length: 28 }, (_, i) => i + 1)];
  return (
    <div className="plaque relative mx-auto mt-6 w-[min(100%,320px)] overflow-hidden rounded-md px-4 py-5 sm:px-6">
      <div className="pointer-events-none absolute inset-1.5 rounded-sm border border-gold/40" />
      <div className="relative">
        <p className="mb-2 font-script text-3xl leading-none text-rose">February 2027</p>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="py-1 text-center font-serif text-[10px] uppercase tracking-widest text-gold-text">{d}</div>)}
          {cells.map((d, i) => (
            <div key={i} className={`flex aspect-square items-center justify-center rounded-full font-serif text-sm ${d === 23 ? "heart-day btn-gold text-primary-foreground" : "text-muted-foreground"}`}>{d ?? ""}</div>
          ))}
        </div>
        <p className="mt-3 text-center font-serif text-[10px] uppercase tracking-[0.25em] text-gold-text">Mark the day</p>
      </div>
    </div>
  );
}

function downloadIcs() {
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AbdullahReem//Wedding//EN", "BEGIN:VEVENT", "UID:abdullah-reem-20270223@wedding", "DTSTAMP:20261109T000000Z", "DTSTART:20270223T150000Z", "DTEND:20270223T203000Z", "SUMMARY:Wedding of Abdullah & Reem", `LOCATION:${VENUE}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "abdullah-reem-wedding.ics";
  a.click();
}

function Reception() {
  const c = useCountdown();
  const units = [["Days", c.d], ["Hours", c.h], ["Min", c.m], ["Sec", c.s]] as const;
  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Wedding of Abdullah & Reem")}&dates=20270223T150000Z/20270223T203000Z&location=${encodeURIComponent(VENUE)}`;
  return (
    <section className="px-4 py-14 sm:py-16">
      <Reveal>
        <CreamCard>
          <Label>Reception Info</Label>
          <p className="mt-4 font-script text-2xl text-rose sm:text-3xl">The reception will take place at:</p>
          <DateBlock time="18:00" />
          <div className="mt-6 flex justify-center gap-6 font-serif text-sm text-muted-foreground sm:gap-10">
            <div><p className="font-script text-xl text-rose sm:text-2xl">Welcome</p>17:00</div>
            <div><p className="font-script text-xl text-rose sm:text-2xl">Reception</p>19:30</div>
          </div>
          <Divider />
          <p className="foil-text font-script text-3xl leading-none sm:text-4xl">Countdown</p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {units.map(([l, v]) => (
              <div key={l} className="rounded-md border border-gold/40 bg-background/60 py-2 sm:py-3">
                <div className="font-serif text-xl tabular-nums text-rose sm:text-3xl">{String(v).padStart(2, "0")}</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-gold-text sm:text-[10px] sm:tracking-[0.25em]">{l}</div>
              </div>
            ))}
          </div>
          <MiniCalendar />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={gcal} target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-serif text-[10px] uppercase tracking-[0.2em] text-primary-foreground sm:text-xs sm:tracking-[0.25em]"><CalendarPlus className="h-4 w-4" />Add to Calendar</a>
            <button onClick={downloadIcs} className="rounded-full border border-gold px-5 py-2.5 font-serif text-[10px] uppercase tracking-[0.2em] text-gold-text transition-colors hover:bg-gold/10 sm:text-xs sm:tracking-[0.25em]">Apple / Outlook</button>
          </div>
          <Divider />
          <Label>Wedding Reception Venue</Label>
          <p className="mt-3 font-script text-3xl leading-none text-rose sm:text-4xl">Four Seasons Kingdom Centre</p>
          <p className="mt-1 font-serif text-sm text-muted-foreground sm:text-base">Riyadh, Saudi Arabia</p>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`} target="_blank" rel="noreferrer" className="btn-gold mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-serif text-[10px] uppercase tracking-[0.2em] text-primary-foreground sm:text-xs sm:tracking-[0.25em]"><MapPin className="h-4 w-4" />Get Directions</a>
          <Divider />
          <Label>Dress Code</Label>
          <p className="mt-2 font-script text-3xl leading-none text-rose sm:text-4xl">Party Attire</p>
          <div className="mt-5 flex justify-center gap-3 sm:gap-4">
            {["var(--blush)", "var(--gold-soft)", "var(--sage)"].map((c) => (
              <span key={c} className="h-10 w-10 rounded-full border-4 border-card shadow-luxe ring-1 ring-gold/50 sm:h-12 sm:w-12" style={{ background: c }} />
            ))}
          </div>
        </CreamCard>
      </Reveal>
    </section>
  );
}

const SCHEDULE = [
  ["17:00", "Guests welcomed with dates and Arabic coffee", bell],
  ["18:00", "Katb al-kitab", ring],
  ["19:00", "Zaffa procession", bird],
  ["19:30", "The couple take the kosha", flower],
  ["20:30", "Walima dinner", bell],
  ["22:00", "Dabke and dancing", bird],
  ["23:30", "Sweets and farewell", ring],
] as const;

function Schedule() {
  return (
    <section className="px-4 py-14 sm:py-16">
      <Reveal>
        <CreamCard>
          <img src={bird.url} alt="" className="float-soft mx-auto mb-2 w-20 sm:w-24" />
          <Label>Wedding Day Schedule</Label>
          <div className="relative mt-8 text-left sm:mt-10">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent" />
            {SCHEDULE.map(([t, e, img], i) => (
              <Reveal key={t} delay={i * 0.08} className="relative mb-6 grid grid-cols-2 items-center gap-3 sm:mb-8 sm:gap-8">
                <div className={i % 2 ? "order-2 text-left" : "text-right"}>
                  <p className="font-script text-2xl leading-none text-rose sm:text-3xl">{t}</p>
                  <p className="mt-1 font-serif text-xs leading-snug text-muted-foreground sm:text-sm">{e}</p>
                </div>
                <div className={`flex ${i % 2 ? "order-1 justify-end" : "justify-start"}`}>
                  <img src={img.url} alt="" className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
                </div>
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full btn-gold sm:h-3 sm:w-3" />
              </Reveal>
            ))}
          </div>
        </CreamCard>
      </Reveal>
    </section>
  );
}

type Wish = { id: string; name: string; message: string; created_at: string };

function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    supabase.from("wishes").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => data && setWishes(data));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim(), m = message.trim();
    if (!n || !m) return setErr("Please add your name and a wish.");
    if (n.length > 60 || m.length > 500) return setErr("That's a little long — please shorten it.");
    setBusy(true); setErr("");
    const { data, error } = await supabase.from("wishes").insert({ name: n, message: m }).select().single();
    setBusy(false);
    if (error) return setErr("Couldn't send your wish. Please try again.");
    setWishes((w) => [data, ...w]); setName(""); setMessage("");
  };

  return (
    <section className="px-4 pb-16 pt-14 sm:pt-16">
      <Reveal>
        <CreamCard>
          <img src={ring.url} alt="" className="float-soft mx-auto mb-2 w-20 sm:w-24" />
          <Label>Wishes Book</Label>
          <p className="mt-3 font-script text-3xl leading-none text-rose sm:text-4xl">Leave your blessings</p>
          <form onSubmit={submit} className="mt-6 space-y-3 text-left font-serif">
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="Your name" className="w-full rounded-md border border-gold/40 bg-background/70 px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={3} placeholder="Write your wish for Abdullah & Reem…" className="w-full resize-none rounded-md border border-gold/40 bg-background/70 px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" />
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button disabled={busy} className="btn-gold w-full rounded-full py-3 text-[10px] uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60 sm:text-xs sm:tracking-[0.3em]">{busy ? "Sending…" : "Send Wish"}</button>
          </form>
          <div className="mt-8 max-h-96 space-y-4 overflow-y-auto pr-1 text-left">
            {wishes.length === 0 && <p className="text-center font-serif text-sm italic text-muted-foreground">Be the first to leave a wish.</p>}
            {wishes.map((w) => (
              <div key={w.id} className="wish-in rounded-md border border-gold/30 bg-background/60 p-4">
                <p className="font-serif text-sm leading-relaxed text-foreground">"{w.message}"</p>
                <p className="mt-2 font-script text-xl text-rose sm:text-2xl">— {w.name}</p>
              </div>
            ))}
          </div>
        </CreamCard>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-28 pt-4 text-center">
      <Reveal>
        <div className="plaque relative mx-auto w-[min(92vw,430px)] overflow-hidden rounded-md px-6 py-8">
          <div className="pointer-events-none absolute inset-2 rounded-sm border border-gold/45" />
          <div className="relative">
            <p className="foil-text font-script text-5xl leading-none">A & R</p>
            <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-gold-text">23 · 02 · 2027 — Riyadh</p>
            <p className="mt-3 font-script text-2xl text-rose">With love, Abdullah &amp; Reem</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

/* ---------- page ---------- */
function Index() {
  const [opened, setOpened] = useState(false);
  const [pop, setPop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  const openInvite = () => {
    setPop(true);
    const a = audioRef.current;
    if (a) { a.volume = 0.6; a.play().then(() => setPlaying(true)).catch(() => {}); }
    setTimeout(() => { setOpened(true); window.scrollTo(0, 0); }, 900);
    setTimeout(() => setPop(false), 2600);
  };

  // gentle auto-scroll after opening; stops when the guest touches or scrolls
  useEffect(() => {
    if (!opened) return;
    let raf = 0, stopped = false, last = 0, acc = 0;
    const stop = () => { stopped = true; cancelAnimationFrame(raf); };
    const step = (t: number) => {
      if (stopped) return;
      if (last) { acc += (t - last) * 0.045; const px = Math.floor(acc); if (px) { window.scrollBy(0, px); acc -= px; } }
      last = t;
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) return;
      raf = requestAnimationFrame(step);
    };
    const start = setTimeout(() => (raf = requestAnimationFrame(step)), 3500);
    const evs = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    evs.forEach((e) => window.addEventListener(e, stop, { passive: true }));
    return () => { clearTimeout(start); stop(); evs.forEach((e) => window.removeEventListener(e, stop)); };
  }, [opened]);

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0" style={{ backgroundImage: `url(${tile.url})`, backgroundSize: "520px" }} />
      <div className="pointer-events-none fixed inset-0 bg-background/30" />
      <div className="pointer-events-none fixed inset-0" style={{ background: "radial-gradient(circle at 50% 40%, transparent 45%, var(--vignette) 100%)" }} />

      <div className="relative z-10">
        <audio ref={audioRef} src={music.url} loop preload="auto" />
        {pop && <Confetti />}

        <button onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"} className="btn-gold fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground">
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
          {playing && <span className="music-ring absolute inset-0 rounded-full" />}
        </button>

        {!opened ? (
          <section className="relative flex min-h-[100svh] items-center justify-center px-4 py-10">
            <div className="card-in relative aspect-[4/5.4] w-[min(92vw,420px)] overflow-hidden rounded-md bg-card shadow-luxe">
              <div className="absolute inset-2 rounded-sm border border-gold/50" />
              <div className="absolute inset-3.5 rounded-sm border border-gold/25" />
              <img src={flower.url} alt="" className="sway pointer-events-none absolute -left-[20%] top-1/2 w-[30%] -translate-y-1/2" />
              <img src={flower.url} alt="" className="sway-r pointer-events-none absolute -right-[20%] top-1/2 w-[30%] -translate-y-1/2" />
              <div className="relative flex h-full flex-col items-center justify-center px-6 text-center sm:px-16">
                <p className="rise font-serif text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-[11px] sm:tracking-[0.35em]" style={{ animationDelay: ".6s" }}>Together with their families</p>
                <h1 className="rise mt-4 font-script text-5xl leading-none text-rose sm:mt-5 sm:text-6xl" style={{ animationDelay: ".9s" }}>Sam</h1>
                <span className="rise my-1 font-script text-3xl text-gold-text sm:text-4xl" style={{ animationDelay: "1.1s" }}>&</span>
                <h1 className="rise font-script text-5xl leading-none text-rose sm:text-6xl" style={{ animationDelay: "1.3s" }}>Rana</h1>
                <div className="rise mt-5 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent sm:mt-6" style={{ animationDelay: "1.5s" }} />
                <p className="rise mt-4 font-serif text-base tracking-[0.12em] text-gold-text sm:text-lg sm:tracking-[0.2em]" style={{ animationDelay: "1.7s" }}>23 · February · 2027</p>
                <button onClick={openInvite} className="rise btn-gold mt-7 rounded-full px-8 py-3 font-serif text-xs uppercase tracking-[0.25em] text-primary-foreground sm:mt-8 sm:text-sm sm:tracking-[0.3em]" style={{ animationDelay: "2s" }}>Open</button>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <Hero />
            <Ceremony />
            <Gallery />
            <Reception />
            <Schedule />
            <Wishes />
            <Footer />
          </div>
        )}
      </div>
    </main>
  );
}