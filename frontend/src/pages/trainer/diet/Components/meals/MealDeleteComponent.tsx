import React from "react";
import { Trash2 } from "lucide-react";
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
import {Spinner} from "../../../../../../components/ui/spinner";

interface MealDeleteProps {
  deleteMealConfirm: { isOpen: boolean; planId: string; mealId: string; name: string } | null;
  setDeleteMealConfirm: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; planId: string; mealId: string; name: string } | null>
  >;
  handleDeleteMeal: () => void;
  buttonLoaders: { deletingMeal: boolean };
}

const MealDeleteComponent: React.FC<MealDeleteProps> = ({
  deleteMealConfirm,
  setDeleteMealConfirm,
  handleDeleteMeal,
  buttonLoaders,
}) => {
  return (
    <AlertDialog open={deleteMealConfirm?.isOpen || false}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center text-xl">Delete Meal?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deleteMealConfirm?.name}</span>?
            <span className="block mt-2 text-muted-foreground">This action cannot be undone.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <AlertDialogCancel
            className="flex-1 sm:flex-none"
            onClick={() => setDeleteMealConfirm(null)}
            disabled={buttonLoaders.deletingMeal} // disable cancel during deletion
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteMeal}
            className="flex-1 sm:flex-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={buttonLoaders.deletingMeal}
          >
            {buttonLoaders.deletingMeal ? (
              <Spinner className="w-4 h-4 mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Delete Meal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MealDeleteComponent;
