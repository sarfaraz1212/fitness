import FormSection from '@/components/onboarding/FormSection'
import { Camera, X, FileText } from 'lucide-react'
import type { AdditionalInformationProps } from '../types/AdditionalInformation'

const AdditionalInformation = ({
    formData, 
    handleChange, 
    errors, 
    profilePreview, 
    handleImageChange, 
    removeImage
}: AdditionalInformationProps) => {
    return (
        <FormSection title="Additional Information" subtitle="Any other details we should know" icon={FileText}>
            <div className="space-y-6">
                <div>
                    <label className="form-label flex items-center gap-2">
                        <Camera className="w-4 h-4 text-primary" />
                        Profile Picture
                    </label>
                    
                    {profilePreview ? (
                        <div className="relative w-32 h-32 mx-auto">
                            <img 
                                src={profilePreview} 
                                alt="Profile preview" 
                                className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-lg"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors shadow-md"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full" onClick={(e) => e.stopPropagation()}>
                            <label 
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-card hover:bg-secondary/30 transition-colors"
                                htmlFor="profile_image_input"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                                </div>
                                <input 
                                    id="profile_image_input"
                                    type="file" 
                                    name="profile_image" 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    )}
                    {errors.profileImage && <p className="form-error text-center mt-2">{errors.profileImage}</p>}
                </div>

                <div>
                    <label className="form-label">Medical Conditions</label>
                    <textarea
                        name="medicalConditions"
                        rows={3}
                        placeholder="Any medical conditions, injuries, or allergies we should be aware of..."
                        value={formData.medicalConditions}
                        onChange={(e) => handleChange('medicalConditions', e.target.value)}
                        className="form-textarea"
                        maxLength={1000}
                    />
                    {errors.medicalConditions && <p className="form-error">{errors.medicalConditions}</p>}
                </div>

                <div>
                    <label className="form-label">Notes / Special Instructions</label>
                    <textarea
                        name="notes"
                        rows={3}
                        placeholder="Any additional information or preferences..."
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        className="form-textarea"
                        maxLength={1000}
                    />
                    {errors.notes && <p className="form-error">{errors.notes}</p>}
                </div>
            </div>
        </FormSection>
    )
}

export default AdditionalInformation

