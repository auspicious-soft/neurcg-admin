/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useRef } from 'react';



const Referral = (props: any) => {
    const { data } = props
    const textRef = useRef<HTMLParagraphElement>(null);
    const handleCopy = () => {
        if (textRef.current) {
            const textToCopy = textRef.current.textContent || '';
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Referral link copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    };

    return (
        <div className='p-5 md:p-[30px] rounded-lg bg-white'>
            <h2 className='section-title mb-5'>Referral</h2>
            <div className='refer-wrap flex justify-between items-center mb-[5px]'>
                <h2 className='text'>Number of referrals</h2>
                <h3 className='rounded-[50px] text-[#3A2C23] text-sm text-center py-[5px] w-[54px] border border-[#FFE2CE] bg-[#FFEEE2]'>{data?.referredCount}</h3>
            </div>
            <div className='refer-wrap flex justify-between items-center mb-[5px]'>
                <h2 className='text'>Referal bonus points</h2>
                <h3 className='rounded-[50px] text-[#3A2C23] text-sm text-center py-[5px] w-[54px] border border-[#FFE2CE] bg-[#FFEEE2]'>{data?.referredCount * 10}</h3>
            </div>
            {/* <div className='refer-wrap flex justify-between items-center '>
                <h2 className='text'>Earned €</h2>
                <h3 className='rounded-[50px] text-[#3A2C23] text-sm text-center py-[5px] w-[54px] border border-[#FFE2CE] bg-[#FFEEE2]'>{data?.referralEarnings}</h3>
            </div> */}
            <div>
                <h3 className='text-base text-[#3A2C23] font-semibold mt-[18px] mb-5'>Referral Link</h3>
                <p
                    ref={textRef}
                    className='custom-refer w-full text-[#828282] border border-[#FFE2CE] px-5 py-3 rounded-[5px] md:whitespace-nowrap md:text-ellipsis md:overflow-hidden mb-[10px] '
                >{data?.myReferralCode }
                </p>
                <button
                    onClick={handleCopy}
                    className='w-full text-sm bg-[#E87223] text-white px-[28px] py-[10px] rounded-[5px]'
                >Copy URL
                </button>
            </div>
        </div>
    );
}

export default Referral;