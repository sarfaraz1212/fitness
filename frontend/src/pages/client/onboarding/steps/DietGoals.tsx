import DietPreferences from '@/components/onboarding/DietPreferences'
import FitnessGoal from '@/components/onboarding/FitnessGoal'
import FormSection from '@/components/onboarding/FormSection'
import { Heart } from 'lucide-react'
import type { DietGoalsProps } from '../types/DietGoals'

const DietGoals = ({formData, handleChange, errors, handleFitnessGoalChange}: DietGoalsProps) => {
    return (
        <FormSection title="Diet & Goals" subtitle="Your nutrition and fitness objectives" icon={Heart}>
            <div className="space-y-6">
                <DietPreferences 
                    value={formData.dietPreference} 
                    onChange={(v) => handleChange('dietPreference', v)}
                    error={errors.dietPreference}
                />
                
                <FitnessGoal 
                    value={formData.fitnessGoals} 
                    onChange={handleFitnessGoalChange}
                    error={errors.fitnessGoals}
                />
            </div>
        </FormSection>
    )
}

export default DietGoals

