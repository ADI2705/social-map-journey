import { useState } from "react";
import { Profile } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import ProfileList from "@/components/ProfileList";
import Map from "@/components/Map";
import ProfileDetails from "@/components/ProfileDetails";

// Sample data - replace with your actual data source
const sampleProfiles: Profile[] = [
  {
    id: "1",
    name: "John Doe",
    description: "Software Engineer with 5 years of experience",
    photoUrl: "https://source.unsplash.com/random/200x200/?portrait",
    address: "123 Tech Street, San Francisco, CA",
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: "2",
    name: "Jane Smith",
    description: "UX Designer passionate about user-centered design",
    photoUrl: "https://source.unsplash.com/random/200x200/?woman",
    address: "456 Design Ave, New York, NY",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  }
];

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>(sampleProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>();
  const [detailsProfile, setDetailsProfile] = useState<Profile | undefined>();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSearch = (query: string) => {
    const filtered = sampleProfiles.filter(profile =>
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.description.toLowerCase().includes(query.toLowerCase())
    );
    setProfiles(filtered);
  };

  const handleShowLocation = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const handleViewDetails = (profile: Profile) => {
    setDetailsProfile(profile);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel */}
      <div className="w-1/2 p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Profile Explorer</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <ProfileList
          profiles={profiles}
          onShowLocation={handleShowLocation}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-6">
        <Map selectedProfile={selectedProfile} />
      </div>

      {/* Profile Details Dialog */}
      <ProfileDetails
        profile={detailsProfile}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Index;