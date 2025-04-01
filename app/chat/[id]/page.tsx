import { loadChat } from "@/lib/storage"
import Chat from "@/components/chat"

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { message?: string }
}) {
  const { id } = params
  const initialMessage = searchParams.message

  try {
    // Load existing messages
    const messages = await loadChat(id)

    return (
      <Chat
        id={id}
        initialMessages={messages}
        initialPrompt={initialMessage ? decodeURIComponent(initialMessage) : undefined}
      />
    )
  } catch (error) {
    console.error("Error in chat page:", error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <h1 className="text-xl font-bold text-red-700 mb-2">Error Loading Chat</h1>
          <p className="text-red-600 mb-4">
            There was a problem loading this chat. The chat ID may be invalid or there might be a server issue.
          </p>
          <a href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Return to Home
          </a>
        </div>
      </div>
    )
  }
}

