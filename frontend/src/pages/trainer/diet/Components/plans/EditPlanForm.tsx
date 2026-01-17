import React from "react";
import { Pencil, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { DietPlan } from "../../types";

interface EditPlanFormProps {
  editPlan: { isOpen: boolean; plan: DietPlan } | null;
  setEditPlan: React.Dispatch<React.SetStateAction<{ isOpen: boolean; plan: DietPlan } | null>>;
  handleEditPlanSave: () => void;
  buttonLoaders?: { updatingPlan?: boolean };
}

const EditPlanForm: React.FC<EditPlanFormProps> = ({
  editPlan,
  setEditPlan,
  handleEditPlanSave,
  buttonLoaders,
}) => {
  if (!editPlan) return null;

  const handleChange = (field: "name" | "description", value: string) => {
    setEditPlan((prev) =>
      prev
        ? {
            ...prev,
            plan: {
              ...prev.plan,
              [field]: value,
            },
          }
        : null
    );
  };

  return (
    <Dialog
      open={editPlan.isOpen}
      onOpenChange={(open) => {
        if (!open) setEditPlan(null);
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-primary" />
            Edit Diet Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-plan-name">Plan Name *</Label>
            <Input
              id="edit-plan-name"
              placeholder="e.g., Weight Loss Diet"
              value={editPlan.plan.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-plan-desc">Description</Label>
            <Input
              id="edit-plan-desc"
              placeholder="Brief description of this plan"
              value={editPlan.plan.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setEditPlan(null)} disabled={buttonLoaders?.updatingPlan}>
            Cancel
          </Button>
          <Button onClick={handleEditPlanSave} disabled={buttonLoaders?.updatingPlan}>
            {buttonLoaders?.updatingPlan ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanForm;
