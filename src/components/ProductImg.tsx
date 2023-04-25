import { IImageProps, Image } from "native-base";

type Props = IImageProps & {
  size: number;
};

export function ProductImg({ size, ...rest }: Props) {
    return (
        <Image
        w={size}
        h={size}
        borderRadius={6}
        {...rest}
        />
    )
}