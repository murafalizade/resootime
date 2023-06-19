export interface TableProps {
    className?: string;
    isFull?: boolean;
    name: string;
    userName?: string;
    color?: string;
    deg?: number;
    date?: string;
    changeName: (e: any) => void;
    isEdit?: boolean;
}
