import React from 'react';
import { User, Users } from 'lucide-react';

interface GenderComponentProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const genderOptions = [
  { value: 'male', label: 'Male', icon: User },
  { value: 'female', label: 'Female', icon: User },
  { value: 'other', label: 'Other', icon: Users },
];

const GenderComponent: React.FC<GenderComponentProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="form-label">Gender</label>
      <div className="grid grid-cols-3 gap-3">
        {genderOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`option-card flex-col py-4 ${isSelected ? 'selected' : ''}`}
            >
              <div className={`option-card-icon ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
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

export default GenderComponent;
