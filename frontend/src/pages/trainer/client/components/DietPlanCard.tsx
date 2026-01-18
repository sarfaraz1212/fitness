import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDiets } from "@/lib/React-query/queryFunction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Utensils,
    Plus,
    Check,
    X,
    Pencil,
    Loader2,
} from "lucide-react";

interface DietPlanCardProps {
    client: {
        firstName: string;
    };
}

const DietPlanCard: React.FC<DietPlanCardProps> = ({ client }) => {
    const [dietDialogOpen, setDietDialogOpen] = useState(false);
    const [dietMode, setDietMode] = useState<"existing" | "new">("existing");
    const [selectedDietId, setSelectedDietId] = useState("");
    const [assignedDiet, setAssignedDiet] = useState<any>(null);
    const [newDiet, setNewDiet] = useState({
        name: "",
        calories: "",
        meals: "",
        description: ""
    });

    
    const { data: dietsData, isLoading: loadingDiets } = useQuery({
        queryKey: ["diets", 1, 10, "", ""],
        queryFn: () => fetchDiets({ page: 1, limit: 10 })
    });

    const existingDietPlans = dietsData?.diets?.map((d: any) => ({
        id: d._id,
        name: d.name,
        description: d.description,
        calories: d.meals?.reduce((acc: number, m: any) => acc + (m.calories || 0), 0) || 0,
        meals: d.meals?.length || 0,
    })) || [];

    const handleAssignDiet = () => {
        if (dietMode === "existing") {
            const plan = existingDietPlans.find((p: any) => p.id === selectedDietId);
            if (plan) {
                setAssignedDiet({
                    ...plan,
                    description: plan.description || "Assigned from library"
                });
            }
        } else {
            setAssignedDiet({
                id: Math.random().toString(),
                name: newDiet.name,
                calories: newDiet.calories,
                meals: newDiet.meals,
                description: newDiet.description
            });
        }
        setDietDialogOpen(false);
    };

    const handleRemoveDiet = () => {
        setAssignedDiet(null);
    };

    return (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-orange-500" />
                    Diet Plan
                </CardTitle>
                <Dialog open={dietDialogOpen} onOpenChange={setDietDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant={assignedDiet ? "outline" : "default"}
                            size="sm"
                            className={!assignedDiet ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-0" : ""}
                        >
                            {assignedDiet ? (
                                <>
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Change Plan
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Assign Diet
                                </>
                            )}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                    <Utensils className="w-5 h-5 text-white" />
                                </div>
                                Assign Diet Plan
                            </DialogTitle>
                            <DialogDescription>
                                Choose an existing diet plan or create a new one for {client.firstName}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            {/* Mode Selection */}
                            <RadioGroup value={dietMode} onValueChange={(v) => setDietMode(v as "existing" | "new")} className="grid grid-cols-2 gap-4">
                                <div>
                                    <RadioGroupItem value="existing" id="existing" className="peer sr-only" />
                                    <Label
                                        htmlFor="existing"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 dark:peer-data-[state=checked]:bg-orange-950/20 cursor-pointer transition-all"
                                    >
                                        <Utensils className="mb-2 h-6 w-6 text-orange-500" />
                                        <span className="text-sm font-medium">Existing Plan</span>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="new" id="new" className="peer sr-only" />
                                    <Label
                                        htmlFor="new"
                                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 dark:peer-data-[state=checked]:bg-orange-950/20 cursor-pointer transition-all"
                                    >
                                        <Plus className="mb-2 h-6 w-6 text-orange-500" />
                                        <span className="text-sm font-medium">Create New</span>
                                    </Label>
                                </div>
                            </RadioGroup>

                            {/* Existing Diet Plans */}
                            {dietMode === "existing" && (
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Select Diet Plan</Label>
                                    {loadingDiets ? (
                                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
                                            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                                            <p className="text-sm">Loading diet plans...</p>
                                        </div>
                                    ) : existingDietPlans.length > 0 ? (
                                        <RadioGroup value={selectedDietId} onValueChange={setSelectedDietId} className="grid grid-cols-2 gap-4">
                                            {existingDietPlans.map((plan: any) => (
                                                <div key={plan.id}>
                                                    <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} className="peer sr-only" />
                                                    <Label
                                                        htmlFor={`plan-${plan.id}`}
                                                        className="flex items-center gap-4 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent cursor-pointer peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 dark:peer-data-[state=checked]:bg-orange-950/20 transition-all h-full"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center shrink-0">
                                                            <Utensils className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-foreground truncate">{plan.name}</p>
                                                            <p className="text-xs text-muted-foreground">{plan.calories} kcal • {plan.meals} meals</p>
                                                        </div>
                                                        {selectedDietId === plan.id && (
                                                            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                                            <p className="text-sm">No diet plans found.</p>
                                            <Button
                                                variant="link"
                                                className="text-orange-500 h-auto p-0"
                                                onClick={() => setDietMode("new")}
                                            >
                                                Create one now
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* New Diet Form */}
                            {dietMode === "new" && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="diet-name">Plan Name *</Label>
                                        <Input
                                            id="diet-name"
                                            placeholder="e.g., Custom Weight Loss Plan"
                                            value={newDiet.name}
                                            onChange={(e) => setNewDiet({ ...newDiet, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="diet-calories">Daily Calories *</Label>
                                            <Input
                                                id="diet-calories"
                                                type="number"
                                                placeholder="e.g., 2000"
                                                value={newDiet.calories}
                                                onChange={(e) => setNewDiet({ ...newDiet, calories: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="diet-meals">Meals per Day</Label>
                                            <Input
                                                id="diet-meals"
                                                type="number"
                                                placeholder="e.g., 5"
                                                value={newDiet.meals}
                                                onChange={(e) => setNewDiet({ ...newDiet, meals: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="diet-description">Description</Label>
                                        <Textarea
                                            id="diet-description"
                                            placeholder="Brief description of the diet plan..."
                                            value={newDiet.description}
                                            onChange={(e) => setNewDiet({ ...newDiet, description: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDietDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAssignDiet}
                                disabled={(dietMode === "existing" && !selectedDietId) || (dietMode === "new" && (!newDiet.name || !newDiet.calories))}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-0"
                            >
                                {dietMode === "existing" ? "Assign Plan" : "Create & Assign"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {loadingDiets ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
                        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                        <p className="text-sm font-medium">Loading diet information...</p>
                    </div>
                ) : assignedDiet ? (
                    <div className="relative">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200 dark:border-orange-800">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <Utensils className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-foreground text-lg">{assignedDiet.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{assignedDiet.description}</p>
                                <div className="flex gap-4 mt-3">
                                    <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border-0">
                                        {assignedDiet.calories} kcal/day
                                    </Badge>
                                    <Badge variant="outline" className="border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300">
                                        {assignedDiet.meals} meals/day
                                    </Badge>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleRemoveDiet}
                                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                            <Utensils className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground mb-2">No diet plan assigned</p>
                        <p className="text-sm text-muted-foreground/70">
                            Click "Assign Diet" to set up a nutrition plan for {client.firstName}.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DietPlanCard;
