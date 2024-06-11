import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import SideNav from "../global/Sidenav";

const MobileMenu = ({ lang, country }: { lang: string; country: string }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu color="#2c2c2c" />
      </SheetTrigger>
      <SheetContent side="left">
        <SideNav lang={lang} country={country} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
