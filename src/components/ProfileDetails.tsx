import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Profile } from "@/lib/types";

interface ProfileDetailsProps {
  profile?: Profile;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDetails = ({ profile, isOpen, onClose }: ProfileDetailsProps) => {
  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{profile.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          <p className="text-gray-600">{profile.description}</p>
          <div className="text-sm text-gray-500">
            <p className="font-semibold">Address:</p>
            <p>{profile.address}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetails;