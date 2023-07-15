import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function InGame() {
    const navigate = useNavigate()
    
    // for existing game data
    const [searchParams] = useSearchParams()
    const gameId = searchParams.get('gameId')

    // contains the player names for new game data
    const location = useLocation()
    const newData = location.state

    // current game state
    const [gId, setGId] = useState('')
    const [p1, setP1] = useState('')
    const [p1Wins, setP1Wins] = useState(0)
    const [p2, setP2] = useState('')
    const [p2Wins, setP2Wins] = useState(0)
    const [draws, setDraws] = useState(0)

    useEffect(() => {
        // Get game data from the backend
        if (gameId !== null) {
            axios.get(`/games/${gameId}`)
                .then(res => {
                    const { p1, p2, drawCount } = res.data
                    setP1(p1.name)
                    setP1Wins(p1.winCount)
                    setP2(p2.name)
                    setP2Wins(p2.winCount)
                    setDraws(drawCount)
                })
                .catch(err => {
                    navigate('/')
                })
        } else if (newData !== null) { // new game
            setP1(newData.p1)
            setP2(newData.p2)
        } else { // go back to homepage
            navigate('/')
        }
    }, [])

    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-white py-8">
            <h1 className="text-5xl font-chelsea">Tic-Tac-Toe</h1>
            <span className="outlined-pill text-sm my-2 px-6 py-2">Let's go!</span>

            
        </main>
    )
}

export default InGame