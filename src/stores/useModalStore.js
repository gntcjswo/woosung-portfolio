import { create } from 'zustand';

export const useModalStore = create((set) => ({
  selectedProject: null,
  isOpen: false,

  openModal: (project) => set({ selectedProject: project, isOpen: true }),
  closeModal: () => set({ isOpen: false, selectedProject: null }),
}));
