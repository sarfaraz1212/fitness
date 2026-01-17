import type { DietPlan, Meal } from "../types";

export interface SortOptions {
  sortBy: string;
}

export interface SearchOptions {
  searchQuery: string;
}

/**
 * Calculate total macros for a diet plan
 */
export const calculatePlanMacros = (meals: Meal[]) => {
  return meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};

/**
 * Filter diet plans based on search query
 */
export const filterDietPlans = (plans: DietPlan[], searchQuery: string): DietPlan[] => {
  if (!searchQuery.trim()) {
    return plans;
  }

  const query = searchQuery.toLowerCase().trim();

  return plans.filter((plan) => {
    const nameMatch = plan.name.toLowerCase().includes(query);
    const descriptionMatch = plan.description?.toLowerCase().includes(query) || false;
    return nameMatch || descriptionMatch;
  });
};

/**
 * Sort diet plans based on sort option
 */
export const sortDietPlans = (plans: DietPlan[], sortBy: string): DietPlan[] => {
  if (!sortBy) {
    return plans;
  }

  const sortedPlans = [...plans];

  switch (sortBy) {
    case "name":
      return sortedPlans.sort((a, b) => a.name.localeCompare(b.name));

    case "calories":
      return sortedPlans.sort((a, b) => {
        const aTotal = calculatePlanMacros(a.meals).calories;
        const bTotal = calculatePlanMacros(b.meals).calories;
        return bTotal - aTotal; // Highest first
      });

    case "protein":
      return sortedPlans.sort((a, b) => {
        const aTotal = calculatePlanMacros(a.meals).protein;
        const bTotal = calculatePlanMacros(b.meals).protein;
        return bTotal - aTotal; // Highest first
      });

    case "carbs":
      return sortedPlans.sort((a, b) => {
        const aTotal = calculatePlanMacros(a.meals).carbs;
        const bTotal = calculatePlanMacros(b.meals).carbs;
        return bTotal - aTotal; // Highest first
      });

    case "fats":
      return sortedPlans.sort((a, b) => {
        const aTotal = calculatePlanMacros(a.meals).fats;
        const bTotal = calculatePlanMacros(b.meals).fats;
        return bTotal - aTotal; // Highest first
      });

    default:
      return sortedPlans;
  }
};

/**
 * Process diet plans with search and sort
 */
export const processDietPlans = (
  plans: DietPlan[],
  searchQuery: string,
  sortBy: string
): DietPlan[] => {
  const filtered = filterDietPlans(plans, searchQuery);
  return sortDietPlans(filtered, sortBy);
};
