"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomInput from '../Input'
import { FormFieldTypes, passwordRegex } from '@/lib/utils'
import { registerUser } from '@/appwrite/user.actions'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8, {
        message: "You must enter atleast 8 characters"
    }).max(16, {
        message: "Password must not exceed 16 characters"
    }).regex(passwordRegex, {
        message: "Password must contain a string, number and special characters"
    })
})

const Register = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const user = await registerUser(values)
            if (user) router.push(`/${user.documents[0].$id}/home`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section>
                    <h1 className="text-[32px] font-bold text-white"> Hi there👋</h1>
                    <p className="text-light-200">Enter you details to access sticky note</p>
                </section>
                <CustomInput
                    name='username'
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    label='Username'
                    placeholder='Enter your username'
                />
                <CustomInput
                    name='email'
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    label='Email'
                    placeholder='Enter your username'
                />
                <CustomInput
                    name='password'
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    label='Password'
                    placeholder='Enter your password'
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default Register