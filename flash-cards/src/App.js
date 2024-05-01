import './App.css';
import React, { useState, useEffect } from 'react';
//import our card component

//top 40 meta relevant pokemon
const META_POKEMON = ["Cresselia", "Lickitung", "Registeel", "Quagsire", "Gligar", "Swampert", "Carbink", "Skarmory", 
"Feraligatr", "Lanturn", "Mandibuzz", "Mantine", "Bastidon", "Whiscash", "Guzzlord", "Annihilape", "Azumarill", "Empoleon", 
"Gallade", "Goodra", "Galarian Stunfisk", "Gligar", "Medichan", "Poliwrath", "Pelipper", "Serperior", "Vigoroth", "Clodsire", "Zweilous", "Dragonair",
"Abomasnow", "Machamp", "Hakamo-o", "Lanturn", "Jellicent", "Scrafty", "Toxapex", "Gogoat", "Kommo-o", "Trevenant"
]

function App() {
  
  //state variables to manage the views and api data
  var [pokemonList, setPokemonList] = useState({}); 


  //use effect, this is called once
  useEffect(() => {
      getPokemonData();
    }, []);
  //functions

  //this function makes the api call and formats the data into a useable list
  const getPokemonData = async () => {
    
    let pokemonNames, pokemonTypes
    
    /*pokemonNames comes in as an array of objects like so
    [{
      pokemonName: "pikachu",
      type: ["electric", "cute"]
    }]*/
    const nameCall = await fetch("https://pogoapi.net/api/v1/pokemon_types.json");
    pokemonNames = await nameCall.json();

    /*pokemonTyypes comes in as a key value pair like so where the key is the type and the values are the effectivnesss of that tpye on the key 
    {
      bug: Bug: 1, water: 1
      water: bug: 1, water:0.5
    }
    */
    const typeCall = await fetch("https://pogoapi.net/api/v1/type_effectiveness.json");
    pokemonTypes = await typeCall.json();

    
    formatData(pokemonTypes, pokemonNames)
  }

  const formatData = (pokemonTypes, pokemonNames) => {

    let completePokeInfo = []

    for (let pokemon of pokemonNames) {

      let name = pokemon.pokemon_name
      //we only want to look at normal, alolan and galarian pokemon. The data source we are dealing with
      //has tiings like "gofest" and "party hat" and we don't need to worry about those pokemon as they are just 
      //unnessesary variants of the same pokemon
      if (pokemon.form === "Alola" || pokemon.form === "Galarian" || pokemon.form === "Normal") {

        //prefixing the pokemons regional variant to the name for ease of use
        if (pokemon.form === "Alola") {
          name = "Alolan " + pokemon.pokemon_name
        } else if (pokemon.form === "Galarian") {
          name = "Galarian " + pokemon.pokemon_name
        } 
        
        //need to calcuulate the weaknesses and resistances this function returs an object {weakTo, resistantTo} for the given pokemon type
        let data = calculateWeaknessAndResistances(pokemon.type, pokemonTypes)

        //set our data once we have calculated it
        let pokeData = {meta: 0, name, type: pokemon.type, weakness: data.weakTo, resistances: data.resistantTo}
        if (META_POKEMON.includes(name)) pokeData.meta = 1
        completePokeInfo.push(pokeData)
      }
      
    }

    completePokeInfo.sort((a, b) => {
      if (a.meta > b.meta) return -1;
      if (a.meta < b.meta) return 1;
  
      // If meta is the same, sort by name alphabetically
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })

    console.log("setting the list?", completePokeInfo);
    setPokemonList(completePokeInfo)

  }

  const calculateWeaknessAndResistances = (pokemonTypes, allTypes) => {
    let typeEffectiveness = {}
    let weakTo = {}
    let resistantTo = {}

    //loop through the types of the pokemon that we are calculating, this can be either a single type or a double type
    //ie ["water"] or ["ground", "water"]
    for (let pokemonType of pokemonTypes) {
      //ths first loop is for the key value pair of all the possible types
      Object.keys(allTypes).forEach( allTypesKey => {
        
        //this next loop loops through the map of types that the parent type is either
        //strong against or weak against
        Object.keys(allTypes[allTypesKey]).forEach(typeDataKey => {
          let typeDataValue = allTypes[allTypesKey]
          let ourValue = typeDataValue[typeDataKey]
          
          //we only watnt to look at the values that are effecting our current pokemons type
          if (typeDataKey === pokemonType) {
            if (typeEffectiveness[allTypesKey]) {
              typeEffectiveness[allTypesKey] = typeEffectiveness[allTypesKey] * ourValue
            } else {
              typeEffectiveness[allTypesKey] = ourValue
            }
          }
        })
      })
    }

     //final loop thorugh to calculate the overall weakness and resistance, this is primarily for double typed pokemon
    //if there is a single type this doesn't do anything really
    Object.keys(typeEffectiveness).forEach( pokeType => {
      if (typeEffectiveness[pokeType] > 1) weakTo[pokeType] = typeEffectiveness[pokeType]
      if (typeEffectiveness[pokeType] < 1) resistantTo[pokeType] = typeEffectiveness[pokeType]
    })
    
    return {weakTo, resistantTo}
  }

  return (
    <div className="app">
      <header className="app-header">
        PVFlashCards
      </header>

    </div>
  );
}

export default App;
