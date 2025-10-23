"use client";

import { User, UserSocialAccount } from "@/lib/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Card } from "@/ui/card";
import { Building2, Globe, MapPin } from "lucide-react";
import { JSX } from "react";

interface Props {
  user: User;
  userSocialAccounts?: UserSocialAccount[];
}

const ProfileSideBar = ({ user, userSocialAccounts }: Props) => {
  const checkSocialIcon = (url: string) => {
    const socialMediaIcons: { [key: string]: JSX.Element } = {
      twitter: <i className="fab fa-twitter"></i>,
      linkedin: <i className="fab fa-linkedin"></i>,
      facebook: <i className="fab fa-facebook"></i>,
      instagram: <i className="fab fa-instagram"></i>,
      github: <i className="fab fa-github"></i>,
    };

    for (const key in socialMediaIcons) {
      if (url.includes(key)) {
        return socialMediaIcons[key];
      }
    }
    return null;
  };

  return (
    <aside className="w-full max-w-sm">
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={user.avatar_url || undefined}
              alt={user.name || "User Avatar"}
            />
            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          </div>
          <ul className="mt-4 text-sm text-slate-700 space-y-1">
            {user.company && (
              <li>
                <Building2 className="inline mr-1" /> {user.company}
              </li>
            )}
            {user.location && (
              <li>
                <MapPin className="inline mr-1" /> {user.location}
              </li>
            )}
            {user.blog && (
              <li>
                <a href={user.blog} target="_blank" rel="noopener noreferrer">
                  <Globe className="inline mr-1" /> {user.blog}
                </a>
              </li>
            )}
            {userSocialAccounts && userSocialAccounts.length > 0 && (
              <>
                {userSocialAccounts.map((account, index) => (
                  <li key={`social-account-${index}`}>
                    <a
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {checkSocialIcon(account.url)}
                    </a>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </Card>
    </aside>
  );
};

export default ProfileSideBar;
