import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

/**
 * Here we have a hook containing the global state of players choosen by a user to create teams.
 * The methods here are:
 *  handleDragStart, handleDragOver and handleDrop (to drag and drop players on the field)
 *  and handleClearFieldInfo to clear the field.
 *
 * The many global state constants here are used to help the methods but 'playerInfoState'
 *  is the one who stores data from the players chose by the user.
 */

export interface Player {
  id: number;
  name: string;
  age: number;
  nationality: string;
}

export interface TeamPlayersPosition {
  position: number;
  player: Player;
}

interface PlayersContextData {
  player: Player[];
  playerWasPutInField: boolean;
  clearPlayersInFieldState: boolean;
  playerInfoPutInField: Player;
  teamPlayersPosition: TeamPlayersPosition[];
  playersPosition: number[];
  setPlayersPosition(playersPosition: number[]): void;
  handleDragStart(e: any, playerInfo: Player): void;
  handleDragOver(e: any): void;
  handleDrop(e: any, positionNumber: number): void;
  setPlayerWasPutInField(a: boolean): void;
  handleClearFieldInfo(): void;
  setClearPlayersInFieldState(a: boolean): void;
  setTeamPlayersPosition(teamPlayersPosition: TeamPlayersPosition[]): void;
}

const PlayerContext = createContext<PlayersContextData>(
  {} as PlayersContextData,
);

export const PlayerProvider: React.FC = ({ children }) => {
  const [playersInfoState, setPlayersInfoState] = useState<Player[]>([]);
  const [teamPlayersPosition, setTeamPlayersPosition] = useState<
    TeamPlayersPosition[]
  >([]);
  const [playerWasPutInField, setPlayerWasPutInField] = useState<boolean>(
    false,
  );
  const [playerInfoPutInField, setPlayerInfoPutInField] = useState<Player>(
    {} as Player,
  );
  const [clearPlayersInFieldState, setClearPlayersInFieldState] = useState<
    boolean
  >(false);
  const [playersPosition, setPlayersPosition] = useState<number[]>([]);

  useEffect(() => {
    if (clearPlayersInFieldState) {
      setTeamPlayersPosition([]);
    }
  }, [clearPlayersInFieldState]);

  const handleDragStart = useCallback((e, playerInfo) => {
    e.dataTransfer.setData('playerInfo', JSON.stringify(playerInfo));
  }, []);

  const handleDragOver = useCallback(e => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e, positionNumber) => {
      const playerInfoMonster = e.dataTransfer.getData('playerInfo');
      const parsedPlayerInfo = JSON.parse(playerInfoMonster);
      setPlayersInfoState([...playersInfoState, parsedPlayerInfo]);
      const playerCompleteInfo: TeamPlayersPosition = {
        position: positionNumber,
        player: parsedPlayerInfo,
      };

      const teamPlayersPositionFiltered = teamPlayersPosition.filter(
        teamPlayerPosition => teamPlayerPosition.position !== positionNumber,
      );
      const playersPositionfiltered = playersPosition.filter(
        playerPosition => playerPosition !== positionNumber,
      );

      setTeamPlayersPosition([
        ...teamPlayersPositionFiltered,
        playerCompleteInfo,
      ]);
      setPlayerInfoPutInField(playerCompleteInfo.player);
      setPlayerWasPutInField(true);
      setPlayersPosition([...playersPositionfiltered, positionNumber]);
    },
    [playersInfoState, teamPlayersPosition, playersPosition],
  );

  const handleClearFieldInfo = useCallback(() => {
    teamPlayersPosition.map(teamplayer =>
      setPlayersInfoState(state => [...state, teamplayer.player]),
    );
    setTeamPlayersPosition([]);
    setClearPlayersInFieldState(true);
  }, [teamPlayersPosition]);

  return (
    <PlayerContext.Provider
      value={{
        player: playersInfoState,
        teamPlayersPosition,
        playerInfoPutInField,
        playerWasPutInField,
        clearPlayersInFieldState,
        playersPosition,
        setTeamPlayersPosition,
        setPlayersPosition,
        handleDragStart,
        handleDragOver,
        handleDrop,
        setClearPlayersInFieldState,
        setPlayerWasPutInField,
        handleClearFieldInfo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer(): PlayersContextData {
  const context = useContext(PlayerContext);

  return context;
}
