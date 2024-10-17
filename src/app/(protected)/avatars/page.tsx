"use client"
import Image from 'next/image';
import { useState } from 'react';
import AvatarEditor from 'react-avatar-edit';
import Modal from 'react-modal';


const Page = () => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setSelectedFile(reader.result as string);
          setIsModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  // Handle the cropping event
  const onCrop = (croppedImage: string) => {
    setPreview(croppedImage);  // Save cropped image temporarily
  };

  // Handle saving the avatar with specific dimensions (169x158)
  const handleSaveAvatar = () => {
    if (preview) {
      const img = new window.Image();  // Use native browser Image()
      img.src = preview;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 169;
        canvas.height = 158;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 169, 158);
          const resizedImage = canvas.toDataURL();
          setAvatars((prevAvatars) => [...prevAvatars, resizedImage]);
        }
      };

      setIsModalOpen(false);
    }
  };
  const handleDeleteAvatar = (index: number) => {
    setAvatars((prevAvatars) => prevAvatars.filter((_, i) => i !== index));
  };

  return (
    <div className="">
        <div className='flex justify-end'>
        <button
        className="bg-orange-500 text-white px-4 py-2 rounded"
        onClick={() => document.getElementById('avatarInput')?.click()}
      >
        Add Avatar
      </button>
        </div>
      {/* Avatar Grid */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {avatars.map((avatar, index) => (
          <div key={index} className="relative group">
            <Image src={avatar} width={169} height={158} alt="Avatar" className="rounded-full w-20 h-20 object-cover" />
          
            <button
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDeleteAvatar(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        id="avatarInput"
        className="hidden "
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* React Modal for cropping tool */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Avatar"
        className="modal max-w-[1180px] px-8 bg-white mx-auto rounded-[20px] w-full max-h-[90vh] overflow-scroll overflo-custom "
        overlayClassName="w-full h-full z-[5] fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-lg mb-4">Crop your avatar</h2>
        {selectedFile && (
        <AvatarEditor
         width={300}
         height={300}
         onCrop={onCrop}
         src={selectedFile}  // `image` instead of `src`
         borderRadius={5}  
        />
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSaveAvatar}
          >
            Save Avatar
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
