'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/lib/api';

interface SalesOrder {
  id: number;
  customer: string;
  total: number;
  status: string;
}

export function SalesModule() {
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        const response = await api.get('/sales-orders'); // Adjust the endpoint as necessary
        setSalesOrders(response.data);
      } catch (error) {
        console.error('Error fetching sales orders:', error);
      }
    };

    fetchSalesOrders();
  }, []);

  const filteredOrders = salesOrders.filter((order) => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${salesOrders.reduce((sum, order) => sum + order.total, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{salesOrders.filter((order) => order.status === "Pending").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipped Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{salesOrders.filter((order) => order.status === "Shipped").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivered Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{salesOrders.filter((order) => order.status === "Delivered").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search Orders</Label>
        <Input
          id="search"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end space-x-2">
        <Button>Create New Order</Button>
        <Button>Generate Invoice</Button>
        <Button>Manage Shipping</Button>
      </div>
    </div>
  );
}