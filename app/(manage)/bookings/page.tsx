'use client'
import { VECHICLES } from "@/types/Vechicles";
import { PEOPLES } from "@/types/peoples";
import { Heading1 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";

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
        vechicle_no: "HR08DA9761",
        slot_book_no: 21,
        Booking_Time:"13.11",
        end_Time: "15.16",
    },
    {
        Person_name: "Gopal",
        vechicle_no: "UP01XY1231",
        slot_book_no: 13,
        Booking_Time:"14.12",
        end_Time: "16.17",
    },
    {
        Person_name: "Chaitanya",
        vechicle_no: "CH98AX1961",
        slot_book_no: 14,
        Booking_Time:"16.09",
        end_Time: "18.19",
    },
    {
        Person_name: "Mansi",
        vechicle_no: "MP08WA0822",
        slot_book_no: 18,
        Booking_Time:"17.11",
        end_Time: "18.12",
    },
    {
      Person_name: "Hriday",
      vechicle_no: "OD12SE1211",
      slot_book_no: 16,
      Booking_Time:"19:11",
      end_Time: "21.14",
  }
];


async function getData(email: string | undefined) {
  try {
    const res = await fetch("/api/bookings",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email}),
    });
    if (res.status === 200) {
      return await res.json();
    }
    return [];
  } catch (error) {
    console.log("error",error);
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
      setData(result);
      // setfilterData(result);
    }
    fetchData();
  },[]);
  

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <div className="grid rounded-sm bg-gray-2 dark:bg-meta-4 grid-cols-4">

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
                  Booked Time
                </h5>
              </div>
              <div className="p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-[10px] font-medium uppercase xsm:text-base">
                  End time
                </h5>
              </div>
            </div>

            {data.length === 0 ? <h1>No data found</h1> : null }

            {data.length >0 && data.map((parkingDetail, key) => (
                <div
                    className={`grid grid-cols-3 sm:grid-cols-6 ${
                    key === data.length - 1
                        ? ""
                        : "border-b border-stroke dark:border-strokedark"
                    }`}
                    key={key}
                >

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">{parkingDetail.vechicleNumber}</p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">{parkingDetail.bookedSlotNumber}</p>
                    </div>

                    <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-meta-3">{parkingDetail.bookingTime}</p>
                    </div>

                    <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                    <p className="text-black dark:text-white">{parkingDetail.endTime}</p>
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

