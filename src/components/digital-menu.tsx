
"use client";

import { Leaf, Vegan, Flame, WheatOff, PlusCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  tags: ("vegetarian" | "vegan" | "gluten-free" | "spicy")[];
}

interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

interface MenuData {
  title: string;
  sections: MenuSection[];
}

interface Appearance {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

interface DigitalMenuProps {
  menu: MenuData;
  appearance: Appearance;
  onAddToCart?: (item: MenuItem) => void;
}

const tagIcons = {
  vegetarian: <Leaf className="h-4 w-4 text-green-600" />,
  vegan: <Vegan className="h-4 w-4 text-blue-600" />,
  "gluten-free": <WheatOff className="h-4 w-4 text-yellow-600" />,
  spicy: <Flame className="h-4 w-4 text-red-600" />,
};

export default function DigitalMenu({ menu, appearance, onAddToCart }: DigitalMenuProps) {
  const menuStyle = {
    backgroundColor: appearance.backgroundColor,
    color: appearance.primaryColor,
    fontFamily: "'Alegreya', serif",
  };

  const sectionHeaderStyle = {
    color: appearance.primaryColor,
  };

  const accentStyle = {
    color: appearance.accentColor,
  };
  
  const itemPriceStyle = {
    color: appearance.accentColor,
  };

  return (
    <div style={menuStyle} className="p-4 sm:p-8 rounded-lg transition-all duration-300 ease-in-out">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline" style={sectionHeaderStyle}>
            {menu.title}
          </h1>
        </header>

        <Accordion type="multiple" defaultValue={menu.sections.map(s => s.id)} className="w-full space-y-6">
          {menu.sections.map((section) => (
            <AccordionItem value={section.id} key={section.id} className="border-b-0">
              <AccordionTrigger className="!no-underline border-b-2 pb-2" style={{borderColor: appearance.primaryColor}}>
                  <h2 className="text-2xl sm:text-3xl font-semibold font-headline" style={sectionHeaderStyle}>
                    {section.title}
                  </h2>
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold" style={sectionHeaderStyle}>{item.name}</h3>
                        <p className="text-sm opacity-80 mt-1">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          {item.tags.map((tag) => (
                            <div key={tag} className="flex items-center gap-1" title={tag.charAt(0).toUpperCase() + tag.slice(1)}>
                               {tagIcons[tag]}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-start gap-4">
                        <p className="text-lg font-semibold whitespace-nowrap" style={itemPriceStyle}>
                          ${item.price}
                        </p>
                        {onAddToCart && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => onAddToCart(item)}>
                            <PlusCircle/>
                            <span className="sr-only">Add to order</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
