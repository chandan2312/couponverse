const filterCoupons = (coupons: any) => { 
    coupons.forEach((coupon: any) => {


         if(coupon.isExpired){
            coupon.isExpired = true;
         }else  if(coupon.expiryDate){
            if(coupon.expiryDate < new Date()){
                coupon.isExpired = true;
            } else {
                coupon.isExpired = false;
            } 
        //expiry date is not available
        } else {

            if(coupon.voteHistory.length > 0){
                let totalWeight = 0;
                let weightedSum = 0;

                coupon.voteHistory.forEach((history: any, index: number) => {
                    const weight = coupon.voteHistory.length - index;
                    totalWeight += weight;

                    // Consider "yes" vote as 1 and "no" vote as 0
                    const voteValue = history.vote === "yes" ? 1 : 0;
                    weightedSum += voteValue * weight;
                });

                // Calculate the weighted average
                const weightedAverage = weightedSum / totalWeight;

                // If the weighted average is greater than or equal to 0.5, consider the coupon as not expired
                coupon.isExpired = weightedAverage < 0.5;
            }else{
                  coupon.isExpired = false;
            }
        }
    });

        // Sort the codes and deal
    coupons.sort((a: any, b: any) => {
        if (a.type === "CODE" && b.type !== "CODE") {
            return -1;
        } else if (a.type !== "CODE" && b.type === "CODE") {
            return 1;
        } else if (a.type === "DEAL" && b.type !== "DEAL") {
            return -1;
        } else if (a.type !== "DEAL" && b.type === "DEAL") {
            return 1;
        } else {
            return 0;
        }
    });

    return coupons;
}

export default filterCoupons;