import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Anime",
    description: "Popular anime artwork",
    icon: "🌸",
    query: "anime",
    color: "from-pink-500/20 to-purple-500/20",
  },
  {
    name: "Movies",
    description: "Iconic film posters",
    icon: "🎬",
    query: "movies",
    color: "from-amber-500/20 to-red-500/20",
  },
  {
    name: "Quotes",
    description: "Inspirational typography",
    icon: "💬",
    query: "quotes",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Nature",
    description: "Beautiful landscapes",
    icon: "🌿",
    query: "nature",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Minimal",
    description: "Clean modern designs",
    icon: "◻️",
    query: "minimal",
    color: "from-gray-500/20 to-slate-500/20",
  },
  {
    name: "Custom",
    description: "Create your own",
    icon: "✨",
    query: "custom",
    color: "from-violet-500/20 to-fuchsia-500/20",
    href: "/custom",
  },
];

export function CollectionsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated categories to find the perfect poster for your style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={collection.href || `/shop?category=${collection.query}`}
                className={`block p-6 rounded-2xl bg-gradient-to-br ${collection.color} border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group`}
              >
                <div className="text-4xl mb-4">{collection.icon}</div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {collection.description}
                </p>
                <ArrowRight className="h-4 w-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
