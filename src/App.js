import {useState} from 'react';

import Navbar from './components/Navbar';
import Contacts from './components/contact/Contacts';

import './App.css';

const App = () => {

const [contacts , setContacts] = useState([]);

  return (
    <div className='App'>
      <Navbar />
      <Contacts contacts={contacts}/>
    </div>
  );
};

export default App;
