
import Image from 'next/image'
import {BadgeCheckIcon, CurrencyRupeeIcon} from '@heroicons/react/solid'





function RoundThumbnail() {
  
  return (
    <div class="card card-compact min-w-[220px] min-h-[220px] bg-base-300 space-y-4 py-6">
        <div className='avatar mx-auto'>
            <div className='w-44 rounded-full'>
                <Image src='/images/pants1.jpg' width={200} height={200} />
            </div>
        </div>
        <div className='mx-auto space-x-2'>
            <BadgeCheckIcon className='w-6 h-6 inline-block text-blue-500'/>
            <span>Park Avenue</span>
        </div>
        <div className='mx-auto space-x-2'>
            <CurrencyRupeeIcon className='w-6 h-6 inline-block text-blue-500'/>
            <span>10,00,000</span>
        </div>
        
    </div>
  )
}


export default RoundThumbnail