import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dumbbell,
  Users,
  Calendar,
  Clock,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  LogOut,
  Settings,
  Bell,
  Plus,
  Star,
  DollarSign,
  Utensils,
  ArrowRight,
} from "lucide-react";

const TrainerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Clients", value: "24", icon: Users, color: "from-blue-500 to-indigo-500", change: "+3 this month" },
    { label: "Sessions Today", value: "6", icon: Calendar, color: "from-emerald-500 to-teal-500", change: "2 remaining" },
    { label: "Revenue", value: "$4,280", icon: DollarSign, color: "from-amber-500 to-orange-500", change: "+12% vs last month" },
    { label: "Avg Rating", value: "4.9", icon: Star, color: "from-purple-500 to-pink-500", change: "32 reviews" },
  ];

  const todaySessions = [
    { client: "Sarah Johnson", time: "9:00 AM", type: "Strength Training", status: "completed", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { client: "Mike Chen", time: "10:30 AM", type: "HIIT Session", status: "completed", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { client: "Emma Wilson", time: "1:00 PM", type: "Yoga", status: "completed", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
    { client: "James Brown", time: "3:00 PM", type: "Cardio", status: "in-progress", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
    { client: "Lisa Park", time: "5:00 PM", type: "Personal Training", status: "upcoming", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { client: "David Kim", time: "6:30 PM", type: "Strength Training", status: "upcoming", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
  ];

  const topClients = [
    { name: "Sarah Johnson", sessions: 24, progress: 85, goal: "Weight Loss", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { name: "Mike Chen", sessions: 18, progress: 72, goal: "Muscle Gain", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { name: "Emma Wilson", sessions: 16, progress: 90, goal: "Flexibility", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
  ];

  const recentMessages = [
    { from: "Sarah Johnson", message: "Can we reschedule Thursday's session?", time: "10 min ago", unread: true },
    { from: "Mike Chen", message: "Thanks for the workout plan!", time: "1 hour ago", unread: true },
    { from: "Emma Wilson", message: "See you tomorrow!", time: "3 hours ago", unread: false },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">In Progress</Badge>;
      case "upcoming":
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  FitTrack
                </span>
                <Badge variant="secondary" className="ml-2 text-xs">Trainer</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/login")}
                className="text-muted-foreground hover:text-red-500"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-white dark:border-gray-800 shadow-xl">
              <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-bold">
                AT
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back, Alex! 💪
              </h1>
              <p className="text-muted-foreground">You have 2 sessions remaining today</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30">
            <Plus className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>


        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Clients",
              description: "Manage all your clients",
              icon: Users,
              color: "from-blue-500 to-indigo-600",
              path: "/trainer/clients",
            },
            {
              title: "Workout Plans",
              description: "Create workout programs",
              icon: Dumbbell,
              color: "from-emerald-500 to-teal-600",
              path: "/trainer/workout-plans",
            },
            {
              title: "Diet Plans",
              description: "Manage nutrition plans",
              icon: Utensils,
              color: "from-amber-500 to-orange-600",
              path: "/trainer/diet-plan-builder",
            },
          ].map((item, index) => (
            <Card
              key={index}
              onClick={() => navigate(item.path)}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 cursor-pointer group overflow-hidden"
            >
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Sessions */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Today's Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={session.avatar} />
                      <AvatarFallback>{session.client.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{session.client}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{session.time}</span>
                        <span>•</span>
                        <span>{session.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(session.status)}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Messages
                <Badge className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">2 new</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl transition-colors cursor-pointer ${msg.unread ? "bg-blue-50 dark:bg-blue-950/30" : "bg-muted/50 hover:bg-muted"
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground text-sm">{msg.from}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                View All Messages
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Top Clients */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Top Performing Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topClients.map((client, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{client.name}</h4>
                      <p className="text-xs text-muted-foreground">{client.sessions} sessions</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Goal: {client.goal}</span>
                      <span className="font-medium text-foreground">{client.progress}%</span>
                    </div>
                    <Progress value={client.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
      </main>
    </div>
  );
};

export default TrainerDashboard;
