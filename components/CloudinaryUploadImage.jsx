"use client"
import React, { useState } from 'react'

import { CldUploadWidget } from 'next-cloudinary';
import { CldUploadButton } from 'next-cloudinary';




const CloudinaryUploadImage = () => {
  const [result, setResult] = useState();
  const [resource, setResource] = useState();
  return (
    <div className='absolute'>
      <CldUploadWidget
        signatureEndpoint="/api/auth/cloudinarySign"
        uploadPreset="bfurn_preset"
        onUpload={(result, widget) => {
          // console.log('SignedUpload:widget:upload', result);
          setResource(result?.info);
          widget.close();
        }}
        onOpen={(widget) => {
          // console.log('SignedUpload:widget:open', widget);
        }}
        onClose={(widget) => {
          // console.log('SignedUpload:widget:close', widget);
        }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            setResource(undefined);
            e.preventDefault();
            open();
          }
          return (
            <button className={"px-2 py-1 bg-orange-500 rounded-full"} onClick={handleOnClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      <p>URL: { resource?.secure_url }</p>
    </div>
  )
}

export default CloudinaryUploadImage