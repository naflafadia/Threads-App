export type IThreadCard = {
    id: number;
    profil_picture?: string;
    fullName?: string;
    userName?: string;
    created_at: string;
    content?: string;
    image?: string;
    likesCount?: number;
    replyCount?: number;
    user?: IUser;
}

export type IUser = {
    userName?: string;
    fullName?: string;
    profil_picture?: string;
}