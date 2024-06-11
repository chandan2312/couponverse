import Image from "next/image";
import Link from "next/link";
import { words } from "../../constants/words";
import { correctPath, generateOffer } from "../../lib/utils";

const SimilarStoreCard = ({ store }: { store: any }) => {
  const lang = process.env.LG || "en";
  const cpath = correctPath(lang);
  let theOffer = "";
  if (store.coupons) {
    theOffer = generateOffer(store.coupons, store.nativeName, lang);
  }

  return (
    <>
      <div className="   bg-muted/5 rounded-lg shadow-sm border border-foreground/50  border-dashed p-1.5  md:flex md:items-center gap-1 md:gap-2">
        <figure className="lg:w-[40%] w-full max-md:max-h-24 bg-card shadow-md p-2 rounded-md mx-auto flex items-center justify-center  h-24 ">
          <Image
            src={
              store.img ? `${process.env.CDN_URL}${store.img}` : store.sourceImg
            }
            alt={store.nativeName}
            height={90}
            width={90}
            style={{ objectFit: "contain" }}
            className="rounded-lg overflow-hidden"
          />
        </figure>

        <div className=" space-y-1 flex-grow flex flex-col justify-between  ">
          <h3 className="font-semibold text-center text-sm">
            {store.nativeName}
          </h3>

          {theOffer ? (
            <p className="text-center text-accent text-xs">{theOffer}</p>
          ) : (
            ""
          )}

          <Link
            className="w-full  px-0.5 max-h-7 rounded-full shadow-sm bg-accent2/70 text-accent-foreground text-sm  border border-accent2/70 border-b-4 border-b-accent2/90 mx-auto  text-center  overflow-hidden"
            href={`/${cpath}/${store.slug}`}
          >
            <span>{words.ViewOffers[lang]}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SimilarStoreCard;
