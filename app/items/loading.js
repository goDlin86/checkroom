import { TextShimmer } from '../../components/TextShimmer'

export default function Loading() {
  return (
    <div className='text-center py-32'>
      <TextShimmer duration={0.5}>
        Loading...
      </TextShimmer>
    </div>
  )
}