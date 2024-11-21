import Header from "./components/Header";
import EducationComponent from "./components/Education";
import Experience from "./components/Experience";
import { useCV } from "@/context/CVContext";
import useDebounce from "@/hooks/useDebounce"; // Import the debounce hook
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";
import PDFControl from "./PDFControl";
import CVPreview from "./CVPreview";
import Skills from "./components/Skills";
import { useState } from "react";

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
    updateSkills,
    saveCV,
  } = useCV();

  if (!cv) {
    return (
      <div className="text-center pt-5">Select or create a CV to load</div>
    );
  }

  const debouncedPersonalInfo = useDebounce(cv.personal_info || {}, 1000);
  const debouncedSummary = useDebounce(cv.summary || "", 1000);
  const debouncedEducation = useDebounce(cv.education || [], 1000);
  const debouncedWorkExperience = useDebounce(
    cv.professional_experience || [],
    1000
  );

  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function handleClickSave() {
    saveCV();
    setSaveMessage(
      `${(cv && cv.title && cv.title) || "CV"} saved successfully`
    );

    setTimeout(() => {
      setSaveMessage(null);
    }, 2000);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-4">
      <div>
        <div className="flex justify-between gap-2 pb-2 px-2">
          <div className="flex justify-end gap-2">
            <Button onClick={handleClickSave}>
              <Save />
              Save CV
            </Button>
            <Button variant="destructive">
              <Trash2 />
              Delete CV
            </Button>
          </div>
          <PDFControl
            personalInfo={debouncedPersonalInfo}
            summary={debouncedSummary}
            education={debouncedEducation}
            workExperience={debouncedWorkExperience}
            skills={cv.skills}
          />
        </div>
        <div className="pb-2 px-2 text-sm text-gray-500 italic">
          {saveMessage && saveMessage}
        </div>
        <div
          className="space-y-3 h-[calc(100vh-170px)] px-2 [&::-webkit-scrollbar]:w-2
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

          <Experience
            workExperience={cv.professional_experience}
            addExperience={addExperience}
            updateExperience={updateExperience}
            deleteExperience={deleteExperience}
          />

          <Skills
            skills={cv.skills}
            updateSkills={updateSkills}
          />

          <EducationComponent
            education={cv.education}
            addEducation={addEducation}
            updateEducation={updateEducation}
            deleteEducation={deleteEducation}
          />
        </div>
      </div>

      <CVPreview
        personalInfo={cv.personal_info}
        summary={cv.summary}
        education={cv.education}
        workExperience={cv.professional_experience}
        skills={cv.skills}
      />
    </div>
  );
}
