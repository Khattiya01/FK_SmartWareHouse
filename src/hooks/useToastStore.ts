import { create } from "zustand";

export enum typeStatusTaost {
  "success",
  "error",
}
interface ToastState {
  open: boolean;
  message: string;
  title: string;
  eventDate: Date;
  status: typeStatusTaost;
  show: (
    title: string,
    message: string,
    eventDate: Date,
    status: typeStatusTaost
  ) => void;
  hide: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: "",
  title: "",
  eventDate: new Date(),
  status: typeStatusTaost.success,
  show: (
    title: string,
    message: string,
    eventDate: Date,
    status: typeStatusTaost
  ) => set({ open: true, title, message, eventDate, status }),
  hide: () => set({ open: false }),
}));

export default useToastStore;
