import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const LeftSide = ({ result })=>{
    
    const dispatch = useDispatch();

    const { notes } = useSelector(store => store);
    const { selectedItem } = useSelector(store => store);

    const NewItem = async () =>{
        
        let newNotes = [...notes];
        
        const newNote = {
            title: 'new Note',
            description: '',
            date: Date.now(),
        }

        newNotes.unshift(newNote);

        await localStorage.setItem('notes', JSON.stringify(newNotes));
        await localStorage.setItem('selectedNote', JSON.stringify(newNote));

        dispatch({ type: 'SET_NOTES', payload: newNotes });
        dispatch({ type: 'SET_SELECTED_ITEM', payload: newNote });
    }

    const OpenItem = async note => {
        dispatch({ type: 'SET_SELECTED_ITEM', payload: note });
        await localStorage.setItem('selectedNote', JSON.stringify(note));
    }

    return(
        <div className='left_side'>
            <section className='list_notes'>
                <label onClick={NewItem}>+ New</label>
                {
                    result.map((note, index) =>
                        <div
                            className={
                                (note.date === selectedItem.date)
                                    ? 'note_title selected' : 'note_title'
                            }
                            key={note.title+index}
                            onClick={()=> OpenItem(note)}
                        >
                            {note.title}
                        </div>
                    )
                }
            </section>
        </div>
    )
}

export default LeftSide;