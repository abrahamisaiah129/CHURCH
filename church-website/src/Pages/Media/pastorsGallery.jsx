import React, { useState, useEffect, useRef } from 'react';
import Gallery from "../../components/MediaComponents/Gallery";
import * as bootstrap from 'bootstrap';
import { useLoading } from '../../hooks/useLoading'; // Import useLoading hook

function PastorsGallery() {
    const GalleryData = [
        {
            src: '/assets/Images/pastor1.png', // Placeholder image
            type: 'image',
            title: 'Pastor\'s Portrait',
            date: 'January 1, 2024',
            description: 'A recent portrait of our beloved pastor.',
        },
        {
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // Example video URL
            type: 'video',
            title: 'Pastor\'s Message',
            date: 'February 10, 2024',
            description: 'An encouraging message from the pastor.',
        },
        {
            src: '/assets/Images/pastor2.png', // Placeholder image
            type: 'image',
            title: 'Teaching Session',
            date: 'March 22, 2024',
            description: 'Pastor teaching during a Bible study.',
        },
        {
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Another example video URL
            type: 'video',
            title: 'Community Outreach',
            date: 'April 18, 2024',
            description: 'Pastor leading a community outreach initiative.',
        },
        {
            src: '/assets/Images/pastor3.png', // Placeholder image
            type: 'image',
            title: 'Prayer Gathering',
            date: 'May 5, 2024',
            description: 'Pastor leading a special prayer gathering.',
        },
        {
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', // Another example video URL
            type: 'video',
            title: 'Youth Mentorship',
            date: 'June 15, 2024',
            description: 'Pastor mentoring the youth group.',
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [currentMedia, setCurrentMedia] = useState({ src: '', type: '', title: '', date: '', description: '' }); 
    const modalRef = useRef(null); 

    const { stopLoading } = useLoading(); // Get stopLoading function from context

    useEffect(() => {
        let modalInstance = null;
        if (modalRef.current) {
            modalInstance = bootstrap.Modal.getInstance(modalRef.current) || new bootstrap.Modal(modalRef.current);

            if (showModal) {
                modalInstance.show();
            } else {
                modalInstance.hide();
            }
        }
        return () => {};
    }, [showModal]); 

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            const handleShown = () => setShowModal(true);
            const handleHidden = () => setShowModal(false);

            modalElement.addEventListener('shown.bs.modal', handleShown);
            modalElement.addEventListener('hidden.bs.modal', handleHidden);

            return () => {
                modalElement.removeEventListener('shown.bs.modal', handleShown);
                modalElement.removeEventListener('hidden.bs.modal', handleHidden);
            };
        }

        // Signal that content is loaded after a short delay
        const timer = setTimeout(() => {
            stopLoading();
        }, 100); // Small delay to ensure the overlay shows briefly

        return () => clearTimeout(timer); // Cleanup timeout
    }, [stopLoading]); // Added stopLoading to dependencies

    const handleMediaClick = (mediaSrc, mediaType, mediaTitle, mediaDate, mediaDescription) => { 
        setCurrentMedia({ 
            src: mediaSrc, 
            type: mediaType, 
            title: mediaTitle, 
            date: mediaDate, 
            description: mediaDescription 
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const renderModalMedia = () => {
        switch (currentMedia.type) {
            case 'image':
                return <img src={currentMedia.src} alt={currentMedia.title} className="img-fluid rounded" />;
            case 'audio':
                return (
                    <audio controls className="w-full">
                        <source src={currentMedia.src} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                );
            case 'video':
                return (
                    <video controls className="w-full rounded">
                        <source src={currentMedia.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            default:
                return <p>Unsupported media type for preview.</p>;
        }
    };

    return (
        <div className="container py-5 mt-5">
            <h2 className="text-center text-warning mb-4">Pastor's Gallery</h2>
            <div className="row g-4">
                {GalleryData.map((item, index) => (
                    <Gallery 
                        key={index} 
                        src={item.src} 
                        type={item.type} 
                        title={item.title} 
                        date={item.date} 
                        description={item.description} 
                        onClick={() => handleMediaClick(item.src, item.type, item.title, item.date, item.description)} 
                    />
                ))}
            </div>

            <div 
                className="modal fade" 
                id="imageModal" 
                tabIndex="-1" 
                aria-labelledby="imageModalLabel" 
                aria-hidden="true"
                ref={modalRef} 
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h5 className="modal-title" id="imageModalLabel">{currentMedia.title}</h5>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body text-center">
                            {renderModalMedia()} 
                            {currentMedia.date && <p className="mt-2 mb-0 text-muted">{currentMedia.date}</p>}
                            {currentMedia.description && <p className="text-white">{currentMedia.description}</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PastorsGallery;
