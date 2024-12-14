"use client"
import { Usertype, userEditeType } from "@/types/user"
import { ChangeEvent, ChangeEventHandler, FormEvent, InputHTMLAttributes, useEffect, useRef, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { IoCloseSharp } from "react-icons/io5";
import { RiCameraLine } from "react-icons/ri";
import Image from "next/image";
import TextAreaField from "../fields/textAreaField";
import CustomFeild from "../fields/CustomField";
import axios from "axios";
function editeProfileForm({ userDetails, closeForm, refetch }: { refetch: () => Promise<any>, userDetails: Usertype, closeForm: () => void }) {
    let dialogRef = useRef<HTMLDialogElement | null>(null)
    let [profileImage, setProfileImage] = useState()
    let [userImage, setUserImage] = useState()
    let [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(userDetails?.profile_image)
    let [userImageUrl, setUserImageUrl] = useState<string | undefined>(userDetails?.image)
    useEffect(() => {
        if (profileImage) {
            let url = URL.createObjectURL(profileImage)
            setProfileImageUrl(url)
        }
        if (userImage) {
            let url = URL.createObjectURL(userImage)
            setUserImageUrl(url)
        }

    }, [userImage, profileImage])
    let methods = useForm({
        defaultValues: async () => {
            return {
                name: userDetails?.name,
                bio: userDetails?.bio,
                location: userDetails?.location,
            }
        }
    })
    let { handleSubmit, formState, setValue } = methods
    let { isDirty, isSubmitting } = formState
    let close = () => {
        if (isDirty || profileImage || userImage) {
            dialogRef?.current?.showModal()
        } else {
            setProfileImageUrl(userDetails?.profile_image)
            setUserImageUrl(userDetails?.image)
            setValue('name', userDetails?.name)
            setValue('bio', userDetails?.bio)
            setValue('location', userDetails?.location)
            closeForm()
        }
    }
    let cancel = () => {
        closeForm()
        setProfileImageUrl(userDetails?.profile_image)
        setUserImageUrl(userDetails?.image)
        setValue('name', userDetails?.name)
        setValue('bio', userDetails?.bio)
        setValue('location', userDetails?.location)
        dialogRef.current?.close()
    }

    let save = async (data: userEditeType): Promise<void> => {
        if (isDirty || profileImage || userImage) {
            let formData = new FormData()
            let url = process.env.NEXT_PUBLIC_USER_API + 'edite'
            formData.append('name', data?.name?.trim())
            formData.append('bio', data?.bio?.trim())
            formData.append('location', data?.location?.trim())
            if (userImage) formData.append('userImage', userImage)
            if (profileImage) formData.append('profileImage', profileImage)
            try {
                await axios.put(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                })
                await refetch()
                closeForm()
            } catch (error) {
                console.log(error?.response?.data);

            }
        }

    }
    return (
        <>
            <dialog ref={dialogRef}>
                <div className="fixed inset-0 flex justify-center items-center bg-[#ffffff4c]">
                    <div className=" w-80  p-6 rounded-lg bg-black flex flex-col items-center gap-3 text-white">
                        <h3 className="text-xl font-medium">Discard changes?</h3>
                        <p className="text-zinc-500 font-bold">This can’t be undone and you’ll lose your changes. </p>
                        <button
                            className="w-4/5 p-3  bg-red-600 rounded-full block text-xl font-bold"
                            onClick={cancel}>
                            Discard
                        </button>
                        <button
                            className="w-4/5 p-3 ring-1 ring-zinc-600 rounded-full text-xl font-bold"
                            onClick={() => dialogRef.current?.close()}>
                            cancel
                        </button>
                    </div>
                </div>
            </dialog>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(save)}
                    className="form-size relative rounded-xl text-white  bg-black overflow-y-auto " >
                    <header className="header flex items-center justify-between z-50" >
                        <div className="flex items-center gap-3">
                            <IoCloseSharp
                                className="icon"
                                onClick={close} />
                            <h3 className="text-lg font-bold">Edite Profile</h3>
                        </div>
                        <button disabled={isSubmitting} className="rounded-full px-4 py-2 font-bold bg-white text-black">Save</button>
                    </header>
                    <div className="relative">
                        <div className="profile-image">
                            {profileImageUrl && <Image
                                src={profileImageUrl}
                                fill
                                alt="profile image"
                                className="object-cover" />}
                            <div className="absolute inset-0 flex justify-center items-center z-40">
                                <label
                                    htmlFor="profile-image"
                                    className="text-xl cursor-pointer p-3 bg-[#86868671] rounded-full">
                                    <RiCameraLine />
                                </label>
                                <input
                                    onChange={(e) => setProfileImage(e?.target?.files[0])}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="profile-image" />
                            </div>

                        </div>
                        <div className="user-image">
                            {userImageUrl && <Image
                                src={userImageUrl}
                                fill
                                alt="profile image"
                                className="object-cover object-center" />}
                            <div className="absolute inset-0 flex justify-center items-center z-40">
                                <label
                                    htmlFor="user-image"
                                    className="text-xl cursor-pointer p-3 bg-[#86868671] rounded-full">
                                    <RiCameraLine />
                                </label>
                                <input
                                    onChange={(e) => setUserImage(e?.target?.files[0])}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="user-image" />
                            </div>
                        </div>
                    </div>
                    <div className="px-10 py-3 mt-24 space-y-7">
                        <CustomFeild
                            label="name"
                            name="name"
                            rules={{
                                required: {
                                    value: true,
                                    message: "name is required."
                                },

                            }}
                        />
                        <TextAreaField
                            name='bio'
                            label="bio"
                            rows={2}
                            maxLength={150}

                        />
                        <CustomFeild
                            label="location"
                            name="location"

                        />
                    </div>
                </form>
            </FormProvider>

        </>
    )
}

export default editeProfileForm