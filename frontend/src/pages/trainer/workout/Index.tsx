import {
    Dumbbell,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    Repeat,
    Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import HeroHeader from "./components/HeroHeader";
import { SearchComponent } from "./components/SearchComponent";
import { usePlan } from "./usePlan";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import AppPagination from "@/components/common/AppPagination";
import { EditWorkoutPlanModal } from "./components/EditWorkoutPlanModal";
import { EditExerciseModal } from "./components/EditExerciseModal";
import type { Exercise, WorkoutPlan } from "./types";

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
    const [page, setPage] = useState(1);
    const limit = 8;
    const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
    const [editingExercise, setEditingExercise] = useState<{ planId: string; exercise: Exercise } | null>(null);
    const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);
    const [isEditExerciseModalOpen, setIsEditExerciseModalOpen] = useState(false);

    const {
        workoutPlans,
        pagination,
        loadingPlans,
        isLoading,
        activePlanId,
        setActivePlanId,
        exerciseForm,
        setExerciseForm,
        handleAddExercise,
        handleRemoveExercise,
        handleDeletePlan,
        togglePlan,
    } = usePlan({
        page,
        limit,
        search: debouncedSearchQuery,
    });

    useEffect(() => {
        setPage(1);
    }, [debouncedSearchQuery]);

    return (
        <div className="min-h-screen bg-background">
            <HeroHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchComponent
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {loadingPlans || isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Dumbbell className="w-8 h-8 text-primary animate-spin" />
                        <span className="ml-3 text-lg font-medium">Loading plans...</span>
                    </div>
                ) : (
                    <>
                        {/* Workout Plans List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            {workoutPlans.length === 0 ? (
                                <div className="col-span-1 md:col-span-2 text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                                    <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        {searchQuery
                                            ? `No workout plans found for "${searchQuery}"`
                                            : "No workout plans yet. Create your first one!"
                                        }
                                    </p>
                                </div>
                            ) : (
                                workoutPlans.map((plan: any) => (
                                    <div key={plan.id} className="h-full">
                                        <Collapsible open={plan.isOpen} onOpenChange={() => togglePlan(plan.id)}>
                                            <div className="rounded-2xl bg-card shadow-soft overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-300">
                                                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                            <Dumbbell className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div className="text-left">
                                                            <h3 className="font-semibold text-foreground line-clamp-1">{plan.name}</h3>
                                                            <p className="text-sm text-muted-foreground">{plan.exercises.length} exercises</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-primary hover:text-primary hover:bg-primary/10"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingPlan(plan);
                                                                setIsEditPlanModalOpen(true);
                                                            }}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            onClick={(e) => { e.stopPropagation(); handleDeletePlan(plan.id); }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                        {plan.isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                                                    </div>
                                                </CollapsibleTrigger>

                                                <CollapsibleContent>
                                                    <div className="px-4 pb-4 space-y-4">
                                                        {plan.description && (
                                                            <p className="text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
                                                        )}

                                                        {/* Exercises List */}
                                                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                                            {plan.exercises.map((exercise: any, index: number) => (
                                                                <div key={exercise.id} className="p-3 rounded-xl bg-muted/30 flex items-start justify-between gap-3">
                                                                    <div className="flex gap-3 min-w-0">
                                                                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                                                                            {index + 1}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <span className="font-medium text-foreground text-sm truncate block">{exercise.name}</span>
                                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                                {exercise.sets > 0 && (
                                                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium flex items-center gap-1">
                                                                                        <Repeat className="w-2.5 h-2.5" /> {exercise.sets}
                                                                                    </span>
                                                                                )}
                                                                                {exercise.reps > 0 && (
                                                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">
                                                                                        {exercise.reps} reps
                                                                                    </span>
                                                                                )}
                                                                                {exercise.weight && (
                                                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-medium">
                                                                                        {exercise.weight}kg
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-1 shrink-0">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-primary hover:text-primary hover:bg-primary/10"
                                                                            onClick={() => {
                                                                                setEditingExercise({ planId: plan.id, exercise });
                                                                                setIsEditExerciseModalOpen(true);
                                                                            }}
                                                                        >
                                                                            <Edit className="w-3.5 h-3.5" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                                            onClick={() => handleRemoveExercise(plan.id, exercise.id)}
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Add Exercise Form */}
                                                        {activePlanId === plan.id ? (
                                                            <div className="p-4 rounded-xl border border-border space-y-3 bg-muted/20">
                                                                <div className="space-y-1">
                                                                    <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Exercise Name</Label>
                                                                    <Input
                                                                        placeholder="e.g., Bench Press"
                                                                        value={exerciseForm.name}
                                                                        onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })}
                                                                        className="h-8 text-sm"
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="space-y-1">
                                                                        <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Sets</Label>
                                                                        <Input type="number" placeholder="0" value={exerciseForm.sets} onChange={(e) => setExerciseForm({ ...exerciseForm, sets: e.target.value })} className="h-8 text-sm" />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Reps</Label>
                                                                        <Input type="number" placeholder="0" value={exerciseForm.reps} onChange={(e) => setExerciseForm({ ...exerciseForm, reps: e.target.value })} className="h-8 text-sm" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 pt-1">
                                                                    <Button size="sm" onClick={() => handleAddExercise(plan.id)} className="flex-1 h-8 text-xs">
                                                                        <Plus className="w-3.5 h-3.5 mr-1" /> Add
                                                                    </Button>
                                                                    <Button size="sm" variant="outline" onClick={() => setActivePlanId(null)} className="h-8 text-xs">Cancel</Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Button variant="outline" className="w-full h-9 text-xs border-dashed" onClick={() => setActivePlanId(plan.id)}>
                                                                <Plus className="w-3.5 h-3.5 mr-2" /> Add Exercise
                                                            </Button>
                                                        )}
                                                    </div>
                                                </CollapsibleContent>
                                            </div>
                                        </Collapsible>
                                    </div>
                                ))
                            )}
                        </div>

                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-10 flex justify-center">
                                <AppPagination
                                    currentPage={pagination.currentPage}
                                    totalPages={pagination.totalPages}
                                    onPageChange={(p) => setPage(p)}
                                />
                            </div>
                        )}

                        <EditWorkoutPlanModal
                            open={isEditPlanModalOpen}
                            onOpenChange={setIsEditPlanModalOpen}
                            plan={editingPlan}
                        />

                        <EditExerciseModal
                            open={isEditExerciseModalOpen}
                            onOpenChange={setIsEditExerciseModalOpen}
                            planId={editingExercise?.planId || null}
                            exercise={editingExercise?.exercise || null}
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default Index;
