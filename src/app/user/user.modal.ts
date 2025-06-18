export interface UserType {
  avatar_url: string;
  html_url: string;
  repos_url: string;
  name: string;
  company: string | null;
  location: string | null;
  email: string | null;
  hirable: boolean;
  bio: string;
  followers: number;
  following: number;
  created_at: string;
}