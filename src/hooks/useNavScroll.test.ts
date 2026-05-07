import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useNavScroll } from './useNavScroll'

describe('useNavScroll', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
  })

  it('starts with scrolled=false when at top', () => {
    const { result } = renderHook(() => useNavScroll())
    expect(result.current.scrolled).toBe(false)
  })

  it('sets scrolled=true when scrollY > 8', () => {
    const { result } = renderHook(() => useNavScroll())
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current.scrolled).toBe(true)
  })

  it('starts with activeSection=null when no sections in DOM', () => {
    const { result } = renderHook(() => useNavScroll())
    expect(result.current.activeSection).toBeNull()
  })

  it('sets activeSection when a matching section is in DOM', () => {
    const section = document.createElement('section')
    section.id = 'about'
    Object.defineProperty(section, 'offsetTop', { value: 50, configurable: true })
    document.body.appendChild(section)

    const { result } = renderHook(() => useNavScroll())
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.activeSection).toBe('about')
    document.body.removeChild(section)
  })
})
