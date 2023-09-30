import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGamepad, faHome, faXmark } from '@fortawesome/free-solid-svg-icons';
import handleScroll from '../utils/Move';

const Navbar = (props) => {
  // toggle untuk smartphone
  const [ toggle, setToggle ] = useState(false);  

  return (
    <>
    <style>
        {`
            #navbar{
              top: 0;
              right: 0;
              width: 100%;
              height: 90px;
              transition: 0.5s;
            }

            .wrapNavbar{
              display: flex;
              align-items: center;
            }
            
            .btnPc{
              display: none;
            }

            #navbar li{
              display: inline-block;
            }

            .link {
              font-size: 15px;
              margin-left: 45px;
              color: rgba(255, 255, 255, 0.666);
              position: relative;
              padding-bottom: 2px;
              cursor: pointer;
              text-decoration: none;
              font-weight: 500;
            }

            .link:hover{
              color: white;
            }

            .link::before,
            .link::after {
              content: "";
              position: absolute;
              bottom: 0;
              height: 2px;
              width: 0;
              background-color: white;
              transition: width 0.3s;
            }

            .link::before {
              left: 50%;
              transform: translateX(-50%);
            }

            .link::after {
              right: 50%;
              transform: translateX(50%);
            }

            .link:hover::before,
            .link:hover::after{
              width: 80%;
            }

            .link.active{
              transform: scale(1.1);
              color: white;
            }

            .link.active::before,
            .link.active::after{
              width: 80%;
            }

            .closeSp{
              display: none;
            }

            @media only screen and (min-device-width: 768px) and (max-device-width: 1024px){
              .link{
                margin-left: 35px;
              }
            }

            @media only screen and (max-width: 767px){

              .hideSp{
                display: none !important;
              }

              .link:hover::before,
              .link:hover::after {
                width: 15%;
              }

              .link.active::before,
              .link.active::after{
                width: 15%;
              }

              #navbar{
                height: 100vh;
                right: -150%;
              }

              .wrapNavbar{
                display: block;
              }

              #navbar.active{
                right: 0;
              }

              .btnPc{
                display: block;
                height: 70px;
              }

              .closeSp{
                display: block;
                top: 4%;
                right: 7%;
              }

              #navbar ul{
                width: 100%;
                height: 100%;
                text-align: center
              }
              
              #navbar li{
                display: block;
              }

              #navbar li:nth-child(1){
                margin-top: 50%;
              }

              .link{
                display: block;
                width: 100%;
                margin-left: 0px;
                padding-bottom: 0px;
                margin-bottom: 35px;
              }

              #navbar .container{
                background-color: rgb(23,23,23);
              }

              .wrapFieldNavbarSp{
                height: 100%;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
              }
            }
        `}
    </style>

    <div style={{zIndex: '499'}} className='btnPc position-fixed top-0 start-0 end-0'>
      <div className='w-100 h-100 position-relative pt-4'>
        <div className='fs-2 ms-4 mt-1 text-light position-absolute start-0'>
            <img alt='design' width='45' src='https://res.cloudinary.com/dld4k3hlf/image/upload/v1691222172/online-game_6143866_srsibi.png'></img>
        </div>
        <div className='fs-4 mt-2 text-light bg-black bg-opacity-75 py-1 px-3 rounded-4 me-4 position-absolute end-0 py-0' onClick={() => setToggle(true)}>
            <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>

    <div style={{zIndex: '500'}} id='navbar' className={`position-fixed d-flex justify-content-center ${toggle && 'active'}`}>
      <div className='container m-0 p-0'>
        <div className='w-100 h-100 wrapNavbar position-relative m-0 p-0'>
            <div className='closeSp bg-black bg-opacity-75 px-3 py-1 rounded-4 text-light position-absolute fs-3' onClick={() => setToggle(false)}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
          <div className='fs-2 text-light position-absolute start-0 hideSp'>
            <img alt='design' width='45' src='https://res.cloudinary.com/dld4k3hlf/image/upload/v1691222172/online-game_6143866_srsibi.png'></img>
          </div>
          <div className='w-100 h-100 d-flex justify-content-end align-items-center'>
          <ul type='none' className='m-0 p-0'>
            <li><div to='/' className={`link ${props.navActive === 'home' && 'active'}`} onClick={() => {handleScroll(props.refHome);  setToggle(false);}}><b><FontAwesomeIcon className='me-1' icon={faHome} /> Home</b></div></li>
            <li><div to='/search' className={`link ${props.navActive === 'games' && 'active'}`} onClick={() => {handleScroll(props.refGames);  setToggle(false);}}><b><FontAwesomeIcon className='me-1' icon={faGamepad} /> Games</b></div></li>
          </ul>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default Navbar;