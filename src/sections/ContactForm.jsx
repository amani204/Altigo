import { useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, User, Phone, Ruler, Package, MessageSquare, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import PrimaryButton from "../components/ui/PrimaryButton";
import WilayaSelect from "../components/ui/WilayaSelect";
import DeliveryTypeSelector from "../components/ui/DeliveryTypeSelector";
import wilayas from "../data/wilaya";
import sizeGuideImage from "../assets/guide.jpeg";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "213781721027";
const sizes = ["S", "M", "L", "XL", "XXL"];

const PRODUCT_PRICE = 3400;

const contactSchema = z.object({
  name: z.string().trim().min(2, "min2").max(100),
  phone: z.string().trim().min(9, "phoneInvalid").max(15, "phoneInvalid").regex(/^[0-9+ ]+$/, "phoneInvalid"),
  wilaya: z.string().min(1, "wilayaRequired"),
  region: z.string().trim().min(2, "regionRequired").max(80),
  size: z.enum(["S", "M", "L", "XL", "XXL"], { errorMap: () => ({ message: "sizeRequired" }) }),
  quantity: z.coerce.number().int().min(1).max(10),
  message: z.string().trim().max(500).optional(),
});

export default function ContactForm() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [deliveryType, setDeliveryType] = useState("desk");
  const sectionRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { quantity: 1 },
  });

  const selectedWilayaCode = watch("wilaya");
  const quantity = watch("quantity") || 1;

  const selectedWilaya = useMemo(
    () => wilayas.find((w) => w.code === selectedWilayaCode),
    [selectedWilayaCode]
  );

  const effectiveDeliveryType =
    selectedWilaya && deliveryType === "desk" && selectedWilaya.desk === null
      ? "home"
      : deliveryType;

  const deliveryPrice = selectedWilaya
    ? effectiveDeliveryType === "desk"
      ? selectedWilaya.desk
      : selectedWilaya.home
    : null;

  const productTotal = PRODUCT_PRICE * quantity;
  const grandTotal = deliveryPrice !== null ? productTotal + deliveryPrice : null;

  useGSAP(
    () => {
      gsap.from(".contact-eyebrow, .contact-title, .contact-desc", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef }
  );

  const onSubmit = async (data) => {
    const wilaya = wilayas.find((w) => w.code === data.wilaya);
    const wilayaName = wilaya ? (language === "ar" ? wilaya.ar : wilaya.fr) : data.wilaya;
    const deliveryLabel =
      deliveryType === "desk"
        ? language === "ar" ? "المكتب" : "Bureau (Stopdesk)"
        : language === "ar" ? "المنزل" : "Domicile";

    const lines = [
      `${t.contact.waGreeting}`,
      ``,
      `${t.contact.name}: ${data.name}`,
      `${t.contact.phone}: ${data.phone}`,
      `${language === "ar" ? "الولاية" : "Wilaya"}: ${wilaya?.code} - ${wilayaName}`,
      `${language === "ar" ? "المنطقة / البلدية" : "Région / Commune"}: ${data.region}`,
      `${language === "ar" ? "طريقة التوصيل" : "Livraison"}: ${deliveryLabel}`,
      `${t.contact.size}: ${data.size}`,
      `${t.contact.quantity}: ${data.quantity}`,
      ``,
      `${language === "ar" ? "سعر المنتج" : "Prix produit"}: ${productTotal} DA`,
      `${language === "ar" ? "سعر التوصيل" : "Prix livraison"}: ${deliveryPrice} DA`,
      `${language === "ar" ? "المجموع الكلي" : "Total"}: ${grandTotal} DA`,
    ];

    if (data.message && data.message.trim().length > 0) {
      lines.push(``, `📝 ${t.contact.message}: ${data.message}`);
    }

    const waMessage = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

    setSubmitted(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    reset();
    setDeliveryType("desk");
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
          className="relative p-8 rounded-[5px] bg-altigo-surface/80 backdrop-blur-sm border border-altigo-border shadow-xl shadow-altigo-teal/5 space-y-6"
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
              placeholder={t.contact.phonePlaceholder}
              className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text text-left placeholder:text-left"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{t.contact.errors.phone}</p>}
          </div>

          {/* Wilaya + Region */}
          <div className="grid grid-cols-2 gap-4">
            <WilayaSelect
              register={register}
              error={errors.wilaya && (language === "ar" ? "الرجاء اختيار الولاية" : "Veuillez choisir une wilaya")}
              label={language === "ar" ? "الولاية" : "Wilaya"}
            />

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-altigo-muted">
                <MapPin size={14} className="text-altigo-teal" />
                {language === "ar" ? "المنطقة / البلدية" : "Région / Commune"}
              </label>
              <input
                {...register("region")}
                type="text"
                placeholder={language === "ar" ? "اسم البلدية" : "Nom de la commune"}
                className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text"
              />
              {errors.region && (
                <p className="text-xs text-red-500 mt-1">
                  {language === "ar" ? "الرجاء إدخال المنطقة" : "Veuillez entrer votre région"}
                </p>
              )}
            </div>
          </div>

          {/* Delivery type */}
          <DeliveryTypeSelector
            value={deliveryType}
            onChange={setDeliveryType}
            deskPrice={selectedWilaya?.desk ?? null}
            homePrice={selectedWilaya?.home ?? null}
          />

          {/* Size + Quantity */}
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
                  className="text-xs text-altigo-teal flex items-center gap-1"
                >
                  {showSizeGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {language === "ar" ? "دليل المقاسات" : "Guide"}
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

          {showSizeGuide && (
            <div className="space-y-4 p-4 rounded-xl bg-altigo-bg/70 border border-altigo-border/50">
              <img src={sizeGuideImage} alt="Size Guide" className="w-full max-w-md mx-auto h-auto rounded-lg shadow-md" />
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

          {/* LIVE TOTAL SUMMARY */}
          <div className="rounded-xl border border-altigo-teal/30 bg-altigo-teal/5 p-4 space-y-1.5">
            <div className="flex justify-between text-sm text-altigo-muted">
              <span>{language === "ar" ? "سعر المنتج" : "Prix produit"} ({quantity}x)</span>
              <span>{productTotal} DA</span>
            </div>
            <div className="flex justify-between text-sm text-altigo-muted">
              <span>{language === "ar" ? "التوصيل" : "Livraison"}</span>
              <span>{deliveryPrice !== null ? `${deliveryPrice} DA` : "—"}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-altigo-text pt-1.5 border-t border-altigo-border">
              <span>{language === "ar" ? "المجموع" : "Total"}</span>
              <span>{grandTotal !== null ? `${grandTotal} DA` : "—"}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto sm:min-w-[280px] py-4 text-base font-semibold"
            >
              {submitted ? <>{t.contact.sent}</> : <>{t.contact.submit}</>}
            </PrimaryButton>
          </div>

          <p className="text-xs text-center text-altigo-muted/70">{t.contact.waHint}</p>
        </form>
      </div>
    </section>
  );
}