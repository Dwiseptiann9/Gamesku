import React,{ useState } from 'react';
import { iconCategory } from '../constant/Constant';

const DropdownCategory = (props) => {
    const [ toggle, setToggle ] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <>
        <style>
            {`

                .btnDropdown{
                    width: 100px;
                }

                .btnDropdown:hover{
                    transform: scale(1.0) !important;
                }

                .openCloseDropdown{
                    width: 100%;
                }

                .list{
                    width: 150px;
                    height: auto;
                    top: -30%;
                    padding-top: 80px;
                    background-color: rgba(0,0,0, 0.950);
                }

                .listCategory{
                    position: relative;
                    margin-bottom: 10px;
                    transition: 0.5s;
                    color: rgba(255, 255, 255, 0.423);
                    font-weight: 400;
                }

                .listCategory:hover{
                    color: white;
                }

                .listCategory::before,
                .listCategory::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    height: 2px;
                    width: 0;
                    background-color: white;
                    transition: width 0.3s;
                }

                .listCategory::before {
                    left: 50%;
                    transform: translateX(-50%);
                }

                .listCategory::after {
                    right: 50%;
                    transform: translateX(50%);
                }

                .listCategory:hover::before,
                .listCategory:hover::after{
                    width: 50%;
                }


                .listCategory.active{
                    color: white;
                }

                .listCategory.active::before,
                .listCategory.active::after{
                    width: 50%;
                }

                @media only screen and (min-device-width: 768px) and (max-device-width: 1024px){
                    .list{
                        width: 120%;
                        height: auto;
                        top: -25%;
                        padding-top: 80%;
                    }

                    .btnDropdown{
                        font-size: 15px;
                        padding: 5px 10px;
                    }

                    .listCategory:hover::before,
                    .listCategory:hover::after{
                        width: 50%;
                    }

                    .listCategory.active::before,
                    .listCategory.active::after{
                        width: 50%;
                    }
                }

                @media only screen and (max-width: 767px){
                    .list{
                        width: 120%;
                        height: auto;
                        top: -25%;
                        padding-top: 80%;
                    }

                    .btnDropdown{
                        width: 90px;
                        font-size: 15px;
                    }

                    .openCloseDropdown{
                        font-size: 14px;
                        padding: 5px 0px;
                    }


                    .listCategory:hover::before,
                    .listCategory:hover::after{
                        width: 50%;
                    }

                    .listCategory.active::before,
                    .listCategory.active::after{
                        width: 50%;
                    }
                }

                @media only screen and (max-width: 280px){
                    .btnDropdown{
                        font-size: 15px;
                        padding: 2px 10px;
                    }

                    .list{
                        width: 120%;
                        height: auto;
                        top: -25%;
                        padding-top: 70%;
                    }
                }
            `}
        </style>
        <div className='btnDropdown shadow position-relative d-flex justify-content-center' onClick={() => handleToggle()} style={{color: 'rgba(255, 255, 255, 0.823)', zIndex: '505'}}>
            <div className='position-relative btn rounded-5 shadow openCloseDropdown' style={{zIndex: '503', color: 'rgba(255, 255, 255, 0.823)', backgroundColor: 'rgba(255, 255, 255, 0.179)'}}>
                {toggle ? 'X' : 'Category'}
            </div>

            {toggle &&
                <div style={{zIndex: '500'}} className='list position-absolute text-center shadow pb-2 rounded-3'>
                    <div className={`listCategory ${props.category === "" && 'active'} `} onClick={props.choiceAllGames}>
                        <div onClick={() => setToggle(false)}>All games</div>
                    </div>
                    {iconCategory.map((v,i) => {
                        return(
                        <div
                            className={`listCategory ${props.category === v.alt && 'active'} `}
                            key={i}
                            onClick={() => {props.setCategory(v.alt); setToggle(false); props.setSearching("")}}
                        >
                            {v.alt}
                        </div>
                        )
                    })}
                </div>
            }
        </div>
        </>
    );
}

export default DropdownCategory;