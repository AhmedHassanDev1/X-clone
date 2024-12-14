
import { homeRoute,notificationsRoute,messagesRoute,bookmarksRoute } from "./router"
import homeIcon from "@/components/icons/homeIcon";
import NotificationsIcon from "@/components/icons/NotificationsIcon"; 
import BookmarksIcon from "@/components/icons/bookmarksIcon";
import MessagesIcon from "@/components/icons/messagesIcon";
export const asideBarItmes=[
    {
        url:homeRoute,
        title:'home',
        icon:homeIcon,
        
    },
    {
        url:notificationsRoute,
        title:'Notifications',
        icon:NotificationsIcon,
        
    },
    {
        url:bookmarksRoute,
        title:'bookmarks',
        icon:BookmarksIcon,
    },
    {
        url:messagesRoute,
        title:'messages',
        icon:MessagesIcon,
    },
]

// {
//     url:exploreRoute,
//     title:'explor',
//     icon:IoMdSearch,
//     active_icon:IoSearch
// },
// {
//     url:notificationsRoute,
//     title:'notifications',
//     icon:IoNotificationsOutline,
//     active_icon:IoNotificationsSharp
// },
// {
//     url:messagesRoute,
//     title:"messages",
//     icon:HiOutlineMail,
//     active_icon:MdEmail
// },
// {
// url:messagesRoute,
// title:"bookmarks",
// icon:PiBookmarkSimpleLight,
// active_icon:PiBookmarkSimpleFill
// }