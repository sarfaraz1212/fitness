import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <Button
          variant="ghost"
          onClick={() => navigate("/trainer")}
          className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Workout Plans
        </h1>
        <p className="text-white/80">
          Create and manage workout plans for your clients
        </p>
      </div>
    </div>
  );
};

export default HeroHeader;
