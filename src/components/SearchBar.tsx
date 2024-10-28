'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SearchIcon } from "@/utils/svgIcons";
import React, { useEffect, useState } from 'react';

interface SearchBarProps {
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = (props: SearchBarProps) => {
    const { setQuery } = props;
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue) {
                setQuery(`description=${inputValue}`);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, setQuery]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchClick = () => {
        if (inputValue) {
            setQuery(`description=${inputValue}`);
        }
    };

    return (
        <div className='md:w-[276px] w-full'>
            <label htmlFor="" className='relative flex w-full '>
                <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Search"
                    className='placeholder:text-[#6B6B6B] w-full px-5 pl-[65px] focus-visible:outline-none bg-[#F5F7FA] rounded-r-none rounded-l-[8px] py-[8px] h-[46px] border border-r-0 border-[#eb823c33]'
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <span className='absolute left-7 top-[14px] '><SearchIcon /> </span>
                <button
                    type="button"
                    className='bg-[#E87223] rounded-lg text-white px-5 text-sm h-[46px] ml-[-5px]'
                    onClick={handleSearchClick}
                >
                    Go
                </button>
            </label>
        </div>
    );
}

export default SearchBar;