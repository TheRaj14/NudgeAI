
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Focus, BarChart3 } from 'lucide-react';
import NavBar from '@/components/NavBar';

const Index: React.FC = () => {
  return (
    <>
      <NavBar />
      
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="container px-6 py-10 mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 lg:pr-12 animate-slide-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6">
                  Introducing NUDGE AI
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-6">
                  Focus on what<br /> truly matters
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                  A beautifully designed productivity app that helps you eliminate distractions, focus on one task at a time, and get more done.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/dashboard">
                    <Button size="lg" className="button-shine w-full sm:w-auto">
                      <span>Get Started</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="#features">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 mt-12 lg:mt-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative mx-auto">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-1 border">
                    {/* Placeholder for app screenshot/mockup */}
                    <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-card shadow-lg">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="bg-background rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-10 w-10 text-primary" />
                          </div>
                          <p className="text-2xl font-semibold mb-2">25:00</p>
                          <p className="text-muted-foreground">Focus Session</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-6 -right-6 bg-card p-4 rounded-lg shadow-lg border">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Task Completed</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Progress Tracker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground">
                Designed to help you stay focused, manage your tasks effectively, and track your progress
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="card-highlight">
                <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <Focus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Focus Mode</h3>
                <p className="text-muted-foreground">
                  Eliminate distractions with a dedicated focus environment designed for deep work.
                </p>
              </div>
              
              <div className="card-highlight">
                <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Timing</h3>
                <p className="text-muted-foreground">
                  Work in focused sprints with customizable timers based on the proven Pomodoro technique.
                </p>
              </div>
              
              <div className="card-highlight">
                <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-muted-foreground">
                  Organize tasks by priority and track your progress throughout the day.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-24">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Users Say</h2>
              <p className="text-muted-foreground">
                Hear from users who have transformed their productivity with NUDGE AI
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <p className="mb-4 text-muted-foreground italic">
                  "NUDGE AI has completely transformed how I work. I've doubled my productivity and feel less stressed."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">Sarah J.</p>
                    <p className="text-sm text-muted-foreground">Designer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <p className="mb-4 text-muted-foreground italic">
                  "The focus timer and task prioritization helped me complete my thesis ahead of schedule."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">Michael T.</p>
                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <p className="mb-4 text-muted-foreground italic">
                  "Finally an app that understands how to balance productivity with mental wellbeing."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">David R.</p>
                    <p className="text-sm text-muted-foreground">Entrepreneur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-primary/5">
          <div className="container px-6 mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your productivity?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who have discovered the power of focused work sessions.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="button-shine">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 border-t">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-2">NUDGE AI</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  © {new Date().getFullYear()} NUDGE AI. All rights reserved.
                </p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
