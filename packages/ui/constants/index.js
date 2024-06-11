import { Sign } from "crypto";
import { SideNavItem } from "../types";
import {
  Home,
  SquareGanttChart,
  Settings,
  LogOut,
  Gift,
  Crown,
  Store,
  NotebookTabs,
} from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getLang } from "../lib/utils";

export const SIDENAV_ITEMS = [
  {
    title: "Home",
    path: "/",
    icon: <Home />,
  },

  // {
  // 	title: "TopBrands",
  // 	path: "/top-brands",
  // 	icon: <Crown />,
  // },
  {
    title: "Stores",
    path: "/stores",
    icon: <Store />,
  },
  // {
  // 	title: "Categories",
  // 	path: "/categories",
  // 	icon: <NotebookTabs />,
  // },
  // {
  // 	title: "Settings",
  // 	path: "/settings",
  // 	icon: <Settings />,
  // 	submenu: true,
  // 	subMenuItems: [
  // 		{ title: "Account", path: "/settings/account" },
  // 		{ title: "Privacy", path: "/settings/privacy" },
  // 	],
  // },
  {
    title: "Logout",
    path: "/logout",
    onClick: () => signOut(),
    icon: <LogOut />,
  },
];

export const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const months = [
  "-",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const currentYear = new Date().getFullYear();

export const dummyCode = {
  id: "6643ac80ac57eff159fcc832",
  sourceTitle: "Zyskaj MIKRO Ubezpieczenia już od 4zł w AGRO Ubezpieczenia",
  title: "Get Micro Insurance Starting at PLN 4",
  sourceDescription: "",
  description: "",
  shop: "agroubezpieczenia.pl",
  offer: "From PLN 4",
  code: "DUMMYCODE",
  type: "CODE",
  isVerified: false,
  isExpired: false,
  expiryDate: "",
  isSpinned: true,
  votes: 0,
  rating: 0,
  views: 0,
  voteHistory: [],
  usedToday: 0,
  lastClickTime: {
    $date: "2024-05-14T18:25:04.053Z",
  },
  scrapeUrl:
    "https://webcache.googleusercontent.com/search?q=cache:https://pl.promocodie.com/agro-ubezpieczenia-kod-rabatowy/agroubezpieczenia.pl",
  scrapeSite: "http:s://pl.promocodie.com",
  terms: "",
  storeID: {
    $oid: "6643ac6cac57eff159fcc830",
  },
  status: "PUBLISHED",
};

export const englishCountries = [
  "global", // global
  "in", // india
  "us", // united states
  "uk", // united kingdom
  "au", // australia
  "nz", // new zealand
  "za", // south africa
  "ng", // nigeria
  "sg", // singapore
  "ca", // canada
];

export const allCountries = [
  "in",
  "us",
  "uk",
  "au",
  "nz",
  "za",
  "ng",
  "sg",
  "ca",

  "es",
  "mx",
  "co",
  "ar",
  "pe",
  "ve",
  "cl",
  "gt",
  "ec",
  "cu",
  "do",
  "sv",
  "py",

  "fr",

  "de",
  "ch",
  "at",

  "uae",
  "kw",
  "sa",
  "qa",
  "om",
  "eg",
  "dz",
  "lb",
  "ma",
  "sd",
  "ru",
  "pt",
  "br",
  "mo",
  "nl",
  "be",
  "dk",
  "it",
  "cz",
  "nl",
  "no",
  "pl",
  "se",
  "tr",
  "ua",
  "ro",
  "bg",
  "by",
  "fi",
  "hr",
  "hu",
  "gr",
  "sl",
  "sk",
  "ie",

  "jp",
  "cn",
  "kr",
  "my",
  "th",
  "vn",
  "ph",
  "id",
  "pk",
  "ir",
  "mm",
];

export const liveCountries = [
  {
    name: "Germany",
    countryCode: "de",
    flag: `https://flagsapi.com/DE/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Belgium",
    countryCode: "bg",
    flag: `https://flagsapi.com/BG/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Poland",
    countryCode: "pl",
    flag: `https://flagsapi.com/PL/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Czech Republic",
    countryCode: "cz",
    flag: `https://flagsapi.com/CZ/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Austria",
    countryCode: "at",
    flag: `https://flagsapi.com/AT/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Hungary",
    countryCode: "hu",
    flag: `https://flagsapi.com/HU/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Ukraine",
    countryCode: "ua",
    flag: `https://flagsapi.com/UA/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Romania",
    countryCode: "ro",
    flag: `https://flagsapi.com/RO/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Croatia",
    countryCode: "hr",
    flag: `https://flagsapi.com/CR/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Slovokia",
    countryCode: "sk",
    flag: `https://flagsapi.com/SK/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Slovenia",
    countryCode: "sl",
    flag: `https://flagsapi.com/SI/flat/64.png`,
    cont: "Europe",
  },
  {
    name: "Greek",
    countryCode: "gr",
    flag: `https://flagsapi.com/GR/flat/64.png`,
    cont: "Europe",
  },
];
