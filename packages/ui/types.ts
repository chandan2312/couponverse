export type SideNavItem = {
  title: string;
  path: string;
  icon?:  any;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  onClick?: any;
};


export type Lang = 'en' | 'es' | 'fr' | 'de' | 'ru' | 'da' | 'it' | 'cs' | 'nl' | 'no' | 'pl' | 'sv' | 'tr' | 'ro' | 'bg' | 'be' | 'fi' | 'pt'  | 'hr' | 'sl' | 'el' | 'hu' | 'sk' | 'ga' | 'ja' | 'zh-CN' | 'zh-TW' | 'ko' | 'ar' | 'ms' | 'th' | 'vi' | 'tl' | 'id' | 'ur' | 'fa' | 'my' | 'uk';