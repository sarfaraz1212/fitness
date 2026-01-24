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

const ClientBuilderProfileCard = () => {
  const client = mockClientProfile;
  const initials = client.name.slice(0, 2).toUpperCase();

  const formatGoal = (goal: string) =>
    goal
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const getLevelColor = (level: string) => {
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
    <div className="w-full max-w-md h-full sticky top-4">
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-2xl shadow-primary/5 h-full flex flex-col">
        {/* Make scrollable area */}
        <div className="overflow-y-auto flex-1 px-0">
          {/* Header Background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

          {/* Profile Header */}
          <div className="relative pt-8 pb-6 px-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl">
                  <AvatarImage src={client.profile_image} alt={client.name} />
                  <AvatarFallback className="bg-primary-foreground text-primary text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center ring-4 ring-background">
                  <Activity className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-primary-foreground capitalize">
                {client.name}
              </h2>
              <p className="text-primary-foreground/80 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {client.email}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <Badge
                  variant="outline"
                  className={`${getLevelColor(client.fitness_level)} border capitalize`}
                >
                  {client.fitness_level}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-background/20 text-primary-foreground border-background/30"
                >
                  {client.blood_group}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-3 gap-3">
              <StatCard icon={Ruler} label="Height" value={client.height} unit="cm" />
              <StatCard icon={Weight} label="Weight" value={client.weight} unit="kg" />
              <StatCard icon={Heart} label="Body Fat" value={client.body_fat} unit="%" />
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
                {client.fitness_goals.map((goal, index) => (
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
              <InfoRow icon={Calendar} label="Age" value={`${client.age} years`} />
              <InfoRow icon={User} label="Gender" value={client.gender} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Dumbbell} label="Workout/Week" value={`${client.exercise_frequency}x`} />
              <InfoRow icon={Clock} label="Training Time" value={client.training_time} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Moon} label="Sleep" value={`${client.sleep_hours} hrs`} />
              <InfoRow icon={Brain} label="Stress" value={client.stress_level} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow icon={Cigarette} label="Smoking" value={client.smoking_frequency} />
              <InfoRow icon={Wine} label="Alcohol" value={client.alcohol_frequency} />
            </div>
            <InfoRow icon={Briefcase} label="Work Environment" value={`${client.work_environment} job`} />
            <InfoRow icon={Droplets} label="Diet Preference" value={client.diet_preferences} />
          </div>

          {/* Medical & Notes */}
          <div className="px-6 pb-6 space-y-3">
            {client.medical_conditions && (
              <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20">
                <p className="text-xs text-destructive font-semibold uppercase tracking-wide mb-1">
                  ⚠️ Medical Conditions
                </p>
                <p className="text-sm text-foreground capitalize">{client.medical_conditions}</p>
              </div>
            )}

            {client.notes && (
              <div className="p-4 rounded-2xl bg-secondary/50 border border-secondary">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
                  📝 Notes
                </p>
                <p className="text-sm text-foreground capitalize">{client.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ClientBuilderProfileCard;