import {useState} from 'react';
import FullscreenLoader from './Components/FullscreenLoader/FullscreenLoader';
import "./App.scss"
import UploadScreen from './Components/UploadScreen/UploadScreen';

// 5.	Feel free to add any additional features of your choice. For example dark mode, responsiveness, a cool file preview, etc. 

const App = () => {

  const [showLoader, setUseLoader] = useState(true)

  // wait two seconds before showing the page
  setTimeout(() => setUseLoader(false), 2000)

  return (
    <div className="App">
     {showLoader
        ? <FullscreenLoader/>
        : <UploadScreen/>
      } 
    </div>
  )
}

export default App;

