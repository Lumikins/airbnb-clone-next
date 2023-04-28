"use client"

interface AvatarProps {
  src: string | null | undefined
}

import Image from "next/image";

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return ( 
    <Image className="rounded-full" height={30} width={30} alt="avatar" src={src || "/images/avatar.png"} />
   );
}
 
export default Avatar;