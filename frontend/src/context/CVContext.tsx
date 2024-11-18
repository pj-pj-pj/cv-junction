import React, { createContext, useContext, useState } from "react";
import { CV, Education, WorkExperience } from "@/types/types";
import { CONFIG } from "@/config";

interface CVContextType {
  cvList: CV[];
  selectedCV: CV | null;
  setCVList: (cvs: CV[]) => void;
  setSelectedCV: (cv: CV | null) => void;
  updateCVTitle: (id: number, newTitle: string) => void;
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
  fetchCVs: () => Promise<void>;
  saveCV: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvList, setCVList] = useState<CV[]>([]);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);

  const fetchCVs = async () => {
    const user = sessionStorage.getItem("user");
    let userId;

    if (!user) {
      console.error("User is not authenticated");
      return;
    } else {
      userId = JSON.parse(user).user_id;
    }

    try {
      const response = await fetch(
        `${CONFIG.BACKEND_API}/fetch_cvs.php?user_id=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setCVList(data.cvs || []);
      } else {
        console.error("Failed to fetch CV list");
      }
    } catch (err) {
      console.error("Error fetching CVs:", err);
    }
  };

  const saveCV = async () => {
    if (!selectedCV) {
      console.error("No CV selected for saving.");
      return;
    }

    const cvToSave = {
      ...selectedCV,
      education: selectedCV.education,
      professional_experience: selectedCV.professional_experience,
    };

    console.log("Saving CV:", cvToSave);

    try {
      const response = await fetch(`${CONFIG.BACKEND_API}save_cv.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cvToSave), // Send the updated CV data
        credentials: "include",
      });

      const data = await response.json();

      if (data.status === "success") {
        console.log("CV saved successfully!");
      } else {
        console.error("Failed to save CV:", data.message);
      }
    } catch (error) {
      console.error("Error while saving CV:", error);
    }

    fetchCVs();
  };

  const handleSetCVList = (cvs: CV[]) => {
    setCVList(cvs);
    if (cvs.length > 0 && !selectedCV) {
      setSelectedCV(cvs[0]);
    }
  };

  const updateCVTitle = (id: number, newTitle: string) => {
    setCVList((prevList) =>
      prevList.map((cv) => (cv.cv_id === id ? { ...cv, title: newTitle } : cv))
    );
    if (selectedCV) {
      setSelectedCV((prevCV) => ({ ...prevCV!, title: newTitle }));
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

  const deleteEducation = async (education_id: number) => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_API}delete_education.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ education_id }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        console.log("Education deleted successfully");
        // Optionally refresh the selected CV
      } else {
        console.error("Failed to delete education:", data.message);
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const addExperience = () => {
    if (selectedCV) {
      const newExperience: WorkExperience = {
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

  const deleteExperience = async (work_id: number) => {
    try {
      const response = await fetch(
        `${CONFIG.BACKEND_API}delete_experience.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ work_id }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        console.log("Work experience deleted successfully");
        // Optionally refresh the selected CV
      } else {
        console.error("Failed to delete work experience:", data.message);
      }
    } catch (error) {
      console.error("Error deleting work experience:", error);
    }
  };

  const createNewCV = async (title: string) => {
    const user = sessionStorage.getItem("user");
    let userId;

    if (!user) {
      console.error("User is not authenticated");
      return;
    } else {
      userId = JSON.parse(user).user_id;
    }

    const newCV: CV = {
      user_id: Number(userId),
      title: title,
      personal_info: {
        full_name: "",
        email: "",
        phone_number: "",
        address: "",
      },
      summary: "",
      education: [],
      professional_experience: [],
      skills: { skills_details: [] },
    };

    try {
      const response = await fetch(`${CONFIG.BACKEND_API}create_cv.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCV),
        credentials: "include",
      });

      setCVList((prevList) => [...prevList, newCV]);
      setSelectedCV(newCV);

      const text = await response.text(); // Read the response as text
      const data = JSON.parse(text); // Try parsing it as JSON

      if (data.status === "success") {
        console.log(data.message);
        // You can update your CV list or perform other actions here
      } else {
        console.error("Failed to create CV:", data.message);
      }
    } catch (err) {
      console.error("Error creating CV", err);
    }
  };

  const deleteCV = async (cv_id: number) => {
    try {
      const response = await fetch(`${CONFIG.BACKEND_API}delete_cv.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cv_id }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.status === "success") {
        console.log("CV deleted successfully!");
        fetchCVs(); // Refresh the CV list
      } else {
        console.error("Failed to delete CV:", data.message);
      }
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
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

  return (
    <CVContext.Provider
      value={{
        cvList,
        selectedCV,
        updateCVTitle,
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
        fetchCVs,
        saveCV,
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
