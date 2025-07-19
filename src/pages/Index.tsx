import { Link } from "react-router-dom";
import { Brain, Zap, Shield, BarChart3, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-medical-ai.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced CNN Architecture",
      description: "State-of-the-art convolutional neural networks optimized for medical image enhancement and analysis."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast image enhancement with GPU acceleration for immediate clinical insights."
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security and privacy protection for all medical data and imaging workflows."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to track enhancement quality and diagnostic accuracy."
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  AI-Powered{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Medical Imaging
                  </span>{" "}
                  Enhancement
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Revolutionizing medical diagnostics through advanced CNN technology. 
                  Enhance image quality, improve interpretability, and accelerate 
                  clinical decision-making with our cutting-edge AI platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/upload">
                    <Upload className="h-5 w-5" />
                    Start Enhancing
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/auth">
                    <Users className="h-5 w-5" />
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-medical">
                <img 
                  src="/lovable-uploads/d3eaa3e1-55cc-4081-a258-01956b7e57c3.png" 
                  alt="Medical Institution Building" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-glow/20 rounded-full animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Advanced CNN Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our state-of-the-art convolutional neural networks are specifically designed 
              for medical imaging enhancement, delivering unprecedented accuracy and speed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-medical hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-primary rounded-lg">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Medical Imaging?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join leading healthcare institutions using our AI technology 
            to enhance diagnostic accuracy and patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/auth">
                Get Started Today
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/dashboard">
                View Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
