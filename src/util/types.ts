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
  languageInterests?: string[] | any;
  costPerSession?: any;
  id?: string;
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

export interface SingleBankDetail {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;

}


export interface ClassDetails {
  id: number;
  coachId: number;
  title: string;
  description: string;
  coverImageUrl: string;
  type: string;
  duration: number;
  isFree: boolean;
  cost: {
    amount: number;
    currency: string;
  };
  redirectLink: string;
  isHidden: boolean;
  seriesCount: number;
  questionAndAnswer: {
    answer: string;
    question: string;
  }[];
  totalBookings: number;
  attendantType: string;
  liveDateTimes: string[];
  numOfAttendees: number;
  registeredAttendeesCount: number | null;
  createdAt: string;
  updatedAt: string;
}

