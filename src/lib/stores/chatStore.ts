import { ChatState, ChatStore } from "@/types/stores/chatStore.types";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

export const initChatStore: ChatState = {
    currentConvoId: null,

    prompts: [],

    initialPromptInputText: "",
    initialPromptInputFile: null,
    initialPromptInputFileUrl: "",

    promptInputText: "",
    promptInputFile: null,
    promptInputFileUrl: "",

    wordQueue: [],
};

export const createChatStore = (initialState: ChatState = initChatStore) => {
    return createStore<ChatStore>()(
        devtools(
            immer((set, get) => ({
                ...initialState,

                setCurrentConvoId: (id: number | null) => set((state) => ({ currentConvoId: id })),

                setPrompts: (prompts) => set((state) => ({ prompts })),
                appendPrompt: (prompt) => set((state) => ({ prompts: [...state.prompts, prompt] })),
                clearPrompts: () => set((state) => ({ prompts: [] })),

                setInitialPromptInputText: (text) =>
                    set((state) => ({ initialPromptInputText: text })),
                setInitialPromptInputFile: (file) =>
                    set((state) => ({ initialPromptInputFile: file })),
                setInitialPromptInputFileUrl: (url) =>
                    set((state) => ({ initialPromptInputFileUrl: url })),
                clearInitialPromptInput: () =>
                    set((state) => ({
                        initialPromptInputText: "",
                        initialPromptInputFile: null,
                        initialPromptInputFileUrl: "",
                    })),

                setPromptInputText: (text) => set((state) => ({ promptInputText: text })),
                setPromptInputFile: (file) => set((state) => ({ promptInputFile: file })),
                setPromptInputFileUrl: (url) => set((state) => ({ promptInputFileUrl: url })),

                clearPromptInput: () =>
                    set((state) => ({
                        promptInputText: "",
                        promptInputFile: null,
                        promptInputFileUrl: "",
                    })),

                pushInWordQueue: (word) =>
                    set((state) => ({ wordQueue: [...state.wordQueue, word] })),

                clearWordQueue: () => set((state) => ({ wordQueue: [] })),
            })),
        ),
    );
};
