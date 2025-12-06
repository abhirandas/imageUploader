import { useState, useEffect } from "react";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleClick(e) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
      }
    }
  }

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // cleanup on unmount or when image changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="image-uploader">
      <div 
        className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!preview ? (
          <>
            <div className="drop-zone-content">
              <p>Drag and drop an image here</p>
              <p>or</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleClick}
                id="file-input"
                className="file-input"
              />
              <label htmlFor="file-input" className="file-input-label">
                Choose File
              </label>
            </div>
          </>
        ) : (
          <div className="image-display">
            <img src={preview} alt="preview" className="preview-image" />
            <p className="filename">{image.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
