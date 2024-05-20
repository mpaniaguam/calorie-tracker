import { useEffect, useReducer, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="w-full py-4 bg-slate-700 ">
        <div className="flex justify-between items-center px-5 md:px-10 ">
          <h1 className="text-sm text-white uppercase font-semibold px-4 text-left md:text-sm">Contador de Calorias</h1>
          <button
            className="font-semibold p-2 text-sm bg-slate-500 hover:bg-slate-600 text-white rounded-lg uppercase cursor-pointer"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reset App
          </button>
        </div>
      </header>

      <div className="bg-slate-950 xl:flex md:justify-center xl:h-screen ">
        <div className="w-full md:flex justify-center items-center md:gap-5 xl:pl-12">
          <section className="pt-5 flex justify-center mx-5 md:py-10 md:max-w-md md:ml-5 md:mr-0 xl:pd-0 xl:m-0">
            <Form
              dispatch={dispatch}
              state={state}
            />
          </section>
          <div className="w-full ">
            <section className="w-full pt-5 md:px-5 xl:pb-8 text-white">
              <CalorieTracker
                activities={state.activities}
              />
            </section>
            <section className="w-full py-5 md:px-5 xl:pb-8 xl:pt-0">
              <ActivityList
                activities={state.activities}
                dispatch={dispatch}
              />
            </section> 
          </div>


        </div>
      </div>
    </>
  )
}

export default App
