"use client"
import { IoPersonSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
function profileIcon({ active=false }: { active: boolean }) {
    return (
        <div className="icon">
            {
                active ? (
                    <IoPersonSharp />
                ) : (
                    <IoPersonOutline />
                )
            }
        </div>
    )
}

export default profileIcon