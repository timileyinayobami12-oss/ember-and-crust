"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { PageBand } from "./menu-page";
import { SectionHeading } from "./home-sections";
import { ADDRESS, EMAIL, HOURS, MAP_URL, PHONE_DISPLAY, PHONE_HREF } from "./header-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const TOPICS = ["General question", "Catering & events", "Feedback", "Press"];

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const valid =
    form.name.trim().length > 1 &&
    /.+@.+\..+/.test(form.email) &&
    form.topic &&
    form.message.trim().length > 4;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSent(true);
  };

  return (
    <>
      <PageBand
        title="Say Hello"
        subtitle="A question, a party for thirty, or a crust idea you cannot stop thinking about. We read everything."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.2fr_1fr]">
        {/* form */}
        <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm sm:p-8">
          {sent ? (
            <div className="flex h-full min-h-96 flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-16 w-16 text-leaf" strokeWidth={1.4} />
              <h2 className="mt-5 font-display text-2xl font-bold text-ink">
                Message received
              </h2>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-black/55">
                Thanks, {form.name.split(" ")[0]}. Someone from the kitchen will
                get back to you within a day, usually a lot sooner.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", phone: "", topic: "", message: "" });
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h2 className="font-display text-2xl font-bold text-ink">
                Drop us a line
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Your name</Label>
                  <Input
                    id="c-name"
                    placeholder="Jamie Rivera"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email">Email</Label>
                  <Input
                    id="c-email"
                    type="email"
                    placeholder="jamie@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="c-phone">Phone, optional</Label>
                  <Input
                    id="c-phone"
                    type="tel"
                    placeholder="(312) 555 0142"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>What is it about?</Label>
                  <Select
                    value={form.topic}
                    onValueChange={(v) => setForm({ ...form, topic: v })}
                  >
                    <SelectTrigger aria-label="Topic">
                      <SelectValue placeholder="Pick a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-msg">Message</Label>
                <Textarea
                  id="c-msg"
                  rows={5}
                  placeholder="Tell us everything..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={!valid}
                className="w-full rounded-full bg-ember py-6 text-sm font-semibold hover:bg-ember-bright sm:w-auto sm:px-10"
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* info card */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-charcoal p-6 text-white sm:p-8">
            <h2 className="font-display text-xl font-bold">The details</h2>
            <ul className="mt-5 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold">Visit</p>
                  <p className="mt-0.5 text-white/65">{ADDRESS}</p>
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-medium text-gold underline-offset-4 hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold">Call</p>
                  <a href={PHONE_HREF} className="mt-0.5 block text-white/65 hover:text-gold">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-0.5 block break-all text-white/65 hover:text-gold"
                  >
                    {EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div className="w-full">
                  <p className="font-semibold">Hours</p>
                  <ul className="mt-1 space-y-1 text-white/65">
                    {HOURS.map((h) => (
                      <li key={h.days} className="flex justify-between gap-3">
                        <span>{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/interior.jpg"
              alt="Inside the Ember and Crust dining room"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute inset-x-5 bottom-4 text-sm font-medium text-white">
              The room on Fulton Market. Walk ins welcome, the bar fills up early.
            </p>
          </div>
        </aside>
      </section>

      {/* wide band */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="text-center">
          <SectionHeading
            title="Bringing the oven to you"
            subtitle="We cater. Weddings, office parties, backyard birthdays. If there is a plug and six feet of space, we can build the oven there."
          />
        </div>
      </section>
    </>
  );
}
