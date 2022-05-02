import create from "zustand";

export const useStore = create<{
  user: any;
  setUser: (user: any) => void;
}>((set) => ({
  user: null,
  setUser: (user: any) => set(() => ({ user })),
}));
