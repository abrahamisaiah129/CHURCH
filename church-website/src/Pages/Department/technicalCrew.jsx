

import DepartmentCarousel from "../../components/DepartmentComponents/DepartmentCarousel";
import DepartmentSection from "../../components/DepartmentComponents/DepartmentSection";
function technicalCrew() {
    const slideData=  [
    {
      image: '/assets/Images/ca1.png',
      pretitle: 'Welcome to',
      title: 'Technical Crew',
      text: 'Join us in worship, experience God\'s presence, and grow in faith.',
      service: 'Sunday: 9 AM – Lagos, Nigeria',
    },
    {
      image: '/assets/Images/ca3.png',
      pretitle: 'Experience',
      title: 'Technical Crew',
      text: 'Come as you are and encounter the transforming power of God.',
      service: 'Wednesday Bible Study: 6 PM',
    },
    {
      image: '/assets/Images/Rectangle4.png',
      pretitle: 'Join Our',
      title: 'Technical Crew',
      text: 'Find your place in our growing family of believers.',
      service: 'Friday Prayer: 6 PM',
    },
    ];
     const contentData = {
        'textImage': '/assets/Images/pastor.jpg',
        'textTitle': 'Rev. Chris Okotie',
        'pageTitle': 'Technical Crew',
        'textSubtitle': 'Pastor, Household of God Church',
        'textContent': 'And what is the exceeding greatness of his power to us-ward who believe, according to the working of his mighty power, Which he  wrought in Christ, when he raised him from the dead, and set him at his own right hand in the heavenly places, Far above all   principality, and power...',
        'buttonText': 'See More'
    };
    return (
        <div>
           <DepartmentCarousel slides={slideData} />
            <DepartmentSection content={contentData} />
        </div>
    );
}

export default technicalCrew;





