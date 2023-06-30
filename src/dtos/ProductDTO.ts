import { ImageDTO } from "./ImageDTO";
import { PaymentMethodDTO } from "./PaymentMethodDTO";
import { UserDTO } from "./UserDTO";

export type ProductDTO = {
  id: string;
  user_id?: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: ImageDTO[];
  is_active: boolean;
  payment_methods: PaymentMethodDTO[];
  user: UserDTO
}