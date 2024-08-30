"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type UiStore } from "@/types/stores/uiStore.types";
import { createUiStore } from "@/lib/stores/uiStore";

export type UiStoreApi = ReturnType<typeof createUiStore>;

export const UiStoreContext = createContext<UiStoreApi | undefined>(undefined);

export interface UiStoreProviderProps {
    children: ReactNode;
}

export const UiStoreProvider = ({ children }: UiStoreProviderProps) => {
    const storeRef = useRef<UiStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createUiStore();
    }

    return <UiStoreContext.Provider value={storeRef.current}>{children}</UiStoreContext.Provider>;
};

export const useUiStore = <T,>(selector: (store: UiStore) => T): T => {
    const uiStoreContext = useContext(UiStoreContext);

    if (!uiStoreContext) {
        throw new Error(`useUiStore must be used within UiStoreProvider`);
    }

    return useStore(uiStoreContext, selector);
};
