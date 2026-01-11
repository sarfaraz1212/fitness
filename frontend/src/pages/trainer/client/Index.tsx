import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  Filter,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  ArrowLeft,
  Eye,
  Pencil,
  Trash2,
  Calendar,
  Mail,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  membershipType: "basic" | "premium" | "vip";
  status: "active" | "inactive";
  goals: string[];
  sessionsCompleted: number;
  nextSession: string | null;
  progressPercentage: number;
  joinedDate: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 234 567 890",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    membershipType: "vip",
    status: "active",
    goals: ["Weight Loss", "Endurance"],
    sessionsCompleted: 24,
    nextSession: "Today, 5:00 PM",
    progressPercentage: 85,
    joinedDate: "Jan 15, 2024",
  },
  {
    id: "2",
    firstName: "Mike",
    lastName: "Chen",
    email: "mike.chen@email.com",
    phone: "+1 234 567 891",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    membershipType: "premium",
    status: "active",
    goals: ["Muscle Gain"],
    sessionsCompleted: 18,
    nextSession: "Tomorrow, 10:00 AM",
    progressPercentage: 72,
    joinedDate: "Feb 3, 2024",
  },
  {
    id: "3",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 234 567 892",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    membershipType: "premium",
    status: "active",
    goals: ["Flexibility", "Stress Relief"],
    sessionsCompleted: 16,
    nextSession: "Wed, 2:00 PM",
    progressPercentage: 90,
    joinedDate: "Jan 20, 2024",
  },
  {
    id: "4",
    firstName: "James",
    lastName: "Brown",
    email: "james.brown@email.com",
    phone: "+1 234 567 893",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    membershipType: "basic",
    status: "active",
    goals: ["Cardio", "Weight Loss"],
    sessionsCompleted: 12,
    nextSession: "Thu, 3:00 PM",
    progressPercentage: 55,
    joinedDate: "Mar 1, 2024",
  },
  {
    id: "5",
    firstName: "Lisa",
    lastName: "Park",
    email: "lisa.park@email.com",
    phone: "+1 234 567 894",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    membershipType: "vip",
    status: "inactive",
    goals: ["Strength Training"],
    sessionsCompleted: 30,
    nextSession: null,
    progressPercentage: 95,
    joinedDate: "Dec 10, 2023",
  },
  {
    id: "6",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@email.com",
    phone: "+1 234 567 895",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    membershipType: "basic",
    status: "active",
    goals: ["General Fitness"],
    sessionsCompleted: 8,
    nextSession: "Fri, 6:00 PM",
    progressPercentage: 35,
    joinedDate: "Mar 15, 2024",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const stats = [
    { label: "Total Clients", value: mockClients.length, icon: Users, color: "from-blue-500 to-indigo-500" },
    { label: "Active", value: mockClients.filter(c => c.status === "active").length, icon: UserCheck, color: "from-emerald-500 to-teal-500" },
    { label: "Inactive", value: mockClients.filter(c => c.status === "inactive").length, icon: UserX, color: "from-amber-500 to-orange-500" },
    { label: "Avg Progress", value: `${Math.round(mockClients.reduce((acc, c) => acc + c.progressPercentage, 0) / mockClients.length)}%`, icon: TrendingUp, color: "from-purple-500 to-pink-500" },
  ];

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || client.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getMembershipBadge = (type: string) => {
    switch (type) {
      case "vip":
        return <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0 shadow-sm">VIP</Badge>;
      case "premium":
        return <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-sm">Premium</Badge>;
      default:
        return <Badge variant="secondary">Basic</Badge>;
    }
  };

  const handleDelete = (client: Client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    setDeleteDialogOpen(false);
    setClientToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <Button
            variant="ghost"
            onClick={() => navigate("/trainer")}
            className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Clients</h1>
              <p className="text-white/80">Manage and track all your client relationships</p>
            </div>
            <Button
              onClick={() => navigate("/trainer/clients/new")}
              className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg shadow-indigo-700/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Client
            </Button>
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

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search clients by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  onClick={() => setActiveFilter("all")}
                  className={activeFilter === "all" ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-0" : ""}
                >
                  All
                </Button>
                <Button
                  variant={activeFilter === "active" ? "default" : "outline"}
                  onClick={() => setActiveFilter("active")}
                  className={activeFilter === "active" ? "bg-gradient-to-r from-emerald-500 to-teal-600 border-0" : ""}
                >
                  Active
                </Button>
                <Button
                  variant={activeFilter === "inactive" ? "default" : "outline"}
                  onClick={() => setActiveFilter("inactive")}
                  className={activeFilter === "inactive" ? "bg-gradient-to-r from-amber-500 to-orange-600 border-0" : ""}
                >
                  Inactive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Grid */}
        {filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Card
                key={client.id}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/trainer/clients/${client.id}`)}
              >
                <CardContent className="p-0">
                  {/* Card Header with Avatar */}
                  <div className="relative p-6 pb-4">
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/trainer/clients/${client.id}`); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/trainer/clients/${client.id}/edit`); }}>
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); handleDelete(client); }}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 border-4 border-white dark:border-gray-800 shadow-lg">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-bold">
                            {client.firstName[0]}{client.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${client.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground truncate">
                          {client.firstName} {client.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </p>
                        <div className="mt-2">
                          {getMembershipBadge(client.membershipType)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {client.goals.map((goal, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-muted/50">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="px-6 pb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Goal Progress</span>
                      <span className="font-semibold text-foreground">{client.progressPercentage}%</span>
                    </div>
                    <Progress value={client.progressPercentage} className="h-2" />
                  </div>

                  {/* Footer Stats */}
                  <div className="px-6 py-4 bg-muted/30 border-t border-border/50 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>{client.sessionsCompleted} sessions</span>
                    </div>
                    {client.nextSession && (
                      <div className="flex items-center gap-1 text-primary">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{client.nextSession}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No clients found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search or filters" : "Start by adding your first client"}
              </p>
              <Button
                onClick={() => navigate("/trainer/clients/new")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Client
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-4 mb-2">
              {clientToDelete && (
                <Avatar className="w-12 h-12">
                  <AvatarImage src={clientToDelete.avatar} />
                  <AvatarFallback>{clientToDelete.firstName[0]}{clientToDelete.lastName[0]}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <AlertDialogTitle>Delete Client</AlertDialogTitle>
                <AlertDialogDescription className="mt-1">
                  {clientToDelete?.firstName} {clientToDelete?.lastName}
                </AlertDialogDescription>
              </div>
            </div>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the client profile
              and all associated session history and progress data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Client
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
