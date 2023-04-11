'use client';

import Container from "../Container";

import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container currentUser={currentUser} />
      </div>

      <Categories />
    </div>
  )
}

export default Navbar;
