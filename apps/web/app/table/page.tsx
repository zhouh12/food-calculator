"use client";

import { useEffect, useState } from "react";
import { columns, Payment } from "./column";
import { DataTable } from "./table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@core/ui/components/button";
import { Input } from "@core/ui/components/input";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      amount: 1000,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "2",
      amount: 200,
      status: "pending",
      email: "1@example.com",
    },
    {
      id: "3",
      amount: 3000,
      status: "pending",
      email: "2@example.com",
    },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  const handleAmountChange = (id: string, newAmount: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, amount: newAmount } : item
      )
    );
  };

  const columns: ColumnDef<Payment>[] = [
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
          handleAmountChange(row.original.id, newValue);
        };

        return (
          <Input
            className="text-black"
            value={amount}
            onChange={handleChange}
          />
        );
      },
      // sortingFn: "alphanumeric",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
