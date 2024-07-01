import { Lang } from "../types";
import { words } from "../constants/words";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function correctPath(lang: Lang) {
  switch (lang) {
    case "en": return "coupon-codes";
    case "es": return "codigos-de-cupon";
    case "fr": return "code-promo";
    case "de": return "gutscheincodes";
    case "ru": return "kupon-kody";
    case "da": return "kupon-kode";
    case "it": return "codici-sconto";
    case "cs": return "kuponove-kody";
    case "nl": return "kortingscodes";
    case "no": return "kupongkode";
    case "pl": return "kody-kuponow";
    case "sv": return "rabattkoder";
    case "tr": return "kupon-kodu";
    case "uk": return "kod-kupona";
    case "ro": return "coduri-promotionale";
    case "bg": return "kodove-na-kuponi";
    case "be": return "kody-kuponau";
    case "fi": return "kuponkikoodit";
    case "pt": return "codigos-de-cupom";
    case "hr": return "kodovi-kupona";
    case "sl": return "kode-kuponov";
    case "el": return "kodikoi-kouponiou";
    case "hu": return "kuponkodok";
    case "sk": return "kuponove-kody";
    case "ga": return "coid cupon";
    
    case "ja":
    case "zh-CN":
      case "zh-TW":
    case "ko":
    case "ar":
    case "th":
    case "vi":
    case "ur":
    case "fa":
    case "my":
  return "coupon-codes";    
  }
}

export function getExpiryDate(expiryDate: string, lang:Lang) {
  const date = new Date(expiryDate);
  const day = date.getDate();
  //month in words
const monthRaw = date.toLocaleString('default', { month: 'short' });
  const month = words[monthRaw as keyof typeof words][lang] || monthRaw;
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function generateOffer(coupons: any, storeName: string, lang: Lang) {
    // fn
    function extractPercentage(str: string) {
        const percentages = str?.match(/\d{1,2}%/) || 0;
        if (percentages) {
            const percentageNumber = parseInt(percentages[0], 10);
            if (!isNaN(percentageNumber) && percentageNumber < 100 && percentageNumber > 2) {
                return percentageNumber;
            }
        }
        return null;
    }

    let bestOffer: number | null = null;

    // 1
    for (const coupon of coupons) {
        const offerPercentage = extractPercentage(coupon.offer);
        if (offerPercentage !== null) {
            if (bestOffer === null || offerPercentage > bestOffer) {
                bestOffer = offerPercentage;
            }
        }
    }

    // 2
    if (bestOffer === null) {
        for (const coupon of coupons) {
            const titlePercentage = extractPercentage(coupon.title);
            if (titlePercentage !== null) {
                if (bestOffer === null || titlePercentage > bestOffer) {
                    bestOffer = titlePercentage;
                }
            }
        }
    }

    // 3
    if (bestOffer !== null) {
        return `${bestOffer}% ${words.Off[lang]}`;
    } else {
        const storeNameLength = storeName.length;
        const modulo = storeNameLength % 4;

        switch (modulo) {
            case 0:
                return `25% ${words.Off[lang]}`;
            case 1:
                return `40% ${words.Off[lang]}`;
            case 2:
                return `50% ${words.Off[lang]}`;
            case 3:
                return `60% ${words.Off[lang]}`;
        }
    }

    // If no offer was found, return an empty string
    return "";
}


export const getProtocol = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://";
  } else {
    return "https://";
  }
}




