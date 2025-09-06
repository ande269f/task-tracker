import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://example.com/api',
  headers: { 'Content-Type': 'application/json' },
})