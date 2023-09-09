import Image from "next/image";
import React from "react";
import { staticBlurUrl } from "@/utils/staticBlurUrl";
import { dynamicBlurUrl } from "@/utils/dynamicBlurUrl";

//s3 혹은 DB 에서 가져오는 url 이라고 치자.
const ImgUrls = [
  {
    url: "https://res.cloudinary.com/dtuwppn6w/image/upload/v1694243404/square8_brwalb.jpg",
  },
  {
    url: "https://res.cloudinary.com/dtuwppn6w/image/upload/v1694243561/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-05_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.33.41_h09txb.png",
  },
];

const HomePage = async () => {
  //const placeholders = await Promise.all(
  //  ImgUrls.map((url) => dynamicBlurUrl(url))
  //);
  const photosArray = ImgUrls.map(async (photo) => ({
    ...photo,
    blurHash: await dynamicBlurUrl(photo.url),
  }));

  const photos = await Promise.all(photosArray);

  return (
    <div className="grid-row">
      {/*<div className="flex-center">
        <h1>before optimization</h1>
        <img src="./img1.png" alt="img1" className="img-wrapper" />
        <img src="./img2.png" alt="img2" className="img-wrapper" />
      </div>*/}

      <div className="flex-center">
        <h1>after optimization</h1>
        {photos.map((photo, idx) => {
          return (
            <Image
              key={idx}
              //sizes="(max-width:415px)50vw, 75vw"
              sizes="(max-width:50px) 2vw, (max-width:415px)50vw, 75vw" //모바일까지 최적화 하기 위해
              width={100}
              height={100}
              className="img-wrapper"
              quality={60}
              src={photo.url}
              alt={photo.url}
              placeholder="blur"
              //blurDataURL={staticBlurUrl()} //정적이미지
              //blurDataURL={placeholders[idx]}
              blurDataURL={photo.blurHash || staticBlurUrl()}
              priority={idx <= 1}
            />
          );
        })}
        {/*
        <Image
          placeholder="blur"
          alt="img2"
          src={Img2}
          //src="/img2.png"
          sizes="(max-width:415px)50vw, 75vw"
          width={100}
          height={100}
          quality={60}
          className="img-wrapper"
          //blurDataURL="Img2"
        />*/}
      </div>
    </div>
  );
};

export default HomePage;
