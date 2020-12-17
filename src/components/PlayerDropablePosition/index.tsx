import React, { useEffect, useState } from 'react';

import { GoPlus } from 'react-icons/go';
import { Container } from './Dropablestyles';

import { usePlayer, Player } from '../../hooks/players';

interface PositionProps {
  positionNumber: number;
}

const PlayerDropablePosition: React.FC<PositionProps> = ({
  positionNumber,
}) => {
  const [hasPlayer, setHasPlayer] = useState<boolean>(false);
  const [nameInitials, setNameInitials] = useState<string>('');
  const [playerInfo, setPlayerInfo] = useState<Player>({} as Player);

  const {
    handleDragOver,
    handleDrop,
    teamPlayersPosition,
    setClearPlayersInFieldState,
    clearPlayersInFieldState,
  } = usePlayer();

  useEffect(() => {
    teamPlayersPosition.forEach(player => {
      if (player.position === positionNumber) {
        const firstName = player.player.name.split(' ')[0];
        const lastName = player.player.name.split(' ').splice(-1)[0];
        setNameInitials(firstName[0] + lastName[0]);
        setHasPlayer(true);
        setPlayerInfo(player.player);
      }
    });
  }, [positionNumber, teamPlayersPosition]);

  useEffect(() => {
    if (clearPlayersInFieldState) {
      setHasPlayer(false);
      setPlayerInfo({} as Player);
    }
    setClearPlayersInFieldState(false);
  }, [clearPlayersInFieldState, setClearPlayersInFieldState]);

  return (
    <Container positionNumber={positionNumber} hasPlayer={hasPlayer}>
      {!hasPlayer ? (
        <div
          className="player-position"
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDrop(e, positionNumber)}
        >
          <div className="player-position-center">
            <GoPlus size={20} />
          </div>
        </div>
      ) : (
        <div className="player-div">
          <div className="tooltip-div">
            <div>
              <p>Name:</p>
              <p>{playerInfo.name}</p>
            </div>
            <div>
              <p>Age:</p>
              <p>{playerInfo.age}</p>
            </div>
            <div>
              <p>Nationality:</p>
              <p>{playerInfo.nationality}</p>
            </div>
          </div>
          <div
            className="player-position"
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleDrop(e, positionNumber)}
          >
            <div className="player-position-center">
              <p>{nameInitials}</p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PlayerDropablePosition;
