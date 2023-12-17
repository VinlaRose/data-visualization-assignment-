import { useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import FilteringData from "../../components/FilteringInputs/FilterData"
import BarGraph from "../../components/barGraph/BarGraph"
import { fetchData, fetchDataWithFilters } from "../../redux/actions";

export const MainPage = () => {

    
  const dispatch = useDispatch();
  

  function formatDateString(dateString) {
    const rewDate = new Date(dateString).toLocaleDateString('en-GB');
    const [day, month, year] = rewDate.split('/');
    const formattedDay = parseInt(day, 10).toString(); 
    return `${formattedDay}/${month}/${year}`;
  }

  // Function to get URL parameters
 
function getURLParameter(name) {

  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.size)
  return urlParams.get(name);
 
}

const startDate = getURLParameter('startDate');
const endDate = getURLParameter('endDate');
const age = getURLParameter('age');
const gender = getURLParameter('gender');

console.log('startDate:', startDate);
console.log('endDate:', endDate);
console.log('age:', age);
console.log('gender:', gender);



let storedStartDate, storedEndDate, storedAgeGroup, storedGender;

  if (startDate) {
    storedStartDate = startDate;
    storedEndDate = endDate;
    storedAgeGroup = age;
    storedGender = gender;
  } else {
    storedStartDate = Cookies.get('startDate') || '2022-10-01';
    storedEndDate = Cookies.get('endDate') || '2022-10-30';
    storedAgeGroup = Cookies.get('age') || '';
    storedGender = Cookies.get('gender') || '';
  }

  console.log('storedstartDate:', storedStartDate);
  console.log('storedendDate:', storedEndDate);
  console.log('storedage:', storedAgeGroup);
  console.log('storedgender:', storedGender);

  const reqData = useSelector(state => state.filteredData);
 
  const fullData = useSelector(state => state.data);
  const loading = useSelector(state => state.loading);
  console.log(reqData);


// Function to calculate the total value of property A for each day
function calculateTotalA(arr) {
  const result = {};

  arr.forEach(obj => {
    const day = obj.day;
    const A = parseInt(obj.A, 10) || 0; // Convert A to integer

    if (!result[day]) {
      result[day] = { day, Atotal: 0 };
    }

    result[day].Atotal += A;
  });

  // Convert the result object to an array
  const resultArray = Object.values(result);

  return resultArray;
}

// Calculate total value of A for each date
const totalAArray = calculateTotalA(reqData);

// Output the result
console.log('Total A Array:', totalAArray);



  useEffect(() => {
    const filters = {
      startDate: storedStartDate,
      endDate: storedEndDate,
      age: storedAgeGroup,
      gender: storedGender,
    };

    

    const filtersApply =  {
      startDate: getURLParameter('startDate') == null ?  formatDateString(storedStartDate) : storedStartDate,
      endDate: getURLParameter('startDate') == null ?  formatDateString(storedEndDate) : storedEndDate,
      age: storedAgeGroup,
      gender: storedGender,
    };

    if(storedAgeGroup){
      console.log(true);
      console.log(filters)
      console.log(filtersApply)
      dispatch(fetchDataWithFilters(filtersApply))
    }else{
      console.log(false);
      dispatch(fetchData())
    }
  
   
    
  }, [dispatch, storedAgeGroup])

    return (
        <div className='fullPage'>
        <div>
          
        </div>
        
        
        <FilteringData/>
        
        
        {
        loading ? (<h1>Data is Loading...</h1>) : (<BarGraph data={reqData} />) 
        }
       
     
      
      
      </div>
     
    )
}