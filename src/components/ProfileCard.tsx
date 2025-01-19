import { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCardProps {
  profile: Profile;
  onShowLocation: (profile: Profile) => void;
  onViewDetails: (profile: Profile) => void;
}

const ProfileCard = ({ profile, onShowLocation, onViewDetails }: ProfileCardProps) => {
  return (
    <Card className="w-full mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span>{profile.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{profile.description}</p>
        <p className="text-sm text-gray-500 mt-2">{profile.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onViewDetails(profile)}>
          View Details
        </Button>
        <Button onClick={() => onShowLocation(profile)}>
          Show on Map
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;