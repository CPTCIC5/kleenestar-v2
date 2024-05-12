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

interface Convo {
    id: number;
    assitant_id: string;
    workspace: object;
    title: string;
    created_at: string;
    archived: boolean;
}

interface InputPrompt {
    id: number;
    convo_id: number;
    author: string;
    text_query: string;
    file_query: string;
    response_text: string;
    response_image: string;
    created_at: string;
}

interface ChatStoreState {
    convos: Convo[];
    inputPrompts: InputPrompt[];
    addConvos: (newConvos: Convo[]) => void;
    deleteConvo: (id: number) => void;
    renameConvo: (id: number, newName: string) => void;
    archiveConvo: (id: number) => void;
    unarchiveConvo: (id: number) => void;
    updateInputPrompts: (newInputPrompts: InputPrompt[]) => void;
    setInputPrompts: (newInputPrompts: InputPrompt[]) => void;
}

export type { User, Profile, UserStoreState, Convo, InputPrompt, ChatStoreState };
