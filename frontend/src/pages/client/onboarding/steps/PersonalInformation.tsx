import BloodGroup from '@/components/onboarding/BloodGroup'
import FormSection from '@/components/onboarding/FormSection'
import GenderComponent from '@/components/onboarding/GenderComponent'
import { User } from 'lucide-react'
import type { PersonalInformationProps } from '../types/PersonalInformation'


const PersonalInformation = ({formData,handleChange,errors,calculatedAge}: PersonalInformationProps) => {
    return (
        <>
            <FormSection title="Personal Information" subtitle="Basic details about you" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={(e) => handleChange('dob', e.target.value)}
                            className="form-input"
                            max={new Date().toISOString().split('T')[0]}
                        />
                        {errors.dob && <p className="form-error">{errors.dob}</p>}
                    </div>

                    <div>
                        <label className="form-label">Age (Auto-calculated)</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.dob ? calculatedAge : ''}
                            readOnly
                            placeholder="Will be calculated from DOB"
                            className="form-input bg-muted cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Calculated automatically from your date of birth</p>
                    </div>

                    <GenderComponent
                        value={formData.gender}
                        onChange={(v) => handleChange('gender', v)}
                        error={errors.gender}
                    />

                    <BloodGroup
                        value={formData.bloodGroup}
                        onChange={(v) => handleChange('bloodGroup', v)}
                        error={errors.bloodGroup}
                    />
                </div>
            </FormSection>
        </>
    )
}

export default PersonalInformation