"use client";

import { User, UserSocialAccount } from "@/lib/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  Building2,
  Globe,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";
import { JSX, useMemo } from "react";

interface Props {
  user: User;
  userSocialAccounts?: UserSocialAccount[];
}

const ProfileSideBar = ({ user, userSocialAccounts }: Props) => {
  const positiveEmojis = useMemo(
    () => ["😀", "😃", "😄", "😊", "🙂", "😎", "🤓", "🥳", "😇", "🤩"],
    []
  );

  const userEmoji = useMemo(() => {
    const index = user.id % positiveEmojis.length;
    return positiveEmojis[index];
  }, [user.id, positiveEmojis]);

  const checkSocialIcon = (url: string) => {
    const socialMediaIcons: { [key: string]: JSX.Element } = {
      twitter: <Twitter className="w-4 h-4" />,
      linkedin: <Linkedin className="w-4 h-4" />,
      facebook: <Facebook className="w-4 h-4" />,
      instagram: <Instagram className="w-4 h-4" />,
      github: <Github className="w-4 h-4" />,
    };

    for (const key in socialMediaIcons) {
      if (url.includes(key)) {
        return socialMediaIcons[key];
      }
    }
    return null;
  };

  return (
    <aside className="w-full lg:max-w-[300px]">
      {/* Desktop */}
      <div className="hidden lg:flex flex-col items-start gap-4">
        <div className="relative">
          <Avatar className="w-[150px] h-[150px]">
            <AvatarImage
              src={user.avatar_url || undefined}
              alt={user.name || "User Avatar"}
            />
            <AvatarFallback className="text-4xl">
              {user.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl shadow-md border-2 border-white">
            {userEmoji}
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-bold text-[#262626] mb-1">
            {user.name}
          </h2>
          {user.bio && (
            <p className="text-base text-[#989898] mb-4">{user.bio}</p>
          )}
        </div>

        <div className="w-full space-y-3 text-sm text-[#0587FF]">
          {user.company && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a
                href={user.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                {user.blog}
              </a>
            </div>
          )}
          {userSocialAccounts && userSocialAccounts.length > 0 && (
            <>
              {userSocialAccounts.map((account, index) => (
                <div
                  key={`social-account-${index}`}
                  className="flex items-center gap-2"
                >
                  <a
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-2"
                  >
                    {checkSocialIcon(account.url)}
                    <span className="text-sm">{account.url}</span>
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden md:flex lg:hidden items-start gap-6 pb-6 border-b border-[#E5E7EB]">
        <div className="relative shrink-0">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user.avatar_url || undefined}
              alt={user.name || "User Avatar"}
            />
            <AvatarFallback className="text-3xl">
              {user.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center text-base shadow-md border-2 border-white">
            {userEmoji}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-[#262626] mb-1">{user.name}</h2>
          {user.bio && (
            <p className="text-sm text-[#989898] mb-3">{user.bio}</p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#0587FF]">
            {user.company && (
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{user.company}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <a
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate max-w-[150px]"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center text-center gap-3 pb-6 border-b border-[#E5E7EB]">
        <div className="relative">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={user.avatar_url || undefined}
              alt={user.name || "User Avatar"}
            />
            <AvatarFallback className="text-2xl">
              {user.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm shadow-md border-2 border-white">
            {userEmoji}
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-lg font-bold text-[#262626] mb-0.5">
            {user.name}
          </h2>
          {user.bio && <p className="text-xs text-[#989898]">{user.bio}</p>}
        </div>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs text-[#0587FF]">
          {user.company && (
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{user.location}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <a
                href={user.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate max-w-[120px]"
              >
                {user.blog}
              </a>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ProfileSideBar;
