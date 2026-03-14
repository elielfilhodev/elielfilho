import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(() => {
  const file = readFileSync(resolve('data/projects.json'), 'utf-8')
  return JSON.parse(file)
})
