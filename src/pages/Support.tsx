
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, FileText, PlayCircle, MessageCircle, LifeBuoy, Truck, RotateCcw, Package, HelpCircle } from "lucide-react";

const Support = () => {
  return (
    <div className="container px-4 mx-auto py-16 md:py-24">
      {/* Page Title */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Customer Support</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're here to help. Find answers, resources, and get in touch with our support team.
        </p>
      </section>

      {/* Search Box */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto relative">
          <Search className="absolute left-4 top-3.5 text-muted-foreground" />
          <Input 
            placeholder="Search for help articles, guides, and more..." 
            className="pl-12 py-6 text-lg rounded-lg shadow-sm"
          />
          <Button className="absolute right-1.5 top-1.5">
            Search
          </Button>
        </div>
      </section>

      {/* Support Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">How Can We Help You?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center hover:border-primary transition-colors cursor-pointer group">
            <CardHeader className="pb-2 pt-6">
              <FileText className="mx-auto h-10 w-10 mb-3 text-primary group-hover:text-primary/80 transition-colors" />
              <CardTitle className="text-base">Guides & Manuals</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Product documentation and user guides</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center hover:border-primary transition-colors cursor-pointer group">
            <CardHeader className="pb-2 pt-6">
              <PlayCircle className="mx-auto h-10 w-10 mb-3 text-primary group-hover:text-primary/80 transition-colors" />
              <CardTitle className="text-base">Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Learn how to use our products</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center hover:border-primary transition-colors cursor-pointer group">
            <CardHeader className="pb-2 pt-6">
              <Truck className="mx-auto h-10 w-10 mb-3 text-primary group-hover:text-primary/80 transition-colors" />
              <CardTitle className="text-base">Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Information on delivery and shipping</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center hover:border-primary transition-colors cursor-pointer group">
            <CardHeader className="pb-2 pt-6">
              <RotateCcw className="mx-auto h-10 w-10 mb-3 text-primary group-hover:text-primary/80 transition-colors" />
              <CardTitle className="text-base">Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Return policy and process</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Tabbed FAQ */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are your business hours?</AccordionTrigger>
                <AccordionContent>
                  Our customer service team is available Monday through Friday from 9am to 6pm, 
                  and Saturday from 10am to 4pm (EST). We are closed on Sundays and major holidays.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                <AccordionContent>
                  You can reach our customer support team via email at support@nexwave.com, by phone at 
                  +1 (123) 456-7890, or by using the contact form on our website. We aim to respond to 
                  all inquiries within 24 hours during business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you have physical store locations?</AccordionTrigger>
                <AccordionContent>
                  Currently, NexWave operates exclusively as an online retailer. We do not have physical 
                  store locations, but we offer fast shipping, easy returns, and excellent customer service 
                  to ensure a great shopping experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I check my order status?</AccordionTrigger>
                <AccordionContent>
                  You can check your order status by logging into your account and visiting the "Order History" 
                  section. If you checked out as a guest, you can use the order tracking link that was sent to 
                  your email after your purchase.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I modify or cancel my order?</AccordionTrigger>
                <AccordionContent>
                  Orders can be modified or canceled within 1 hour of placing them. After that, our fulfillment 
                  process begins and changes cannot be guaranteed. Please contact customer support immediately 
                  if you need to make changes to a recent order.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, 
                  Apple Pay, and Google Pay. We also offer financing options through Affirm for qualifying purchases.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Do products come with a warranty?</AccordionTrigger>
                <AccordionContent>
                  Yes, all products sold by NexWave come with the manufacturer's warranty. The warranty period 
                  varies by product and brand. Extended warranty options are available for most products at checkout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I know if a product is compatible with my device?</AccordionTrigger>
                <AccordionContent>
                  Product pages include detailed compatibility information. If you're still unsure, please contact 
                  our customer support team with your specific device model, and we'll be happy to verify compatibility.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Are all products brand new?</AccordionTrigger>
                <AccordionContent>
                  Yes, all products sold on NexWave are brand new and genuine. We source directly from manufacturers 
                  and authorized distributors. If a product is refurbished or open-box, it will be clearly labeled as such.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="shipping" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days. Expedited shipping (2-day) and overnight options 
                  are available at checkout for most products. International shipping times vary by destination.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by 
                  location. Please note that customers are responsible for any customs fees or import taxes that may apply.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is free shipping available?</AccordionTrigger>
                <AccordionContent>
                  We offer free standard shipping on orders over $50 within the continental United States. Free shipping 
                  promotions are also offered periodically throughout the year. Check our homepage or subscribe to our 
                  newsletter to stay informed about shipping promotions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Contact Options */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Still Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="mx-auto h-12 w-12 mb-4 text-primary" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Chat with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Available Monday-Friday, 9am-6pm EST
              </p>
              <Button>Start Chat</Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <LifeBuoy className="mx-auto h-12 w-12 mb-4 text-primary" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Send us a message</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We'll respond within 24 hours
              </p>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <HelpCircle className="mx-auto h-12 w-12 mb-4 text-primary" />
              <CardTitle>Self Service</CardTitle>
              <CardDescription>Explore our help center</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Find articles and tutorials
              </p>
              <Button variant="secondary">Help Center</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Support;
