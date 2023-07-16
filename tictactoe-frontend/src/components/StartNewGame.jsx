import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SlUser } from "react-icons/sl"
import Checkbox from "./Checkbox"

function StartNewGame({ onHomeClick }) {
    const navigate = useNavigate()

    const [modeAI, setModeAI] = useState(false);

    const [p1, setP1] = useState('')
    const [p2, setP2] = useState('')

    const [p1Warning, setP1Warning] = useState(false)
    const [p2Warning, setP2Warning] = useState(false)

    const onInputChange = (e) => {
        if (e.target.name == 'p1') {
            setP1(e.target.value.trim())
        } else {
            setP2(e.target.value.trim())
        }
    }

    const onStartGameClick = () => {
        setP1Warning(p1.length === 0 || p1 === p2)
        if (!modeAI) {
            setP2Warning(p2.length === 0 || p1 === p2)
        }

        
        if (p1.length === 0 || (!modeAI && (p2.length === 0 || p1 === p2))) {
            return
        }
        
        navigate('/play', { state: { p1, p2, modeAI } })
    }

    return (
        <div className="my-8 w-10/12 max-w-xl text-center animate-slide-left">
            <div className="font-chelsea">Start a New Game</div>
            <p className="font-sans">Please enter your names...</p>
            
            <div className="mt-16 mb-20 flex justify-between gap-4 items-start">
                <div className="flex-1">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <SlUser /> Player 1 (X)
                    </div>
                    <input type="text" name="p1" className={`block w-full bg-[rgba(255,255,255,0.75)] border-2 ${p1Warning ? 'border-pale-red' : 'border-white'} rounded-lg p-3 text-black`} onChange={onInputChange} />
                </div>

                {
                    modeAI ? null : (
                        <>
                            <span className="inline-block my-6 font-chelsea">vs</span>

                            <div className="flex-1">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <SlUser /> Player 2 (O)
                                </div>
                                <input type="text" name="p2" className={`block w-full bg-[rgba(255,255,255,0.75)] border-2 ${p2Warning ? 'border-pale-red' : 'border-white'} rounded-lg p-3 text-black`} onChange={onInputChange} />
                            </div>
                        </>
                    )
                }
            </div>

            <div>
                <Checkbox state={[modeAI, setModeAI]} label="Play with AI" />
            </div>

            <div className="mt-10 flex flex-col items-center gap-5">
                <button className="outlined-pill px-8 py-3 hover:bg-sand-yellow-bright w-full max-w-[200px]" onClick={onStartGameClick}>Start Game</button>
                <button className="outlined-pill px-8 py-3 !bg-white !text-slate-blue border-0 hover:opacity-90  w-full max-w-[200px]" onClick={onHomeClick}>Go Home</button>
            </div>
        </div>
    )
}

export default StartNewGame