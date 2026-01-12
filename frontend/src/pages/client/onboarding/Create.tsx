import React, { useState, useMemo } from 'react';
import {
  Sparkles, Check, ArrowRight
} from 'lucide-react';
import { z } from 'zod';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import PersonalInformation from './steps/PersonalInformation';
import BodyMetrics from './steps/BodyMetrics';
import DietGoals from './steps/DietGoals';
import ActivityLifestyle from './steps/ActivityLifestyle';
import AdditionalInformation from './steps/AdditionalInformation';
import {
  personalInformationSchema,
  bodyMetricsSchema,
  dietGoalsSchema,
  activityLifestyleSchema,
  additionalInformationSchema,
} from './validations/onboardingValidation';
import { CREATE_ONBOARDING_MUTATION } from '@/graphql/mutations';
import { type CreateOnboardingData } from '@/graphql/types';
import { useMutation } from '@apollo/client/react';


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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

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

  // Auto-calculate age from DOB
  const calculatedAge = useMemo(() => calculateAge(formData.dob), [formData.dob]);

  const [createOnboardingMutation] = useMutation<CreateOnboardingData>(CREATE_ONBOARDING_MUTATION, {
    onCompleted: () => {
      toast({
        title: "Onboarding Complete! 🎉",
        description: "Your profile has been saved successfully.",
      });
      setIsSubmitting(false);
      navigate('/login');
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to save your profile. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

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
    e.stopPropagation();
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    try {
      if (step === 1) {
        personalInformationSchema.parse({
          dob: formData.dob,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
        });
      } else if (step === 2) {
        bodyMetricsSchema.parse({
          weight: formData.weight,
          height: formData.height,
          bodyFat: formData.bodyFat,
          bmi: formData.bmi,
        });
      } else if (step === 3) {
        dietGoalsSchema.parse({
          dietPreference: formData.dietPreference,
          fitnessGoals: formData.fitnessGoals,
        });
      } else if (step === 4) {
        activityLifestyleSchema.parse({
          fitnessLevel: formData.fitnessLevel,
          exerciseFrequency: formData.exerciseFrequency,
          sleepHours: formData.sleepHours,
          stressLevel: formData.stressLevel,
          trainingTime: formData.trainingTime,
          smokingFrequency: formData.smokingFrequency,
          alcoholFrequency: formData.alcoholFrequency,
          workEnvironment: formData.workEnvironment,
        });
      } else if (step === 5) {
        additionalInformationSchema.parse({
          medicalConditions: formData.medicalConditions,
          notes: formData.notes,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        return false;
      }
    }
    return true;
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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

    try {
      // Convert image to base64 if present
      let profileImageBase64: string | undefined;
      if (profileImage) {
        profileImageBase64 = await convertImageToBase64(profileImage);
      }

      // Prepare input data with proper type conversions
      const input = {
        token: token,
        dob: formData.dob,
        age: calculatedAge,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        dietPreference: formData.dietPreference,
        fitnessGoals: formData.fitnessGoals,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : null,
        bmi: formData.bmi ? parseFloat(formData.bmi) : null,
        fitnessLevel: formData.fitnessLevel,
        stressLevel: formData.stressLevel,
        exerciseFrequency: formData.exerciseFrequency || null,
        sleepHours: formData.sleepHours || null,
        smokingFrequency: formData.smokingFrequency || null,
        alcoholFrequency: formData.alcoholFrequency || null,
        trainingTime: formData.trainingTime,
        workEnvironment: formData.workEnvironment,
        medicalConditions: formData.medicalConditions || null,
        notes: formData.notes || null,
        profileImage: profileImageBase64 || null,
      };

      console.log(input);
      await createOnboardingMutation({
        variables: {
          input,
        },
      });
    } catch (error) {
      // Error is handled in onError callback
      console.error('Error submitting onboarding:', error);
    }
  };

  const handleNext = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Please fix the errors",
        description: "Some fields need your attention before proceeding.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
    setCurrentStep(1);
  };

  const stepTitles = [
    'Personal Information',
    'Body Metrics',
    'Diet & Goals',
    'Activity & Lifestyle',
    'Additional Information'
  ];

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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {stepTitles.map((title, index) => (
              <div key={index + 1} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep > index + 1
                      ? 'bg-primary text-primary-foreground'
                      : currentStep === index + 1
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {currentStep > index + 1 ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p className={`text-xs mt-2 text-center hidden md:block ${currentStep === index + 1 ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>
                    {title}
                  </p>
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${currentStep > index + 1 ? 'bg-primary' : 'bg-muted'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <PersonalInformation
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              calculatedAge={calculatedAge}
            />
          )}

          {/* Step 2: Body Metrics */}
          {currentStep === 2 && (
            <BodyMetrics
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}

          {/* Step 3: Diet & Goals */}
          {currentStep === 3 && (
            <DietGoals
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              handleFitnessGoalChange={handleFitnessGoalChange}
            />
          )}

          {/* Step 4: Activity & Lifestyle */}
          {currentStep === 4 && (
            <ActivityLifestyle
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}

          {/* Step 5: Additional Information */}
          {currentStep === 5 && (
            <AdditionalInformation
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              profilePreview={profilePreview}
              handleImageChange={handleImageChange}
              removeImage={removeImage}
            />
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn-secondary flex items-center gap-2"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
            <div className="flex gap-3">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center gap-2"
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
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
