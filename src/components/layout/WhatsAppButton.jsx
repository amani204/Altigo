import { MessageCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const WHATSAPP_NUMBER = "213781721027";

// Generic greeting 
const getGreeting = (lang) => {
  const messages = {
    fr: "Bonjour ! Je suis intéressé(e) par les produits Altigo.",
    ar: "مرحباً! أنا مهتم بمنتجات Altigo.",
  };
  return messages[lang] || messages.en;
};

export default function WhatsAppButton() {
  const { language } = useLanguage();

  const message = encodeURIComponent(getGreeting(language));
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-shadow duration-300 group"
      aria-label="Contact on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-pulse-slow bg-[#25D366]/40" />
      
      {/* Icon */}
      <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
    </a>
  );
}