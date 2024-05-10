interface User {
    first_name: string;
    last_name: string;
    id?: number; // id can be undefined
    email?: string;
    is_active?: boolean;
    profile?: Profile;
}

interface Profile {
    id: number;
    user: number;
    avatar: string;
    country: string;
    phone_number: string;
    referral_code: string;
    total_referrals: number;
}

interface UserStoreState {
    user: User | null;
    setUser: (user: User) => void;
}

export type { User, Profile, UserStoreState };
