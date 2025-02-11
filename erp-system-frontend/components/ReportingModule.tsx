'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from '@/lib/api';

interface SalesData {
  month: string;
  sales: number;
}

export function ReportingModule() {
  const [reportType, setReportType] = useState("sales");
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await api.get('/sales-data'); // Adjust the endpoint as necessary
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const totalSales = salesData.reduce((sum, data) => sum + data.sales, 0);
  const averageSales = Math.round(totalSales / salesData.length);
  const highestMonth = salesData.reduce((max, data) => (data.sales > max.sales ? data : max), salesData[0]);
  const lowestMonth = salesData.reduce((min, data) => (data.sales < min.sales ? data : min), salesData[0]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalSales}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${averageSales}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Highest Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{highestMonth.month}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lowest Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{lowestMonth.month}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="report-type">Select Report Type</Label>
        <Select onValueChange={setReportType} defaultValue={reportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales Report</SelectItem>
            <SelectItem value="inventory">Inventory Report</SelectItem>
            <SelectItem value="production">Production Report</SelectItem>
            <SelectItem value="finance">Financial Report</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button>Export as PDF</Button>
        <Button>Export as Excel</Button>
        <Button>Customize View</Button>
      </div>
    </div>
  );
}