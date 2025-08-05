import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../../components/MediaComponents/Gallery'; // Reusing your Gallery component
import * as bootstrap from 'bootstrap';
import { useLoading } from '../../hooks/useLoading'; // Import useLoading hook

function EventDetailsPage() {
    const { eventName, period } = useParams(); // Extract eventName and period from URL

    const [eventData, setEventData] = useState(null);
    const [loadingContent, setLoadingContent] = useState(true); // Renamed to avoid confusion with global isLoading
    const [error, setError] = useState(null);

    const { stopLoading } = useLoading(); // Get stopLoading function from context

    const [showModal, setShowModal] = useState(false);
    const [currentMedia, setCurrentMedia] = useState({ src: '', type: '', title: '', date: '', description: '' });
    const modalRef = useRef(null);

    // Hardcoded Data Source wrapped in useMemo to prevent re-creation on every render
    const allEventsData = useMemo(() => ({
        'fellowship-sunday': {
            'january': {
                title: 'January Fellowship Sunday',
                details: 'A blessed start to the year with inspiring worship and fellowship. We focused on new beginnings and spiritual growth.',
                media: [
                    { src: '/assets/Images/ca1.png', type: 'image', title: 'Fellowship Gathering', date: 'Jan 15, 2024', description: 'Congregation during worship.' },
                    { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', type: 'audio', title: 'Opening Prayer', date: 'Jan 15, 2024', description: 'Listen to the opening prayer.' },
                ]
            },
            'february': {
                title: 'February Fellowship Sunday',
                details: 'Celebrating love and community in our February fellowship. Special focus on outreach.',
                media: [
                    { src: '/assets/Images/ca3.png', type: 'image', title: 'Community Outreach', date: 'Feb 18, 2024', description: 'Volunteers helping out.' },
                    { src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video', title: 'Outreach Highlights', date: 'Feb 18, 2024', description: 'Video highlights from our outreach.' },
                ]
            },
            // Add more months as needed
        },
        'christmas-carol-competition': {
            'december': {
                title: 'Christmas Carol Competition 2024',
                details: 'Our annual festive carol competition, showcasing the amazing talent within our church community. A night of joy and music!',
                media: [
                    { src: '/assets/Images/Rectangle4.png', type: 'image', title: 'Carol Choir', date: 'Dec 20, 2024', description: 'The winning choir performance.' },
                    { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', type: 'audio', title: 'Winning Carol', date: 'Dec 20, 2024', description: 'Audio of the top carol.' },
                ]
            },
            // Add other years/months if applicable
        },
        'halleluyah-party': {
            'october': {
                title: 'Halleluyah Party 2024',
                details: 'An exciting and spirit-filled Halleluyah Party, a safe and fun alternative for our youth and children.',
                media: [
                    { src: '/assets/Images/ca1.png', type: 'image', title: 'Party Fun', date: 'Oct 31, 2024', description: 'Children enjoying the games.' },
                    { src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', type: 'video', title: 'Party Highlights', date: 'Oct 31, 2024', description: 'Video recap of the party.' },
                ]
            },
            // Add other years/months if applicable
        },
        'queen-esther': {
            '2013': {
                title: 'Queen Esther Pageant 2013',
                details: 'Celebrating the grace and strength of women in our annual Queen Esther Pageant.',
                media: [
                    { src: '/assets/Images/pastor1.png', type: 'image', title: 'Queen Esther 2013 Winner', date: '2013', description: 'The crowned Queen Esther.' },
                ]
            },
            '2014': {
                title: 'Queen Esther Pageant 2014',
                details: 'A beautiful display of talent and faith at the 2014 Queen Esther Pageant.',
                media: [
                    { src: '/assets/Images/pastor2.png', type: 'image', title: 'Queen Esther 2014 Contestants', date: '2014', description: 'Group photo of contestants.' },
                ]
            },
            // Add more years
        },
        'grace': {
            '2014': {
                title: 'Grace Conference 2014',
                details: 'The inaugural Grace Conference, focusing on God\'s abundant grace.',
                media: [
                    { src: '/assets/Images/ca3.png', type: 'image', title: 'Grace Conference Opening', date: '2014', description: 'Opening session of the conference.' },
                ]
            },
            '2015': {
                title: 'Grace Conference 2015',
                details: 'Deepening our understanding of grace in the 2015 conference.',
                media: [
                    { src: '/assets/Images/Rectangle4.png', type: 'image', title: 'Grace Conference Speakers', date: '2015', description: 'Keynote speakers sharing insights.' },
                ]
            },
            // Add more years
        },
    }), []); // Empty dependency array for useMemo as allEventsData is static

    useEffect(() => {
        setLoadingContent(true); // Start local loading state
        setError(null);
        setEventData(null); // Clear previous data

        // Simulate data fetching delay
        const timer = setTimeout(() => {
            const event = allEventsData[eventName];
            if (event) {
                const data = event[period];
                if (data) {
                    setEventData(data);
                } else {
                    setError(`Details for "${period}" not found for "${eventName.replace(/-/g, ' ')}".`);
                }
            } else {
                setError(`Event type "${eventName.replace(/-/g, ' ')}" not found.`);
            }
            setLoadingContent(false); // Stop local loading state
            stopLoading(); // Signal that global loading is done
        }, 500); // Simulate network latency

        return () => clearTimeout(timer); // Cleanup timeout on unmount or dependency change
    }, [eventName, period, allEventsData, stopLoading]); // Added allEventsData and stopLoading to the dependency array

    // Modal logic (copied from ChurchsGallery)
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
        setCurrentMedia({ src: mediaSrc, type: mediaType, title: mediaTitle, date: mediaDate, description: mediaDescription });
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

    if (loadingContent) {
        return <div className="text-center my-5 text-warning">Loading event details...</div>;
    }

    if (error) {
        return <div className="text-center my-5 text-danger">{error}</div>;
    }

    if (!eventData) {
        return <div className="text-center my-5 text-info">No event data available.</div>;
    }

    return (
        <div className="container py-5 mt-5">
            <h2 className="text-center text-warning mb-4">{eventData.title}</h2>
            <p className="text-center text-light mb-5">{eventData.details}</p>

            {eventData.media && eventData.media.length > 0 && (
                <div className="row g-4">
                    {eventData.media.map((mediaItem, index) => (
                        <Gallery
                            key={index}
                            src={mediaItem.src}
                            type={mediaItem.type}
                            title={mediaItem.title}
                            date={mediaItem.date}
                            description={mediaItem.description}
                            onClick={() => handleMediaClick(mediaItem.src, mediaItem.type, mediaItem.title, mediaItem.date, mediaItem.description)}
                        />
                    ))}
                </div>
            )}
            {!eventData.media || eventData.media.length === 0 && (
                <p className="text-center text-muted mt-4">No media available for this event.</p>
            )}

            {/* Bootstrap Modal (copied from ChurchsGallery) */}
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

export default EventDetailsPage;
