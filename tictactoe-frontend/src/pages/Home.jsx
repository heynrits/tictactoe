import SavedGameList from "../components/SavedGameList"

function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-white py-8">
            <h1 className="text-5xl font-chelsea">Tic-Tac-Toe</h1>
            <span className="outlined-pill text-sm my-2 px-6 py-2">Let's go!</span>

            <SavedGameList />

            <button className="outlined-pill px-8 py-3 hover:bg-sand-yellow-bright">Start a new game</button>
        </main>
    )
}

export default Home