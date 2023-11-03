
import {useModal} from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
// import useOnlineMode from "@/hooks/useOnlineMode";
import toast from "react-hot-toast";


export const SetOffline = () => {
    const { isOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    // const [isOnline,setIsOnline] = useOnlineMode();
    const {isOnline,setIsOnline} = data;

    const handleSubmit = () =>{
        if (typeof setIsOnline === 'function') {
            setIsOnline(!isOnline);
            toast.error('You are offline now');
            // console.log(isOnline);
            onClose();
            return;
        }
    }

    const isModalOpen = isOpen && type === 'set-offline';

    return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Do you want to set offline?
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            user will not be able to book parking
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              className="flex w-auto justify-center rounded bg-bodydark2 p-3 font-medium text-gray"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="flex w-auto justify-center rounded bg-danger p-3 font-medium text-gray"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    )
}

