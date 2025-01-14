import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import StoreContext from '../../store/appstore';
//import { createPortal } from 'react-dom';
import GameMenu from './gamemenu';

const GameNav = ({ preGame, build, init }) => {
    const [sound, /*setSound*/] = useState(false);
    const store = React.useContext(StoreContext);
    var tableId = new URLSearchParams(document.location.search).get('table');

    const PlayerTurn = () => {
        return useObserver(() => {
            if (toJS(store.gameInfo) && toJS(store.gameInfo).currentPlayer) {
                return (
                    <div className="flex-row hidden sm:flex">
                        <span className="capitalize">{toJS(store.gameInfo).currentPlayer.name}</span>
                        <span className="block mt-0 inline-block text-gray-400">
                            's turn
                        </span>
                    </div>
                );
            } else {
                return (
                    <></>
                )
            }
        })
    }

    const Progression = () => {
        return useObserver(() => {
            if (toJS(store.gameInfo) && toJS(store.gameInfo).players && toJS(store.gameInfo).players.teamWhite.minis.length === toJS(store.gameInfo).players.teamWhite.units.length && toJS(store.gameInfo).players.teamBlack.minis.length === toJS(store.gameInfo).players.teamBlack.units.length) {
                let percentWhiteLeft = Math.round(100 - (toJS(store.gameInfo).players.teamWhite.minis.length / toJS(store.gameInfo).players.teamWhite.units.length * 100));
                let percentBlackLeft = Math.round(100 - (toJS(store.gameInfo).players.teamBlack.minis.length / toJS(store.gameInfo).players.teamBlack.units.length * 100));

                return (
                    <p className="hidden lg:block mt-0 inline-block mt-0 text-gray-400 mr-4">
                        {`Progression ${Math.max(percentBlackLeft, percentWhiteLeft)}%`}
                    </p>
                );
            } else {
                return (
                    <></>
                )
            }
        })
    }

    /*function timeFormat(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
        var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    const Timer = () => {
        return useObserver(() => {
            if (toJS(store.gameInfo) && toJS(store.gameInfo).players) {
                let time;
                if (preGame) {
                    time = toJS(store.gameInfo).players[store.gameInfo.currentPlayer.team].minis.length * 30;
                } else {
                    time = toJS(store.gameInfo).players[store.gameInfo.currentPlayer.team].timeLeft;
                }
                return (
                    <span className="font-semibold text-xl tracking-tight">{timeFormat(time)}</span>
                );
            } else {
                return (
                    <span className="font-semibold text-xl tracking-tight">Time left</span>
                )
            }
        })
    }*/

    return (
        <nav className="flex items-center justify-between lg:flex-wrap bg-gray-700 p-4">
            <div className="flex flex-col lg:flex-row">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <h1 className="font-semibold text-xl tracking-tight">
                        <Link to="/">
                            Miniaturena
                        </Link>
                    </h1>
                </div>
                <div className="text-sm flex flex-col justify-center items-center lg:items-start">
                    <p className="block mt-0 inline-block mt-0 text-gray-400 mr-4 hidden md:block">
                        {`Table ${tableId ? "#" + tableId : "demo"}`}
                    </p>
                    {
                        preGame ?
                            <></>
                            :
                            <Progression />
                    }
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center flex-shrink-0 text-white text-center">
                    {
                        build ?
                            <h1>
                                Army Builder
                            </h1>
                            :
                            init ?
                                <h1>
                                    Initiative Roll
                                </h1>
                                :
                                <>
                                    <PlayerTurn />
                                    {/*<Timer />*/}
                                </>
                    }
                </div>
            </div>

            <div className="flex flex-row items-center">
                {
                    preGame ?
                        <></>
                        :
                        <>
                            <button /*onClick={() => setSound(!sound)}*/ type="button" className="flex items-center px-3 py-2 rounded text-gray-200 border-gray-400 hover:text-white hover:border-white hidden md:block">
                                {
                                    sound ?
                                        <svg viewBox="0 0 20 20" fill="currentColor" className="volume-up w-6 h-6"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"></path></svg> :
                                        <svg viewBox="0 0 20 20" fill="currentColor" className="volume-off w-6 h-6"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                }
                            </button>
                            <button onClick={store.toggleFullScreen} type="button" className="flex items-center px-3 py-2 rounded text-gray-200 border-gray-400 hover:text-white hover:border-white hidden md:block">
                                <svg viewBox="0 0 20 20" fill="currentColor" className="arrows-expand w-6 h-6"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            </button>
                        </>
                }
                <GameMenu />
            </div>
        </nav>
    )
};


export default GameNav;
