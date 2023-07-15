import { useState } from "react"

import SavedGameList from "../components/SavedGameList"
import StartNewGame from "../components/StartNewGame";

function Home() {
    const [newGame, setNewGame] = useState(false);

    const onStartClick = () => {
        setNewGame(true);
    }

    const onHomeClick = () => {
        setNewGame(false);
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-white py-8">
            <h1 className="text-5xl font-chelsea">Tic-Tac-Toe</h1>
            <span className="outlined-pill text-sm my-2 px-6 py-2">Let's go!</span>

            {
                newGame ? <StartNewGame onHomeClick={onHomeClick} /> : (
                    <>
                        <SavedGameList />
                        <button className="outlined-pill px-8 py-3 hover:bg-sand-yellow-bright" onClick={onStartClick}>Start a new game</button>
                    </>
                )
            }
        </main>
    )
}

export default Home