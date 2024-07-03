export interface Restaurant {
    id?: number;
    name: string;
    description: string;
    location: string;
    contactNumber?: string;
    email?: string;
    openingHours?: string; // Example: "Mon-Sun: 9AM-10PM"
    cuisineType?: string;
    websiteUrl?: string;
    rating?: number;
    menuUrl?: string;
  }