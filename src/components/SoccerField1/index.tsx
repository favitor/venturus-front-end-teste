/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { Container } from './Field1styles';
import { useTeams } from '../../hooks/teams';

/**
 * Simple component used in '/dashboard' to show most and less picked players
 */

const SoccerField1: React.FC = () => {
  const {
    lessPickedNameInitials,
    mostPickedNameInitials,
    lessPickedPlayerData,
    mostPickedPlayerData,
    lessPickedNumber,
    mostPickedNumber,
    handleShowMostAndLessPickedPlayers,
  } = useTeams();

  useEffect(() => {
    handleShowMostAndLessPickedPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="central-line" />
      <div className="central-circle" />
      <div className="players-container">
        <div className="player-mpp">
          <h3 className="mpph3-letters">Most Picked Player</h3>
          <h3 className="mpph3-numbers">{mostPickedNumber}%</h3>
          {mostPickedPlayerData.length > 0 ? (
            <div className="mp-tooltip-div">
              <div>
                <p>Name:</p>
                <p>{mostPickedPlayerData[0].name}</p>
              </div>
              <div>
                <p>Age:</p>
                <p>{mostPickedPlayerData[0].age}</p>
              </div>
              <div>
                <p>Nationality:</p>
                <p>{mostPickedPlayerData[0].nationality}</p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="mpp-border">
            <div className="most-picked-player">{mostPickedNameInitials}</div>
          </div>
        </div>
        <div className="player-lpp">
          <h3 className="lpph3-letters">Less Picked Player</h3>
          <h3 className="lpph3-numbers"> {lessPickedNumber}%</h3>
          {lessPickedPlayerData.length > 0 ? (
            <div className="lp-tooltip-div">
              <div>
                <p>Name:</p>
                <p>{lessPickedPlayerData[0].name}</p>
              </div>
              <div>
                <p>Age:</p>
                <p>{lessPickedPlayerData[0].age}</p>
              </div>
              <div>
                <p>Nationality:</p>
                <p>{lessPickedPlayerData[0].nationality}</p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="lpp-border">
            <div className="less-picked-player">{lessPickedNameInitials}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SoccerField1;
