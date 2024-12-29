import not from './../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div>
      <img src={not} className='w-full h-full' alt="Not Found" />
    </div>
  )
}
