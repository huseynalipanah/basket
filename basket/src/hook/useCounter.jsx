import { useState } from 'react'

function useCounter  (val=0) {
const [count, setCount] = useState(val)
function increaseCounter() {
    setCount(count+1)
}
function decreaseCounter() {
    setCount(count-1)
}
  return [count ,increaseCounter ,decreaseCounter ]
}

export default useCounter