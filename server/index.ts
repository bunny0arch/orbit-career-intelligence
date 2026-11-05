import express from 'express'
import { createServer as createViteServer } from 'vite'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateCareerBrief } from './ai'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const isProduction = process.env.NODE_ENV === 'production'
const app = express()
const port = Number(process.env.PORT || 3000)

app.disable('x-powered-by')
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'orbit', time: new Date().toISOString() }))

app.post('/api/ai/career-brief', async (req, res) => {
  try {
    const input = req.body as Parameters<typeof generateCareerBrief>[0]
    if (!input?.name || !input?.targetRole) return res.status(400).json({ error: 'name and targetRole are required' })
    const result = await generateCareerBrief(input)
    res.json(result)
  } catch (error) {
    res.status(502).json({ error: error instanceof Error ? error.message : 'AI provider unavailable' })
  }
})

async function start() {
  if (!isProduction) {
    const vite = await createViteServer({ root, server: { middlewareMode: true, host: '0.0.0.0' }, appType: 'spa' })
    app.use(vite.middlewares)
  } else {
    const dist = path.join(root, 'dist')
    if (existsSync(dist)) app.use(express.static(dist))
  }
  app.use((_req, res) => {
    if (isProduction) res.sendFile(path.join(root, 'dist', 'index.html'))
    else res.status(404).send('Not found')
  })
  app.listen(port, '0.0.0.0', () => console.log(`Orbit server listening on ${port}`))
}

start().catch(error => { console.error(error); process.exit(1) })
