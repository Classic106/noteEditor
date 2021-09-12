import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Note from './Note';

const RigthSide = ({ result })=>{
    
    const dispatch = useDispatch();
    
    const { notes } = useSelector(store => store);
    const { selectedItem } = useSelector(store => store);
    
    const [hasNote, setHasNote] = useState(false);

    useEffect(()=>{

        const index = result
            .findIndex(note => note.date === selectedItem.date);

        setHasNote(index !== -1);
    
    }, [result, selectedItem]);

    const Delete = async ()=>{

        let newNotes = [...notes];

        const index = notes
            .findIndex(note => note.date === selectedItem.date);
        
        if(index === -1) return;

        newNotes.splice(index, 1);
        
        if(index !== -1 && index < newNotes.length){
            await localStorage.setItem('selectedNote', JSON.stringify(newNotes[index]));
            dispatch({ type: 'SET_SELECTED_ITEM', payload: newNotes[index] });
        }
        
        if(newNotes.length === 0){
            await localStorage.removeItem('notes');
            await localStorage.removeItem('selectedNote');
            dispatch({ type: 'REMOVE_SELECTED_ITEM' });
            dispatch({ type: 'REMOVE_NOTES' });
        }else{
            await localStorage.setItem('notes', JSON.stringify(newNotes));
            dispatch({ type: 'SET_NOTES', payload: newNotes });
        }
    }

    const Save = async obj =>{
        
        const newNotes = [...notes];

        const index = notes
            .findIndex(note => note.date === selectedItem.date);
        
        if(index === -1) return;

        newNotes[index] = Object.assign(newNotes[index], obj);
        await localStorage.setItem('notes', JSON.stringify(newNotes));
        dispatch({ type: 'SET_NOTES', payload: newNotes });
        alert('Changes saved!!!');
    }

    return(
        <div className='rigth_side'>
            {
                hasNote ? <Note Delete={Delete} Save={Save}/> : <></>
            }
        </div>
    )
}

export default RigthSide;