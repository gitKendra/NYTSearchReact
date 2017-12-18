import axios from "axios";

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

export default {
  // Gets all articles
  searchArticles: function(formData) {
    let queryURL = queryURLBase + formData.topic;

    // If the user provides a start year -- the start will be included in the queryURL
    if (parseInt(formData.start, 10)) {
      queryURL = queryURL + "&begin_date=" + formData.start + "0101";
    }
    // If the user provides an end year -- the end will be included in the queryURL
    if (parseInt(formData.end, 10)) {
      queryURL = queryURL + "&end_date=" + formData.end + "0101";
    }
    return axios.get(queryURL);
  },
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
