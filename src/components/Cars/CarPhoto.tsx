import React from "react";
import Image, { type ImageProps } from "next/image";
import { CarPhoto } from "@prisma/client";
import { DefaultCar } from "public";

type ImageOptions = Omit<ImageProps, "src" | "alt"> &
  Partial<Pick<ImageProps, "alt">>;

type Props = {
  photo?: CarPhoto;
} & ImageOptions;

const CarPhoto = ({ alt, photo, width, height, ...props }: Props) => {
  return (
    <Image
      alt={alt ?? photo?.epigraph ?? "default image"}
      src={photo?.url || DefaultCar}
      width={width ?? 256}
      height={height ?? 256}
      {...props}
    />
  );
};

export default CarPhoto;
