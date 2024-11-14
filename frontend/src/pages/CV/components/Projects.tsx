import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/types";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

function Projects({
  projects,
  addProject,
  updateProject,
  deleteProject,
}: {
  projects: Project[] | undefined;
  addProject: () => void;
  updateProject: (
    id: number,
    field: keyof Project,
    value: string | string[]
  ) => void;
  deleteProject: (id: number) => void;
}) {
  const [expandedProjects, setExpandedProjects] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {projects && projects.length <= 1 ? "Project" : "Projects"}{" "}
            (Optional)
          </span>
          <Button
            variant="outline"
            onClick={() => setExpandedProjects(!expandedProjects)}
          >
            {expandedProjects ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardTitle>
      </CardHeader>
      {expandedProjects && (
        <CardContent className="space-y-4">
          {projects?.map((proj) => (
            <div
              key={proj.project_id}
              className="space-y-2 p-4 border rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {proj.project_name || "New Project"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteProject(proj.project_id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Project Name"
                  value={proj.project_name}
                  onChange={(e) =>
                    updateProject(
                      proj.project_id,
                      "project_name",
                      e.target.value
                    )
                  }
                />
                <Input
                  placeholder="Details eg. tools: Javascript, FastAPI, etc."
                  value={proj.additional_details}
                  onChange={(e) =>
                    updateProject(
                      proj.project_id,
                      "additional_details",
                      e.target.value
                    )
                  }
                />
              </div>
              <Input
                placeholder="Project Date"
                value={proj.date}
                onChange={(e) =>
                  updateProject(proj.project_id, "date", e.target.value)
                }
              />
              <div className="flex flex-col gap-2">
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    Each project feature can be entered on a new line (one per
                    line).
                  </p>
                </div>
                <Textarea
                  placeholder="Project Features (one per line): (eg.:
Integrated a machine learning model that recognizes Baybayin characters
Scraped over 40,000 Tagalog words for the vocabulary spelling name)"
                  value={proj.project_features.join("\n")}
                  onChange={(e) =>
                    updateProject(
                      proj.project_id,
                      "project_features",
                      e.target.value.split("\n")
                    )
                  }
                />
              </div>
            </div>
          ))}
          <Button
            onClick={addProject}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default Projects;
