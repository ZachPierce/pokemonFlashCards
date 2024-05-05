# PVFlashCards

PVFlashCards is a basic single page react app that simulates a flash card type studying environment using data from `pogo-api`. This app specifically is focused on studying pokemon, their typing, weaknesses, and resistances to help with performance in the PVP Battle Leagues of PokemonGo. Hope you enjoy!

# To Run this App

- Clone the directory
- Navigate to the `flash-cards` folder
- Run `npm install`
- Run `npm start`
- Navigate to your browser of choice and the app will be running on "localhost:3000"

# Data/Functionality overview

We have to make 2 API calls to `pogo-api`  
One to get a list of all pokemon, which comes back in the following format:  
>[  
>&emsp;{name: "pikachu", type: ["electric"]}  
>]

where the type array can be either one or two types.
The second to get a list of all types of pokemon and their weaknesses and resistances, that call comes back in the following format:   

>{  
>&emsp;bug: fire: 1.5, grass: 0.5  
>&emsp;water: bug: 1, water: 0.5  
>}  

where the key is the type of pokemon we are considering and the value is another key value pair where that key is the type we are comparing our first key with and the value is the value of damage it does on the parent type.  
For Ex. in the above object, Bug is our first key this shows that fire does 1.5 damage to bug and grass does 0.5 damage to bug.

With these two API calls we need to mash the data together into our own structure that is useable for our flascard app. That data is structured in the following format:  
>[  
>&emsp;meta: 0,  
>&emsp;pokeName: "pikachu",  
>&emsp;pokeType: ["electric"],  
>&emsp;weakness: {},  
>&emsp;resistances: {},  
>]

where:  
- meta is a value 0 or 1 noting the meta relavance of the pokemon, currently we are only tracking the top 40. 
- pokeName is a string for the Pokemon name.
- pokeType is an array of strings (maximum 2) where each string is the typeing of that pokemon
- resistances is a key value pair where the key is a pokemon type and the value is an integer with the the multiple of damage that type does to our pokemon for ex: resistances: {fire: 0.5} this would indicate our pokemon is resistant to fire by a multiple of 0.5 so any attack incoming is first multiplied by 0.5
- weakness is a key value pair where the key is a pokemon type and the value is an integer with the the multiple of damage that type does to our pokemon. for ex: weakness: {water: 1.5} this would indicate our pokemon is weak to water by a multiple of 1.5 so any attack incoming is first multiplied by 1.5.

# Notes/future considerations

- the search is pretty basic and not super efficient if the data set is large, a key value pair would be better here as search would be O(1). However the amount of pokemon is fixed so it works for this use case, going with an array here also has the benifit of being sortable which was important for the apps functionality
- I'm not an expert at cross functionality with different device sizes, right now it works well but there are a few things that I would like to be better, granted more time this would be a point of focus.
- If the requirements of the project were a bit different I think having a different card format would be fun and result in a nice UX. I could make it so clicking on the cards makes the card expand with a nice transition instead of forcing a screen change
- Id like to have much more in depth testing, for me this was an introduction to Jest/testing a front end APP so the tests that are currently written are more on the basic side and I would like them to be much more thorough
