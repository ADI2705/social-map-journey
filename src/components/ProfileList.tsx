import { Profile } from "@/lib/types";
import ProfileCard from "./ProfileCard";

interface ProfileListProps {
  profiles: Profile[];
  onShowLocation: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
}

const ProfileList = ({ profiles, onShowLocation, onViewDetails }: ProfileListProps) => {
  return (
    <div className="overflow-y-auto h-[calc(100vh-12rem)] px-4">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onShowLocation={onShowLocation}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProfileList;