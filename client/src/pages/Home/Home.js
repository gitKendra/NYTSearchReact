import React, { Component } from "react";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Panel from "../../components/Panel/Panel";
import SearchResults from "../../components/SearchResults/SearchResults";
import DeleteBtn from "../../components/DeleteBtn";
import moment from "moment";

class Home extends Component {
  state = {
    articles: [],
    results: [],
    topic: "",
    start: "0",
    end: "0"
  };

  componentDidMount() {
    this.loadArticles();
  }

  // Load articles saved in database
  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, topic: "", start: "0", end: "0" })
      )
      .catch(err => console.log(err));
  };

  handleSaveArticle = article => {
    console.log("Saving Article")
    API.saveArticle(article)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    console.log("Delete article with id: "+id);
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));    
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Query the NYT API when user clicks Search and store the top 5 results in state
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.searchArticles({
        topic: this.state.topic,
        start: this.state.start,
        end: this.state.end
      })
        .then(res => {
          let searchArr = res.data.response.docs.slice(0,5);
          console.log(searchArr);
          let artObjs = searchArr.map(function(article){
            let artObj = {
              topic: article.headline.main,
              url: article.web_url,
              date: article.pub_date
            }
            console.log(artObj);
            return artObj;
          });
          console.log(artObjs);
          this.setState({ results: artObjs });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
          <Panel header="Search for a topic">
            <form>
              <label>
                Topic (required):
              </label>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
              />
              <label>
                Start Year (optional):
              </label>
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
              />
              <label>
                End Year (optional):
              </label>
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Panel>

          <Panel header="Results">
            {this.state.results.length ? (
                <SearchResults results={this.state.results} fn={this.handleSaveArticle}/>
              ) : (
                <h3>No Results to Display</h3>
              )}          
          </Panel>

         <Panel header="Saved Articles">
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url} rel="noopener noreferrer" target='_blank'>
                      <strong>{article.topic}</strong> Published: {moment(article.date).format("ll")}
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Panel>
      </Container>
    );
  }
}

export default Home;
