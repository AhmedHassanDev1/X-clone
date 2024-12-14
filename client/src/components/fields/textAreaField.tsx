"use client"

import { useState } from "react"
import { useFormContext, RegisterOptions } from "react-hook-form"

type fieldProps = {
  type?: string
  name: string
  label: string
  maxLength:number
  rows:number
  rules?: RegisterOptions
}
function textAreaField({maxLength=150,rows=5, label = '', name = '', rules = {} }: fieldProps) {
  let { register, formState } = useFormContext()
 
  let { errors } = formState
  let error = errors[name]?.message as string || ''
  let isError = Boolean(error)


  return (
    <div className='input-wrapper'>
      <div className={`relative ${isError?'text-red-600':'text-white'}`}>
        <textarea
          id={name}
          className={`input peer ${isError ? 'invalid-input' : 'valid-input'}`}
          rows={rows}
          placeholder=""
          {... register(name, rules)} />
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

export default textAreaField