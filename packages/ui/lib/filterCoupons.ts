const filterCoupons = (coupons: any) => {
    let offersSeen = new Set();

    // Filter 
    const filteredCoupons = coupons.filter((item: any) => {
        const offerNormalized = item.englishOffer
            ?.replace(/upto |Upto |Up to |up to /g, "");
let duplicate;
        if(offerNormalized){
            duplicate = offersSeen.has(offerNormalized);
            offersSeen.add(offerNormalized);
        }
        

        const includedPattern = /[0-9]|off|OFF|Off|free|Free|Upto|upto|discount|Discount|[$€£¥₹₩₽₣₦₴₫₭₲₳฿₵₡₢₰]|%/;
        const isIncluded = item.type === "CODE" || includedPattern.test(item.englishOffer) || includedPattern.test(item.englishTitle);

         if (coupons.length < 5) {
            return true;
        }
        
        if (!duplicate && isIncluded) {
            if (item.isExpired) {
                item.isExpired = true;
            } else if (item.expiryDate) {
                item.isExpired = item.expiryDate < new Date();
            } else {
                if (item.voteHistory.length > 0) {
                    let totalWeight = 0;
                    let weightedSum = 0;

                    item.voteHistory.forEach((history: any, index: number) => {
                        const weight = item.voteHistory.length - index;
                        totalWeight += weight;

                        const voteValue = history.vote === "yes" ? 1 : 0;
                        weightedSum += voteValue * weight;
                    });

                    const weightedAverage = weightedSum / totalWeight;

                    item.isExpired = weightedAverage < 0.5;
                } else {
                    item.isExpired = false;
                }
            }

            return true;
        }

        return false;
    });

    // Sort 
    filteredCoupons.sort((a: any, b: any) => {
        if (a.type === "CODE" && b.type !== "CODE") {
            return -1;
        } else if (a.type !== "CODE" && b.type === "CODE") {
            return 1;
        } else {
            return 0;
        }
    });

    return filteredCoupons;
};

export default filterCoupons;
