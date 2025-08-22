
"use client";

import { useState } from "react";
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Leaf,
  Vegan,
  Flame,
  WheatOff,
  Download,
  Palette,
  FileText,
  QrCode as QrCodeIcon,
  HelpCircle,
} from "lucide-react";
import Header from "@/components/header";
import DigitalMenu from "@/components/digital-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const initialMenu = {
  title: "Summer Lunch Menu",
  sections: [
    {
      id: "sec1",
      title: "Appetizers",
      items: [
        {
          id: "item1",
          name: "Bruschetta",
          description:
            "Grilled bread topped with fresh tomatoes, garlic, and basil.",
          price: "9.50",
          tags: ["vegetarian", "vegan"],
        },
        {
          id: "item2",
          name: "Spicy Calamari",
          description: "Fried calamari with a spicy marinara dipping sauce.",
          price: "12.00",
          tags: ["spicy"],
        },
      ],
    },
    {
      id: "sec2",
      title: "Main Courses",
      items: [
        {
          id: "item3",
          name: "Pasta Primavera",
          description:
            "Pasta with fresh spring vegetables in a light cream sauce.",
          price: "17.00",
          tags: ["vegetarian"],
        },
        {
          id: "item4",
          name: "Grilled Salmon",
          description: "Salmon fillet served with asparagus and roasted potatoes.",
          price: "24.00",
          tags: ["gluten-free"],
        },
      ],
    },
  ],
};

const initialAppearance = {
  primaryColor: "#0046FF",
  backgroundColor: "#F5F5DC",
  accentColor: "#FF8040",
};

const initialFaqs = [
  {
    id: "faq1",
    question: "Do you offer catering?",
    answer: "Yes, we offer catering for events of all sizes. Please contact us for a custom quote."
  },
  {
    id: "faq2",
    question: "Are reservations required?",
    answer: "Reservations are highly recommended, especially on weekends. You can book a table through our website."
  }
];

