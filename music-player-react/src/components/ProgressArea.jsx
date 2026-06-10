import React from "react";

function formatTime(time){
    if(!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2,"0")}`;
}

function ProgressArea({ currentTime , duration, seekTo }) {
    const progressBarRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    function handleSeek(e) {
        const rect = progressBarRef.current.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;

        percent = Math.max(0, Math.min(1,percent));
        seekTo(percent);
    }

    function handleMouseDown(e){
        setIsDragging(true);
        handleSeek(e);
    }

    React.useEffect(() => {
        function handleMouseMove(e){
            if(isDragging){
                handleSeek(e);
            }
        }

        function handleMouseUp(){
            setIsDragging(false);
        }

        document.addEventListener("mousemove",handleMouseMove)

        document.addEventListener("mouseup",handleMouseUp)

        return () =>{
            document.removeEventListener("mousemove",handleMouseMove);
            document.removeEventListener("mouseup",handleMouseUp)
        }
    }, [isDragging]);

    return (
        <div className="progressArea">
            <span>{formatTime(currentTime)}</span>
            <div className="progressBar" 
                ref={progressBarRef}  
                onMouseDown={handleMouseDown}
            >
                <div 
                    className="progressFill"
                    style={{width: `${progressPercent}%`}}
                >

                </div>
            </div>
            <span>{formatTime(duration)}</span>
        </div>
    )
}


export default ProgressArea;