export interface Meal {
  id: string;
  name: string;
  description: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
  isOpen?: boolean; // Optional property for UI state
}

export interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setShowNewPlanForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NewPlanFormProps {
  formData: { name: string; description: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; description: string }>>;
  handleCreatePlan: () => Promise<void>;
  setShowNewPlanForm: React.Dispatch<React.SetStateAction<boolean>>;
  createDietLoading: any
}

export interface MealForm {
  name: string;
  description: string;
  time: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export interface AddMealFormProps {
  mealForm: MealForm;
  setMealForm: React.Dispatch<React.SetStateAction<MealForm>>;
  handleAddMeal: () => void;
  handleCancel: () => void;
  fetchMacros: (mealName: string) => void;
  fetchMacrosLoading: Boolean
}


export interface CreateDietResponse {
  createDiet: {
    _id: string;
    name: string;
    description: string;
  };
}

export interface CreateDietVariables {
  input: {
    name: string;
    description: string;
  };
}


export interface GetMacrosResponse {
  getMacros: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface GetMacrosVariables {
  name: string
}

export interface DeleteMealVariables {
  dietId: string;
  mealId: string;
}

export interface DeleteDietVariables {
  dietId: string;
}

export interface DeleteDietResponse {
  deleteDiet: string; // the ID of the deleted diet
}

export interface EditDietResponse {
  editDiet: {
    _id: string;
    name: string;
    description: string;
  };
}

export interface EditDietVariables {
  dietId: string;
  input: {
    name: string;
    description: string;
  };
}
