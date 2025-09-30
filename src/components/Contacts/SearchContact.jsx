import { PURPLE } from '../../helpers/colors';

const SearchContact = ({ query, search }) => {
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span className="input-group-text" id="basic-addon1" style={{ background: PURPLE }}>
        {' '}
        <i className="fa fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        value={query.text}
        onChange={search}
        className="form-control"
        placeholder="جستجو مخاطبین "
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
