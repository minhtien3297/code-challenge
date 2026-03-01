import { Button } from "@/components/ui/button"

type Props = {
  title: string
  id: string
}

export default function SubmitButton({ title = '', id }: Props) {
  return (
    <Button type="submit" form={id} className="cursor-pointer">
      {title}
    </Button>
  )
}
