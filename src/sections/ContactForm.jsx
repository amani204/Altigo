import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, User, Phone, Ruler, Package, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PrimaryButton from "../components/ui/PrimaryButton";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "213672086781";
const sizes = ["S", "M", "L", "XL", "XXL"];

// 📏 Size guide data (in cm)
const sizeData = [
  { size: "S", waist: 32, hips: 50, inseam: 32, thigh: 30, length: 108 },
  { size: "M", waist: 34, hips: 55, inseam: 34, thigh: 32, length: 110 },
  { size: "L", waist: 36, hips: 58, inseam: 35, thigh: 33, length: 111 },
  { size: "XL", waist: 37, hips: 62, inseam: 36, thigh: 34, length: 114 },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "min2").max(100),
  phone: z.string().trim().min(9, "phoneInvalid").max(15, "phoneInvalid").regex(/^[0-9+ ]+$/, "phoneInvalid"),
  size: z.enum(["S", "M", "L", "XL", "XXL"], { errorMap: () => ({ message: "sizeRequired" }) }),
  quantity: z.coerce.number().int().min(1).max(10),
  message: z.string().trim().max(500).optional(),
});

export default function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const sectionRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { quantity: 1 },
  });

  useGSAP(
    () => {
      gsap.from(".contact-eyebrow, .contact-title, .contact-desc", {
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
    },
    { scope: sectionRef }
  );

  const onSubmit = async (data) => {
    const lines = [
      `${t.contact.waGreeting}`,
      ``,
      ` ${t.contact.name}: ${data.name}`,
      `${t.contact.phone}: ${data.phone}`,
      `${t.contact.size}: ${data.size}`,
      `${t.contact.quantity}: ${data.quantity}`,
    ];
    if (data.message && data.message.trim().length > 0) {
      lines.push(`${t.contact.message}: ${data.message}`);
    }
    const waMessage = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
    setSubmitted(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 bg-altigo-bg overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-altigo-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-altigo-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="mx-auto max-w-2xl px-5 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="contact-eyebrow text-xs tracking-[0.3em] text-altigo-teal font-semibold mb-4 uppercase">
            {t.contact.eyebrow}
          </div>
          <h2 className="contact-title text-4xl md:text-5xl font-bold mb-4 text-altigo-text">
            {t.contact.title}
          </h2>
          <p className="contact-desc text-altigo-muted max-w-md mx-auto">
            {t.contact.description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative p-8 rounded-[5px] bg-altigo-surface/80 backdrop-blur-sm border border-altigo-border shadow-xl shadow-altigo-teal/5 space-y-6 transition-all hover:shadow-2xl hover:shadow-altigo-teal/10"
          style={{ opacity: 1 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-altigo-teal/30 rounded-b-full" />

          {/* Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-altigo-muted">
              <User size={14} className="text-altigo-teal" />
              {t.contact.name}
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder={t.contact.namePlaceholder}
              className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{t.contact.errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-altigo-muted">
              <Phone size={14} className="text-altigo-teal" />
              {t.contact.phone}
            </label>
            <input
              {...register("phone")}
              type="tel"
              dir="ltr"
              className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text placeholder:text-right"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{t.contact.errors.phone}</p>}
          </div>

          {/* Size + Quantity + Size Guide Toggle */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-altigo-muted">
                  <Ruler size={14} className="text-altigo-teal" />
                  {t.contact.size}
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-altigo-teal hover:text-altigo-teal-hover transition-colors flex items-center gap-1"
                >
                  {showSizeGuide ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                  {t.sizeGuide?.prompt || "Size Guide"}
                </button>
              </div>
              <select
                {...register("size")}
                defaultValue=""
                className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text appearance-none"
              >
                <option value="" disabled>{t.contact.sizePlaceholder}</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.size && <p className="text-xs text-red-500 mt-1">{t.contact.errors.size}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-altigo-muted">
                <Package size={14} className="text-altigo-teal" />
                {t.contact.quantity}
              </label>
              <input
                {...register("quantity")}
                type="number"
                min={1}
                max={10}
                className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text"
              />
            </div>
          </div>

          {/* Size Guide Table (toggled) */}
          {showSizeGuide && (
            <div className="space-y-4 p-4 rounded-xl bg-altigo-bg/70 border border-altigo-border/50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-altigo-text">
                  {t.sizeGuide?.title || "Size Guide"}
                </h4>
                <span className="text-xs text-altigo-muted">{t.sizeGuide?.subtitle || ""}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-altigo-text border-collapse">
                  <thead>
                    <tr className="border-b border-altigo-border/50">
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-altigo-muted">
                        {t.sizeGuide?.columns?.size || "Size"}
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-altigo-muted">
                        {t.sizeGuide?.columns?.waist || "Waist"}
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-altigo-muted">
                        {t.sizeGuide?.columns?.hips || "Hips"}
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-altigo-muted">
                        {t.sizeGuide?.columns?.inseam || "Inseam"}
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-altigo-muted">
                        {t.sizeGuide?.columns?.thigh || "Thigh"}
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-altigo-muted">
                        {t.sizeGuide?.columns?.length || "Length"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row) => (
                      <tr key={row.size} className="border-b border-altigo-border/30 last:border-0 hover:bg-altigo-surface/30 transition-colors">
                        <td className="px-3 py-2 font-medium">{row.size}</td>
                        <td className="px-3 py-2">{row.waist}</td>
                        <td className="px-3 py-2">{row.hips}</td>
                        <td className="px-3 py-2">{row.inseam}</td>
                        <td className="px-3 py-2">{row.thigh}</td>
                        <td className="px-3 py-2">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-altigo-muted/70 italic">
                {t.sizeGuide?.note || "All measurements are in centimeters (cm)."}
              </p>

              {/* Instructions */}
              {t.sizeGuide?.instructions && (
                <div className="mt-2 pt-2 border-t border-altigo-border/30">
                  <h5 className="text-xs font-semibold text-altigo-text mb-2">
                    {t.sizeGuide.instructions.title}
                  </h5>
                  <ul className="space-y-1 text-xs text-altigo-muted list-disc list-inside">
                    <li>{t.sizeGuide.instructions.waist}</li>
                    <li>{t.sizeGuide.instructions.hips}</li>
                    <li>{t.sizeGuide.instructions.inseam}</li>
                    <li>{t.sizeGuide.instructions.thigh}</li>
                    <li>{t.sizeGuide.instructions.length}</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Message */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-altigo-muted">
              <MessageSquare size={14} className="text-altigo-teal" />
              {t.contact.message}
            </label>
            <textarea
              {...register("message")}
              rows={3}
              placeholder={t.contact.messagePlaceholder}
              className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text resize-none"
            />
          </div>
          
          <div className="flex justify-center">
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto sm:min-w-[280px] py-4 text-base font-semibold shadow-lg shadow-altigo-teal/20 hover:shadow-xl hover:shadow-altigo-teal/30 transition-all duration-300"
            >
              {submitted ? <>{t.contact.sent}</> : <>{t.contact.submit}</>}
            </PrimaryButton>
          </div>
           
          <p className="text-xs text-center text-altigo-muted/70 flex items-center justify-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-altigo-teal/30" />
            {t.contact.waHint}
          </p>
        </form>
      </div>
    </section>
  );
}