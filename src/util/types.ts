export interface Language {
  language: string;
  proficiency: string;
}


export interface Qualification {
  name: string;
  issuing_org: string;
  year: number ;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  profileImage: string;
  role: string;
  description: string;
  bio: string;
  country: string;
  socials: string[];
  languages: Language[];
  qualifications: Qualification[];
  introVideo: string;
  username?: string;
}
