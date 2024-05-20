import { useState, useEffect, ChangeEvent, FormEvent, Dispatch } from "react"
import {v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState 
}

const initialState: Activity = {
  id: uuidv4(),
  category: 0,
  name: '',
  calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if(state.activeId){
      const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  },[state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: "save-activity", payload: { newActivity: activity } })

    setActivity({
      ...initialState,
      id: uuidv4()  
    })

  }

  return (
    <form
      className="space-y-5 bg-slate-800 text-white shadow-md shadow-slate-50/50 p-5 rounded-2xl min-w-72 w-auto md:min-w-96 "
      onSubmit={handleSubmit}
      
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-semibold"> Categorías: </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-slate-500 text-white hover:cursor-pointer"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-semibold"> Actividad: </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-slate-500 text-white hover:cursor-pointer "
          placeholder="Ej. Almuerzo, Postre, Ejercicio, Pesas"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-semibold"> Calorías: </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-slate-500 text-white hover:cursor-pointer"
          placeholder="Calorías Ej. 300, 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-slate-600 hover:bg-gray-900 w-full p-2 font-semibold text-white hover:cursor-pointer uppercase rounded-lg disabled:bg-opacity-20 disabled:cursor-not-allowed"
        value={activity.category === 0 ? 'Guardar' : (activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio')}
        disabled={!isValidActivity()}
      />

    </form>
  )
}
