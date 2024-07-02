import React from "react";
import { words } from "../../constants/words";
import { Lang } from "../../types";
import { codeTrim } from "../../lib/codeTrim";
import CouponPopup from "./CouponPopup";

const CouponListWidget = ({ store }: { store: any }) => {
  const lang: Lang = process.env.LG as Lang;
  return (
    <>
      <div className="card-section">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">{words.TopOffers[lang]}</th>
              <th className="text-left">{words.CouponCode[lang]}</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {store.coupons
              .filter((item: any) => item.isExpired != true)
              .filter((item: any) => item.type == "CODE")
              .map((coupon: any, index: number) => (
                <tr key={index} className="m-2 my-4 border-b border-b-muted/30">
                  <td className="my-2">{coupon.title}</td>
                  <td className="my-2 flex gap-2 items-center">
                    <span>{codeTrim(coupon.code)}</span>
                    <CouponPopup
                      deal={coupon}
                      store={store}
                      lang={lang}
                      cdnUrl={process.env.CDN_URL}
                      isListPopup={true}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CouponListWidget;
