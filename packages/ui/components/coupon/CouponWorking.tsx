"use client";

import React, { useEffect, useState } from "react";
import { words } from "../../constants/words";
import { Button } from "../../components/ui/button";
import StoreWrapper from "../../lib/StoreWrapper";
import { useSelector } from "react-redux";
import { addCouponVote } from "../../actions/coupon";
import { toast } from "sonner";
import { Lang } from "../../types";

const CouponWorking = ({ lang, deal }: { lang: Lang; deal: any }) => {
  return (
    <StoreWrapper>
      <CouponWorkingInside lang={lang || "en"} deal={deal} />
    </StoreWrapper>
  );
};

export const CouponWorkingInside = ({
  lang,
  deal,
}: {
  lang: Lang;
  deal: any;
}) => {
  const [votedDeals, setVotedDeals] = useState([]);
  const [currVoteStatus, setCurrVoteStatus] = useState("");

  const votedRes = localStorage.getItem("votedDeals");
  const voted = votedRes ? JSON.parse(votedRes) : [];

  useEffect(() => {
    setVotedDeals(voted);
    const currVoteStatus = voted?.find((vote: any) => vote.dealId === deal.id);
    currVoteStatus && setCurrVoteStatus(currVoteStatus.vote);
  }, [voted, deal.id]);

  const handleCouponVote = async (vote: string, dealId: string) => {
    const votedDealsJson = localStorage.getItem("votedDeals");
    const votedDeals = votedDealsJson ? JSON.parse(votedDealsJson) : [];
    const votedDeal = votedDeals.find((item: any) => {
      return item.dealId === dealId;
    });
    const isSameVoted = votedDeal && votedDeal.vote === vote;
    if (isSameVoted) {
      toast.warning("You already voted");
      return;
    }
    const isVotedOpposite = votedDeal && votedDeal.vote !== vote;
    if (isVotedOpposite) {
      //check is currentvote is added in less than 24 hours if yes then
      if (
        new Date(votedDeal.time).getTime() >
        Date.now() - 1000 * 60 * 60 * 24
      ) {
        toast.error("You cant change vote immediately.\nTry after sometime");
        return;
      }

      const addCouponVoteRes = await addCouponVote({ dealId, vote });

      const newVotedDeals = votedDeals.filter(
        (votedDeal: any) => votedDeal.dealId !== dealId,
      );
      newVotedDeals.push({ dealId, vote, time: new Date() });

      localStorage.setItem("votedDeals", JSON.stringify(newVotedDeals));
      setCurrVoteStatus(vote);
    } else {
      const addCouponVoteRes = await addCouponVote({
        dealId,
        vote,
        time: new Date(),
      });
      votedDeals.push({ dealId, vote });
      localStorage.setItem("votedDeals", JSON.stringify(votedDeals));
      setCurrVoteStatus(vote);
      toast.success("Voted Successfully");
    }
  };

  return (
    <>
      <div>{`${words.IsItWorking[lang]}?`}</div>

      <div className="flex gap-1">
        <Button
          onClick={() => handleCouponVote("yes", deal.id)}
          variant="primaryOutline"
          size="sm"
          className={`font-semibold ${
            currVoteStatus == "yes" && "bg-accent/60 text-accent-foreground"
          }`}
        >
          {words.Yes[lang]}
        </Button>
        <Button
          onClick={() => handleCouponVote("no", deal.id)}
          variant="primaryOutline"
          size="sm"
          className={`font-semibold ${
            currVoteStatus == "no" && "bg-accent2/60 text-accent2-foreground"
          }`}
        >
          {words.No[lang]}
        </Button>
      </div>
    </>
  );
};

export default CouponWorking;
