import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, fetchDataWithFilters } from '../../redux/actions';
import Cookies from 'js-cookie';
import "./FilterData.css"
import { buildQueryString } from '../../functions/functions';
import ShareButton from '../UrlSharing/URLsharing';

const FilteringData = () => {
  const dispatch = useDispatch();

  function formatDateString(dateString) {
    const rewDate = new Date(dateString).toLocaleDateString('en-GB');
    const [day, month, year] = rewDate.split('/');
    const formattedDay = parseInt(day, 10).toString(); 
    return `${formattedDay}/${month}/${year}`;
  }

  function convertDateFormat(inputDate) {
    const [day, month, year] = inputDate.split('/');
  
    const convertedDate = new Date(`${year}-${month}-${day}`);
  
    const convertedYear = convertedDate.getFullYear();
    const convertedMonth = (convertedDate.getMonth() + 1).toString().padStart(2, '0');
    const convertedDay = convertedDate.getDate().toString().padStart(2, '0');
  
    const result = `${convertedYear}-${convertedMonth}-${convertedDay}`;
  
    return result;
  }
  

  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  const startDateURL = getURLParameter('startDate');
  const endDateURL = getURLParameter('endDate');
  const ageURL = getURLParameter('age');
  const genderURL = getURLParameter('gender');
  

  
  
  
  let storedStartDate, storedEndDate, storedAgeGroup, storedGender;
  
    if (startDateURL) {
      storedStartDate = startDateURL;
      storedEndDate = endDateURL;
      storedAgeGroup = ageURL;
      storedGender = genderURL;
    } else {
      storedStartDate = Cookies.get('startDate') || '2022-10-01';
      storedEndDate = Cookies.get('endDate') || '2022-10-30';
      storedAgeGroup = Cookies.get('age') || '';
      storedGender = Cookies.get('gender') || '';
    }
  
   

  const [startDate, setStartDate] = useState(convertDateFormat(storedStartDate) || '2022-10-01');
  const [endDate, setEndDate] = useState(convertDateFormat(storedEndDate) || '2022-10-30');
  const [age, setAge] = useState(storedAgeGroup || '');
  const [gender, setGender] = useState(storedGender || '');

  const filters = {
    startDate: startDate ? formatDateString(startDate) : '',
    endDate: endDate ? formatDateString(endDate) : '',
    age: age,
    gender: gender,
  };

  let urlShare = buildQueryString(filters)
  let fullURL = `http://localhost:3000/${urlShare}`
  

  const formattedStartDate = startDate ? formatDateString(startDate) : '';
  const formattedEndDate = endDate ? formatDateString(endDate) : '';

  function formatDateString(dateString) {
    const rewDate = new Date(dateString).toLocaleDateString('en-GB');
    const [day, month, year] = rewDate.split('/');
    const formattedDay = parseInt(day, 10).toString(); 
    return `${formattedDay}/${month}/${year}`;
  }

  const handleFetchData = () => {
    console.log(filters);
    const filterSave = {
      startDate: startDate,
      endDate: endDate,
      age: age,
      gender: gender,
    };
    console.log(filterSave)

   Object.entries(filterSave).forEach(([key, value]) => {
      Cookies.set(key, value);
    });

     dispatch(fetchDataWithFilters(filters));
  };

  const handleResetPreferences = () => {
   
    setStartDate('2022-10-01');
    setEndDate('2022-10-30');
    setAge('');
    setGender('');

    // Clear cookies
    ['startDate', 'endDate', 'age', 'gender'].forEach(key => {
        Cookies.remove(key);
      });

  

    // Fetch data with default filters
    dispatch(fetchData());
    
  };

  const shareUrl = 'https://example.com';

  return (

    <div>
      <div className='filters-container'>
      <div>
      <label>Time Range:</label>
      <input type="date" value={startDate} className='calander' onChange={(e) => setStartDate(e.target.value)} />

      <span> To </span>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
     

      
      <select value={age} onChange={(e) => setAge(e.target.value)}>
        <option value="">Select Age Group</option>
        <option value="15-25">15-25</option>
        <option value=">25">&gt;25</option>
      </select>

      
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>


      <div className='filterBtns'>
      <button onClick={handleFetchData}>Inquire</button>
      <button onClick={handleResetPreferences}>Reset </button>
      </div>
      
    </div>
    <ShareButton  url={fullURL}/>
    </div>
  );
};

export default FilteringData;
