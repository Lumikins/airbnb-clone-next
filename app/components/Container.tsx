"use client"
// interface allows to define props to be used in this component globaly - we can use the container anywhere in the app, and the data we pass in that place is the children props passed here
interface ContainerProps {
  children: React.ReactNode
}

const Container:React.FC<ContainerProps> = ({children}) => {
  return ( 
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 xs:px-4">
      {children}
    </div>
   );
}
 
export default Container;