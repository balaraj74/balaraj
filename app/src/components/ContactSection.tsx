"use client";
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView as useFramerInView } from 'framer-motion';
import { Mail, CheckCircle2, FileText } from 'lucide-react';
import { AuroraBackground, fadeInLeft, fadeInRight, fadeInUp, staggerContainer } from './shared';
import { CONTACT_LINKS, ContactInfo } from '../constants/contacts';

function ContactCard({ contact }: { contact: ContactInfo }) {
  const Icon = contact.icon;
  return (
    <motion.a
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeInUp}
      className="flex items-center gap-3 group p-2 rounded-2xl hover:bg-white/60 dark:hover:bg-slate-900/60 transition-all duration-300"
      whileHover={{ x: 4 }}
    >
      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/85 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 group-hover:border-cyan-500/50 group-hover:bg-cyan-50 dark:group-hover:bg-slate-800 transition-all duration-300 shrink-0 shadow-sm">
        <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors" />
      </div>
      <div>
        <div className="text-slate-900 dark:text-white font-bold group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors text-sm">{contact.label}</div>
        <div className="text-slate-600 dark:text-slate-400 text-xs font-medium transition-colors">{contact.subtext}</div>
      </div>
    </motion.a>
  );
}

function ContactInfoPanel({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInLeft}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <p className="section-label mb-0">Get in Touch</p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-widest">Open to Collaborations</span>
          </div>
        </div>
        <h2 className="text-4xl sm:text-5xl font-serif italic font-medium text-slate-900 dark:text-white leading-tight tracking-tight transition-colors">
          Let&apos;s Build<br />
          <span className="gradient-text-cyan">Scalable AI Systems</span>
        </h2>
      </div>

      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed transition-colors">
        I&apos;m open to AI/ML internships, high-impact projects, and collaborations focused on real-world systems. Currently building production-grade AI platforms — happy to connect if you&apos;re working on something meaningful.
        <br /><br />
        <span className="text-slate-600 dark:text-slate-400 text-sm font-medium transition-colors">Based in Bengaluru, open to remote opportunities.</span>
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {CONTACT_LINKS.map((contact) => (
          <ContactCard key={contact.label} contact={contact} />
        ))}
      </motion.div>

      <div className="pt-4">
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Balaraj_resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-cyan-500/40 rounded-xl text-slate-800 dark:text-slate-200 font-bold transition-all duration-300 group shadow-sm"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <FileText className="w-5 h-5 text-cyan-700 dark:text-cyan-400 group-hover:-translate-y-1 transition-transform" />
          <span>Download Resume</span>
        </motion.a>
      </div>
    </motion.div>
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
            'Unable to deliver message right now. Please reach out directly via email at balarajr483@gmail.com.'
        );
      }
    } catch (err: unknown) {
      let msg = 'Unable to deliver message right now. Please reach out directly via email at balarajr483@gmail.com.';
      if (err instanceof Error && err.message && !err.message.includes('<!DOCTYPE') && !err.message.includes('JSON')) {
        msg = err.message;
      }
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card rounded-3xl p-8 border border-white/90 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl transition-all duration-500 space-y-6 shadow-xl"
      whileHover={{ borderColor: 'rgba(6,182,212,0.5)', boxShadow: '0 20px 40px -10px rgba(15,23,42,0.12)' }}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <motion.div
              className="w-20 h-20 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30 shadow-md"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Message Sent Successfully!</h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-sm mx-auto text-sm leading-relaxed font-medium">
              Thanks for reaching out! Your message was delivered directly to my inbox. I&apos;ll get back to you shortly.
            </p>
            <motion.button
              type="button"
              className="mt-8 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold transition-colors shadow-sm"
              onClick={() => setSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-sm flex items-center gap-2 font-medium">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name field */}
            <div className="mb-5">
              <label className="block text-slate-700 dark:text-slate-300 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/90 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-xs transition-all"
                placeholder="e.g. Alex Turing"
                required
              />
            </div>

            {/* Email field */}
            <div className="mb-5">
              <label className="block text-slate-700 dark:text-slate-300 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/90 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-xs transition-all"
                placeholder="alex@company.com"
                required
              />
            </div>

            {/* Message field */}
            <div className="mb-6">
              <label className="block text-slate-700 dark:text-slate-300 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3.5 bg-white/90 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-xs transition-all resize-none"
                placeholder="Briefly describe your project, opportunity, or collaboration idea..."
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative flex items-center justify-center gap-2.5 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span className="uppercase tracking-wider text-xs font-bold">Delivering Message...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span className="uppercase tracking-wider text-xs font-black">Start a Conversation</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={sectionRef} className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <AuroraBackground />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          <div className="lg:col-span-6">
            <ContactInfoPanel isInView={isInView} />
          </div>
          
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInRight}
            className="lg:col-span-6"
          >
            <ContactForm />
            <p className="mt-8 text-center text-slate-600 dark:text-slate-400 text-sm">
              Prefer direct contact? Reach me via{' '}
              <a href="mailto:balarajr483@gmail.com" className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors font-semibold">email</a>
              {' '}or{' '}
              <a href="https://www.linkedin.com/in/balaraj-r-209a67330/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors font-semibold">LinkedIn</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
