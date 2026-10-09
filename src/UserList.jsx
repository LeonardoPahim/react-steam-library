import { useState, useEffect } from 'react';

function headerImage(appId){
    return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`
}

function formatPlaytime(minutes){
    return (minutes/60).toFixed(1) + ' h'
}

function UserList(){
    const [games, setGames] = useState([])

    useEffect(() => {
        async function loadGames(){
            const res = await fetch('/steam-api/IPlayerService/GetOwnedGames/v1/?include_appinfo=true')
            const data = await res.json()
            setGames(data.response.games.sort((a, b) => b.playtime_forever - a.playtime_forever))
        }
        loadGames()
    }, [])

    return(
        <>
            <h1>{games.length} games</h1>
            <ul>
                {games.map(game => (
                    <li key={game.appid}>
                        <img src={headerImage(game.appid)} alt={game.name} width={230} />
                        {game.name}: {formatPlaytime(game.playtime_forever)}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserList
