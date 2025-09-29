import axios from 'axios';

const SERVER_URL = 'http://localhost:9000';

//دریافت تمامی مخاطبین
export const getAllContacts = () => {
  const url = `${SERVER_URL}/contacts`;

  return axios.get(url);
};

//دریافت مخاطب توسطایدی
export const getContact = (contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;

  return axios.get(url);
};

// دریافت مامی گروهان
export const getAllGroups = () => {
  const url = `${SERVER_URL}/groups`;
  return axios.get(url);
};

//دریافت گروه با ایدی
export const getGroup = (groupId) => {
  const url = `${SERVER_URL}/groups/${groupId}`;

  return axios.get(url);
};

// ساخ مخاطب

export const createContact = (contact) => {
  const url = `${SERVER_URL}/contacts`;
  return axios.post(url, contact);
};

//به روزرسانی مخاطب

export const updateContact = (contact, contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;

  return axios.put(url, contact);
};

//حذف مخاطب
export const deleteContact = (contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.delete(url);
};
