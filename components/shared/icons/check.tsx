
interface CheckProps {
  className : string;
}
export default function Check({className} :CheckProps)  {
  return (
    <svg className={className} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.875 9.5L8.625 11.25L12.125 7.75M17.375 9.5C17.375 13.8492 13.8492 17.375 9.5 17.375C5.15076 17.375 1.625 13.8492 1.625 9.5C1.625 5.15076 5.15076 1.625 9.5 1.625C13.8492 1.625 17.375 5.15076 17.375 9.5Z" stroke="#1D66D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}
