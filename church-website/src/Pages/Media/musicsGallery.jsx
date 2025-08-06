import React, { useState, useEffect, useRef } from 'react';
import Gallery from "../../components/MediaComponents/Gallery";
import * as bootstrap from 'bootstrap';

function MusicsGallery() {
    const GalleryData = [
        {
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            type: 'audio',
            title: 'Worship Song 1',
            date: 'October 1, 2024',
            description: 'A beautiful melody for praise.',
        },
        {
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            type: 'audio',
            title: 'Choir Anthem',
            date: 'October 15, 2024',
            description: 'Powerful and uplifting choir performance.',
        },
        {
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            type: 'audio',
            title: 'Instrumental Piece',
            date: 'November 1, 2024',
            description: 'Relaxing instrumental for meditation.',
        },
        {
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
            type: 'audio',
            title: 'Sermon Intro Music',
            date: 'November 10, 2024',
            description: 'Opening music for Sunday service.',
        },
        {
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
            type: 'audio',
            title: 'Youth Praise',
            date: 'November 25, 2024',
            description: 'Energetic praise from our youth.',
        },
        {
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
            type: 'audio',
            title: 'Special Rendition',
            date: 'December 5, 2024',
            description: 'A unique musical offering.',
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [currentMedia, setCurrentMedia] = useState({ src: '', type: '', title: '', date: '', description: '' });
    const modalRef = useRef(null);

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
    }, []);

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
            <h2 className="text-center text-warning mb-4">Music Gallery</h2>
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

export default MusicsGallery;