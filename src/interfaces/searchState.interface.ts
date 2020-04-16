export default interface SearchState {
    error: boolean,
    pokemon: Pokemon
}

interface Pokemon {
    name: string,
    numberOfAbilites: number,
    baseExperience: number,
    imageUrl: string
}