"use client"
import SearchBar from '@/components/SearchBar'
import UserTable from '@/components/UserTable';
import React from 'react'

const userData = [
    { id: '101', name: 'Shakimblee Brower', subscriptionType: 'Free', email: 'love.marisa@mail.com' },
    { id: '102', name: 'bullock,jamarr', subscriptionType: 'Premium', email: 'love.marisa@mail.com' },
    { id: '103', name: 'Terrie Robbins', subscriptionType: 'Enterprise', email: 'love.marisa@mail.com' },
    { id: '104', name: 'Sarah Rich', subscriptionType: 'Free', email: 'love.marisa@mail.com' },
    { id: '105', name: 'Malaysia Hayes', subscriptionType: 'Premium', email: 'love.marisa@mail.com' },
    { id: '106', name: 'Theresa Parham', subscriptionType: 'Enterprise', email: 'love.marisa@mail.com' },
  ];
export default function Page() {
  return (
    <div>
    <div className='flex justify-end mb-5'>
    <SearchBar />
    </div>
      <UserTable customers={userData} />
    </div>
  )
}