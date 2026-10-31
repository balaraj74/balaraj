"use client";
import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowUpRight, Check, Copy, FileText, Send } from 'lucide-react';
import { EASE_OUT_EXPO } from './shared';
import { Magnetic, Reveal, RevealText, VIEWPORT } from './motion/primitives';
import { CONTACT_LINKS, ContactInfo, RESUME_URL } from '../constants/contacts';

const EMAIL = 'balu.balarajr@gmail.com';
const LIVE_LINKS = CONTACT_LINKS.filter((link) => link.label !== 'Email');

function BengaluruClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = setInterval(tick, 20000);
    return () => clearInterval(timer);
  }, []);

  return <span className="tabular-nums">{time ? `${time} IST` : 'IST'}</span>;
}

function EmailLink() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <a href={`mailto:${EMAIL}`} className="contact-email font-bold tracking-tight text-[clamp(1.25rem,2.7vw,2.25rem)] text-white break-all">
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-brand-400 text-xs font-bold uppercase tracking-widest text-stone-300 transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-brand-400" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function ContactRow({ contact, index }: { contact: ContactInfo; index: number }) {
  const Icon = contact.icon;
  return (
    <motion.a
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay: (index % 2) * 0.06, ease: EASE_OUT_EXPO }}
      className="contact-row group relative flex items-center gap-3 py-3.5 border-b border-white/10 overflow-hidden"
    >
      <Icon className="relative w-4 h-4 shrink-0 text-brand-400 group-hover:text-stone-950 transition-colors duration-300" />
      <span className="relative min-w-0 flex-1 transition-transform duration-300 group-hover:translate-x-1">
        <span className="block text-sm font-bold text-white group-hover:text-stone-950 transition-colors duration-300">{contact.label}</span>
        <span className="block text-xs text-stone-400 group-hover:text-stone-900 transition-colors duration-300 truncate">{contact.subtext}</span>
      </span>
      <ArrowUpRight className="relative w-4 h-4 mr-1 text-stone-500 group-hover:text-stone-950 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="contact-field relative">
      {children}
      <label htmlFor={id}>{label}</label>
      <span aria-hidden="true" className="contact-line" />
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      '0c154582-5b11-42f0-bfa8-c689ccb62a26';

    try {
      let isSuccess = false;
      let failureReason = '';

      // Primary: Direct Web3Forms submission (CORS-friendly, instant delivery)
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            from_name: 'Balaraj Portfolio',
            subject: `New Portfolio Message from ${formData.name.trim()}`,
          }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (response.ok && data.success !== false) {
            isSuccess = true;
          } else {
            failureReason = data?.message || '';
          }
        } else if (response.ok) {
          isSuccess = true;
        }
      } catch {
        // Fall through to Next.js API route fallback
      }

      // Secondary Fallback: /api/contact route
      if (!isSuccess) {
        try {
          const apiRes = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          const apiContentType = apiRes.headers.get('content-type') || '';
          if (apiContentType.includes('application/json')) {
            const apiData = await apiRes.json();
            if (apiRes.ok && apiData.success !== false) {
              isSuccess = true;
            } else {
              failureReason = apiData?.error || apiData?.message || failureReason;
            }
          }
        } catch {
          // ignore
        }
      }

      if (isSuccess) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(
          failureReason ||
            'Unable to deliver message right now. Please reach out directly via email at balu.balarajr@gmail.com.'
        );
      }
    } catch (err: unknown) {
      let msg = 'Unable to deliver message right now. Please reach out directly via email at balu.balarajr@gmail.com.';
      if (err instanceof Error && err.message && !err.message.includes('<!DOCTYPE') && !err.message.includes('JSON')) {
        msg = err.message;
      }
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative rounded-[clamp(24px,3vw,36px)] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-10 min-h-[480px]">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center min-h-[400px]"
          >
            <svg viewBox="0 0 80 80" className="w-24 h-24" aria-hidden="true">
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#f76616" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: 'easeInOut' }} />
              <motion.path d="M25 41l11 11 20-23" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />
            </svg>
            <h3 className="mt-6 text-2xl font-black text-white">Message Sent</h3>
            <p className="mt-2 text-stone-300 max-w-sm text-sm leading-relaxed">
              Thanks for reaching out! Your message was delivered directly to my inbox. I&apos;ll get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-7 px-5 py-2.5 rounded-full border border-white/25 hover:border-brand-400 text-sm font-bold text-white transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">
            {errorMessage && (
              <div role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-200 text-sm flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-7">
              <Field id="contact-name" label="Your name">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Field>
              <Field id="contact-email" label="Email address">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Field>
            </div>

            <Field id="contact-message" label="Tell me about the project or opportunity">
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder=" "
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </Field>

            <Magnetic strength={0.08} className="block">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-fill group w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-brand-500 text-stone-950 font-black uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Start a Conversation
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function ContactSection({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const lineClass = 'hero-line block overflow-hidden pb-[0.14em] -mb-[0.14em] pl-[0.08em] -ml-[0.08em]';
  const headingClass = 'text-[clamp(2.9rem,9vw,8.5rem)] leading-[1.02] font-serif italic font-medium tracking-tight text-white';

  return (
    <section id="contact" className="dark relative overflow-hidden bg-[#141110] text-white rounded-t-[clamp(28px,4vw,64px)] py-20 sm:py-28">
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-xs font-bold uppercase tracking-widest text-stone-300">
          <span className="inline-flex items-center gap-2 text-brand-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Open to Collaborations
          </span>
          <span>Bengaluru · <BengaluruClock /></span>
        </Reveal>

        {headingLevel === 'h1' ? (
          <h1 className={headingClass}>
            <span className={lineClass}><span>Let&apos;s Build</span></span>{' '}
            <span className={lineClass}><span className="gradient-text-cyan w-fit pr-[0.1em]" style={{ animationDelay: '0.1s' }}>Scalable AI Systems</span></span>
          </h1>
        ) : (
          <RevealText
            className={headingClass}
            segments={[{ text: "Let's Build", br: true }, { text: 'Scalable AI Systems', className: 'gradient-text-cyan' }]}
          />
        )}

        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                I&apos;m open to AI/ML internships, high-impact projects, and collaborations focused on real-world systems. Currently building production-grade AI platforms, and happy to connect if you&apos;re working on something meaningful.
              </p>
            </Reveal>
            <Reveal delay={0.1}><EmailLink /></Reveal>
            <div className="grid sm:grid-cols-2 gap-x-6">
              {LIVE_LINKS.map((contact, index) => (
                <ContactRow key={contact.label} contact={contact} index={index} />
              ))}
            </div>
            <Reveal delay={0.1}>
              <Magnetic>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 hover:border-brand-400 font-bold text-sm transition-colors"
                >
                  <FileText className="w-4 h-4 text-brand-400 group-hover:-translate-y-0.5 transition-transform" />
                  View Resume
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
