import './App.css'
import {useState} from "react";
import {Modal} from "./components/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <div className='content'>
      <div className='container_btn'>
        <button className='btn_download' onClick={handleButtonClick}>Загрузить</button>
        {isOpen && <Modal isOpen={isOpen} handleClose={handleButtonClick}/>}
      </div>
      <div className='container_download_area'>
      
      </div>
    </div>
  )
}

export default App
