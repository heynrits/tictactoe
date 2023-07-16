import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { SlClock, SlTrophy, SlUser } from "react-icons/sl"
import { useNavigate } from "react-router-dom"
import LoadingIndicator from "./LoadingIndicator"

function SavedGameList() {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/games').then(res => {
            setGames(res.data)
            setLoading(false)
        })
    }, [])

    return (
        <div className="my-8 w-10/12 max-w-xl text-center animate-slide-right">

            <div className="font-chelsea mb-4">Load Game</div>

            <div className="min-h-[30vh] max-h-[450px] overflow-y-scroll py-8 border-y-2 border-gray-200 flex items-center flex-col justify-center gap-4">
            {
                    loading ? (
                        <LoadingIndicator color='white' text='Loading...' />
                    ) : (
                        <>
                            {
                                games.length > 0 ? (
                                    games.map((game, i) => <ListItem key={game._id} game={game} isFirst={i === 0} />)
                                ) : <span className="text-sm">No saved games yet.</span>
                            }
                        </>
                    )
                }

            </div>
        </div>
    )
}

/**
 * Displays game information such as player names, win counts, and draw counts
 */
function ListItem({ game, isFirst }) {
    const navigate = useNavigate()

    return (
        <div className={`w-full ${isFirst ? 'mt-8' : ''}`}>
            <div className="flex items-center gap-2">
                <SlClock /> {dayjs(game.updatedAt).format("MMM D, YYYY h:mm A")}
            </div>

            <div className="bg-white text-slate-blue border-4 border-white py-1 px-3 mt-2 rounded-2xl flex justify-between font-chelsea hover:cursor-pointer hover:border-4 hover:border-sand-yellow" onClick={() => navigate(`/play?gameId=${game._id}`)}>
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