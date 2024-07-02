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
      q: contentGenerator("faq1Question", name, lang),
      a: contentGenerator("faq1Answer", name, lang),
    },
    {
      q: contentGenerator("faq2Question", name, lang),
      a: contentGenerator("faq2Answer", name, lang),
    },
    {
      q: contentGenerator("faq3Question", name, lang),
      a: contentGenerator("faq3Answer", name, lang),
    },
    {
      q: contentGenerator("faq4Question", name, lang),
      a: contentGenerator("faq4Answer", name, lang),
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
