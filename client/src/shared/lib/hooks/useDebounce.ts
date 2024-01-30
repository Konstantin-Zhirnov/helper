import React from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState<string>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export { useDebounce }
