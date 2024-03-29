'use client';

import { IconType } from "react-icons";
import Map from "../Map";

import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import { Avatar } from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType;
    label: string;
    description: string;
  } | undefined;
  locationValue: string;
}

export function ListingInfo({
  category,
  description,
  locationValue,
  guestCount,
  roomCount,
  bathroomCount,
  user
}: ListingInfoProps) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <span>
            {guestCount} guests
          </span>

          <span>
            {roomCount} rooms
          </span>

          <span>
            {bathroomCount} bathrooms
          </span>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}
