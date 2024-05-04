import './App.css';
import React, { useState, useEffect } from 'react';
import PokemonDetailCard from './components/PokemonDetailCard';
import PokemonQuizCard from './components/PokemonQuizCard';
import SearchBar from './components/SearchBar';
import InfoPanel from './components/InfoPanel';


//top 40 meta relevant pokemon grabbed from PVPoke.com this is subject to change as the season progresses
const META_POKEMON = ["Cresselia", "Lickitung", "Registeel", "Quagsire", "Gligar", "Swampert", "Carbink", "Skarmory", 
"Feraligatr", "Lanturn", "Mandibuzz", "Mantine", "Bastidon", "Whiscash", "Guzzlord", "Annihilape", "Azumarill", "Empoleon", 
"Gallade", "Goodra", "Galarian Stunfisk", "Gligar", "Medichan", "Poliwrath", "Pelipper", "Serperior", "Vigoroth", "Clodsire", "Zweilous", "Dragonair",
"Abomasnow", "Machamp", "Hakamo-o", "Lanturn", "Jellicent", "Scrafty", "Toxapex", "Gogoat", "Kommo-o", "Trevenant"
]

//this is our app info message
const APP_INFO = `Welcome to PVFlashCards! The purpose of this tool is to help you study pokemon, their types, weaknesses, and resistances so you can perform better
                  when competing in the PVP leagues of PokemonGo. The top 40 Meta pokemon are on the top of this list, however you can search to find any pokemon you 
                  would like. Once you click a pokemon card you will be presented with a few questions that you can click through at your own pace! Good luck!`

