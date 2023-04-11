'use client';

import { Logo } from "./navbar/Logo";
import { Search } from "./navbar/Search";
import { UserMenu } from "./navbar/UserMenu";
import { SafeUser } from "../types";

interface ContainerProps {
  currentUser?: SafeUser | null;
}

function Container({ currentUser }: ContainerProps) {
  return (
    <div className="max-w-[2520px] mx-auto px-4 sm:px-2 md:px-10 xl:px-20">
      <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
        <Logo />
        <Search />
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  )
}

export default Container;