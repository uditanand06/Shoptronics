
import {BadgeCheckIcon} from '@heroicons/react/outline'
import RoundCarousel from '../roundCarousel'

const Creator = () => {
  return (
    <div className='flex flex-col items-center pt-20 space-y-6 h-[75vh]'> 
        <div className='btn-custom rounded-3xl space-x-2'>
            <BadgeCheckIcon className='w-6 h-6'/>
            <div>Best Selling</div>
        </div>
        <div className='text-h1'>Top Creators</div>
        <RoundCarousel />
    </div>
  )
}

export default Creator