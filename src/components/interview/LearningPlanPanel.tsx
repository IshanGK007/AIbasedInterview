import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, CheckCircle2, Clock } from "lucide-react";

const LearningPlanPanel = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("plan");

  // Mock data for learning plan
  const learningPlan = {
    progress: 65,
    daysActive: 12,
    totalInterviews: 8,
    focusAreas: [
      { name: "Behavioral", progress: 80 },
      { name: "Technical", progress: 60 },
      { name: "System Design", progress: 40 },
      { name: "Coding", progress: 75 },
    ],
    upcomingPractice: [
      {
        day: "Today",
        tasks: ["Practice behavioral questions", "Review system design basics"],
      },
      {
        day: "Tomorrow",
        tasks: ["Mock interview - Frontend role", "Review feedback"],
      },
      {
        day: "Wednesday",
        tasks: ["Coding practice - Algorithms", "Technical concepts review"],
      },
    ],
    achievements: [
      "Completed 5 mock interviews",
      "Mastered behavioral questions",
      "Improved response clarity by 40%",
    ],
  };

  // Mock data for calendar events
  const calendarEvents = [
    { date: new Date(), title: "Behavioral Practice" },
    { date: new Date(Date.now() + 86400000), title: "Mock Interview" },
    { date: new Date(Date.now() + 86400000 * 2), title: "Coding Practice" },
    { date: new Date(Date.now() + 86400000 * 5), title: "System Design" },
  ];

  // Check if a date has an event
  const hasEvent = (date: Date) => {
    return calendarEvents.some(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personalized Learning Plan</CardTitle>
        <CardDescription>
          Track your progress and follow your improvement plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="plan"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="plan">Learning Plan</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Overall Progress</h3>
                <span className="text-sm">{learningPlan.progress}%</span>
              </div>
              <Progress value={learningPlan.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{learningPlan.daysActive}</p>
                <p className="text-xs text-muted-foreground">Days Active</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">
                  {learningPlan.totalInterviews}
                </p>
                <p className="text-xs text-muted-foreground">Interviews</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Focus Areas</h3>
              <div className="space-y-3">
                {learningPlan.focusAreas.map((area, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">{area.name}</span>
                      <span className="text-xs">{area.progress}%</span>
                    </div>
                    <Progress value={area.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Upcoming Practice</h3>
              <div className="space-y-3">
                {learningPlan.upcomingPractice.map((day, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">{day.day}</h4>
                      <Badge variant="outline" className="text-xs">
                        {day.tasks.length} tasks
                      </Badge>
                    </div>
                    <ul className="space-y-1">
                      {day.tasks.map((task, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 mt-0.5 text-muted-foreground" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Achievements</h3>
              <div className="space-y-2">
                {learningPlan.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-muted/30 p-2 rounded-lg text-xs flex items-center gap-2"
                  >
                    <div className="bg-primary/10 p-1 rounded-full">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
              modifiers={{
                event: (date) => hasEvent(date),
              }}
              modifiersClassNames={{
                event: "bg-primary/10 font-bold text-primary",
              }}
            />

            {date && (
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>

                {getEventsForDate(date).length > 0 ? (
                  <div className="space-y-2">
                    {getEventsForDate(date).map((event, index) => (
                      <div
                        key={index}
                        className="bg-muted/30 p-3 rounded-lg flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.title}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Start
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      No events scheduled for this day
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningPlanPanel;
