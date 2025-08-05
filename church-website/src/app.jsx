import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import stationary components
import Navbar from './components/navbar';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay'; // NEW: Import LoadingOverlay
import { LoadingProvider } from './contexts/LoadingContext'; // NEW: Import LoadingProvider

// Events Pages
import BabyDedication from './Pages/Events/babyDedication';
import Weddings from './Pages/Events/weddings';
import ChristmasLights from './Pages/Events/christmasLights';
import EventDetailsPage from './Pages/Events/EventDetailsPage'; 

// Departments Pages
import ChildrensDepartment from './Pages/Department/childrensDepartment';
import SinglesDepartment from './Pages/Department/singlesDepartment';
import WorksDepartment from './Pages/Department/worksDepartment';
import PublicationDepartment from './Pages/Department/publicationDepartment';
import EvangelismDepartment from './Pages/Department/evangelismDepartment';
import HolyPolice from './Pages/Department/holyPolice';
import TechnicalCrew from './Pages/Department/technicalCrew';
import VillaSanitation from './Pages/Department/villaSanitation';
import PastorialCare from './Pages/Department/pastorialCare';
import MissionsDepartment from './Pages/Department/missionsDepartment';
import ProtocolDepartment from './Pages/Department/protocolDepartment';
import BenevolenceDepartment from './Pages/Department/benevolenceDepartment';

// Media Pages
import ChurchsGallery from './Pages/Media/churchsGallery';
import PastorsGallery from './Pages/Media/pastorsGallery';
import MusicsGallery from './Pages/Media/musicsGallery'; 

// About Pages
import Church from './Pages/About/ourChurch';
import Pastor from './Pages/About/ourPastor';

// Main Index page
import Index from './Pages/Index/Index';

function App() {
    return (
        <LoadingProvider> {/* Ensure LoadingProvider wraps everything */}
            <Navbar />
            <Routes>
                {/* Home */}
                <Route path="/" element={<Index />} />

                {/* About Routes */}
                <Route path="/about/church" element={<Church />} />
                <Route path="/about/pastor" element={<Pastor />} />

                {/* Specific Event Routes */}
                <Route path="/events/baby-dedication" element={<BabyDedication />} />
                <Route path="/events/weddings" element={<Weddings />} />
                <Route path="/events/christmas-lights" element={<ChristmasLights />} />

                {/* Dynamic Event Details Route */}
                <Route path="/events/:eventName/:period" element={<EventDetailsPage />} />

                {/* Department Routes */}
                <Route path="/departments/childrens-department" element={<ChildrensDepartment />} />
                <Route path="/departments/singles-department" element={<SinglesDepartment />} />
                <Route path="/departments/works-department" element={<WorksDepartment />} />
                <Route path="/departments/publication-department" element={<PublicationDepartment />} />
                <Route path="/departments/evangelism-department" element={<EvangelismDepartment />} />
                <Route path="/departments/holy-police" element={<HolyPolice />} />
                <Route path="/departments/technical-crew" element={<TechnicalCrew />} />
                <Route path="/departments/villa-sanitation" element={<VillaSanitation />} />
                <Route path="/departments/pastoral-care" element={<PastorialCare />} />
                <Route path="/departments/missions-department" element={<MissionsDepartment />} />
                <Route path="/departments/protocol-department" element={<ProtocolDepartment />} />
                <Route path="/departments/benevolence-department" element={<BenevolenceDepartment />} />

                {/* Media Routes */}
                <Route path="/media/churchs-gallery" element={<ChurchsGallery/>} />
                <Route path="/media/pastors-gallery" element={<PastorsGallery />} />
                <Route path="/media/musics-gallery" element={<MusicsGallery />} /> 
                
                {/* 404 Page */}
                <Route path="*" element={<h1 className="text-center my-5 text-warning">404 - Page Not Found</h1>} />
            </Routes>
            <Footer />
            <LoadingOverlay /> {/* Render the LoadingOverlay here */}
        </LoadingProvider>
    );
}

export default App;
