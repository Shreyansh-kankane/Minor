"use client"
import { useState,useEffect } from "react";
import {EditDetailsModal} from "@/components/modals/edit-details";


export const ModalProvider = () =>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
        <>
            <EditDetailsModal />
        </>
    )
    

}