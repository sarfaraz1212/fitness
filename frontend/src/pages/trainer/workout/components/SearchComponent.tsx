import React from "react";
import { Plus, Search, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateWorkoutPlanModal } from "./CreateWorkoutPlanModal";

interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search workout plans..."
          className="pl-10 bg-card"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="shrink-0" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Plan
        </Button>
      </div>

      <CreateWorkoutPlanModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};
