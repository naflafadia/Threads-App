export type IThreadCard = {
    id: number;
    profil_picture?: string;
    fullName?: string;
    userName?: string;
    postedAt: string;
    content?: string;
    image?: string;
    likesCount?: number | undefined;
    replyCount?: number;
    user?: IUser;
    is_liked: boolean;
}

export type IUser = {
    userName?: string;
    fullName?: string;
    profil_picture?: string;
}

export type IThreadPost = {
    content: string;
    image: string | File | undefined;
}