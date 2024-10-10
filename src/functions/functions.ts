import type { ImageData } from "./interface";
import { DocumentData } from "firebase/firestore";

function onTop(param: any) {
  window.scrollTo({
    top: 0,
    behavior: param,
  });
}

const createGalleries = (
  images: Array<ImageData>,
  columns: number
): Array<Array<ImageData>> => {
  const galleries: Array<Array<ImageData>> = Array.from(
    { length: columns },
    () => []
  );
  images.forEach((image: ImageData, index: number) => {
    galleries[index % columns].push(image);
  });
  return galleries;
};

const convertToImageData = (docData: DocumentData): ImageData => {
  return {
    name: docData.name || "",
    largeURL: docData.images[0] || "",
    thumbnailURL: docData.images[0] || "",
    widthOrigin: docData.widthOrigin || null,
    heightOrigin: docData.heightOrigin || null,
    description: docData.description || null,
    client: docData.client || null,
    year: docData.year || null,
    type: docData.type || null,
    size: docData.size || null,
  };
};

export { onTop, createGalleries, convertToImageData };
