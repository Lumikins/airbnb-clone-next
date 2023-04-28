"use client"

interface NavbarProps {
  currentUser?: User | null
}
import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
  return ( 
    <div className="fixed w-full z-10 bg-white shadow-sm">
      <div className="py-4 border-b-2">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
   );
}
 
export default Navbar;