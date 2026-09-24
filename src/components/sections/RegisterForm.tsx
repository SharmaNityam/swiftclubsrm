"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { site } from "@/content/site";
import { Field, controlClass } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;
type State = { status: "idle" | "error" | "success"; errors: Errors };

type Values = {
  name: string;
  email: string;
  phone: string;
  year: string;
  domain: string;
  why: string;
  consent: boolean;
};

const INITIAL: State = { status: "idle", errors: {} };

const NO_FIELDS: ReadonlySet<string> = new Set();

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  year: "",
  domain: "",
  why: "",
  consent: false,
};

/** Deliberately permissive — real addresses break strict patterns constantly. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fd: FormData): Errors {
  const get = (k: string) => String(fd.get(k) ?? "").trim();
  const e: Errors = {};

  if (get("name").length < 2) e.name = "Please enter your full name.";
  if (!EMAIL.test(get("email"))) e.email = "Enter a valid email address.";

  const phone = get("phone");
  if (phone && !/^[\d\s+()-]{7,18}$/.test(phone))
    e.phone = "That doesn't look like a phone number.";

  if (!get("year")) e.year = "Select your year of study.";
  if (!get("domain")) e.domain = "Pick the domain that interests you most.";

  const why = get("why");
  if (why.length < 20)
    e.why = `Tell us a little more — at least 20 characters (${why.length} so far).`;

  if (!fd.get("consent")) e.consent = "Please confirm before submitting.";
  return e;
}

export function RegisterForm() {
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  /**
   * Controlled, not `defaultValue`. A failed submit re-renders this form, and
   * `defaultValue` only applies on mount — on re-render React left the DOM
   * untouched and `<select>` silently dropped its selection, so fixing one
   * field would quietly clear another. State is the single source of truth.
   */
  const [values, setValues] = useState<Values>(EMPTY);

  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, fd) => {
      const errors = validate(fd);
      if (Object.keys(errors).length) return { status: "error", errors };

      // Mock submission — stands in for the real endpoint.
      await new Promise((r) => setTimeout(r, 1200));
      return { status: "success", errors: {} };
    },
    INITIAL,
  );

  /**
   * A field's error clears the moment the user starts fixing it, rather than
   * nagging until the next submit.
   *
   * Derived during render rather than mirrored into state by an effect: copying
   * `state.errors` into local state would split one logical update across two
   * renders, so the error summary wouldn't exist in the DOM yet when the focus
   * effect below runs. `token` scopes the cleared set to the submit it came
   * from, so a fresh submit's errors all show again without needing a reset.
   */
  const [cleared, setCleared] = useState<{
    token: State;
    fields: ReadonlySet<string>;
  }>({ token: INITIAL, fields: NO_FIELDS });

  const clearedNow = cleared.token === state ? cleared.fields : NO_FIELDS;
  const errors: Errors = {};
  for (const [key, message] of Object.entries(state.errors)) {
    if (message && !clearedNow.has(key)) errors[key] = message;
  }

  const set = <K extends keyof Values>(key: K, v: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setCleared((prev) => {
      const base = prev.token === state ? prev.fields : NO_FIELDS;
      if (base.has(key)) return prev;
      return { token: state, fields: new Set(base).add(key) };
    });
  };

  /* Move focus to whatever the submit produced, so keyboard and screen-reader
     users are taken to the outcome instead of being left on the button. */
  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-[14px] border border-hairline bg-surface p-10 text-center md:p-14"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-peach">
          <Check className="size-8 text-flame" strokeWidth={2.5} aria-hidden />
        </span>
        <h2 className="display-tight mt-7 text-[clamp(1.75rem,3.2vw,2.25rem)]">
          {site.register.success.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-[1.75] text-body">
          {site.register.success.body}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-flame hover:underline"
        >
          Back to the club <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    );
  }

  const err = errors;
  const errorList = Object.entries(err) as [string, string][];

  return (
    <form action={formAction} noValidate className="flex flex-col gap-7">
      {/* One summary at the top: the fastest way to see everything that failed */}
      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[10px] border border-flame/40 bg-blush p-5"
        >
          <p className="text-[0.9375rem] font-semibold text-ink">
            {errorList.length === 1
              ? "One field needs attention"
              : `${errorList.length} fields need attention`}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.875rem] text-body">
            {errorList.map(([key, message]) => (
              <li key={key}>
                <a href={`#${key}`} className="underline hover:text-flame">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-7 md:grid-cols-2">
        <Field id="name" label="Full name" required error={err.name}>
          {(a) => (
            <input
              {...a}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Ada Lovelace"
              className={controlClass}
            />
          )}
        </Field>

        <Field id="email" label="Email" required error={err.email}>
          {(a) => (
            <input
              {...a}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@university.edu"
              className={controlClass}
            />
          )}
        </Field>

        <Field id="phone" label="Phone" error={err.phone}>
          {(a) => (
            <input
              {...a}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className={controlClass}
            />
          )}
        </Field>

        <Field id="year" label="Year of study" required error={err.year}>
          {(a) => (
            <select
              {...a}
              name="year"
              value={values.year}
              onChange={(e) => set("year", e.target.value)}
              className={cn(controlClass, "appearance-none bg-[right_1rem_center] pr-10")}
            >
              <option value="">Select a year</option>
              {site.register.years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      {/* Radios belong in a fieldset so the group has one accessible name */}
      <fieldset
        id="domain"
        aria-invalid={Boolean(err.domain)}
        aria-describedby={err.domain ? "domain-error" : undefined}
      >
        <legend className="text-[0.9375rem] font-medium text-ink">
          Which domain interests you most?
          <span className="ml-1 text-flame" aria-hidden>
            *
          </span>
        </legend>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {site.domains.items.map((d) => (
            <label
              key={d.id}
              className={cn(
                "cursor-pointer rounded-[10px] border border-hairline bg-surface p-4",
                "transition-colors duration-200 hover:border-muted/50",
                "has-[:checked]:border-flame has-[:checked]:bg-blush/60",
                "has-[:focus-visible]:border-flame",
              )}
            >
              <input
                type="radio"
                name="domain"
                value={d.title}
                checked={values.domain === d.title}
                onChange={() => set("domain", d.title)}
                className="sr-only"
              />
              <span className="block text-[1rem] font-semibold text-ink">
                {d.title}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-[1.6] text-body">
                {d.body}
              </span>
            </label>
          ))}
        </div>

        {err.domain ? (
          <p id="domain-error" className="mt-2 text-[0.8125rem] font-medium text-flame">
            {err.domain}
          </p>
        ) : null}
      </fieldset>

      <Field
        id="why"
        label="Why do you want to join?"
        required
        error={err.why}
        hint="A couple of sentences is plenty."
      >
        {(a) => (
          <textarea
            {...a}
            name="why"
            rows={5}
            value={values.why}
            onChange={(e) => set("why", e.target.value)}
            placeholder="I'd like to learn how real projects get built, and I want people to build them with."
            className={cn(controlClass, "resize-y")}
          />
        )}
      </Field>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-[1.6] text-body">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(err.consent)}
            aria-describedby={err.consent ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0 accent-flame"
          />
          <span>
            I&apos;m happy for the Swift Coding Club to contact me about my
            application.
            <span className="ml-1 text-flame" aria-hidden>
              *
            </span>
          </span>
        </label>
        {err.consent ? (
          <p id="consent-error" className="text-[0.8125rem] font-medium text-flame">
            {err.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-1">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "group inline-flex h-[58px] items-center justify-center gap-2.5 rounded-full px-8",
            "bg-flame text-[1.0625rem] font-medium text-white",
            "transition-all duration-300 ease-out hover:bg-[#e04315] active:scale-[0.98]",
            "disabled:cursor-not-allowed disabled:opacity-70",
          )}
        >
          {pending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Submitting…
            </>
          ) : (
            <>
              Submit application
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </>
          )}
        </button>

        <p className="text-[0.8125rem] text-muted">{site.register.note}</p>
      </div>

      {/* Announced without stealing focus mid-submit */}
      <p aria-live="polite" className="sr-only">
        {pending ? "Submitting your application" : ""}
      </p>
    </form>
  );
}
