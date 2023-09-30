import React,{ useEffect, useState, useRef  } from 'react';
import './Hero.css';
import { popularGames, boxInfo } from '../constant/Constant';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import DropdownCategory from '../component/Drowpdown';
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Move from '../utils/Move';
import GameMapping from '../component/GameMapping';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [ data, setData ] = useState([]);

    const [ searching, setSearching ] = useState("");

    const [ resultSearching, setResultSearching ] = useState([]);

    const [ category, setCategory ] = useState("");

    const [ games, setGames ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    const refHome = useRef(null);
    const refGames = useRef(null);

    const [ scrollPosition, setScrollPosition ] = useState(0);

    const [ navActive, setNavActive ] = useState(0)

    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 15; 


    const totalPages = Math.ceil(games.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = games.slice(indexOfFirstItem, indexOfLastItem);

    const generateVisiblePageNumbers = () => {
      const visiblePages = [];
      const maxVisiblePages = 3; 
      const minPageNumber = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
      const maxPageNumber = Math.min(minPageNumber + maxVisiblePages - 1, totalPages);
  
      for (let i = minPageNumber; i <= maxPageNumber; i++) {
        visiblePages.push(i);
      }
  
      return visiblePages;
    };


    const choiceAllGames = () => {
      if( games ){
        setCategory("");
        setGames(data);
      }
    }


    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
          headers: {
            'X-RapidAPI-Key': 'cade637877msh20e8db6d14691ddp107d12jsn07aea961aa44',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
        });
        setLoading(false);
        setData(response.data);
        setGames(response.data);
        console.log(response.data);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
      }
    }


    useEffect(() => {
      if (refHome.current && refGames.current) {
        
        if (scrollPosition >= refGames.current.offsetTop) {
          setNavActive('games');
        } else {
          setNavActive('home');
        }
        
      }
    }, [scrollPosition]);
    

    const handleScroll = () => {
      const position = window.scrollY;

      setScrollPosition(position);
    };


    useEffect(() => {
      getData();

      Aos.init({
        duration: 1000,
      });

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
    },[])

    useEffect(() => {
      if( searching.length > 0 ){
        setResultSearching(
          data.filter( (val) => val.title.toLowerCase().includes( searching.toLowerCase() ) ).slice(0, 6)
        );
      }else{
        setResultSearching([]);
      }
    },[searching, data]);


    useEffect(() => {
      if (category !== "") {
        const filteredGames = data.filter(val =>
          val.genre.toLowerCase().includes(category.toLowerCase())
        );
        setGames(filteredGames);
        setCurrentPage(1);
      } else {
        setGames(data);
      }
    }, [category, data]);

    return (
      <>
            <div className='container-fluid m-0 p-0'>
              <Navbar category={category} navActive={navActive} refHome={refHome} refGames={refGames} />
              <div id='hero' ref={refHome} className='shadow position-relative' style={{backgroundImage: 'linear-gradient(rgba(25,25,25,0), rgba(25,25,25,19)), url("https://res.cloudinary.com/dld4k3hlf/image/upload/v1691243171/e8182e9ebcd6a77c27013c3c9be5c1d3_3377100585689279294_cnyzzt.jpg")'}}>
                <div className='text-center w-100'>
                  <h1 data-aos="fade-down" className='text-light'>
                    <b style={{fontFamily: "'Berkshire Swash', cursive"}}>Gamesku</b>
                  </h1>
                  <h5 data-aos="fade-down" data-aos-delay="50" style={{fontWeight: '400'}} className='text-light text-opacity-75'>
                    Rekomendasi Game Populer
                  </h5>
                  <h5 data-aos="fade-down" data-aos-delay="100" style={{fontWeight: '400'}} className='text-light text-opacity-75'>
                    Anda bisa Download Game-game tersebut secara gratis
                  </h5>
                </div>
                <div className='wrapBoxInfo position-absolute d-flex justify-content-center'>
                  {boxInfo.map((val, idx) => (
                    <div key={idx} data-aos="fade-down" className='boxInfo bg-black bg-opacity-50 shadow rounded-4 p-3'>
                      <h3 className='text-light'>{val.title}</h3>
                      <p className='text-light text-opacity-75'>{val.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <br>
              </br>
              <br>
              </br>

              <div id='allGames' ref={refGames} data-aos="fade-down">
                  <h2 className='title text-light'>All Games</h2>
                  <div className='wrapAllGames w-100 bg-black bg-opacity-25 rounded-5 shadow'>
                    <div className='d-flex justify-content-evenly align-items-center'>
                      <div className='wrapInput rounded-4 shadow d-flex justify-content-center align-items-center'>
                        <FontAwesomeIcon icon={faSearch} className='icon' />
                        <input type='text' value={searching} onChange={(e) => setSearching(e.target.value)} className='border-0' placeholder="Search..."></input>
                      </div>
                      <DropdownCategory setSearching={setSearching} setCategory={setCategory} category={category} choiceAllGames={() => choiceAllGames()} />
                    </div>
                    {loading?
                      <div className='loading d-flex justify-content-center align-items-center'>
                        <span><Spinner animation='grow' size='sm' className='text-light'/></span>
                        <span className='text-light fs-4 ms-2 me-2'><b>Loading</b></span>
                        <span><Spinner animation='grow' size='sm' className='text-light'/></span>
                      </div>
                    :
                      <div className='row p-0 m-0 justify-content-evenly w-100'>
                        {searching ?
                          <>  
                            {resultSearching.map((v,i) => (
                              <GameMapping key={i}
                                thumbnail={v.thumbnail}
                                title={v.title}
                                publisher={v.publisher}
                                release_date={v.release_date}
                                game_url={v.game_url}
                              />
                            ))}
                          </>
                          :
                          <>
                            {currentItems.map((v, i) => (
                              <GameMapping key={i}
                                thumbnail={v.thumbnail}
                                title={v.title}
                                publisher={v.publisher}
                                release_date={v.release_date}
                                game_url={v.game_url}
                              />
                            ))}
                            <div className='pagination d-flex justify-content-evenly pt-3'>
                                <button
                                  className='btn btn-success'
                                  disabled={currentPage === 1}
                                  onClick={() => {
                                    setCurrentPage(currentPage - 1);
                                    Move(refGames);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faArrowLeft} />
                                </button>

                                <div>
                                  {generateVisiblePageNumbers().map((pageNumber) => (
                                    <button
                                      key={pageNumber}
                                      className={`btn text-light ${currentPage === pageNumber ? 'btn-success' : 'bg-secondary bg-opacity-25'}`}
                                      onClick={() => {
                                        setCurrentPage(pageNumber);
                                        Move(refGames);
                                      }}
                                    >
                                      {pageNumber}
                                    </button>
                                  ))}
                                </div>

                                <button
                                  className='btn btn-success'
                                  disabled={currentPage === totalPages}
                                  onClick={() => {
                                    setCurrentPage(currentPage + 1);
                                    Move(refGames);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                          </>
                          }
                      </div>
                    
                    }

                  </div>

                  <div id='latestGames'>
                    <h2 data-aos="fade-down" className='title text-light'>Developer</h2>
                    <div className='popular d-flex justify-content-around'>
                    {popularGames.map((v,i) => (
                      <Link to={v.game_url} key={i} style={{cursor: 'pointer'}} data-aos="fade-down" data-aos-delay='100' className='popularGames shadow overflow-hidden rounded-4'>
                        <div className='description bg-black bg-opacity-25'>
                          <div className='gameName text-light'>{v.title}</div>
                          <div className='publisher text-light text-opacity-75'>{v.publisher}</div>
                          <div className='release_date text-light text-opacity-25'>{v.release_date}</div>
                        </div>
                      </Link>
                    ))}
                    </div>
                  </div>
              </div>

              <div id='footer' className='w-100 d-flex align-items-center justify-content-center border-0 border-top border-secondary border-opacity-25'>
                  <div className='text-secondary text-opacity-25'>
                    SMK Dwija Bhakti 1 Jombang @2023 Palindrom 
                  </div>
              </div>
            </div>
      </>
    )
}

export default Hero