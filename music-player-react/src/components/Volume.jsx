import React from "react";

function Volume({ audioRef, volume, changeVolume }) {
    const volumeBarRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const volumePercent = volume * 100;

    function handleChangeVolume(e){
        const rect = volumeBarRef.current.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;

        percent = Math.max(0, Math.min(1, percent));
        changeVolume(percent);
    }

    function handleMouseDown(e){
        setIsDragging(true);
        handleChangeVolume(e);
    }

    React.useEffect(() =>{

        function handleMouseMove(e){
            if(isDragging)
                handleChangeVolume(e);
        }

        function handleMouseUp(){
            setIsDragging(false);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () =>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

    }, [isDragging]);

    return (
        <div className="bottomVolumeArea">
            <span>🔊</span>
            <div 
                className="volumeBar"
                ref = {volumeBarRef}
                onMouseDown = {handleMouseDown}
            >
                <div 
                    className="volumeFill"
                    style={{width: `${volumePercent}%`}}
                >
                </div>
            </div>
        </div>
    )
}

export default Volume