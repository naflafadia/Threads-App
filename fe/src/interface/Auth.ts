export interface IUserRegister {
    userName: string;
    fullName: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUser {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    profil_picture?: string;
    profil_description?: string;
    followers_count: number;
    following_count: number;
}