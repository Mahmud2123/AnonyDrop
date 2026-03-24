import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Copy, LogOut, Loader2, Inbox } from 'lucide-react'

interface Message {
  id: string
  content: string
  created_at: string
}

export function Dashboard() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        navigate('/auth')
        return
      }

      const { data: userData } = await supabase
        .from('users')
        .select('username')
        .eq('id', session.user.id)
        .single()
      
      if (userData) setUsername(userData.username)

      try {
        const response = await fetch('/api/messages', {
          headers: { 'Authorization': `Bearer ${session.access_token}` },
        })
        if (response.ok) {
          const data = await response.json()
          setMessages(data.messages || [])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  const publicLink = username ? `${window.location.origin}/u/${username}` : ''

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl text-indigo-600">NGL Clone</Link>
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 flex items-center gap-1">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Your public link:</p>
            <div className="flex gap-2">
              <input type="text" value={publicLink} readOnly className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm" />
              <button onClick={copyLink} className={`px-4 py-2 rounded-lg font-medium text-sm ${copied ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white'}`}>
                {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Inbox className="w-5 h-5" />
          Messages ({messages.length})
        </h2>

        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center">
              <p className="text-gray-600">No messages yet. Share your link!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-xl shadow p-5">
                <p className="text-gray-800 mb-2">{msg.content}</p>
                <span className="text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}