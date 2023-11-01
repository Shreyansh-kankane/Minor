"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";

type FormValues = {
  parkingName: string;
  state: string;
  street: string;
  city: string;
};

const formSchema = z.object({
  parkingName: z.string().min(1, {
    message: "Parking name is required."
  }),
  state: z.string().min(1, {
    message: "State is required."
  }),
  street: z.string().min(1, {
    message: "Street is required."
  }),
  city: z.string().min(1, {
    message: "City is required."
  })
});



export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  const {data:session} = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parkingName: "",
      state:"",
      street:"",
      city:""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res  = await fetch('/api/createParking',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: session?.user?.email,
          parkingName: values.parkingName,
          state: values.state,
          street: values.street,
          city: values.city
        })
      })
      if(res.ok){
        throw new Error("server error");
      }

      const newParking = await res.json();

      form.reset();
      router.push('/bookings')
    } catch (error) {
      console.log(error);
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add your Parking
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your parking name. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="parkingName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Parking name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className=" border focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter parking name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="flex flex-row justify-between gap-1">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                      >
                        street
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className=" border focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                          placeholder="enter street"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                        >
                          city
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className=" border focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="enter city"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                          >
                            state
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className=" border focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                              placeholder="enter state"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                  />

            </div>

            </div>
            <DialogFooter className="bg-slate-200 px-6 py-4 text-white">
              <Button onClick={onSubmit} disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}