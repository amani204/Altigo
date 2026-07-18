import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { Star } from "lucide-react";

// Background assets
import imageLeft from "../assets/detail-2.PNG";
import centerVideo from "../assets/v2.mp4";
import imageRight from "../assets/detail-2.PNG";

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-tagline", { opacity: 0, y: 15, duration: 0.8 })
        .from(".hero-title", { opacity: 0, y: 25, duration: 1 }, "-=0.5")
        .from(".hero-desc", { opacity: 0, y: 15, duration: 0.8 }, "-=0.6")
        .from(".hero-ctas", { opacity: 0, y: 15, duration: 0.8 }, "-=0.5")
        .from(".hero-stats", { opacity: 0, y: 15, duration: 0.8 }, "-=0.4")
        .from(
          ".hero-col",
          { opacity: 0, scale: 1.05, duration: 1.4, stagger: 0.1, ease: "power3.out" },
          0
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0c]"
    >
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3 h-full w-full">
        {/* Mobile View: Shows only this left image. Desktop: Becomes Column 1 */}
        <div className="hero-col relative h-full w-full overflow-hidden block">
          <img src={imageLeft} alt="" className="h-full w-full object-cover scale-102" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-black/20 sm:bg-black/10" />
        </div>
        
        {/* Desktop Only: Center Video */}
        <div className="hero-col relative h-full w-full overflow-hidden hidden sm:block">
          <video
            src={centerVideo}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Desktop Only: Right Image */}
        <div className="hero-col relative h-full w-full overflow-hidden hidden sm:block">
          <img src={imageRight} alt="" className="h-full w-full object-cover scale-102" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Premium Ambient Lighting Overlays */}
      <div className="absolute inset-0 bg-radial-[at_center_top] from-transparent via-black/20 to-[#0a0a0c]/90 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-[#0a0a0c] to-transparent pointer-events-none" />

      {/* CENTERED CONTENT */}
      <div className="relative  z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        
        {/* Premium Badge */}
        <div className="hero-tagline mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-1.5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-altigo-teal animate-pulse" />
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/90 font-medium font-sans">
            {t.hero.badge}
          </p>
        </div>

        {/* Title */}
        <h1
          className="hero-title mt-25 max-w-4xl text-4xl sm:text-6xl lg:text-[5.5rem] font-semi-bold uppercase tracking-tight text-white leading-[1.05] whitespace-pre-line font-hero"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
        >
          {t.hero.title}
        </h1>

        {/* Description */}
        <p className="hero-desc mt-8 max-w-2xl text-sm sm:text-lg text-white/75 leading-relaxed font-light tracking-wide">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto px-4 sm:px-0">
          <PrimaryButton 
            href="#contact" 
            className="w-full sm:w-auto shadow-[0_0_30px_rgba(var(--altigo-teal-rgb),0.2)] hover:shadow-[0_0_40px_rgba(var(--altigo-teal-rgb),0.4)] transition-all duration-300"
          >
            {t.hero.cta}
          </PrimaryButton>
          <SecondaryButton
            href="#product"
            className="w-full sm:w-auto border-white/20! bg-white/2 text-white! backdrop-blur-sm hover:bg-white! hover:text-black! hover:border-white! transition-all duration-300 tracking-wider"
          >
            {t.hero.secondaryCta}
          </SecondaryButton>
        </div>

        {/* Stats */}
        <div dir="ltr" className="hero-stats mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm tracking-wide">
          {/* Stars */}
          <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-xs">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-altigo-teal text-altigo-teal shadow-xs" />
            ))}
            <span className="ml-2 font-medium text-white text-xs sm:text-sm">4.9</span>
            <span className="text-white/40 text-xs font-light">/ 5.0</span>
          </div>

          <span className="hidden sm:inline w-px h-5 bg-white/10" />
          
          {/* Quality Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/80 font-medium">
              {t.hero.qualityBadge}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}