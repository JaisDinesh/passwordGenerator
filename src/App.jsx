
import { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  // useref
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^*`[]{}"

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password)
  },
    [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className='text-white  py-3 px-4 my-8 mx-auto w-full max-w-md max-auto bg-gray-700  shadow-md rounded-lg '>
        <h1 className='text-xl mb-2 text-center '>Password generator</h1>

        <div className='flex shadow overflow-hidden mb-4 '>
          <input
            type="text"
            value={password}
            className='bg-white text-black outline-none rounded-md w-full px-2 py-1'
            placeholder='password'
            readOnly
            ref={passwordRef} />
          <button
            className='p-2 bg-indigo-800 mx-2 text-md rounded-md cursor-pointer outline-none'
            onClick={copyPassToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(Number(e.target.value)) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput' >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='charInput' >Characters</label>
          </div>
        </div>
      </div>


    </>
  )
}

export default App