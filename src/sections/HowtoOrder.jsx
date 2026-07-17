import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MousePointerClick, MessageCircle, Package } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: MousePointerClick, key: "step1", number: "01" },
  { icon: MessageCircle, key: "step2", number: "02" },
  { icon: Package, key: "step3", number: "03" },
];

export default function HowToOrder() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  cardsRef.current = [];
  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      gsap.from(".order-eyebrow, .order-title, .order-desc", {
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
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-altigo-bg"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="order-eyebrow text-xs tracking-[0.3em] text-altigo-teal font-semibold mb-4 uppercase">
            {t.howToOrder.eyebrow}
          </div>
          <h2 className="order-title text-4xl md:text-6xl font-bold mb-4 text-altigo-text">
            {t.howToOrder.title}
          </h2>
          <p className="order-desc text-altigo-muted max-w-xl mx-auto">
            {t.howToOrder.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.key}
              ref={addToCards}
              className="relative p-8 rounded-[5px] bg-altigo-surface border border-altigo-border overflow-hidden group hover:border-altigo-teal/50 transition-colors"
            >
              {/* Big background number */}
              <div className="absolute -top-3 rtl:-left-1 ltr:-right-1 text-8xl font-bold text-altigo-teal/10 group-hover:text-altigo-teal/20 transition-colors select-none">
                {s.number}
              </div>

              <div className="w-14 h-14 rounded-[5px] bg-altigo-teal flex items-center justify-center mb-6 relative z-10">
                <s.icon className="h-6 w-6 text-altigo-bg" />
              </div>

              <h3 className="text-xl font-bold mb-2 relative z-10 text-altigo-text">
                {t.howToOrder[s.key].title}
              </h3>
              <p className="text-sm text-altigo-muted relative z-10">
                {t.howToOrder[s.key].desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}