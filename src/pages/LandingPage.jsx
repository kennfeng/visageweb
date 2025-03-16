import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle,
  Scan,
  Sparkles,
  Shield,
  Smartphone,
  Menu,
} from "lucide-react"

const smoothScroll = (targetId, duration) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const easeInOutQuad = (time, start, distance, duration) => {
    time /= duration / 2;
    if (time < 1) return (distance / 2) * time * time + start;
    time--;
    return (-distance / 2) * (time * (time - 2) - 1) + start;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const run = easeInOutQuad(elapsedTime, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (elapsedTime < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Face, Analyzed. Your Beauty, Optimized.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Visage uses advanced facial recognition to detect visual issues and provide personalized solutions
                    for your unique skin and features.
                  </p>
                </div>
                <div className="flex gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    <Link to="/register" className="flex items-center gap-2">
                    Register Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => smoothScroll("features", 1000)}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Advanced Facial Analysis Technology
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Visage uses advanced technology to provide personalized skin 
                and beauty recommendations tailored to your unique needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Scan className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Precise Detection</h3>
                <p className="text-center text-muted-foreground">
                  Identifies skin concerns with medical-grade accuracy.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Custom Solutions</h3>
                <p className="text-center text-muted-foreground">
                  Personalized recommendations based on your unique features.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Privacy First</h3>
                <p className="text-center text-muted-foreground">
                  Your facial data is processed securely and never shared.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Track Progress</h3>
                <p className="text-center text-muted-foreground">
                  Monitor improvements over time with detailed analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Three Simple Steps to Better Skin
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our technology makes it easy to identify and address your unique skin concerns.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Scan Your Face</h3>
                <p className="text-center text-muted-foreground">
                  Take a selfie using our app's advanced camera technology.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Get Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Our technology identifies concerns like acne, wrinkles, dark spots, and more.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Follow Solutions</h3>
                <p className="text-center text-muted-foreground">
                  Receive personalized product recommendations and skincare routines.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="Visage Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} Visage. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
