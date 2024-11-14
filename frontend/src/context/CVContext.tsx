import React, { createContext, useContext, useState } from "react";
import { CV, Education, Project, WorkExperience } from "@/types/types";

interface CVContextType {
  cvList: CV[];
  selectedCV: CV | null;
  setCVList: (cvs: CV[]) => void;
  setSelectedCV: (cv: CV) => void;
  createNewCV: (title: string) => void;
  deleteCV: (cv_id: number) => void;
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
  updateSkills: (skills: string[]) => void;
  addProject: () => void;
  updateProject: (
    id: number,
    field: keyof Project,
    value: string | string[]
  ) => void;
  deleteProject: (id: number) => void;
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
    // const filteredValue = Array.isArray(value)
    //   ? value.filter((item) => item.trim() !== "")
    //   : value;

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
    // const filteredValue = Array.isArray(value)
    //   ? value.filter((item) => item.trim() !== "")
    //   : value;

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

  const generateUniqueId = () => Date.now() / 2;

  const createNewCV = (title: string) => {
    const newCV: CV = {
      cv_id: generateUniqueId(),
      user_id: generateUniqueId(),
      title: title,
      personal_info: {
        personal_info_id: generateUniqueId(), // Generates a unique ID for personal info
        full_name: "",
        email: "",
        phone_number: "",
        address: "",
      },
      summary: "",
      education: [],
      professional_experience: [],
      skills: { skills_id: generateUniqueId(), skills_details: [] },
    };

    setCVList((prevList) => [...prevList, newCV]);
    setSelectedCV(newCV);
  };

  const deleteCV = (cv_id: number) => {
    setCVList((prevList) => prevList.filter((cv) => cv.cv_id !== cv_id));
    setSelectedCV(cvList.length > 1 ? cvList[0] : null);
    if (cvList.indexOf(selectedCV!) === 0)
      setSelectedCV(cvList.length > 1 ? cvList[1] : null);
  };

  const updateSkills = (newSkills: string[]) => {
    // const filteredSkills = newSkills.filter((skill) => skill.trim() !== "");
    // console.log(filteredSkills);

    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        skills: {
          ...prevCV!.skills!,
          skills_details: newSkills,
        },
      }));
    }
  };

  const addProject = () => {
    if (selectedCV) {
      const newProject: Project = {
        project_id: Date.now(), // Use a timestamp as the unique project ID
        project_name: "",
        additional_details: "",
        date: "",
        project_features: [],
      };
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        projects: [...(prevCV!.projects || []), newProject],
      }));
    }
  };

  const updateProject = (
    id: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    // const filteredValue = Array.isArray(value)
    //   ? value.filter((item) => item.trim() !== "")
    //   : value;

    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        projects: prevCV!.projects?.map((proj) =>
          proj.project_id === id ? { ...proj, [field]: value } : proj
        ),
      }));
    }
  };

  const deleteProject = (id: number) => {
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        projects: prevCV!.projects?.filter((proj) => proj.project_id !== id),
      }));
    }
  };

  return (
    <CVContext.Provider
      value={{
        cvList,
        selectedCV,
        setCVList: handleSetCVList,
        setSelectedCV,
        createNewCV,
        deleteCV,
        handlePersonalInfoChange,
        handleSummaryChange,
        clearSummary,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        updateSkills,
        addProject,
        deleteProject,
        updateProject,
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
