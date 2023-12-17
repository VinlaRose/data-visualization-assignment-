export const fetchData = () => async (dispatch) => {
    try {
      const response = await fetch('https://data-visualization.vinlarose.repl.co/items');
      const data = await response.json();
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error fetching  data:', error);
      dispatch({ type: 'FETCH_DATA_FAILURE' });
    }
  };


  export const fetchDataWithFilters = (filters) => async (dispatch) => {
    try {
      const url = `https://data-visualization.vinlarose.repl.co/items/getData${buildQueryString(filters)}`;
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



 