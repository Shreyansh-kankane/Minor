"use client";
import { VECHICLES } from "@/types/Vechicles";
import { PEOPLES } from "@/types/peoples";
import { Heading1 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";

const VechicleData: VECHICLES[] = [
  {
    _id: "osjfosfjr",
    vehicle_number: "string",
    vehicle_type: 1,
    start_time: "string",
    end_time: "string",
    slot_number: 1,
  },
  {
    _id: "osjfosfjr",
    vehicle_number: "string",
    vehicle_type: 1,
    start_time: "string",
    end_time: "string",
    slot_number: 1,
  },
  {
    _id: "osjfosfjr",
    vehicle_number: "string",
    vehicle_type: 1,
    start_time: "string",
    end_time: "string",
    slot_number: 1,
  },
  {
    _id: "osjfosfjr",
    vehicle_number: "string",
    vehicle_type: 1,
    start_time: "string",
    end_time: "string",
    slot_number: 1,
  },
];

const dummydata = [
  {
    Person_name: "Shreyansh",
    vechicleNumber: "HR08DA9761",
    bookedSlotNumber: 21,
    bookingTime: "13.11",
    endTime: "15.16",
  },
  {
    Person_name: "Gopal",
    vechicleNumber: "UP01XY1231",
    bookedSlotNumber: 13,
    bookingTime: "14.12",
    endTime: "16.17",
  },
  {
    Person_name: "Chaitanya",
    vechicleNumber: "CH98AX1961",
    bookedSlotNumber: 14,
    bookingTime: "16.09",
    endTime: "18.19",
  },
  {
    Person_name: "Mansi",
    vechicleNumber: "MP08WA0822",
    bookedSlotNumber: 18,
    bookingTime: "17.11",
    endTime: "18.12",
  },
  {
    Person_name: "Hriday",
    vechicleNumber: "OD12SE1211",
    bookedSlotNumber: 16,
    bookingTime: "19:11",
    endTime: "21.14",
  },
];

async function getData(email: string | undefined) {
  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email,inParking:0 }),
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

const Bookings = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);

  if (status === "unauthenticated") {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getData(session?.user?.email);
      console.log(result.bookings)
      if(result.bookings.length != 0){
        setData(result.bookings);
      }
    }
    fetchData();
  },[]);

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <div className="grid rounded-sm bg-gray-2 dark:bg-meta-4 grid-cols-5">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  Vech. ID
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  Vehicle Type
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  Slot book
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  Booked Time
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
                  className={`grid grid-cols-5 sm:grid-cols-5 ${
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
                      {parkingDetail.vehicleType}
                    </p>
                  </div>


                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {parkingDetail.bookedSlotNumber}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-meta-3">{parkingDetail.bookingTime}</p>
                  </div>

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
    </>
  );
};

export default Bookings;

// Convert the base64 string to a Blob
// const base64ToBlob = (base64:any) => {
//   const byteCharacters = atob(base64.split(",")[1]);
//   const byteNumbers = new Array(byteCharacters.length);
//   for (let i = 0; i < byteCharacters.length; i++) {
//     byteNumbers[i] = byteCharacters.charCodeAt(i);
//   }
//   return new Blob([new Uint8Array(byteNumbers)], { type: "image/png" });
// };
// const blob = base64ToBlob(capturedImage);
// console.log("blob "  + blob )
