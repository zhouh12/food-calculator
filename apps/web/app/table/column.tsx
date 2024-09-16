"use client";

import { Button } from "@core/ui/components/button";
import { Input } from "@core/ui/components/input";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
        </Button>
      );
    },
    // convert below to input field
    cell: ({ row }) => {
      const [amount, setAmount] = useState<number>(row.getValue("amount"));

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setAmount(newValue);
      };

      return (
        <Input className="text-black" value={amount} onChange={handleChange} />
      );
    },
    // sortingFn: "alphanumeric",
  },
];
