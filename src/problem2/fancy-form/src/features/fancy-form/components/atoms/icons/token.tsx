import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  src: string
}

export default function TokenIcon({ src }: Props) {
  return (
    <Avatar
      size="sm"
    >
      <AvatarImage
        src={src}
        alt="token icon"
      />
      <AvatarFallback>N/A</AvatarFallback>
    </Avatar>
  )
} 
