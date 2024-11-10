import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/types/types";
import { useEffect, useState } from "react";

function Header({
  handlePersonalInfoChange,
  personalInfo,
  summary,
  handleSummaryChange,
  clearSummary,
}: {
  handlePersonalInfoChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  personalInfo: PersonalInfo | undefined;
  summary: string | undefined;
  handleSummaryChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  clearSummary: () => void;
}) {
  const [isIncludeSummary, setIsIncludeSummary] = useState<boolean>(false);

  useEffect(() => {
    if (summary != "") setIsIncludeSummary(true);
    console.log(summary);
  }, [summary]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={personalInfo?.full_name}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo?.email}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={personalInfo?.phone_number}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={personalInfo?.address}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary (Optional)</CardTitle>
        </CardHeader>
        {isIncludeSummary ? (
          <CardContent className="space-y-3">
            <Textarea
              value={summary}
              onChange={handleSummaryChange}
              placeholder="Write a brief summary of your professional profile"
            />
            <Button
              onClick={() => {
                setIsIncludeSummary(!isIncludeSummary);
                clearSummary();
              }}
            >
              Remove Summary
            </Button>
          </CardContent>
        ) : (
          <CardContent>
            <Button
              onClick={() => {
                setIsIncludeSummary(!isIncludeSummary);
              }}
            >
              Add Summary
            </Button>
          </CardContent>
        )}
      </Card>
    </>
  );
}

export default Header;
