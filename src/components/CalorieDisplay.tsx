type CalorieDisplayProps = {
    calories: number
    text: string
}

export default function CalorieDisplay({calories, text}: CalorieDisplayProps) {
    return (
        <p className="text-white font-semibold rounded-full grid grid-cols-1 gap-3 text-center ">
            <span className="font-black md:text-6xl text-orange text-4xl  ">{calories}</span>
            {text}
        </p>
    )
}
