/* eslint-disable react/jsx-indent */
/* eslint-disable */
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi';
import { VscLoading } from 'react-icons/vsc';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { MiddleContainer } from './Editstyles';
import { useTeams, Team } from '../../hooks/teams';
import { usePlayer } from '../../hooks/players';

import Input from '../../components/Input';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import RadioButton, { RadioOption } from '../../components/RadioButton';
import Tags from '../../components/Tags';
import SoccerField2 from '../../components/SoccerField2';
import PlayersContainer from '../../components/PlayersContainer';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface PlayersData {
  id: number;
  name: string;
  age: number;
  nationality: string;
}

interface FormErrors {
  teamName?: string;
  description?: string;
  website?: string;
  teamType?: string;
  formation?: string;
  playersInfo?: string;
}

interface FormRawData {
  teamName: string;
  description: string;
  website: string;
  teamType: 'Real' | 'Fantasy' | '';
  tags: string[] | [];
  formation: string;
  playersInfo: string;
}

const EditTeam: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [searchTeam, setSearchTeam] = useState<string>('');
  const [searchTeamCountry, setSearchTeamCountry] = useState<string>('');
  const [teamId, setTeamId] = useState<string>('');
  const [searchPlayer, setSearchPlayer] = useState<string>('');
  const [firstSearchIsComplete, setFirstSearchIsComplete] = useState<boolean>(
    false,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [gotError1, setGotError1] = useState<boolean>(false);
  const [error1, setError1] = useState<string[]>([]);
  const [error2, setError2] = useState<string[]>([]);
  const [gotError2, setGotError2] = useState<boolean>(false);
  const [submissionErrors, setSubmissionErrors] = useState<any>([]);
  const [gotsubmissionErrors, setGotsubmissionErrors] = useState<boolean>(
    false,
  );
  const [playersDataOutsideField, setPlayersDataOutsideField] = useState<
    PlayersData[]
  >([]);

  // chamei esses métodos globais do usePlayer() para arrumar a parte
  // de validação dos jogadores no campo.
  const { teamPlayersPosition } = usePlayer();
  const { handleUpdateTeamData, updateTeamData, teams } = useTeams();
  const history = useHistory();

  // This state controls the state here in this page
  const [teamDataStored, setTeamDataStored] = useState<Team>(() => {
    const teamToBeUpdatedData = localStorage.getItem(
      '@VenturusTest:updateTeam',
    );

    if (teamToBeUpdatedData || teamToBeUpdatedData === 'undefined') {
      return JSON.parse(teamToBeUpdatedData);
    }
    return {} as Team;
  });
  // Players postion
  const [playersPositionStateHere, setPlayersPositionStateHere] = useState<
    number[]
  >([]);

  useEffect(() => {
    if (playersPositionStateHere.length < 11) {
      teamPlayersPosition.map(teamPlayerPosition =>
        setPlayersPositionStateHere(state => [
          ...state,
          teamPlayerPosition.position,
        ]),
      );
    }
    const realUpdateTeamData: Team = teams.filter(
      team => team.id === updateTeamData.id,
    )[0];

    if (!teamDataStored.id) {
      localStorage.setItem(
        '@VenturusTest:updateTeam',
        JSON.stringify(realUpdateTeamData),
      );
      setTeamDataStored(realUpdateTeamData);
    }
  }, [
    playersPositionStateHere.length,
    teamDataStored.id,
    teamPlayersPosition,
    teams,
    updateTeamData.id,
  ]);

  const handleSubmit = useCallback(
    async (data: FormRawData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          teamName: Yup.string().required('Team name is required!'),
          description: Yup.string().required(
            'Decription field is required!',
          ),
          website: Yup.string(),
          teamType: Yup.string().required('A team type is required!'),
          formation: Yup.string().min(2, 'A team formation is required!'),
          playersInfo: Yup.string().min(
            10,
            'A team formation with players must be done!',
          ),
        });

        if (playersPositionStateHere.length < 11) {
          setSubmissionErrors((state: any) => [
            ...state,
            'You need to fill all positions with players.',
          ]);
          setGotsubmissionErrors(true);
          return;
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        setGotsubmissionErrors(false);

        const submissionEditData: Team = {
          id: teamDataStored.id,
          teamName: data.teamName,
          description: data.description,
          website: data.website,
          teamType: data.teamType,
          tags: data.tags,
          formation: data.formation,
          playersInfo: JSON.parse(data.playersInfo),
        };

        setTeamDataStored(submissionEditData);

        handleUpdateTeamData(submissionEditData);

        localStorage.removeItem('@VenturusTest:updateTeam');
        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setGotsubmissionErrors(true);
          const errors: FormErrors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          if (errors.teamName) {
            setSubmissionErrors((state: any) => [...state, errors.teamName]);
          }
          if (errors.description) {
            setSubmissionErrors((state: any) => [...state, errors.description]);
          }
          if (errors.website) {
            setSubmissionErrors((state: any) => [...state, errors.website]);
          }
          if (errors.teamType) {
            setSubmissionErrors((state: any) => [...state, errors.teamType]);
          }
          if (errors.formation) {
            setSubmissionErrors((state: any) => [...state, errors.formation]);
          }
          if (errors.playersInfo) {
            setSubmissionErrors((state: any) => [...state, errors.playersInfo]);
          }
        }
      }
    },
    [
      playersPositionStateHere.length,
      teamDataStored.id,
      handleUpdateTeamData,
      history,
    ],
  );

  const handleClearPlayersInfo = useCallback(() => {
    setSearchTeam('');
    setSearchTeamCountry('');
    setTeamId('');
    setSearchPlayer('');
    setFirstSearchIsComplete(false);
    setPlayersDataOutsideField([]);
    setError1([]);
    setError2([]);
    setGotError1(false);
    setGotError2(false);
    setSubmissionErrors([]);
  }, []);

  const handleSearchTeams = useCallback(async () => {
    try {
      setSearchPlayer('');
      setFirstSearchIsComplete(false);
      setPlayersDataOutsideField([]);
      setError1([]);
      setGotError1(false);
      setIsLoading(true);
      const { data } = await api.get('teams', {
        params: {
          name: searchTeam,
          country: searchTeamCountry,
        },
      });

      if (
        typeof data.errors.name === typeof 'string' ||
        typeof data.errors.country === typeof 'string'
      ) {
        setIsLoading(false);
        setGotError1(true);
        if (
          typeof data.errors.name === typeof 'string' &&
          typeof data.errors.country === typeof 'string'
        ) {
          setError1([data.errors.name, data.errors.country]);
        } else if (typeof data.errors.name === typeof 'string') {
          setError1([data.errors.name]);
        } else {
          setError1([data.errors.country]);
        }
        return;
      }

      if (data.results === 0) {
        setIsLoading(false);
        setGotError1(true);
        setError1([
          'It was not found any teams with this name in this country. Try again.',
        ]);
        return;
      }

      setTeamId(data.response[0].team.id);
      setFirstSearchIsComplete(true);
      setIsLoading(false);
    } catch (error) {
      setGotError1(true);
      setError1([error]);
      setIsLoading(false);
    }
  }, [searchTeam, searchTeamCountry]);

  const handleSearchPlayers = useCallback(async () => {
    try {
      setPlayersDataOutsideField([]);
      setError2([]);
      setGotError2(false);
      setIsLoading2(true);

      const { data } = await api.get('players', {
        params: {
          search: searchPlayer,
          team: teamId,
        },
      });

      if (typeof data.errors.search === typeof 'string') {
        setIsLoading2(false);
        setGotError2(true);
        setError2([data.errors.search]);
        return;
      }

      if (data.results === 0) {
        setIsLoading2(false);
        setGotError2(true);
        setError2(['It was not found any players with this name. Try again.']);
        return;
      }

      const customPlayersData = data.response.map(
        (superData: any): PlayersData => {
          return {
            id: superData.player.id,
            name: superData.player.name,
            age: superData.player.age,
            nationality: superData.player.nationality,
          };
        },
      );
      setPlayersDataOutsideField(customPlayersData);
      setIsLoading2(false);
    } catch (error) {
      setGotError2(true);
      setError2([error]);
      setIsLoading2(false);
    }
  }, [searchPlayer, teamId]);

  const handleGetBack = useCallback(() => {
    localStorage.removeItem('@VenturusTest:updateTeam');
    history.push('/dashboard');
  }, [history]);

  const radioOptions: RadioOption[] = [
    {
      value: 'real',
      label: 'Real',
    },
    {
      value: 'fantasy',
      label: 'Fantasy',
    },
  ];

  return (
    <>
      <Header />
      <MiddleContainer>
        <div className="main-container">
          <h2>Edit your team data</h2>
          <button type="button" className="arrow" onClick={handleGetBack}>
            <BiArrowBack size={20} />
            <p>Return</p>
          </button>
          <Form onSubmit={handleSubmit} id="form">
            <div className="upper-title">
              <h4>TEAM INFORMATION</h4>
            </div>
            <div className="team-information-form">
              <div className="upper-info">
                <div className="left-div">
                  <Input
                    name="teamName"
                    placeholder="Insert team name"
                    label="Team name"
                    updateDefaultValue={teamDataStored.teamName}
                  />

                  <TextArea
                    label="Description"
                    form="form"
                    maxLength={300}
                    name="description"
                    placeholder="Add description"
                    defaultValue={teamDataStored.description}
                  />
                </div>
                <div className="right-div">
                  <Input
                    name="website"
                    placeholder="http://myteam.com"
                    label="Team website"
                    updateDefaultValue={teamDataStored.website}
                  />

                  <RadioButton
                    name="teamType"
                    title="Team type"
                    options={radioOptions}
                    updateDefaultValue={teamDataStored.teamType}
                  />

                  <Tags
                    name="tags"
                    label="Tags"
                    defaultValue={teamDataStored.tags}
                  />
                </div>
              </div>
            </div>
            <div className="configure-squad-container">
              <div className="bottom-title">
                <h4>CONFIGURE SQUAD</h4>
              </div>

              <div className="bottom-info">
                <div className="bottom-left-div">
                  <SoccerField2
                    selectEditDefaultValue={teamDataStored.formation}
                    fieldEditDefaultValue={teamDataStored.playersInfo}
                  />
                  <Button type="submit" style={{ width: 320 }}>
                    Save
                  </Button>
                  <div>
                    <ul style={{ listStyle: 'none' }}>
                      {gotsubmissionErrors
                        ? submissionErrors.map((error: any, index: number) => (
                            <li key={index} style={{ marginTop: 2 }}>
                              <p style={{ color: 'red', fontSize: 14 }}>
                                {error}
                              </p>
                            </li>
                          ))
                        : ''}
                    </ul>
                  </div>
                </div>

                <div className="bottom-right-div">
                  <div className="search-team-div">
                    <Input
                      name="search-team"
                      placeholder="Search team name"
                      label="Search team name"
                      value={searchTeam}
                      onChange={e => setSearchTeam(e.target.value)}
                    />
                    <Input
                      name="search-team-country"
                      placeholder="Search team country"
                      label="Team country"
                      value={searchTeamCountry}
                      onChange={e => setSearchTeamCountry(e.target.value)}
                    />
                    <div className="button-errors-loading-div">
                      <button
                        title="Search for a team and its country to open player search"
                        type="button"
                        onClick={handleSearchTeams}
                      >
                        <BiSearchAlt2 size={20} />
                      </button>
                      {gotError1 ? (
                        <span className="error-messages1">
                          <ul>
                            <li>{error1[0]}</li>
                            <li>{error1[1]}</li>
                          </ul>
                        </span>
                      ) : (
                        ''
                      )}
                      {isLoading ? (
                        <span className="animated-icon">
                          <VscLoading size={20} color="#a6006a" />
                          <p>Loading...</p>
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>

                  <div>
                    <Input
                      name="search-players"
                      placeholder="Search player"
                      label="Search players"
                      disabled={!firstSearchIsComplete}
                      value={searchPlayer}
                      onChange={e => setSearchPlayer(e.target.value)}
                    />
                    <div className="bottom-buttons">
                      <button
                        title="Search for players"
                        type="button"
                        onClick={handleSearchPlayers}
                      >
                        <BiSearchAlt2 size={20} />
                      </button>
                      {gotError2 ? (
                        <span className="error-messages2">
                          <p>{error2}</p>
                        </span>
                      ) : (
                        ''
                      )}
                      {isLoading2 ? (
                        <span className="animated-icon2">
                          <VscLoading size={20} color="#a6006a" />
                          <p>Loading...</p>
                        </span>
                      ) : (
                        ''
                      )}
                      <button
                        type="button"
                        className="clear-button"
                        onClick={handleClearPlayersInfo}
                      >
                        <p>Clear data</p>
                      </button>
                    </div>
                  </div>
                  <PlayersContainer
                    playersDataOutsideField={playersDataOutsideField}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </MiddleContainer>
      <Footer />
    </>
  );
};

export default EditTeam;
