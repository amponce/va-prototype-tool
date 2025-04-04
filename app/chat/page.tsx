import { redirect } from "next/navigation"
import { createChat } from "@/lib/storage"

export default async function Page() {
  const id = await createChat()
  redirect(`/chat/${id}`)
}

