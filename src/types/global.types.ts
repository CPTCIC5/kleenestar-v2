interface Client {
    id: number;
    name: string;
}

interface Convo {
    id: number;
    thread_id: string;
    workspace: object;
    title: string;
    created_at: string;
    archived: boolean;
}

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile: {
        avatar: string;
    };
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

// Blocknotes

interface Blocknote {
    id: number;
    image: string;
    created_at: string;
    title: string;
}

type NoteColorType = "default" | "red" | "emerald" | "sky" | "indigo";

interface Note {
    id: number;
    note_text: string;
    color: NoteColorType;
    prompt: {
        convo: {
            id: number;
            title: string;
        };
        response_text: string;
    };
    created_at: string;
}
