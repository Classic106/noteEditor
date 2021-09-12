import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import{
    ValidTitle, ValidDescription
} from '../helpers';

const Note = ({ Delete, Save })=>{
   
    const { selectedItem } = useSelector(store => store);
    
    const [title, setTitle] = useState(selectedItem.title);
    const [description, setDescription] = useState(selectedItem.description);

    const [validTitle, setValidTitle] = useState(true);
    const [validDescription, setValidDescription] = useState(true);
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        setTitle(selectedItem.title);
        setDescription(selectedItem.description);
    }, [selectedItem]);

    useEffect(()=>{
        setDisabled(!(validTitle && validDescription))
    }, [validTitle, validDescription]);

    const SaveChanges = ()=>{
        (
            selectedItem.title !== title || 
            selectedItem.description !== description
        ) ? Save({title, description}) : alert('Nothig changed!!!');
    }

    const Change = e =>{
        
        const {name, value} = e.target;
        
        switch(name){
            
            case 'title':
                setTitle(value);
                setValidTitle(ValidTitle(value));
                return;

            case 'description':
                setDescription(value);
                setValidDescription(ValidDescription(value));
                return;
            
            default: 
                return;
        }
    }
    
    return(
        <div className='note'>
            <label>
                Title
                <input
                    type='text' value={title}
                    onChange={Change} name='title'
                    className={validTitle ? '' : 'invalid'}
                />
            </label>
            <label>
                Description
                <textarea
                    type='text' value={description}
                    onChange={Change} name='description'
                    className={validDescription ? '' : 'invalid'}
                />
            </label>
            <label className='delete' onClick={Delete} />
            <button
                onClick={SaveChanges}
                disabled={disabled}
            >Save</button>
        </div>
    )
}

export default Note;