import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Education } from "@/types/types";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

function EducationComponent({
  education,
  addEducation,
  updateEducation,
  deleteEducation,
}: {
  education: Education[] | undefined;
  addEducation: () => void;
  updateEducation: (
    id: number,
    field: keyof Education,
    value: string | string[]
  ) => void;
  deleteEducation: (id: number) => void;
}) {
  const [expandedEducation, setExpandedEducation] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Education</span>
          <Button
            variant="outline"
            onClick={() => setExpandedEducation(!expandedEducation)}
          >
            {expandedEducation ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardTitle>
      </CardHeader>
      {expandedEducation && (
        <CardContent className="space-y-4">
          {education?.map((edu) => (
            <div
              key={edu.education_id}
              className="space-y-2 p-4 border rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {edu.institution || "New Education"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteEducation(edu.education_id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(
                    edu.education_id,
                    "institution",
                    e.target.value
                  )
                }
              />
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(edu.education_id, "degree", e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Start Date (eg.: September 2019)"
                  value={edu.start_date}
                  onChange={(e) =>
                    updateEducation(
                      edu.education_id,
                      "start_date",
                      e.target.value
                    )
                  }
                />
                <Input
                  placeholder="End Date (eg.: September 2029)"
                  value={edu.end_date}
                  onChange={(e) =>
                    updateEducation(
                      edu.education_id,
                      "end_date",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="flex gap-2">
                <Textarea
                  className="col-span-2 "
                  placeholder='Grade / Notable Achievements (one per line) (Optional): (eg.:
GWA: 1.23 
Best Thesis)
Please use "-" (dash) to make bullets appear.'
                  value={edu.additional_details?.join("\n")}
                  onChange={(e) =>
                    updateEducation(
                      edu.education_id,
                      "additional_details",
                      e.target.value.split("\n")
                    )
                  }
                />
              </div>
            </div>
          ))}
          <Button
            onClick={addEducation}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default EducationComponent;
