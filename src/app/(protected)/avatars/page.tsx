/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import Cropper, { Area } from "react-easy-crop";
import Image from "next/image";
import { DeleteIcon } from "@/utils/svgIcons";
import deleteCross from "@/assets/images/delete.svg";
import useSWR from "swr";
import { getAvatarsService, deleteAvatarService } from "@/service/admin-service";
import { toast } from "sonner";

const AvatarSection = () => {
  const { data, isLoading, mutate } = useSWR('/admin/avatars', getAvatarsService, { revalidateOnFocus: false });
  const avatarsFetched = data?.data?.data || [];
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [deleteAvatarId, setDeleteAvatarId] = useState<string | null>(null);

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

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback(async () => {
    if (!selectedFile || !croppedAreaPixels) return null;

    const image = new window.Image();
    image.src = selectedFile;

    return new Promise<string | null>((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return resolve(null);
        canvas.width = 169;
        canvas.height = 158;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          169,
          158
        );
        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  }, [selectedFile, croppedAreaPixels]);

  const handleSaveAvatar = async () => {
    const croppedImage = await getCroppedImg();
    if (croppedImage) {
      setIsModalOpen(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (deleteAvatarId) {
      try {
        await deleteAvatarService(`/admin/avatars/${deleteAvatarId}`);
        toast.success('Avatar deleted successfully');
        mutate()
        setIsDeleteOpen(false);
      } catch (error) {
        toast.error('Failed to delete avatar');
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-end">
        <button
          className="bg-[#E87223] text-white px-4 py-2 rounded"
          onClick={() => document.getElementById("avatarInput")?.click()}
        >
          Add Avatar
        </button>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {!isLoading ? avatarsFetched.map((avatar: any, index: string) => (
          <div key={index} className="relative group">
            <Image width={300} height={300} src={`https://picsum.photos/200/300`} alt="Avatar" className="rounded-[5px] object-cover" />

            <div className="absolute left-1/2 -translate-x-1/2 bottom-[14px]">
              <button
                className="justify-center bg-[#E87223] text-white text-xs flex items-center gap-2.5 py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  setDeleteAvatarId(avatar._id);
                  setIsDeleteOpen(true);
                }}
              >
                <DeleteIcon />
                Remove
              </button>
            </div>
          </div>
        ))
          :
          <div className="flex justify-center items-center col-span-6 h-[300px]">
            <span className="text-lg">Loading...</span>
          </div>
        }
      </div>

      <input
        type="file"
        id="avatarInput"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Crop Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Avatar"
        bodyOpenClassName="overflow-hidden"
        className="bg-white w-[90%] rounded-[20px] p-[40px] h-full max-h-[90vh] overflow-y-scroll"
        overlayClassName="z-[5] w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-lg mb-4">Crop your avatar</h2>
        {selectedFile && (
          <div className="relative w-full h-[400px]">
            <Cropper
              image={selectedFile}
              crop={crop}
              zoom={zoom}
              aspect={169 / 158}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#E87223] text-white px-4 py-2 rounded mr-2"
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

      <Modal
        isOpen={isDeleteOpen}
        onRequestClose={() => setIsDeleteOpen(false)}
        contentLabel="Delete Avatar"
        bodyOpenClassName="overflow-hidden"
        className="max-w-[584px] mx-auto bg-white rounded-xl w-full p-5 bg-flower"
        overlayClassName="z-[5] w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <Image src={deleteCross} alt="delete" height={174} width={174} className="mx-auto" />
        <h2 className="text-[20px] text-center leading-normal">Are you sure you want to Delete?</h2>
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={handleDeleteAvatar}
            className="py-[10px] px-8 bg-[#E87223] text-white rounded"
          >
            Yes, Delete
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteOpen(false)}
            className="py-[10px] px-8 bg-[#3A2C23] text-white rounded"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarSection;