import { useState } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2, Mail, Send } from "lucide-react";
import { site } from "../../data/site";
import { cn, isValidEmail, isValidUrl } from "../../lib/utils";
import Button from "../ui/Button";

const initialValues = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!isValidEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 3) errors.subject = "Please add a short subject.";
  if (values.message.trim().length < 10) errors.message = "Your message should be at least 10 characters.";
  return errors;
}

function Field({ id, label, error, as = "input", className, ...props }) {
  const Comp = as;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <Comp
        id={id}
        name={id}
        className={cn("field", as === "textarea" && "min-h-[140px] resize-y")}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Sends to `site.contactForm.endpoint` (e.g. Formspree) when configured.
 * Without an endpoint it falls back to opening the visitor's email client,
 * and if no email is configured either, it says so instead of faking success.
 */
export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [botField, setBotField] = useState("");

  const endpoint = site.contactForm.endpoint;
  const mode = isValidUrl(endpoint) ? "endpoint" : site.email ? "mailto" : "unconfigured";

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    if (mode === "mailto") {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    if (botField) return; // honeypot filled: silently ignore bots

    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _subject: values.subject }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  };

  if (mode === "unconfigured") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-8 text-center">
        <Info className="h-6 w-6 text-electric" aria-hidden="true" />
        <p className="mt-3 font-medium text-ink">The contact form isn&apos;t connected yet.</p>
        <p className="mt-1.5 max-w-sm text-sm text-muted">
          Please reach out through the links on this page in the meantime.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} placeholder="Your name" />
      <Field id="email" label="Email" type="email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} placeholder="you@example.com" />
      <Field id="subject" label="Subject" className="sm:col-span-2" value={values.subject} onChange={onChange} error={errors.subject} placeholder="What's this about?" />
      <Field id="message" label="Message" as="textarea" className="sm:col-span-2" value={values.message} onChange={onChange} error={errors.message} placeholder="Tell me about your idea, project, or opportunity…" />

      <div aria-hidden="true" className="hidden">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} className="sm:min-w-[180px]">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : mode === "mailto" ? (
            <>
              <Mail className="h-4 w-4" aria-hidden="true" /> Open in Email App
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Send Message
            </>
          )}
        </Button>

        <div aria-live="polite" className="text-sm">
          {status === "success" && (
            <p className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-rose-300">
              <AlertCircle className="h-4 w-4" aria-hidden="true" /> Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
