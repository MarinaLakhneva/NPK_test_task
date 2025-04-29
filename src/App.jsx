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
      <div className='container_btn'>
        <button className='btn_download' onClick={handleOpenModal}>Загрузить</button>
        {isOpen && <Modal handleClose={handleCloseModal}/>}
      </div>
      <div className='container_download_area'>
      
      </div>
    </div>
  )
}

export default App
