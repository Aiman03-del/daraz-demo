import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Zap, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <section className="space-y-16">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          About Daraz Demo
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          We're building a modern marketplace that connects buyers with verified sellers, making online shopping simple, transparent, and trustworthy.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground text-lg">
            To create a seamless e-commerce experience by empowering small businesses and resellers while providing customers access to quality products at competitive prices.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="text-muted-foreground text-lg">
            To become the most trusted and user-friendly marketplace where every seller can succeed and every buyer finds exactly what they need.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted p-8 rounded-lg space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Community</h3>
            <p className="text-muted-foreground">
              We believe in the power of community and collaboration between buyers and sellers.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-lg space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Trust</h3>
            <p className="text-muted-foreground">
              Trust is the foundation of everything we do. We verify all sellers and ensure quality standards.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-lg space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p className="text-muted-foreground">
              We continuously innovate to provide the best experience for our users.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-lg space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Excellence</h3>
            <p className="text-muted-foreground">
              We're committed to excellence in everything - from product quality to customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Ahmed Hassan", role: "Founder & CEO", specialty: "Strategy" },
            { name: "Sarah Khan", role: "CTO", specialty: "Technology" },
            { name: "Priya Sharma", role: "Head of Operations", specialty: "Operations" },
          ].map((member) => (
            <div key={member.name} className="bg-muted p-8 rounded-lg text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="font-medium text-primary">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">3</p>
            <p className="text-muted-foreground mt-2">Verified Sellers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">8</p>
            <p className="text-muted-foreground mt-2">Total Products</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">500+</p>
            <p className="text-muted-foreground mt-2">Total Views</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">100%</p>
            <p className="text-muted-foreground mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-3xl font-bold">Join Our Community</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Whether you're looking to shop for amazing products or start your selling journey, we're here to help.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button size="lg">
              Start Shopping
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
