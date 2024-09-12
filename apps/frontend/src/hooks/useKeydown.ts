import { useCallback, useEffect } from 'react'

export const useKeydown = (
  trigger: {
    key: KeyboardEvent['key']
    modifier?: {
      ctrlKey?: boolean
      shiftKey?: boolean
      altKey?: boolean
      metaKey?: boolean
    }
    options?: AddEventListenerOptions
  },
  callback: () => void,
) => {
  const getIsModifierMatched = useCallback(
    (e: KeyboardEvent) => {
      if (trigger.modifier === undefined) return true
      const {
        ctrlKey = false,
        shiftKey = false,
        altKey = false,
        metaKey = false,
      } = trigger.modifier

      return [
        ctrlKey === e.ctrlKey,
        shiftKey === e.shiftKey,
        altKey === e.altKey,
        metaKey === e.metaKey,
      ].every(Boolean)
    },
    [trigger.modifier],
  )

  useEffect(() => {
    const { once, passive, signal, ...eventOptions } = trigger.options ?? {}
    const onKeyDown = (e: KeyboardEvent) => {
      const isModifierMatched = getIsModifierMatched(e)
      const isKeyMatched =
        e.key.localeCompare(trigger.key, undefined, { sensitivity: 'base' }) === 0

      if (isKeyMatched && isModifierMatched) callback()
    }

    window.addEventListener('keydown', onKeyDown, trigger.options)

    return () => {
      window.removeEventListener('keydown', onKeyDown, eventOptions)
    }
  }, [trigger, callback, getIsModifierMatched])
}
