import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wind, Shield, Zap, Feather, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import detail2 from "/src/assets/detail-2.PNG";

gsap.registerPlugin(ScrollTrigger);

const productDetails = [
  { icon: Feather, key: "quality" },
  { icon: Wind, key: "comfort" },
  { icon: Shield, key: "performance" },
  { icon: Zap, key: "design" },
];

export default function Features() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const whyRef = useRef(null);

  cardsRef.current = [];
  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      gsap.from(".features-eyebrow, .features-title, .features-desc", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Entrance
      gsap.from(whyRef.current, {
        opacity: 0,
        x: isRTL ? -40 : 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top 80%",
        },
      });

      // Continuous floating motion, starts after entrance settles
      gsap.to(whyRef.current, {
        y: "+=12",
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    },
    { scope: sectionRef, dependencies: [isRTL] }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-altigo-surface border-y border-altigo-border"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Product feature cards */}
          <div>
            <div className="features-eyebrow text-xs tracking-[0.3em] text-altigo-teal font-semibold mb-4 uppercase">
              {t.features.eyebrow}
            </div>
            <h2 className="features-title text-4xl md:text-5xl font-bold mb-4 text-altigo-text">
              {t.features.title}
            </h2>
            <p className="features-desc text-altigo-muted mb-10 max-w-lg">
              {t.features.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {productDetails.map((f) => (
                <div
                  key={f.key}
                  ref={addToCards}
                  className="p-5 rounded-[5px] bg-altigo-bg border border-altigo-border group hover:border-altigo-teal/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-[5px] bg-altigo-teal flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-altigo-bg" />
                  </div>
                  <h3 className="font-semibold mb-1 text-altigo-text">
                    {t.features.items[f.key].title}
                  </h3>
                  <p className="text-sm text-altigo-muted">
                    {t.features.items[f.key].desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Image + Why Altigo card */}
          <div className="relative">
            {/* Image */}
            <div className="aspect-[4/5] rounded-[5px] overflow-hidden shadow-card">
              <img
                src={detail2}
                alt="Altigo product in action"
                className="w-full h-full object-cover"
                width={800}
                height={1000}
                loading="lazy"
              />
            </div>

            {/* Floating Why Altigo card */}
            <div
              ref={whyRef}
              className="absolute -bottom-8 ltr:-left-4 rtl:-right-4 ltr:md:-left-12 rtl:md:-right-12 bg-altigo-bg border border-altigo-border rounded-[5px] p-6 max-w-xs shadow-card"
            >
              <div className="text-xs tracking-[0.2em] text-altigo-teal font-semibold mb-4 uppercase">
                {t.features.whyTitle}
              </div>
              <p className="text-altigo-muted mb-6 leading-relaxed">
                {t.features.whyDescription}
              </p>
              <ul className="space-y-3">
                {t.features.whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-altigo-text">
                    <CheckCircle2 className="h-4 w-4 text-altigo-teal shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}