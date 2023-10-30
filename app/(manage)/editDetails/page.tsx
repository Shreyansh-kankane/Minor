
function editDetails() {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Set Base Info About Your Parking Slots
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  2 wheeler Slots
                </label>
                <input
                  type="text"
                  placeholder="Enter No. of 2 wheeler slots"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  4 wheeler Slots
                </label>
                <input
                  type="text"
                  placeholder="Enter No. of 4 wheeler slots"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  8 or more wheeler Slots
                </label>
                <input
                  type="text"
                  placeholder="Enter No. of 8 or more wheeler slots"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  2 wheeler Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Price of 2 wheeler slots"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  4 wheeler Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Price of 4 wheeler Price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  8 or more wheeler Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Price of 8 or more wheeler"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <button className="flex w-auto justify-center rounded bg-primary p-3 font-medium text-gray">
              Submit 
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Set Other Info
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Set Threshold 
                </label>
                <input
                  type="text"
                  placeholder="Enter Threshold value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                    Increament Percent
                </label>
                <input
                  type="text"
                  placeholder="Enter Increment Value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <button className="flex w-auto justify-center rounded bg-primary p-3 font-medium text-gray">
              Submit
            </button>
          </div>
        </form>
      </div>

    </>
  );
};

export default editDetails;
