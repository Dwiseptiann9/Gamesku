import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const GameMapping = (props) => {
    return (
        <Link to={props.game_url} key={props.key} className='col col-4 p-0 px-2'>
            <div className='boxGame rounded-4 shadow overflow-hidden'>
            <LazyLoadImage
                className='picture'
                alt={props.title}
                effect="blur"
                width="100%"
                src={props.thumbnail} 
                placeholderSrc={props.thumbnail}
            />                          
            <div className='description bg-secondary bg-opacity-25 w-100 d-flex align-items-center'>
                <div>
                <h1 className='text-light'>{props.title}</h1>
                <div className='text-light text-opacity-75'>{props.publisher}</div>
                <div className='text-light text-opacity-25'>{props.release_date}</div>
                </div>
            </div>
            </div>
        </Link>
    )
}

export default GameMapping