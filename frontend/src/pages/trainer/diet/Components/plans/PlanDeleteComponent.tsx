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

interface PlanDeleteProps {
  deletePlanConfirm: { isOpen: boolean; planId: string; name: string } | null;
  setDeletePlanConfirm: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; planId: string; name: string } | null>
  >;
  handleDeletePlan: () => void;
  buttonLoaders?: { deletingPlan?: boolean }; // optional spinner support
}

const PlanDeleteComponent: React.FC<PlanDeleteProps> = ({
  deletePlanConfirm,
  setDeletePlanConfirm,
  handleDeletePlan,
  buttonLoaders,
}) => {
  return (
    <AlertDialog open={deletePlanConfirm?.isOpen || false}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center text-xl">Delete Diet Plan?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deletePlanConfirm?.name}</span>?
            <span className="block mt-1 text-destructive/80">This will remove all meals in this plan.</span>
            <span className="block mt-2 text-muted-foreground">This action cannot be undone.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <AlertDialogCancel
            className="flex-1 sm:flex-none"
            onClick={() => setDeletePlanConfirm(null)}
            disabled={buttonLoaders?.deletingPlan} // disable cancel if needed
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeletePlan}
            className="flex-1 sm:flex-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={buttonLoaders?.deletingPlan}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {buttonLoaders?.deletingPlan ? "Deleting..." : "Delete Plan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PlanDeleteComponent;
