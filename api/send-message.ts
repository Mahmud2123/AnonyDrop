import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return false
  }
  
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { username, message } = req.body

    if (!username || !message) {
      return res.status(400).json({ error: 'Username and message required' })
    }

    if (message.trim().length < 2) {
      return res.status(400).json({ error: 'Message too short' })
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long' })
    }

    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string
    
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many messages. Please wait.' })
    }

    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { error: insertError } = await supabaseAdmin
      .from('messages')
      .insert({
        receiver_id: user.id,
        content: message.trim(),
        sender_ip: ip,
      })

    if (insertError) throw insertError

    return res.status(200).json({ success: true, message: 'Message sent!' })

  } catch (error: any) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Server error', details: error.message })
  }
}