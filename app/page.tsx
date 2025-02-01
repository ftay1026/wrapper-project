"use client"

import { useState, type FormEvent } from "react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: "user",
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setInput("")

      // Simulate a bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now(),
          text: `You said: "${input.trim()}"`,
          sender: "bot",
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      }, 500)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((m) => (
          <div key={m.id} className={`mb-4 ${m.sender === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${
                m.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  )
}