export default function Editor({ menuId }: { menuId: string }) {
  const [menu, setMenu] = useState(initialMenu);
  const [appearance, setAppearance] = useState(initialAppearance);
  const [faqs, setFaqs] = useState(initialFaqs);

  const handleAddItem = (sectionId: string) => {
    const newMenu = { ...menu };
    const section = newMenu.sections.find((s) => s.id === sectionId);
    if (section) {
      section.items.push({
        id: `item${Date.now()}`,
        name: "New Item",
        description: "",
        price: "0.00",
        tags: [],
      });
      setMenu(newMenu);
    }
  };
  
  const handleRemoveItem = (sectionId: string, itemId: string) => {
    const newMenu = { ...menu };
    const section = newMenu.sections.find((s) => s.id === sectionId);
    if(section) {
        section.items = section.items.filter(item => item.id !== itemId);
        setMenu(newMenu);
    }
  };

  const handleItemChange = (sectionId: string, itemId: string, field: string, value: string) => {
    const newMenu = { ...menu };
    const section = newMenu.sections.find(s => s.id === sectionId);
    if (section) {
      const item = section.items.find(i => i.id === itemId);
      if (item) {
        (item as any)[field] = value;
        setMenu(newMenu);
      }
    }
  };

  const handleTagChange = (sectionId: string, itemId: string, tag: string, checked: boolean) => {
    const newMenu = { ...menu };
    const section = newMenu.sections.find(s => s.id === sectionId);
    if (section) {
      const item = section.items.find(i => i.id === itemId);
      if (item) {
        if (checked) {
          if (!item.tags.includes(tag as any)) {
            item.tags.push(tag as any);
          }
        } else {
          item.tags = item.tags.filter(t => t !== tag);
        }
        setMenu(newMenu);
      }
    }
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, {id: `faq${Date.now()}`, question: "New Question", answer: ""}]);
  };

  const handleRemoveFaq = (faqId: string) => {
    setFaqs(faqs.filter(faq => faq.id !== faqId));
  };

  const handleFaqChange = (faqId: string, field: 'question' | 'answer', value: string) => {
    setFaqs(faqs.map(faq => faq.id === faqId ? {...faq, [field]: value} : faq));
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
        <div className="md:col-span-1 xl:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Menu Editor</CardTitle>
              <CardDescription>
                Customize your menu content and appearance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content"><FileText className="w-4 h-4 mr-1"/>Content</TabsTrigger>
                  <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-1"/>Appearance</TabsTrigger>
                  <TabsTrigger value="faq"><HelpCircle className="w-4 h-4 mr-1"/>FAQ</TabsTrigger>
                  <TabsTrigger value="qrcode"><QrCodeIcon className="w-4 h-4 mr-1"/>QR Code</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="menuTitle" className="text-lg font-headline">Menu Title</Label>
                      <Input
                        id="menuTitle"
                        value={menu.title}
                        onChange={(e) =>
                          setMenu({ ...menu, title: e.target.value })
                        }
                        className="text-lg"
                      />
                    </div>
                    <Separator />
                    <Accordion type="single" collapsible className="w-full" defaultValue="sec1">
                      {menu.sections.map((section) => (
                        <AccordionItem value={section.id} key={section.id}>
                          <AccordionTrigger className="text-base font-headline">
                             <Input
                                value={section.title}
                                onChange={(e) => {
                                  const newSections = menu.sections.map(s => s.id === section.id ? {...s, title: e.target.value} : s)
                                  setMenu({...menu, sections: newSections})
                                }}
                                className="text-base font-semibold border-none focus:ring-0 shadow-none p-0"
                              />
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pl-2">
                            {section.items.map((item, itemIndex) => (
                              <Card key={item.id}>
                                <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                  <div className="flex-grow">
                                  <Input
                                    placeholder="Item Name"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(section.id, item.id, 'name', e.target.value)}
                                    className="font-semibold"
                                  />
                                  </div>
                                  <Button variant="ghost" size="icon" className="ml-2" onClick={() => handleRemoveItem(section.id, item.id)}>
                                    <Trash2 className="w-4 h-4 text-destructive"/>
                                  </Button>
                                </div>
                                  <Textarea
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(section.id, item.id, 'description', e.target.value)}
                                  />
                                  <Input 
                                    placeholder="Price" 
                                    value={item.price} 
                                    onChange={(e) => handleItemChange(section.id, item.id, 'price', e.target.value)}
                                    className="w-1/3" />
                                  <div className="flex items-center space-x-4 pt-2">
                                     <div className="flex items-center space-x-2">
                                      <Checkbox id={`veg-${item.id}`} checked={item.tags.includes('vegetarian')} onCheckedChange={(checked) => handleTagChange(section.id, item.id, 'vegetarian', !!checked)}/>
                                      <Label htmlFor={`veg-${item.id}`} className="flex items-center gap-1"><Leaf className="w-4 h-4 text-green-600"/> Vegetarian</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox id={`vegan-${item.id}`} checked={item.tags.includes('vegan')} onCheckedChange={(checked) => handleTagChange(section.id, item.id, 'vegan', !!checked)}/>
                                      <Label htmlFor={`vegan-${item.id}`} className="flex items-center gap-1"><Vegan className="w-4 h-4 text-blue-600"/> Vegan</Label>
                                    </div>
                                     <div className="flex items-center space-x-2">
                                      <Checkbox id={`gf-${item.id}`} checked={item.tags.includes('gluten-free')} onCheckedChange={(checked) => handleTagChange(section.id, item.id, 'gluten-free', !!checked)}/>
                                      <Label htmlFor={`gf-${item.id}`} className="flex items-center gap-1"><WheatOff className="w-4 h-4 text-yellow-600"/> Gluten-Free</Label>
                                    </div>
                                     <div className="flex items-center space-x-2">
                                      <Checkbox id={`spicy-${item.id}`} checked={item.tags.includes('spicy')} onCheckedChange={(checked) => handleTagChange(section.id, item.id, 'spicy', !!checked)}/>
                                      <Label htmlFor={`spicy-${item.id}`} className="flex items-center gap-1"><Flame className="w-4 h-4 text-red-600"/> Spicy</Label>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                             <Button variant="outline" size="sm" onClick={() => handleAddItem(section.id)}>
                                <Plus className="w-4 h-4 mr-2"/> Add Item
                              </Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
                <TabsContent value="appearance" className="mt-4">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold font-headline">Brand Colors</h3>
                     <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="primaryColor"
                            type="color"
                            value={appearance.primaryColor}
                            className="w-12 h-10 p-1"
                            onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})}
                          />
                          <Input value={appearance.primaryColor} onChange={(e) => setAppearance({...appearance, primaryColor: e.target.value})} />
                        </div>
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="bgColor">Background Color</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="bgColor"
                            type="color"
                            value={appearance.backgroundColor}
                            className="w-12 h-10 p-1"
                            onChange={(e) => setAppearance({...appearance, backgroundColor: e.target.value})}
                          />
                          <Input value={appearance.backgroundColor} onChange={(e) => setAppearance({...appearance, backgroundColor: e.target.value})} />
                        </div>
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="accentColor">Accent Color</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="accentColor"
                            type="color"
                            value={appearance.accentColor}
                            className="w-12 h-10 p-1"
                            onChange={(e) => setAppearance({...appearance, accentColor: e.target.value})}
                          />
                           <Input value={appearance.accentColor} onChange={(e) => setAppearance({...appearance, accentColor: e.target.value})} />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                 <TabsContent value="faq" className="mt-4">
                   <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold font-headline">Frequently Asked Questions</h3>
                        <p className="text-sm text-muted-foreground">Add FAQs to help the AI assistant answer common questions.</p>
                      </div>
                       <Button variant="outline" size="sm" onClick={handleAddFaq}>
                        <Plus className="w-4 h-4 mr-2"/> Add FAQ
                      </Button>
                    </div>
                    <Separator />
                     <Accordion type="single" collapsible className="w-full">
                       {faqs.map(faq => (
                         <AccordionItem value={faq.id} key={faq.id}>
                           <AccordionTrigger>
                              <Input
                                value={faq.question}
                                onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)}
                                className="font-semibold border-none focus:ring-0 shadow-none p-0"
                              />
                           </AccordionTrigger>
                           <AccordionContent className="space-y-2">
                             <Textarea
                                placeholder="Answer..."
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(faq.id, 'answer', e.target.value)}
                              />
                              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleRemoveFaq(faq.id)}>
                                <Trash2 className="w-4 h-4 mr-2"/> Remove FAQ
                              </Button>
                           </AccordionContent>
                         </AccordionItem>
                       ))}
                     </Accordion>
                   </div>
                </TabsContent>
                <TabsContent value="qrcode" id="qrcode" className="mt-4">
                   <Card className="text-center">
                    <CardHeader>
                      <CardTitle>Your Menu QR Code</CardTitle>
                      <CardDescription>Customers can scan this code to view your digital menu.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                       <Image src="https://placehold.co/256x256.png" width={256} height={256} alt="QR Code" data-ai-hint="qr code"/>
                       <p className="text-sm text-muted-foreground">URL: /view/{menuId}</p>
                       <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download QR Code
                       </Button>
                    </CardContent>
                   </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 xl:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                This is how your menu will look to customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100vh-12rem)] overflow-auto rounded-lg border border-muted">
              <DigitalMenu menu={menu} appearance={appearance} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
