import React from 'react';
import { Baby, User, Zap, Flame, Crown } from 'lucide-react';

interface FitnessLevelProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const fitnessLevels = [
  { value: 'beginner', label: 'Beginner', icon: Baby, description: 'Just starting out' },
  { value: 'intermediate', label: 'Intermediate', icon: User, description: '6+ months experience' },
  { value: 'advanced', label: 'Advanced', icon: Zap, description: '2+ years experience' },
  { value: 'expert', label: 'Expert', icon: Flame, description: '5+ years experience' },
  { value: 'athlete', label: 'Athlete', icon: Crown, description: 'Professional level' },
];

const FitnessLevel: React.FC<FitnessLevelProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="form-label">Fitness Level</label>
      <div className="flex flex-wrap gap-2">
        {fitnessLevels.map((level, index) => {
          const Icon = level.icon;
          const isSelected = value === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-primary bg-secondary text-primary' 
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{level.label}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FitnessLevel;
