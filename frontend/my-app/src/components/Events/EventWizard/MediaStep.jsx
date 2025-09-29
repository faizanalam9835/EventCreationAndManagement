import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, X, CreditCard as Edit3 } from 'lucide-react';

const MediaStep = ({ data, onUpdate }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    onUpdate({ 
      images: [...data.images, ...newImages] 
    });
  }, [data.images, onUpdate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const removeImage = (imageId) => {
    const updatedImages = data.images.filter(img => img.id !== imageId);
    onUpdate({ images: updatedImages });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Event Media</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add images or videos to make your event more appealing. You can upload multiple files and edit them before finalizing.
        </p>
      </div>

      <div className="space-y-4">
        {/* Drag and Drop Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-indigo-600">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Drag & drop images here, or <span className="text-indigo-600 font-medium">browse</span>
              </p>
              <p className="text-sm text-gray-500">
                Supports: JPG, PNG, GIF, WebP (Max 10MB each)
              </p>
            </div>
          )}
        </div>

        {/* Uploaded Images */}
        {data.images.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Uploaded Images ({data.images.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // In a real app, this would open an image editor
                        alert('Image editing feature would open here');
                      }}
                      className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Image name */}
                  <p className="mt-2 text-xs text-gray-600 truncate">{image.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <Image className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Media Guidelines</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Use high-quality images that represent your event well</li>
                <li>• The first image will be used as the main event banner</li>
                <li>• Recommended aspect ratio: 16:9 for banners, 1:1 for thumbnails</li>
                <li>• Images will be automatically optimized for web display</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Features Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <Edit3 className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Advanced Editing Features</h4>
              <p className="text-sm text-gray-700 mt-1">
                In a full implementation, this would include built-in image editing tools for cropping, 
                filters, text overlay, and automatic image optimization for different display sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaStep;