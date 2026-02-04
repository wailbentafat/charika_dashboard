'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, Eye, EyeOff, Copy } from 'lucide-react'

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface APIKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string
  active: boolean
}

const mockRoles: Role[] = [
  {
    id: 'ROLE-001',
    name: 'Admin',
    description: 'Full system access',
    permissions: [
      'view_all_data',
      'manage_drivers',
      'manage_bins',
      'manage_pricing',
      'manage_users',
      'export_reports',
    ],
    userCount: 2,
  },
  {
    id: 'ROLE-002',
    name: 'Company Manager',
    description: 'Manage own company data',
    permissions: [
      'view_company_data',
      'manage_own_drivers',
      'manage_own_bins',
      'view_own_analytics',
      'export_reports',
    ],
    userCount: 5,
  },
  {
    id: 'ROLE-003',
    name: 'Driver',
    description: 'View routes and submit collections',
    permissions: ['view_own_routes', 'submit_collections', 'view_own_analytics'],
    userCount: 24,
  },
  {
    id: 'ROLE-004',
    name: 'Viewer',
    description: 'View-only access',
    permissions: ['view_own_data', 'view_shared_reports'],
    userCount: 8,
  },
]

const mockAPIKeys: APIKey[] = [
  {
    id: 'KEY-001',
    name: 'Production API',
    key: 'wf_live_xxx...',
    createdAt: '2024-01-15',
    lastUsed: '2024-02-04',
    active: true,
  },
  {
    id: 'KEY-002',
    name: 'Development API',
    key: 'wf_test_yyy...',
    createdAt: '2024-02-01',
    lastUsed: '2024-02-02',
    active: true,
  },
]

const allPermissions = [
  'view_all_data',
  'view_company_data',
  'view_own_data',
  'manage_drivers',
  'manage_own_drivers',
  'manage_bins',
  'manage_own_bins',
  'manage_pricing',
  'manage_users',
  'view_analytics',
  'export_reports',
  'manage_settings',
  'submit_collections',
  'view_own_routes',
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'roles' | 'api' | 'notifications'>('roles')
  const [showNewRoleForm, setShowNewRoleForm] = useState(false)
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  const toggleKeyVisibility = (keyId: string) => {
    const newSet = new Set(visibleKeys)
    if (newSet.has(keyId)) {
      newSet.delete(keyId)
    } else {
      newSet.add(keyId)
    }
    setVisibleKeys(newSet)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings & Access Control</h1>
        <p className="text-muted-foreground">Manage roles, permissions, and API integrations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'roles' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
          }`}
        >
          Roles & Permissions
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'api' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
          }`}
        >
          API Keys
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'notifications' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
          }`}
        >
          Notifications
        </button>
      </div>

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowNewRoleForm(!showNewRoleForm)} className="bg-primary text-white">
              <Plus size={18} className="mr-2" />
              New Role
            </Button>
          </div>

          {showNewRoleForm && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Create New Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Role Name</label>
                    <Input placeholder="e.g., Area Manager" className="border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Description</label>
                    <textarea
                      placeholder="Describe the purpose of this role..."
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-3">Permissions</label>
                    <div className="space-y-2">
                      {allPermissions.map((perm) => (
                        <label key={perm} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{perm.replace(/_/g, ' ').toUpperCase()}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="bg-primary text-white">Create Role</Button>
                    <Button variant="outline" onClick={() => setShowNewRoleForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Roles List */}
          <div className="grid grid-cols-1 gap-4">
            {mockRoles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Assigned Users</p>
                      <p className="text-2xl font-bold">{role.userCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((perm) => (
                          <span key={perm} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {perm.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="text-xs text-muted-foreground px-2 py-1">+{role.permissions.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowNewKeyForm(!showNewKeyForm)} className="bg-primary text-white">
              <Plus size={18} className="mr-2" />
              Generate Key
            </Button>
          </div>

          {showNewKeyForm && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Generate New API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Key Name</label>
                    <Input placeholder="e.g., Mobile App Integration" className="border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Environment</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Production</option>
                      <option>Development</option>
                      <option>Testing</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="bg-primary text-white">Generate</Button>
                    <Button variant="outline" onClick={() => setShowNewKeyForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Keys List */}
          <div className="space-y-3">
            {mockAPIKeys.map((apiKey) => (
              <Card key={apiKey.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{apiKey.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.key.replace(/./g, '•')}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          {visibleKeys.has(apiKey.id) ? (
                            <EyeOff size={16} className="text-muted-foreground" />
                          ) : (
                            <Eye size={16} className="text-muted-foreground" />
                          )}
                        </button>
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Copy size={16} className="text-muted-foreground" />
                        </button>
                      </div>
                      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                        <span>Created: {apiKey.createdAt}</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                        <span className={`${apiKey.active ? 'text-green-600' : 'text-red-600'}`}>
                          {apiKey.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Rotate
                      </Button>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle>Notification Rules</CardTitle>
            <CardDescription>Configure alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { label: 'Bin Overflow Alert', enabled: true },
                { label: 'Missed Collection Alert', enabled: true },
                { label: 'Driver Delay Alert', enabled: false },
                { label: 'Maintenance Due Alert', enabled: true },
                { label: 'Recycling Campaign Update', enabled: true },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">{notif.label}</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={notif.enabled} className="w-4 h-4 rounded" />
                  </label>
                </div>
              ))}
            </div>
            <Button className="w-full bg-primary text-white">Save Preferences</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
