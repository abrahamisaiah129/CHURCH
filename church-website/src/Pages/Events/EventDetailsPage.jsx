import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from '../../components/MediaComponents/Gallery'; // Reusing your Gallery component for media display
import * as bootstrap from 'bootstrap'; // Importing Bootstrap's JS for modal functionality

/**
 * EventDetailsPage Component
 *
 * This component dynamically displays details and media (images, audio, video) for a specific event
 * based on the `eventName` and `period` (e.g., month or year) extracted from the URL parameters.
 * It uses hardcoded data for demonstration but can be easily adapted to fetch data from an API.
 */
function EventDetailsPage() {
    // useParams hook to extract dynamic segments from the URL.
    // eventName: e.g., 'fellowship-sunday', 'christmas-carol-competition'
    // period: e.g., 'january', 'december', '2013'
    const { eventName, period } = useParams();

    // State to hold the fetched event data. Null initially, set once data is loaded.
    const [eventData, setEventData] = useState(null);
    // State to hold any error messages during data fetching or if data is not found.
    const [error, setError] = useState(null);

    // State and ref for the Bootstrap modal used to display media previews.
    const [showModal, setShowModal] = useState(false);
    const [currentMedia, setCurrentMedia] = useState({ src: '', type: '', title: '', date: '', description: '' });
    const modalRef = useRef(null); // Ref to directly access the modal DOM element for Bootstrap JS.

    /**
     * useMemo hook to memoize the large event data object.
     * This prevents the `allEventsData` object from being recreated on every render
     * if its dependencies (which are none here, as it's static) haven't changed.
     * This is an optimization for static or infrequently changing large data sets.
     */
    const allEventsData = useMemo(() => ({
        'fellowship-sunday': {
            'january': {
                title: 'January Fellowship Sunday',
                details: 'A blessed start to the year with inspiring worship and fellowship. We focused on new beginnings and spiritual growth.',
                media: [
                    { src: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Jan+Fellowship+1', type: 'image', title: 'Fellowship Gathering', date: 'Jan 15, 2024', description: 'Congregation during worship.' },
                    { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', type: 'audio', title: 'Opening Prayer', date: 'Jan 15, 2024', description: 'Listen to the opening prayer.' },
                ]
            },
            'february': {
                title: 'February Fellowship Sunday',
                details: 'Celebrating love and community in our February fellowship. Special focus on outreach.',
                media: [
                    { src: 'https://placehold.co/600x400/33FF57/FFFFFF?text=Feb+Fellowship+2', type: 'image', title: 'Community Outreach', date: 'Feb 18, 2024', description: 'Volunteers helping out.' },
                    { src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video', title: 'Outreach Highlights', date: 'Feb 18, 2024', description: 'Video highlights from our outreach.' },
                ]
            },
            'march': {
                title: 'March Fellowship Sunday',
                details: 'March fellowship focused on renewal and spiritual growth. A time of reflection and new commitments.',
                media: [
                    { src: 'https://placehold.co/600x400/3366FF/FFFFFF?text=Mar+Fellowship+3', type: 'image', title: 'March Congregation', date: 'Mar 10, 2024', description: 'Congregation during March service.' },
                ]
            },
            'april': {
                title: 'April Fellowship Sunday',
                details: 'April fellowship focused on resurrection and new life. Joyful celebrations and powerful testimonies.',
                media: [
                    { src: 'https://placehold.co/600x400/FFFF33/000000?text=Apr+Fellowship+4', type: 'image', title: 'April Worship', date: 'Apr 14, 2024', description: 'Joyful worship in April.' },
                ]
            },
            'may': {
                title: 'May Fellowship Sunday',
                details: 'May fellowship focused on blessings and gratitude. A time to count our blessings and give thanks.',
                media: [
                    { src: 'https://placehold.co/600x400/FF33FF/FFFFFF?text=May+Fellowship+5', type: 'image', title: 'May Community', date: 'May 19, 2024', description: 'Community sharing in May.' },
                ]
            },
            'june': {
                title: 'June Fellowship Sunday',
                details: 'June fellowship focused on strength and unity. Building stronger bonds within the church family.',
                media: [
                    { src: 'https://placehold.co/600x400/33FFFF/000000?text=Jun+Fellowship+6', type: 'image', title: 'June Unity', date: 'Jun 9, 2024', description: 'United in faith during June service.' },
                ]
            },
            'july': {
                title: 'July Fellowship Sunday',
                details: 'July fellowship focused on divine guidance. Seeking wisdom and direction for the path ahead.',
                media: [
                    { src: 'https://placehold.co/600x400/FF9933/FFFFFF?text=Jul+Fellowship+7', type: 'image', title: 'July Guidance', date: 'Jul 14, 2024', description: 'Seeking guidance in July.' },
                ]
            },
            'august': {
                title: 'August Fellowship Sunday',
                details: 'August fellowship focused on peace and reflection. A serene time of contemplation and spiritual rest.',
                media: [
                    { src: 'https://placehold.co/600x400/9933FF/FFFFFF?text=Aug+Fellowship+8', type: 'image', title: 'August Peace', date: 'Aug 18, 2024', description: 'Peaceful moments in August.' },
                ]
            },
            'september': {
                title: 'September Fellowship Sunday',
                details: 'September fellowship focused on wisdom and understanding. Growing in knowledge and discernment.',
                media: [
                    { src: 'https://placehold.co/600x400/33FF99/FFFFFF?text=Sep+Fellowship+9', type: 'image', title: 'September Learning', date: 'Sep 8, 2024', description: 'Learning and growing in September.' },
                ]
            },
            'october': {
                title: 'October Fellowship Sunday',
                details: 'October fellowship focused on harvest and abundance. Celebrating God\'s provision and faithfulness.',
                media: [
                    { src: 'https://placehold.co/600x400/FF3366/FFFFFF?text=Oct+Fellowship+10', type: 'image', title: 'October Harvest', date: 'Oct 13, 2024', description: 'Harvest celebrations in October.' },
                ]
            },
            'november': {
                title: 'November Fellowship Sunday',
                details: 'November fellowship focused on gratitude and blessings. Expressing thanks for all that God has done.',
                media: [
                    { src: 'https://placehold.co/600x400/6633FF/FFFFFF?text=Nov+Fellowship+11', type: 'image', title: 'November Gratitude', date: 'Nov 17, 2024', description: 'Thankful hearts in November.' },
                ]
            },
            'december': {
                title: 'December Fellowship Sunday',
                details: 'December fellowship focused on hope and anticipation. Preparing our hearts for the Christmas season.',
                media: [
                    { src: 'https://placehold.co/600x400/FF6633/FFFFFF?text=Dec+Fellowship+12', type: 'image', title: 'December Anticipation', date: 'Dec 8, 2024', description: 'Joyful anticipation in December.' },
                ]
            },
        },
        'christmas-carol-competition': {
            'january': { title: 'No Christmas Carol Competition in January', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'february': { title: 'No Christmas Carol Competition in February', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'march': { title: 'No Christmas Carol Competition in March', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'april': { title: 'No Christmas Carol Competition in April', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'may': { title: 'No Christmas Carol Competition in May', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'june': { title: 'No Christmas Carol Competition in June', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'july': { title: 'No Christmas Carol Competition in July', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'august': { title: 'No Christmas Carol Competition in August', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'september': { title: 'No Christmas Carol Competition in September', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'october': { title: 'No Christmas Carol Competition in October', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'november': { title: 'No Christmas Carol Competition in November', details: 'The Christmas Carol Competition is held in December.', media: [] },
            'december': {
                title: 'Christmas Carol Competition 2024',
                details: 'Our annual festive carol competition, showcasing the amazing talent within our church community. A night of joy and music!',
                media: [
                    { src: 'https://placehold.co/600x400/FF0000/FFFFFF?text=Carol+Choir', type: 'image', title: 'Carol Choir', date: 'Dec 20, 2024', description: 'The winning choir performance.' },
                    { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', type: 'audio', title: 'Winning Carol', date: 'Dec 20, 2024', description: 'Audio of the top carol.' },
                ]
            },
        },
        'halleluyah-party': {
            'january': { title: 'No Halleluyah Party in January', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'february': { title: 'No Halleluyah Party in February', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'march': { title: 'No Halleluyah Party in March', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'april': { title: 'No Halleluyah Party in April', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'may': { title: 'No Halleluyah Party in May', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'june': { title: 'No Halleluyah Party in June', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'july': { title: 'No Halleluyah Party in July', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'august': { title: 'No Halleluyah Party in August', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'september': { title: 'No Halleluyah Party in September', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'october': {
                title: 'Halleluyah Party 2024',
                details: 'An exciting and spirit-filled Halleluyah Party, a safe and fun alternative for our youth and children.',
                media: [
                    { src: 'https://placehold.co/600x400/00FF00/FFFFFF?text=Party+Fun', type: 'image', title: 'Party Fun', date: 'Oct 31, 2024', description: 'Children enjoying the games.' },
                    { src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', type: 'video', title: 'Party Highlights', date: 'Oct 31, 2024', description: 'Video recap of the party.' },
                ]
            },
            'november': { title: 'No Halleluyah Party in November', details: 'The Halleluyah Party is typically held in October.', media: [] },
            'december': { title: 'No Halleluyah Party in December', details: 'The Halleluyah Party is typically held in October.', media: [] },
        },
        'queen-esther': {
            '2013': {
                title: 'Queen Esther Pageant 2013',
                details: 'Celebrating the grace and strength of women in our annual Queen Esther Pageant. A memorable event highlighting inner beauty.',
                media: [
                    { src: 'https://placehold.co/600x400/0000FF/FFFFFF?text=QE+2013+Winner', type: 'image', title: 'Queen Esther 2013 Winner', date: '2013', description: 'The crowned Queen Esther.' },
                ]
            },
            '2014': {
                title: 'Queen Esther Pageant 2014',
                details: 'A beautiful display of talent and faith at the 2014 Queen Esther Pageant. Inspiring stories and performances.',
                media: [
                    { src: 'https://placehold.co/600x400/FF00FF/FFFFFF?text=QE+2014+Contestants', type: 'image', title: 'Queen Esther 2014 Contestants', date: '2014', description: 'Group photo of contestants.' },
                ]
            },
            '2015': {
                title: 'Queen Esther Pageant 2015',
                details: 'The 2015 Queen Esther Pageant, a testament to faith and beauty. A night of elegance and spiritual reflection.',
                media: [
                    { src: 'https://placehold.co/600x400/00FFFF/000000?text=QE+2015+Highlights', type: 'image', title: 'Queen Esther 2015 Highlights', date: '2015', description: 'Memorable moments from 2015.' },
                ]
            },
            '2016': {
                title: 'Queen Esther Pageant 2016',
                details: 'The 2016 Queen Esther Pageant, celebrating inner and outer beauty. A platform for women to shine.',
                media: [
                    { src: 'https://placehold.co/600x400/FFA500/FFFFFF?text=QE+2016+Participants', type: 'image', title: 'Queen Esther 2016 Participants', date: '2016', description: 'Participants showcasing their grace.' },
                ]
            },
            '2017': {
                title: 'Queen Esther Pageant 2017',
                details: 'The 2017 Queen Esther Pageant, a grand celebration of womanhood. Empowering women through faith.',
                media: [
                    { src: 'https://placehold.co/600x400/800080/FFFFFF?text=QE+2017+Crowning', type: 'image', title: 'Queen Esther 2017 Crowning', date: '2017', description: 'The crowning moment of 2017.' },
                ]
            },
        },
        'grace': {
            '2014': {
                title: 'Grace Conference 2014',
                details: 'The inaugural Grace Conference, focusing on God\'s abundant grace. A foundational event for spiritual growth.',
                media: [
                    { src: 'https://placehold.co/600x400/008000/FFFFFF?text=Grace+2014+Opening', type: 'image', title: 'Grace Conference Opening', date: '2014', description: 'Opening session of the conference.' },
                ]
            },
            '2015': {
                title: 'Grace Conference 2015',
                details: 'Deepening our understanding of grace in the 2015 conference. Powerful teachings and worship.',
                media: [
                    { src: 'https://placehold.co/600x400/808000/FFFFFF?text=Grace+2015+Speakers', type: 'image', title: 'Grace Conference Speakers', date: '2015', description: 'Keynote speakers sharing insights.' },
                ]
            },
            '2016': {
                title: 'Grace Conference 2016',
                details: 'The 2016 Grace Conference, exploring new dimensions of grace. Experiencing God\'s favor in new ways.',
                media: [
                    { src: 'https://placehold.co/600x400/008080/FFFFFF?text=Grace+2016+Session', type: 'image', title: 'Grace Conference 2016 Session', date: '2016', description: 'Engaging sessions from 2016.' },
                ]
            },
            '2017': {
                title: 'Grace Conference 2017',
                details: 'The 2017 Grace Conference, a powerful experience of divine favor. Lives transformed by grace.',
                media: [
                    { src: 'https://placehold.co/600x400/800000/FFFFFF?text=Grace+2017+Worship', type: 'image', title: 'Grace Conference 2017 Worship', date: '2017', description: 'Uplifting worship moments from 2017.' },
                ]
            },
            '2018': {
                title: 'Grace Conference 2018',
                details: 'The 2018 Grace Conference, an impactful journey into grace. Deeper revelations and spiritual breakthroughs.',
                media: [
                    { src: 'https://placehold.co/600x400/000080/FFFFFF?text=Grace+2018+Attendees', type: 'image', title: 'Grace Conference 2018 Attendees', date: '2018', description: 'Attendees at the 2018 conference.' },
                ]
            },
            '2019': {
                title: 'Grace Conference 2019',
                details: 'The 2019 Grace Conference, concluding a series of profound insights. A powerful culmination of the Grace series.',
                media: [
                    { src: 'https://placehold.co/600x400/808080/FFFFFF?text=Grace+2019+Closing', type: 'image', title: 'Grace Conference 2019 Closing', date: '2019', description: 'Closing remarks from 2019 conference.' },
                ]
            },
        },
        'baby-dedication': {
            'january': {
                title: 'January Baby Dedication Service',
                details: 'Our January service dedicated to presenting our little ones to the Lord. A special moment for families.',
                media: [
                    { src: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Jan+Baby+Dedication', type: 'image', title: 'Jan Dedication Moment', date: 'Jan 2024', description: 'Parents dedicating their child in January.' },
                ]
            },
            'february': {
                title: 'February Baby Dedication Service',
                details: 'Our February service dedicated to presenting our little ones to the Lord. Blessings for new lives.',
                media: [
                    { src: 'https://placehold.co/600x400/33FF57/FFFFFF?text=Feb+Baby+Dedication', type: 'image', title: 'Feb Dedication Moment', date: 'Feb 2024', description: 'Parents dedicating their child in February.' },
                ]
            },
            'march': {
                title: 'March Baby Dedication Service',
                details: 'Our March service dedicated to presenting our little ones to the Lord. A joyful family occasion.',
                media: [
                    { src: 'https://placehold.co/600x400/3366FF/FFFFFF?text=Mar+Baby+Dedication', type: 'image', title: 'Mar Dedication Moment', date: 'Mar 2024', description: 'Parents dedicating their child in March.' },
                ]
            },
            'april': {
                title: 'April Baby Dedication Service',
                details: 'Our April service dedicated to presenting our little ones to the Lord. A time of prayer and commitment.',
                media: [
                    { src: 'https://placehold.co/600x400/FFFF33/000000?text=Apr+Baby+Dedication', type: 'image', title: 'Apr Dedication Moment', date: 'Apr 2024', description: 'Parents dedicating their child in April.' },
                ]
            },
            'may': {
                title: 'May Baby Dedication Service',
                details: 'Our May service dedicated to presenting our little ones to the Lord. Welcoming new members to the church family.',
                media: [
                    { src: 'https://placehold.co/600x400/FF33FF/FFFFFF?text=May+Baby+Dedication', type: 'image', title: 'May Dedication Moment', date: 'May 2024', description: 'Parents dedicating their child in May.' },
                ]
            },
            'june': {
                title: 'June Baby Dedication Service',
                details: 'Our June service dedicated to presenting our little ones to the Lord. Celebrating the gift of life.',
                media: [
                    { src: 'https://placehold.co/600x400/33FFFF/000000?text=Jun+Baby+Dedication', type: 'image', title: 'Jun Dedication Moment', date: 'Jun 2024', description: 'Parents dedicating their child in June.' },
                ]
            },
            'july': {
                title: 'July Baby Dedication Service',
                details: 'Our July service dedicated to presenting our little ones to the Lord. A blessed event for all.',
                media: [
                    { src: 'https://placehold.co/600x400/FF9933/FFFFFF?text=Jul+Baby+Dedication', type: 'image', title: 'Jul Dedication Moment', date: 'Jul 2024', description: 'Parents dedicating their child in July.' },
                ]
            },
            'august': {
                title: 'August Baby Dedication Service',
                details: 'Our August service dedicated to presenting our little ones to the Lord. Growing our spiritual family.',
                media: [
                    { src: 'https://placehold.co/600x400/9933FF/FFFFFF?text=Aug+Baby+Dedication', type: 'image', title: 'Aug Dedication Moment', date: 'Aug 2024', description: 'Parents dedicating their child in August.' },
                ]
            },
            'september': {
                title: 'September Baby Dedication Service',
                details: 'Our September service dedicated to presenting our little ones to the Lord. A time of joy and commitment.',
                media: [
                    { src: 'https://placehold.co/600x400/33FF99/FFFFFF?text=Sep+Baby+Dedication', type: 'image', title: 'Sep Dedication Moment', date: 'Sep 2024', description: 'Parents dedicating their child in September.' },
                ]
            },
            'october': {
                title: 'October Baby Dedication Service',
                details: 'Our October service dedicated to presenting our little ones to the Lord. A beautiful ceremony.',
                media: [
                    { src: 'https://placehold.co/600x400/FF3366/FFFFFF?text=Oct+Baby+Dedication', type: 'image', title: 'Oct Dedication Moment', date: 'Oct 2024', description: 'Parents dedicating their child in October.' },
                ]
            },
            'november': {
                title: 'November Baby Dedication Service',
                details: 'Our November service dedicated to presenting our little ones to the Lord. Celebrating new additions.',
                media: [
                    { src: 'https://placehold.co/600x400/6633FF/FFFFFF?text=Nov+Baby+Dedication', type: 'image', title: 'Nov Dedication Moment', date: 'Nov 2024', description: 'Parents dedicating their child in November.' },
                ]
            },
            'december': {
                title: 'December Baby Dedication Service',
                details: 'Our December service dedicated to presenting our little ones to the Lord. A festive dedication.',
                media: [
                    { src: 'https://placehold.co/600x400/FF6633/FFFFFF?text=Dec+Baby+Dedication', type: 'image', title: 'Dec Dedication Moment', date: 'Dec 2024', description: 'Parents dedicating their child in December.' },
                ]
            },
        },
        'weddings': {
            'january': {
                title: 'January Wedding Ceremonies',
                details: 'Celebrating sacred unions in January. Beautiful beginnings for new couples.',
                media: [
                    { src: 'https://placehold.co/600x400/FF5733/FFFFFF?text=Jan+Wedding+Bliss', type: 'image', title: 'Jan Wedding Bliss', date: 'Jan 2024', description: 'Couples exchanging vows in January.' },
                ]
            },
            'february': {
                title: 'February Wedding Ceremonies',
                details: 'Celebrating sacred unions in February. Love is in the air!',
                media: [
                    { src: 'https://placehold.co/600x400/33FF57/FFFFFF?text=Feb+Wedding+Bliss', type: 'image', title: 'Feb Wedding Bliss', date: 'Feb 2024', description: 'Couples exchanging vows in February.' },
                ]
            },
            'march': {
                title: 'March Wedding Ceremonies',
                details: 'Celebrating sacred unions in March. Blessed ceremonies.',
                media: [
                    { src: 'https://placehold.co/600x400/3366FF/FFFFFF?text=Mar+Wedding+Bliss', type: 'image', title: 'Mar Wedding Bliss', date: 'Mar 2024', description: 'Couples exchanging vows in March.' },
                ]
            },
            'april': {
                title: 'April Wedding Ceremonies',
                details: 'Celebrating sacred unions in April. Joyful celebrations.',
                media: [
                    { src: 'https://placehold.co/600x400/FFFF33/000000?text=Apr+Wedding+Bliss', type: 'image', title: 'Apr Wedding Bliss', date: 'Apr 2024', description: 'Couples exchanging vows in April.' },
                ]
            },
            'may': {
                title: 'May Wedding Ceremonies',
                details: 'Celebrating sacred unions in May. Beautiful vows.',
                media: [
                    { src: 'https://placehold.co/600x400/FF33FF/FFFFFF?text=May+Wedding+Bliss', type: 'image', title: 'May Wedding Bliss', date: 'May 2024', description: 'Couples exchanging vows in May.' },
                ]
            },
            'june': {
                title: 'June Wedding Ceremonies',
                details: 'Celebrating sacred unions in June. Summer weddings.',
                media: [
                    { src: 'https://placehold.co/600x400/33FFFF/000000?text=Jun+Wedding+Bliss', type: 'image', title: 'Jun Wedding Bliss', date: 'Jun 2024', description: 'Couples exchanging vows in June.' },
                ]
            },
            'july': {
                title: 'July Wedding Ceremonies',
                details: 'Celebrating sacred unions in July. Warm celebrations.',
                media: [
                    { src: 'https://placehold.co/600x400/FF9933/FFFFFF?text=Jul+Wedding+Bliss', type: 'image', title: 'Jul Wedding Bliss', date: 'Jul 2024', description: 'Couples exchanging vows in July.' },
                ]
            },
            'august': {
                title: 'August Wedding Ceremonies',
                details: 'Celebrating sacred unions in August. Enduring love.',
                media: [
                    { src: 'https://placehold.co/600x400/9933FF/FFFFFF?text=Aug+Wedding+Bliss', type: 'image', title: 'Aug Wedding Bliss', date: 'Aug 2024', description: 'Couples exchanging vows in August.' },
                ]
            },
            'september': {
                title: 'September Wedding Ceremonies',
                details: 'Celebrating sacred unions in September. Autumn weddings.',
                media: [
                    { src: 'https://placehold.co/600x400/33FF99/FFFFFF?text=Sep+Wedding+Bliss', type: 'image', title: 'Sep Wedding Bliss', date: 'Sep 2024', description: 'Couples exchanging vows in September.' },
                ]
            },
            'october': {
                title: 'October Wedding Ceremonies',
                details: 'Celebrating sacred unions in October. Festive unions.',
                media: [
                    { src: 'https://placehold.co/600x400/FF3366/FFFFFF?text=Oct+Wedding+Bliss', type: 'image', title: 'Oct Wedding Bliss', date: 'Oct 2024', description: 'Couples exchanging vows in October.' },
                ]
            },
            'november': {
                title: 'November Wedding Ceremonies',
                details: 'Celebrating sacred unions in November. Grateful hearts.',
                media: [
                    { src: 'https://placehold.co/600x400/6633FF/FFFFFF?text=Nov+Wedding+Bliss', type: 'image', title: 'Nov Wedding Bliss', date: 'Nov 2024', description: 'Couples exchanging vows in November.' },
                ]
            },
            'december': {
                title: 'December Wedding Ceremonies',
                details: 'Celebrating sacred unions in December. Winter wonderland weddings.',
                media: [
                    { src: 'https://placehold.co/600x400/FF6633/FFFFFF?text=Dec+Wedding+Bliss', type: 'image', title: 'Dec Wedding Bliss', date: 'Dec 2024', description: 'Couples exchanging vows in December.' },
                ]
            },
        },
        'christmas-lights': {
            'january': { title: 'No Christmas Lights Display in January', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'february': { title: 'No Christmas Lights Display in February', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'march': { title: 'No Christmas Lights Display in March', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'april': { title: 'No Christmas Lights Display in April', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'may': { title: 'No Christmas Lights Display in May', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'june': { title: 'No Christmas Lights Display in June', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'july': { title: 'No Christmas Lights Display in July', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'august': { title: 'No Christmas Lights Display in August', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'september': { title: 'No Christmas Lights Display in September', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'october': { title: 'No Christmas Lights Display in October', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'november': { title: 'No Christmas Lights Display in November', details: 'The Christmas Lights Display is typically in December.', media: [] },
            'december': {
                title: 'December Christmas Lights Display',
                details: 'Our annual dazzling display of Christmas lights, bringing joy and festive cheer to the community in December. A magical experience for all ages!',
                media: [
                    { src: 'https://placehold.co/600x400/FFD700/000000?text=Festive+Lights', type: 'image', title: 'Festive Lights', date: 'Dec 2024', description: 'The church grounds illuminated for Christmas.' },
                    { src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', type: 'video', title: 'Lights Tour', date: 'Dec 2024', description: 'A video tour of our Christmas lights.' },
                ]
            },
        },
    }), []); // Empty dependency array as allEventsData is static and doesn't depend on props/state.

    /**
     * useEffect hook to simulate data fetching and update component state.
     * This runs whenever `eventName`, `period`, or `allEventsData` changes.
     * In a real application, this would involve an API call (e.g., using `fetch` or `axios`).
     */
    useEffect(() => {
        // Reset states to indicate new data is being loaded
        setError(null);
        setEventData(null);

        // Simulate network latency with a setTimeout.
        // In a real app, you'd make your fetch call here.
        const timer = setTimeout(() => {
            const event = allEventsData[eventName];
            if (event) {
                const data = event[period];
                if (data) {
                    setEventData(data); // Set the found event data
                } else {
                    // Handle case where period (e.g., month/year) is not found for the event type
                    setError(`Details for "${period.replace(/-/g, ' ')}" not found for "${eventName.replace(/-/g, ' ')}". Please check the URL.`);
                }
            } else {
                // Handle case where eventName is not found
                setError(`Event type "${eventName.replace(/-/g, ' ')}" not found. Please check the URL.`);
            }
        }, 500); // 500ms delay to simulate loading

        // Cleanup function: clears the timeout if the component unmounts or dependencies change
        return () => clearTimeout(timer);
    }, [eventName, period, allEventsData]); // Dependencies: re-run effect if these change

    /**
     * useEffect hook to manage the Bootstrap modal's visibility.
     * This ensures the Bootstrap modal instance is correctly shown or hidden
     * whenever the `showModal` state changes.
     */
    useEffect(() => {
        let modalInstance = null;
        if (modalRef.current) {
            // Get existing Bootstrap modal instance or create a new one
            modalInstance = bootstrap.Modal.getInstance(modalRef.current) || new bootstrap.Modal(modalRef.current);

            if (showModal) {
                modalInstance.show();
            } else {
                modalInstance.hide();
            }
        }
        // No cleanup needed for modal instance itself as it's managed by Bootstrap,
        // but returning an empty cleanup function is good practice if `modalInstance`
        // were to be stored in state or a ref and required explicit disposal.
        return () => {};
    }, [showModal]); // Dependency: re-run effect when `showModal` changes

    /**
     * useEffect hook to attach and detach Bootstrap modal event listeners.
     * This prevents memory leaks by ensuring event listeners are removed when
     * the component unmounts.
     */
    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            // Define handlers for modal shown and hidden events
            const handleShown = () => setShowModal(true);
            const handleHidden = () => setShowModal(false);

            // Add event listeners
            modalElement.addEventListener('shown.bs.modal', handleShown);
            modalElement.addEventListener('hidden.bs.modal', handleHidden);

            // Cleanup function: remove event listeners when component unmounts
            return () => {
                modalElement.removeEventListener('shown.bs.modal', handleShown);
                modalElement.removeEventListener('hidden.bs.modal', handleHidden);
            };
        }
    }, []); // Empty dependency array: runs once on mount, cleans up on unmount

    /**
     * Handler for when a media item (image, audio, video) is clicked.
     * Updates the `currentMedia` state with the clicked item's data and
     * sets `showModal` to true to open the modal.
     */
    const handleMediaClick = (mediaSrc, mediaType, mediaTitle, mediaDate, mediaDescription) => {
        setCurrentMedia({ src: mediaSrc, type: mediaType, title: mediaTitle, date: mediaDate, description: mediaDescription });
        setShowModal(true);
    };

    /**
     * Handler for closing the media preview modal.
     * Sets `showModal` to false, which triggers the modal to hide.
     */
    const handleCloseModal = () => {
        setShowModal(false);
    };

    /**
     * Renders the appropriate media element inside the modal based on `currentMedia.type`.
     * Includes fallback messages for unsupported types.
     */
    const renderModalMedia = () => {
        switch (currentMedia.type) {
            case 'image':
                return <img src={currentMedia.src} alt={currentMedia.title} className="img-fluid rounded" />;
            case 'audio':
                return (
                    <audio controls className="w-full rounded-lg shadow-lg">
                        <source src={currentMedia.src} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                );
            case 'video':
                return (
                    <video controls className="w-full rounded-lg shadow-lg" style={{ maxHeight: '70vh' }}>
                        <source src={currentMedia.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            default:
                return <p className="text-muted">Unsupported media type for preview.</p>;
        }
    };

    // Conditional rendering based on data loading and errors.
    // This provides immediate feedback to the user.
    if (error) {
        return (
            <div className="container py-5 mt-5 text-center">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Oops! Something went wrong.</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">Please check the URL or try navigating from the main events page.</p>
                </div>
            </div>
        );
    }

    if (!eventData) {
        return (
            <div className="container py-5 mt-5 text-center">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-info mt-3">Loading event details...</p>
            </div>
        );
    }

    // Main component rendering once data is successfully loaded.
    return (
        <div className="container py-5 mt-5">
            <header className="text-center mb-5">
                <h1 className="display-4 text-warning mb-3">{eventData.title}</h1>
                <p className="lead text-light">{eventData.details}</p>
                <hr className="my-4 border-warning w-25 mx-auto" />
            </header>

            {eventData.media && eventData.media.length > 0 ? (
                <section className="media-gallery">
                    <h3 className="text-light mb-4 text-center">Event Media</h3>
                    <div className="row g-4 justify-content-center">
                        {eventData.media.map((mediaItem, index) => (
                            <Gallery
                                key={index} // Using index as key is acceptable for static lists without reordering
                                src={mediaItem.src}
                                type={mediaItem.type}
                                title={mediaItem.title}
                                date={mediaItem.date}
                                description={mediaItem.description}
                                onClick={() => handleMediaClick(mediaItem.src, mediaItem.type, mediaItem.title, mediaItem.date, mediaItem.description)}
                            />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="text-center py-5">
                    <p className="text-muted fs-5">No media available for this event yet. Check back soon!</p>
                </div>
            )}

            {/* Bootstrap Modal for Media Preview */}
            <div
                className="modal fade"
                id="imageModal" // Unique ID for the modal
                tabIndex="-1"
                aria-labelledby="imageModalLabel"
                aria-hidden="true"
                ref={modalRef} // Attach ref to the modal div
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-dark text-light border-0 rounded-lg shadow-xl">
                        <div className="modal-header border-bottom border-secondary">
                            <h5 className="modal-title text-warning" id="imageModalLabel">{currentMedia.title}</h5>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body text-center p-4">
                            {renderModalMedia()}
                            {currentMedia.date && <p className="mt-3 mb-1 text-muted text-sm">{currentMedia.date}</p>}
                            {currentMedia.description && <p className="text-white text-base">{currentMedia.description}</p>}
                        </div>
                        <div className="modal-footer border-top border-secondary">
                            <button type="button" className="btn btn-secondary px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 transition-colors" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetailsPage;
