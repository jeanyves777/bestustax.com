'use client'

import { useState, useEffect, useRef } from 'react'
import { ChatCircle, MagnifyingGlass, PaperPlaneRight, Paperclip, Image, File, SpinnerGap, X, Check, CheckCircle } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Message {
  id: string
  content: string
  attachments: string | null
  read: boolean
  createdAt: string
  sender: {
    id: string
    name: string | null
    email: string
    role: string
  }
  receiver: {
    id: string
    name: string | null
    email: string
    role: string
  }
}

interface Conversation {
  id: string
  name: string | null
  email: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showNewConversation, setShowNewConversation] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachment, setAttachment] = useState<File | null>(null)

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id)
    }
  }, [selectedUser])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchConversations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/messages/conversations')
      const data = await response.json()

      if (data.conversations) {
        setConversations(data.conversations)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/messages?userId=${userId}`)
      const data = await response.json()

      if (data.messages) {
        setMessages(data.messages)
        // Mark messages as read
        await fetch('/api/admin/messages/read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })
        fetchConversations() // Refresh to update unread counts
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && !attachment) return
    if (!selectedUser) return

    setSending(true)
    try {
      const formData = new FormData()
      formData.append('receiverId', selectedUser.id)
      formData.append('content', newMessage)
      if (attachment) {
        formData.append('attachment', attachment)
      }

      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setNewMessage('')
        setAttachment(null)
        fetchMessages(selectedUser.id)
        fetchConversations()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const parseAttachments = (attachmentsJson: string | null) => {
    if (!attachmentsJson) return []
    try {
      return JSON.parse(attachmentsJson)
    } catch {
      return []
    }
  }

  const isImageFile = (filename: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename)
  }

  return (
    <div className="h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Communicate with clients
        </p>
      </div>

      <div className="flex gap-6 h-[calc(100%-80px)]">
        {/* Conversations List */}
        <Card className="w-80 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass />}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <SpinnerGap className="w-6 h-6 animate-spin text-light-accent-primary" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No conversations found
              </div>
            ) : (
              <div>
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedUser(conv)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${
                      selectedUser?.id === conv.id
                        ? 'bg-light-accent-primary/10'
                        : 'hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium">
                          {conv.name?.charAt(0) || conv.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{conv.name || conv.email}</span>
                          {conv.unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-light-accent-primary text-white text-xs flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowNewConversation(true)}
            >
              New Conversation
            </Button>
          </div>
        </Card>

        {/* Messages Area */}
        <Card className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
                  <span className="text-white font-medium">
                    {selectedUser.name?.charAt(0) || selectedUser.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{selectedUser.name || selectedUser.email}</div>
                  <div className="text-sm text-gray-500">{selectedUser.email}</div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isAdmin = message.sender.role === 'admin'
                  const attachments = parseAttachments(message.attachments)

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          isAdmin
                            ? 'bg-light-accent-primary text-white rounded-br-none'
                            : 'bg-gray-100 dark:bg-dark-bg-tertiary rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>

                        {/* Attachments */}
                        {attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {attachments.map((att: any, idx: number) => (
                              <div key={idx}>
                                {isImageFile(att.filename) ? (
                                  <img
                                    src={att.url}
                                    alt={att.filename}
                                    className="max-w-full rounded-lg"
                                  />
                                ) : (
                                  <a
                                    href={att.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 p-2 rounded ${
                                      isAdmin ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                  >
                                    <File className="w-5 h-5" />
                                    <span className="text-sm truncate">{att.filename}</span>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className={`text-xs mt-1 flex items-center gap-1 ${
                          isAdmin ? 'text-white/70 justify-end' : 'text-gray-500'
                        }`}>
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          {isAdmin && message.read && (
                            <CheckCircle weight="fill" className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                {attachment && (
                  <div className="mb-2 p-2 bg-gray-100 dark:bg-dark-bg-tertiary rounded-lg flex items-center gap-2">
                    <File className="w-4 h-4" />
                    <span className="text-sm flex-1 truncate">{attachment.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachment(null)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={sending || (!newMessage.trim() && !attachment)}>
                    {sending ? (
                      <SpinnerGap className="w-5 h-5 animate-spin" />
                    ) : (
                      <PaperPlaneRight weight="fill" className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <ChatCircle weight="thin" className="w-16 h-16 mx-auto mb-4" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* New Conversation Modal */}
      {showNewConversation && (
        <NewConversationModal
          onClose={() => setShowNewConversation(false)}
          onSelect={(user) => {
            setSelectedUser(user)
            setShowNewConversation(false)
          }}
        />
      )}
    </div>
  )
}

function NewConversationModal({
  onClose,
  onSelect,
}: {
  onClose: () => void
  onSelect: (user: Conversation) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const searchUsers = async () => {
    if (!searchQuery) return
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/users?search=${searchQuery}&role=client`)
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">New Conversation</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search for a client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={searchUsers} disabled={loading}>
              {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Search'}
            </Button>
          </div>

          {users.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() =>
                    onSelect({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      lastMessage: '',
                      lastMessageAt: '',
                      unreadCount: 0,
                    })
                  }
                  className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <div className="font-medium">{user.name || user.email}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
