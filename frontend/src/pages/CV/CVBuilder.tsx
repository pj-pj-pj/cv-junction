import { useState } from "react";
import { CV, Education, WorkExperience } from "@/types/types";
import Header from "./components/Header";
import EducationComponent from "./components/Education";
import Experience from "./components/Experience";
import PreviewCV from "./PreviewCV";

export default function CVBuilder() {
  // const { selectedCV: cv, updateCV: setCV, setSelectedCV } = useStore();
  const [cv, setCV] = useState<CV>({
    cv_id: 1,
    user_id: 1,
    title: "Sample CV",
    personal_info: {
      personal_info_id: 1,
      full_name: "Juan Ewan",
      email: "juan@gmail.cpm",
      phone_number: "09111111111",
      address: "Lugar, Sa Pilipinas",
    },
    summary:
      "Very very long summary of user. Very very long summary of user. Very very long summary of user. Very very long summary of user. Very very long summary of user. Very very long summary of user. Very very long summary of user. Very very long summary of user. Very very long summary of user.",
    professional_experience: [
      {
        work_id: 1,
        job_title: "Job Title 1",
        company_name: "Company Name of Job Title 1",
        start_date: "January 2020",
        end_date: "August 2024",
        bullet_details: ["aaaaaaaa", "bbbbbbbbbb"],
      },
      {
        work_id: 2,
        job_title: "Job Title 2",
        company_name: "Company Name of Job Title 1",
        start_date: "August 2020",
        end_date: "Present",
        bullet_details: ["aaaaaaaa", "bbbbbbbbbb"],
      },
    ],
    education: [
      {
        education_id: 1,
        degree: "Degree of Education",
        institution: "Insitution of Education",
        start_date: "July 2020",
        end_date: "January 2024",
        additional_details: ["GWA: 1.52", "Best Thesis: Title of Thesis"],
      },
    ],
    skills: [],
  });

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCV({
      ...cv,
      personal_info: { ...cv?.personal_info, [e.target.name]: e.target.value },
    });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCV({ ...cv, summary: e.target.value });
  };

  const clearSummary = () => {
    setCV({ ...cv, summary: "" });
  };

  const addEducation = () => {
    const newEducation: Education = {
      education_id: Date.now(),
      degree: "",
      institution: "",
      additional_details: [],
      start_date: "",
      end_date: "",
    };
    setCV({ ...cv, education: [...cv.education, newEducation] });
  };

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string | string[]
  ) => {
    setCV({
      ...cv,
      education: cv?.education?.map((edu) =>
        edu.education_id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const deleteEducation = (id: number) => {
    setCV({
      ...cv,
      education: cv.education?.filter((edu) => edu.education_id !== id),
    });
  };

  const addExperience = () => {
    const newExperience: WorkExperience = {
      work_id: Date.now(),
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      bullet_details: [],
    };
    setCV({
      ...cv,
      professional_experience: [...cv.professional_experience, newExperience],
    });
  };

  const updateExperience = (
    id: number,
    field: keyof WorkExperience,
    value: string | string[]
  ) => {
    setCV({
      ...cv,
      professional_experience: cv.professional_experience?.map((exp) =>
        exp.work_id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const deleteExperience = (id: number) => {
    setCV({
      ...cv,
      professional_experience: cv.professional_experience?.filter(
        (exp) => exp.work_id !== id
      ),
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-4 ">
      {/* Editor Panel */}
      <div
        className="space-y-6 h-[calc(100vh-108px)] px-2 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300 overflow-y-auto"
      >
        <Header
          handlePersonalInfoChange={handlePersonalInfoChange}
          personalInfo={cv?.personal_info}
          summary={cv?.summary}
          handleSummaryChange={handleSummaryChange}
          clearSummary={clearSummary}
        />

        <EducationComponent
          education={cv.education}
          addEducation={addEducation}
          updateEducation={updateEducation}
          deleteEducation={deleteEducation}
        />

        <Experience
          workExperience={cv.professional_experience}
          addExperience={addExperience}
          updateExperience={updateExperience}
          deleteExperience={deleteExperience}
        />
      </div>

      <PreviewCV
        personalInfo={cv.personal_info}
        summary={cv.summary}
        education={cv.education}
        workExperience={cv.professional_experience}
      />
    </div>
  );
}
