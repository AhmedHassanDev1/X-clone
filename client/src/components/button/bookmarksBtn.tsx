"use client"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { AddbookmarksMutation, removebookmarksMutation } from "@/graphql/mutations/interactions";

type bookmarksProps = {

  tweet_id: string | undefined
  is_bookmark: boolean | undefined
}

function bookmarksBtn({ tweet_id, is_bookmark }: bookmarksProps) {
  let [isBookmarks, Bookmarks] = useState<boolean | undefined>(is_bookmark)
  let variables = { tweet_id }

  let [addBookmarks] = useMutation(AddbookmarksMutation, {
    variables,
    onCompleted: (res) => console.log(res),
    onError: () => Bookmarks(!isBookmarks)
  })
  let [removeBookmarks] = useMutation(removebookmarksMutation, {
    variables,
    onCompleted: (res) => console.log(res),
    onError: () => Bookmarks(!isBookmarks)
  })
  let handleClick = () => {
    Bookmarks(!isBookmarks)
    if (!isBookmarks) {
      addBookmarks()
    } else {
      removeBookmarks()
    }
  }
  return (
    <button
      onClick={handleClick}
      className={`${isBookmarks?'text-sky-500':'text-zinc-500'} text-xl hover:text-sky-500 p-1 rounded-full hover:bg-[#6ed8fc3c]`}>
      {isBookmarks ? (
        <PiBookmarkSimpleFill />
      ) : (
        <PiBookmarkSimpleBold />
      )}
    </button>
  )
}

export default bookmarksBtn