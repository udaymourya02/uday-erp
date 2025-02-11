'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/lib/api';

interface InventoryItem {
  _id: string;
  name: string;
  type: string;
  quantity: number;
  threshold: number;
}

export function InventoryModule() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get('/inventory');
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  const filteredItems = inventoryItems.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventoryItems.filter((item) => item.quantity < item.threshold);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{inventoryItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">{lowStockItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Raw Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{inventoryItems.filter((item) => item.type === "Raw Material").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Finished Goods</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {inventoryItems.filter((item) => item.type === "Finished Goods").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search Inventory</Label>
        <Input
          id="search"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                {item.quantity < item.threshold ? (
                  <span className="text-red-500">Low Stock</span>
                ) : (
                  <span className="text-green-500">In Stock</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end space-x-2">
        <Button>Add New Item</Button>
        <Button>Generate Inventory Report</Button>
      </div>
    </div>
  );
}