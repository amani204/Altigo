import { Phone, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext"; 
import logo1 from "../../assets/logo1.png"; 
import logo2 from "../../assets/logo2.png"; 

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme(); 

  const whatsappNumber = "+213672086781"; 
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;
  const instagramLink = "https://www.instagram.com/altigo.dz/"; // Update with your actual handle

  const navLinks = [
    { key: "home", href: "#home", label: "Home" },
    { key: "product", href: "#product", label: "Product" },
    { key: "about", href: "#about", label: "About" },
    { key: "faq", href: "#faq", label: "FAQ" },
    { key: "contact", href: "#contact", label: "Contact" },
  ];

  return (
    <footer dir="ltr" className="relative border-t border-altigo-border bg-altigo-surface/50 backdrop-blur-sm">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-altigo-teal/30 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* LEFT: Logo & Description */}
          <div className="md:col-span-1">
            <a 
              href="#home" 
              className="inline-flex items-center gap-2 mb-4"
            >
              <img
                src={theme === "dark" ? logo1 : logo2}
                alt="Altigo"
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-altigo-muted leading-relaxed max-w-xs">
              {t?.footer?.description || "Premium performance sportswear engineered for athletes who chase peaks."}
            </p>
          </div>

          {/* CENTER: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-altigo-text uppercase tracking-wider mb-4">
              {t?.footer?.quickLinks || "Quick Links"}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-altigo-muted hover:text-altigo-teal transition-colors duration-300 relative group"
                  >
                    {t?.nav?.[link.key] || link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-altigo-text uppercase tracking-wider mb-4">
              {t?.footer?.contact || "Contact"}
            </h3>
            <ul className="space-y-3">
              {/* WhatsApp */}
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-altigo-muted hover:text-altigo-teal transition-colors duration-300 group"
                >
                  <Phone size={16} className="text-altigo-teal group-hover:scale-110 transition-transform duration-300" />
                  <span>{whatsappNumber}</span>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-altigo-muted hover:text-altigo-teal transition-colors duration-300 group"
                >
                  {/* Custom SVG Instagram Icon structured like Lucide tokens */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-altigo-teal group-hover:scale-110 transition-transform duration-300"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>@altigo.dz</span>
                </a>
              </li>

              {/* Location */}
              <li>
                <div className="flex items-center gap-3 text-sm text-altigo-muted">
                  <MapPin size={16} className="text-altigo-teal" />
                  <span>{t?.footer?.location || "Wear Your Adventure"}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-altigo-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-altigo-muted">
            © {new Date().getFullYear()} AltiGo. {t?.footer?.rights || "All rights reserved."}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-altigo-muted">
            <span>
              Created by{" "}
              <a
                href="https://www.instagram.com/amani.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-altigo-teal hover:text-altigo-teal-hover transition-colors duration-300 font-medium"
              >
                AMANI
              </a>
            </span>
            <span className="w-px h-4 bg-altigo-border/50" />
          </div>
        </div>
      </div>
    </footer>
  );
}