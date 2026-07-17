import React from 'react';

export default function PrimaryButton({ children, onClick, href, className = '', ...props }) {
  const baseClasses = `group flex items-center justify-center gap-3 bg-altigo-teal hover:bg-transparent text-altigo-bg hover:text-altigo-teal border-2 border-altigo-teal font-semibold uppercase tracking-[0.15em] text-xs py-2.5 px-6 transition-all duration-300 rounded-[5px] w-full sm:w-auto ${className}`;

  const content = (
    <>
      <svg
        className="w-2 h-2 fill-current transform transition-transform duration-300 group-hover:-translate-x-1.5"
        viewBox="0 0 100 100"
      >
        <polygon points="100,0 0,50 100,100" />
      </svg>

      <span>{children}</span>

      <svg
        className="w-2 h-2 fill-current transform transition-transform duration-300 group-hover:translate-x-1.5"
        viewBox="0 0 100 100"
      >
        <polygon points="0,0 100,50 0,100" />
      </svg>
    </>
  );

  if (href) {
    return (
      <a href={href} dir="ltr" className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} dir="ltr" className={baseClasses} {...props}>
      {content}
    </button>
  );
}