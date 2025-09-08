import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";

interface CounterProps {
  end: number;
  duration: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const AnimatedCounter = ({ end, duration, label, suffix = "", delay = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, delay]);

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

const AnimatedCounters = () => {
  const counters = [
    {
      end: 500,
      duration: 2000,
      label: "Students Trained",
      suffix: "+",
      delay: 0
    },
    {
      end: 150,
      duration: 2200,
      label: "Black Belts",
      suffix: "+",
      delay: 200
    },
    {
      end: 250,
      duration: 2400,
      label: "Medals Won",
      suffix: "+",
      delay: 400
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Achievement Numbers
          </h2>
          <p className="text-xl text-muted-foreground">
            Building champions through dedication and excellence
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="martial-card">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {counters.map((counter, index) => (
                <AnimatedCounter
                  key={index}
                  end={counter.end}
                  duration={counter.duration}
                  label={counter.label}
                  suffix={counter.suffix}
                  delay={counter.delay}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AnimatedCounters;