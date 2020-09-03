import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import StoreContext from '../../store/AppStore';
import { armies } from '../../gameStats/armies';
//Component
import UnitStack from './UnitStack';

const ArmyBuilder = () => {
  const store = React.useContext(StoreContext);
  const [army, setArmy] = useState("tabForces");
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    //store.setTimer();
    //store.getUserMinis();
  })

  const selectMini = (army, unitId, index) => {
    let armyValue = 0;
    if (selection) {
      armyValue = selection.reduce((acc, value) => { return acc + armies[army].units[value.id]["cost"] }, 0)
    }
    
    if (selection.some(mini => mini.index === index)){
      setSelection(selection => [...selection.filter(mini => mini.index !== index)]);
    } else {
      if (armyValue + armies[army].units[unitId]["cost"] <= 10) {
        setSelection(selection => [...selection, {id:unitId, index:index}]);
      }
    }
    
  }

  const UserMinis = ({ army }) => {
    return useObserver(() => {
      let minis = [];
      if (toJS(store.userMinis) && toJS(store.userMinis).length > 0 && army) {
        toJS(store.userMinis).forEach((unitId, index) => {
          if (armies[army].units[unitId]) {
            minis.push(
              <button className={`${selection.some(mini => mini.index === index)?"border border-8 border-gray-700 rounded" : ""} m-2`} key={unitId + index} onClick={() => selectMini(army, unitId, index)}>
                <UnitStack army={army} unitId={unitId} />
              </button>
            )
          }
        })
      }
      if (minis.length > 0) {
        return (
          <div className="w-full flex flex-row justify-center lg:justify-start items-start flex-wrap lg:pl-12">
            {minis}
          </div>
        );
      } else {
        return <></>
      }
    })
  }

  const TeamSelection = ({ army }) => {
    if (selection) {
      let minis = []
      selection.forEach((unit,index)=> {
        minis.push(
          <p key={unit.id+index}>
            1x {armies[army].units[unit.id].name} - Cost: {armies[army].units[unit.id].cost}
          </p>
        )
      })
      return minis;
    } else {
      return <></>
    }

  }

  const SideBar = ({ army, setArmy }) => {
    return (
      <div className="flex flex-col h-screen items-center w-3/12">
        <div>
          <h1 className="m-4"> Select an army </h1>
          <ul className="list-none">
            <li>
              <button
                className={`${army === "tabForces" ? "text-white bg-gray-700" : ""} w-full bg-transparent hover:bg-gray-700 font-semibold hover:text-white my-2 py-2 px-4 border border-gray-800 hover:border-transparent rounded`}
                onClick={() => {setArmy("tabForces"); setSelection([])}}
              >
                T.A.B Forces
                    </button>
            </li>
            <li>
              <button
                className={`${army === "sysTroops" ? "text-white bg-gray-700" : ""} w-full bg-transparent hover:bg-gray-700 font-semibold hover:text-white my-2 py-2 px-4 border border-gray-800 hover:border-transparent rounded`}
                onClick={() => {setArmy("sysTroops"); setSelection([])}}
              >
                SYS Troops
                    </button>
            </li>
            <li>
              <button
                className={`${army === "rebels" ? "text-white bg-gray-700" : ""} w-full bg-transparent hover:bg-gray-700 font-semibold hover:text-white my-2 py-2 px-4 border border-gray-800 hover:border-transparent rounded`}
                onClick={() => {setArmy("rebels"); setSelection([])}}
              >
                Raging Rebels
                    </button>
            </li>
            <li>
              <button
                className={`${army === "outerRing" ? "text-white bg-gray-700" : ""} w-full bg-transparent hover:bg-gray-700 font-semibold hover:text-white my-2 py-2 px-4 border border-gray-800 hover:border-transparent rounded`}
                onClick={() => {setArmy("outerRing"); setSelection([])}}
              >
                Outer-Ring Savages
                    </button>
            </li>
            <li>
              <button
                className={`${army === "voidWarriors" ? "text-white bg-gray-700" : ""} w-full bg-transparent hover:bg-gray-700 font-semibold hover:text-white my-2 py-2 px-4 border border-gray-800 hover:border-transparent rounded`}
                onClick={() => {setArmy("voidWarriors"); setSelection([])}}
              >
                Void Warriors
                    </button>
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h1 className="text-center">Selected team</h1>
          <h2 className="mb-2 text-center">Max army value: 10</h2>
          <TeamSelection army={army}/>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-600 overflow-hidden">
      <div className="flex flex-row">
        <SideBar army={army} setArmy={setArmy} />
        <div className="flex flex-col w-full h-auto bg-white p-4 text-center">
          <h1>Select your miniatures</h1>
          <UserMinis army={army} />
        </div>
      </div>
    </div>
  )
};


export default ArmyBuilder;
