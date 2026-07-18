import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PrimaryButton from "../components/ui/PrimaryButton"; 

import img1 from "../assets/p2.PNG";
import img2 from "../assets/p3.PNG";
import img3 from "../assets/p11.png";
import img4 from "../assets/p6.jpg";

import vid1 from "../assets/v1.mp4";
import vid2 from "../assets/v3.mp4";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, type: "image", src: img1, label: "1" },
  { id: 2, type: "image", src: img2, label: "2" },
  { id: 3, type: "video", src: vid1, poster: img1, label: "3" },
  { id: 4, type: "image", src: img3, label: "4" },
  { id: 5, type: "video", src: vid2, poster: img2, label: "5" },
  { id: 6, type: "image", src: img4, label: "6" },
];

export default function ProductGallery() {
  const { t, isRTL } = useLanguage();
  const [active, setActive] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const mainContainerRef = useRef(null);
  const thumbnailsRef = useRef([]);
  const galleryContainerRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(galleryContainerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryContainerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      const validThumbnails = thumbnailsRef.current.filter(el => el !== null);
      if (validThumbnails.length > 0) {
        gsap.from(validThumbnails, {
          scale: 0.9,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: galleryContainerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.to(mainContainerRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mainContainerRef.current) {
      gsap.fromTo(
        mainContainerRef.current,
        { opacity: 0.5, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }

    const activeItem = galleryItems[active];
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      const index = parseInt(key);
      if (index === active && activeItem.type === "video") {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else if (video) {
        video.pause();
      }
    });
  }, [active]);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section
      id="product"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-altigo-teal/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-altigo-teal/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div
            ref={eyebrowRef}
            className="text-xs tracking-[0.3em] text-altigo-teal font-semibold mb-4 uppercase"
          >
            {t?.gallery?.eyebrow || "OUR PRODUCT"}
          </div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-4 text-altigo-text"
          >
            {t?.gallery?.title || "See the Details."}
          </h2>
          <p
            ref={descRef}
            className="text-altigo-muted max-w-xl mx-auto"
          >
            {t?.gallery?.description || "Every angle, every detail – crafted for performance and style."}
          </p>
        </div>

        {/* Gallery grid */}
        <div
          ref={galleryContainerRef}
          className="grid lg:grid-cols-[1fr_500px] gap-4"
        >
          {/* Main Display */}
          <div
            ref={mainContainerRef}
            className="relative aspect-4/5 rounded-[5px] overflow-hidden bg-altigo-surface border border-altigo-border shadow-card"
          >
            {galleryItems[active].type === "video" ? (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[active] = el;
                }}
                src={galleryItems[active].src}
                poster={galleryItems[active].poster}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={galleryItems[active].src}
                alt={galleryItems[active].label || "Product"}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-altigo-bg/70 backdrop-blur text-xs font-medium text-altigo-text">
              {galleryItems[active].label || `Item ${active + 1}`}
              {galleryItems[active].type === "video" && " 🎬"}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-altigo-bg/70 backdrop-blur flex items-center justify-center text-altigo-text hover:bg-altigo-bg/90 transition-colors duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-altigo-bg/70 backdrop-blur flex items-center justify-center text-altigo-text hover:bg-altigo-bg/90 transition-colors duration-300"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? 'w-8 bg-altigo-teal' : 'w-4 bg-altigo-border hover:bg-altigo-muted'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-1.5">
            {galleryItems.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) thumbnailsRef.current[i] = el;
                }}
                onClick={() => setActive(i)}
                className={`relative aspect-square rounded-[5px] overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                  active === i ? "border-altigo-teal shadow-glow" : "border-altigo-border hover:border-altigo-teal/50"
                }`}
              >
                <img
                  src={item.type === "video" ? item.poster : item.src}
                  alt={item.label || "Product thumbnail"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-altigo-bg/30 backdrop-blur-sm">
                    <Play className="h-6 w-6 text-altigo-text fill-altigo-text" />
                  </div>
                )}
                {active === i && (
                  <div className="absolute inset-0 ring-2 ring-altigo-teal ring-offset-2 ring-offset-altigo-bg/50" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/*  CTA Button – "Commander" */}
        <div className="mt-12 text-center">
          <PrimaryButton href="#contact" className="inline-flex">
            {t?.nav?.orderNow || "Commander"}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}