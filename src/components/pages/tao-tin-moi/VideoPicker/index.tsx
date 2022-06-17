import { notifySuccess } from '@/helpers/toast.helpers';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import ReactPlayer from 'react-player';

const VideoPicker = ({
  name,
  setValue,
  videoLimit = 1,
  video,
}: {
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  video?: string;
  videoLimit?: number;
}) => {
  const [pickedVideo, setPickedVideo] = React.useState<string | undefined>(
    undefined
  );

  const handlePickVideo = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files || [];
    console.log(`files`, files);
    if (files.length > videoLimit) {
      alert(`Chỉ đăng tối đa ${videoLimit} video`);
      return;
    }
    [].forEach.call(files, function (file: any) {
      if (/video\/.*/.test(file.type)) {
        setPickedVideo((URL || webkitURL).createObjectURL(file));
        // setVideo(file);
        setValue(name, file);
        notifySuccess('Đã tải video lên thành công');
      }
    });
  };

  const handleRemoveVideo = () => {
    setPickedVideo(undefined);
    setValue(name, undefined);
  };

  return (
    <div className="border-dashed min-h-[200px] p-5 mt-[10px] border-gray-300 rounded-[3px] border-2 flex justify-center items-center">
      {video || pickedVideo ? (
        <div className="">
          <div className="border-2 border-green-400 p-0">
            <ReactPlayer url={video || pickedVideo} controls />
          </div>
          <div className="grid grid-cols-2 gap-x-[10px] mt-[10px]">
            <UploadVideoButton label="Chọn video khác" />
            <div className="button-red" onClick={handleRemoveVideo}>
              Bỏ chọn
            </div>
          </div>
        </div>
      ) : (
        <UploadVideoButton label="Tải video" />
      )}
      <input
        type="file"
        name="videos"
        id="article_videos"
        hidden
        accept="video/mp4,video/x-m4v,video/*"
        onChange={handlePickVideo}
      />
    </div>
  );
};

const UploadVideoButton = ({ label }: { label: string }) => {
  return (
    <label
      htmlFor="article_videos"
      className="button-blue flex items-center gap-[5px]"
    >
      <span className="h-[20px] w-[20px] object-contain">
        <img src="/icons/ic_video.png" alt="video" />
      </span>
      {label}
    </label>
  );
};

export default VideoPicker;
