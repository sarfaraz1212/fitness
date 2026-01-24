import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client/react";
import { client } from '@/lib/apollo';
import CreateOnboarding from "./pages/client/onboarding/Create";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientIndex from "./pages/trainer/client/Index";
import ClientCreate from "./pages/trainer/client/Create";
import ClientView from "./pages/trainer/client/View";
import DietPlanBuilder from "./pages/trainer/diet/Builder";
import WorkoutBuilder from "./pages/trainer/workout/Builder";

const queryClient = new QueryClient();

const App = () => (
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<CreateOnboarding />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/trainer" element={<ProtectedRoute><TrainerDashboard /></ProtectedRoute>} />

              <Route path="/trainer/clients" element={<ProtectedRoute><ClientIndex /></ProtectedRoute>} />
              <Route path="/trainer/diet-plan-builder" element={<ProtectedRoute><DietPlanBuilder /></ProtectedRoute>} />
              <Route path="/trainer/workout-plans" element={<ProtectedRoute><WorkoutBuilder /></ProtectedRoute>} />
              <Route path="/trainer/clients/new" element={<ProtectedRoute><ClientCreate /></ProtectedRoute>} />
              <Route path="/trainer/clients/:id" element={<ClientView />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ApolloProvider>
);

export default App;
