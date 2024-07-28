import React from 'react'

const Page = () => {
  return (
    <div>
  <div className="rounded-lg border border-gray-500 p-4">
    <h1 className="text-center text-2xl tracking-wide">Contact Us</h1>
    <hr className="mx-auto mt-4 w-[10%]" />
    <p className="text-center text-slate-500">Have a question, need assistance? We&apos;re just a message away!</p>

    <div>
      <div className="flex w-full items-center justify-between py-2">
        <div>
          <h3 className="text-xl tracking-wide">Location</h3>
          <p className="text-slate-500">Delhi</p>
        </div>
        <div className="w-[55%] rounded-lg border">
          <input type="text" placeholder="Your Name*" className="w-full rounded-lg p-2 outline-none" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between py-2">
        <div>
          <h3 className="text-xl tracking-wide">Email</h3>
          <p className="text-slate-500">contactus@mineart.com</p>
        </div>
        <div className="w-[55%] rounded-lg border">
          <input type="text" placeholder="Your Email*" className="w-full rounded-lg p-2 outline-none" />
        </div>
      </div>
      <div className="flex w-full justify-between py-2">
        <div>
          <h3 className="text-xl tracking-wide">Location</h3>
          <p className="text-slate-500">Delhi</p>
        </div>

        <div className="w-[55%] text-center">
          <div className="w-full border">
            <textarea aria-expanded="false" rows="5" placeholder="Your Message*" className="w-full rounded-lg p-2 outline-none" />
          </div>
          <button className="mt-4 rounded-full bg-black p-2 px-4 text-slate-200">Send</button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Page