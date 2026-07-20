import { MapPin } from "lucide-react";
import wilayas from "../../data/wilaya";
import { useLanguage } from "../../context/LanguageContext";

export default function WilayaSelect({ register, error, label }) {
  const { language } = useLanguage();

  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-altigo-muted">
        <MapPin size={14} className="text-altigo-teal" />
        {label}
      </label>
      <select
        {...register("wilaya")}
        defaultValue=""
        className="w-full px-5 py-3.5 rounded-xl bg-altigo-bg border border-altigo-border focus:ring-2 focus:ring-altigo-teal/20 outline-none transition-all duration-300 text-sm text-altigo-text appearance-none"
      >
        <option value="" disabled>
          {language === "ar" ? "اختر الولاية" : "Choisir la wilaya"}
        </option>
        {wilayas.map((w) => (
          <option key={w.code} value={w.code}>
            {w.code} - {language === "ar" ? w.ar : w.fr}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}