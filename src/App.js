import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';

import {
  Navbar,
  Contacts,
  EditContact,
  ViewContact,
  AddContact,
} from './components/Index';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={<Navigate to='/contacts' />}
        />
        <Route
          path='/contacts'
          element={
            <Contacts
              contacts={contacts}
              loading={loading}
            />
          }
        />
        <Route
          path='/contacts/add'
          element={<AddContact />}
        />
        <Route
          path='/contacts/:contactId'
          element={<ViewContact />}
        />
        <Route
          path='/contacts/edit/:contactId'
          element={<EditContact />}
        />
      </Routes>
    </div>
  );
};

export default App;
