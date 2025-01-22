import { User, MapPin, Calendar, Edit2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    pfp: string;
    bio: string;
    premium: boolean;
    joinDate: string;
  };
  isOwnProfile: boolean;
  onEditProfile: () => void;
}

export function ProfileHeader({
  user,
  isOwnProfile,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-[#00c2cb] to-[#152932] pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="md:flex md:items-end md:justify-between">
          <div className="flex items-center">
            <Avatar className="md:size-44 size-32 rounded-full ring-4 ring-white">
              <AvatarImage src={user.pfp} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-lg text-gray-300">{user.email}</p>
              {user.premium && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-900 mt-2">
                  Premium
                </span>
              )}
                <div className="mt-6 flex gap-4">
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0" />
            Joined {user.joinDate}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <User className="mr-1.5 h-5 w-5 flex-shrink-0" />
            {user.premium ? "Premium Member" : "Free Member"}
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <div className="flex items-center text-sm text-gray-300">
            {user.bio ? user.bio : <p>No bio yet</p>}
          </div>
        </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            {isOwnProfile ? (
              <Button
                onClick={onEditProfile}
                variant="secondary"
                className="flex items-center"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <Button variant="secondary" className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </Button>
            )}
          </div>
        </div>
      
       
      </div>
    </div>
  );
}
