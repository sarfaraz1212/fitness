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
import type { SearchComponentProps } from "../types";



export const SearchComponent: React.FC<SearchComponentProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  setShowNewPlanForm,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search diet plans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card"
        />
      </div>
      <div className="flex gap-3">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] bg-card">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="calories">Highest Calories</SelectItem>
            <SelectItem value="protein">Highest Protein</SelectItem>
            <SelectItem value="carbs">Highest Carbs</SelectItem>
            <SelectItem value="fats">Highest Fats</SelectItem>
            <SelectItem value="meals">Most Meals</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => setShowNewPlanForm(true)}
          className="shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Plan
        </Button>
      </div>
    </div>
  );
};
