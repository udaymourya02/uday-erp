'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import api from '@/lib/api';

interface ProductionOrder {
  id: number;
  product: string;
  quantity: number;
  progress: number;
  status: string;
}

export function ProductionModule() {
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProductionOrders = async () => {
      try {
        const response = await api.get('/production-orders'); // Adjust the endpoint as necessary
        setProductionOrders(response.data);
      } catch (error) {
        console.error('Error fetching production orders:', error);
      }
    };

    fetchProductionOrders();
  }, []);

  const filteredOrders = productionOrders.filter((order) =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {productionOrders.filter((order) => order.status === "In Progress").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {productionOrders.filter((order) => order.status === "Completed").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {productionOrders.filter((order) => order.status === "Scheduled").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Units in Production</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {productionOrders.reduce((sum, order) => sum + order.quantity, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search Production Orders</Label>
        <Input
          id="search"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                <Progress value={order.progress} className="w-[60%]" />
              </TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end space-x-2">
        <Button>Create Work Order</Button>
        <Button>Update Production Schedule</Button>
        <Button>View Performance Reports</Button>
      </div>
    </div>
  );
}