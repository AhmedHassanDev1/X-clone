"use client"
import { useState } from "react"
import { useForm, FormProvider, } from "react-hook-form"
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { displayFormTitle } from "@/utils/forms";
import Logo from "../Logo";
import CustomField from "../fields/CustomField";
import { SignUp } from "@/utils/data/auth";
import { registerPayload } from "@/types/auth";
import { useRouter } from "next/navigation";
import PasswordFeild from "../fields/passwordField";
function signup({ closeDialog }: { closeDialog: () => void }) {
  let methods = useForm({})
  let { formState, handleSubmit, reset } = methods
  let { isSubmitting } = formState
  let [formStep, setFormStep] = useState<number>(0)
  let [formError, setFormError] = useState('')

  let router = useRouter()


  let close = () => {
    reset()
    setFormStep(0)
    closeDialog()

  }


  let submit = async (data: any): Promise<void> => {
    setFormError('')
    let payload: registerPayload = {
      name: data?.name.trim(),
      email: data?.email.toLowerCase().trim(),
      password: data?.password,
    }

    if (formStep < 1) return setFormStep(() => formStep++)
   
    
    try {
      await SignUp(data)
      router.push('/home')
    } catch (error) {
       setFormError(error.response?.data?.message)
       
    }
    

  }
  return (
    <FormProvider {...methods}>

      <form
        onSubmit={handleSubmit(submit)}
        className="form-size mx-auto relative top-1/2 -translate-y-1/2  p-4 flex gap-3 flex-col items-center rounded-md bg-black text-white"
      >
        {/* form header */}
        <div className="w-full grid grid-cols-2 text-2xl items-center">
          {formStep == 0 ? (
            <IoCloseSharp onClick={close} className="cursor-pointer" />
          ) : (
            <FaArrowLeftLong onClick={() => setFormStep(() => formStep--)} className="cursor-pointer" />
          )}
          <Logo className="relative w-6 h-6 -translate-x-1/2" />
        </div>

        <div className="w-full md:w-[85%] my-2 flex flex-col gap-2 justify-stretch">
          {/* step Title */}
          {displayFormTitle(formStep, '')}

          {/*Step one ~ enter name , email and barth of date*/}
          {formStep >= 0 && (<section className={`${formStep == 0 ? "inline-block" : "hidden"} space-y-8`}>
            <CustomField
              name='name'
              label="username"
              rules={{
                required: {
                  value: true,
                  message: "name is required."
                }
              }}
            />

            <CustomField
              name='email'
              type="email"
              label="email"
              rules={{
                required: {
                  value: true,
                  message: "email is required."
                }
              }}
            />
          </section>)}

          {/*Step one  ~ enter password*/}
          {formStep >= 1 && (<section className={`${formStep == 1 ? "inline-block" : "hidden"}`}>

            <PasswordFeild
              name="password"
              label={"password"}
              rules={{
                required: {
                  value: true,
                  message: "password is required."
                },
                minLength:{
                  value:8,
                  message:"password is very short"
                }
              }}
            />
          </section>)}
          <button
            disabled={isSubmitting}
            className="rounded-full p-3 bg-white text-black">
            {formStep !== 1 ? 'Next' : 'create Account'}
          </button>
          <p className="text-red-500 first-letter:uppercase">{formError}</p>
        </div>
      </form>
    </FormProvider>

  )
}

export default signup