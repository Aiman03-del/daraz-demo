"use client"

import { useState } from "react"
import { addProduct } from "@/lib/product-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Package, DollarSign, Image as ImageIcon, FileText, ArrowLeft, Upload } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function CreateProductPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  })
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large", {
        description: "Please upload an image smaller than 2MB",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file",
      })
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addProduct({
      title: form.title,
      price: Number(form.price),
      image: form.image || "https://picsum.photos/400",
    })

    toast.success("Product created successfully!", {
      description: `${form.title} has been added to your products`,
    })

    router.push("/reseller/products")
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/reseller/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new product listing
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="border rounded-xl p-8 bg-card shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Product Title
            </Label>
            <Input
              id="title"
              required
              placeholder="e.g., Wireless Bluetooth Headphones"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Choose a clear and descriptive title for your product
            </p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Price (৳)
            </Label>
            <Input
              id="price"
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="e.g., 1999"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Set a competitive price for your product
            </p>
          </div>

          {/* Image Upload/URL */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              Product Image
            </Label>
            
            {/* Toggle buttons */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
              <button
                type="button"
                onClick={() => setUploadMethod("upload")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  uploadMethod === "upload"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Upload
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("url")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  uploadMethod === "url"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ImageIcon className="h-4 w-4 inline mr-2" />
                URL
              </button>
            </div>

            {uploadMethod === "upload" ? (
              <div className="space-y-2">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition cursor-pointer bg-muted/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="font-medium mb-1">Click to upload image</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 2MB
                    </p>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload a high-quality image of your product
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Provide a direct link to your product image
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Description
            </Label>
            <Textarea 
              id="description"
              placeholder="Describe your product features, specifications, and benefits..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Optional: Add a detailed description to help buyers understand your product better
            </p>
          </div>

          {/* Image Preview */}
          {form.image && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Image Preview</Label>
              <div className="border rounded-lg overflow-hidden bg-muted/50 aspect-video flex items-center justify-center">
                <img 
                  src={form.image} 
                  alt="Preview" 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/400"
                  }}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setForm({ ...form, image: "" })}
                className="w-full"
              >
                Remove Image
              </Button>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 h-11" size="lg">
              <Package className="mr-2 h-4 w-4" />
              Create Product
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/reseller/products")}
              className="h-11"
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">💡 Tip:</span> Use high-quality images and clear descriptions to attract more buyers.
        </p>
      </div>
    </div>
  )
}
