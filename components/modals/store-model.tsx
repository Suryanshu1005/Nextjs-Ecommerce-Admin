"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { useStoreModal } from "@/hooks/use-store-model";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"

const formSchema = z.object({
    name : (z.string().min(1))
})


export const StoreModal = () => {

    const [loading, setLoading] = useState(false);

    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values)
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Modal 
            title="Create Store" 
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 pb-2 py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                        disabled = {loading} 
                                        placeholder="Name" 
                                        {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end">
                            <Button 
                                disabled = {loading} 
                                variant="outline" 
                                onClick={storeModal.onClose}
                                >
                                    Cancle
                            </Button>
                            <Button 
                                disabled = {loading} 
                                type="submit"
                                >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    );
};