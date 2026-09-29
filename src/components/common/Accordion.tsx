import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-brand-navy text-sm md:text-base pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-brand-teal flex-shrink-0 transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-4 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-3">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
