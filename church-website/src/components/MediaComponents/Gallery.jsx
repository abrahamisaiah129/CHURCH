import React from 'react';

// Props: title, src (now generic for image/audio/video source), type, date, description, onClick
const Gallery = ({ title, src, type, date, description, onClick }) => {
    const renderMedia = () => {
        switch (type) {
            case 'image':
                return (
                    <img 
                        src={src} 
                        alt={title} 
                        className="card-img-top rounded-t-lg object-cover h-48 w-full" 
                    />
                );
            case 'audio':
                return (
                    <div className="flex items-center justify-center h-48 w-full bg-gray-800 text-white rounded-t-lg">
                        {/* Placeholder for audio thumbnail/icon */}
                        <i className="fas fa-music fa-3x mb-2"></i> {/* Font Awesome music icon */}
                        <audio controls className="w-full mt-2">
                            <source src={src} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                );
            case 'video':
                return (
                    <video 
                        controls 
                        className="card-img-top rounded-t-lg object-cover h-48 w-full bg-black"
                    >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            default:
                return (
                    <div className="flex items-center justify-center h-48 w-full bg-gray-700 text-white rounded-t-lg">
                        <i className="fas fa-file fa-3x"></i> {/* Generic file icon */}
                        <p className="text-sm mt-2">Unsupported Media Type</p>
                    </div>
                );
        }
    };

    return (
        <div className="col-md-4 col-sm-6">
            <div 
                className="card shadow-sm cursor-pointer" 
                onClick={onClick} 
                style={{ cursor: 'pointer' }}
            >
                {renderMedia()} {/* Render the appropriate media type */}
                <div className="card-body text-center">
                    <small className="text-muted">{title}</small>
                    {date && <p className="text-muted mb-0 text-sm">{date}</p>}
                    {description && <p className="text-muted text-xs">{description}</p>}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
