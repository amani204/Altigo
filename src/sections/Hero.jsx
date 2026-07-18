import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { Star } from "lucide-react";

// Background assets – replace with your own
import imageLeft from "../assets/detail-2.png";
import centerVideo from "../assets/v2.mp4";
import imageRight from "../assets/detail-2.png";

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-tagline", { opacity: 0, y: 20, duration: 0.7 })
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from(".hero-ctas", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(".hero-stats", { opacity: 0, y: 20, duration: 0.7 }, "-=0.3")
        .from(
          ".hero-col",
          { opacity: 0, scale: 1.08, duration: 1.2, stagger: 0.15, ease: "power2.out" },
          0
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-altigo-bg"
    >
      {/* BACKGROUND – 3 columns: image / video / image */}
      <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3 h-full w-full">
        <div className="hero-col relative h-full w-full overflow-hidden hidden sm:block">
          <img src={imageLeft} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="hero-col relative h-full w-full overflow-hidden">
          <video
            src={centerVideo}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="hero-col relative h-full w-full overflow-hidden hidden sm:block">
          <img src={imageRight} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* Extra gradient overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/20" />

      {/* CENTERED CONTENT */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 text-center">
        {/* Badge */}
        <p className="hero-tagline mb-6 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/80 font-medium backdrop-blur-sm">
          {t.hero.badge}
        </p>

        {/* Title */}
        <h1
          className="hero-title max-w-3xl text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-tight whitespace-pre-line font-hero"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
        >
          {t.hero.title}
        </h1>

        {/* Description */}
        <p className="hero-desc mt-6 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed font-light">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas mt-10 flex flex-col sm:flex-row items-center gap-4">
          <PrimaryButton href="#contact">{t.hero.cta}</PrimaryButton>
          <SecondaryButton
            href="#product"
            className="!border-white/40 !text-white hover:!text-altigo-teal hover:!border-altigo-teal"
          >
            {t.hero.secondaryCta}
          </SecondaryButton>
        </div>

        {/* Stats – stars, ratings, quality badge */}
        <div dir= "ltr" className="hero-stats mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
          {/* Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-altigo-teal text-altigo-teal" />
            ))}
            <span className="ml-2 font-semibold text-white">4.9</span>
          </div>

          <span className="hidden sm:inline w-px h-6 bg-white/20" />
          
          {/* Haute qualité – premium badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 backdrop-blur-sm">
            <span className="text-xs tracking-wider text-white/90 font-medium">
              {t.hero.qualityBadge}
            </span>
          </div>

          
        </div>
      </div>
    </section>
  );
}