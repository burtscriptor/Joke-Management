import axios from 'axios';
import { useState } from 'react';

const RandomJoke = () => {
    const [jokeArray, setJokeArray] = useState([]);
    const [currentJoke, setCurrentJoke] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [jokeToEdit, setJokeToEdit] = useState(null);
    const [displayAll, setDisplayAll] = useState(false);
    const [displayFav, setDisplayFav] = useState(false);

    const handleApi = async () => {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        load(response.data);
    };

    const load = (joke) => {
        setJokeArray((prevJokeArray) => [...prevJokeArray, joke]);
        setCurrentJoke(joke);
    };

    const addFav = () => {
        setFavourites((prevFav) => [...prevFav, currentJoke]);
        setDisplayFav(displayAll ? false : true);
    };

    const delFav = (index) => {
        const updatedList = favourites.filter((fav, idx) => idx !== index);
        setFavourites(updatedList);
    };

    const previous = () => {
        const prev = jokeArray.findIndex((j) => j.id === currentJoke.id);
        setCurrentJoke(jokeArray[prev - 1]);
    };

    const next = () => {
        const next = jokeArray.findIndex((j) => j.id === currentJoke.id);
        setCurrentJoke(jokeArray[next + 1]);
    };

    const edFav = (index) => {
        const editJoke = jokeArray.find((j, idx) => idx === index);
        setJokeToEdit(editJoke);
    };

    const edList = (index) => {
        const editJoke = jokeArray[index]
        setJokeToEdit(editJoke)
    };

    const delList = (index) => {
        const updatedList = jokeArray.filter((j, idx) => idx !== index);
        setJokeArray(updatedList)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(displayFav){
            const updatedList = favourites.map((j) => (j.id === jokeToEdit.id ? jokeToEdit : j));
            setFavourites(updatedList);
        } else {
            const updatedList = jokeArray.map((j) => (j.id === jokeToEdit.id ? jokeToEdit : j));
            setJokeArray(updatedList);
        }
        setJokeToEdit(null); // Reset edit state
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setJokeToEdit((prev) => ({ ...prev, [name]: value }));
    };

    const toggleDisplayMode = () => {
        setDisplayAll(!displayAll);
        setDisplayFav(!displayFav);
    };

    const cIndex = jokeArray.findIndex((j) => j.id === currentJoke.id);

    return (
        <div className='main'>
            <div className='get-button'>
                <button type='button' className='btn' onClick={handleApi}>Get Random Joke</button>
            </div>
            <div className='jokedisplay'>
                <div className='currentjoke'>
                    {currentJoke && jokeArray.length > 0 ? (
                        <>
                            <h3>Current Joke (Joke {cIndex + 1} / {jokeArray.length})</h3>
                            <p>{currentJoke.setup} - {currentJoke.punchline}</p>
                            <button type='button' className='btn' onClick={addFav} disabled={favourites.includes(currentJoke)}>Add to Favourites</button>
                        </>
                    ) : (
                        <p>Press Get Random Joke...</p>
                    )}
                </div>
            </div>
            {jokeArray.length > 0 && (
                <>
                    <div className='buttonlist'>
                        <button id='previous' className='btn' type='button' onClick={previous} disabled={currentJoke === jokeArray[0]}>Previous</button>
                        <button id='next' className='btn' type='button' onClick={next} disabled={currentJoke === jokeArray[jokeArray.length - 1]}>Next</button>
                    </div>
                    <div className='allbtn'>
                        <button type="button" className='btn' disabled={jokeArray.length === 0} onClick={toggleDisplayMode}>
                            {displayAll ? 'Click to view Favourite Jokes' : 'Click to view all Jokes'}
                        </button>
                    </div>
                </>
            )}
            {displayFav && !displayAll ? (
                <div className='favouriteslist'>
                    <h3>Favourite Jokes</h3>
                    {favourites.map((fav, index) => (
                        <div key={index} className='list'>
                            <p>{fav.setup} - {fav.punchline}</p>
                            <div className='listbtn'>
                                <button type='button' className='btn' onClick={() => delFav(index)}>Remove from Favourites</button>
                                <button type='button' className='btn editjoke' onClick={() => edFav(index)}>Edit Joke</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                jokeArray.length > 0 && (
                    <div className='alljokes'>
                        <h3>All Jokes</h3>
                        {jokeArray.map((joke, index) => (
                            <div key={index} className='list'>
                                <p>{joke.setup} - {joke.punchline}</p>
                                <div className='listbtn'>
                                    <button type='button' className='btn' onClick={() => delList(index)}>Remove from List</button>
                                    <button type='button' className='btn editjoke' onClick={() => edList(index)}>Edit Joke</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
            {jokeToEdit && (
                <div className='edit-container'>
                    <div className='edit'>
                        <form name='edit' onSubmit={handleSubmit}>
                            <textarea value={jokeToEdit.setup} name='setup' onChange={handleChange}></textarea>
                            <textarea value={jokeToEdit.punchline} name='punchline' onChange={handleChange}></textarea>
                            <button type='submit' className='btn'>Save Edit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RandomJoke;
