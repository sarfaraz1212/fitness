import React from 'react';
import { Leaf, Fish, Egg, Beef } from 'lucide-react';

interface DietPreferencesProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian', icon: Leaf, color: 'text-green-500' },
  { value: 'vegan', label: 'Vegan', icon: Leaf, color: 'text-emerald-500' },
  { value: 'pescatarian', label: 'Pescatarian', icon: Fish, color: 'text-blue-500' },
  { value: 'eggetarian', label: 'Eggetarian', icon: Egg, color: 'text-amber-500' },
  { value: 'non-vegetarian', label: 'Non-Veg', icon: Beef, color: 'text-red-500' },
];

const DietPreferences: React.FC<DietPreferencesProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="form-label">Diet Preference</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {dietOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`option-card flex-col py-3 ${isSelected ? 'selected' : ''}`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : option.color}`} />
              <span className={`text-xs font-medium mt-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default DietPreferences;
