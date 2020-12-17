/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';

import PlayerDropablePosition from '../PlayerDropablePosition';
import Input from '../Input';
import { Container } from './Field2styles';
import { usePlayer, TeamPlayersPosition } from '../../hooks/players';

/**
 * Component used in 'Create Team' and 'Update Team' pages to show team formation
 * and containing the components to drag and drop players
 */

interface FieldProps {
  selectEditDefaultValue?: string;
  fieldEditDefaultValue?: TeamPlayersPosition[];
}

const SoccerField2: React.FC<FieldProps> = ({
  selectEditDefaultValue,
  fieldEditDefaultValue,
}) => {
  const [formationValue, setformationValue] = useState<string>('-');
  const [teamPlayersPositionState, setTeamPlayersPositionState] = useState<
    string
  >('');

  const {
    teamPlayersPosition,
    setTeamPlayersPosition,
    handleClearFieldInfo,
  } = usePlayer();

  // Esse useeffect é para transformar os dados em string e enviar pro input pra
  // fazer o submit dessas informações;
  useEffect(() => {
    const stringfiedTeamInfo = JSON.stringify(teamPlayersPosition);
    setTeamPlayersPositionState(stringfiedTeamInfo);
  }, [teamPlayersPosition]);

  useEffect(() => {
    if (selectEditDefaultValue) {
      setformationValue(selectEditDefaultValue);
    }
    if (fieldEditDefaultValue) {
      setTeamPlayersPositionState(JSON.stringify(fieldEditDefaultValue));
      setTeamPlayersPosition(fieldEditDefaultValue);
    }
  }, [fieldEditDefaultValue, selectEditDefaultValue, setTeamPlayersPosition]);

  const handleSelectValue = useCallback(
    value => {
      handleClearFieldInfo();
      setformationValue(value);
    },
    [handleClearFieldInfo],
  );

  return (
    <Container formationValue={formationValue}>
      <div className="select-div">
        <label htmlFor="formation-box">Formation</label>
        <select
          onChange={e => handleSelectValue(e.target.value)}
          name="formation-box"
          id="formation-box"
          defaultValue={selectEditDefaultValue}
          value={formationValue}
        >
          <option value="-">-</option>
          <option value="3 - 2 - 2 - 3">3 - 2 - 2 - 3</option>
          <option value="3 - 2 - 3 - 2">3 - 2 - 3 - 2</option>
          <option value="3 - 4 - 3">3 - 4 - 3</option>
          <option value="3 - 5 - 2">3 - 5 - 2</option>
          <option value="4 - 2 - 3 - 1">4 - 2 - 3 - 1</option>
          <option value="4 - 3 - 1 - 2">4 - 3 - 1 - 2</option>
          <option value="4 - 3 - 3">4 - 3 - 3</option>
          <option value="4 - 4 - 2">4 - 4 - 2</option>
          <option value="4 - 5 - 1">4 - 5 - 1</option>
          <option value="5 - 4 - 1">5 - 4 - 1</option>
        </select>

      </div>
      <span>
        <Input
          value={formationValue}
          onChange={() => ''}
          name="formation"
          style={{ visibility: 'hidden', marginBottom: -30 }}
        />
      </span>
      <span>
        <Input
          value={teamPlayersPositionState}
          onChange={() => ''}
          name="playersInfo"
          style={{ visibility: 'hidden', marginBottom: -30 }}
        />
      </span>
      <div className="soccer-field">
        <div className="soccer-field-line" />
        <div className="soccer-field-circle" />
        {formationValue === '3 - 2 - 2 - 3' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
              <PlayerDropablePosition positionNumber={10} />
              <PlayerDropablePosition positionNumber={9} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={6} />
              <PlayerDropablePosition positionNumber={5} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '3 - 2 - 3 - 2' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
              <PlayerDropablePosition positionNumber={10} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={9} />
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={6} />
              <PlayerDropablePosition positionNumber={5} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '3 - 4 - 3' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
              <PlayerDropablePosition positionNumber={10} />
              <PlayerDropablePosition positionNumber={9} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
              <PlayerDropablePosition positionNumber={6} />
              <PlayerDropablePosition positionNumber={5} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '3 - 5 - 2' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
              <PlayerDropablePosition positionNumber={10} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={9} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
              <PlayerDropablePosition positionNumber={6} />
              <PlayerDropablePosition positionNumber={5} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '4 - 2 - 3 - 1' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={10} />
              <PlayerDropablePosition positionNumber={9} />
              <PlayerDropablePosition positionNumber={8} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={7} />
              <PlayerDropablePosition positionNumber={6} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={5} />
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '4 - 3 - 1 - 2' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
              <PlayerDropablePosition positionNumber={10} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={9} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
              <PlayerDropablePosition positionNumber={6} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={5} />
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '4 - 3 - 3' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
              <PlayerDropablePosition positionNumber={10} />
              <PlayerDropablePosition positionNumber={9} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={6} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={5} />
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '4 - 4 - 2' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
              <PlayerDropablePosition positionNumber={10} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={9} />
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
              <PlayerDropablePosition positionNumber={6} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={5} />
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '4 - 5 - 1' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={10} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={9} />
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
              <PlayerDropablePosition positionNumber={6} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={5} />
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
        {formationValue === '5 - 4 - 1' && (
          <div className="players-formation">
            <div className="attackers">
              <PlayerDropablePosition positionNumber={11} />
            </div>
            <div className="midFields2">
              <PlayerDropablePosition positionNumber={10} />
              <PlayerDropablePosition positionNumber={9} />
              <PlayerDropablePosition positionNumber={8} />
              <PlayerDropablePosition positionNumber={7} />
            </div>
            <div className="midFields1">
              <PlayerDropablePosition positionNumber={6} />
            </div>
            <div className="defenders">
              <PlayerDropablePosition positionNumber={5} />
              <PlayerDropablePosition positionNumber={4} />
              <PlayerDropablePosition positionNumber={3} />
              <PlayerDropablePosition positionNumber={2} />
            </div>
            <div className="goalKeeper">
              <PlayerDropablePosition positionNumber={1} />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SoccerField2;
