import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Sparkles } from "lucide-react";
import type { AddMealFormProps } from "../../types";
import {Spinner} from "../../../../../../components/ui/spinner";


const AddMealForm: React.FC<AddMealFormProps> = ({
  mealForm,
  setMealForm,
  handleAddMeal,
  handleCancel,
  fetchMacros,
  fetchMacrosLoading
}) => {
  return (
    <div className="p-4 rounded-xl border border-border space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Meal Name *</Label>
          <Input
            placeholder="e.g., Breakfast"
            value={mealForm.name}
            onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
            onBlur={() => fetchMacros(mealForm.name)}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Time</Label>
          <Input
            type="time"
            value={mealForm.time}
            onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Description</Label>
        <Input
          placeholder="e.g., Eggs with toast"
          value={mealForm.description}
          onChange={(e) =>
            setMealForm({ ...mealForm, description: e.target.value })
          }
        />
      </div>

      {fetchMacrosLoading ? (
     <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" 
          style={{ 
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }} 
        />
        <div className="flex flex-col items-center justify-center gap-3 relative z-10">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <Loader2 className="w-14 h-14 text-primary absolute -top-1 -left-1 animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Fetching with AI...</p>
            <p className="text-xs text-muted-foreground mt-0.5">Analyzing nutrition data</p>
          </div>
          <div className="flex gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Calories</Label>
            <Input
              type="number"
              placeholder="0"
              value={mealForm.calories}
              onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Protein (g)</Label>
            <Input
              type="number"
              placeholder="0"
              value={mealForm.protein}
              onChange={(e) => setMealForm({ ...mealForm, protein: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Carbs (g)</Label>
            <Input
              type="number"
              placeholder="0"
              value={mealForm.carbs}
              onChange={(e) => setMealForm({ ...mealForm, carbs: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Fats (g)</Label>
            <Input
              type="number"
              placeholder="0"
              value={mealForm.fats}
              onChange={(e) => setMealForm({ ...mealForm, fats: e.target.value })}
            />
          </div>
        </div>
      )}


      <div className="flex gap-2">
        <Button size="sm" onClick={handleAddMeal} className="flex-1">
          <Plus className="w-4 h-4 mr-1" /> Add Meal
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddMealForm;
