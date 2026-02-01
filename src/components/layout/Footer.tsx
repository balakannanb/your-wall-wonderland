import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">POSTERCRAFT</h3>
            <p className="text-sm text-muted-foreground">
              Premium wall posters and art prints to transform your space.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground transition-colors">All Posters</Link></li>
              <li><Link to="/shop?category=anime" className="hover:text-foreground transition-colors">Anime</Link></li>
              <li><Link to="/shop?category=movies" className="hover:text-foreground transition-colors">Movies</Link></li>
              <li><Link to="/shop?category=minimal" className="hover:text-foreground transition-colors">Minimal</Link></li>
              <li><Link to="/custom" className="hover:text-foreground transition-colors">Custom Prints</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe for exclusive deals and new arrivals.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 PosterCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
