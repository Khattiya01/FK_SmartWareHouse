import Image from "next/image";
import React from "react";

const OtherImage = (props: { otherImage: string[] | undefined }) => {
  const { otherImage } = props;

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {otherImage &&
          otherImage?.length > 0 &&
          otherImage.map((src, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={src}
                alt={`Image ${index}`}
                layout="fill"
                objectFit="cover"
                className=" hover:brightness-90 cursor-pointer transform duration-300"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OtherImage;
