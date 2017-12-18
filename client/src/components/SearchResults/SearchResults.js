import React from "react";
import SaveBtn from "../SaveBtn";

const SearchResults = props =>
        <ul className="list-group search-results">
            {props.results.map((article, index) =>
            <li key={index} className="list-group-item">
                <strong className="float-left">{article.topic}</strong>
                <SaveBtn onClick={() => props.fn(article)} />
            </li>
            )}
        </ul>;
export default SearchResults;
