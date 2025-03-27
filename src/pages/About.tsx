
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container px-4 mx-auto py-16 md:py-24">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">About <span className="text-primary">Nex</span>Wave</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Bringing innovation and technology to your fingertips since 2015
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              NexWave was founded with a simple yet powerful vision: to make cutting-edge technology accessible to everyone. What started as a small online store has evolved into a leading electronics retailer trusted by thousands of customers worldwide.
            </p>
            <p className="text-muted-foreground mb-4">
              Our journey began in 2015 when our founders, tech enthusiasts themselves, noticed a gap in the market for high-quality electronics with exceptional customer service. They believed that buying tech products should be an experience, not just a transaction.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to carry that mission forward, carefully curating the best products and ensuring that every customer interaction exceeds expectations.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-8 aspect-video flex items-center justify-center">
            <p className="text-muted-foreground italic">Company timeline image</p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16 md:mb-24 bg-muted/20 py-12 px-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold">01</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We're passionate about the latest technology and committed to bringing innovative products to our customers.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold">02</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              We carefully select each product in our catalog, ensuring only the highest quality items make it to our customers.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold">03</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Customer Service</h3>
            <p className="text-muted-foreground">
              We believe exceptional service is just as important as the products we sell. Our support team is always ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16 md:mb-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="text-center">
              <div className="bg-muted/30 rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                <p className="text-muted-foreground">Team member photo</p>
              </div>
              <h3 className="text-xl font-bold mb-1">Jane Doe</h3>
              <p className="text-muted-foreground mb-2">Co-Founder & CEO</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary/10 py-12 px-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Join the NexWave Community</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Be the first to know about new products, exclusive deals, and special events.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/products">Browse Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
