export interface Profile {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SearchProps {
  onSearch: (query: string) => void;
}