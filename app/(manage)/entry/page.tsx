"use client";
import React from "react";

import Webcam from "react-webcam";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

async function getData(email: string | undefined) {
  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, inParking: 0 }),
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
  const [data, setData] = useState([]); // for bookings data
  const [isActiveCam, setIsActiveCam] = useState(true);

  const [capturedImage, setCapturedImage] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchLicense, setSearchLicense] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [license, setLicense] = useState(null);

  const webcamRef = useRef(null);

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    await postPhoto(capturedImage);
  };

  const handleManualEntry = async () => {
    try {
      const resEntry = await fetch(
        "https://testsihlogin-chaitanyakanhar2004.b4a.run/entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // email: session?.user?.email,
            vehicle_number: searchLicense,
          }),
        }
      );

      if (resEntry.status === 200) {
        setIsOpen(true);
        toast.success("Gate Opened");
      } else {
        console.log("status error");
        console.log(resEntry);
        // toast.error();
      }
    } catch (error) {
      console.log(error);
    }
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

      if (res.status == 200) {
        const resData = await res.json();
        const myLicense = resData.replace(/\s+/g, "").toUpperCase();

        console.log(myLicense);

        let tt = myLicense;

        if (tt.length === 10) {
          const charMap = {
            "0": "D",
            "8": "B",
            "1": "T",
            "2": "Z",
            "5": "S",
          };

          tt = tt.split("").map((char, index) => {
              if (index === 0 || index === 1 || index === 4 || index === 5) {
                return charMap[char] || char;
              } else {
                // Revert the changes for the rest
                const reverseCharMap = {
                  D: "0",
                  B: "8",
                  T: "1",
                  Z: "2",
                  S: "5",
                };
                return reverseCharMap[char] || char;
              }
            })
            .join("");
        } else if (tt.length === 8 || tt.length === 9 || tt.length === 11) {
          // Handle other cases if needed
        } else {
          tt = "image is not clear";
        }
        // let tt = myLicense;
        // if(tt.length == 10){
        //     if (tt[0]=="0") {
        //         tt[0]='D';
        //     }else if (tt[0]=='8') {
        //         tt[0] = 'B';
        //     }else if (tt[0]=='1') {
        //         tt[0]='T';
        //     }else if (tt[0]=='2') {
        //         tt[0]='Z';
        //     }else if (tt[0]=='5'){
        //         tt[0]='S'
        //     }

        //     if (tt[1]=='0') {
        //         tt[1]='D';
        //     }else if(tt[1]=='8'){
        //         tt[1]='B';
        //     }else if(tt[1]=='1'){
        //         tt[1]='T';
        //     }else if(tt[1]=='2'){
        //         tt[1]='Z';
        //     }else if (tt[1]=='5'){
        //         tt[1]='S'
        //     }

        //     if(tt[2]=='O'){
        //         tt[2]='0';
        //     }else if(tt[2]=='B'){
        //         tt[2]='8';
        //     }else if(tt[2]=='T'){
        //         tt[2]='1';
        //     }else if(tt[2]=='Z'){
        //         tt[2]='2';
        //     }else if(tt[2]=='S'){
        //         tt[2]='5';
        //     }

        //     if(tt[3]=='O'){
        //         tt[3]='0';
        //     }else if(tt[3]=='B'){
        //         tt[3]='8';
        //     }else if(tt[3]=='T'){
        //         tt[3]='1';
        //     }else if(tt[3]=='Z'){
        //         tt[3]='2';
        //     }else if(tt[3]=='S'){
        //         tt[3]='5';
        //     }

        //     if (tt[4]=='0') {
        //         tt[4]='D';
        //     }else if (tt[4]=='8') {
        //         tt[4] = 'B';
        //     }else if (tt[4]=='1') {
        //         tt[4]='T';
        //     }else if (tt[4]=='2') {
        //         tt[4]='Z';
        //     }else if (tt[4]=='5'){
        //         tt[4]='S'
        //     }

        //     if (tt[5]=='0') {
        //         tt[5]='D';
        //     }else if (tt[5]=='8') {
        //         tt[5] = 'B';
        //     }else if (tt[5]=='1') {
        //         tt[5]='T';
        //     }else if (tt[5]=='2') {
        //         tt[5]='Z';
        //     }else if (tt[5]=='5'){
        //         tt[5]='S'
        //     }

        //     if(tt[6]=='O'){
        //         tt[6]='0';
        //     }else if(tt[6]=='B'){
        //         tt[6]='8';
        //     }else if(tt[6]=='T'){
        //         tt[6]='1';
        //     }else if(tt[6]=='Z'){
        //         tt[6]='2';
        //     }else if(tt[6]=='S'){
        //         tt[6]='5';
        //     }

        //     if(tt[7]=='O'){
        //         tt[7]='0';
        //     }else if(tt[7]=='B'){
        //         tt[7]='8';
        //     }else if(tt[7]=='T'){
        //         tt[7]='1';
        //     }else if(tt[7]=='Z'){
        //         tt[7]='2';
        //     }else if(tt[7]=='S'){
        //         tt[7]='5';
        //     }

        //     if(tt[8]=='O'){
        //         tt[8]='0';
        //     }else if(tt[8]=='B'){
        //         tt[8]='8';
        //     }else if(tt[8]=='T'){
        //         tt[8]='1';
        //     }else if(tt[8]=='Z'){
        //         tt[8]='2';
        //     }else if(tt[8]=='S'){
        //         tt[8]='5';
        //     }

        //     if(tt[9]=='O'){
        //         tt[9]='0';
        //     }else if(tt[9]=='B'){
        //         tt[9]='8';
        //     }else if(tt[9]=='T'){
        //         tt[9]='1';
        //     }else if(tt[9]=='Z'){
        //         tt[9]='2';
        //     }else if(tt[9]=='S'){
        //         tt[9]='5';
        //     }
        // }else if(tt.length == 9 || tt.length==11 || tt.length ==12){

        // }else{
        //     tt="image is not clear"
        // }

        console.log(tt);
        setLicense(tt);

        for (let i = 0; i < data.length; i++) {
          if (
            data[i].vehicleNumber.replace(/\s+/g, "").toUpperCase() == myLicense
          ) {
            console.log(data[i].vehicleNumber);
            setIsOpen(true);

            const resEntry = await fetch(
              "https://testsihlogin-chaitanyakanhar2004.b4a.run/entry",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  // parking_id: session?.user?.email,
                  vehicle_number: data[i].vehicleNumber,
                }),
              }
            );
            if (resEntry.status === 200) {
              setIsOpen(true);
              toast.success("Gate Opened");
            } else {
              console.log("status error");
            }
            break;
          } else {
            console.log("No Booking of this vehicle found");
          }
        }
      }
    } catch (error) {
      console.error("Error posting photo to API:", error);
    }
  };

  const handleSearch = (searchInput) => {
    const trimmedInput = searchInput.trim().toLowerCase();

    if (trimmedInput === "") {
      // If search input is empty, reset searchResults
      setSearchResults(data);
    } else {
      // Perform the search in data
      const results = data.filter((parkingDetail) =>
        parkingDetail.vehicleNumber.toLowerCase().includes(trimmedInput)
      );
      setSearchResults(results);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getData(session?.user?.email);
      if (result.bookings.length != 0) {
        setData(result.bookings);
        setSearchResults(result.bookings);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-row">
      <div>
        {isActiveCam && <Webcam ref={webcamRef} />}
        <div className="mt-2">
          <Button
            className="border h-10 text-white font-medium  "
            onClick={() => {
              setIsActiveCam(() => {
                return isActiveCam ? false : true;
              });
            }}
          >
            {isActiveCam ? "Close camera" : "Open camera"}
          </Button>
          <Button
            onClick={() => {
              capturePhoto();
            }}
            className="text-white font-medium"
          >
            Capture Photo
          </Button>
        </div>

        <div className="mt-8">
          <h1 className="font-bold text-3xl m-4">
            Detect vechicle license Plate
          </h1>
          {license ? (
            <h1 className="text-black font-medium text-4xl m-4">{license}</h1>
          ) : (
            <h1 className="text-black m-4">No License Number Detected</h1>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            className="text-white font-medium bg-meta-3 hover:bg-success"
            onClick={() => {
              setIsOpen(!isOpen);
              toast.success(`Gate ${isOpen ? "Closed" : "Opened"}`);
            }}
          >
            {isOpen ? "Close Gate" : "Open Gate"}
          </Button>
          {isOpen ? (
            <h1 className="text-black font-medium bg-meta-3 text-sm border rounded-md p-2 mr-3">
              Gate Opening
            </h1>
          ) : (
            <h1 className="text-black font-medium bg-warning text-sm border rounded-md p-2 mr-3">
              Gate is Closed
            </h1>
          )}
        </div>

        {/* manual entry and search */}

        <div className="flex justify-between items-center">
          <input
            type="text"
            name="license"
            placeholder="Enter License Number"
            value={searchLicense}
            onChange={(e) => {
              setSearchLicense(e.target.value);
              handleSearch(e.target.value);
            }}
            className="w-[1/2] rounded-lg border border-stroke bg-transparent mt-2 py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />

          <Button
            className="text-white font-medium bg-meta-3 hover:bg-success mr-3"
            onClick={() => {
              handleManualEntry();
            }}
            disabled={searchLicense ? false : true}
          >
            Manual Entry
          </Button>
        </div>
      </div>

      <div className="">
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

              {searchResults.length === 0 ? <h1>No data found</h1> : null}

              {searchResults.length > 0 &&
                searchResults.map((parkingDetail, key) => (
                  <div
                    className={`grid grid-cols-3 sm:grid-cols-3${
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
  );
}

export default VehicleEntry;
