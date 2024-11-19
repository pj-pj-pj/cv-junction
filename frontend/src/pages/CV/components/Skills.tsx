import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skills } from "@/types/types";
import { useState } from "react";

function SkillsComponent({
  skills,
  updateSkills,
}: {
  skills: Skills | undefined;
  updateSkills: (skills: string[]) => void;
}) {
  const [isIncludeSkills, setIsIncludeSkills] = useState<boolean>(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills (Optional)</CardTitle>
      </CardHeader>
      {isIncludeSkills ? (
        <CardContent className="space-y-3">
          <Textarea
            className="col-span-2"
            placeholder="Enter your skills (one per line). (eg.
Languages: Python, Javascript, Golang
Frameworks: Express, Laravel)"
            value={skills?.skills_details?.join("\n") || ""}
            onChange={(e) => {
              updateSkills(e.target.value.split("\n"));
            }}
          />
          <div className="mt-2 text-sm text-gray-500">
            <p>Each skill can be entered on a new line (one per line).</p>
          </div>
          <Button
            onClick={() => {
              setIsIncludeSkills(!isIncludeSkills);
              updateSkills([]);
            }}
          >
            Remove Skills
          </Button>
        </CardContent>
      ) : (
        <CardContent>
          <Button
            onClick={() => {
              setIsIncludeSkills(!isIncludeSkills);
            }}
          >
            Add Skills
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default SkillsComponent;
