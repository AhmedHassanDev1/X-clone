"use client"
import MaxWidthWrapper from "../maxWidthWrapper"
import CurrentUserImage from "../user/currentUserImage"
import SelectGifBtn from "../button/selectGifBtn"
import SelectFileBtn from "../button/selectFileBtn"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios"
function createTweetForm() {
    let { register, handleSubmit, formState, reset } = useForm()
    let { isDirty, isSubmitting } = formState
    let [media, setMedia] = useState<{ url: string, file: any }[]>([])


    let Post = async ({ title }: { title?: string | undefined }): Promise<void> => {

        if (!title?.length && !media.length) return
        let url = process.env.NEXT_PUBLIC_TWEET_API + 'create'
        let data = new FormData()
        for (const file of media) {
            data.append('files', file.file)
        }
        if (title) data.append('title', title)
        try {
            let Tweet = await axios.post(url, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            })
            setMedia([])
            reset()
        } catch (error) {
            if (error)
                console.log(error);
        }
    }
    isDirty = isDirty || (!media.length)

    return (
        <MaxWidthWrapper>
            <div className="flex gap-2 p-2 bg-black text-white items-start ">
                <div className="w-12 h-12">
                    <CurrentUserImage />
                </div>
                <form onSubmit={handleSubmit(Post)}
                    className=" space-y-4 flex-1 p-2 ">
                    <div className="flex flex-col justify-center flex-1 border-b-[1px] border-solid border-zinc-700">
                        <input
                            {...register('title')}
                            type="text"
                            className="text-lg p-2 placeholder:text-zinc-600 placeholder:font-medium"
                            placeholder="what is happening?!" />
                        <div className="media-container gap-2">
                            {media.map((el, ind) => {
                                return <div
                                    className="relative overflow-hidden rounded-lg"
                                    key={`${el.file.name}-${Date.now().toString()}`} >
                                    <div
                                        onClick={() => setMedia(media => media.filter((el, index) => index !== ind))}
                                        className=" absolute cursor-pointer top-4 left-4 bg-[#00000070] rounded-full p-2">
                                        <IoCloseSharp size={24} />
                                    </div>
                                    {(el.file.type as string).startsWith('image') && (
                                        <img src={el.url} className="object-cover w-full h-full" />
                                    )}
                                    {(el.file.type as string).startsWith('video') && (
                                        <video controls >
                                            <source src={el.url} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2 p-2">
                        <div className="relative flex gap-2">
                            <SelectFileBtn setMedia={setMedia} />
                            <SelectGifBtn />
                        </div>
                        <button
                            disabled={isSubmitting}
                            className="text-black bg-white rounded-full px-4 py-2">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </MaxWidthWrapper>
    )
}

export default createTweetForm