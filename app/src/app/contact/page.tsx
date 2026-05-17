import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Contact | Balaraj R',
  description: 'Contact Balaraj R - AI/ML Engineer & Full Stack Developer',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050d1a] text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <p className="text-lg text-white/70 mb-8 max-w-2xl text-center">
        Feel free to reach out to me for collaborations or inquiries. This page will soon feature a contact form and more details.
      </p>
      <Link href="/" className="text-cyan-400 hover:underline inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back Home
      </Link>
    </div>
  );
}
