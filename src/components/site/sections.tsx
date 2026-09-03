"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useMelegy } from "@/content/schema-ext";
import { AVAILABLE, PROFILE, SOLD, type Available, type Sold } from "@/content/media";
import { Stamp } from "@/components/webgl/stamp";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--tick-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: the tick. A field snaps up past full size by a hair
 * and settles — quick and mechanical, the way a box gets checked. */
function Tick({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  // A polymorphic tag's prop union is too wide for TS to resolve on its own.
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-tick="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-tick-rule=""
      className={`h-px w-full origin-[left_center] bg-cream/20 rtl:origin-[right_center] ${className ?? ""}`}
      style={delayVar(delay)}
    />
  );
}

function SectionHead({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div>
      <Tick className="label text-red">{eyebrow}</Tick>
      <Tick as="h2" className="text-display font-display mt-3 max-w-[24ch] text-cream" delay={60}>
        {heading}
      </Tick>
      <Rule className="mt-6" delay={110} />
      {intro ? (
        <Tick className="text-lead mt-6 max-w-[68ch] leading-[1.8] text-cream-2" delay={160}>
          {intro}
        </Tick>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useMelegy();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/12 bg-ground/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[86rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[1rem] font-semibold text-cream">{c.brand.name}</span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-cream-2 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="latin field ms-auto shrink-0 text-[0.84rem] font-bold text-red transition-opacity hover:opacity-75 md:ms-0"
        >
          {PROFILE.phones[0]}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-cream/25 px-3 py-1.5 text-[0.7rem] text-cream-2 transition-colors hover:border-red hover:text-cream"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- hero -- */

function Hero() {
  const c = useMelegy();

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-14 h-[30rem]"
        style={{
          background: "radial-gradient(55% 60% at 50% 0%, rgba(231,169,77,0.10), rgba(28,26,23,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[86rem] px-5 pt-10 sm:px-8 lg:pt-14">
        <Tick className="label text-red">{c.hero.eyebrow}</Tick>
        <Tick as="h1" className="text-hero font-display mt-4 max-w-[19ch] text-cream" delay={70}>
          {c.hero.headline}
        </Tick>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Tick delay={30}>
            <Stamp
              struck={false}
              alt={c.hero.stampAlt}
              className="aspect-[4/5] w-full max-w-[24rem] border border-cream/12 bg-ground-2 sm:aspect-[3/4]"
            />
          </Tick>

          <div>
            <Tick className="text-lead max-w-[50ch] leading-[1.85] text-cream-2" delay={140}>
              {c.hero.sub}
            </Tick>

            <Tick className="mt-9 flex flex-wrap items-center gap-3" delay={220}>
              <a
                href={PROFILE.phoneHref}
                className="bg-red px-6 py-3 text-[0.9rem] font-bold text-ground transition-opacity hover:opacity-85"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href="#form"
                className="border border-cream/30 px-6 py-3 text-[0.9rem] text-cream transition-colors hover:border-red hover:text-red"
              >
                {c.hero.secondaryCta}
              </a>
            </Tick>

            <Tick className="mt-12 grid grid-cols-2 gap-px border-t border-cream/15" delay={300}>
              {[
                { k: c.hero.followersLabel, v: PROFILE.followers },
                { k: c.hero.postsLabel, v: PROFILE.posts },
              ].map((s) => (
                <div key={s.k} className="pt-6">
                  <div className="field tnum text-[1.7rem] leading-none text-cream">
                    <span className="latin">{s.v}</span>
                  </div>
                  <div className="label mt-2 text-cream-2">{s.k}</div>
                </div>
              ))}
            </Tick>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ form -- */

function km(n: number) {
  return n.toLocaleString("en-US");
}

function FormCard({ car, index }: { car: Available; index: number }) {
  const c = useMelegy();

  return (
    <Tick as="article" className="border-t border-cream/15 pt-8" delay={Math.min(index, 4) * 60}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden bg-ground-2">
            <img
              src={car.frames[0]}
              alt={`${car.marque} ${car.model}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-2 flex gap-2">
            {car.frames.slice(1).map((f) => (
              <div key={f} className="h-16 w-24 overflow-hidden bg-ground-2">
                <img src={f} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="field tnum text-[0.78rem] text-cream-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="label text-cream-2">{c.hero.availableLabel}</span>
          </div>
          <h3 className="latin font-display mt-2 text-[1.5rem] leading-tight text-cream">
            {car.marque} {car.model}
            {car.trim ? <span className="text-cream-2"> · {car.trim}</span> : null}
          </h3>

          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-cream/10 pt-4">
            <div>
              <dt className="fine text-cream-3">{c.form.fieldLabels.year}</dt>
              <dd className="field tnum text-[0.94rem] text-cream">
                <span className="latin">{car.year}</span>
              </dd>
            </div>
            <div>
              <dt className="fine text-cream-3">{c.form.fieldLabels.mileage}</dt>
              <dd className="field tnum text-[0.94rem] text-cream">
                <span className="latin">{km(car.mileageKm)} km</span>
              </dd>
            </div>
            <div>
              <dt className="fine text-cream-3">{c.form.fieldLabels.service}</dt>
              <dd className="field text-[0.94rem] text-cream">{c.form.agency}</dd>
            </div>
            <div>
              <dt className="fine text-cream-3">{c.form.fieldLabels.licence}</dt>
              <dd className="field text-[0.94rem] text-cream">
                <span className="latin">{car.licence}</span>
              </dd>
            </div>
          </dl>

          <p className="fine mt-4 border-t border-cream/10 pt-4 text-cream-2">
            <span className="text-red">✓</span> {c.form.yes}
          </p>

          <div className="mt-5">
            <div className="label text-cream-3">{c.form.equipmentLabel}</div>
            <div className="mt-3 space-y-2">
              {car.equipment.map((group, gi) => (
                <div key={gi} className="flex flex-wrap gap-x-1.5 gap-y-1.5">
                  {group.en.map((item) => (
                    <span
                      key={item}
                      className="fine border border-cream/15 px-2 py-1 text-cream-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="fine mt-5 text-red">
            {car.extendedFinance ? c.form.financeExtended : c.form.financeNote}
          </p>

          <a
            href={car.postUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="fine mt-4 inline-block text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:text-red"
          >
            {c.form.viewPost}
          </a>
        </div>
      </div>
    </Tick>
  );
}

function Form() {
  const c = useMelegy();

  return (
    <section id="form" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead eyebrow={c.form.eyebrow} heading={c.form.heading} intro={c.form.intro} />
      <div className="mt-14 space-y-16">
        {AVAILABLE.map((car, i) => (
          <FormCard key={car.id} car={car} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- closed -- */

function ClosedCard({
  car,
  selected,
  onSelect,
}: {
  car: Sold;
  selected: boolean;
  onSelect: () => void;
}) {
  const c = useMelegy();

  return (
    <Tick as="li">
      <button
        onClick={onSelect}
        aria-pressed={selected}
        className={`group w-full border p-4 text-start transition-colors ${
          selected ? "border-red bg-ground-2" : "border-cream/15 hover:border-cream/35"
        }`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-ground-2">
          <img
            src={car.frame}
            alt={`${car.marque} ${car.model}`}
            className="h-full w-full object-cover opacity-90"
            loading="lazy"
          />
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <span className="latin font-display text-[1rem] text-cream">
            {car.marque} {car.model}
          </span>
          <span className="label text-red">{c.hero.soldLabel}</span>
        </div>
      </button>
    </Tick>
  );
}

function Closed() {
  const c = useMelegy();
  const [selected, setSelected] = useState(0);
  const car = SOLD[selected];

  return (
    <section id="closed" className="border-y border-cream/12 bg-ground-2 py-24 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead eyebrow={c.closed.eyebrow} heading={c.closed.heading} intro={c.closed.intro} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Tick delay={40}>
            {/* Keyed on the selected file, so choosing a different one
                remounts the rig and the stamp genuinely falls again. */}
            <Stamp
              key={car.id}
              struck
              alt={c.hero.stampAlt}
              className="aspect-[4/5] w-full max-w-[24rem] border border-cream/12 bg-ground sm:aspect-[3/4]"
            />
            <p className="fine mt-3 text-cream-3">{c.closed.stampHint}</p>
          </Tick>

          <ul className="grid grid-cols-2 gap-4 self-start">
            {SOLD.map((s, i) => (
              <ClosedCard key={s.id} car={s} selected={i === selected} onSelect={() => setSelected(i)} />
            ))}
          </ul>
        </div>

        <Tick className="mt-10" delay={80}>
          <a
            href={car.postUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="fine text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:text-red"
          >
            {c.closed.viewPost}: {car.marque} {car.model}
          </a>
        </Tick>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- branches -- */

function Branches() {
  const c = useMelegy();
  const { locale } = useLocale();

  return (
    <section id="branches" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead
        eyebrow={c.branches.eyebrow}
        heading={c.branches.heading}
        intro={c.branches.intro}
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {PROFILE.branches.map((b, i) => (
          <Tick key={b.city} className="border border-cream/15 p-6" delay={i * 90}>
            <div className="label text-red">
              {locale === "ar" ? b.cityAr : b.city}
            </div>
            <p className="mt-3 text-[1rem] text-cream">
              {locale === "ar" ? b.addressAr : b.address}
            </p>
          </Tick>
        ))}
      </div>

      <Tick className="mt-10 flex flex-wrap items-baseline gap-3 border-t border-cream/15 pt-6" delay={200}>
        <span className="label text-cream-3">{c.branches.hoursLabel}</span>
        <span className="field text-[0.94rem] text-cream">
          {locale === "ar" ? PROFILE.hoursAr : PROFILE.hours}
        </span>
      </Tick>

      <Tick className="fine mt-6 max-w-[62ch] border-s-2 border-red ps-4 text-cream-2" delay={260}>
        {c.branches.sloganNote}
      </Tick>
    </section>
  );
}

/* --------------------------------------------------------------- contact -- */

function Contact() {
  const c = useMelegy();
  const { locale } = useLocale();

  return (
    <section id="contact" className="border-t border-cream/12 bg-ground-2 py-24 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Tick as="h2" className="text-display font-display max-w-[16ch] text-cream">
          {c.contact.heading}
        </Tick>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Tick delay={60}>
            <div className="label text-red">{c.contact.branchesLabel}</div>
            <ul className="mt-3 space-y-3 text-[0.94rem] leading-relaxed text-cream-2">
              {PROFILE.branches.map((b) => (
                <li key={b.city}>{locale === "ar" ? b.addressAr : b.address}</li>
              ))}
            </ul>
            <a
              href={c.contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-3 inline-block text-cream underline decoration-cream/40 underline-offset-4"
            >
              Google Maps
            </a>
          </Tick>

          <Tick delay={130}>
            <div className="label text-red">{c.contact.phoneLabel}</div>
            <ul className="mt-3 space-y-2">
              {c.contact.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:+2${p}`}
                    className="latin field text-[0.98rem] text-cream transition-opacity hover:opacity-75"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </Tick>

          <Tick delay={200}>
            <div className="label text-red">{c.brand.name}</div>
            <div className="mt-3 flex flex-col gap-2 text-[0.9rem]">
              <a
                href={c.contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                Instagram
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                Facebook
              </a>
            </div>
          </Tick>

          <Tick delay={270}>
            <a
              href={PROFILE.phoneHref}
              className="inline-block bg-red px-6 py-3 text-[0.9rem] font-bold text-ground transition-opacity hover:opacity-85"
            >
              {c.contact.cta}
            </a>
          </Tick>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- export -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Form />
      <Closed />
      <Branches />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useMelegy();

  return (
    <footer className="border-t border-cream/12 bg-ground py-10">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="font-display text-[0.94rem] font-semibold text-cream">{c.brand.name}</span>
        </div>
        <p className="fine max-w-[64ch] text-cream-2">{c.footer.disclaimer}</p>
        <p className="fine text-cream-2">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
