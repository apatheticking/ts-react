import React, { Component } from 'react'
import User from '../interfaces/user.interface'
import SearchState from '../interfaces/searchState.interface'

export class PokemonSearch extends Component <User, SearchState> {

    pokemonRef: React.RefObject<HTMLInputElement>;
    constructor(props: User){
        super(props);
        this.state = {
            error: false,
            pokemon: null
        }
        this.pokemonRef = React.createRef();
    }

    onSearchClick = (): void => {
        const inputValue = this.pokemonRef.current.value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
            .then(res => {
                if(res.status !== 200) {
                    this.setState({ error: true })
                    return; 
                }
                res.json().then( data => {
                    this.setState({
                        error: false,
                        pokemon: {
                            name: data.name,
                            numberOfAbilites: data.abilities.length,
                            baseExperience: data.base_experience,
                            imageUrl: data.sprites.front_default
                        }
                    })
                })
            })
    }

    render() {
        const { name: userName, numberOfPokemons } = this.props
        const { error, pokemon } = this.state
    
        let resultMarkup;

        if(error) {
            resultMarkup = <p>Pokemon not found, please try again</p>
        } else if (this.state.pokemon){
            resultMarkup = <div>
                <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
                <p>
                    {userName} has {pokemon.numberOfAbilites} ablilites and {pokemon.baseExperience} base experience points
                </p>        
            </div>
        }
        
        return (
            <div>
                <p>
                    user {userName} {' '} 
                    { numberOfPokemons && <span>has {numberOfPokemons} pokemon</span> }
                </p>                
                <input type="text" ref={this.pokemonRef}/>
                <button onClick={this.onSearchClick} className="my-button">
                    Search
                </button>
                {resultMarkup}
            </div>
        )
    }
}

export default PokemonSearch
