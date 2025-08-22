
"use client";

import { useState } from 'react';
import Link from "next/link";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
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
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";

type OrderStatus = "Pending" | "In Progress" | "Completed" | "Cancelled";

const initialOrders = [
  {
    id: "ORD001",
    table: "Table 5",
    status: "Completed" as OrderStatus,
    itemCount: 3,
    total: "45.50",
    createdAt: "2024-05-20 12:30 PM",
  },
  {
    id: "ORD002",
    name: "Takeaway",
    status: "In Progress" as OrderStatus,
    itemCount: 2,
    total: "22.00",
    createdAt: "2024-05-20 12:35 PM",
  },
  {
    id: "ORD003",
    table: "Table 2",
    status: "Pending" as OrderStatus,
    itemCount: 5,
    total: "89.75",
    createdAt: "2024-05-20 12:40 PM",
  },
  {
    id: "ORD004",
    table: "Table 8",
    status: "Cancelled" as OrderStatus,
    itemCount: 1,
    total: "12.00",
    createdAt: "2024-05-20 12:41 PM",
  },
  {
    id: "ORD005",
    name: "Takeaway",
    status: "Completed" as OrderStatus,
    itemCount: 4,
    total: "56.25",
    createdAt: "2024-05-20 12:45 PM",
  },
];

const statusColors: Record<OrderStatus, string> = {
    "Pending": "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    "In Progress": "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    "Completed": "bg-green-600/20 text-green-700 dark:text-green-400",
    "Cancelled": "bg-red-600/20 text-red-700 dark:text-red-400",
}


export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };


  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl font-headline">Order Management</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Current Orders</CardTitle>
            <CardDescription>
              View and manage all incoming and past orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Total</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Placed At
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {order.table ? `Dine-in: ${order.table}` : 'Takeaway'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={'outline'} className={`${statusColors[order.status]}`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ${order.total}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt}
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
                          <DropdownMenuItem>
                              <ArrowUpRight className="mr-2 h-4 w-4" />
                              View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')}>Pending</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'In Progress')}>In Progress</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Completed')}>Completed</DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Cancelled')} className="text-destructive">Cancelled</DropdownMenuItem>
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
