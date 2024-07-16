interface User {
    first_name: string;
    last_name: string;
    id?: number;
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
    thread_id: string;
    workspace: object;
    title: string;
    created_at: string;
    archived: boolean;
}

interface Prompt {
    id: number;
    convo: {
        id: number;
        title: string;
        archived: boolean;
    };
    author: string;
    text_query: string;
    file_query: string | null;
    response_text: string;
    response_image: string;
    created_at: string;
}

interface KnowledgeDataTypes {
    title: string;
    createdAt: string;
    type: string;
    id: number;
}

interface CountryProps {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: string;
    subregion: string;
    subregion_id: string;
    nationality: string;
    timezones: Timezone[];
    translations: Record<string, string>;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
}

interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

interface StateProps {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    state_code: string;
    type: string | null;
    latitude: string;
    longitude: string;
}

export type {
    User,
    Profile,
    UserStoreState,
    Convo,
    Prompt,
    KnowledgeDataTypes,
    CountryProps,
    Timezone,
    StateProps,
};
