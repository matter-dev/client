import create from "zustand";

export const useStore = create<{
  user: any;
  setUser: (user: any) => void;
  project: any;
  setProject: (project: any) => void;
}>((set) => ({
  user: null,
  setUser: (user: any) => set(() => ({ user })),
  project: null,
  setProject: (project: any) => set(() => ({ project })),
}));
