import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import SideNav from "../global/Sidenav";
import { Lang } from "../../types";

const MobileMenu = ({ lang, country }: { lang: Lang; country: string }) => {
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
