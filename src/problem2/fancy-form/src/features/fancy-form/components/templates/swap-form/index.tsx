"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group"

import SubmitButton from "@/features/fancy-form/components/atoms/buttons/submit"
import ResetButton from "@/features/fancy-form/components/atoms/buttons/reset"
import { showToast } from "@/features/fancy-form/utils/form"
import { TOAST_TYPE } from '@/features/fancy-form/types/toast'
import { formId, formSendInputId, formReceiveInputId } from "@/features/fancy-form/constants/form"
import useTokenData from "@/features/fancy-form/hooks/useTokenData"

const formSchema = z.object({
  amountSend: z
    .string().nonempty(),
  amountReceive: z
    .string().nullable()
})

export default function SwapFormTemplate() {
  const {tokens} = useTokenData()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountSend: "",
      amountReceive: "",
    },
  })

  const onReset = () => {
    form.reset()
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data)
      onReset()
      showToast("Successfully swap token", TOAST_TYPE.SUCCESS)
    } catch (error) {
      console.error(error)
      showToast("Error swap token", TOAST_TYPE.ERROR)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Swap Form</CardTitle>
          <CardDescription>
            A form to swap tokens
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="amountSend"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={formSendInputId}>
                      Amount to send
                    </FieldLabel>

                    <Input
                      {...field}
                      id={formSendInputId}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter amount to send..."
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="amountReceive"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={formReceiveInputId}>
                      Amount to receive
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupText
                        {...field}
                        id={formReceiveInputId}
                        aria-readonly
                        className="h-3 resize-none"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    <FieldDescription>
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <ResetButton title="Reset" action={onReset} />

            <SubmitButton title="Confirm Swap" id={formId} />
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

