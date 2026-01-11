import React from 'react';
import { Droplets } from 'lucide-react';

interface BloodGroupProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BloodGroup: React.FC<BloodGroupProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="form-label flex items-center gap-2">
        <Droplets className="w-4 h-4 text-destructive" />
        Blood Group
      </label>
      <div className="grid grid-cols-4 gap-2">
        {bloodGroups.map((group) => {
          const isSelected = value === group;
          return (
            <button
              key={group}
              type="button"
              onClick={() => onChange(group)}
              className={`py-3 px-4 rounded-lg border-2 text-sm font-semibold transition-all duration-200
                ${isSelected 
                  ? 'border-primary bg-secondary text-primary' 
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                }`}
            >
              {group}
            </button>
          );
        })}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default BloodGroup;
