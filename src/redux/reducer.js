const initialState = {
    data: [],
    filteredData: [],
    loading: true,
    error: null
   
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          data: action.payload.data,
        filteredData: action.payload.data,
          loading: false,
          error: null,
        };
  
      case 'FETCH_DATA_FAILURE':
        return {
          ...state,
          loading: false,
          error: 'Error fetching  data',
        };
  
        case 'FETCH_FILTERED_DATA_SUCCESS':
      return {
        ...state,
        
        filteredData: action.payload,
        loading: false,
        error: false,
      };

    case 'FETCH_FILTERED_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
      default:
        return state;
    }
  };
  
  export default dataReducer;