import { useState } from "react";
import { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdminPanelProps {
  profiles: Profile[];
  onAddProfile: (profile: Profile) => void;
  onEditProfile: (profile: Profile) => void;
  onDeleteProfile: (id: string) => void;
}

const AdminPanel = ({
  profiles,
  onAddProfile,
  onEditProfile,
  onDeleteProfile,
}: AdminPanelProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Profile>>({
    name: "",
    description: "",
    photoUrl: "",
    address: "",
    email: "",
    phone: "",
    interests: [],
    coordinates: { lat: 0, lng: 0 },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProfile) {
        onEditProfile({ ...editingProfile, ...formData } as Profile);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      } else {
        onAddProfile({
          ...formData,
          id: Date.now().toString(),
        } as Profile);
        toast({
          title: "Success",
          description: "Profile added successfully",
        });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the profile",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      onDeleteProfile(id);
      toast({
        title: "Success",
        description: "Profile deleted successfully",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      photoUrl: "",
      address: "",
      email: "",
      phone: "",
      interests: [],
      coordinates: { lat: 0, lng: 0 },
    });
    setEditingProfile(null);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}>
              Add New Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingProfile ? "Edit Profile" : "Add New Profile"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input
                  id="photoUrl"
                  value={formData.photoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, photoUrl: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input
                  id="interests"
                  value={formData.interests?.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interests: e.target.value.split(",").map((i) => i.trim()),
                    })
                  }
                />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProfile ? "Update" : "Add"} Profile
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingProfile(profile);
                  setFormData(profile);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(profile.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;