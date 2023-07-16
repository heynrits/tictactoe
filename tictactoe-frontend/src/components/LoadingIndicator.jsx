function LoadingIndicator({ color, text }) {
    return (
        <div className={`text-${color} text-center`}>
            <div>
                <span className="font-flower text-5xl animate-pulse">X</span>
                <span className="font-flower text-5xl animate-pulse">O</span>
            </div>
            <p className="animate-pulse">{text}</p>
        </div>
    )
}

export default LoadingIndicator