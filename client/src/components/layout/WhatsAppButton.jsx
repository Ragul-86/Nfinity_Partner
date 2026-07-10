import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../../lib/constants.js';

export function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      className="fixed right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success-green text-white shadow-glow-lg transition-transform hover:scale-110"
    >
      <MessageCircle size={26} />
    </a>
  );
}
