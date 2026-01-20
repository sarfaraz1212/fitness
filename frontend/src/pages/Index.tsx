import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, Heart, Activity, Ruler, Scale, Moon, Cigarette, Wine, 
  Clock, Briefcase, Camera, FileText, Sparkles, Check, ArrowRight, X
} from 'lucide-react';
import GenderComponent from '@/components/onboarding/GenderComponent';
import BloodGroup from '@/components/onboarding/BloodGroup';
import DietPreferences from '@/components/onboarding/DietPreferences';
import FitnessGoal from '@/components/onboarding/FitnessGoal';
import FitnessLevel from '@/components/onboarding/FitnessLevel';
import StressLevel from '@/components/onboarding/StressLevel';
import PreferredTrainingTime from '@/components/onboarding/PreferredTrainingTime';
import FormSection from '@/components/onboarding/FormSection';
import { toast } from '@/hooks/use-toast';
import WeightCheckInModal from "@/components/client/WeightCheckInModal";
import { logDailyWeight, updateDailyWeight } from '@/lib/React-query/queryFunction';

// Calculate age from DOB
const calculateAge = (dob: string): number => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const Index = () => {
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    bloodGroup: '',
    dietPreference: '',
    fitnessGoals: [] as string[],
    weight: '',
    height: '',
    bodyFat: '',
    bmi: '',
    fitnessLevel: '',
    exerciseFrequency: '',
    sleepHours: '',
    smokingFrequency: '',
    alcoholFrequency: '',
    stressLevel: '',
    trainingTime: '',
    workEnvironment: '',
    medicalConditions: '',
    notes: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openWeightModal, setOpenWeightModal] = useState(false);

  // Auto-calculate age from DOB
  const calculatedAge = useMemo(() => calculateAge(formData.dob), [formData.dob]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFitnessGoalChange = (goals: string[]) => {
    setFormData(prev => ({ ...prev, fitnessGoals: goals }));
    if (errors.fitnessGoals) {
      setErrors(prev => ({ ...prev, fitnessGoals: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Image must be less than 10MB' }));
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.profileImage) {
        setErrors(prev => ({ ...prev, profileImage: '' }));
      }
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfilePreview(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    else if (calculatedAge < 13) newErrors.dob = 'You must be at least 13 years old';
    else if (calculatedAge > 120) newErrors.dob = 'Please enter a valid date of birth';

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.dietPreference) newErrors.dietPreference = 'Diet preference is required';
    
    if (formData.fitnessGoals.length === 0) {
      newErrors.fitnessGoals = 'Please select at least one fitness goal';
    }

    if (!formData.weight) newErrors.weight = 'Weight is required';
    else if (parseFloat(formData.weight) < 20 || parseFloat(formData.weight) > 300) {
      newErrors.weight = 'Weight must be between 20 and 300 kg';
    }

    if (!formData.height) newErrors.height = 'Height is required';
    else if (parseFloat(formData.height) < 100 || parseFloat(formData.height) > 250) {
      newErrors.height = 'Height must be between 100 and 250 cm';
    }

    if (formData.bodyFat && (parseFloat(formData.bodyFat) < 3 || parseFloat(formData.bodyFat) > 60)) {
      newErrors.bodyFat = 'Body fat must be between 3% and 60%';
    }

    if (formData.bmi && (parseFloat(formData.bmi) < 10 || parseFloat(formData.bmi) > 50)) {
      newErrors.bmi = 'BMI must be between 10 and 50';
    }

    if (!formData.fitnessLevel) newErrors.fitnessLevel = 'Fitness level is required';

    if (formData.exerciseFrequency && (parseInt(formData.exerciseFrequency) < 0 || parseInt(formData.exerciseFrequency) > 14)) {
      newErrors.exerciseFrequency = 'Exercise frequency must be between 0 and 14 times per week';
    }

    if (formData.sleepHours && (parseFloat(formData.sleepHours) < 1 || parseFloat(formData.sleepHours) > 16)) {
      newErrors.sleepHours = 'Sleep hours must be between 1 and 16';
    }

    if (!formData.stressLevel) newErrors.stressLevel = 'Stress level is required';
    if (!formData.trainingTime) newErrors.trainingTime = 'Preferred training time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some fields need your attention.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Onboarding Complete! 🎉",
      description: "Your profile has been saved successfully.",
    });
    
    setIsSubmitting(false);
  };

  const handleWeightSubmit = async (weight: number, unit: "kg" | "lbs", isUpdate: boolean) => {
    try {
      if (isUpdate) {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        await updateDailyWeight(today, weight, unit);
        toast({
          title: "Weight Updated! 📊",
          description: "Your daily weight has been updated.",
        });
      } else {
        await logDailyWeight(weight);
        toast({
          title: "Weight Logged! 📊",
          description: "Your daily weight has been recorded.",
        });
      }
      setOpenWeightModal(false);
    } catch (error: any) {
      const message = error.graphQLErrors?.[0]?.message || error.message || "Failed to log weight.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      dob: '',
      gender: '',
      bloodGroup: '',
      dietPreference: '',
      fitnessGoals: [],
      weight: '',
      height: '',
      bodyFat: '',
      bmi: '',
      fitnessLevel: '',
      exerciseFrequency: '',
      sleepHours: '',
      smokingFrequency: '',
      alcoholFrequency: '',
      stressLevel: '',
      trainingTime: '',
      workEnvironment: '',
      medicalConditions: '',
      notes: '',
    });
    setProfileImage(null);
    setProfilePreview(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Welcome to Your Fitness Journey
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Let's Get to Know <span className="gradient-text">You</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Help us personalize your experience by sharing a few details about yourself, your lifestyle, and fitness goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
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

          {/* Body Metrics */}
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

          {/* Diet & Goals */}
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

          {/* Activity & Lifestyle */}
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

          {/* Additional Information */}
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
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-card hover:bg-secondary/30 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                      <input 
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

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpenWeightModal(true)}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Scale className="w-4 h-4" />
              Log Daily Weight
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary order-2 sm:order-1"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center justify-center gap-2 order-1 sm:order-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Complete Onboarding
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <WeightCheckInModal
          open={openWeightModal}
          onOpenChange={setOpenWeightModal}
          onSubmit={handleWeightSubmit}
          onSkip={() => setOpenWeightModal(false)}
        />
      </div>
    </div>
  );
};

export default Index;
