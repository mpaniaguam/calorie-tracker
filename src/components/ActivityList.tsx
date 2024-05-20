import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer" 

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <div className=" bg-slate-800 shadow-md shadow-slate-50/50 p-10 mx-6 rounded-2xl space-y-10  ">
                <h2 className="text-2xl font-semibold text-white text-center">Comida y Actividades</h2>

                {isEmptyActivities ?
                    <p className="text-center my-5 text-white">No hay actividades aún... </p> :
                    <div className="grid gap-10 sm:grid-cols-2  lg:grid-cols-3 actividades  rounded-md  ">
                        {activities.map(activity => (
                            <div key={activity.id} className="bg-slate-600 px-5 py-5  flex justify-between gap-1 bg-custom-gradient w-full rounded-md mx-auto relative">
                                <div className="space-y-2 relative text-xl">
                                    <p className={`absolute -top-8 -left-8 px-8 py-2 text-white uppercase font-semibold text-sm ${activity.category === 1 ? 'bg-red-500 opacity-80 rounded-lg shadow-md' : 'bg-green-500 opacity-80 rounded-lg shadow-md'}`}>{categoryName(+activity.category)}</p>
                                    <p className=" text-white font-semibold mt-5">{activity.name}</p>
                                    <p className={`text-2xl font-black ${activity.category === 1 ? 'text-red-500' : 'text-green-500 ' }`}>{activity.calories} {''}
                                        <span>Calorías</span>
                                    </p>
                                </div>
                                <div className=" flex gap-3 items-center absolute top-2 right-2">
                                    <button
                                        onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                                    >
                                        <PencilSquareIcon
                                            className="h-6 w-6 text-white"
                                        />
                                    </button>
                                    <button
                                        onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                                    >
                                        <XCircleIcon
                                            className="h-6 w-6 text-white"
                                        />
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                }
            </div>
        </>

    )
}
