import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import './App.css';
import Main from './components/Main';

function App() {
  
  const dispatch = useDispatch();

  useEffect(()=>{

    const Func = async()=>{
      
      let notes = await localStorage.getItem('notes');
      if(notes) dispatch({ type: 'SET_NOTES', payload: JSON.parse(notes) });
      
      let note = await localStorage.getItem('selectedNote');
      if(note) dispatch({ type: 'SET_SELECTED_ITEM', payload: JSON.parse(note) });
    }

    Func();

  }, [dispatch]);

  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
