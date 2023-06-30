import { ImageDTO } from '@dtos/ImageDTO';
import { api } from '@services/api';
import { IPhoto } from 'src/interfaces/IPhoto';

class PhotoMap {
  static toIPhoto({ id, path }: ImageDTO): IPhoto {
    return {
      name: id,
      uri: `${api.defaults.baseURL}/images/${path}`,
      type: 'image',
    };
  }
}

export { PhotoMap };