import './App.css'
import {useCallback, useState} from "react";
import {Modal} from "./components/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  return (
    <div className='content'>
      <>
        <button className='btn_open_modal' onClick={handleOpenModal}>Загрузить</button>
        {isOpen && <Modal handleClose={handleCloseModal}/>}
      </>
      <div className='table'></div>
    </div>
  )
}

export default App
