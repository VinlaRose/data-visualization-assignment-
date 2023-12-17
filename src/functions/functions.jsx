export const buildQueryString = (filters) => {
    const queryString = Object.entries(filters)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
      console.log(queryString ? `?${queryString}` : '')
  
    return queryString ? `?${queryString}` : '';
  };