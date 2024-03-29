import React from 'react'

const NewsLetter = () => {
  return (
    <div className='w-screen  bg-gradient-to-r from-fuchsia-600 to-pink-600 p-10 flex-col justify-center items-center space-y-5 '>
        <div className='text-white text-3xl sm:text-5xl font-bold text-center'>Never miss a drop</div>
        <div className='text-white text-xl sm:text-3xl font-bold text-center'>Subscribe for the latest news, drops & collectibles</div>
        <div className="form-control text-center container mx-auto">
            <label className="input-group flex justify-center">
                <span><button>Subscribe</button></span>
                <input type="text" placeholder="info@site.com" className="input input-bordered" />
            </label>
        </div>
        <div className='text-white text-center'>
            After reading the <span className='text-primary'>Privacy Notice</span>, you may subscribe for our newsletter to get special offers and occasional surveys delivered to your inbox. Unsubscribe at any time by clicking on the link in the email.
        </div>
        <div className="form-control grid place-items-center">
            <label className="label cursor-pointer space-x-2">
                <span className="label-text text-white">By entering my email and subscribing I confirm and agree to the above.</span> 
                <input type="checkbox" className="checkbox checkbox-secondary border-white" />
            </label>
        </div>
    </div>
  )
}

export default NewsLetter