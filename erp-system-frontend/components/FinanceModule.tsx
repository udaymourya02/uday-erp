'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/lib/api';

interface FinancialTransaction {
  id: number;
  type: "Receivable" | "Payable";
  description: string;
  amount: number;
  status: "Pending" | "Paid" | "Received";
}

export function FinanceModule() {
  const [financialTransactions, setFinancialTransactions] = useState<FinancialTransaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFinancialTransactions = async () => {
      try {
        const response = await api.get('/financial-transactions'); // Adjust the endpoint as necessary
        setFinancialTransactions(response.data);
      } catch (error) {
        console.error('Error fetching financial transactions:', error);
      }
    };

    fetchFinancialTransactions();
  }, []);

  const filteredTransactions = financialTransactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalReceivables = financialTransactions
    .filter((t) => t.type === "Receivable")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayables = financialTransactions
    .filter((t) => t.type === "Payable")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Receivables</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalReceivables}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Payables</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalPayables}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Position</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalReceivables - totalPayables}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{financialTransactions.filter((t) => t.status === "Pending").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search Transactions</Label>
        <Input
          id="search"
          placeholder="Search by description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                ${Math.abs(transaction.amount)}
              </TableCell>
              <TableCell>{transaction.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end space-x-2">
        <Button>Record Transaction</Button>
        <Button>Generate Financial Report</Button>
        <Button>Manage Ledger</Button>
      </div>
    </div>
  );
}