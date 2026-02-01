import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Leaf, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Art",
    description: "We believe great art should be accessible to everyone. Each poster is carefully selected for its artistic value and visual impact.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest materials - 250 GSM art paper and fade-resistant inks ensure your posters look stunning for years.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description: "Our packaging is 100% recyclable, and we partner with suppliers who share our commitment to sustainability.",
  },
  {
    icon: Sparkles,
    title: "Customer First",
    description: "From easy ordering to careful packaging and prompt delivery, we're dedicated to making your experience exceptional.",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About PosterCraft
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We started PosterCraft with a simple mission: to help you transform your 
            living spaces with beautiful, affordable wall art. Every poster we create 
            is a piece of art that tells a story.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              PosterCraft was born in 2023 from a love of interior design and a 
              frustration with the lack of quality, affordable wall art options in India. 
              We noticed that people often settled for mass-produced, low-quality prints 
              that faded within months.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We set out to change that. By working directly with artists and using 
              premium printing techniques, we're able to offer museum-quality prints 
              at accessible prices. Whether you're decorating your first apartment or 
              refreshing your home office, we have something for every space and style.
            </p>
          </div>
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-8xl">🎨</span>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">1000+</p>
              <p className="text-muted-foreground">Posters Shipped</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground">Unique Designs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">4.9</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
