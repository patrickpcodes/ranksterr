import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

interface ClickableCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  onCardClick: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function ClickableCard({
  title,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  onCardClick,
  buttonText,
  onButtonClick,
}: ClickableCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer w-[300px]"
      onClick={onCardClick}
    >
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <div
          className="relative w-full"
          style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover rounded-md"
            unoptimized
          />
        </div>
      </CardContent>
      {buttonText && (
        <CardFooter className="p-6 pt-0">
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when button is clicked
              onButtonClick?.();
            }}
            className="w-full"
          >
            {buttonText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
