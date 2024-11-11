import React from "react";
import Header from "./components/Header";
import EducationComponent from "./components/Education";
import Experience from "./components/Experience";
import PreviewCV from "./PreviewCV";
import { useCV } from "@/context/CVContext";
import useDebounce from "@/hooks/useDebounce"; // Import the debounce hook

export default function CVBuilder() {
  const {
    selectedCV: cv,
    handlePersonalInfoChange,
    handleSummaryChange,
    clearSummary,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
  } = useCV();

  if (!cv) {
    return (
      <div className="text-center pt-5">Select or create a CV to load</div>
    );
  }

  const debouncedPersonalInfo = useDebounce(cv.personal_info, 1000); // 1 second delay
  const debouncedSummary = useDebounce(cv.summary, 1000);
  const debouncedEducation = useDebounce(cv.education, 1000);
  const debouncedWorkExperience = useDebounce(cv.professional_experience, 1000);

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-4">
      <div
        className="space-y-3 h-[calc(100vh-108px)] px-2 [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300 overflow-y-auto"
      >
        <Header
          handlePersonalInfoChange={handlePersonalInfoChange}
          personalInfo={cv.personal_info}
          summary={cv.summary}
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
        personalInfo={debouncedPersonalInfo}
        summary={debouncedSummary}
        education={debouncedEducation}
        workExperience={debouncedWorkExperience}
      />
    </div>
  );
}
