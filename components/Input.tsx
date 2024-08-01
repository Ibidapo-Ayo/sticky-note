import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { FormFieldTypes } from '@/lib/utils'


type CustomInputProps = {
    control: Control<any>,
    fieldType: FormFieldTypes,
    name: string,
    placeholder?: string,
    label?: string,
}

const RenderField = ({ field, props }: {
    field: any,
    props: CustomInputProps
}) => {
    const { control, name, fieldType, label, placeholder } = props
    if (fieldType === FormFieldTypes.INPUT) {
        return (
            <FormControl>
                <Input placeholder={placeholder}
                    {...field}
                    type={name === "password" && "password"}
                />
            </FormControl>
        )
    }
}

const CustomInput = (props: CustomInputProps) => {
    const { control, name, fieldType, label, placeholder } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-white'>{label}</FormLabel>
                    <RenderField field={field} props={props} />
                    <FormMessage className='text-red-400' />
                </FormItem>
            )}
        />
    )
}

export default CustomInput