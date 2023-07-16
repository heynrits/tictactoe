import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import { SlClock, SlTrophy, SlUser, SlTrash } from "react-icons/sl"
import { useNavigate } from "react-router-dom"
import LoadingIndicator from "./LoadingIndicator"

function SavedGameList() {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadGames()
    }, [])

    const handleDelete = (id) => {
        axios.delete(`/games/${id}`)
            .then(() => loadGames())
    }

    function loadGames() {
        setLoading(true)
        axios.get('/games').then(res => {
            setGames(res.data)
            setLoading(false)
        })
    }

    return (
        <div className="my-8 w-10/12 max-w-xl text-center animate-slide-right">

            <div className="font-chelsea mb-4">Load Game</div>

            <div className={`min-h-[30vh] max-h-[450px] py-8 overflow-y-scroll border-y-2 border-gray-200 flex items-center flex-col gap-4 ${loading ? 'justify-center' : 'justify-start'}`}>
            {
                    loading ? (
                        <LoadingIndicator color='white' text='Loading...' />
                    ) : (
                        <>
                            {
                                games.length > 0 ? (
                                    games.map((game, i) => <ListItem key={game._id} game={game} onDelete={handleDelete} />)
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
function ListItem({ game, onDelete }) {
    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
                console.log('outside')
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [])

    const handleContextMenu = (e) => {
        e.preventDefault();
        setShowMenu(true);
      };
    
      const handleDelete = () => {
        onDelete(game._id);
        setShowMenu(false);
      };

    return (
        <div className="w-full">
            <div className="flex items-center gap-2">
                <SlClock /> {dayjs(game.updatedAt).format("MMM D, YYYY h:mm A")}
            </div>

            <div className="relative" onContextMenu={handleContextMenu}>
                <div className="bg-white text-slate-blue border-4 border-white py-1 px-3 mt-2 rounded-2xl flex justify-between font-chelsea hover:cursor-pointer hover:border-4 hover:border-sand-yellow" onClick={() => navigate(`/play?gameId=${game._id}`)}>
                    <LiPlayerInfo mark="X" name={game.p1.name} wins={game.p1.winCount} />
                    <div>
                        <span className="text-2xl">vs</span>
                        <div className="flex items-center gap-1 relative">
                            <span className="text-lg absolute ml-1 opacity-80">/</span><SlTrophy /> {game.drawCount}
                        </div>
                    </div>
                    <LiPlayerInfo mark="O" name={game.p2.name} wins={game.p2.winCount} isAI={game.modeAI} />
                </div>
                {showMenu && (
                    <div className="absolute bottom-[-50%] right-0 w-40 bg-white border border-gray-300 shadow" ref={menuRef}>
                    <button
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-pale-red font-sans"
                        onClick={handleDelete}
                    >
                        <SlTrash /> Delete
                    </button>
                    </div>
                )}
            </div>
        </div>
    )
}

/**
 * List item player information
 */
function LiPlayerInfo({ mark, name, wins, isAI }) {
    return (
        <div className="w-[150px] flex items-center gap-4">
            <span className="text-4xl">{mark}</span>
            <div className="">
                <div className="flex items-center gap-2 truncate">
                    <SlUser /> {name} {isAI ? <span className="outlined-pill !font-sans !drop-shadow-none !rounded-lg text-xs py-0 px-2">AI</span> : null }
                </div>
                <div className="flex items-center gap-2">
                    <SlTrophy /> {wins}
                </div>
            </div>
        </div>
    )
}

export default SavedGameList