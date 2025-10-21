export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
}

export interface GitHubSocialAccount {
  provider: string;
  url: string;
}
