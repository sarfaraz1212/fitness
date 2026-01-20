import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WeightCheckInModal from "@/components/client/WeightCheckInModal";  
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect,useState } from "react";
import { client } from '@/lib/apollo';
import { logDailyWeight, updateDailyWeight } from '@/lib/React-query/queryFunction';
import { toast } from '@/hooks/use-toast';
import {
  Dumbbell,
  Flame,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Activity,
  Droplets,
  Moon,
  LogOut,
  Settings,
  Bell,
  Scale,
} from "lucide-react";
import { useAuthStore } from '@/stores/authStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [openDailyWeightModal, setOpenDailyWeightModal] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  async function submitWeight(weight: number, unit: "kg" | "lbs", isUpdate: boolean) {
    try {
      if (isUpdate) {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        await updateDailyWeight(today, weight, unit);
        toast({
          title: "Weight Updated! 📊",
          description: "Your daily weight has been updated.",
        });
      } else {
        await logDailyWeight(weight);
        toast({
          title: "Weight Logged! 📊",
          description: "Your daily weight has been recorded.",
        });
      }
      setOpenDailyWeightModal(false);
    } catch (error: any) {
      const message = error.graphQLErrors?.[0]?.message || error.message || "Failed to log weight.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  }

  const stats = [
    { label: "Calories Burned", value: "1,847", icon: Flame, color: "from-orange-500 to-red-500", progress: 73 },
    { label: "Workouts Done", value: "12", icon: Dumbbell, color: "from-emerald-500 to-teal-500", progress: 60 },
    { label: "Goals Achieved", value: "4/6", icon: Target, color: "from-purple-500 to-pink-500", progress: 67 },
    { label: "Active Days", value: "18", icon: TrendingUp, color: "from-blue-500 to-cyan-500", progress: 85 },
  ];

  const todayMetrics = [
    { label: "Steps", value: "8,432", target: "10,000", icon: Activity, color: "text-emerald-500" },
    { label: "Water", value: "6", target: "8 glasses", icon: Droplets, color: "text-blue-500" },
    { label: "Sleep", value: "7.5h", target: "8h", icon: Moon, color: "text-purple-500" },
  ];

  const upcomingWorkouts = [
    { name: "Upper Body Strength", time: "Today, 6:00 PM", duration: "45 min", type: "Strength" },
    { name: "HIIT Cardio", time: "Tomorrow, 7:00 AM", duration: "30 min", type: "Cardio" },
    { name: "Yoga Flow", time: "Wed, 8:00 AM", duration: "60 min", type: "Flexibility" },
  ];

  const achievements = [
    { name: "7-Day Streak", icon: "🔥", unlocked: true },
    { name: "First 5K", icon: "🏃", unlocked: true },
    { name: "Early Bird", icon: "🌅", unlocked: true },
    { name: "Muscle Master", icon: "💪", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FitTrack
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
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
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Good Morning, {user?.name || "User"}! 👋
              </h1>
              <p className="text-muted-foreground">Let's crush your fitness goals today</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setOpenDailyWeightModal(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30"
            >
              <Scale className="w-4 h-4 mr-2" />
              Log Weight
            </Button>
            <Button
              onClick={() => navigate("/onboarding")}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <Progress value={stat.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Metrics */}
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    <span className="font-medium text-foreground">{metric.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground">{metric.value}</span>
                    <span className="text-xs text-muted-foreground ml-1">/ {metric.target}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Workouts */}
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Upcoming Workouts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingWorkouts.map((workout, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{workout.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{workout.time}</span>
                      <span>•</span>
                      <span>{workout.duration}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200 dark:border-emerald-800"
                        : "bg-muted/50 opacity-50"
                    }`}
                  >
                    <span className="text-3xl mb-2">{achievement.icon}</span>
                    <span className="text-xs font-medium text-center text-foreground">
                      {achievement.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Chart Placeholder */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-40">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                const heights = [60, 80, 45, 90, 70, 100, 55];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-teal-500"
                      style={{ height: `${heights[index]}%` }}
                    />
                    <span className="text-xs text-muted-foreground font-medium">{day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      <WeightCheckInModal
        open={openDailyWeightModal}
        onOpenChange={setOpenDailyWeightModal}
        onSubmit={submitWeight}
        onSkip={() => setOpenDailyWeightModal(false)}
      />

    </div>
  );
};

export default Dashboard;
