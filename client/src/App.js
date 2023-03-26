import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Notification from "./pages/Notification/Notification";
import Message from "./pages/Message/Message";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Settings from "./pages/Settings/Settings";
import Main from "./pages/Login/Main";
import Thread from "./pages/Thread/Thread";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/home' element={<Feed />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/tweet/:postId' element={<Thread />} />
        <Route path='/explore' element={<Search />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/message' element={<Message />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
