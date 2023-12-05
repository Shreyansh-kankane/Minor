'use client';
import React from 'react'

import Webcam from "react-webcam";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';

async function getData(email: string | undefined) {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return [];
    } catch (error) {
      console.log("error", error);
    }
}


function VehicleEntry() {

  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [isActiveCam, setIsActiveCam] = useState(true);

  const [capturedImage, setCapturedImage] = useState(null);
  const [filterData, setfilterData] = useState([]);

  const [license, setLicense] = useState(null);

  const webcamRef = useRef(null);


  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    await postPhoto(capturedImage);
  };

  const postPhoto = async (photo) => {
    try {
      const payload = {
        image: capturedImage,
        email: session?.user?.email,
      };

      console.log(payload);

      const res = await fetch("http://localhost:8080/license/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: photo,
        }),
      });

      if(res.status == 200 ){
        const data = await res.json();
        setLicense(data.license);
      }
      
    } catch (error) {
      console.error("Error posting photo to API:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getData(session?.user?.email);
      console.log(result.bookings)
      setData(result.bookings);
      // setfilterData(result);
    }
    fetchData();
  },[]);

  return (
    <div className='flex flex-row' >
        <div >
            {isActiveCam && <Webcam ref={webcamRef} />}
            <Button
                className='border h-10 text-white font-medium  '
                onClick={() => {
                setIsActiveCam(()=>{ return isActiveCam ? false : true });
                }}
            >
                {isActiveCam ? "Close camera" : "Open camera"}
            </Button>
            <Button onClick={()=>{capturePhoto()}}
                className='text-white font-medium'
            >
                Capture Photo
            </Button>
            
            <div className='mt-8'>
                <h1 className='font-bold text-3xl m-4'>Detect vechicle license Plate</h1>
                {license ? <h1 className='text-black font-medium text-4xl m-4' >{license}</h1>
                : ( <h1 className='text-black m-4'>No License Number Detected</h1> )
                }
                
            </div>

        </div>

        <div className=''>
        <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <div className="grid rounded-sm bg-gray-2 dark:bg-meta-4 grid-cols-3">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  Vech. ID
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  Slot book
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  End time
                </h5>
              </div>
            </div>

            {data.length === 0 ? <h1>No data found</h1> : null}

            {data.length > 0 &&
              data.map((parkingDetail, key) => (
                <div
                  className={`grid grid-cols-4 sm:grid-cols-3${
                    key === data.length - 1
                      ? ""
                      : "border-b border-stroke dark:border-strokedark"
                  }`}
                  key={key}
                >
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {parkingDetail.vehicleNumber}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {parkingDetail.bookedSlotNumber}
                    </p>
                  </div>

                  {/* <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-meta-3">{parkingDetail.bookingTime}</p>
                  </div> */}

                  <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">
                      {parkingDetail.endTime}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

        </div>

    </div>
  )
}

export default  VehicleEntry