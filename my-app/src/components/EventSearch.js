import React, { useState } from 'react';

const EventSearch = ({ searchEvents }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    tags: '',
    categories: '',
  });

  const handleSearch = () => {
    searchEvents(searchCriteria);
  };

  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Event Search</h2>
      <div>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={searchCriteria.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={searchCriteria.tags}
          onChange={handleChange}
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories"
          value={searchCriteria.categories}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default EventSearch;
