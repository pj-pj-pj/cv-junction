import React, { createContext, useContext, useState } from "react";
import { CV, Education, WorkExperience } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

interface CVContextType {
  cvList: CV[];
  selectedCV: CV | null;
  setCVList: (cvs: CV[]) => void;
  setSelectedCV: (cv: CV) => void;
  createNewCV: () => void;
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
  const [cvList, setCVList] = useState<CV[]>([]);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);

  const handleSetCVList = (cvs: CV[]) => {
    setCVList(cvs);
    if (cvs.length > 0 && !selectedCV) {
      setSelectedCV(cvs[0]);
    }
  };

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        personal_info: {
          ...prevCV!.personal_info,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        summary: e.target.value,
      }));
    }
  };

  const clearSummary = () => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        summary: "",
      }));
    }
  };

  const addEducation = () => {
    if (selectedCV) {
      const newEducation: Education = {
        education_id: Date.now(),
        degree: "",
        institution: "",
        address: "",
        additional_details: [],
        start_date: "",
        end_date: "",
      };
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        education: [...(prevCV!.education || []), newEducation],
      }));
    }
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string | string[]
  ) => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        education: prevCV!.education?.map((edu) =>
          edu.education_id === id ? { ...edu, [field]: value } : edu
        ),
      }));
    }
  };

  const deleteEducation = (id: number) => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        education: prevCV!.education?.filter((edu) => edu.education_id !== id),
      }));
    }
  };

  const addExperience = () => {
    if (selectedCV) {
      const newExperience: WorkExperience = {
        work_id: Date.now(),
        job_title: "",
        company_name: "",
        address: "",
        start_date: "",
        end_date: "",
        bullet_details: [],
      };
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        professional_experience: [
          ...(prevCV!.professional_experience || []),
          newExperience,
        ],
      }));
    }
  };

  const updateExperience = (
    id: number,
    field: keyof WorkExperience,
    value: string | string[]
  ) => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        professional_experience: prevCV!.professional_experience?.map((exp) =>
          exp.work_id === id ? { ...exp, [field]: value } : exp
        ),
      }));
    }
  };

  const deleteExperience = (id: number) => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        professional_experience: prevCV!.professional_experience?.filter(
          (exp) => exp.work_id !== id
        ),
      }));
    }
  };

  const createNewCV = () => {
    const newCV: CV = {
      cv_id: Number(uuidv4()),
      user_id: Number(uuidv4()),
      title: "",
      personal_info: {
        personal_info_id: Number(uuidv4()), // Generates a unique ID for personal info
        full_name: "",
        email: "",
        phone_number: "",
        address: "",
      },
      summary: "",
      education: [],
      professional_experience: [],
      skills: [],
    };

    setCVList((prevList) => [...prevList, newCV]);
    setSelectedCV(newCV);
  };

  return (
    <CVContext.Provider
      value={{
        cvList,
        selectedCV,
        setCVList: handleSetCVList,
        setSelectedCV,
        createNewCV,
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

export const useCV = (): CVContextType => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
