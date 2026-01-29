'use client'

import { useState, useEffect } from 'react'
import { Users, MagnifyingGlass, Plus, Eye, PencilSimple, Trash, SpinnerGap, X, ShieldCheck } from '@phosphor-icons/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface User {
  id: string
  name: string | null
  email: string
  phone: string | null
  role: string
  status: string
  createdAt: string
  advisor: {
    name: string | null
  } | null
}

const roleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-800',
  advisor: 'bg-blue-100 text-blue-800',
  client: 'bg-green-100 text-green-800',
  partner: 'bg-orange-100 text-orange-800',
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800',
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [stats, setStats] = useState({
    total: 0,
    clients: 0,
    advisors: 0,
    admins: 0,
  })

  useEffect(() => {
    fetchUsers()
  }, [roleFilter])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (roleFilter !== 'all') params.append('role', roleFilter)

      const response = await fetch(`/api/admin/users?${params}`)
      const data = await response.json()

      if (data.users) {
        setUsers(data.users)
      }

      // Calculate stats
      const allUsers = data.users || []
      setStats({
        total: allUsers.length,
        clients: allUsers.filter((u: User) => u.role === 'client').length,
        advisors: allUsers.filter((u: User) => u.role === 'advisor').length,
        admins: allUsers.filter((u: User) => u.role === 'admin').length,
      })
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSuspend = async (id: string) => {
    if (!confirm('Are you sure you want to suspend this user?')) return

    setActionLoading(id)
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'suspended' }),
      })
      fetchUsers()
    } catch (error) {
      console.error('Error suspending user:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleActivate = async (id: string) => {
    setActionLoading(id)
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' }),
      })
      fetchUsers()
    } catch (error) {
      console.error('Error activating user:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return

    setActionLoading(id)
    try {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)
  )

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Users</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all system users
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} leftIcon={<Plus weight="bold" />} glow>
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.clients}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Clients</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.advisors}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Advisors</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Admins</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass />}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="advisor">Advisor</option>
            <option value="client">Client</option>
            <option value="partner">Partner</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap className="w-8 h-8 animate-spin text-light-accent-primary" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users weight="thin" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Advisor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name || 'No name'}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.advisor?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedUser(user)}
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSuspend(user.id)}
                            disabled={actionLoading === user.id}
                            className="text-yellow-600"
                            title="Suspend"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleActivate(user.id)}
                            disabled={actionLoading === user.id}
                            className="text-green-600"
                            title="Activate"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(user.id)}
                          disabled={actionLoading === user.id}
                          className="text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create User Modal */}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchUsers()
          }}
        />
      )}

      {/* View User Modal */}
      {selectedUser && (
        <ViewUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={() => {
            setSelectedUser(null)
            fetchUsers()
          }}
        />
      )}
    </div>
  )
}

function CreateUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'client',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error creating user:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Add New User</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
            >
              <option value="client">Client</option>
              <option value="advisor">Advisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Create User'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

function ViewUserModal({
  user,
  onClose,
  onUpdate,
}: {
  user: User
  onClose: () => void
  onUpdate: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    role: user.role,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      onUpdate()
    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">User Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-light-accent-primary to-light-success flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{user.name || 'No name'}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {editing ? (
            <div className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary"
                >
                  <option value="client">Client</option>
                  <option value="advisor">Advisor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Phone</span>
                <p className="font-medium">{user.phone || 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Role</span>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status</span>
                <p className="font-medium capitalize">{user.status}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Joined</span>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              {user.advisor && (
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">Assigned Advisor</span>
                  <p className="font-medium">{user.advisor.name}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            {editing ? (
              <>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? <SpinnerGap className="w-4 h-4 animate-spin" /> : 'Save'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={() => setEditing(true)} leftIcon={<PencilSimple />}>
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
