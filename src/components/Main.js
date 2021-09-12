import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { MySortArray } from '../helpers';

import LeftSide from './LeftSide';
import RigthSide from './RightSide';

import SearchImg from '../images/search.png';

import '../style/main.scss';

const Main = ()=>{

    const { notes } = useSelector(store => store);

    const [result, setResult] = useState(notes);

    const [byDate, setByDate] = useState(0);
    const [byTitle, setByTitle] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        setResult(notes);
    }, [notes]);

    useEffect(() =>{
        
        let newResult = 
            [...notes].filter(note => 
                new RegExp(search, 'gi').test(note.title));
        
        if(byDate === 1) newResult = MySortArray(newResult, 'date', 'DESK');
        if(byDate === 2) newResult = MySortArray(newResult, 'date', 'ASK');
        
        if(byTitle === 1)
            newResult = [...newResult]
                .sort((a, b)=> a.title.localeCompare(b.title));
        if(byTitle === 2)
            newResult = [...newResult]
                .sort((a, b)=> a.title.localeCompare(b.title)).reverse();

        setResult(newResult);

    }, [byDate, byTitle, search, notes]);

    const Sort = e =>{
        const index = e.target.attributes.index.value;

        switch(index){

            case 'date':
                setByDate(byDate+1 === 3 ? 0 : byDate+1);
                break;

            case 'title':
                setByTitle(byTitle+1 === 3 ? 0 : byTitle+1);
                break;
            
            default:
                break;
        }
    }

    return(
        <div className='main'>
            <section className='header'>
                <section className='sort'>
                    <span
                        onClick={Sort} index='title'
                        className={(()=>{
                            if(byTitle === 0) return 'icon-unchecked';
                            if(byTitle === 1) return 'icon-arrow-down';
                            if(byTitle === 2) return 'icon-arrow-up';
                        })()}
                    >Title</span>
                    <span
                        onClick={Sort} index='date'
                        className={(()=>{
                            if(byDate === 0) return 'icon-unchecked';
                            if(byDate === 1) return 'icon-arrow-down';
                            if(byDate === 2) return 'icon-arrow-up';
                        })()}
                    >Date</span>
                </section>
                <section className='search'>
                    <img src={SearchImg} alt='search'/>
                    <input
                        type='text' placeholder='Search by title'
                        onChange={e => setSearch(e.target.value)}
                    />
                </section>
            </section>
            <section className='notes'>
                <LeftSide result={result} />
                <RigthSide result={result} />
            </section>
        </div>
    )
}

export default Main;