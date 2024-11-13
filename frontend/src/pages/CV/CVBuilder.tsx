import Header from "./components/Header";
import EducationComponent from "./components/Education";
import Experience from "./components/Experience";
import { useCV } from "@/context/CVContext";
import useDebounce from "@/hooks/useDebounce"; // Import the debounce hook
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import PDFControl from "./PDFControl";
import CVPreview from "./CVPreview";

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

  function handleClickSave() {}

  function handleDeleteCV(cvId: number) {
    deleteCV(cvId);
  }

  if (!cv) {
    return (
      <div className="text-center pt-5">Select or create a CV to load</div>
    );
  }

  const debouncedPersonalInfo = useDebounce(cv.personal_info, 0); // second/s delay
  const debouncedSummary = useDebounce(cv.summary, 0);
  const debouncedEducation = useDebounce(cv.education, 0);
  const debouncedWorkExperience = useDebounce(cv.professional_experience, 0);

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-4">
      <div>
        <div className="flex justify-between gap-2 pb-2 px-2">
          <div
            className="flex justify-end
            gap-2
            "
          >
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
          <PDFControl
            personalInfo={debouncedPersonalInfo}
            summary={debouncedSummary}
            education={debouncedEducation}
            workExperience={debouncedWorkExperience}
          />
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

      <motion.div
        key={cv.cv_id} // Key updates when cv changes, forcing re-render and animation
        initial={{ opacity: 0, scale: 0.95 }} // Start with 0 opacity and small scale
        animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and original scale
        exit={{ opacity: 0, scale: 0.95 }} // Exit animation for smooth fade-out
        transition={{ duration: 0.5 }} // Duration of the animation
        className="space-y-2"
      >
        <CVPreview
          personalInfo={debouncedPersonalInfo}
          summary={debouncedSummary}
          education={debouncedEducation}
          workExperience={debouncedWorkExperience}
        />
      </motion.div>
    </div>
  );
}
