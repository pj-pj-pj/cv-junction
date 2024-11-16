export type PersonalInfo = {
  personal_info_id?: number;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
};

export type Education = {
  education_id?: number;
  degree: string;
  institution: string;
  address: string;
  start_date: string;
  end_date: string;
  additional_details?: Array<string>;
};

export type WorkExperience = {
  work_id?: number;
  job_title: string;
  address: string;
  company_name: string;
  start_date: string;
  end_date: string;
  bullet_details: Array<string>;
};

export type Skills = {
  skills_id?: number;
  skills_details: Array<string>;
};

export type Project = {
  project_id?: number;
  project_name: string;
  additional_details: string;
  date: string;
  project_features: Array<string>;
};

export type CV = {
  cv_id?: number;
  user_id?: number;
  title: string;
  personal_info: PersonalInfo;
  summary?: string;
  professional_experience?: WorkExperience[];
  education?: Education[];
  skills?: Skills;
  projects?: Project[];
};

export type User = {
  user_id?: number;
  username: string;
  email: string;
  password: string;
};

export type State = {
  user: User | null;
  cvList: CV[];
  selectedCV: CV | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setCVList: (cvs: CV[]) => void;
  addCV: (cv: CV) => void;
  setSelectedCV: (cv: CV) => void;
  updateCV: (cv: CV) => void;
  deleteCV: (cv_id: number) => void;
};
