import { create } from "zustand";

export type ModalType = "CreateParking" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage" | "editDetails"|'set-offline';

interface ModalData {
  parking_id?: string;
  parkingName?: string;
  isOnline?: boolean;
  totalSlots?: Number;
  location?: string;
  setIsOnline?: (isOnline: boolean) => void;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
