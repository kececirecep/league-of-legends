import { useEffect, useState } from 'react';
import './App.css';
import Aside from './Components/Aside';
import Content from './Components/Content';
import axios from 'axios';
import Modal from 'react-modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHero, setSelectedHero] = useState(null); // Seçili kahramanı takip etmek için state ekledik

  const myModalOpen = (hero) => {
    setSelectedHero(hero); // Seçili kahramanı ayarla
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getHeroes();
  }, []);

  async function getHeroes() {
    try {
      const response = await axios.get("http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json");
      const data = response.data.data;
      const heroList = Object.values(data);
      setHeroes(heroList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (search !== "") {
      getHeroesSearch(search);
    } else {
      getHeroes();
    }
  }, [search]);

  async function getHeroesSearch(search) {
    try {
      const response = await axios.get("https://raw.githubusercontent.com/kececirecep/champion.json/main/lol");
      
      const data = response.data.data;
      const heroList = Object.values(data).filter(hero => hero.id.toLowerCase().includes(search.toLowerCase()));
      setHeroes(heroList);
    } catch (error) {
      console.error(error);
    }
  }

  const custmColor = {
    borderColor: "#F4BB50"
  };

  return (
    <div className="speBg">
      <div className='flex mt-12 container mx-auto'>
        <div className='p-4 fixed w-[15%] h-full flex flex-col '>
          <Aside />
          <input onChange={(e) => setSearch(e.target.value)} type="text" class="border mt-4 p-1 px-3 text-white bg-gray-900" style={custmColor} placeholder='Search Hero..' />
        </div>
        <div className=' ml-[25%] flex flex-wrap justify-center items-center'>
          {heroes.map((hero, index) => (
            <div key={index} onClick={() => myModalOpen(hero)}> {/* onClick içindeki fonksiyonu ok işaretleriyle tanımlayarak hero parametresini aktarın */}
              <Content name={hero.name} imageHero={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_0.jpg`} />
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Hero Popup"
        style={{
          overlay: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '100%',
            height: '100%',
          },
        }}
      >
        
        {selectedHero && (
          <>
            <h2>{selectedHero.name}</h2>
            <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedHero.id}_0.jpg`} width="400px" height="150px" alt={selectedHero.name} />
          </>
        )}
       
        <button onClick={closeModal}>Kapat</button>
      </Modal>
    </div>
  );
}

export default App;
