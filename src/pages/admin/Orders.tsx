
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Search } from "lucide-react";
import { useState } from "react";

// Mock order data
const orders = [
  { id: "ORD-001", customer: "John Doe", date: "2023-11-01", status: "completed", total: 1299.99 },
  { id: "ORD-002", customer: "Jane Smith", date: "2023-11-02", status: "processing", total: 599.50 },
  { id: "ORD-003", customer: "Robert Johnson", date: "2023-11-03", status: "shipped", total: 249.99 },
  { id: "ORD-004", customer: "Emily Williams", date: "2023-11-04", status: "pending", total: 879.95 },
  { id: "ORD-005", customer: "Michael Brown", date: "2023-11-05", status: "completed", total: 1599.99 },
  { id: "ORD-006", customer: "Sarah Davis", date: "2023-11-06", status: "cancelled", total: 749.50 },
  { id: "ORD-007", customer: "David Miller", date: "2023-11-07", status: "shipped", total: 329.99 },
  { id: "ORD-008", customer: "Jessica Wilson", date: "2023-11-08", status: "processing", total: 459.95 }
];

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>;
      case "shipped":
        return <Badge className="bg-yellow-500">Shipped</Badge>;
      case "pending":
        return <Badge>Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer name..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
