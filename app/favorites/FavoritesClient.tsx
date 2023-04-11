'use client';

import { SafeListing, SafeUser } from "@/app/types";

import { Heading } from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

function FavoritesClient({
  listings,
  currentUser
}: FavoritesClientProps) {
  return (
    <div className="max-w-[2520px] mx-auto px-4 sm:px-2 md:px-10 xl:px-20">
      <Heading
        title="Favorites"
        subtitle="List of places you favorited!"
      />
      <div 
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </div>
   );
}

export default FavoritesClient;
