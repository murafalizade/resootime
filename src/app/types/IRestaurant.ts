import IUser from './IUser';

export interface IRestaurant {
    id: number;
    name: string;
    location: string;
    rate: number;
    images: IImage[];
    category?: ICategory;
    user_id?: IUser;
    city?: string;
    slug:string;
}

interface IImage {
    id: number;
    image: string;
}

interface ICategory {
    id: number;
    name: string;
}
