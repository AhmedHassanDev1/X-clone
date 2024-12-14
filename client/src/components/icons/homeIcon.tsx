"use client"
import { RiHome5Line } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
function homeIcon({ active=true }: { active: boolean }) {
    return (
        <div className="icon">
            {
                active ? (
                    <GoHomeFill />
                ) : (
                    <RiHome5Line />
                )
            }
        </div>
    )
}

export default homeIcon