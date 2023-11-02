import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchEvents } from '../redux/actions/eventActions';
import './SearchBar.css'; 

function SearchBar({ searchEvents }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    searchEvents(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  searchEvents: (query) => dispatch(searchEvents(query)),
});

export default connect(null, mapDispatchToProps)(SearchBar);


