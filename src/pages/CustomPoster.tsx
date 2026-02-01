import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ImageIcon, Sparkles } from "lucide-react";

const sizes = [
  { value: "a4", label: "A4 (210 × 297 mm)", price: 299 },
  { value: "a3", label: "A3 (297 × 420 mm)", price: 499 },
  { value: "a2", label: "A2 (420 × 594 mm)", price: 799 },
];

const frameOptions = [
  { value: "none", label: "No Frame", price: 0 },
  { value: "black", label: "Black Frame", price: 399 },
  { value: "white", label: "White Frame", price: 399 },
  { value: "natural", label: "Natural Wood Frame", price: 499 },
];

const CustomPoster = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [size, setSize] = useState("a3");
  const [frame, setFrame] = useState("none");

  const selectedSize = sizes.find((s) => s.value === size);
  const selectedFrame = frameOptions.find((f) => f.value === frame);
  const totalPrice = (selectedSize?.price || 0) + (selectedFrame?.price || 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Create Your Own</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Custom Poster</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Turn your favorite photos into stunning wall art. Upload your image, 
            choose your size and frame, and we'll create a premium quality poster just for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`aspect-[3/4] flex items-center justify-center ${
                  frame !== "none" ? "p-8" : ""
                }`}>
                  <div 
                    className={`w-full h-full flex items-center justify-center rounded-sm ${
                      frame === "black" ? "border-8 border-gray-900" :
                      frame === "white" ? "border-8 border-white shadow-lg" :
                      frame === "natural" ? "border-8 border-amber-700" :
                      ""
                    } ${uploadedImage ? "" : "bg-muted"}`}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Your custom poster"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Upload an image to preview your custom poster
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Live preview of your custom poster
            </p>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Upload Your Image</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium mb-1">Click to upload</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG or WEBP (max 10MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      <span className="flex justify-between w-full">
                        <span>{s.label}</span>
                        <span className="text-muted-foreground ml-4">
                          {formatPrice(s.price)}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Frame Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Frame Option</Label>
              <div className="grid grid-cols-2 gap-3">
                {frameOptions.map((f) => (
                  <Button
                    key={f.value}
                    variant={frame === f.value ? "default" : "outline"}
                    onClick={() => setFrame(f.value)}
                    className="h-auto py-4 flex flex-col"
                  >
                    <span>{f.label}</span>
                    <span className="text-xs opacity-70">
                      {f.price === 0 ? "Included" : `+${formatPrice(f.price)}`}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Poster ({selectedSize?.label})</span>
                  <span>{formatPrice(selectedSize?.price || 0)}</span>
                </div>
                {selectedFrame && selectedFrame.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>{selectedFrame.label}</span>
                    <span>{formatPrice(selectedFrame.price)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <Button size="lg" className="w-full" disabled={!uploadedImage}>
              Add to Cart
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Printed on premium 250 GSM art paper with fade-resistant inks
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomPoster;
