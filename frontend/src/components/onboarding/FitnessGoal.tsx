import React from 'react';
import { TrendingDown, Scale, TrendingUp, Dumbbell, Heart, Check } from 'lucide-react';

interface FitnessGoalProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const fitnessGoals = [
  { value: 'lose-weight', label: 'Lose Weight', icon: TrendingDown, description: 'Burn fat & slim down' },
  { value: 'maintain', label: 'Maintain', icon: Scale, description: 'Keep current weight' },
  { value: 'gain-weight', label: 'Gain Weight', icon: TrendingUp, description: 'Build mass' },
  { value: 'build-muscle', label: 'Build Muscle', icon: Dumbbell, description: 'Get stronger' },
  { value: 'improve-health', label: 'Get Healthy', icon: Heart, description: 'Overall wellness' },
];

const FitnessGoal: React.FC<FitnessGoalProps> = ({ value, onChange, error }) => {
  const toggleGoal = (goalValue: string) => {
    if (value.includes(goalValue)) {
      onChange(value.filter(v => v !== goalValue));
    } else {
      onChange([...value, goalValue]);
    }
  };

  return (
    <div>
      <label className="form-label">
        Fitness Goals 
        <span className="text-xs text-muted-foreground ml-2">(Select multiple)</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {fitnessGoals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = value.includes(goal.value);
          return (
            <button
              key={goal.value}
              type="button"
              onClick={() => toggleGoal(goal.value)}
              className={`option-card relative ${isSelected ? 'selected' : ''}`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <div className={`option-card-icon ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {goal.label}
                </p>
                <p className="text-xs text-muted-foreground">{goal.description}</p>
              </div>
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Selected: {value.map(v => fitnessGoals.find(g => g.value === v)?.label).join(', ')}
        </p>
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FitnessGoal;
