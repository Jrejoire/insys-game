import React from 'react';
import { armies } from '../../gamestats/armies';

const UnitCard = ({ army, unitId }) => {
    if (armies[army].units[unitId]) {
        let unit = armies[army].units[unitId];
        return (
            <div className="border w-3/4 lg:w-3/10 rounded-md m-4">
                <div id="unit-top-bar" className="flex flex-row bg-gray-800 justify-between items-center p-2">
                    <div className="flex flex-row">
                        <h2 className={`mr-2 bg-${unit.color}-700 p-2 rounded-md text-center`}>
                            {unit.army}
                        </h2>
                        <h2 className="bg-gray-400 p-2 rounded-md text-center">
                            {`${unit.class} unit`} 
                        </h2>
                    </div>
                    <div className="flex flex-row justify-end items-center">
                        <span className="text-red-500 hidden sm:block">Lives</span>
                        <span className="dot rounded-full w-4 h-4 bg-red-500 ml-2"></span>
                    </div>
                </div>
                <div id="unit-info-bar" className="flex flex-row px-4 py-2 justify-center items-center bg-gray-500">
                    <img className="rounded-lg w-auto h-16" src={unit.image} alt="unit-avatar" />
                    <div className="flex flex-col flex-wrap justify-center items-start m-4 text-left">
                        <p>
                            {`Name: ${unit.name}`} 
                        </p>
                        <p>
                            {`Equipment: ${unit.equipment.range} + ${unit.equipment.melee}`} 
                        </p>
                    </div>
                </div>
                <div id="unit-stat-bar" className="w-auto">
                    <table className="table-fixed w-full">
                        <thead>
                            <tr className="bg-gray-600">
                                <th className="border px-4">Melee</th>
                                <th className="border px-4">Ranged</th>
                                <th className="border px-4">Defense</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-500">
                                <td className="border px-4 py-2 text-center">{`${unit.melee.roll}d${unit.melee.success}+`}</td>
                                <td className="border px-4 py-2 text-center">{`${unit.range.roll}d${unit.range.success}+`}</td>
                                <td className="border px-4 py-2 text-center">{`${unit.defense.roll}d${unit.defense.success}+`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="unit-spec-bar" className="flex flex-row p-2 h-8 bg-white items-center">
                    {`Special abilities: ${unit.specials}`}
                </div>
            </div>
        )
    } else {
        return <></>
    }
};


export default UnitCard;