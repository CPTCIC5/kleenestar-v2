import { createStore } from "zustand/vanilla";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { UiState, UiStore } from "@/types/stores/uiStore.types";

export const initUiStore: UiState = {
    isChatSidebarOpen: false,
    settingsCurrentTab: "Profile",
    chatSidebarType: "sheet",
};

export const createUiStore = (initialState: UiState = initUiStore) => {
    return createStore<UiStore>()(
        persist(
            devtools(
                immer((set, get) => ({
                    ...initialState,
                    setIsChatSidebarOpen: (open: boolean) =>
                        set((state) => {
                            state.isChatSidebarOpen = open;
                        }),
                    setChatSidebarType: (type: "sidebar" | "sheet") =>
                        set((state) => {
                            state.chatSidebarType = type;
                        }),
                    setSettingsCurrentTab: (
                        tab: "Profile" | "Workspace" | "Notification" | "Security",
                    ) =>
                        set((state) => {
                            state.settingsCurrentTab = tab;
                        }),
                })),
            ),
            { name: "ui" }, // persist config
        ),
    );
};
