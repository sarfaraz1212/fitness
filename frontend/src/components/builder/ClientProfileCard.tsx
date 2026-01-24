import {
  User, Mail, Calendar, Ruler, Weight, Heart,
  Dumbbell, Moon, Brain, Cigarette, Wine, Briefcase,
  Target, Clock, Droplets, Activity
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ClientProfile {
  name: string;
  email: string;
  age: number;
  gender: string;
  dob: string;
  height: number;
  weight: number;
  bmi: number;
  body_fat: number;
  blood_group: string;
  fitness_level: string;
  fitness_goals: string[];
  diet_preferences: string;
  exercise_frequency: number;
  training_time: string;
  sleep_hours: number;
  stress_level: string;
  smoking_frequency: string;
  alcohol_frequency: string;
  work_environment: string;
  medical_conditions: string;
  notes: string;
  profile_image?: string;
}

const mockClientProfile: ClientProfile = {
  name: "newclient",
  email: "newclient@yopmail.com",
  age: 22,
  gender: "other",
  dob: "2003-06-09",
  height: 175,
  weight: 70,
  bmi: 12,
  body_fat: 18,
  blood_group: "A+",
  fitness_level: "beginner",
  fitness_goals: ["lose-weight"],
  diet_preferences: "vegetarian",
  exercise_frequency: 4,
  training_time: "morning",
  sleep_hours: 7,
  stress_level: "moderate",
  smoking_frequency: "daily",
  alcohol_frequency: "daily",
  work_environment: "desk",
  medical_conditions: "allergic to peanuts",
  notes: "cant use wrist properly",
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
  valueClass = ""
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  valueClass?: string;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 group">
    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
      <p className={`font-semibold text-foreground truncate ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
  unit
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
}) => (
  <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 group hover:border-primary/40 transition-all duration-300">
    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
    <Icon className="w-5 h-5 text-primary mb-2" />
    <p className="text-2xl font-bold text-foreground">
      {value}
      <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
    </p>
    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
  </div>
);

const ClientBuilderProfileCard = ({ client, className }: { client?: any, className?: string }) => {
  const displayClient = client || mockClientProfile;
  const initials = (displayClient.name || "Client").slice(0, 2).toUpperCase();

  const formatGoal = (goal: string) =>
    goal
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const getLevelColor = (level?: string) => {
    if (!level) return "bg-primary/10 text-primary border-primary/20";
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "intermediate":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className={`w-full max-w-md h-full sticky top-4 ${className || ""}`}>
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-2xl shadow-primary/5 h-full flex flex-col">
        {/* Make scrollable area */}
        <div className="overflow-y-auto flex-1 px-0">
          {/* Header Background - Adaptive subtle style */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-muted/50 dark:bg-primary/20 border-b border-border/50" />

          {/* Profile Header */}
          <div className="relative pt-8 pb-6 px-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl">
                  <AvatarImage src={displayClient.profile_image} alt={displayClient.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center ring-4 ring-background">
                  <Activity className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-foreground capitalize">
                {displayClient.name || "Unknown Client"}
              </h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm font-medium">
                <Mail className="w-4 h-4" />
                {displayClient.email || "No email provided"}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <Badge
                  variant="outline"
                  className={`${getLevelColor(displayClient.fitness_level)} border capitalize`}
                >
                  {displayClient.fitness_level || "Beginner"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-muted text-foreground border-border"
                >
                  {displayClient.blood_group || "N/A"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-3 gap-3">
              <StatCard icon={Ruler} label="Height" value={displayClient.height || 0} unit="cm" />
              <StatCard icon={Weight} label="Weight" value={displayClient.weight || 0} unit="kg" />
              <StatCard icon={Heart} label="Body Fat" value={displayClient.body_fat || 0} unit="%" />
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="px-6 pb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Fitness Goals</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(displayClient.fitness_goals || []).map((goal: string, index: number) => (
                  <Badge
                    key={index}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1"
                  >
                    {formatGoal(goal)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="px-6 pb-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Calendar} label="Age" value={`${displayClient.age || 0} years`} />
              <InfoRow icon={User} label="Gender" value={displayClient.gender || "Other"} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Dumbbell} label="Workout/Week" value={`${displayClient.exercise_frequency || 0}x`} />
              <InfoRow icon={Clock} label="Training Time" value={displayClient.training_time || "N/A"} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Moon} label="Sleep" value={`${displayClient.sleep_hours || 0} hrs`} />
              <InfoRow icon={Brain} label="Stress" value={displayClient.stress_level || "Normal"} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Cigarette} label="Smoking" value={displayClient.smoking_frequency || "Never"} />
              <InfoRow icon={Wine} label="Alcohol" value={displayClient.alcohol_frequency || "Never"} />
            </div>
            <InfoRow icon={Briefcase} label="Work Environment" value={`${displayClient.work_environment || "Desk"} job`} />
            <InfoRow icon={Droplets} label="Diet Preference" value={displayClient.diet_preferences || "None"} />
          </div>

          {/* Medical & Notes */}
          <div className="px-6 pb-6 space-y-3">
            {displayClient.medical_conditions && (
              <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20">
                <p className="text-[10px] text-destructive font-bold uppercase tracking-wider mb-1">
                  ⚠️ Medical Conditions
                </p>
                <p className="text-sm text-foreground font-medium leading-relaxed">{displayClient.medical_conditions}</p>
              </div>
            )}

            {displayClient.notes && (
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">
                  📝 Trainer Notes
                </p>
                <p className="text-sm text-foreground font-medium leading-relaxed">{displayClient.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientBuilderProfileCard;