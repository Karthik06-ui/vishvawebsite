import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { MomentsPage, type Moment } from './components/MomentsPage';
import { EnvelopePage } from './components/EnvelopePage';
import { SurprisePage } from './components/SurprisePage';
import { FloatingParticles } from './components/FloatingParticles';
import { LoadingScreen } from './components/LoadingScreen';
import { EditModal } from './components/EditModal';
import img2 from '../assets/photo2.jpeg';
import img1 from '../assets/photo1.jpeg';
import img3 from '../assets/photo3.JPEG';
import img4 from '../assets/photo4.jpg';
import img5 from '../assets/photo5.jpg';
import img6 from '../assets/photo6.jpg';
import img7 from '../assets/photo7.jpg';
import img8 from '../assets/photo8.jpg';
import img9 from '../assets/photo9.jpg';
import img10 from '../assets/photo10.jpg';
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    type: 'moment' | 'letter' | 'photos' | 'content';
    momentId?: number;
  }>({
    isOpen: false,
    type: 'content',
  });

  // Landing page content
  const [landingContent, setLandingContent] = useState({
    subtitle: 'To the one who makes every heartbeat meaningful, every moment magical, and every day worth celebrating',
    passage: `In the tapestry of time, woven with threads of laughter and tears, joy and sorrow, our love story unfolds like a masterpiece painted by the universe itself.

Every moment with you is a verse in the poetry of my existence, a note in the symphony of our shared dreams. You are the light that guides me through darkness, the warmth that embraces me in the coldest of nights.

Together, we've created a constellation of memories that shine brighter than any star. Each smile, each touch, each whispered word of love adds another brilliant point of light to our eternal sky.`,
  });

  // Moments data
  const [moments, setMoments] = useState<Moment[]>([
    {
      id: 1,
      image: img1,
      caption: 'Una paakura varaikum antha love at first sight la lam ena ku nambikaiye ila  ana una paatha aprm etho onu ena kula un kita vanthu pesanum nu solitey irunthuchu ❤️',
      layout: 'left',
    },
    {
      id: 2,
      image: img2,
      caption: 'Na un kita nerla vanthu pesura ena pesanum nu idea vey ilaama vanthen ana un kita una nala paathupeynu sonen athu naa sathyama unmaiya mean pani than sonen ❤️  ',
      layout: 'right',
    },
    {
      id: 3,
      image: img3,
      caption: 'Ne ena ku okay sona apo ena ku avalo sandhosam ena panrathuney therla kaiyum odala kaalum odala ❤️',
      layout: 'center',
    },
    {
      id: 4,
      image: img4,
      caption: 'Nama school la lunch break la ona ukanthu pesura apo school mudichitu auto la pora apo elam avalo jolly ya irukum anaiku ena ku evalo prob irunthalum athu elathaiyum marathutu un kooda sandhosama varuven 🥰',
      layout: 'left',
    },
    {
      id: 5,
      image: img5,
      caption: 'Apo lam una pakurathukaaga un class veliya vey suthuven ethuku poreney theriyaathu ana antha pakam intha pakam maari mari suthitu irupen ❤️',
      layout: 'right',
    },
    {
      id: 6,
      image: img6,
      caption: 'En life la ne oru imp person maha ❤️',
      layout: 'center',
    },
    {
      id: 7,
      image: img7,
      caption: 'Ne sandhosama iruntha podhum maha ena ku Athukaaga na enavenalum panuven ❤️',
      layout: 'left',
    },
    {
      id: 8,
      image: img8,
      caption: 'Una ku nyaabagam irukanu therla first lam bore adicha va sanda podalam nu chat la suma sanda poduvaa 😂❤️',
      layout: 'right',
    },
    {
      id: 9,
      image: img9,
      caption: 'Na venus house cap ku nikura apo snap la ne ipadi pesu nu oru periya parah type pani anupunala atha na ipo varaikum enga pesa ponalum paathutu than poren athu ena ku oru bayangaramaaana motivation maha ❤️',
      layout: 'center',
    },
    {
      id: 10,
      image: img10,
      caption: 'Enoda periya strength maha nee ❤️ Una kandipaaa nala paathupenn Intha 3 years la neraiya memories ilanaalum chinna chinna cute memories iruku inum neraiya memories nama senthu create panalama ❤️🥰',
      layout: 'left',
    },
  ]);

  // Love letter content
  const [letter, setLetter] = useState(`

Dear Maha ,
                     Ithu nama rendu perum commit agi vara 3 rd valentines day ❤️. Nethu than una paatha maari irunthuchu ana athukula 3 years agiduchu ena la sathyama nambavey mudila ❤️

3 years la una kum seri ena kum seri neraiya prob irunthuchu 
Same time neeyum naaanun senthu neraiya memories create pani irukom ❤️
Athalam ipo nenachi paatha kooda super ha irukum 💗

En kita na first sona mari intha long dist relationship lam set aga thu konja nalaiku than apdi nu lam sonaanga ana ipo varaikum ena ku un mela iruka love um una ku en mela iruka love um konjam kooda koraiyala ❤️❤️❤️


Ena ku una rombaaaa pudikum ❤️
Ipo nu ilaa epomey ❤️🥰
Ena ku una rombaaaa pudikum ❤️❤️❤️

Neraiya solanum

Athalam nerla un kana paathu solanum ❤️❤️

Seekaramey solren ❤️🥰


I LOVEEE YOUUU SO MUCH MAHA ❤️❤️❤️

Again 

HAPPY VALENTINES DAY AMMUUUU ❤️❤️❤️`);

  // Surprise photos
  const [photos, setPhotos] = useState([
    img1,
    img2,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
  ]);

  const handleEditMoment = (momentId: number) => {
    setEditModal({ isOpen: true, type: 'moment', momentId });
  };

  const handleSaveEdit = (data: any) => {
    if (editModal.type === 'moment' && editModal.momentId !== undefined) {
      setMoments(moments.map(m => m.id === editModal.momentId ? { ...m, ...data } : m));
    } else if (editModal.type === 'letter') {
      setLetter(data);
    } else if (editModal.type === 'photos') {
      setPhotos(data);
    } else if (editModal.type === 'content') {
      setLandingContent(data);
    }
  };

  const getCurrentEditData = () => {
    if (editModal.type === 'moment' && editModal.momentId !== undefined) {
      return moments.find(m => m.id === editModal.momentId);
    } else if (editModal.type === 'letter') {
      return letter;
    } else if (editModal.type === 'photos') {
      return photos;
    } else if (editModal.type === 'content') {
      return landingContent;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            isLoading={isLoading}
            onLoaded={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating particles background */}
      <FloatingParticles count={25} />

      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onSettings={() => setEditModal({ isOpen: true, type: 'content' })}
      />

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {currentPage === 'home' && <LandingPage content={landingContent} />}
          {currentPage === 'moments' && <MomentsPage moments={moments} onEdit={handleEditMoment} />}
          {currentPage === 'envelope' && (
            <EnvelopePage
              letter={letter}
              onEdit={() => setEditModal({ isOpen: true, type: 'letter' })}
            />
          )}
          {currentPage === 'surprise' && (
            <SurprisePage
              photos={photos}
              onEdit={() => setEditModal({ isOpen: true, type: 'photos' })}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Edit Modal */}
      <EditModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ ...editModal, isOpen: false })}
        editType={editModal.type}
        currentData={getCurrentEditData()}
        onSave={handleSaveEdit}
        momentId={editModal.momentId}
      />
    </div>
  );
}