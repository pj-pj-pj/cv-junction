// store.ts
import { create } from "zustand";
import { State, CV, User } from "@/types/types"; // Importing the types

// Zustand store with typed state and actions
export const useStore = create<State>((set) => ({
  user: {
    user_id: 1,
    username: "Juan Ewan",
    email: "juan.ewan@gmail.com",
    password: "1234",
  },
  cvList: [],
  selectedCV: null,
  isAuthenticated: true,

  setUser: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),

  setCVList: (cvs: CV[]) => set({ cvList: cvs }),
  addCV: (cv: CV) => set((state) => ({ cvList: [...state.cvList, cv] })),
  setSelectedCV: (cv: CV) => set({ selectedCV: cv }),
  updateCV: (updatedCV: CV) =>
    set((state) => ({
      cvList: state.cvList.map((cv) =>
        cv.cv_id === updatedCV.cv_id ? updatedCV : cv
      ),
    })),
  deleteCV: (cv_id: number) =>
    set((state) => ({
      cvList: state.cvList.filter((cv) => cv.cv_id !== cv_id),
    })),
}));
