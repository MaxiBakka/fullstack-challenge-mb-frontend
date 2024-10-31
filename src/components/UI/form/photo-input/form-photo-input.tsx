import { useFileUploadService } from "../../../../services/api/services/files";
import { FileEntity } from "../../../../services/api/types/file-entity";
import HTTP_CODES_ENUM from "../../../../services/api/types/http-codes";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { UserCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../../button/button";
import Avatar from "../../avatar/avatar";

type PhotoInputProps = {
  error?: string;
  onChange: (value: FileEntity | null) => void;
  onBlur: () => void;
  value?: FileEntity;
  disabled?: boolean;
  testId?: string;
};

function PhotoInput(props: PhotoInputProps) {
  const { onChange } = props;
  const [isLoading, setIsLoading] = useState(false);
  const fetchFileUpload = useFileUploadService();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsLoading(true);
      const { status, data } = await fetchFileUpload(acceptedFiles[0]);
      if (status === HTTP_CODES_ENUM.CREATED) {
        onChange(data.file);
      }
      setIsLoading(false);
    },
    [fetchFileUpload, onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // 2MB
    disabled: isLoading || props.disabled,
  });

  const removePhotoHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onChange(null);
  };

  return (
    <div
      {...getRootProps()}
      className="relative flex flex-col items-center p-4 mt-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-600 transition-colors"
    >
      {isDragActive && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <p className="text-white font-bold text-xl">
            Drop the image here ...
          </p>
        </div>
      )}
      {props?.value ? (
        <div className="relative w-24 h-24">
          <Avatar name={""} photo={props.value} />
          {/* <img
            src={props.value?.path}
            alt="Uploaded photo"
            className="w-24 h-24 rounded-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-black bg-opacity-70 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button
              onClick={removePhotoHandle}
              children={<XCircleIcon className="w-10 h-10" />}
            />
          </div>
        </div>
      ) : (
        <div className="mx-auto h-24 w-24 rounded-full sm:mx-0 sm:shrink-0 bg-gray-200 flex items-center justify-center">
          <UserCircleIcon
            className="h-20 w-20 text-gray-400"
            aria-hidden="true"
          />
        </div>
        // <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
        //   <img
        //     src={props.value?.path}
        //     alt="Uploaded photo"
        //     className="w-24 h-24 rounded-full object-cover"
        //   />
        // </div>
      )}

      <div className="mt-4">
        <Button
          disabled={isLoading || props.disabled}
          data-testid={props.testId}
        >
          {isLoading ? "Loading ..." : "Select an image"}
        </Button>
        <input {...getInputProps()} />
      </div>

      <p className="mt-2 text-sm text-gray-600">
        Or drag 'n' drop some files here
      </p>

      {props.error && (
        <p className="mt-2 text-sm text-red-600">{props.error}</p>
      )}
    </div>
  );
}

function FormPhotoInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> & {
    disabled?: boolean;
    testId?: string;
  }
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <PhotoInput
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          error={fieldState.error?.message}
          disabled={props.disabled}
          testId={props.testId}
        />
      )}
    />
  );
}

export default FormPhotoInput;
