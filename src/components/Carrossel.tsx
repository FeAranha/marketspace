import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "native-base";
import { api } from "@services/api";

type Props = {
  productImgs: any[];
  
}

export function Carrossel({productImgs}: Props) {
  const width = Dimensions.get("window").width;

  return (
    <Carousel
      loop
      width={width}
      height={320}
      autoPlay={productImgs.length > 1}
      data={productImgs}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <Image
          w="full"
          h={80}
          source={{
            uri: item.uri
              ? item.uri
              : `${api.defaults.baseURL}/images/${item.path}`,
          }}
          alt="Ad Image"
          resizeMode="cover"
          borderColor="gray.400"
          borderWidth={1}
        />
      )}
    />
  );
}
