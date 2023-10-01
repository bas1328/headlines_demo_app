import { NextSeo } from "next-seo";
import { OpenGraph, Twitter } from "next-seo/lib/types";
import { Robots } from "next/dist/lib/metadata/types/metadata-types";
import { FC, memo, useMemo } from "react";

interface IProps {
  seoInfo: {
    title?: string;
    seoTitle?: string;
    description?: string;
    seoKeywords?: string;
    canonical?: string;
    openGraph?: OpenGraph;
    twitter?: Twitter;
    robotsProps?: Robots;
  };
}

const HeadlinesSeo: FC<IProps> = ({ seoInfo }: IProps) => {
  const additionalMetaTags = useMemo(
    () =>
      seoInfo?.seoKeywords
        ? [{ name: "keywords", content: seoInfo?.seoKeywords }]
        : undefined,
    [seoInfo?.seoKeywords]
  );

  const {
    title,
    seoTitle,
    description,
    canonical,
    openGraph,
    twitter,
    robotsProps,
  } = seoInfo;

  return (
    <NextSeo
      title={seoTitle ?? title}
      description={description}
      additionalMetaTags={additionalMetaTags}
      canonical={canonical}
      openGraph={openGraph}
      twitter={twitter}
      robotsProps={robotsProps}
    />
  );
};

export default memo(HeadlinesSeo);
