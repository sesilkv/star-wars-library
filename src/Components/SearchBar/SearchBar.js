import React, { useState, useEffect } from 'react'
import style from './searchbar.module.css'
import { useForm } from 'react-hook-form'

const SearchBar = (props) => {
    
    const [characterOptions, setCharacterOptions] = useState(['option1', 'option2'])
    const [planetOptions, setPlanetOptions] = useState(['option1', 'option2'])
    const [speciesOptions, setSpeciesOptions] = useState(['option1', 'option2'])
    
    useEffect( () => {
        fetch('https://swapi.dev/api/people')
        .then( response => {
            return response.json()
        })
        .then (data => {
            setCharacterOptions([...data.results])
        })
        .catch( err => {
            console.log(err)
        })

        fetch('https://swapi.dev/api/planets')
        .then( response => {
            return response.json()
        })
        .then (data => {
            setPlanetOptions([...data.results])
        })
        .catch( err => {
            console.log(err)
        })

        fetch('https://swapi.dev/api/species')
        .then( response => {
            return response.json()
        })
        .then (data => {
            setSpeciesOptions([...data.results])
        })
        .catch( err => {
            console.log(err)
        })
    }, [])

    const { register, handleSubmit } = useForm()
    const onSubmit = (formData) => {
        // menarik dari database lalu ditampilkan
        fetch('https://swapi.dev/api/films')
        .then(response => {
            return response.json()
        })
        .then(data => {
            props.setMovieList([...data.results.filter((item) => {
                let hasCharacter, hasPlanet, hasSpecies, releaseAfter
                if(formData.character) {
                    hasCharacter = item.characters.includes(formData.character)
                } else {
                    hasCharacter = true
                }

                if(formData.planet) {
                    hasPlanet = item.planets.includes(formData.planet)
                } else {
                    hasPlanet = true
                }

                if(formData.species) {
                    hasSpecies = item.species.includes(formData.species)
                } else {
                    hasSpecies = true
                }

                if(formData.release_date) {
                    releaseAfter = new Date(item.release_date) >= new Date(formData.release_date)
                } else {
                    releaseAfter = true
                }

                return (hasCharacter && hasPlanet && hasSpecies && releaseAfter)
            })])
        })
    }

    return (
    <div>
        <form id="search-movie" onSubmit={handleSubmit(onSubmit)}>
            <div className={style.search_container}>
                <div className={style.search_group}>
                    <label htmlFor="character">Character</label>
                    <select name="character" id="character" {...register('character')}>
                        <option value="">-- Select Character --</option>
                        {characterOptions.map((item, index) => {
                            return (
                                <option value={item.url} key={index}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className={style.search_group}>
                    <label htmlFor="planet">Planet</label>
                    <select name="planet" id="planet" {...register('planet')}>
                        <option value="">-- Select Planet --</option>
                        {planetOptions.map((item, index) => {
                            return (
                                <option value={item.url} key={index}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className={style.search_group}>
                    <label htmlFor="species">Species</label>
                    <select name="species" id="species" {...register('species')}>
                        <option value="">-- Select Species --</option>
                        {speciesOptions.map((item, index) => {
                            return (
                                <option value={item.url} key={index}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className={style.search_group}>
                    <label htmlFor="release_date">Release Date After</label>
                    <input type="date" name="release_date" id="release_date" {...register('release_date')} />
                </div>
                <div className={style.submit}>
                    <button type="submit">Search</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SearchBar