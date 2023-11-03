"use client"
import { useState,useEffect } from "react";
import {DeleteParkingModal} from "@/components/modals/delete-parking";
import {EditDetailsModal} from "@/components/modals/edit-details"
import { SetOffline } from "@/components/modals/set-offline";


export const ModalProvider = () =>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
        <>
            <DeleteParkingModal/>
            <EditDetailsModal />
            <SetOffline />
        </>
    )
    

}