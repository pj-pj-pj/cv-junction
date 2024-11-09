import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Education = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
};

type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
};

export default function Component() {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "Juan Ewan",
    email: "juan_ewan@xmail.com",
    phone: "+63 9098079798",
    address: "Lugar, Sa Pilipinas",
  });

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      institution: "Juan University",
      degree: "Bachelors in Ewan",
      startDate: "08/2020",
      endDate: "present",
      location: "Somewhere, Sa Pilipinas",
    },
    {
      id: "2",
      institution: "Hidden University",
      degree: "Master's Degree in IDK",
      startDate: "08/2020",
      endDate: "present",
      location: "Dito pa Rin, Sa Pilipinas",
    },
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    {
      id: "1",
      company: "Juana Inc.",
      position: "UX & UI Designer",
      startDate: "08/2020",
      endDate: "present",
      location: "Saan, Sa Pilipinas",
      description:
        "Designed and prototyped user interface patterns for various clients in various industries, ranging from self-service apps within the telecommunications-sector to mobile games for IOS and Android",
    },
    {
      id: "2",
      company: "Pedro Corp",
      position: "UX Research Assistant",
      startDate: "04/2018",
      endDate: "02/2019",
      location: "Iba Naman, Sa Pilipinas",
      description:
        "Supported senior researchers on accessibility standards for the open web. Created and usability tested wireframes and prototypes. Produced interactive documentation for quick onboarding of new researchers.",
    },
  ]);

  // const [personalDetails, setPersonalDetails] = useState({});

  // const [education, setEducation] = useState<Education[]>([]);

  // const [experience, setExperience] = useState<Experience[]>([]);

  const [expandedEducation, setExpandedEducation] = useState(true);
  const [expandedExperience, setExpandedExperience] = useState(false);

  const handlePersonalDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const handleExperienceChange = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setExperience(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    };
    setEducation([...education, newEducation]);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
    setExperience([...experience, newExperience]);
  };

  const deleteEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const deleteExperience = (id: string) => {
    setExperience(experience.filter((exp) => exp.id !== id));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-4 h-full">
      {/* Editor Panel */}
      <div className="space-y-6">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="w-32"
            onClick={() => {
              setPersonalDetails({
                fullName: "",
                email: "",
                phone: "",
                address: "",
              });
              setEducation([]);
              setExperience([]);
            }}
          >
            Clear Resume
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={personalDetails.fullName}
                  onChange={handlePersonalDetailsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                  <span className="text-sm text-right ml-2">recommended</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={personalDetails.email}
                  onChange={handlePersonalDetailsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone number
                  <span className="text-sm text-right ml-2">recommended</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={personalDetails.phone}
                  onChange={handlePersonalDetailsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Address
                  <span className="text-sm text-right ml-2">recommended</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={personalDetails.address}
                  onChange={handlePersonalDetailsChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setExpandedEducation(!expandedEducation)}
            >
              <span>Education</span>
              {expandedEducation ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {expandedEducation && (
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="space-y-2 p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">
                        {edu.institution || "New Education"}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEducation(edu.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete education</span>
                      </Button>
                    </div>
                    <Input
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          edu.id,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(edu.id, "degree", e.target.value)
                      }
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            edu.id,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleEducationChange(
                            edu.id,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <Input
                      placeholder="Location"
                      value={edu.location}
                      onChange={(e) =>
                        handleEducationChange(
                          edu.id,
                          "location",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <Button
                  onClick={addEducation}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setExpandedExperience(!expandedExperience)}
            >
              <span>Experience</span>
              {expandedExperience ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {expandedExperience && (
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="space-y-2 p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">
                        {exp.company || "New Experience"}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExperience(exp.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete experience</span>
                      </Button>
                    </div>
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "company",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "position",
                          e.target.value
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <Input
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "location",
                          e.target.value
                        )
                      }
                    />
                    <Textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <Button
                  onClick={addExperience}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <Card
        id="cv-1"
        className="bg-white h-full"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {personalDetails.fullName}
          </h1>
          <div className="flex space-y-1 text-sm justify-center gap-2">
            <div className="flex items-center gap-2">
              <span className="flex gap-2">
                {personalDetails.email ? (
                  <>
                    <p>{personalDetails.address}</p>
                    <p>|</p>
                  </>
                ) : null}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {personalDetails.phone ? (
                <>
                  <p>{personalDetails.phone}</p>
                  <p>|</p>
                </>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              {personalDetails.address ? (
                <>
                  <p>{personalDetails.email}</p>
                  <p>|</p>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="px-14 space-y-4">
          <section>
            <h2 className="text-lg font-semibold mb-1">Education</h2>
            <Separator />
            <div className="mt-2 space-y-1">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-sm">{edu.degree}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p>
                      {edu.startDate} – {edu.endDate}
                    </p>
                    <p>{edu.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">
              Professional Experience
            </h2>
            <Separator />
            <div className="mt-2 space-y-1">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{exp.company}</h3>
                      <p className="text-sm">{exp.position}</p>
                    </div>
                    <div className="text-sm text-right">
                      <p>
                        {exp.startDate} – {exp.endDate}
                      </p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
}
