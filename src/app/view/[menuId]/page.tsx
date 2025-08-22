
"use client";

import { useState, useEffect } from "react";
import DigitalMenu from "@/components/digital-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bot, Languages, MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { askAboutDish } from "@/ai/flows/ask-about-dish-flow";
import { translateMenu } from "@/ai/flows/translate-menu-flow";

const mockMenu = {
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
        {
          id: "item3",
          name: "Stuffed Mushrooms",
          description: "Mushrooms filled with cheese, breadcrumbs and herbs.",
          price: "10.00",
          tags: ["vegetarian"],
        }
      ],
    },
    {
      id: "sec2",
      title: "Main Courses",
      items: [
        {
          id: "item4",
          name: "Pasta Primavera",
          description:
            "Pasta with fresh spring vegetables in a light cream sauce.",
          price: "17.00",
          tags: ["vegetarian"],
        },
        {
          id: "item5",
          name: "Grilled Salmon",
          description: "Salmon fillet served with asparagus and roasted potatoes.",
          price: "24.00",
          tags: ["gluten-free"],
        },
         {
          id: "item6",
          name: "Ribeye Steak",
          description: "12oz Ribeye, cooked to perfection, with a side of mashed potatoes.",
          price: "32.00",
          tags: [],
        },
        {
          id: "item7",
          name: "Shakshuka",
          description: "Eggs poached in a sauce of tomatoes, chili peppers, and onions.",
          price: "15.00",
          tags: ["vegetarian", "spicy"],
        }
      ],
    },
     {
      id: "sec3",
      title: "Desserts",
      items: [
        {
          id: "item8",
          name: "Tiramisu",
          description:
            "Classic Italian dessert with coffee, mascarpone, and cocoa.",
          price: "8.00",
          tags: ["vegetarian"],
        },
        {
          id: "item9",
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with a gooey center, served with vanilla ice cream.",
          price: "9.00",
          tags: ["vegetarian"],
        },
      ],
    },
  ],
};

const mockAppearance = {
  primaryColor: "#0046FF",
  backgroundColor: "#F5F5DC",
  accentColor: "#FF8040",
};

const mockFaqs = [
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

type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};


export default function ViewMenuPage({ params }: { params: { menuId: string } }) {
  const [originalMenu] = useState(mockMenu);
  const [menu, setMenu] = useState(mockMenu);
  const [appearance] = useState(mockAppearance);
  const [faqs] = useState(mockFaqs);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const pageStyle = {
    backgroundColor: appearance.backgroundColor
  }

  const handleLanguageChange = async (language: string) => {
    if (language === 'en') {
      setMenu(originalMenu);
      return;
    }
    setIsTranslating(true);
    try {
      const translatedMenu = await translateMenu({
        menu: JSON.stringify(originalMenu),
        language
      });
      setMenu(translatedMenu);
    } catch (error) {
      console.error("Error translating menu:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not translate the menu.",
      });
    } finally {
      setIsTranslating(false);
    }
  }

  const addToCart = (item: {id: string, name: string, price: string}) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return currentCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setIsAsking(true);
    setAiAnswer("");
    try {
      const result = await askAboutDish({
        menu: JSON.stringify(menu),
        faq: JSON.stringify(faqs),
        question: aiQuestion
      });
      setAiAnswer(result.answer);
    } catch (error) {
      console.error("Error asking AI:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get an answer from the AI.",
      });
    } finally {
      setIsAsking(false);
    }
  };


  return (
    <div className="relative">
      <main className="min-h-screen w-full transition-colors duration-300 pb-32" style={pageStyle}>
        { isTranslating ? <div className="p-8 text-center">Translating menu...</div> : <DigitalMenu menu={menu} appearance={appearance} onAddToCart={addToCart} /> }
      </main>

       <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
             <Sheet open={isAiSheetOpen} onOpenChange={setIsAiSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <Bot className="mr-2" /> Ask AI
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Ask about the menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">Example: "What is Shakshuka?" or "What are the vegan options?"</p>
                    <Textarea 
                      placeholder="Type your question here..."
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                    />
                    <Button onClick={handleAskAI} disabled={isAsking} className="w-full">
                      {isAsking ? "Thinking..." : "Ask"}
                    </Button>
                    {aiAnswer && (
                      <div className="p-4 bg-muted rounded-lg text-sm">
                        {aiAnswer}
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

            <Select onValueChange={handleLanguageChange} defaultValue="en">
              <SelectTrigger className="w-[150px]">
                <Languages className="mr-2"/>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                 <Button className="relative flex-grow">
                  <ShoppingCart className="mr-2" />
                  View Order
                  {totalItems > 0 && <Badge variant="secondary" className="absolute -top-2 -right-2">{totalItems}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Order</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground">Your cart is empty.</p>
                  ) : (
                    <div className="space-y-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">${item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.id)}>
                                <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                             <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => addToCart(item)}>
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <SheetFooter className="mt-8">
                  <div className="w-full space-y-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" disabled={cart.length === 0}>Place Order</Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
           
          </div>
       </footer>
    </div>
  );
}
