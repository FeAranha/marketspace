import { PaymentMethodDTO } from '@dtos/PaymentMethodDTO';
import { api } from '@services/api';
import { IPaymentMethods } from 'src/interfaces/IPaymentMethods';
import { IPhoto } from 'src/interfaces/IPhoto';

class PaymentMethodsMap {
  static toIPaymentMethods({ key, name }: PaymentMethodDTO): IPaymentMethods {
    return key as IPaymentMethods;
  }
}

export { PaymentMethodsMap };