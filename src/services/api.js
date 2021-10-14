const API_KEY = "23033623-b70795456acd26c564a94f9ff";
const URL = "https://pixabay.com/api/";

const fetchImage = (query, page = 1) => {
  return fetch(
    `${URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    return response.json();
  });
};
const api = {
  fetchImage,
};
export default api;
