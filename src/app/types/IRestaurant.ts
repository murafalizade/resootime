import IUser from './IUser';

export interface IRestaurant {
    id: number;
    name: string;
    location: string;
    rate: number;
    images: IImage[];
    user_id?: IUser;
    city?: string;
    slug: string;
    type: IType[];
    tag?: ITag[];
}

interface IImage {
    id: number;
    image: string;
}

interface IType {
    id: number;
    type: string;
}

interface ITag {
    id: number;
    name: string;
}
