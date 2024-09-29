import { useEffect, useRef, useState } from "react"

function StopWatch(){
    
    const [isRuning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(()=>{

        if(isRuning === true){
            intervalIdRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current)
            },10); //10 ms
        }

        return() =>{
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
            }
            
        }

    }, [isRuning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
        console.log(startTimeRef.current);
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        // Use padStart to ensure two digits, but store it in a new variable
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");
        const formattedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

    return(
    <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="controls">
            <button onClick={start} className="start-button">start</button>
            <button onClick={stop} className="stop-button">stop</button>
            <button onClick={reset} className="reset-button">reset</button>
        </div>
    </div> 
    );


}

export default StopWatch