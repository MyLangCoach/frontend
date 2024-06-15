export  interface Language {
  language: string;
  proficiency: string;
}


export   interface Qualification {
  name: string;
  issuing_org: string;
  year: number ;
}
type SocialMediaType = "instagram.com" | "www.facebook.com"; // Define the type for social media URLs



 export interface CostPerSession {
  amount: number;
  currency: string;
  sessionType: number;
}

 export interface CoachDetails {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string | null;
  gender: string | null;
  profileImage: string;
  slug: string | null;
  description: string;
  bio: string;
  role: string;
  country: string;
  socials: SocialMediaType[];
  languages: Language[];
  emailVerified: boolean;
  accountSetupCompleted: boolean;
  lastSignin: string;
  languageInterests: any[]; // Adjust this type according to its intended content
  status: string;
  qualifications: Qualification[];
  introVideo: string;
  costPerSession: CostPerSession;
  createdAt: string;
  updatedAt: string;
}

export   interface UserProfileData {
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
  languageInterests?: string[];
  costPerSession?:any
}

 export   interface Cost {
  currency: string;
  amount: number;
}

// Define the main type
export   interface EventDetails {
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