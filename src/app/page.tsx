import Link from "next/link";
import {
  MoreHorizontal,
  PlusCircle,
  Eye,
  Pencil,
  QrCode,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";

const menus = [
  {
    id: "1",
    name: "Summer Lunch Menu",
    status: "active",
    itemCount: 15,
    createdAt: "2024-05-15",
  },
  {
    id: "2",
    name: "Weekend Brunch",
    status: "active",
    itemCount: 22,
    createdAt: "2024-05-10",
  },
  {
    id: "3",
    name: "Dinner Specials",
    status: "draft",
    itemCount: 8,
    createdAt: "2024-05-01",
  },
  {
    id: "4",
    name: "Tasting Menu",
    status: "archived",
    itemCount: 12,
    createdAt: "2024-04-20",
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl font-headline">My Menus</h1>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/upload">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Create Menu
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Menu Overview</CardTitle>
            <CardDescription>
              Manage your restaurant's digital menus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Items</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.map((menu) => (
                  <TableRow key={menu.id}>
                    <TableCell className="font-medium">{menu.name}</TableCell>
                    <TableCell>
                      <Badge variant={menu.status === 'active' ? 'default' : 'secondary'} className={menu.status === 'active' ? 'bg-green-600/20 text-green-700 dark:bg-green-500/20 dark:text-green-400' : ''}>
                        {menu.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {menu.itemCount}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {menu.createdAt}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Link href={`/view/${menu.id}`} passHref>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/menu/${menu.id}`} passHref>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                           <Link href={`/menu/${menu.id}#qrcode`} passHref>
                            <DropdownMenuItem>
                              <QrCode className="mr-2 h-4 w-4" />
                              QR Code
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
