"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryModule } from "@/components/InventoryModule"
import { SalesModule } from "@/components/SalesModule"
import { ProductionModule } from "@/components/ProductionModule"
import { FinanceModule } from "@/components/FinanceModule"
import { HRModule } from "@/components/HRModule"
import { ReportingModule } from "@/components/ReportingModule"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inventory")

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <InventoryModule />
        </TabsContent>
        <TabsContent value="sales">
          <SalesModule />
        </TabsContent>
        <TabsContent value="production">
          <ProductionModule />
        </TabsContent>
        <TabsContent value="finance">
          <FinanceModule />
        </TabsContent>
        <TabsContent value="hr">
          <HRModule />
        </TabsContent>
        <TabsContent value="reporting">
          <ReportingModule />
        </TabsContent>
      </Tabs>
    </div>
  )
}

