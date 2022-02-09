import { useState } from 'react';
import './App.css';
import Search from './components/Search'
import Results from './components/Results'
import Navbar from './components/Navbar'

function App() {
  const [qstring, set_qstring] = useState("");
  const [qresults, set_qresults] = useState("");

  return(
    <>
      <div className="Page">
        <Search {...{qstring, set_qstring, set_qresults}}/>
        <Results {...{qresults, set_qresults}}/>
        <Navbar {...{}}/>
      </div>
    </>
  );
}

export default App;
