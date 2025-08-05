
// import Navbar from '../../components/navbar';
import Carousel from '../../components/IndexComponents/IndexCarousel';
import AboutChurch from '../../components/IndexComponents/AboutChurch';
import WatchSermons from '../../components/IndexComponents/WatchSermons';
import Programmes from '../../components/IndexComponents/Programmes';
import BookSection from '../../components/IndexComponents/BookSection';
import ContactSection from '../../components/IndexComponents/ContactSection';
import Footer from '../../components/Footer';
function Index() {
  return (
    <>
      {/* <Navbar /> */}
      <Carousel />
      <AboutChurch />
      <WatchSermons />
      <Programmes />
      <BookSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Index;