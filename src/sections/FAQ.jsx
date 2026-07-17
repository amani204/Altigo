import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"];

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const answerRefs = useRef({});

  itemsRef.current = [];
  const addToItems = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      gsap.from(".faq-eyebrow, .faq-title", {
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

      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Animate triangles floating with more visibility
      gsap.utils.toArray(".triangle").forEach((triangle, i) => {
        gsap.to(triangle, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-15, 15),
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        });
      });

      // Pulsing glow effect on some triangles
      gsap.utils.toArray(".triangle-glow").forEach((triangle) => {
        gsap.to(triangle, {
          opacity: 0.3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: sectionRef }
  );

  const toggle = (index) => {
    const isOpening = openIndex !== index;
    const prevIndex = openIndex;
    setOpenIndex(isOpening ? index : null);

    if (isOpening && answerRefs.current[index]) {
      gsap.fromTo(
        answerRefs.current[index],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
    if (prevIndex !== null && prevIndex !== index && answerRefs.current[prevIndex]) {
      gsap.to(answerRefs.current[prevIndex], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  // Generate random triangles with more visibility
  const triangles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: gsap.utils.random(20, 60),
    top: gsap.utils.random(5, 95),
    left: gsap.utils.random(5, 95),
    rotation: gsap.utils.random(0, 360),
    opacity: gsap.utils.random(0.08, 0.2),
    duration: gsap.utils.random(4, 8),
    delay: gsap.utils.random(0, 2),
    isGlow: i % 3 === 0,
  }));

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-altigo-surface border-y border-altigo-border overflow-hidden"
    >
      {/* Background Triangles - More Visible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {triangles.map((triangle) => (
          <div
            key={triangle.id}
            className={`triangle ${triangle.isGlow ? 'triangle-glow' : ''}`}
            style={{
              position: 'absolute',
              top: `${triangle.top}%`,
              left: `${triangle.left}%`,
              width: 0,
              height: 0,
              borderLeft: `${triangle.size / 2}px solid transparent`,
              borderRight: `${triangle.size / 2}px solid transparent`,
              borderBottom: `${triangle.size}px solid #3B9CC9`,
              opacity: triangle.opacity,
              transform: `rotate(${triangle.rotation}deg)`,
              transformOrigin: 'center',
              filter: triangle.isGlow ? 'drop-shadow(0 0 10px rgba(59, 156, 201, 0.3))' : 'none',
            }}
          />
        ))}
      </div>

      {/* Larger Featured Triangles */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-[0.15]">
        <div
          className="triangle"
          style={{
            width: 0,
            height: 0,
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderBottom: '70px solid #3B9CC9',
            transform: 'rotate(-15deg)',
            filter: 'drop-shadow(0 0 20px rgba(59, 156, 201, 0.2))',
          }}
        />
      </div>
      <div className="absolute bottom-10 right-10 pointer-events-none opacity-[0.15]">
        <div
          className="triangle"
          style={{
            width: 0,
            height: 0,
            borderLeft: '45px solid transparent',
            borderRight: '45px solid transparent',
            borderBottom: '65px solid #3B9CC9',
            transform: 'rotate(160deg)',
            filter: 'drop-shadow(0 0 20px rgba(59, 156, 201, 0.2))',
          }}
        />
      </div>
      <div className="absolute top-1/4 right-16 pointer-events-none opacity-[0.12]">
        <div
          className="triangle"
          style={{
            width: 0,
            height: 0,
            borderLeft: '35px solid transparent',
            borderRight: '35px solid transparent',
            borderBottom: '50px solid #3B9CC9',
            transform: 'rotate(45deg)',
            filter: 'drop-shadow(0 0 15px rgba(59, 156, 201, 0.15))',
          }}
        />
      </div>
      <div className="absolute bottom-1/3 left-16 pointer-events-none opacity-[0.12]">
        <div
          className="triangle"
          style={{
            width: 0,
            height: 0,
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderBottom: '45px solid #3B9CC9',
            transform: 'rotate(-60deg)',
            filter: 'drop-shadow(0 0 15px rgba(59, 156, 201, 0.15))',
          }}
        />
      </div>

      {/* Extra decorative triangles in clusters */}
      <div className="absolute top-1/2 left-8 pointer-events-none opacity-[0.08]">
        <div style={{ display: 'flex', gap: '8px', transform: 'rotate(20deg)' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="triangle"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${15 + i * 5}px solid transparent`,
                borderRight: `${15 + i * 5}px solid transparent`,
                borderBottom: `${25 + i * 8}px solid #3B9CC9`,
                transform: `rotate(${i * 30}deg)`,
                filter: 'drop-shadow(0 0 10px rgba(59, 156, 201, 0.1))',
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-1/3 right-8 pointer-events-none opacity-[0.08]">
        <div style={{ display: 'flex', gap: '6px', transform: 'rotate(-30deg)' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="triangle"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${12 + i * 4}px solid transparent`,
                borderRight: `${12 + i * 4}px solid transparent`,
                borderBottom: `${20 + i * 6}px solid #3B9CC9`,
                transform: `rotate(${-i * 25}deg)`,
                filter: 'drop-shadow(0 0 10px rgba(59, 156, 201, 0.1))',
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="faq-eyebrow text-xs tracking-[0.3em] text-altigo-teal font-semibold mb-4 uppercase">
            {t.faq.eyebrow}
          </div>
          <h2 className="faq-title text-4xl md:text-5xl font-bold text-altigo-text">
            {t.faq.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqKeys.map((key, i) => (
            <div
              key={key}
              ref={addToItems}
              className="border border-altigo-border rounded-[5px] bg-altigo-bg/80 backdrop-blur-sm overflow-hidden hover:border-altigo-teal/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-altigo-text text-sm sm:text-base">
                  {t.faq.items[key].q}
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-altigo-teal transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                ref={(el) => (answerRefs.current[i] = el)}
                className="overflow-hidden"
                style={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
              >
                <p className="px-5 pb-5 text-sm text-altigo-muted leading-relaxed">
                  {t.faq.items[key].a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}