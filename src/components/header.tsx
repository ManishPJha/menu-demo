import Link from "next/link";
import { UtensilsCrossed, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base font-headline"
      >
        <UtensilsCrossed className="h-6 w-6 text-primary" />
        <span className="text-xl">Alna Assistance</span>
      </Link>
      <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Menus
        </Link>
        <Link
          href="/orders"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Orders
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
