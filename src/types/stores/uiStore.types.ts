export type UiState = {
    isChatSidebarOpen: boolean;
    chatSidebarType: "sidebar" | "sheet";
    settingsCurrentTab: "Profile" | "Workspace" | "Notification" | "Security";
};

export type UiActions = {
    setIsChatSidebarOpen: (open: boolean) => void;
    setChatSidebarType: (type: "sidebar" | "sheet") => void;
    setSettingsCurrentTab: (tab: "Profile" | "Workspace" | "Notification" | "Security") => void;
};

export type UiStore = UiState & UiActions;
