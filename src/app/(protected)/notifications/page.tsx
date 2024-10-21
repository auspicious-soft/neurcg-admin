/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { sendNewsletterService, sendNotificationToSpecificUsers, sendNotificationToAllService, getAllUserService } from '@/service/admin-service';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import Select, { StylesConfig } from 'react-select'

const customStyles: StylesConfig<any, true> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
        ? '#E87223'
        : isFocused
          ? '#E87223'
          : undefined,
    color: isDisabled ? '#ccc' : isSelected ? 'white' : 'black',
    cursor: isDisabled ? 'not-allowed' : 'default',
    padding: 6,
    ':active': {
      ...styles[':active'],
      backgroundColor: !isDisabled ? (isSelected ? '#E87223' : '#f9a66f') : undefined,
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#E87223', // Orange background for the chip
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white', // White text inside the chip
    padding: 6,
    borderRadius: '2rem',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: '#E87223',
      color: 'white',
    },
  }),
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<'notification' | 'newsletter'>('notification');
  const [sendToSpecific, setSendToSpecific] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '' });
  const [isPending, startTranstion] = useTransition()
  const { data } = useSWR('/admin/users', getAllUserService, { revalidateOnFocus: false })
  const usersFromDatabase = data?.data?.data || []
  const modifiedUsersFromDatabase = usersFromDatabase.map((user: any) => {
    return {
      label: user?.firstName + ' ' + user?.lastName,
      value: user?._id
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const handleSelectChange = (selected: any) => {
    setSelectedOptions(selected)
  }
  const handleSubmit = async () => {
    const title = formData.title;
    const message = formData.message;
    if (!title || !message) return toast.warning('Please fill all fields')
    if (activeTab === 'notification') {
      startTranstion(async () => {
        if (!sendToSpecific) {
          const response = await sendNotificationToAllService({ title, message })
          if (response.status) toast.success(response.data.message)
          else toast.error('Failed to send newsletter')
        }
        else {
          const response = await sendNotificationToSpecificUsers({ title, message, ids: selectedOptions.map((selected: any) => selected?.value) })
          if (response.status) toast.success(response.data.message)
          else toast.error('Failed to send notification to selected users')
          setSelectedOptions([])
        }
      })
    }
    else {
      startTranstion(async () => {
        const response = await sendNewsletterService({ title, message })
        if (response.status === 200) {
          toast.success(response.data.message)
        }
        else {
          toast.error('Failed to send newsletter')
        }
      })
    }
    setFormData({ title: '', message: '' })
  }

  return (
    <form>
      {/* Tabs */}
      <div className="mb-[30px] flex gap-3">
        <button
          className={`px-10 py-4 rounded-[5px] ${activeTab === 'notification' ? 'bg-[#E87223] text-white' : 'border border-[#6B6B6B] text-[#6B6B6B]'}`}
          onClick={() => setActiveTab('notification')}
        >
          Notifications
        </button>
        <button
          className={`px-10 py-4 rounded-[5px] ${activeTab === 'newsletter' ? 'bg-[#E87223] text-white' : 'border border-[#6B6B6B] text-[#6B6B6B]'}`}
          onClick={() => setActiveTab('newsletter')}
        >
          Newsletter
        </button>
      </div>

      {/* Common fields */}
      <div>
        <div className="mb-4">
          <input
            type="text"
            required
            name="title"
            placeholder="Enter title"
            className="w-full py-[14px] px-7 border border-[#FFE2CE] rounded-[5px] mb-[10px] "
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="message"
            required
            placeholder="Enter message!"
            className="w-full py-[14px] px-7 border border-[#FFE2CE] rounded-[5px] "
            rows={4}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      {/* Conditional fields for Notifications */}
      {activeTab === 'notification' && (
        <div className="">
          <label className="custom-checkbox   ">
            <input
              type="checkbox"
              checked={sendToSpecific}
              onChange={() => setSendToSpecific(!sendToSpecific)}
              className=""
            />
            <span className='pl-7 text-[#686C78] text-base leading-7 '> Send to a specific person</span>
          </label>
          {sendToSpecific && (
            <div className="mt-7 border border-[#FFE2CE] py-4 px-7 rounded-[5px] bg-white ">
              {/* Person selection dropdown */}
              <Select value={selectedOptions} onChange={handleSelectChange} required options={modifiedUsersFromDatabase} isMulti closeMenuOnSelect={false} styles={customStyles} className='outline-none border-none' />
            </div>
          )}
        </div>
      )}

      {/* Send Button */}
      <div className='flex justify-end mt-10  '>
        <button
          type='submit'
          disabled={isPending}
          onClick={handleSubmit}
          className="bg-[#E87223] text-sm text-white px-7 py-3 rounded "
        >
          {!isPending ? 'Send' : 'Sending...'}
        </button>
      </div>
    </form>
  )
};

export default Page;
