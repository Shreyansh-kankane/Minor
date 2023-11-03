import React, { useState } from 'react';
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  carSlots: z.string().min(0).optional(),
  bikeSlots: z.string().min(0).optional(),
  truckSlots: z.string().min(0).optional(),
  carPrice: z.string().min(0).optional(),
  bikePrice: z.string().min(0).optional(),
  truckPrice: z.string().min(0).optional(),
});

export const EditDetailsModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);

  const {data:session} = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carSlots: "",
      bikeSlots:"",
      truckSlots:"",
      carPrice:"",
      bikePrice:"",
      truckPrice:""
    }
    
  });

  const onSubmit =async (values: z.infer<typeof formSchema>)=> {
    console.log(values);
    if(values.carSlots === "" && values.bikeSlots === "" && values.truckSlots === "" && values.carPrice === "" && values.bikePrice === "" && values.truckPrice === ""){
      toast.error('Please enter atleast one value');
      return;
    }

    try{
      toast.loading('Updating...')
      const res = await fetch('/api/editDetails',{
        method: 'POST',
        body: JSON.stringify({
          email: session?.user?.email,
          car: {
            slots: values.carSlots,
            price: values.carPrice
          },
          bike: {
            slots: values.bikeSlots,
            price: values.bikePrice
          },
          truck: {
            slots: values.truckSlots,
            price: values.truckPrice
          }
        })
      })
      if(res.ok){
        toast.dismiss()
        toast.success('Updated Successfully');
      }
      else{
        toast.dismiss()
        toast.error('Something went wrong');
      }
      onClose();
      if(pathname === '/parkingDetails'){
        //refresh the page
        location.reload();
      }
    }
    catch(error){
      console.log(error);
    }
  };

  const isModalOpen = isOpen && type === 'editDetails';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-auto">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Edit Parking Details</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className='w-full xl:w-1/2'>
                    <FormField
                      control={form.control}
                      name='carSlots'
                      render={({field}) => (
                        <FormItem
                        >
                          <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                            Car slots
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              disabled={isLoading}
                              className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active:border-primary'
                              placeholder='enter car slots'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <FormField
                        control={form.control}
                        name='bikeSlots'
                        render={({field}) => (
                          <FormItem
                          >
                            <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                              bike slots
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                disabled={isLoading}
                                className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active:border-primary'
                                placeholder='enter bike slots'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>

                  <div className="w-full xl:w-1/2">
                  <FormField
                      control={form.control}
                      name='truckSlots'
                      render={({field}) => (
                        <FormItem
                        >
                          <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                            truck slots
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              disabled={isLoading}
                              className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active:border-primary'
                              placeholder='enter truck slots'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className='w-full xl:w-1/2'>
                    <FormField
                      control={form.control}
                      name='carPrice'
                      render={({field}) => (
                        <FormItem
                        >
                          <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                            Car price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              disabled={isLoading}
                              className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active:border-primary'
                              placeholder='enter car price'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <FormField
                        control={form.control}
                        name='bikePrice'
                        render={({field}) => (
                          <FormItem
                          >
                            <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                              bike price
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                disabled={isLoading}
                                className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active:border-primary'
                                placeholder='enter bike price'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </div>

                  <div className="w-full xl:w-1/2">
                  <FormField
                      control={form.control}
                      name='truckPrice'
                      render={({field}) => (
                        <FormItem
                        >
                          <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                            truck price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              disabled={isLoading}
                              className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active:border-primary'
                              placeholder='enter truck price'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-auto justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Submit
                </Button>
              </div>

            </form>
          </Form>
        </ScrollArea>

      </DialogContent>
    </Dialog>
  );
};


export default EditDetailsModal;



