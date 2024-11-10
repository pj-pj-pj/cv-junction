import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Education, PersonalInfo, WorkExperience } from "@/types/types";

function PreviewCV({
  personalInfo,
  summary,
  education,
  workExperience,
}: {
  personalInfo: PersonalInfo;
  summary: string | undefined;
  education: Education[] | undefined;
  workExperience: WorkExperience[] | undefined;
}) {
  return (
    <Card
      id="cv"
      className="bg-white h-[calc(100vh-108px)] p-2 r-2 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300 overflow-y-auto"
    >
      <CardContent className="p-12">
        <h1 className="text-3xl font-bold mb-1 flex justify-center">
          {personalInfo.full_name}
        </h1>
        <div className="text-sm mb-4 flex gap-2 justify-center">
          {personalInfo.email && (
            <>
              <span>{personalInfo.email}</span>
              <span>{"|"}</span>
            </>
          )}
          {personalInfo.phone_number && (
            <>
              <span>{personalInfo.phone_number}</span>
              <span>{personalInfo.phone_number && "|"}</span>
            </>
          )}
          <span>{personalInfo.address}</span>
        </div>
        {summary && (
          <div className="mb-4">
            <h2 className="text-md font-semibold">Summary</h2>
            <Separator />
            <p className="pl-2 text-justify">{summary}</p>
          </div>
        )}

        <div className="mb-4">
          {workExperience?.length != 0 && (
            <>
              <h2 className="text-md font-semibold">Work Experience</h2>
              <Separator />
            </>
          )}
          {workExperience?.map((exp) => (
            <div
              key={exp.work_id}
              className="mb-1 pl-2 text-justify"
            >
              <span className="flex justify-between">
                <h3 className="font-semibold">{exp.company_name}</h3>
                <p className="text-sm">
                  {exp.start_date} - {exp.end_date}
                </p>
              </span>
              <span className="flex justify-between italic">
                <p>{exp.job_title}</p>
                <p>{exp.address}</p>
              </span>
              <ul className="list-disc list-inside pl-6 text-justify">
                {exp.bullet_details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mb-4">
          {education?.length != 0 && (
            <>
              <h2 className="text-md font-semibold">Education</h2>
              <Separator />
            </>
          )}
          {education?.map((edu) => (
            <div
              key={edu.education_id}
              className="mb-4 pl-2 text-justify"
            >
              <span className="flex justify-between">
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-sm">
                  {edu.start_date} - {edu.end_date}
                </p>
              </span>

              <span className="flex justify-between italic">
                <p>{edu.degree}</p>
                <p>{edu.address}</p>
              </span>
              <ul className="list-disc list-inside pl-6 text-justify">
                {edu.additional_details?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PreviewCV;
