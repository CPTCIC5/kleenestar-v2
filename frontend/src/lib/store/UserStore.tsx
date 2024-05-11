import { User, Profile, UserStoreState } from "../types/interfaces";
import { create } from "zustand";

const useUserStore = create<UserStoreState>()((set) => ({
    user: null,

    setUser: (user: User) => {
        set(() => ({ user }));
    },
}));

export default useUserStore;
