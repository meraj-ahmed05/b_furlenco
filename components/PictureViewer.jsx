import React from 'react'
import {MdClose} from 'react-icons/md'

const PictureViewer = ({ img, setPreview }) => {
    return (
        
        <div 
        onClick={()=>setPreview(false)}
        className="fixed top-0 left-0 z-30 w-screen p-4 h-screen bg-black/30 backdrop-blur-sm flex justify-center items-center">
            <div className="max-w-[80%]  bg-slate-50 relative rounded-xl overflow-hidden">
                <img
                    className="cursor-zoom-out w-full h-full"
                    src={img}
                    alt="" />
                <button 
                onClick={()=>setPreview(false)}
                className="absolute  right-[3%] top-[3%] hover:bg-slate-700 hover:text-slate-50 text-slate-700 cursor-pointer rounded-full border p-2">
                    <MdClose/>
                </button>

            </div>


        </div>
    )
}

export default PictureViewer