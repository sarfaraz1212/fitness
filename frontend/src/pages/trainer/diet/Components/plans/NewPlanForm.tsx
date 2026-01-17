
import {
    Utensils,
    Plus,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { NewPlanFormProps } from "../../types";
import {Spinner} from "../../../../../../components/ui/spinner";

const NewPlanForm: React.FC<NewPlanFormProps> = ({
    formData,
    setFormData,
    handleCreatePlan,
    setShowNewPlanForm,
    createDietLoading
  }) => {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Utensils className="w-5 h-5 text-primary" />
          Create New Diet Plan
        </h2>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plan-name">Plan Name *</Label>
            <Input
              id="plan-name"
              placeholder="e.g., Weight Loss Diet"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan-desc">Description</Label>
            <Input
              id="plan-desc"
              placeholder="Brief description of this plan"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreatePlan} disabled={createDietLoading} className="flex items-center gap-2">
            {createDietLoading ? (
              <>
                <Spinner className="w-4 h-4" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Plan
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => setShowNewPlanForm(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  };
  
  export default NewPlanForm;
  