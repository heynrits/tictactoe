import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs"
import { SlTrophy } from "react-icons/sl"
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import value from "../functions/minmax";
import { deepClone2DArray } from "../functions/helper";

function InGame() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    
    // for existing game data
    const [searchParams] = useSearchParams()
    const gameId = searchParams.get('gameId')

    // contains the player names for new game data
    const location = useLocation()
    const newData = location.state

    // current game state
    const [modeAI, setModeAI] = useState(false)
    const [gId, setGId] = useState('')
    const [p1, setP1] = useState('')
    const [p1Wins, setP1Wins] = useState(0)
    const [p2, setP2] = useState('')
    const [p2Wins, setP2Wins] = useState(0)
    const [draws, setDraws] = useState(0)

    const [turn, setTurn] = useState('X')
    const [winner, setWinner] = useState(null)
    const [board, setBoard] = useState(initializeBoard())

    const roundNumber = p1Wins + p2Wins + draws + Number(winner === null)

    useEffect(() => {
        // Get game data from the backend
        if (gameId !== null) {
            axios.get(`/games/${gameId}`)
                .then(res => {
                    const { p1, p2, drawCount, modeAI } = res.data
                    setGId(gameId)
                    setModeAI(modeAI)
                    setP1(p1.name)
                    setP1Wins(p1.winCount)
                    setP2(p2.name)
                    setP2Wins(p2.winCount)
                    setDraws(drawCount)
                    setLoading(false)
                })
                .catch(err => {
                    navigate('/')
                })
        } else if (newData !== null) { // new game
            setP1(newData.p1)
            setP2(newData.modeAI ? 'COM' : newData.p2)
            setModeAI(newData.modeAI)
            setLoading(false)
        } else { // go back to homepage
            navigate('/')
        }
    }, [])

    const onCellClick = (e) => {
        const btn = e.target
        const i = btn.getAttribute('data-row-index')
        const j = btn.getAttribute('data-col-index')

        if (board[i][j] !== '') {
            return
        }

        // Fill the cell
        const b = deepClone2DArray(board)
        b[i][j] = turn
        setBoard(b)

        // Check if the game is already over
        const result = checkWinner(b);
        if (result !== null) {
            if (result.player === 'X') {
                setP1Wins(n => n + 1)
            } else if (result.player === 'O') {
                setP2Wins(n => n + 1)
            } else {
                setDraws(n => n + 1)
            }

            setWinner(result)
        } else {
            if (modeAI) {
                onAITurn(b)
            } else {
                setTurn(turn === 'X' ? 'O' : 'X');
            }
        }
    }

    function onAITurn(board) {
        const [action, _] = value({ board, type: 'max'})
        console.log({action, _})
        const [i, j] = action

        const b = deepClone2DArray(board)
        b[i][j] = 'O'
        setBoard(b)
        // Check if the game is already over
        const result = checkWinner(b);
        if (result !== null) {
            if (result.player === 'X') {
                setP1Wins(n => n + 1)
            } else if (result.player === 'O') {
                setP2Wins(n => n + 1)
            } else {
                setDraws(n => n + 1)
            }

            setWinner(result)
        }
    }

    const onNewRoundClick = () => {
        setTurn('X')
        setWinner(null)
        setBoard(initializeBoard())
    }

    const onQuitClick = () => {
        const gameState = {
            "p1": {
                "name": p1,
                "winCount": p1Wins
            },
            "p2": {
                "name": p2,
                "winCount": p2Wins
            },
            "drawCount": draws,
            "modeAI": modeAI,
        }

        setLoading(true)
        if (gId !== '') {
            axios.put(`/games/${gId}`, gameState)
                .then(() => {
                    navigate('/')
                })
        } else {
            axios.post('/games', gameState)
                .then(() => {
                    navigate('/')
                })
        }
    }

    // Returns true if the cell filled by the player is in the winning pattern
    function highlight(player, i, j) {
        if (winner !== null && winner.player !== '-' && player === winner.player) {
            if (winner.match.charAt(0) === 'r') {
                return winner.match.charAt(1) == i;
            } else if (winner.match.charAt(0) === 'c') {
                return winner.match.charAt(1) == j;
            } else if (winner.match === 'd1') {
                return i == j;
            } else if (winner.match === 'd2') {
                return j == 2-i;
            }
        }

        return false;
    }

    if (loading) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen text-white py-8">
                <h1 className="text-3xl font-chelsea mb-8">Tic-Tac-Toe</h1>
                <LoadingIndicator color="white" text="Please wait..." />
            </main>
        )
    }

    return (
        <main className="flex flex-col items-center justify-start min-h-screen text-white py-8 animate-slide-up">
            <h1 className="mt-8 text-3xl font-chelsea">Tic-Tac-Toe</h1>
            <span className="outlined-pill text-xs my-2 px-6 py-2">
                Round #{roundNumber}
            </span>

            <span className="inline-block pt-4 pb-4">
                {
                    winner === null ? 
                    `${turn === 'X' ? p1 : p2 }'s (${turn}) Turn` : (
                        winner.player !== '-' ? `${winner.player === 'X' ? p1 : p2} (${winner.player}) Won!` : 'Draw!'
                    )
                }
                
            </span>
            
            <div className={`w-full h-[400px] flex items-center justify-center ${winner !== null ? '!h-[200px] mb-8' : ''} transition-all duration-300 ease-in-out`}>
            <div className={`grid grid-cols-3 gap-3 w-full max-w-[400px] ${winner ? 'scale-50' : ''} transition-all duration-300 ease-in-out`}>
                {
                    board.map((row, i) => (
                      row.map((cell, j) => (
                        <button key={`${i},${j}`} className={`font-flower text-8xl border-[5px] border-white bg-[rgba(255,255,255,0.75)] ${highlight(cell, i, j) ? 'disabled:bg-mint' : 'disabled:bg-[rgba(220,220,220,0.75)]'} ${winner !== null && !highlight(cell, i, j) ? 'disabled:opacity-75' : ''} w-full aspect-square rounded-lg enabled:hover:bg-sand-yellow ${cell === 'O' ? 'text-dodger-blue' : 'text-hot-pink'} ${cell === '' ? 'text-transparent enabled:hover:text-quarter-white' : ''} disabled:cursor-not-allowed`} data-row-index={i} data-col-index={j} onClick={onCellClick} disabled={cell !== '' || winner !== null}>
                            {cell || turn}
                        </button>
                      ))
                    ))
                }
            </div>
            </div>

            {
                winner === null ? null : (
                    <>
                        <button className="outlined-pill px-8 py-3 hover:bg-sand-yellow-bright w-full max-w-[200px] mb-4" onClick={onNewRoundClick}>New Round</button>
                        <button className="outlined-pill px-8 py-3 !bg-white !text-slate-blue border-0 hover:opacity-90  w-full max-w-[200px]" onClick={onQuitClick}>Quit</button>
                    </>
                )
            }

            {/* Player 1 */}
            <div className={`fixed w-[230px] left-0 bottom-0 flex items-center gap-3 text-slate-blue bg-white p-6 font-chelsea rounded-tr-3xl border-t-4 border-r-4 border-dull-blue ${winner !== null && winner.player === 'X' ? '!bg-mint !border-deep-purple' : (winner !== null || turn !== 'X' ? 'opacity-50' : '')}`}>
                <BsPersonCircle size={40} />
                <div>
                    <div>{p1} (X)</div>
                    <div className="flex items-center gap-1">
                        <SlTrophy size={20} /> <span className="text-3xl">{p1Wins}</span>
                    </div>
                </div>
            </div>

            <div className={`fixed bottom-4 left-1/2 translate-x-[-50%] py-0.5 px-3 ${winner && winner.player === '-' ? 'opacity-100 !bg-mint !border-deep-purple' : 'opacity-60 bg-white'} flex flex-col items-center text-slate-blue rounded-lg`}>
                <span className="font-sans uppercase text-sm">Draws</span>
                <span className="font-chelsea text-2xl mt-[-8px]">{draws}</span>
            </div>

            {/* Player 2 */}
            <div className={`fixed w-[230px] right-0 bottom-0 flex items-center gap-3 text-slate-blue bg-white p-6 font-chelsea rounded-tl-3xl border-t-4 border-l-4 border-dull-blue ${winner !== null && winner.player === 'O' ? '!bg-mint !border-deep-purple' : (winner !== null || turn !== 'O' ? 'opacity-50' : '')}`}>
                <BsPersonCircle size={40} />
                <div>
                    <div>{p2} (O)</div>
                    <div className="flex items-center gap-1">
                        <SlTrophy size={20} /> <span className="text-3xl">{p2Wins}</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

function initializeBoard() {
    const board = []
    for (let i = 0; i < 3; i++) {
        const row = Array(3).fill('');
        board.push(row);
    }

    return board;
}

function checkWinner(board) {
    // Check for a horizontal match
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return { player: board[i][0], match: `r${i}`}
        }
    }

    // Check for a vertical match
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
            return { player: board[0][j], match: `c${j}`}
        }
    }

    // Check for a diagonal match
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return { player: board[0][0], match: 'd1' }
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return { player: board[0][2], match: 'd2' }
    }

    let filled = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            filled += Number(board[i][j] !== '')
        }
    }

    if (filled === 9) { // draw
        return { player: '-' }
    }
    
    return null
}

export default InGame