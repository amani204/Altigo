import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Languages, ChevronRight } from "lucide-react"; 
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import PrimaryButton from "../ui/PrimaryButton";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
gsap.registerPlugin(ScrollToPlugin);

const InstagramIcon = ({ size = 18, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  const navLinks = [
    { key: "home", href: "#home" },
    { key: "product", href: "#product" },
    { key: "about", href: "#about" },
    { key: "faq", href: "#faq" },
    { key: "contact", href: "#contact" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false); 

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: href, offsetTop: 80 }, 
      ease: "power4.out",
    });
  };

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when menu is open
      document.body.style.overflow = "hidden";

      gsap.to(mobileMenuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
      });

      gsap.fromTo(
        mobileLinksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "unset";

      gsap.to(mobileMenuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header dir="ltr" className="fixed top-0 left-0 right-0 z-50 border-b border-altigo-border bg-altigo-bg/80 backdrop-blur-md">
      <nav className="relative mx-auto flex items-center justify-between px-5 py-4 lg:px-8 max-w-7xl">
        
        {/* LEFT: Logo */}
<a 
  href="#home" 
  onClick={(e) => handleScroll(e, "#home")}
  className="flex items-center gap-2"
>
  <img
    src={theme === "dark" ? logo1 : logo2}
    alt="Altigo"
    className="h-12 w-auto object-contain"
  />
</a>

        {/* CENTER: Nav links */}
        <ul dir="ltr" className="hidden items-center gap-1 lg:flex absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-altigo-muted transition-colors hover:text-altigo-text rounded-[5px] hover:bg-altigo-surface/50 group block"
              >
                {t?.nav?.[link.key] || link.key}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-altigo-teal transition-all duration-300 group-hover:w-1/2"></span>
                <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-0 h-0.5 bg-altigo-teal transition-all duration-300 group-hover:w-1/2"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT: Controls & Socials */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/altigo_dz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden sm:flex items-center justify-center rounded-full border border-altigo-border p-2 text-altigo-muted transition-all duration-300 hover:text-altigo-text hover:border-altigo-teal hover:shadow-glow/30"
          >
            <InstagramIcon size={18} />
          </a>

          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="relative flex items-center gap-1 rounded-full border border-altigo-border px-3 py-2 text-altigo-muted transition-all duration-300 hover:text-altigo-text hover:border-altigo-teal hover:shadow-glow/30 group"
          >
            <Languages size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xs font-semibold uppercase tracking-wider">{language || 'fr'}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-altigo-border p-2 text-altigo-muted transition-all duration-300 hover:text-altigo-text hover:border-altigo-teal hover:shadow-glow/30"
          >
            {theme === "dark" ? (
              <Sun size={18} className="hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Moon size={18} className="hover:rotate-90 transition-transform duration-500" />
            )}
          </button>

          <PrimaryButton href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hidden lg:flex">
            {t?.nav?.orderNow || 'Order Now'}
          </PrimaryButton>

          {/* Mobile menu button - Using Lucide Menu and X icons */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-altigo-text lg:hidden relative w-10 h-10 z-50 flex items-center justify-center rounded-[5px] hover:bg-altigo-surface/50 transition-colors duration-300"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={24} className="transition-transform duration-300" />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay - NOW FULL WIDTH AND HEIGHT */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 w-screen h-screen bg-altigo-bg backdrop-blur-2xl px-6 pt-28 pb-10 lg:hidden z-40 flex flex-col justify-between"
        style={{ transform: "translateX(100%)", opacity: 0 }}
      >
        {/* Large Decorative Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-altigo-teal/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col h-full justify-between relative z-10 max-w-md mx-auto w-full">
          {/* Navigation Links with larger sizing */}
          <ul className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <li 
                key={link.key}
                ref={(el) => (mobileLinksRef.current[index] = el)}
                className="w-full"
              >
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="group flex items-center justify-between px-5 py-4 text-md  tracking-tight text-altigo-text rounded-[5px] hover:bg-altigo-surface/80 transition-all duration-300"
                >
                  <span className="group-hover:text-altigo-teal transition-colors duration-300">
                    {t?.nav?.[link.key] || link.key}
                  </span>
                  <ChevronRight 
                    size={26} 
                    className="text-altigo-muted group-hover:text-altigo-teal group-hover:translate-x-2 transition-all duration-300" 
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom Actions Tray */}
          <div 
            ref={(el) => (mobileLinksRef.current[navLinks.length] = el)}
            className="flex flex-col gap-6 pt-6 border-t border-altigo-border/50 w-full"
          >
            <PrimaryButton href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="w-full justify-center py-4.5 text-lg font-semibold shadow-lg">
              {t?.nav?.orderNow || 'Order Now'} 
            </PrimaryButton>

            {/* Premium Instagram Button */}
            <div className="flex items-center justify-center">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-[5px] border border-altigo-border text-altigo-muted hover:text-altigo-text hover:border-altigo-teal transition-all duration-300 text-base font-medium bg-altigo-surface/30"
              >
                <InstagramIcon size={22} className="text-altigo-teal" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}