import React, { createContext, useContext, useState } from "react";
import { CV, Education, WorkExperience } from "@/types/types";

interface CVContextType {
  cv: CV;
  setCV: React.Dispatch<React.SetStateAction<CV>>;
  handlePersonalInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSummaryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  clearSummary: () => void;
  addEducation: () => void;
  updateEducation: (
    id: number,
    field: keyof Education,
    value: string | string[]
  ) => void;
  deleteEducation: (id: number) => void;
  addExperience: () => void;
  updateExperience: (
    id: number,
    field: keyof WorkExperience,
    value: string | string[]
  ) => void;
  deleteExperience: (id: number) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cv, setCV] = useState<CV>({
    cv_id: 1,
    user_id: 1,
    title: "Sample CV",
    personal_info: {
      personal_info_id: 1,
      full_name: "Juan Ewan",
      email: "juan@gmail.com",
      phone_number: "09123456789",
      address: "Lugar, Sa Pilipinas",
    },
    summary: "Very long summary...",
    professional_experience: [],
    education: [],
    skills: [],
  });

  // Personal Info Handler
  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCV((prevCV) => ({
      ...prevCV,
      personal_info: {
        ...prevCV.personal_info,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // Summary Handler
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCV((prevCV) => ({
      ...prevCV,
      summary: e.target.value,
    }));
  };

  // Clear Summary Handler
  const clearSummary = () => {
    setCV((prevCV) => ({
      ...prevCV,
      summary: "",
    }));
  };

  // Education handlers
  const addEducation = () => {
    const newEducation: Education = {
      education_id: Date.now(),
      degree: "",
      institution: "",
      address: "",
      additional_details: [],
      start_date: "",
      end_date: "",
    };
    setCV((prevCV) => ({
      ...prevCV,
      education: [...(prevCV.education || []), newEducation],
    }));
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string | string[]
  ) => {
    setCV((prevCV) => ({
      ...prevCV,
      education: prevCV.education
        ? prevCV.education.map((edu) =>
            edu.education_id === id ? { ...edu, [field]: value } : edu
          )
        : [],
    }));
  };

  const deleteEducation = (id: number) => {
    setCV((prevCV) => ({
      ...prevCV,
      education: prevCV.education
        ? prevCV.education.filter((edu) => edu.education_id !== id)
        : [],
    }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExperience: WorkExperience = {
      work_id: Date.now(),
      job_title: "",
      company_name: "",
      address: "",
      start_date: "",
      end_date: "",
      bullet_details: [],
    };
    setCV((prevCV) => ({
      ...prevCV,
      professional_experience: [
        ...(prevCV.professional_experience || []),
        newExperience,
      ],
    }));
  };

  const updateExperience = (
    id: number,
    field: keyof WorkExperience,
    value: string | string[]
  ) => {
    setCV((prevCV) => ({
      ...prevCV,
      professional_experience:
        prevCV.professional_experience?.map((exp) =>
          exp.work_id === id ? { ...exp, [field]: value } : exp
        ) || [],
    }));
  };

  const deleteExperience = (id: number) => {
    setCV((prevCV) => ({
      ...prevCV,
      professional_experience:
        prevCV.professional_experience?.filter((exp) => exp.work_id !== id) ||
        [],
    }));
  };

  return (
    <CVContext.Provider
      value={{
        cv,
        setCV,
        handlePersonalInfoChange,
        handleSummaryChange,
        clearSummary,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

// Custom hook to access the context
export const useCV = (): CVContextType => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
