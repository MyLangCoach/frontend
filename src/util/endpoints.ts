/** this would wrap all the api endpoints and base urls */
export const baseUrl = import.meta.env.VITE_BASE_URL;

export const url = {
  login: "/auth/signin",
  register: "/auth/signup",
  resendVerification:"/auth/resend-verification-email",
  socialRegister: "/auth/social-register",
  socialLogin: "/auth/social-login",
  logout: "/auth/logout",
  verifyUserEmail: "/auth/verify-email",
  offerings: "/offerings",
  getOfferings: "/offerings/all",
  userProfile:"/users/profile"
};
