"use client";

import React, { useState } from 'react';

interface UploadImageProps {
  onImageUpload: (file: File) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 text-white"
      />
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Uploaded"
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default UploadImage;
