import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Scan, Sparkles, Shield, Smartphone } from "lucide-react"

const smoothScroll = (targetId, duration) => {
  const target = document.getElementById(targetId)
  if (!target) return

  const targetPosition = target.getBoundingClientRect().top + window.scrollY
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  let startTime = null

  const easeInOutQuad = (time, start, distance, duration) => {
    time /= duration / 2
    if (time < 1) return (distance / 2) * time * time + start
    time--
    return (-distance / 2) * (time * (time - 2) - 1) + start
  }

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const elapsedTime = currentTime - startTime
    const run = easeInOutQuad(elapsedTime, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (elapsedTime < duration) requestAnimationFrame(animation)
  }

  requestAnimationFrame(animation)
}

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState("next")

  const sections = [
    {
      title: "Advanced Facial Analysis Technology",
      description:
        "Visage uses advanced technology to provide personalized skin and beauty recommendations tailored to your unique needs.",
      features: [
        {
          icon: <Scan className="h-6 w-6 text-primary" />,
          title: "Precise Detection",
          description: "Identifies skin concerns with medical-grade accuracy.",
        },
        {
          icon: <Sparkles className="h-6 w-6 text-primary" />,
          title: "Custom Solutions",
          description: "Personalized recommendations based on your unique features.",
        },
        {
          icon: <Shield className="h-6 w-6 text-primary" />,
          title: "Privacy First",
          description: "Your facial data is processed securely and never shared.",
        },
        {
          icon: <Smartphone className="h-6 w-6 text-primary" />,
          title: "Track Progress",
          description: "Monitor improvements over time with detailed analytics.",
        },
      ],
    },
    {
      title: "Three Simple Steps to Better Skin",
      description: "Our technology makes it easy to identify and address your unique skin concerns.",
      features: [
        {
          icon: <div className="flex items-center justify-center font-bold">1</div>,
          title: "Scan Your Face",
          description: "Take a selfie using our app's advanced camera technology for analysis of your skin features.",
        },
        {
          icon: <div className="flex items-center justify-center font-bold">2</div>,
          title: "Get Analysis",
          description: "Our technology identifies concerns like acne, wrinkles, dark spots, and more.",
        },
        {
          icon: <div className="flex items-center justify-center font-bold">3</div>,
          title: "Follow Solutions",
          description: "Receive personalized product recommendations and skincare routines.",
        },
      ],
    },
  ]

  const nextSection = () => {
    if (isTransitioning) return
    setDirection("next")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length)
    }, 450)
  }

  const prevSection = () => {
    if (isTransitioning) return
    setDirection("prev")
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length)
    }, 450)
  }

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-26">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Face, Analyzed. Your Beauty, Optimized.
                  </h1>
                  <p className="max-w-[600px] text-gray-800 md:text-xl italic">
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
                  <Button variant="outline" size="lg" onClick={() => smoothScroll("features", 1000)}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/facescan.png"
                  width={550}
                  height={550}
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features & How It Works Section */}
        <section id="features" className="w-full bg-slate-100 mb-8 pt-4 mt-18 rounded-xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div
                className={`space-y-2 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
              >
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {currentSection === 0 ? "Features" : "How It Works"}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  {sections[currentSection].title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {sections[currentSection].description}
                </p>
              </div>
            </div>
            <div
              className={`mx-auto grid max-w-5xl gap-4 py-12 transition-all duration-600 ease-in-out
                ${currentSection === 0 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-3 place-items-center"}
                ${isTransitioning ? (direction === "next" ? "translate-x-[-10px] opacity-0" : "translate-x-[10px] opacity-0") : "translate-x-0 opacity-100"}`}
            >
              {sections[currentSection].features.map((feature, index) => (
                <div
                  key={index}
                  className="flex w-full h-full flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"
                >
                  <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-4">
              <Button
                variant="ghost"
                onClick={prevSection}
                className="text-primary hover:text-primary-dark p-2"
                disabled={isTransitioning}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                onClick={nextSection}
                className="text-primary hover:text-primary-dark p-2"
                disabled={isTransitioning}
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <img
              src="/logo V.svg"
              alt="Visage Logo"
              width={18}
              height={18}
              className="rounded"
            />
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} Visage. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Terms
            </Link>
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}