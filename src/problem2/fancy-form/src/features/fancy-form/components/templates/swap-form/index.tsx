"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import SubmitButton from "@/features/fancy-form/components/atoms/buttons/submit"
import ResetButton from "@/features/fancy-form/components/atoms/buttons/reset"
import { showToast } from "@/features/fancy-form/utils/form"
import { TOAST_TYPE } from '@/features/fancy-form/types/toast'
import { formId, formSendInputId } from "@/features/fancy-form/constants/form"
import TokenSelect from "@/features/fancy-form/components/atoms/selects/tokens"
import useTokenData from "@/features/fancy-form/hooks/useTokenData"
import { useMemo, useState } from "react"
import type { Token } from "@/features/fancy-form/types/token"

const formSchema = z.object({
  amountSend: z
  .string()
  .trim()
  .min(1, "Amount is required")
  .refine(
    (val) => {
      const num = Number(val);

      return !isNaN(num) && num > 0;
    },
    { message: "Must be a number greater than 0" }
  ),
  sendTokenId: z.string().min(1, "Please select token to send"),
  receiveTokenId: z.string().min(1, "Please select token to receive"),
})

const defaultToken: Token = {
  id: "",
  currency: "",
  date: "",
  price: 0,
  image: ""
}

export default function SwapFormTemplate() {
  const { tokens, postTokenSwap } = useTokenData()

  const [loading, setLoading] =useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountSend: "",
      sendTokenId: "",
      receiveTokenId: "",
    },
  })

  const { amountSend, sendTokenId, receiveTokenId } = useWatch({
    control: form.control,
  })

  const sendToken = useMemo(
    () => tokens.find(token => token.id === sendTokenId) ?? defaultToken,
    [tokens, sendTokenId]
  )

  const receiveToken = useMemo(
    () => tokens.find(token => token.id === receiveTokenId) ?? defaultToken,
    [tokens, receiveTokenId]
  )

  const receiveValue = useMemo(() => {
    const sendAmount = Number(amountSend);

    if (isNaN(sendAmount)) {
      return 0;
    }

    const sendPrice = sendToken?.price ?? 0;
    const receivePrice = receiveToken?.price ?? 0;

    if (receivePrice === 0) {
      return 0;
    }

    return sendAmount * sendPrice / receivePrice
  }, [sendToken, receiveToken, amountSend])

  const onReset = () => {
    form.reset()
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLoading(true)

    setTimeout(() => {
      try {
        postTokenSwap(Number(data.amountSend), sendTokenId ?? '', receiveTokenId ?? '')

        showToast("Successfully swap token", TOAST_TYPE.SUCCESS)
      } catch (error) {
        console.error(error)
        showToast("Error swap token", TOAST_TYPE.ERROR)
      }finally{
        setLoading(false)
        onReset()
      }
    }, 1000)
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
                      disabled={loading || field.disabled}
                      id={formSendInputId}
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter amount to send..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <TokenSelect
                      tokens={tokens}
                      chosenValue={sendTokenId ?? ''}
                      onChosenValueChange={(newId) => {
                        form.setValue("sendTokenId", newId, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }}
                    />
                  </Field>
                )}
              />

              <Field>
                <FieldLabel>
                  Amount to receive
                </FieldLabel>

                <Input
                  className="disabled:opacity-100"
                  value={receiveValue}
                  disabled
                />

                <TokenSelect
                  tokens={tokens}
                  chosenValue={receiveTokenId ?? ''}
                  onChosenValueChange={(newId) => {
                    form.setValue("receiveTokenId", newId, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                />
              </Field>

            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <ResetButton title="Reset" action={onReset} />

            <SubmitButton title="Confirm Swap" id={formId} loading={loading} />
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

