export type ChatState = {
    currentConvoId: number | null;

    prompts: Prompt[];

    initialPromptInputText: string;
    initialPromptInputFile: File | null;
    initialPromptInputFileUrl: string;

    promptInputText: string;
    promptInputFile: File | null;
    promptInputFileUrl: string;

    wordQueue: string[];
};

export type ChatActions = {
    setCurrentConvoId: (id: number | null) => void;

    setPrompts: (prompts: Prompt[]) => void;
    appendPrompt: (prompt: Prompt) => void;
    clearPrompts: () => void;

    setInitialPromptInputText: (text: string) => void;
    setInitialPromptInputFile: (file: File | null) => void;
    setInitialPromptInputFileUrl: (url: string) => void;
    clearInitialPromptInput: () => void;

    setPromptInputText: (text: string) => void;
    setPromptInputFile: (file: File | null) => void;
    setPromptInputFileUrl: (url: string) => void;
    clearPromptInput: () => void;

    pushInWordQueue: (word: string) => void;
    clearWordQueue: () => void;
};

export type ChatStore = ChatState & ChatActions;
