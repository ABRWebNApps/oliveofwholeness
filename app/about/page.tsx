"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const coreValues = [
    {
      title: "Christ-Centered Healing",
      description:
        "We believe that Jesus Christ is the ultimate source of healing and restoration for both emotional and spiritual wounds.",
    },
    {
      title: "Compassion",
      description:
        "We approach every person with empathy, understanding, and genuine care, creating a safe space for vulnerability and growth.",
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our interactions, ensuring trust and confidentiality in our therapeutic relationships.",
    },
    {
      title: "Growth & Transformation",
      description:
        "We are committed to helping individuals experience lasting change and personal development through faith-based healing.",
    },
    {
      title: "Community",
      description:
        "We foster a sense of belonging and support, recognizing that healing often happens in the context of healthy relationships.",
    },
    {
      title: "Hope",
      description:
        "We believe in the power of hope to transform lives and help people envision a brighter, healthier future in Christ.",
    },
  ];

  const ethicsData = [
    {
      title: "Confidentiality",
      description:
        "Your privacy and trust are sacred to us. All sessions and communications are kept strictly confidential.",
    },
    {
      title: "Biblical Foundation",
      description:
        "Our approach is grounded in biblical principles while respecting individual faith journeys.",
    },
    {
      title: "Non-judgmental Approach",
      description:
        "We provide a safe space free from judgment, where you can be authentic and vulnerable.",
    },
    {
      title: "Excellence & Accountability",
      description:
        "We maintain high professional standards and are committed to continuous growth and accountability.",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [emblaValuesRef, emblaValuesApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedValuesIndex, setSelectedValuesIndex] = React.useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaValuesApi) return;
    const onSelectValues = () =>
      setSelectedValuesIndex(emblaValuesApi.selectedScrollSnap());
    emblaValuesApi.on("select", onSelectValues);
    emblaValuesApi.on("reInit", onSelectValues);
    return () => {
      emblaValuesApi.off("select", onSelectValues);
      emblaValuesApi.off("reInit", onSelectValues);
    };
  }, [emblaValuesApi]);

  const [emblaEthicsRef, emblaEthicsApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedEthicsIndex, setSelectedEthicsIndex] = React.useState(0);

  useEffect(() => {
    if (!emblaEthicsApi) return;
    const onSelectEthics = () =>
      setSelectedEthicsIndex(emblaEthicsApi.selectedScrollSnap());
    emblaEthicsApi.on("select", onSelectEthics);
    emblaEthicsApi.on("reInit", onSelectEthics);
    return () => {
      emblaEthicsApi.off("select", onSelectEthics);
      emblaEthicsApi.off("reInit", onSelectEthics);
    };
  }, [emblaEthicsApi]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            About Olive of Wholeness
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Discover our heart for healing and our commitment to walking
            alongside you on your journey to wholeness.
          </p>
        </div>
      </section>

      {/* Mission & Vision Slider */}
      <section className="py-20 bg-muted/30">
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y">
            {/* Slide 1: Mission */}
            <div className="flex-[0_0_100%] min-w-0 px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Our Mission
              </h2>
              <blockquote className="text-xl md:text-2xl text-foreground font-medium text-pretty leading-relaxed border-l-4 border-primary pl-6 italic">
                "To guide people on a journey of emotional healing and spiritual
                renewal through the love of Christ, providing compassionate
                support that addresses both the heart and mind in a safe,
                nurturing environment."
              </blockquote>
            </div>

            {/* Slide 2: Vision */}
            <div className="flex-[0_0_100%] min-w-0 px-4">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Our Vision
              </h2>
              <blockquote className="text-xl md:text-2xl text-foreground font-medium text-pretty leading-relaxed border-l-4 border-accent pl-6 italic">
                "To see a generation emotionally whole, spiritually strong, and
                free from the grip of past wounds, walking confidently in their
                God-given purpose and experiencing the abundant life Christ
                promised."
              </blockquote>
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground w-full mt-4 text-center">
            Swipe to read more
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              These values guide everything we do and shape how we approach each
              person's unique healing journey.
            </p>
          </div>

          <div className="overflow-hidden pb-8" ref={emblaValuesRef}>
            <div className="flex touch-pan-y -ml-4">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 py-4"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values Slider Indicators */}
          <div className="flex justify-center gap-2 mt-2">
            {coreValues.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaValuesApi?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === selectedValuesIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ethics Slider */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Ethics</h2>
          </div>

          <div className="overflow-hidden pb-8" ref={emblaEthicsRef}>
            <div className="flex touch-pan-y -ml-4">
              {ethicsData.map((ethic, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] min-w-0 pl-4 py-4"
                >
                  <div className="bg-muted/10 p-8 rounded-2xl h-full border border-border/50 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      {ethic.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {ethic.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ethics Slider Indicators */}
          <div className="flex justify-center gap-2 mt-2 mb-12">
            {ethicsData.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaEthicsApi?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === selectedEthicsIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center pt-8">
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/contact">Begin Your Healing Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bio Section - Moved Below Ethics */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <img
                src="/professional-therapist-portrait-warm-compassionate.jpg"
                alt="Faith Therapist"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Meet Your Guide to Healing
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p className="leading-relaxed">
                  Welcome to Olive of Wholeness, where faith meets healing in a
                  journey toward emotional and spiritual restoration. I am
                  passionate about helping individuals discover the
                  transformative power of Christ's love in their healing
                  process.
                </p>
                <p className="leading-relaxed">
                  With years of experience in faith-based counseling and a deep
                  understanding of both psychological principles and biblical
                  wisdom, I provide a unique approach that addresses the whole
                  person - mind, body, and spirit.
                </p>
                <p className="leading-relaxed">
                  My calling is to create a safe, nurturing environment where
                  you can explore your struggles, find hope in God's promises,
                  and experience the freedom that comes from true healing. Every
                  person who walks through our doors is precious to God, and it
                  is my privilege to help you discover that truth for yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
