import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type Props = {
  loading: boolean
  title: string
  id: string
}

export default function SubmitButton({loading = false, title = '', id }: Props) {
  return (
    <Button type="submit" form={id} className="cursor-pointer" disabled={loading}>
      {loading && <Spinner />}
      {title}
    </Button>
  )
}
