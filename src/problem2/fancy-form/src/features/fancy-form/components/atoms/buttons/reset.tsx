
import { Button } from "@/components/ui/button"

type Props = {
  title: string
  action: () => void
}

export default function ResetButton({ title = '', action }: Props) {
  return (
    <Button type="button" variant="outline" className="cursor-pointer" onClick={action}>
      {title}
    </Button>
  )
}
