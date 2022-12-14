const api = (path, options = {}) => fetch(`https://ign-trend.herokuapp.com/${path}`, options)
  .then((res) => res.json())
  .then((response) => {
    if (!Array.isArray(response) && Object.keys(response).length === 0) {
      throw new Error('Empty Response');
    }

    return response;
  });
export default api;
