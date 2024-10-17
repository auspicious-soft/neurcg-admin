"use client"
import { useState } from 'react';

const Page = () => {
  const [activeTab, setActiveTab] = useState<'notification' | 'newsletter'>('notification');
  const [sendToSpecific, setSendToSpecific] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  
  // Mocked data for users, in a real app, you'd fetch this from the backend
  const usersFromDatabase = [
    'Humanshi Jangra',
    'John Doe',
    'Jane Smith',
    'Chris Evans',

  ];

  const handlePersonSelect = (person: string) => {
    setSelectedPersons((prev) => [...prev, person]);
  };

  const handlePersonRemove = (person: string) => {
    setSelectedPersons((prev) => prev.filter((p) => p !== person));
  };

  const handleSubmit = () => {
    if (activeTab === 'notification') {
      // Handle sending notification logic here
      console.log('Sending notification', selectedPersons);
    } else {
      // Handle sending newsletter logic here
      console.log('Sending newsletter');
    }
  };

  return (
    <div>
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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter title"
          className="w-full py-[14px] px-7 border border-[#FFE2CE] rounded-[5px] mb-[10px] "
        />
        <textarea
          placeholder="Enter your text here!!!"
          className="w-full py-[14px] px-7 border border-[#FFE2CE] rounded-[5px] "
          rows={4}
        ></textarea>
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
              <select
                onChange={(e) => handlePersonSelect(e.target.value)}
                className="w-full "
              >
                <option value="" disabled selected>Select Name</option>
                {usersFromDatabase.map((user) => (
                  <option key={user} value={user} className=' '>
                    {user}
                  </option>
                ))}
              </select>

              {/* Selected persons */}
              <div className="flex flex-wrap ">
                {selectedPersons.map((person) => (
                  <div key={person} className="bg-[#E87223] text-white    px-3 py-1 rounded m-1 flex items-center">
                    {person}
                    <button
                      className="ml-2 text-white  "
                      onClick={() => handlePersonRemove(person)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Send Button */}
      <div className='flex justify-end mt-10  '>
      <button
        onClick={handleSubmit}
        className="bg-[#E87223] text-sm text-white px-7 py-3 rounded "
      >
        Send
      </button>
      </div>
    </div>
  );
};

export default Page;
