

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

export interface Notification {
    title: string;
    message: string;
    date?: string;
};

export interface Posting {
    title: string;
    date_created: string;

    user_uid: string;
    
    stat: {
        views: number;
        messaged: number;
    }
};

export interface JobPostBody {
    job_title: string;
    job_description: string;

    rate: {
        from: number;
        to: number;
        frequency: string;
    }
}