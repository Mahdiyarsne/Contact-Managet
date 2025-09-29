import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import {
  Navbar,
  Contacts,
  EditContact,
  ViewContact,
  AddContact,
} from './components/index';

import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from './services/contactService';

import './App.css';
import {
  COMMENT,
  CURRENTLINE,
  FOREGROUND,
  ORANGE,
  PURPLE,
  YELLOW,
} from './helpers/colors';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: '',
    photo: '',
    mobile: '',
    job: '',
    email: '',
    group: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [forceRender]);

  const createContactForm = async (event) => {
    event.preventDefault();

    try {
      const [status] = await createContact(getContact);

      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate('/contacts');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const setContactInfo = (event) => {
    setContact({ ...getContact, [event.target.name]: event.target.value });
  };

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className='p-4'
            dir='rtl'
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: '1em',
            }}>
            <h1 style={{ color: YELLOW }}> پاک کردن مخاطب </h1>
            <p style={{ color: FOREGROUND }}>
              آیا مطمعن هستید که میخواهید مخاطب{contactFullname} را پاک کنید
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className='btn mx-2 '
              style={{ backgroundColor: PURPLE }}>
              مطمعن هستم
            </button>
            <button
              onClick={onClose}
              className='btn'
              style={{ backgroundColor: ORANGE }}>
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        getContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

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
              contacts={getContacts}
              loading={loading}
              confirmDelete={confirm}
            />
          }
        />
        <Route
          path='/contacts/add'
          element={
            <AddContact
              loading={loading}
              setContactInfo={setContactInfo}
              contact={getContact}
              groups={getGroups}
              createContactForm={createContactForm}
            />
          }
        />
        <Route
          path='/contacts/:contactId'
          element={<ViewContact />}
        />
        <Route
          path='/contacts/edit/:contactId'
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
