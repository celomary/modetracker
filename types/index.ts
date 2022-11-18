

type Mode = {
    emoji: string;
    description: string;
}


type ModeWithTime = {
    mode: Mode,
    timestamp: number,
}



export {
    Mode, 
    ModeWithTime
}