'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChatCircle,
  PaperPlaneTilt,
  Paperclip,
  MagnifyingGlass,
  User as UserIcon,
  Clock,
  Check,
  CheckCircle,
  SpinnerGap,
  X,
  Image as ImageIcon,
  File
} from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    role: string
  }
  lastMessage: {
    content: string
    createdAt: string
    isFromMe: boolean
  } | null
  unreadCount: number
}

interface Message {
  id: string
  content: string
  senderId: string
  isFromMe: boolean
  createdAt: string
  read: boolean
  attachments: {
    id: string
    name: string
    url: string
    type: string
  }[]
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchConversations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/portal/messages')
      const data = await response.json()
      setConversations(data.conversations || [])
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      setLoadingMessages(true)
      const response = await fetch(`/api/portal/messages/${conversationId}`)
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoadingMessages(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    setSending(true)
    try {
      const response = await fetch(`/api/portal/messages/${selectedConversation.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages([...messages, data.message])
        setNewMessage('')
        fetchConversations() // Refresh conversation list
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return d.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const filteredConversations = conversations.filter(
    (conv) => conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Conversations List */}
        <Card className="md:w-80 flex-shrink-0 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass />}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <SpinnerGap className="w-6 h-6 animate-spin text-light-accent-primary" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <ChatCircle weight="thin" className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500 text-sm">No conversations yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary transition-colors ${
                      selectedConversation?.id === conv.id ? 'bg-gray-50 dark:bg-dark-bg-tertiary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-light-accent-primary/20 flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-5 h-5 text-light-accent-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate">{conv.participant.name}</span>
                          {conv.lastMessage && (
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {formatTime(conv.lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <p className="text-sm text-gray-500 truncate">
                            {conv.lastMessage?.isFromMe && <span className="text-gray-400">You: </span>}
                            {conv.lastMessage?.content || 'No messages yet'}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="bg-light-accent-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 capitalize">{conv.participant.role}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Messages Area */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-light-accent-primary/20 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-light-accent-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{selectedConversation.participant.role}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <SpinnerGap className="w-6 h-6 animate-spin text-light-accent-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <ChatCircle weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500">No messages yet. Start the conversation!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => {
                      const showDate =
                        index === 0 ||
                        new Date(message.createdAt).toDateString() !==
                          new Date(messages[index - 1].createdAt).toDateString()

                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="flex items-center gap-4 my-4">
                              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                              <span className="text-xs text-gray-500">
                                {new Date(message.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                            </div>
                          )}
                          <div className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}>
                            <div
                              className={`max-w-[70%] ${
                                message.isFromMe
                                  ? 'bg-light-accent-primary text-white rounded-l-lg rounded-tr-lg'
                                  : 'bg-gray-100 dark:bg-dark-bg-tertiary rounded-r-lg rounded-tl-lg'
                              } p-3`}
                            >
                              <p className="whitespace-pre-wrap">{message.content}</p>

                              {/* Attachments */}
                              {message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map((att) => (
                                    <a
                                      key={att.id}
                                      href={att.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`flex items-center gap-2 p-2 rounded ${
                                        message.isFromMe
                                          ? 'bg-white/20 hover:bg-white/30'
                                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
                                      }`}
                                    >
                                      {att.type.includes('image') ? (
                                        <ImageIcon className="w-4 h-4" />
                                      ) : (
                                        <File className="w-4 h-4" />
                                      )}
                                      <span className="text-sm truncate">{att.name}</span>
                                    </a>
                                  ))}
                                </div>
                              )}

                              <div
                                className={`flex items-center gap-1 mt-1 text-xs ${
                                  message.isFromMe ? 'text-white/70' : 'text-gray-500'
                                }`}
                              >
                                <span>
                                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                  })}
                                </span>
                                {message.isFromMe && (
                                  message.read ? (
                                    <CheckCircle className="w-3 h-3" weight="fill" />
                                  ) : (
                                    <Check className="w-3 h-3" />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-end gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded-lg">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary resize-none"
                    />
                  </div>
                  <Button onClick={sendMessage} disabled={!newMessage.trim() || sending}>
                    {sending ? (
                      <SpinnerGap className="w-4 h-4 animate-spin" />
                    ) : (
                      <PaperPlaneTilt className="w-4 h-4" weight="fill" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <ChatCircle weight="thin" className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your Messages</h3>
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
