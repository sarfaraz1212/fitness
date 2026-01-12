import FormSection from '@/components/onboarding/FormSection'
import { Ruler, Scale } from 'lucide-react'
import type { BodyMetricsProps } from '../types/BodyMetrics'

const BodyMetrics = ({formData, handleChange, errors}: BodyMetricsProps) => {
    return (
        <FormSection title="Body Metrics" subtitle="Your physical measurements" icon={Ruler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="form-label flex items-center gap-2">
                        <Scale className="w-4 h-4 text-primary" />
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        name="weight"
                        placeholder="e.g., 70"
                        value={formData.weight}
                        onChange={(e) => handleChange('weight', e.target.value)}
                        className="form-input"
                        min="20"
                        max="300"
                    />
                    {errors.weight && <p className="form-error">{errors.weight}</p>}
                </div>

                <div>
                    <label className="form-label flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-primary" />
                        Height (cm)
                    </label>
                    <input
                        type="number"
                        name="height"
                        placeholder="e.g., 175"
                        value={formData.height}
                        onChange={(e) => handleChange('height', e.target.value)}
                        className="form-input"
                        min="100"
                        max="250"
                    />
                    {errors.height && <p className="form-error">{errors.height}</p>}
                </div>

                <div>
                    <label className="form-label">Body Fat Percentage (%)</label>
                    <input
                        type="number"
                        name="bodyFat"
                        placeholder="e.g., 18"
                        value={formData.bodyFat}
                        onChange={(e) => handleChange('bodyFat', e.target.value)}
                        className="form-input"
                        min="3"
                        max="60"
                    />
                    {errors.bodyFat && <p className="form-error">{errors.bodyFat}</p>}
                </div>

                <div>
                    <label className="form-label">BMI</label>
                    <input
                        type="number"
                        step="0.1"
                        name="bmi"
                        placeholder="e.g., 22.5"
                        value={formData.bmi}
                        onChange={(e) => handleChange('bmi', e.target.value)}
                        className="form-input"
                        min="10"
                        max="50"
                    />
                    {errors.bmi && <p className="form-error">{errors.bmi}</p>}
                </div>
            </div>
        </FormSection>
    )
}

export default BodyMetrics

