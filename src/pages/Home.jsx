import { useState } from "react";
import { Camera, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function Home() {
  const [viewMode, setViewMode] = useState("grid");
  const [images, setImages] = useState([
    {
      id: "1",
      date: "Today, 2:30 PM",
      url: "/placeholder.svg?height=300&width=300",
      healthScore: 85,
      issues: ["Mild dryness", "Slight redness"],
    },
    {
      id: "2",
      date: "Yesterday, 10:15 AM",
      url: "/placeholder.svg?height=300&width=300",
      healthScore: 72,
      issues: ["Uneven tone", "Fine lines"],
    },
    {
      id: "3",
      date: "Mar 14, 9:45 AM",
      url: "/placeholder.svg?height=300&width=300",
      healthScore: 91,
      issues: ["Minor texture"],
    },
    {
      id: "4",
      date: "Mar 10, 5:20 PM",
      url: "/placeholder.svg?height=300&width=300",
      healthScore: 68,
      issues: ["Congestion", "Oiliness", "Enlarged pores"],
    },
  ]);

  const handleTakePhoto = () => {
    const newImage = {
      id: Date.now().toString(),
      date: "Just now",
      url: "/placeholder.svg?height=300&width=300",
      healthScore: Math.floor(Math.random() * 100),
      issues: ["Analysis pending..."],
    };
  
    setImages((prevImages) => {
      const updatedImages = [newImage, ...prevImages];
      if (updatedImages.length > 6) {
        return updatedImages.slice(0, 6);
      }
      return updatedImages;
    });
  };

  const getHealthColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <header className="flex flex-col items-center mb-8">
        {/* <h1 className="text-3xl font-bold mb-2">Visage</h1> */}
        <img src="/logo V.svg" alt="Visage" className="h-12 w-auto mb-2" />
        <p className="text-muted-foreground text-center mb-6">Advanced skin analysis with personalized solutions</p>
        <Button size="lg" onClick={handleTakePhoto} className="gap-2">
          <Camera className="h-5 w-5" /> Scan Now
        </Button>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold underline">Recent Analyses</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")} className={cn(viewMode === "grid" && "bg-muted")}>
            <Grid className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setViewMode("list")} className={cn(viewMode === "list" && "bg-muted")}>
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No skin analyses yet</p>
          <Button onClick={handleTakePhoto} className="gap-2">
            <Camera className="h-4 w-4" /> Take Your First Photo
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img src={image.url} alt={`Skin analysis from ${image.date}`} className="w-full h-48 object-cover" />
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4 gap-2">
                <div className="flex justify-between w-full">
                  <span className="text-sm text-muted-foreground">{image.date}</span>
                  <span className="text-sm font-medium">{image.healthScore}%</span>
                </div>
                <Progress value={image.healthScore} className={cn("h-2 w-full", getHealthColor(image.healthScore))} />
                <div className="flex flex-wrap gap-1 mt-2">
                  {image.issues.map((issue, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">{issue}</span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {images.map((image) => (
            <Card key={image.id}>
              <div className="flex flex-col sm:flex-row">
                <img src={image.url} alt={`Skin analysis from ${image.date}`} className="w-full sm:w-32 h-32 object-cover" />
                <div className="p-4 flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{image.date}</span>
                    <span className="text-sm font-medium">{image.healthScore}%</span>
                  </div>
                  <Progress value={image.healthScore} className={cn("h-2 w-full mb-3", getHealthColor(image.healthScore))} />
                  <div className="flex flex-wrap gap-1">
                    {image.issues.map((issue, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">{issue}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
