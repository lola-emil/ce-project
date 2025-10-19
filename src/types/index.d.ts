

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}


export interface MenuListItem {
    path?: string;
    label: string;
    
    children?: MenuListItem[];
}