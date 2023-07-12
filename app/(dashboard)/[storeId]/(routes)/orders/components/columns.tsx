"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  address: string;
  phone: string;
  createdAt: string;
  totalPrice: string;
  products: string
  isPaid: boolean;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];