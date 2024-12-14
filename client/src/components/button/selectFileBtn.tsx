"use client"
import { FiImage } from "react-icons/fi";

function selectFileBtn({ setMedia }:{setMedia:any}) {
    let uniqueID = Date.now().toString()

    let onSelect=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files ? event.target.files[0] : null;
          
       if(file){
        setMedia((media)=>[...media,{file,url:URL.createObjectURL(file)}])

       }
    }
    return (
        <div className="text-xl text-sky-600 ">
            <label htmlFor={uniqueID}>
                <FiImage />
            </label>
            <input
                onChange={onSelect}
                type="file"
                accept="image/* , video/*"
                className="hidden"
                id={uniqueID} />
        </div>
    )
}

export default selectFileBtn