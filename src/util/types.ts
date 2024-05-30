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
  profileImage?: string;
  role?: string;
  description: string;
  bio: string;
  country: string;
  socials: string[];
  languages: Language[];
  qualifications: Qualification[];
  introVideo: string;
  username?: string;
}

 export interface Cost {
  currency: string;
  amount: number;
}

// Define the main type
export interface EventDetails {
  title: string;
  description: string;
  coverImageUrl: string;
  type: "ONE_TIME" | "RECURRING"; // Assuming type can be either 'ONE_TIME' or 'RECURRING'
  duration: number;
  costType: "FREE" | "PAID"; // Assuming costType can be either 'FREE' or 'PAID'
  cost: Cost;
  attendantType: "LIMITED" | "UNLIMITED"; // Assuming attendantType can be either 'LIMITED' or 'UNLIMITED'
  datetime: string;
  numOfAttendees: number;
}