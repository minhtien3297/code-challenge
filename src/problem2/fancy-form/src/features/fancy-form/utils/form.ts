import { toast } from "sonner"
import { TOAST_TYPE } from '@/features/fancy-form/types/toast'

export function showToast(title: string, type: TOAST_TYPE) {
  const options = {
    position: "bottom-right" as const
  }

  switch (type) {
    case TOAST_TYPE.SUCCESS:
      toast.success(title, options)
      break;
    case TOAST_TYPE.ERROR:
      toast.error(title, options)
      break;
    default:
      toast.success(title, options)
  }
}
