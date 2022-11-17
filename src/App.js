import { Route, Routes } from 'react-router-dom';
import '../src/App.css';
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import Navbar from './Components/Sidebar/Navbar';
import Video from './Components/Video/Video';
import Search from './Pages/Search/Search';
import Private from './Routes/Private';
import History from './Pages/History/History';
import Explore from './Pages/Explore/Explore';
import Library from './Pages/Library/Library';
import Chanel from './Pages/AddChanel/Chanel';
import { useContext } from 'react';
import { Context } from './Context/HamburgerBtn';
import Login from './Pages/Login/Login';
import Upload from "./Pages/Upload/Upload"
import ChannelHeader from "../src/Components/ChannelHeader/ChannelHeader"
import ChannelNavbar from "../src/Components/ChannelNavbar/ChannelNavbar"
import ContentUser from './UploadPage/Content/ContentUser';
import Like from './Pages/Like/Like';
import Aboutchannel from './Pages/AboutChannel/ABoutChannel';
import Not from './Components/NotFound/Not';
function App() {
  const { themeColor, setThemeColor } = useContext(Context)
  const { userVideoUpload, setUserViodeUpload } = useContext(Context)
  const { emailFilter, setEmailFilter } = useContext(Context)
  return (
    <div>

    <div className={userVideoUpload ? "d-none" : "d-block"}>
      <Header />
      <main className={userVideoUpload ? "d-none" : "d-block"}>
        <Navbar/>
        <div className={themeColor == "dark" ? "content__dark content" : `content`}>
          <Routes>
            <Route path='/' element={<Private/>}>
              <Route path='/' element={<Content/>}/>
              <Route path='/:productId/:id/:title/:views/:publishedTimeText/:channelName' element={<Video/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/history' element={<History/>}/>
              <Route path='/explore' element={<Explore/>}/>
              <Route path="/library" element={<Library/>}/>
              <Route path="/chanel" element={<Chanel/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/up' element={<Upload/>}/>
              <Route path='/like' element={<Like/>}/>
              <Route path='/:channelId/:channelParams' element={<Aboutchannel/>}/>
              <Route path='/*' element={<Not/>}/>
            </Route>
          </Routes>
        </div>
      </main>
    </div>

    { emailFilter.length > 0 ? <div className={userVideoUpload ? "d-block" : "d-none"}>
        <ChannelHeader/>
            <main>
              <ChannelNavbar/>
              <div className={themeColor == "dark" ? "content__dark upload__content-dark content" : `content upload__content`}>
                <Routes>
                    <Route path='channelvideo' element={<ContentUser/>}/>
                </Routes>
              </div>
          </main>
      </div> : <div className={emailFilter.length == 0 ? "d-none" : "d-block"}>
      <Header />
      <main>
        <Navbar/>
        <div className={themeColor == "dark" ? "content__dark content" : `content`}>
          <Routes>
            <Route path='/:channelId' element={<Aboutchannel/>}/>
            <Route path='/' element={<Private/>}>
              <Route path='/' element={<Content/>}/>
              <Route path='/:productId/:id/:title/:views/:publishedTimeText' element={<Video/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/history' element={<History/>}/>
              <Route path='/explore' element={<Explore/>}/>
              <Route path="/library" element={<Library/>}/>
              <Route path="/chanel" element={<Chanel/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/up' element={<Upload/>}/>
              <Route path='/like' element={<Like/>}/>

              <Route path='/*' element={<Not/>}/>
            </Route>
          </Routes>
        </div>
      </main>
    </div>
      }
    </div>
  );
}

export default App;
