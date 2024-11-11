import Header from "./components/Header";
import EducationComponent from "./components/Education";
import Experience from "./components/Experience";
import PreviewCV from "./PreviewCV";
import { useCV } from "@/context/CVContext";
import useDebounce from "@/hooks/useDebounce"; // Import the debounce hook
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

export default function CVBuilder() {
  const {
    selectedCV: cv,
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
  } = useCV();

  if (!cv) {
    return (
      <div className="text-center pt-5">Select or create a CV to load</div>
    );
  }

  function handleClickSave() {}
  function handleDeleteCV(cvId: number) {
    deleteCV(cvId);
  }

  const debouncedPersonalInfo = useDebounce(cv.personal_info, 700); // 1 second delay
  const debouncedSummary = useDebounce(cv.summary, 700);
  const debouncedEducation = useDebounce(cv.education, 700);
  const debouncedWorkExperience = useDebounce(cv.professional_experience, 700);

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-4">
      <div>
        <div className="flex justify-between pb-2 px-2">
          <Button onClick={handleClickSave}>
            <Save />
            Save CV
          </Button>
          <Button
            onClick={() => {
              handleDeleteCV(cv.cv_id);
            }}
            variant="outline"
          >
            <Trash2 />
            Delete CV
          </Button>
        </div>
        <div
          className="space-y-3 h-[calc(100vh-140px)] px-2 [&::-webkit-scrollbar]:w-2
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
