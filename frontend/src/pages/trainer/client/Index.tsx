import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Users,
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
import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "@/lib/React-query/queryFunction";
import TrainerClientStatsComponent from "./components/TrainerClientStatsComponent";
import TrainerClientSearchComponent from "./components/TrainerClientSearchComponent";
import AppPagination from "@/components/common/AppPagination";



const Index = () => {



  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 1;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [onboardingFilter, setOnboardingFilter] = useState<boolean | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);


  const { data: clientsData, isLoading, error } = useQuery({
    queryKey: ["clients", page, limit, debouncedSearchQuery, onboardingFilter],
    queryFn: () => fetchClients({
      page: page,
      limit: limit,
      search: debouncedSearchQuery,
      onboardingFilter
    })
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, onboardingFilter]);


  if (isLoading) return <div className="p-8 text-center">Loading clients...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading clients</div>;



  const handleDelete = (client: any) => {

    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    setDeleteDialogOpen(false);

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 relative z-10">
          <TrainerClientStatsComponent />
        </div>

        <TrainerClientSearchComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onboardingFilter={onboardingFilter}
          setOnboardingFilter={setOnboardingFilter}
        />

        {/* Client Grid */}
        {clientsData?.clients.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientsData?.clients.map((client: any) => (
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
                            <Button variant="ghost" size="icon" className="opacity-100">
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
                            <AvatarImage src={client.onboarding?.profile_image} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-bold">
                              {client.name}
                            </AvatarFallback>

                          </Avatar>
                          <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${client.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-foreground truncate">
                            {client.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {client.email}
                          </p>

                        </div>
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="px-6 pb-4">
                      <div className="flex flex-wrap gap-2">
                        {client.onboarding?.fitness_goals?.map((goal: string, idx: number) => (
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

            <AppPagination
              currentPage={clientsData.currentPage}
              totalPages={clientsData.totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </>
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


      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-4 mb-2">

              <div>
                <AlertDialogTitle>Delete Client</AlertDialogTitle>
                <AlertDialogDescription className="mt-1">

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
