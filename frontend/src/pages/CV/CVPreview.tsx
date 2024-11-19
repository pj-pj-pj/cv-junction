import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Education, PersonalInfo, Skills, WorkExperience } from "@/types/types";
import { CircleAlert } from "lucide-react";
import { forwardRef } from "react";

const CVPreview = forwardRef<
  HTMLDivElement,
  {
    personalInfo: PersonalInfo;
    summary: string | undefined;
    education: Education[] | undefined;
    workExperience: WorkExperience[] | undefined;
    skills: Skills | undefined;
  }
>(({ personalInfo, summary, education, workExperience, skills }, ref) => {
  return (
    <div>
      <Card
        id="cv"
        ref={ref}
        className="bg-white h-[calc(100vh-130px)] p-2 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300 overflow-y-auto"
      >
        <CardContent className="p-12">
          <h1 className="text-3xl mb-1 flex justify-center">
            {personalInfo.full_name}
          </h1>
          <div className="text-[13.8px] mb-4 flex gap-3 justify-center">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.email && personalInfo.phone_number && (
              <span>{personalInfo.phone_number && "|"}</span>
            )}
            {personalInfo.phone_number && (
              <span>{personalInfo.phone_number}</span>
            )}
            {personalInfo.phone_number && personalInfo.address && (
              <span>{personalInfo.phone_number && "|"}</span>
            )}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
          {summary && (
            <div className="mb-4 ">
              <h2 className="text-md">Summary</h2>
              <Separator />
              <p className="text-justify mt-1">{summary}</p>
            </div>
          )}

          <div className="mb-4">
            {workExperience?.length != 0 && (
              <>
                <h2 className="text-md">Work Experience</h2>
                <Separator />
              </>
            )}
            {workExperience?.map((exp) => (
              <div
                key={exp.work_id}
                className="mb-1 text-justify mt-1"
              >
                <span className="flex justify-between mt-1">
                  <h3 className="text-md">{exp.company_name}</h3>
                  <p>{exp.address}</p>
                </span>
                <span className="flex justify-between">
                  <p>{exp.job_title}</p>
                  <p className="text-md">
                    {exp.start_date}
                    {exp.start_date && exp.end_date && " - "}
                    {exp.end_date}
                  </p>
                </span>
                <ul className="list-disc list-inside pl-6 text-justify">
                  {Array.isArray(exp.bullet_details) &&
                    exp.bullet_details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-4">
            {education?.length != 0 && (
              <>
                <h2 className="text-md">Education</h2>
                <Separator />
              </>
            )}
            {education?.map((edu) => (
              <div
                key={edu.education_id}
                className="mb-4 text-justify mt-1"
              >
                <span className="flex justify-between">
                  <h3 className="text-md">{edu.institution}</h3>
                  <p className="text-md mt-1">
                    {edu.start_date}
                    {edu.start_date && edu.end_date && " - "}
                    {edu.end_date}
                  </p>
                </span>
                <span className="flex justify-between ">
                  <p>{edu.degree}</p>
                  <p>{edu.address}</p>
                </span>
                <ul className="list-disc list-inside pl-6 text-justify">
                  {Array.isArray(edu.additional_details) &&
                    edu.additional_details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          {skills && skills?.skills_details.length !== 0 && (
            <div className="mb-4 ">
              <h2 className="text-md">Skills</h2>
              <Separator />
              <ul className="list-disc list-inside pl-6 text-justify mt-1">
                {skills.skills_details?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex gap-2 text-gray-500 text-sm align-middle justify-center py-2">
        <CircleAlert className="text-[0.750rem]" />
        <p>
          Please note that the CV preview displayed here may not exactly reflect
          the final version of your CV when downloaded.
        </p>
      </div>
    </div>
  );
});

export default CVPreview;
