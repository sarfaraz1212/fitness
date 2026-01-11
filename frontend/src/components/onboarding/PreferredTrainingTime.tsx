import React from 'react';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

interface PreferredTrainingTimeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const trainingTimes = [
  { value: 'early-morning', label: 'Early Morning', time: '5-7 AM', icon: Sunrise, gradient: 'from-orange-300 to-pink-300' },
  { value: 'morning', label: 'Morning', time: '7-10 AM', icon: Sun, gradient: 'from-amber-300 to-orange-300' },
  { value: 'afternoon', label: 'Afternoon', time: '12-4 PM', icon: Sun, gradient: 'from-yellow-300 to-amber-300' },
  { value: 'evening', label: 'Evening', time: '4-7 PM', icon: Sunset, gradient: 'from-orange-400 to-red-400' },
  { value: 'night', label: 'Night', time: '7-10 PM', icon: Moon, gradient: 'from-indigo-400 to-purple-500' },
];

const PreferredTrainingTime: React.FC<PreferredTrainingTimeProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="form-label">Preferred Training Time</label>
      <div className="grid grid-cols-5 gap-2">
        {trainingTimes.map((time) => {
          const Icon = time.icon;
          const isSelected = value === time.value;
          return (
            <button
              key={time.value}
              type="button"
              onClick={() => onChange(time.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-primary bg-secondary shadow-glow' 
                  : 'border-border bg-card hover:border-primary/40'
                }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${time.gradient} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <p className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {time.label}
                </p>
                <p className="text-[10px] text-muted-foreground">{time.time}</p>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default PreferredTrainingTime;
