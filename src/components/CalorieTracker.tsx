import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ?
        total + activity.calories : total, 0),
        [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ?
        total + activity.calories : total, 0),
        [activities])

    const totalCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <div className="bg-slate-800 text-white shadow-md shadow-slate-50/50 p-10 rounded-2xl space-y-5 mx-6">
                <h2 className="text-3xl font-semibold text-white text-center ">Resumen de Calorías</h2>
                <div className=" flex flex-cols items-center md:flex-row md:justify-between gap-5 mt-10 ">

                    <CalorieDisplay
                        calories={caloriesConsumed}
                        text="Consumidas"
                    />
                    <CalorieDisplay
                        calories={caloriesBurned}
                        text="Ejercicio"
                    />
                    <CalorieDisplay
                        calories={totalCalories}
                        text="Diferencia"
                    />

                </div>
            </div>


        </>
    )
}