function App() {
  
  //state variables to manage the views and api data
  var [pokemonList, setPokemonList] = useState({}); 
  var [filteredList, setFilteredList] = useState({}); 
  var [pokemonQuizView, setPokemonQuizView] = useState({}); 
  var [pokemonListView, setPokemonListView] = useState(true); 
  var [showingPokemon, setShowingPokemon] = useState(40);
  var [infoMessage, setInfoMessage] = useState(true);


  useEffect(() => {
      getPokemonData();
    }, []);

  //this function makes the api calls and formats the data into a useable list
  //using async await here since we are setting a state variable, we want to make
  //sure the api calls are finished before trying to do that
  const getPokemonData = async () => {

    if (Object.keys(pokemonList).length) return

    let pokemonNames, pokemonTypes
    
    /*pokemonNames comes in as an array of objects like this
    [{
      pokemonName: "pikachu",
      type: ["electric"]
    }]*/
    const nameCall = await fetch("https://pogoapi.net/api/v1/pokemon_types.json");
    pokemonNames = await nameCall.json();

    /*pokemonTypes comes in as a key value pair where the key is the type and the values are the effectivnesss of that tpye on the key 
    {
      bug: bug: 1, water: 1
      water: bug: 1, water: 0.5
    }
    */
    const typeCall = await fetch("https://pogoapi.net/api/v1/type_effectiveness.json");
    pokemonTypes = await typeCall.json();


    formatData(pokemonTypes, pokemonNames)
  }

  /*
    formatData does all the heavy lifitng for our data, it takes the two api calls and mashes that data together into a useable 
    structure for our flash-cards. The end structure is an array of the following object

    {
      meta: 0,
      pokeName: "",
      pokeType: ["", ""],
      resistances: {},
      weakness: {}
    }

    -meta is a value 0 or 1 noting the meta relavance of the pokemon, currently we are only tracking the top 40. 
    -pokeName is a string for the Pokemon name.
    -pokeType is an array of strings (maximum 2) where each string is the typeing of that pokemon
    -resistances is a key value pair where the key is a pokemon type and the value is an integer with the the multiple of damage that type does to our pokemon
      for ex: resistances: {fire: 0.5} this would indicate our pokemon is resistant to fire by a multiple of 0.5 so any attack incoming is first multiplied by 0.5
    -weakness is a key value pair where the key is a pokemon type and the value is an integer with the the multiple of damage that type does to our pokemon.
      for ex: weakness: {water: 1.5} this would indicate our pokemon is weak to water by a multiple of 1.5 so any attack incoming is first multiplied by 1.5.
    
  */
  const formatData = (pokemonTypes, pokemonNames) => {
  
    let completePokeInfo = []

    for (let pokemon of pokemonNames) {

      let name = pokemon.pokemon_name
      //we only want to look at normal, alolan and galarian pokemon. The data source we are dealing with
      //has things like "gofest" and "party hat" and we don't need to worry about those pokemon as they are just 
      //unnessesary variants of the same pokemon
      if (pokemon.form === "Alola" || pokemon.form === "Galarian" || pokemon.form === "Normal") {

        //prefixing the pokemons regional variant to the name for ease of use
        if (pokemon.form === "Alola") {
          name = "Alolan " + pokemon.pokemon_name
        } else if (pokemon.form === "Galarian") {
          name = "Galarian " + pokemon.pokemon_name
        } 
        
        //need to calcuulate the weaknesses and resistances 
        //this takes in the current pokemons type and a list of all types and  returns an object {weakTo, resistantTo} for our current
        //pokemon
        let data = calculateWeaknessAndResistances(pokemon.type, pokemonTypes)

        //set our data once we have it formatted how we want
        let pokeData = {meta: 0, pokeName: name, pokeType: pokemon.type, weakness: data.weakTo, resistances: data.resistantTo, completedQuiz: 0}
        
        if (META_POKEMON.includes(name)) pokeData.meta = 1
        
        completePokeInfo.push(pokeData)
      }
      
    }

    //we want to sort our data by meta relavence and then a secondary sort by name..there is a search function but this is still nice to have
    completePokeInfo.sort((a, b) => {
      if (a.meta > b.meta) return -1;
      if (a.meta < b.meta) return 1;
  
      // If meta is the same, sort by name alphabetically
      if (a.pokeName < b.pokeName) return -1;
      if (a.pokeName > b.pokeName) return 1;
      return 0;
    })
    
    setPokemonList(completePokeInfo)
    //this is a bit inefficient but for this use case it works. this is here so we can have a nice user experience
    //with the search function without going too crazy with the search design
    setFilteredList(completePokeInfo)

  }

  //the goal of this function is to create a key value pair for all the types and their effectiveness on 
  //the given pokemon..ie {water: 2.0, fire: 1, grass: 0.5}
  const calculateWeaknessAndResistances = (pokemonTypes, allTypes) => {
    let typeEffectiveness = {}
    let weakTo = {}
    let resistantTo = {}

    //loop through the types of the pokemon that we are calculating, this can be either a single type or a double type
    //ie ["water"] or ["ground", "water"]
    for (let pokemonType of pokemonTypes) {
      //ths first loop goes through all our types where the key is the pokemon type and the value
      //is another key value pair of types and their effectiveness on the key
      Object.keys(allTypes).forEach( allTypesKey => {
        
        //looping through the nested key value pair for the above type
        Object.keys(allTypes[allTypesKey]).forEach(effectivenessKey => {
          let effectivenessMap = allTypes[allTypesKey]
          let effectivenessValue = effectivenessMap[effectivenessKey]
          
          //we only watnt to look at the values that are effecting our current pokemons type
          if (effectivenessKey === pokemonType) {
            //if we already have a value there ten we need to multiply what we have with what we are looking at
            //this is only going to be the case for dual type pokemon.
            if (typeEffectiveness[allTypesKey]) {
              typeEffectiveness[allTypesKey] = typeEffectiveness[allTypesKey] * effectivenessValue
            } else {
              typeEffectiveness[allTypesKey] = effectivenessValue
            }
          }
        })
      })
    }

    //this final loop puts the types into the respective weakTo or resistantTo object depending on the value
    Object.keys(typeEffectiveness).forEach( pokeType => {
      if (typeEffectiveness[pokeType] > 1) weakTo[pokeType] = typeEffectiveness[pokeType]
      if (typeEffectiveness[pokeType] < 1) resistantTo[pokeType] = typeEffectiveness[pokeType]
    })
    
    return {weakTo, resistantTo}
  }

  //this is working as a toggle from the flash card list to the quiz view
  //so we want to disable the list view and enable the quiz view
  const setQuizView = (pokemon) => {
    setPokemonQuizView(pokemon)
    setPokemonListView(false)
  }

  const searchPokemon = (pokeName) => {
    //we want to lowercase all the search values so it works nicer 
    let searchName = pokeName.toLowerCase()
    //here we filter our main pokemon list and set the filtered list
    //the pokemonList is our source of truth so anytime the search is edited
    //the UI resopnds to it, this allows for instant searching and when they delete the 
    //string it will return to the entire list
    let newList = pokemonList.filter(pokemon => {
      let lowerName = pokemon.pokeName.toLowerCase()
      return lowerName.includes(searchName)
    })
    
    //reset our values since we are searching, we don't need the other 
    //data for our quiz view 
    setPokemonQuizView({})
    setPokemonListView(true)
    setFilteredList(newList)
  }

  //this restores the app to the original list view when the home button,
  //or "try another pokemon" button is clicked
  const resetApp = () => {
    setPokemonListView(true)
    setPokemonQuizView({})
    
  }

  const updateQuizComplete = (pokeName) => {
    let tempPokeList = pokemonList
    for (let pokemon of tempPokeList) {
      if(pokemon.pokeName == pokeName) {
        pokemon.completedQuiz = 1
      }
    }
    console.log("calling seet list", tempPokeList);
    setPokemonList(tempPokeList)
    setFilteredList(tempPokeList)
  }

  const closeInfo = () => {
    setInfoMessage(false)
  }
  

  return (
    <div className="app">
      
      <header className="app-header">
        <div onClick={resetApp} className='go-home'>PVFlashCards</div>
      </header>

      <main className='app-main'>

        { infoMessage && pokemonListView ? 
          <aside className='info-panel-container'>
            <InfoPanel text={APP_INFO} closeInfo={closeInfo}/>
          </aside> : null
        }
  
        <SearchBar 
          onSearch={(pokeName) => searchPokemon(pokeName)}
        />
      
        {/* looping though our list and showing the pokemon detial card which has the name
        and a button to start the quiz, the filter here is for basic pagination  */}
        <section className='list-view'>
          {filteredList.length && pokemonListView ? filteredList.slice(0, showingPokemon).map(pokemon => {
            return (
              <span key={pokemon.pokeName}>
                <PokemonDetailCard  
                  completedQuiz={pokemon.completedQuiz}
                  pokeName={pokemon.pokeName}
                  setDetailView={() => setQuizView(pokemon)}
                />
              </span>
            )
          }) : null}

          {/* this is a basic pagination functionality so we just show a show more button at the bottom and increase our number of
          pokemon that are allowed to show */}
         
        </section>

          {/* if the quiz has been started ie there is data in the pokemonquizview object then we will show that pokemon in 
          quiz view */}
        {Object.keys(pokemonQuizView).length ? 
          <section className='detail-view'> 
            
            <div className='quiz-cards'>
              <PokemonQuizCard 
                pokeName={pokemonQuizView.pokeName}
                pokeType={pokemonQuizView.pokeType}
                resistances={pokemonQuizView.resistances}
                weakness={pokemonQuizView.weakness}
                updateQuizComplete={updateQuizComplete}
              />
            </div>
           
            <footer className='home-button'>
              <button className='action' onClick={resetApp}>Try another pokemon!</button>
            </footer>

          </section> : null
        }
        {/* this is our show more button just in case the user is scrolling through the list manually and not searching */}
        {pokemonListView && filteredList.length > showingPokemon ? 
        <footer className='show-more'>
          <button className='action' onClick={() => setShowingPokemon(showingPokemon + 40)}>
              Show me more pokemon
            </button>
        </footer> : null
        }
      </main>

    </div>
  );
}

export default App;
