import { Building2, Home } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function DeliveryTypeSelector({ value, onChange, deskPrice, homePrice }) {
  const { t, language } = useLanguage();

  const options = [
    {
      key: "desk",
      icon: Building2,
      label: language === "ar" ? "المكتب" : "Bureau (Stopdesk)",
      price: deskPrice,
    },
    {
      key: "home",
      icon: Home,
      label: language === "ar" ? "المنزل" : "Domicile",
      price: homePrice,
    },
  ];

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-altigo-muted">
        {language === "ar" ? "طريقة التوصيل" : "Mode de livraison"}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isActive = value === opt.key;
          const Icon = opt.icon;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                isActive
                  ? "border-altigo-teal bg-altigo-teal/10"
                  : "border-altigo-border bg-altigo-bg hover:border-altigo-teal/40"
              }`}
            >
              <Icon
                size={20}
                className={isActive ? "text-altigo-teal" : "text-altigo-muted"}
              />
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-altigo-text" : "text-altigo-muted"
                }`}
              >
                {opt.label}
              </span>
              <span className="text-xs text-altigo-muted">
                {opt.price !== null ? `${opt.price} DA` : "—"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}