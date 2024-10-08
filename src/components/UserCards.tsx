import { UserIcon } from '@/utils/svgIcons';
import React from 'react';
interface UserCardProps {
    text: string;
    value: number;
}
const UserCards:React.FC<UserCardProps> = ({text, value}) => {
    return (
        <div className='flex gap-2 justify-between items-end p-5 bg-white rounded-[10px] relative z-[1] overflow-hidden'>
           <div>
                <h3 className='font-[500] text-base text-[#3A2C23] mb-4'>{text} </h3>
                <h2 className='text-2xl md:text-[34px] font-semibold text-[#E87223] '>{value} </h2>
           </div>
           <div>
            <p className='circle-bg md:pr-[7px] pb-[2px]'><UserIcon /></p>
           </div>
        </div>
    );
}

export default UserCards;
