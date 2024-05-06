import './styles.css';
import React from 'react';

function SearchBar ({onSearch}) {
    const searchPokemon = () => {
        //grab the value from the input field
        let searchName = document.getElementById('poke-search').value;
        ///call the parent search function that will filter our list
        onSearch(searchName);
    }

    return (
        <div className="search-container">
            <input id="poke-search" className="search-input" type="text" placeholder="Search" onChange={searchPokemon} autoFocus/>
        </div>
    )  
}

export default SearchBar;
