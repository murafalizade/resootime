export interface ITable {
    id?: number;
    name: string;
    xcod: number;
    ycod: number;
    type: string;
    size?: number;
    is_full?: boolean;
    count?: number;
    rotate?: number;
}
