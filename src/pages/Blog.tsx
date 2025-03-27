
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Wearable Technology",
    excerpt: "Exploring the latest innovations and trends in wearable tech and how they're changing our daily lives.",
    category: "Technology",
    author: "Jane Smith",
    date: "May 15, 2023",
    readTime: "5 min read",
    image: "placeholder.svg"
  },
  {
    id: 2,
    title: "How to Choose the Perfect Smartphone in 2023",
    excerpt: "A comprehensive guide to selecting a smartphone that meets your needs and budget in the current market.",
    category: "Buying Guide",
    author: "Michael Brown",
    date: "June 2, 2023",
    readTime: "8 min read",
    image: "placeholder.svg"
  },
  {
    id: 3,
    title: "Smart Home Devices That Actually Save You Money",
    excerpt: "These smart home gadgets not only make your life easier but can help reduce your utility bills.",
    category: "Smart Home",
    author: "Alex Johnson",
    date: "April 28, 2023",
    readTime: "6 min read",
    image: "placeholder.svg"
  },
  {
    id: 4,
    title: "Understanding Audio Quality: A Beginner's Guide",
    excerpt: "Learn the basics of audio specifications and what to look for when purchasing headphones or speakers.",
    category: "Audio",
    author: "Sarah Wilson",
    date: "May 10, 2023",
    readTime: "7 min read",
    image: "placeholder.svg"
  },
  {
    id: 5,
    title: "The Evolution of Laptop Design",
    excerpt: "From bulky machines to ultra-thin powerhouses: how laptop design has transformed over the decades.",
    category: "Technology",
    author: "David Chen",
    date: "June 15, 2023",
    readTime: "9 min read",
    image: "placeholder.svg"
  },
  {
    id: 6,
    title: "Must-Have Accessories for Your New Tablet",
    excerpt: "Enhance your tablet experience with these essential accessories that boost productivity and enjoyment.",
    category: "Accessories",
    author: "Emily Parker",
    date: "May 22, 2023",
    readTime: "4 min read",
    image: "placeholder.svg"
  },
];

// Categories for filtering
const categories = [
  "All",
  "Technology",
  "Buying Guide",
  "Smart Home",
  "Audio",
  "Accessories",
];

const Blog = () => {
  return (
    <div className="container px-4 mx-auto py-16 md:py-24">
      {/* Page Title */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">NexWave Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, guides, and news from the world of technology
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-96">
            <Input placeholder="Search articles..." />
          </div>
          <Tabs defaultValue="All" className="w-full md:w-auto">
            <TabsList className="h-auto flex flex-wrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Featured Post */}
      <section className="mb-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 aspect-video flex items-center justify-center">
              <p className="text-muted-foreground italic">Featured post image</p>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-4">{blogPosts[0].category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <span className="mr-4">By {blogPosts[0].author}</span>
                <span className="mr-4">{blogPosts[0].date}</span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <Button>Read More</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Blog Posts Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="bg-muted/30 aspect-video flex items-center justify-center">
                <p className="text-muted-foreground italic">Post image</p>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="pt-2 mt-auto">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Read More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/20 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Get the latest tech news, reviews, and insights delivered straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Input placeholder="Your email address" className="flex-grow" />
          <Button type="submit">Subscribe</Button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
