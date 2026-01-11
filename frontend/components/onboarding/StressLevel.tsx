import React from 'react';
import { Smile, Meh, Frown, AlertCircle, AlertTriangle } from 'lucide-react';

interface StressLevelProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const stressLevels = [
  { value: 'very-low', label: 'Very Low', icon: Smile, color: 'text-green-500', bgColor: 'bg-green-500' },
  { value: 'low', label: 'Low', icon: Smile, color: 'text-emerald-500', bgColor: 'bg-emerald-500' },
  { value: 'moderate', label: 'Moderate', icon: Meh, color: 'text-amber-500', bgColor: 'bg-amber-500' },
  { value: 'high', label: 'High', icon: Frown, color: 'text-orange-500', bgColor: 'bg-orange-500' },
  { value: 'very-high', label: 'Very High', icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-500' },
];

const StressLevel: React.FC<StressLevelProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="form-label">Stress Level</label>
      <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
        {stressLevels.map((level) => {
          const Icon = level.icon;
          const isSelected = value === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-lg transition-all duration-200
                ${isSelected 
                  ? 'bg-card shadow-sm' 
                  : 'hover:bg-card/50'
                }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? level.color : 'text-muted-foreground'}`} />
              <span className={`text-[10px] font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                {level.label}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default StressLevel;
