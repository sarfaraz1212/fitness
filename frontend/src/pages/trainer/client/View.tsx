import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/React-query/queryFunction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DietPlanCard from "./components/DietPlanCard";
import {
  ArrowLeft,
  Pencil,
  MessageSquare,
  Calendar,
  Target,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  User,
  Activity,
  Dumbbell,
  Heart,
  Scale,
  Ruler,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

// Sessions data fallback

const sessions = [
  { date: "Today", time: "5:00 PM", type: "Strength Training", status: "upcoming", duration: "60 min" },
  { date: "Yesterday", time: "5:00 PM", type: "HIIT Session", status: "completed", duration: "45 min" },
  { date: "Jan 28", time: "5:00 PM", type: "Core Workout", status: "completed", duration: "60 min" },
  { date: "Jan 26", time: "5:00 PM", type: "Cardio", status: "completed", duration: "45 min" },
  { date: "Jan 24", time: "5:00 PM", type: "Strength Training", status: "completed", duration: "60 min" },
];

const ClientDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data: client, isLoading, isError } = useQuery({
    queryKey: ['client', id],
    queryFn: () => fetchClient(id as string),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          <p className="text-lg font-medium text-muted-foreground">Loading client profile...</p>
        </div>
      </div>
    );
  }

  if (isError || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Client not found</h2>
          <Button onClick={() => navigate("/trainer/clients")}>Back to Clients</Button>
        </div>
      </div>
    );
  }
  const getMembershipBadge = (type: string) => {
    switch (type) {
      case "vip":
        return <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0 shadow-sm text-sm px-3 py-1">VIP Member</Badge>;
      case "premium":
        return <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-sm text-sm px-3 py-1">Premium Member</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm px-3 py-1">Basic Member</Badge>;
    }
  };

  const stats = [
    { label: "Sessions", value: 0, icon: Dumbbell, color: "from-blue-500 to-indigo-500" },
    { label: "Progress", value: `0%`, icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
    { label: "Weight", value: `${client.onboarding?.weight || "--"}kg`, icon: Scale, color: "from-purple-500 to-pink-500" },
    { label: "Height", value: `${client.onboarding?.height || "--"}cm`, icon: Ruler, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <Button
            variant="ghost"
            onClick={() => navigate("/trainer/clients")}
            className="text-white/80 hover:text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-white/20 shadow-2xl">
                <AvatarImage src={client.onboarding?.profile_image} />
                <AvatarFallback className="bg-white/20 text-white text-3xl font-bold">
                  {client.name?.[0] || 'C'}
                </AvatarFallback>
              </Avatar>
              <span className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-indigo-600 ${client.is_onboarded ? "bg-emerald-500" : "bg-gray-400"}`} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {client.name}
                </h1>
                {getMembershipBadge("vip")}
              </div>
              <p className="text-white/80 flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" />
                {client.email}
              </p>
              <p className="text-white/80 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {client.onboarding?.phone_number || "No phone provided"}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant="secondary"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button
                onClick={() => navigate(`/trainer/clients/${id}/edit`)}
                className="bg-white text-indigo-600 hover:bg-white/90"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 relative z-10">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-900 shadow-lg border-0 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Info */}
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date of Birth</p>
                      <p className="font-medium text-foreground">
                        {client.onboarding?.date_of_birth
                          ? (!isNaN(Number(client.onboarding.date_of_birth))
                            ? new Date(Number(client.onboarding.date_of_birth)).toLocaleDateString()
                            : client.onboarding.date_of_birth)
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p className="font-medium text-foreground">{client.onboarding?.gender || "--"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground text-sm">{client.onboarding?.address || "No address provided"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Physical Stats */}
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    Physical Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Ruler className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-medium text-foreground">{client.onboarding?.height || "--"} cm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Scale className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Current Weight</p>
                      <p className="font-medium text-foreground">{client.onboarding?.weight || "--"} kg</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Target Weight</p>
                      <p className="font-medium text-foreground">{client.onboarding?.target_weight || "--"} kg</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Weight Progress</span>
                      <span className="font-semibold text-emerald-600">
                        {client.onboarding?.target_weight ? "45%" : "0%"}
                      </span>
                    </div>
                    <Progress value={client.onboarding?.target_weight ? 45 : 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Goals & Preferences */}
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    Goals & Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Fitness Goals</p>
                    <div className="flex flex-wrap gap-2">
                      {client.onboarding?.fitness_goals?.map((goal: string, idx: number) => (
                        <Badge key={idx} className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                          {goal}
                        </Badge>
                      )) || <p className="text-sm text-muted-foreground">No goals set</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Heart className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Diet Preference</p>
                      <p className="font-medium text-foreground">{client.onboarding?.diet_preferences || "Not specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <DietPlanCard client={client} />

            {/* Notes */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg">Trainer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{client.onboarding?.notes || "No notes available"}</p>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Delete this client</p>
                    <p className="text-sm text-muted-foreground">Once deleted, all client data will be permanently removed.</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Client
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete {client.name}'s profile
                          and all associated data including sessions and progress history.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Client
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Session History
                </CardTitle>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0">
                  Schedule Session
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sessions.map((session, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors ${session.status === "upcoming"
                        ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                        : "bg-muted/50 hover:bg-muted"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.status === "upcoming"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                          : "bg-muted"
                          }`}>
                          <Dumbbell className={`w-6 h-6 ${session.status === "upcoming" ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{session.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {session.date} at {session.time} • {session.duration}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        session.status === "upcoming"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                      }>
                        {session.status === "upcoming" ? "Upcoming" : "Completed"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                      <span className="text-4xl font-bold text-white">{client.progressPercentage}%</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Excellent Progress!</h3>
                    <p className="text-muted-foreground max-w-md">
                      {client.firstName} is making great progress toward their goals.
                      Keep up the excellent work with consistent training sessions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Scale className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">-8 kg</p>
                  <p className="text-sm text-muted-foreground">Weight Lost</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">24</p>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">12</p>
                  <p className="text-sm text-muted-foreground">Week Streak</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientDetail;
