import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag, Clock, Percent, Award, CircleDollarSign, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: number;
  name: string;
  discount: string;
};

type Promotion = {
  id: number;
  title: string;
  description: string;
  code?: string;
  discountType: "percentage" | "fixed" | "bundle";
  discountValue?: number;
  minimumPurchase?: number;
  validUntil: string;
  type: "seasonal" | "flash" | "special" | "product";
  appliesTo: "all" | "category" | "products" | "bundles";
  categoryName?: string;
  image: string;
  products?: Product[];
};

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get up to 40% off on all summer gadgets and accessories.",
    code: "SUMMER40",
    discountType: "percentage",
    discountValue: 40,
    validUntil: "2023-08-31",
    type: "seasonal",
    appliesTo: "category",
    categoryName: "Summer Electronics",
    image: "/placeholder.svg",
    products: [
      { id: 1, name: "Waterproof Bluetooth Speaker", discount: "40%" },
      { id: 2, name: "Portable Power Bank 20000mAh", discount: "35%" },
      { id: 3, name: "Wireless Earbuds", discount: "30%" },
    ],
  },
  {
    id: 2,
    title: "New Customer Special",
    description: "Get $15 off your first purchase over $100.",
    code: "WELCOME15",
    discountType: "fixed",
    discountValue: 15,
    minimumPurchase: 100,
    validUntil: "2023-12-31",
    type: "special",
    appliesTo: "all",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Smartphone Bonanza",
    description: "All premium smartphones on sale with free accessories bundle.",
    code: "PHONE23",
    discountType: "bundle",
    validUntil: "2023-09-15",
    type: "product",
    appliesTo: "category",
    categoryName: "Smartphones",
    image: "/placeholder.svg",
    products: [
      { id: 4, name: "Galaxy S23 Ultra", discount: "10% + Free Case" },
      { id: 5, name: "iPhone 14 Pro", discount: "8% + Free AirPods" },
      { id: 6, name: "Google Pixel 7 Pro", discount: "15% + Free Charger" },
    ],
  },
  {
    id: 4,
    title: "Flash Sale - 24 Hours Only",
    description: "Limited time offer with massive discounts on selected products.",
    code: "FLASH24",
    discountType: "percentage",
    discountValue: 50,
    validUntil: "2023-07-15",
    type: "flash",
    appliesTo: "products",
    image: "/placeholder.svg",
    products: [
      { id: 7, name: "Gaming Keyboard RGB", discount: "50%" },
      { id: 8, name: "4K Monitor 32-inch", discount: "45%" },
      { id: 9, name: "Wireless Gaming Mouse", discount: "50%" },
    ],
  },
  {
    id: 5,
    title: "Holiday Bundle",
    description: "Special holiday gift bundles with big savings on tech gift sets.",
    code: "HOLIDAY2023",
    discountType: "bundle",
    validUntil: "2023-12-25",
    type: "seasonal",
    appliesTo: "bundles",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Loyalty Reward",
    description: "Exclusive offer for our loyal customers. 20% off any purchase.",
    code: "LOYAL20",
    discountType: "percentage",
    discountValue: 20,
    validUntil: "2023-12-31",
    type: "special",
    appliesTo: "all",
    image: "/placeholder.svg",
  },
];

const Promotions = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredPromotions = activeTab === "all" 
    ? promotions 
    : promotions.filter(promo => promo.type === activeTab);
  
  return (
    <div className="container px-4 mx-auto py-16 md:py-24">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Special <span className="text-primary">Offers</span></h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover amazing deals and discounts on your favorite tech products
        </p>
      </section>
      
      <Tabs defaultValue="all" className="mb-16" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Tag size={16} />
              <span>All Offers</span>
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="gap-2">
              <Percent size={16} />
              <span>Seasonal</span>
            </TabsTrigger>
            <TabsTrigger value="flash" className="gap-2">
              <Clock size={16} />
              <span>Flash Sales</span>
            </TabsTrigger>
            <TabsTrigger value="special" className="gap-2">
              <Award size={16} />
              <span>Special</span>
            </TabsTrigger>
            <TabsTrigger value="product" className="gap-2">
              <Gift size={16} />
              <span>Product</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <PromotionsList promotions={filteredPromotions} />
        </TabsContent>
        <TabsContent value="seasonal" className="mt-0">
          <PromotionsList promotions={filteredPromotions} />
        </TabsContent>
        <TabsContent value="flash" className="mt-0">
          <PromotionsList promotions={filteredPromotions} />
        </TabsContent>
        <TabsContent value="special" className="mt-0">
          <PromotionsList promotions={filteredPromotions} />
        </TabsContent>
        <TabsContent value="product" className="mt-0">
          <PromotionsList promotions={filteredPromotions} />
        </TabsContent>
      </Tabs>
      
      <section className="bg-primary/10 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Exclusive Offers</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new promotions, flash sales, and exclusive discounts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="px-4 py-2 rounded-md border flex-1"
          />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  );
};

const PromotionsList = ({ promotions }: { promotions: Promotion[] }) => {
  if (promotions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No promotions available in this category at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promo) => (
        <PromotionCard key={promo.id} promotion={promo} />
      ))}
    </div>
  );
};

const PromotionCard = ({ promotion }: { promotion: Promotion }) => {
  const isExpiringSoon = new Date(promotion.validUntil) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="h-48 overflow-hidden bg-muted/30">
        <img 
          src={promotion.image} 
          alt={promotion.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{promotion.title}</CardTitle>
            <CardDescription className="mt-2">{promotion.description}</CardDescription>
          </div>
          {promotion.discountType === "percentage" && (
            <Badge variant="destructive" className="text-lg px-3 py-1">
              {promotion.discountValue}% OFF
            </Badge>
          )}
          {promotion.discountType === "fixed" && (
            <Badge variant="destructive" className="text-lg px-3 py-1">
              ${promotion.discountValue} OFF
            </Badge>
          )}
          {promotion.discountType === "bundle" && (
            <Badge variant="secondary" className="text-lg px-3 py-1">
              BUNDLE
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {promotion.products && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Included Products:</h4>
            <ul className="space-y-1">
              {promotion.products.map((product) => (
                <li key={product.id} className="flex justify-between">
                  <span>{product.name}</span>
                  <span className="text-primary">{product.discount}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {promotion.code && (
          <div className="mt-4 bg-muted/30 p-3 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleDollarSign size={18} className="text-primary" />
              <span className="font-medium">Promo Code:</span>
            </div>
            <code className="bg-background px-3 py-1 rounded border">{promotion.code}</code>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto pt-4 flex justify-between">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock size={16} />
          <span>
            {isExpiringSoon ? (
              <span className="text-destructive">Expires soon!</span>
            ) : (
              <span>Valid until {new Date(promotion.validUntil).toLocaleDateString()}</span>
            )}
          </span>
        </div>
        <Button size="sm" asChild>
          <Link to={`/products?promotion=${promotion.id}`}>
            Shop Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Promotions;
