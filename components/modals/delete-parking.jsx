
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



export const DeleteParkingModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = () =>{
      console.log('delete parking')

      
    }

    const isModalOpen = isOpen && type === 'deleteparking';

    return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Parking
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            will be permanently deleted.
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
              className="flex w-auto justify-center rounded bg-danger hover:bg-meta-7 hover:bg-gradient-to-r p-3 font-medium text-gray"
              onClick={onClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    )
}