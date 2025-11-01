

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

export interface ProfileDetails {
    firstname: string;
    lastname: string;

    email: string;
    phone: string;

    userType: "client" | "worker" | "";

    bio: string;


    // address
    province: string;
    city: string;
    postal_code: string;
    tax_id: string;
}