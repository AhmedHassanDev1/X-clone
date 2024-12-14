"use client"

import { useState } from "react"
import { useFormContext, RegisterOptions } from "react-hook-form"
import { RiEyeCloseFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
type fieldProps = {
  name: string
  label: string
  rules?: RegisterOptions
}
function PasswordFeild({ label = '', name = '', rules = {} }: fieldProps) {
  let { register, formState } = useFormContext()
  let { onBlur, ...other } = register(name, rules)
  let { errors } = formState
  let error = errors[name]?.message as string || ''
  let isError = Boolean(error)
  let [show, setShow] = useState(false)

  return (
    <div className='input-wrapper'>
      <div className={`relative ${isError ? 'text-red-600' : 'text-white'}`}>
        <input
          id={name}
          className={`input peer ${isError ? 'invalid-input' : 'valid-input'}`}
          type={show ? "text" : "password"}
          placeholder=""
          {...other} />
        <label
          htmlFor={name}
          className="label  text-sm peer-placeholder-shown:left-3 peer-placeholder-shown:top-1/2 peer-focus:text-sm peer-focus:left-3 peer-focus:top-3  ">
          {label}
        </label>
        <div
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-current text-xl">
          {!show ? (
            <BsFillEyeFill />
          ) : (
            <RiEyeCloseFill />
          )}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default PasswordFeild