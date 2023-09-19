import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};
export const useThemeState = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: "theme" }
  )
);

type ChatState = {
  localId: string;
  isOpen: boolean;
  name: null | string;
  toggleChat: (state: boolean) => void;
  initialized: boolean;
  setInitialized: (state: boolean) => void;
  setName: (name: string) => void;
};

export const useChatState = create<ChatState>()(
  persist(
    (set) => ({
      localId: crypto.randomUUID(),
      isOpen: false,
      name: null,
      toggleChat: (toggle) => set((state) => ({ isOpen: toggle })),
      initialized: false,
      setInitialized: (status) => set((state) => ({ initialized: status })),
      setName: (setname) => set((state) => ({ name: setname })),
    }),
    { name: "chat" }
  )
);
