export const fetchData = () => async (dispatch) => {
    try {
      const response = await fetch('https://913d4fb0-5514-4e47-afdc-34612f96aa87-00-32tfmal0mon3g.riker.replit.dev/items');
      const data = await response.json();
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error fetching  data:', error);
      dispatch({ type: 'FETCH_DATA_FAILURE' });
    }
  };


  export const fetchDataWithFilters = (filters) => async (dispatch) => {
    try {
      const url = `https://913d4fb0-5514-4e47-afdc-34612f96aa87-00-32tfmal0mon3g.riker.replit.dev/items/getData${buildQueryString(filters)}`;
      console.log(url)
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(data);
    dispatch({ type: 'FETCH_FILTERED_DATA_SUCCESS', payload: data.filteredData});
    } catch (error) {
      console.error('Error fetching data with filters:', error);
    dispatch({ type: 'FETCH_FILTERED_DATA_FAILURE' });
    }
  };
  
  const buildQueryString = (filters) => {
    const queryString = Object.entries(filters)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  
    return queryString ? `?${queryString}` : '';
  };



 