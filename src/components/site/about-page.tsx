"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageBand } from "./menu-page";
import { FeaturesRow } from "./home-sections";
import { useRoute } from "@/lib/store";

const STEPS = [
  {
    image: "/images/dough-balls.jpg",
    alt: "Two dough balls resting on a floured wooden table",
    title: "1. The Dough",
    text: "Flour, water, salt and a little patience. Every ball rests for two days before it ever meets a stretching hand.",
  },
  {
    image: "/images/oven-pizza.jpg",
    alt: "A pizza baking in the mouth of the oak fired oven",
    title: "2. The Fire",
    text: "Oak burns all day at 900 degrees. Ninety seconds a side, and the leopard spotting on the crust tells us it is ready.",
  },
  {
    image: "/images/party-trays.jpg",
    alt: "Trays of pizza heading out to a table",
    title: "3. Your Table",
    text: "Boxed hot, cut clean and sent out with the garlic oil on the side. Just in case you are into that.",
  },
];

export function AboutPage() {
  const navigate = useRoute((s) => s.navigate);
  return (
    <>
      <PageBand
        title="About Us"
        subtitle="A pizza place built on a borrowed oven and a lot of nerve."
      />

      {/* story */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-ember">
            How it started
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            From a farmers market table to Fulton Market
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-black/65">
            <p>
              Ember &amp; Crust started in the spring of 2018 with a brick oven
              we bought at an auction, a folding table at the Saturday market,
              and a line of forty neighbors who took a chance on a couple of
              kids selling pizza by the slice. We sold out in ninety minutes and
              went home tired enough to forget to take the aprons off.
            </p>
            <p>
              Marco learned to bake in his uncle&rsquo;s pizzeria outside Naples,
              where the dough gets two full days to rest and the oven does most
              of the talking. Ana ran kitchens around this city for a decade
              before they met at a food conference neither of them wanted to be
              at. They wrote a short menu on the train ride home.
            </p>
            <p>
              Six years later the oven has never gone cold for long. We still
              mix the dough every morning, we still buy tomatoes from the same
              farm every October, and we still argue weekly about whether
              pineapple belongs in the building. It does. We are sorry, Marco.
            </p>
          </div>
          <button
            onClick={() => navigate("menu")}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3 text-sm font-semibold text-white transition hover:bg-ember-bright active:scale-95"
          >
            Taste What We Mean
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/dough-hands.jpg"
              alt="A baker stretching pizza dough on a wooden bench"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/interior.jpg"
              alt="The dining room at Ember and Crust"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/oven-fire.jpg"
              alt="Flames inside the oak oven"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* values */}
      <div className="border-y border-black/5 bg-white/60">
        <FeaturesRow />
      </div>

      {/* process */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-ink sm:text-4xl">
            From Flour to Front Door
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[15px] text-black/55">
            Three steps, no shortcuts, every single order.
          </p>
          <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-ember" aria-hidden />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* founder quote */}
      <section className="bg-cream py-14">
        <figure className="mx-auto max-w-3xl px-4 text-center">
          <span className="font-script text-6xl leading-none text-ember/30" aria-hidden>
            &ldquo;
          </span>
          <blockquote className="mt-2 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
            We are not trying to reinvent pizza. We are trying to make the one
            you crave on a Tuesday.
          </blockquote>
          <figcaption className="mt-5 text-sm text-black/55">
            <span className="font-semibold text-ink">Ana Duarte</span> · Co Founder
          </figcaption>
        </figure>
      </section>
    </>
  );
}
