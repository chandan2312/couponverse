export type SideNavItem = {
  title: string;
  path: string;
  icon?: any;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  onClick?: any;
};

export type Lang = "en" | "ru" | "pt" | "ja" | "ar";
export type Status = "loading" | "unauthenticated" | "authenticated" | "error";
