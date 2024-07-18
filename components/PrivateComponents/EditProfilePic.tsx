import React, { useRef, useState } from "react";
import { Pen } from "lucide-react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE_PIC } from "../../graphql/actions/updateProfilePic";
import useUser from "../../hooks/useUser";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { toast } from "sonner";
import Avatar from "../../public/assets/avatar.png";
import Image from "next/image";
import { refetchUserData } from "../../hooks/refetchUserData";
import { Button } from "../ui/button";
import MainLoading from "../ui/main-loading";

function EditProfilePic() {
  const [open, setOpen] = React.useState(false);
  const { user, loading: LoadingUser } = useUser();
  const [updateUserProfilePic, { data, loading, error }] = useMutation(
    UPDATE_USER_PROFILE_PIC
  );
  const [uploadedImage, setUploadedImage] = React.useState<any | undefined>();

  const [croppedImage, setCroppedImage] = React.useState<any | undefined>();
  const [file, setFile] = useState<File | null>(null);

  const getUploadedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCroppedImage(undefined);
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
          setUploadedImage(avatar);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const cropperRef = useRef<ReactCropperElement>(null);
  const [croppingDone, setCroppingDone] = useState<boolean>(false);

  const onCrop = () => {
    const cropper = cropperRef?.current?.cropper;
  };

  const saveCroppedImage = () => {
    setCroppingDone(true);
    const cropper = cropperRef?.current?.cropper;
    if (cropper) {
      const croppedImageUrl = cropper.getCroppedCanvas().toDataURL();
      setUploadedImage(croppedImageUrl);
      setCroppedImage(croppedImageUrl);
    }
  };

  const updateProfile = async () => {
    try {
      const cropperInstance = cropperRef?.current?.cropper;
      const input: { image: File | null } = {
        image: null,
      };
      if (cropperInstance) {
        cropperInstance.getCroppedCanvas().toBlob(async (blob) => {
          if (blob) {
            input.image = new File([blob], `${file?.name}`, {
              type: blob.type,
            });
          }

          await updateUserProfilePic({
            variables: {
              ...input,
            },
          });
          refetchUserData();
          setOpen(false);
          toast.success("User Image updated successfully");
          handleCancel();
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const cropAndUpdateImage = () => {
    setCroppingDone(false);
    updateProfile();
  };

  const handleCancel = () => {
    setUploadedImage(null);
    setCroppedImage(null);
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-[6px] text-[14px] border border-border rounded-md cursor-pointer transition-all hover:bg-muted">
        Edit image
      </DialogTrigger>
      <DialogContent className=" mx-1 sm:w-[550px] w-[350px] !rounded-3xl">
        <DialogHeader className="mb-6">
          <DialogTitle>Edit profile picture</DialogTitle>
          <DialogDescription>
            Make changes to your profile picture here. Click apply when you are
            done.
          </DialogDescription>
        </DialogHeader>{" "}
        <div className=" flex items-center justify-center sm:-mt-6">
          <label htmlFor="image" className="relative cursor-pointer ">
            <Image
              className={`w-[120px] h-[120px]   rounded-full cursor-pointer border-[3px] border-border p-1 ${
                croppedImage && " border-dashed"
              }`}
              src={
                croppedImage ? croppedImage : user.image ? user.image : Avatar
              }
              alt={user.name}
              width={120}
              height={120}
            />
            <div className="absolute bottom-0 right-0 rounded-full bg-background shadow-xl border border-border  transition-all hover:bg-muted p-1 inline-block w-[32px] h-[32px]">
              <Pen size="20" className="mx-auto " />
            </div>
          </label>
          <input
            className="hidden"
            type="file"
            id="image"
            onChange={getUploadedImage}
            accept="image/jpeg, image/jpg, image/png"
            disabled={loading}
          />
        </div>
        {uploadedImage && !croppedImage && (
          <div className="w-full h-[430px]  top-20 left-0 rounded-md object-contain">
            <Cropper
              style={{ height: "100%", width: "100%" }}
              src={uploadedImage}
              guides={false}
              initialAspectRatio={1}
              aspectRatio={1}
              crop={onCrop}
              viewMode={1}
              ref={cropperRef}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={true}
              responsive={true}
              preview=".img-preview"
            />
          </div>
        )}
        <DialogFooter>
          <div id="ButtonSection">
            <div
              id="UpdateInfoButtons"
              className="flex items-center justify-end gap-2"
            >
              <DialogClose
                onClick={handleCancel}
                className={`p-[8px] text-[14px] border border-border rounded-md cursor-pointer transition-all hover:bg-muted`}
              >
                Cancel
              </DialogClose>
              {loading && (
                <Button disabled={loading}>
                  <MainLoading />
                </Button>
              )}
              {croppingDone && croppedImage ? (
                <Button
                  onClick={cropAndUpdateImage}
                  className={`${file == null && "!hidden"} flex items-center`}
                  disabled={loading}
                >
                  <span className="mx-4 font-medium text-[15px]">
                    {loading ? <MainLoading /> : `Apply`}
                  </span>
                </Button>
              ) : (
                <Button
                  onClick={saveCroppedImage}
                  className={`${file == null && "!hidden"} ${
                    loading && "!hidden"
                  } flex items-center`}
                  disabled={loading}
                >
                  <span className="mx-4 font-medium text-[15px]">
                    Save crop
                  </span>
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfilePic;
