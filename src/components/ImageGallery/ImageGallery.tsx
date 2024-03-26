/**
 * @author Gregory Vincent Jr
 * Image Gallery showing the different units
 */

import { useState, useEffect} from "react";
import { URLObject } from "../../types/URLObject";
import { useQuery } from "@tanstack/react-query";
import { awsEndPoint } from "../../endpoints";
// awsEndPoint
const ImageGallery = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const formatImageNames = (urls: URLObject[]): URLObject[] => {
    const separators = /[._]|jpg/g; 
      const formattedImgNames: URLObject[] = urls.map((url) => {
        url.key = url.key?.split(separators).join(" ")
        return url;
      })

      return formattedImgNames;
  }

  const getImages = async (): Promise<URLObject[]> => {
    const imgURLs = (await fetch(awsEndPoint)).json()
    return formatImageNames(await imgURLs)
  }

  const { data:imageURLs, isLoading, isError } = useQuery(
    {queryKey: ["imageURLs"], 
    queryFn: getImages,
    staleTime: 60000,
    gcTime: Infinity,
    });

  function switchImage() {
    if(imageURLs) setImageIndex(imageIndex === imageURLs.length - 1 ? 0 : imageIndex + 1)
  }

  const interval = 4000;
  useEffect(() => {
    //automatically scroll to the next picture
    const picInterval = setInterval(switchImage, interval);
    //after each new picture is shown, reset the timer.
    return () => clearInterval(picInterval);
  });  

  if (isLoading){
   return (
      <div className="flex justify-center italic text-white animate-pulse">
        Currently Loading...
      </div>
    )
  }
  if (isError){
    return (
    <div className="flex justify-center text-center text-red-400 italic">
      Error loading images. <br></br>
      Try reloading the page and clearing your cache.
    </div>
    )
  } 

  if (imageURLs){
    const currentImage = (imageURLs[imageIndex] && imageURLs[imageIndex].url) ?? "";
    const currentKey = (imageURLs[imageIndex] && imageURLs[imageIndex].key) ?? "";
    return imageURLs.length >= 1 && (
      <div className="flex flex-col w-screen h-full justify-start text-center">
        <img className="w-full h-64 sm:h-96 xl:h-96 2xl:h-screen 2xl:pb-8 sm:h-72 2xl:px-0 md:h-96 md:px-0 2xl:h-96" src={currentImage} alt={currentKey} />
        <p className="text-white italic text-2xl sm:text-3xl m-2 md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl 2xl:-mt-32 3xl:-mt-40">{currentKey}</p>
      </div>
    )
  }
};
export default ImageGallery;