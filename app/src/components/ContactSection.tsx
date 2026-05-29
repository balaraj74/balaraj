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
      className="flex items-center gap-3 group p-2 rounded-2xl hover:bg-white/5 transition-all duration-300"
      whileHover={{ x: 4 }}
    >
      <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/5 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-300 shrink-0">
        <Icon className="w-5 h-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
      </div>
      <div>
        <div className="text-white font-medium group-hover:text-cyan-400 transition-colors text-sm">{contact.label}</div>
        <div className="text-white/40 text-xs">{contact.subtext}</div>
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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Open to Collaborations</span>
          </div>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          Let&apos;s Build<br />
          <span className="gradient-text-cyan">Scalable AI Systems</span>
        </h2>
      </div>

      <p className="text-white/55 text-lg leading-relaxed">
        I&apos;m open to AI/ML internships, high-impact projects, and collaborations focused on real-world systems. Currently building production-grade AI platforms — happy to connect if you&apos;re working on something meaningful.
        <br /><br />
        <span className="text-white/35 text-sm">Based in Bengaluru, open to remote opportunities.</span>
      </p>

      <motion.div
        className="inline-flex items-center gap-3 px-4 py-2 mt-4 rounded-2xl glass border border-amber-500/30 bg-amber-500/5 group cursor-default"
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <span
          aria-label="LeetCode"
          className="w-5 h-5 bg-white/80"
          style={{
            mask: "url('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/leetcode.svg') center / contain no-repeat",
            WebkitMask: "url('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/leetcode.svg') center / contain no-repeat",
          }}
        />
        <div>
          <div className="text-amber-400 font-bold text-sm leading-tight">LeetCode 200+</div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider">Problems Solved</div>
        </div>
      </motion.div>

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
          href="https://drive.google.com/file/d/1eHgU1BzPQ1m0DxUQqf0EbmLVZ-jRKAYk/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 rounded-xl text-white font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <FileText className="w-5 h-5 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const inputs = [
    { label: 'Your Name', type: 'text', field: 'name', placeholder: 'Your Name' },
    { label: 'Email Address', type: 'email', field: 'email', placeholder: 'Enter your email' },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card rounded-3xl p-8 border border-white/10 hover:border-cyan-500/20 transition-colors duration-500 space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.04)]"
      whileHover={{ boxShadow: '0 0 60px rgba(6,182,212,0.08)' }}
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
              className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">Message sent successfully</h3>
            <p className="text-white/55">I&apos;ll get back to you soon.</p>
            <motion.button
              type="button"
              className="mt-8 px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
              onClick={() => setSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {inputs.map((input) => (
              <div key={input.field} className="mb-6">
                <label className="block text-white/60 text-sm font-medium mb-2">{input.label}</label>
                <input
                  type={input.type}
                  value={formData[input.field as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/4 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all hover:bg-white/6"
                  placeholder={input.placeholder}
                  required
                />
              </div>
            ))}
            <div className="mb-6">
              <label className="block text-white/60 text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3.5 bg-white/4 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all resize-none hover:bg-white/6"
                placeholder="Briefly describe your project, opportunity, or idea..."
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative flex items-center justify-center gap-2 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6,182,212,0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  <span>Start a Conversation</span>
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
    <section id="contact" ref={sectionRef} className="relative py-28 bg-[#040010] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/images/bg_contact.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.35 }} />
      <AuroraBackground />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactInfoPanel isInView={isInView} />
          
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInRight}
          >
            <ContactForm />
            <p className="mt-8 text-center text-white/40 text-sm">
              Prefer direct contact? Reach me via{' '}
              <a href="mailto:balarajr483@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">email</a>
              {' '}or{' '}
              <a href="https://www.linkedin.com/in/balaraj-r-209a67330/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">LinkedIn</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
