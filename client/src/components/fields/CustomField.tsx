"use client"

import { useState } from "react"
import { useFormContext, RegisterOptions } from "react-hook-form"

type fieldProps = {
  type?: string
  name: string
  label: string
  rules?: RegisterOptions
}
function CustomFeild({ type = 'text', label = '', name = '', rules = {} }: fieldProps) {
  let { register, formState } = useFormContext()
  let { onBlur, ...other } = register(name, rules)
  let { errors } = formState
  let error = errors[name]?.message as string || ''
  let isError = Boolean(error)
  let [focus, setFocus] = useState(false)

  return (
    <div className='input-wrapper'>
      <div className={`relative ${isError?'text-red-600':'text-white'}`}>
        <input
          id={name}
          className={`input peer ${isError ? 'invalid-input' : 'valid-input'}`}
          type={type}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder=""
          {...other} />
        <label
          htmlFor={name}
          className="label  text-sm peer-placeholder-shown:left-3 peer-placeholder-shown:top-1/2 peer-focus:text-sm peer-focus:left-3 peer-focus:top-3  ">
          {label}
        </label>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default CustomFeild