import React, { createContext, useContext, useState } from "react";
import { CV, Education, WorkExperience } from "@/types/types";
import { CONFIG } from "@/config";

interface CVContextType {
  cvList: CV[];
  selectedCV: CV | null;
  setCVList: (cvs: CV[]) => void;
  setSelectedCV: (cv: CV | null) => void;
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
      professional_experience: selectedCV.professional_experience?.map(
        (work) => ({
          ...work,
          work_id: undefined, // Remove work_id to let backend handle it
        })
      ),
      education: selectedCV.education?.map((edu) => ({
        ...edu,
        education_id: undefined, // Remove education_id to let backend handle it
      })),
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
    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        education: prevCV!.education?.filter(
          (edu) => edu.education_id !== education_id
        ),
      }));
    }

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

  const addEducation = () => {
    if (selectedCV) {
      const newEducation: Education = {
        education_id: Date.now(), // Use current timestamp as unique ID
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

  const addExperience = () => {
    if (selectedCV) {
      const newExperience: WorkExperience = {
        work_id: Date.now(), // Use current timestamp as unique ID
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

    if (selectedCV) {
      setSelectedCV((prevCV) => ({
        ...prevCV!,
        professional_experience: prevCV!.professional_experience?.filter(
          (exp) => exp.work_id !== work_id
        ),
      }));
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

      const data = await response.json();

      if (data.status === "success") {
        const createdCV = { ...newCV, cv_id: data.cv_id };
        setCVList((prevList) => [...prevList, createdCV]);

        console.log("CV created successfully!");
      } else {
        console.error("Failed to create CV:", data.message);
      }
    } catch (err) {
      console.error("Error creating CV", err);
    }

    fetchCVs();
  };

  const deleteCV = async (cv_id: number) => {
    setCVList((prevList) => prevList.filter((cv) => cv.cv_id !== cv_id));
    setSelectedCV(cvList.length > 1 ? cvList[0] : null);
    if (cvList.indexOf(selectedCV!) === 0)
      setSelectedCV(cvList.length > 1 ? cvList[1] : null);

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
