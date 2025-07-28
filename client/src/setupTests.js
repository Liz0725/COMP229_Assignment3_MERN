// src/setupTests.js
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Clear localStorage before every test
beforeEach(() => {
  localStorage.clear()
})

// Mock alert to prevent jsdom crash
global.alert = vi.fn()
