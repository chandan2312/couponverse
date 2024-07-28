"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { contentGenerator } from "../../lib/contentGenerator";
import { Lang } from "../../types";

const StoreFAQs = ({ name, lang }: { name: string; lang: Lang }) => {
  const faqsData = [
    {
      q: contentGenerator({ type: "faq1Question", name }),
      a: contentGenerator({ type: "faq1Answer", name }),
    },
    {
      q: contentGenerator({ type: "faq2Question", name }),
      a: contentGenerator({ type: "faq2Answer", name }),
    },
    {
      q: contentGenerator({ type: "faq3Question", name }),
      a: contentGenerator({ type: "faq3Answer", name }),
    },
    {
      q: contentGenerator({ type: "faq4Question", name }),
      a: contentGenerator({ type: "faq4Answer", name }),
    },
  ];
  return (
    <Accordion type="single" collapsible>
      {faqsData?.map((item: any, index: any) => {
        return (
          <AccordionItem key={index} value="item-1">
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default StoreFAQs;
