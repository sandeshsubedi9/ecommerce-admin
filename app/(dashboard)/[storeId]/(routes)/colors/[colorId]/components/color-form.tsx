"use client"

import { z } from "zod"

import { Color } from "@prisma/client"
import { Trash } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/modals/alert-modal"

interface ColorFormProps {
    initialData: Color | null
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1).regex(/^#/, { message: "String must be a valid hex code" }),
})

type ColorFormValues = z.infer<typeof formSchema>

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const parmas = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? "Edit a color" : "Add a new color"
    const toastMessage = initialData ? "Color updated" : "Color created"
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    })

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true)

            if (initialData) {
                await axios.patch(`/api/${parmas.storeId}/colors/${parmas.colorId}`, data)
            }
            else {
                await axios.post(`/api/${parmas.storeId}/colors`, data)
            }

            router.refresh()
            router.push(`/${parmas.storeId}/colors`)
            toast.success(toastMessage)
        }
        catch {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${parmas.storeId}/colors/${parmas.colorId}`)
            router.refresh()
            router.push(`/${parmas.storeId}/colors`)
            toast.success("Color deleted")
        }
        catch {
            toast.error("Make sure you removed all products using this color first")
        }
        finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    className="space-y-8 w-full"
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid sm:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Color name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={loading}
                                                placeholder="Color value"
                                                {...field}
                                            />

                                            {/* Color picker */}
                                            <input
                                                type="color"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                className=" cursor-pointer rounded-sm"
                                            />

                                            {/* 
                                            <div className="border p-4 rounded-full"
                                                style={{ backgroundColor: field.value }}
                                            /> */}

                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}