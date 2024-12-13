/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useCallback, useEffect, useTransition } from "react";
import Modal from "react-modal";
import Cropper, { Area } from "react-easy-crop";
// import Image from "next/image";
import { DeleteIcon } from "@/utils/svgIcons";
import deleteCross from "@/assets/images/delete.svg";
import useSWR from "swr";
import { getAvatarsService, deleteAvatarService, addAvatarService } from "@/service/admin-service";
import { toast } from "sonner";
import { deleteFileFromS3 } from "@/actions";
import Image from "next/image";
import { getAvatarImageUrl } from "@/utils";
import ReactLoading from 'react-loading';


const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', reject);
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getRadianAngle = (degreeValue: number) => {
  return (degreeValue * Math.PI) / 180;
};

const AvatarSection = () => {
  const { data, isLoading, mutate } = useSWR('/admin/avatars', getAvatarsService);
  const [avatarsFetched, setAvatarsFetched] = useState([]);
  const [avatarImages, setAvatarImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchAvatarImages = async () => {
      if (data?.data?.data) {
        const avatars = data.data.data;
        setAvatarsFetched(avatars);

        const imagePromises = avatars.map(async (avatar: any) => {
          const imageUrl = await getAvatarImageUrl(avatar);
          return { [avatar._id]: imageUrl };
        });

        const imageResults = await Promise.all(imagePromises);
        const imagesMap = imageResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setAvatarImages(imagesMap);
      }
    };

    fetchAvatarImages();
  }, [data]);
  const [selectedFile, setSelectedFile] = useState<{ file: File, preview: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [deleteAvatarId, setDeleteAvatarId] = useState<any | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isPending, startTransition] = useTransition()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile({
        file,
        preview: URL.createObjectURL(file)
      });
      setIsModalOpen(true);
    }
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback(async (): Promise<Blob | null> => {
    try {
      if (!selectedFile?.preview || !croppedAreaPixels) return null;

      const image = await createImage(selectedFile.preview);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return null;
      }

      // Calculate the desired width and height with a higher resolution
      const targetWidth = 500; // Increased from 169
      const targetHeight = 466; // Increased from 158 (maintaining aspect ratio)

      // Set canvas size for high quality
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Get the device pixel ratio
      const pixelRatio = window.devicePixelRatio;

      // Scale the canvas for high DPI displays
      canvas.width = targetWidth * pixelRatio;
      canvas.height = targetHeight * pixelRatio;

      // Scale the context to ensure correct drawing
      ctx.scale(pixelRatio, pixelRatio);

      // Set canvas properties for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Calculate scale factor based on image dimensions and crop area
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Calculate actual pixel sizes
      const pixelCrop = {
        x: croppedAreaPixels.x * scaleX,
        y: croppedAreaPixels.y * scaleY,
        width: croppedAreaPixels.width * scaleX,
        height: croppedAreaPixels.height * scaleY,
      };

      // Save context
      ctx.save();

      // Move the canvas context to the center
      ctx.translate(canvas.width / (2 * pixelRatio), canvas.height / (2 * pixelRatio));

      // Rotate the canvas context if there's rotation
      ctx.rotate(getRadianAngle(rotation));

      // Draw the image with the calculated crop values
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        -targetWidth / 2,
        -targetHeight / 2,
        targetWidth,
        targetHeight
      );

      // Restore context
      ctx.restore();

      // Create blob with high quality
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          selectedFile.file.type,
          1 // Maximum quality
        );
      });
    } catch (error) {
      console.error('Error cropping image:', error);
      return null;
    }
  }, [selectedFile, croppedAreaPixels, rotation]);

  const handleSaveAvatar = async () => {
    if (!selectedFile) return;

    startTransition(async () => {
      try {
        const croppedBlob = await getCroppedImg();
        if (!croppedBlob) {
          toast.error('Failed to crop image');
          return;
        }
        const timestamp = Date.now();
        const extension = selectedFile.file.name.split('.').pop();
        const file = new File([croppedBlob], selectedFile.file.name, { type: croppedBlob.type })
        const filename = `avatar-${timestamp}.${extension}`;
        const avatarUrl = `avatars/${filename}`
        // Get signed URL for upload
        // const uploadUrl = await generateSignedUrlToUploadOn(filename, croppedBlob.type);

        // // Upload to S3
        // await fetch(uploadUrl, {
        //   method: 'PUT',
        //   body: croppedBlob,
        //   headers: {
        //     'Content-Type': croppedBlob.type,
        //   },
        // });

        // if (avatarUrl) {
        // avatarUrl = avatarUrl.replace(process.env.NEXT_PUBLIC_AWS_BUCKET_PATH as string, '');
        // }

        // Save to backend
        const formData = new FormData();
        formData.append('file', file);
        formData.append('avatarUrl', avatarUrl);
        formData.append('name', filename);

        await addAvatarService('/admin/avatars', formData);
        toast.success('Avatar uploaded successfully');
        setIsModalOpen(false);

        // Cleanup
        if (selectedFile.preview) {
          URL.revokeObjectURL(selectedFile.preview);
        }
        mutate()
        setSelectedFile(null)
      } catch (error) {
        console.error('Error uploading avatar:', error)
        toast.error('Failed to upload avatar')
      }
    })
  }

  const handleDeleteAvatar = async () => {
    if (deleteAvatarId) {
      try {
        const res = await deleteAvatarService(`/admin/avatars/${deleteAvatarId.avatarIdInDb}`)
        if (res.status == 200) {
          await deleteFileFromS3(`avatars/${deleteAvatarId.name}`)
          toast.success('Avatar deleted successfully')
          mutate()
          setIsDeleteOpen(false)
        }
      } catch (error) {
        toast.error('Failed to delete avatar');
      }
    }
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (selectedFile?.preview) {
        URL.revokeObjectURL(selectedFile.preview);
      }
    };
  }, [selectedFile]);

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
      <div className="grid grid-cols-6 gap-5 mt-5">
        {!isLoading ? avatarsFetched.map((avatar: any, index: any) => (
          <div key={index} className="relative group">
            <Image
              width={300}
              height={300}
              src={avatarImages[avatar._id] ?? `https://picsum.photos/200/300`}
              alt="Avatar"
              className="rounded-[5px] object-cover"
            />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[14px]">
              <button
                className="justify-center bg-[#E87223] text-white text-xs flex items-center gap-2.5 py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  setDeleteAvatarId({
                    avatarIdInDb: avatar._id,
                    name: avatar.name
                  });
                  setIsDeleteOpen(true);
                }}
              >
                <DeleteIcon />
                Remove
              </button>
            </div>
          </div>
        )) : (
          <div className="flex justify-center items-center col-span-6 h-[300px]">
            <ReactLoading type={'spin'} color={'#e87223'} height={'40px'} width={'40px'} />
          </div>
        )}
      </div>

      <input
        type="file"
        id="avatarInput"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          if (selectedFile?.preview) {
            URL.revokeObjectURL(selectedFile.preview);
          }
          setSelectedFile(null);
        }}
        contentLabel="Edit Avatar"
        bodyOpenClassName="overflow-hidden"
        className="bg-white w-[90%] rounded-[20px] p-[40px] h-full max-h-[90vh] overflow-y-scroll"
        overlayClassName="z-[5] w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-lg mb-4">Crop your avatar</h2>
        {selectedFile?.preview && (
          <div className="relative w-full h-[400px]">
            <Cropper
              image={selectedFile.preview}
              crop={crop}
              zoom={zoom}
              aspect={169 / 158}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              rotation={rotation}
              onRotationChange={setRotation}
            />
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#E87223] text-white px-4 py-2 rounded mr-2"
            onClick={handleSaveAvatar}
            disabled={isPending}
          >
            {isPending ? 'Uploading...' : 'Save Avatar'}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setIsModalOpen(false);
              if (selectedFile?.preview) {
                URL.revokeObjectURL(selectedFile.preview);
              }
              setSelectedFile(null);
            }}
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