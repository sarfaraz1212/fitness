import FitnessLevel from '@/components/onboarding/FitnessLevel'
import PreferredTrainingTime from '@/components/onboarding/PreferredTrainingTime'
import StressLevel from '@/components/onboarding/StressLevel'
import FormSection from '@/components/onboarding/FormSection'
import { Activity, Moon, Cigarette, Wine, Briefcase } from 'lucide-react'
import type { ActivityLifestyleProps } from '../types/ActivityLifestyle'

const ActivityLifestyle = ({formData, handleChange, errors}: ActivityLifestyleProps) => {
    return (
        <FormSection title="Activity & Lifestyle" subtitle="Your daily habits and routines" icon={Activity}>
            <div className="space-y-6">
                <FitnessLevel 
                    value={formData.fitnessLevel} 
                    onChange={(v) => handleChange('fitnessLevel', v)}
                    error={errors.fitnessLevel}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" />
                            Exercise Frequency (per week)
                        </label>
                        <input
                            type="number"
                            name="exerciseFrequency"
                            placeholder="e.g., 4"
                            value={formData.exerciseFrequency}
                            onChange={(e) => handleChange('exerciseFrequency', e.target.value)}
                            className="form-input"
                            min="0"
                            max="14"
                        />
                        {errors.exerciseFrequency && <p className="form-error">{errors.exerciseFrequency}</p>}
                    </div>

                    <div>
                        <label className="form-label flex items-center gap-2">
                            <Moon className="w-4 h-4 text-primary" />
                            Sleep Hours (per day)
                        </label>
                        <input
                            type="number"
                            name="sleepHours"
                            placeholder="e.g., 7"
                            value={formData.sleepHours}
                            onChange={(e) => handleChange('sleepHours', e.target.value)}
                            className="form-input"
                            min="1"
                            max="16"
                        />
                        {errors.sleepHours && <p className="form-error">{errors.sleepHours}</p>}
                    </div>

                    <div>
                        <label className="form-label flex items-center gap-2">
                            <Cigarette className="w-4 h-4 text-muted-foreground" />
                            Smoking Frequency
                        </label>
                        <select
                            name="smokingFrequency"
                            value={formData.smokingFrequency}
                            onChange={(e) => handleChange('smokingFrequency', e.target.value)}
                            className="form-select"
                        >
                            <option value="">Select Frequency</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="occasionally">Occasionally</option>
                            <option value="never">Never</option>
                        </select>
                        {errors.smokingFrequency && <p className="form-error">{errors.smokingFrequency}</p>}
                    </div>

                    <div>
                        <label className="form-label flex items-center gap-2">
                            <Wine className="w-4 h-4 text-muted-foreground" />
                            Alcohol Consumption
                        </label>
                        <select
                            name="alcoholFrequency"
                            value={formData.alcoholFrequency}
                            onChange={(e) => handleChange('alcoholFrequency', e.target.value)}
                            className="form-select"
                        >
                            <option value="">Select Frequency</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="occasionally">Occasionally</option>
                            <option value="never">Never</option>
                        </select>
                        {errors.alcoholFrequency && <p className="form-error">{errors.alcoholFrequency}</p>}
                    </div>
                </div>

                <StressLevel 
                    value={formData.stressLevel} 
                    onChange={(v) => handleChange('stressLevel', v)}
                    error={errors.stressLevel}
                />

                <PreferredTrainingTime 
                    value={formData.trainingTime} 
                    onChange={(v) => handleChange('trainingTime', v)}
                    error={errors.trainingTime}
                />

                <div>
                    <label className="form-label flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Work Environment
                    </label>
                    <select
                        name="workEnvironment"
                        value={formData.workEnvironment}
                        onChange={(e) => handleChange('workEnvironment', e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select Environment</option>
                        <option value="desk">Desk Job (Sedentary)</option>
                        <option value="active">Active Job (Physical work)</option>
                        <option value="mixed">Mixed (Some desk, some movement)</option>
                        <option value="remote">Remote / Work from home</option>
                    </select>
                    {errors.workEnvironment && <p className="form-error">{errors.workEnvironment}</p>}
                </div>
            </div>
        </FormSection>
    )
}

export default ActivityLifestyle

