import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { SlClock, SlTrophy, SlUser } from "react-icons/sl"

function SavedGameList() {
    const [games, setGames] = useState([])

    useEffect(() => {
        axios.get('/games').then(res => {
            setGames(res.data)
        })
    }, [])

    return (
        <div className="my-8 w-10/12 max-w-xl text-center">
            <div className="font-chelsea mb-4">Load Game</div>

            <div className="min-h-[30vh] max-h-[450px] overflow-y-scroll py-8 border-y-2 border-gray-200 flex items-center flex-col justify-center gap-4">
                {
                    games.length > 0 ? (
                        games.map((game, i) => <ListItem key={game._id} game={game} isFirst={i === 0} />)
                    ) : <span className="text-sm">No saved games yet.</span>
                }
            </div>
        </div>
    )
}

/**
 * Displays game information such as player names, win counts, and draw counts
 */
function ListItem({ game, isFirst }) {
    return (
        <div className={`w-full ${isFirst ? 'mt-8' : ''}`}>
            <div className="flex items-center gap-2">
                <SlClock /> {dayjs(game.updatedAt).format("MMM D, YYYY h:MM A")}
            </div>

            <div className="bg-white text-slate-blue py-2 px-4 mt-2 rounded-2xl flex justify-between font-chelsea">
                <LiPlayerInfo mark="O" name={game.p1.name} wins={game.p1.winCount} />
                <div>
                    <span className="text-2xl">vs</span>
                    <div className="flex items-center gap-1 relative">
                        <span className="text-lg absolute ml-1 opacity-80">/</span><SlTrophy /> {game.drawCount}
                    </div>
                </div>
                <LiPlayerInfo mark="X" name={game.p2.name} wins={game.p2.winCount} />
            </div>
        </div>
    )
}

/**
 * List item player information
 */
function LiPlayerInfo({ mark, name, wins }) {
    return (
        <div className="w-[150px] flex items-center gap-4">
            <span className="text-4xl">{mark}</span>
            <div>
                <div className="flex items-center gap-2">
                    <SlUser /> {name}
                </div>
                <div className="flex items-center gap-2">
                    <SlTrophy /> {wins}
                </div>
            </div>
        </div>
    )
}

export default SavedGameList