"use client"
import { useMutation } from "@apollo/client"
import { removeLikeMutation, AddLikeMutation } from "@/graphql/mutations/interactions"
import { useState } from "react"
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { formatCompactNumber } from "@/utils/Format/number";
type LikeProps = {
  tweet_id: string | undefined
  is_like: boolean | undefined
  count_likes: number
}
function likeBtn({ tweet_id, is_like, count_likes }: LikeProps) {
  let variables = { tweet_id }
  let [isLike, setLike] = useState(is_like)
  let [count, setCount] = useState<number>(count_likes)

  let [addLike] = useMutation(AddLikeMutation, {
    variables,
    onCompleted: (res) => console.log(res),
    onError: () => {
      setLike(!isLike)
      setCount(count--)
    }
  })
  let [removeLike] = useMutation(removeLikeMutation, {
    variables,
    onCompleted: (res) => console.log(res),
    onError: (err) => {
      setLike(!isLike)
      setCount(count++)
    }
  })

  let handleClick = () => {

    if (!isLike) {
      setCount(count => count + 1)
      addLike()
    } else {
      setCount(count => count - 1)
      removeLike()
    }
    setLike(!isLike)
  }
  return (
    <div className={`flex items-center ${isLike ? 'text-pink-600' : 'text-zinc-500'} hover:text-pink-600`}>
      <button
        onClick={handleClick}

        className={`${isLike ? 'animate-[pulse2_0.3s_linear]' : 'animate-none'} text-xl  p-1 rounded-full hover:bg-[#fc6e6e3c]`} >
        {isLike ? (
          <IoMdHeart />
        ) : (
          <IoMdHeartEmpty />
        )}
      </button>
      {!!count && <p className="text-sm font-bold">{formatCompactNumber(count)}</p>}

    </div>
  )
}

export default likeBtn