import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Send, Loader2, CheckCircle, MessageCircle } from 'lucide-react'

export function PublicMessage() {
  const { username } = useParams<{ username: string }>()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [exists, setExists] = useState<boolean | null>(null)

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.from('users').select('id').eq('username', username).single()
      setExists(!!data)
      setChecking(false)
    }
    check()
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message: message.trim() }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setStatus('success')
      setMessage('')
    } catch (error: any) {
      setStatus('error')
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (!exists) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <Link to="/" className="text-indigo-600">Go home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <MessageCircle className="w-8 h-8" />
            <span>NGL Clone</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white text-center">
            <h1 className="text-2xl font-bold">Send anonymous message</h1>
            <p className="text-indigo-100">to @{username}</p>
          </div>

          <div className="p-6">
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Message sent! 🎉</h2>
                <button onClick={() => setStatus('idle')} className="text-indigo-600 font-medium">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say something nice..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                  maxLength={1000}
                  disabled={loading}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{message.length}/1000</span>
                  <span>Anonymous</span>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{errorMsg}</div>
                )}

                <button
                  type="submit"
                  disabled={loading || message.trim().length < 2}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Send Message
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t text-center">
              <Link to="/auth" className="text-sm text-indigo-600 font-medium">
                Get your own link →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}