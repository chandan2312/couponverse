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

export const countryWiseWords = {
  in: ["rupees", "inr", "₹", ".in", "co.in", "com.in"],
  us: ["dollars", "usd", "$", ".us", "co.us", "com.us"],
  uk: ["pounds", "gbp", "£", ".uk", ".co.uk", ".com.uk"],
  au: ["dollars", "aud", "$", ".au", "co.au", "com.au"],
  nz: ["dollars", "nzd", "$", ".nz", "co.nz", "com.nz"],
  za: ["rand", "zar", ".za", "co.za", "com.za"],
  ng: ["naira", "ngn", "₦", ".ng", "co.ng", "com.ng"],
  sg: ["dollars", "sgd", "$", ".sg", "co.sg", "com.sg"],
  ca: ["dollars", "$", ".ca", "co.ca", "com.ca"],

  // Europe
  es: ["euros", "eur", "€", ".es", "co.es", "com.es"],
  mx: ["pesos", "mxn", "$", ".mx", "co.mx", "com.mx"],
  co: ["pesos", "$", ".co"],
  ar: ["pesos", "ars", "$", ".ar", "co.ar", "com.ar"],
  pe: ["soles", "S/.", ".pe", "co.pe", "com.pe"],
  ve: ["bolivares", "ves", "Bs.", ".ve"],
  cl: ["pesos", "clp", "$", ".cl"],
  gt: ["quetzales", "gtq", "Q", ".gt"],
  ec: ["dollars", "usd", "$", ".ec"],
  cu: ["pesos", "$", ".cu"],
  do: ["pesos", "$", ".do", "co.do"],
  sv: ["dollars", "usd", "$", ".sv"],
  py: ["guarani", "pyg", "₲", ".py"],
  ru: ["ruble", "rub", "₽", ".ru"],

  // Europe
  fr: ["euros", "eur", "€", ".fr", "co.fr", "com.fr"],
  de: ["euros", "eur", "€", ".de", "co.de", "com.de"],
  ch: ["francs", "chf", "CHF", ".ch", "co.ch", "com.ch"],
  at: ["euros", "eur", "€", ".at", "co.at", "com.at"],
  hu: ["forints", "Ft", ".hu"],
  gr: ["euros", "eur", "€", ".gr"],
  sl: ["euros", "eur", "€", ".sl"],
  sk: ["euros", "eur", "€", ".sk"],
  hr: ["kuna", "hrk", "kn", ".hr", "co.hr", "com.hr"],
  fi: ["euros", "eur", "€", ".fi", "co.fi", "com.fi"],
  by: ["ruble", "byr", "Br", ".by"],
  bg: ["leva", "bgn", "лв", ".bg"],
  ro: ["lei", "ron", "lei", ".ro"],
  ua: ["hryvnia", "uah", "₴", ".ua"],
  tr: ["lira", "try", "₺", ".tr", ".com.tr"],
  se: ["krona", "sek", "kr", ".se"],
  pl: ["zloty", "pln", "zł", ".pl"],
  no: ["kroner", "nok", "kr", ".no"],
  nl: ["euros", "eur", "€", ".nl"],
  dk: ["kroner", "dkk", "kr", ".dk"],
  it: ["euros", "eur", "€", ".it"],
  cz: ["koruna", "czk", "Kč", ".cz"],
  nl: ["euros", "eur", "€", ".nl"],
  ie: ["euros", "eur", "€", ".ie"],

  // Asia
  jp: ["yen", "jpy", "¥", ".jp", "co.jp", "com.jp"],
  cn: ["yuan", "cny", "¥", ".cn", "co.cn", "com.cn"],
  kr: ["won", "krw", "₩", ".kr", "co.kr", "com.kr"],
  my: ["ringgit", "myr", "RM", ".my", "co.my", "com.my"],
  th: ["baht", "thb", "฿", ".th", "co.th", "com.th"],
  vn: ["dong", "vnd", "₫", ".vn", "co.vn", "com.vn"],
  ph: ["pesos", "php", "₱", ".ph", "co.ph", "com.ph"],
  id: ["rupiah", "idr", "Rp", ".id", "co.id", "com.id"],
  pk: ["rupees", "pkr", "₨", ".pk", "co.pk", "com.pk"],
  ir: ["rial", "irr", "﷼", ".ir", "co.ir", "com.ir"],
};

export const flattenCountryWiseWords = [
  ...new Set(Object.values(countryWiseWords).flat()),
];
