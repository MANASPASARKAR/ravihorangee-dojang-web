import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Coaches = () => {
  const [filter, setFilter] = useState("all");

  const coaches = [
    {
      name: "Ravindra Bhandari (Ravi Sir)",
      role: "Head Coach",
      rank: "8th Dan Black Belt",
      description: "Master Ravindra Bhandari brings over 20 years of Taekwondo excellence to RB Horangee Do-Jang. His dedication to traditional martial arts values combined with modern training techniques has shaped countless champions.",
      achievements: ["National Champion", "International Referee", "Master Instructor"],
      image: "/placeholder-coach.jpg"
    },
    {
      name: "Assistant Coach Name",
      role: "Assistant Coach",
      rank: "5th Dan Black Belt",
      description: "Specializes in youth development and competition preparation with a focus on building confidence and discipline in young martial artists.",
      achievements: ["Regional Champion", "Youth Instructor Certification"],
      image: "/placeholder-coach.jpg"
    }
  ];

  const students = [
    {
      name: "Student Champion 1",
      role: "Student",
      rank: "3rd Dan Black Belt",
      description: "National level competitor who exemplifies the values and techniques taught at RB Horangee Do-Jang.",
      achievements: ["National Gold Medalist", "State Champion"],
      image: "/placeholder-student.jpg"
    },
    {
      name: "Student Champion 2",
      role: "Student",
      rank: "2nd Dan Black Belt",
      description: "Rising star in competitive Taekwondo with exceptional poomsae and sparring skills.",
      achievements: ["Regional Champion", "Youth Ambassador"],
      image: "/placeholder-student.jpg"
    }
  ];

  const allMembers = [...coaches, ...students];

  const filteredMembers = filter === "all" 
    ? allMembers 
    : filter === "coaches" 
    ? coaches 
    : students;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated coaches and accomplished students who make RB Horangee Do-Jang exceptional
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <Button
              variant={filter === "all" ? "power" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Members
            </Button>
            <Button
              variant={filter === "coaches" ? "power" : "outline"}
              onClick={() => setFilter("coaches")}
            >
              Coaches
            </Button>
            <Button
              variant={filter === "students" ? "power" : "outline"}
              onClick={() => setFilter("students")}
            >
              Students
            </Button>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => (
              <Card key={index} className="martial-card group">
                {/* Photo */}
                <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-6xl">🥋</span>
                  </div>
                </div>
                
                {/* Name & Role */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold">{member.rank}</p>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mt-2">
                    {member.role}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {member.description}
                </p>
                
                {/* Achievements */}
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Key Achievements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.achievements.map((achievement, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Join Our Academy
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Train with experienced coaches and be part of a community dedicated to excellence in martial arts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="power" size="lg">
              Book Free Trial Class
            </Button>
            <Button variant="secondary-power" size="lg">
              Learn More About Programs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaches;