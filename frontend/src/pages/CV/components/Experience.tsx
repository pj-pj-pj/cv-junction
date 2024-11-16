import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WorkExperience } from "@/types/types";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

function Experience({
  workExperience,
  addExperience,
  updateExperience,
  deleteExperience,
}: {
  workExperience: WorkExperience[] | undefined;
  addExperience: () => void;
  updateExperience: (
    id: number,
    field: keyof WorkExperience,
    value: string | string[]
  ) => void;
  deleteExperience: (id: number) => void;
}) {
  const [expandedExperience, setExpandedExperience] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Work Experience</span>
          <Button
            variant="outline"
            onClick={() => setExpandedExperience(!expandedExperience)}
          >
            {expandedExperience ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardTitle>
      </CardHeader>
      {expandedExperience && (
        <CardContent className="space-y-4">
          {workExperience?.map((exp) => (
            <div
              key={exp.work_id}
              className="space-y-2 p-4 border rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {exp.company_name || "New Experience"}
                </h3>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteExperience(exp.work_id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Company Name"
                value={exp.company_name}
                onChange={(e) =>
                  updateExperience(exp.work_id!, "company_name", e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Job Title"
                  value={exp.job_title}
                  onChange={(e) =>
                    updateExperience(exp.work_id!, "job_title", e.target.value)
                  }
                />
                <Input
                  placeholder="Address of Institution (eg. City, Philippines)"
                  value={exp.address}
                  onChange={(e) =>
                    updateExperience(exp.work_id!, "address", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Start Date"
                  value={exp.start_date}
                  onChange={(e) =>
                    updateExperience(exp.work_id!, "start_date", e.target.value)
                  }
                />
                <Input
                  placeholder="End Date"
                  value={exp.end_date}
                  onChange={(e) =>
                    updateExperience(exp.work_id!, "end_date", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    Each detail can be entered on a new line (one per line).
                  </p>
                </div>
                <Textarea
                  placeholder="Job Details (one per line): (eg.:
Optimized front-end performance by 40% using lazy loading and code splitting.
Created reusable components, reducing front-end development time by 25%.)"
                  value={exp.bullet_details.join("\n")}
                  onChange={(e) =>
                    updateExperience(
                      exp.work_id!,
                      "bullet_details",
                      e.target.value.split("\n")
                    )
                  }
                />
              </div>
            </div>
          ))}
          <Button
            onClick={addExperience}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default Experience;
