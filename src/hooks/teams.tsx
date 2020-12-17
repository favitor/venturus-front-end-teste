/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable */

import React, { createContext, useContext, useCallback, useState } from 'react';
import { TeamPlayersPosition, Player } from './players';
import {
  lessFrequentElementInArray,
  mostFrequentElementInArray,
} from '../utils/helpingAlgorithmsFunctions';

/**
 * Here we have the most complex hook containing the global state of teams created
 * by a user.
 * The methods here are:
 * saveTeamInformation, handleUpdateTeamData, handleDeleteTeam, handleShowMostAndLessPickedPlayers,
 * handleHighestAndLowestAvgAgePlayers
 *
 * The many global state constants here are used to help the methods but 'teams'
 *  is the one who stores data from the teams created by the user.
 */

export interface Team {
  id: string;
  teamName: string;
  description: string;
  website: string;
  teamType: 'Real' | 'Fantasy' | '';
  tags: string[] | [];
  formation: string;
  playersInfo: TeamPlayersPosition[];
}

export interface TableTeamData {
  id: string;
  name: string;
  description: string;
}

interface MostLessPickedPlayers {
  id: number;
  name: string;
}

interface CalculatedAverageAges {
  team: string;
  avgAge: number;
}

interface TeamPlayersObject {
  [key: string]: number[];
}

interface TeamsContextData {
  teams: Team[];
  updateTeamData: TableTeamData;
  saveTeamInformation(teamSubmitInfo: Team): void;
  handleUpdateTeamData(teamSubmitInfo: Team): void;
  handleDeleteTeam(teamDataStringfied: string): void;
  setUpdateTeamData(teamData: TableTeamData): void;
  handleShowMostAndLessPickedPlayers(): void;
  handleHighestAndLowestAvgAgePlayers(): void;

  theMostPickedPlayer: MostLessPickedPlayers[];
  theLessPickedPlayer: MostLessPickedPlayers[];
  playersInfoDataState: Player[];
  lessPickedNumber: number;
  mostPickedNumber: number;
  sortedHighestAvgAge: CalculatedAverageAges[];
  sortedLowestAvgAge: CalculatedAverageAges[];
  mostPickedNameInitials: string;
  mostPickedPlayerData: Player[];
  mostPickedPlayerBoolean: boolean;
  lessPickedNameInitials: string;
  lessPickedPlayerData: Player[];
  lessPickedPlayerBoolean: boolean;
}

const TeamsContext = createContext<TeamsContextData>({} as TeamsContextData);

export const TeamsProvider: React.FC = ({ children }) => {
  const [sortedHighestAvgAge, setSortedHighestAvgAge] = useState<
    CalculatedAverageAges[]
  >(() => {
    const highestAvgAgeArray = localStorage.getItem(
      '@VenturusTest:HighestAvgAge',
    );

    if (highestAvgAgeArray) {
      return JSON.parse(highestAvgAgeArray);
    }

    return [];
  });
  const [sortedLowestAvgAge, setSortedLowestAvgAge] = useState<
    CalculatedAverageAges[]
  >(() => {
    const lowestAvgAgeArray = localStorage.getItem(
      '@VenturusTest:LowestAvgAge',
    );

    if (lowestAvgAgeArray) {
      return JSON.parse(lowestAvgAgeArray);
    }

    return [];
  });

  const [lessPickedNumber, setLessPickedNumber] = useState<number>(0);
  const [mostPickedNumber, setMostPickedNumber] = useState<number>(0);
  const [playersInfoDataState, setPlayersInfoDataState] = useState<Player[]>(
    [],
  );
  const [theMostPickedPlayer, setTheMostPickedPlayer] = useState<
    MostLessPickedPlayers[]
  >([] as MostLessPickedPlayers[]);
  const [theLessPickedPlayer, setTheLessPickedPlayer] = useState<
    MostLessPickedPlayers[]
  >([] as MostLessPickedPlayers[]);

  const [updateTeamData, setUpdateTeamData] = useState<TableTeamData>(
    {} as TableTeamData,
  );
  const [userTeamsInformation, setUserTeamsInformation] = useState<Team[]>(
    () => {
      const teamsData = localStorage.getItem('@VenturusTest:Teams');

      if (teamsData) {
        return JSON.parse(teamsData);
      }

      return [];
    },
  );
  const [mostPickedNameInitials, setMostPickedNameInitials] = useState<string>(
    () => {
      const mostPickedInitials = localStorage.getItem(
        '@VenturusTest:mostPickedInitials',
      );

      if (mostPickedInitials) {
        return JSON.parse(mostPickedInitials);
      }

      return '';
    },
  );
  const [mostPickedPlayerData, setMostPickedPlayerData] = useState<Player[]>(
    () => {
      const mostPickedPlayer = localStorage.getItem(
        '@VenturusTest:mostPickedPlayer',
      );

      if (mostPickedPlayer) {
        return JSON.parse(mostPickedPlayer);
      }

      return [] as Player[];
    },
  );
  const [mostPickedPlayerBoolean, setMostPickedPlayerBoolean] = useState<
    boolean
  >(() => {
    const mostPickedPlayer = localStorage.getItem(
      '@VenturusTest:mostPickedPlayer',
    );

    if (mostPickedPlayer) {
      return true;
    }

    return false;
  });

  const [lessPickedNameInitials, setLessPickedNameInitials] = useState<string>(
    () => {
      const lessPickedInitials = localStorage.getItem(
        '@VenturusTest:lessPickedInitials',
      );

      if (lessPickedInitials) {
        return JSON.parse(lessPickedInitials);
      }

      return '';
    },
  );
  const [lessPickedPlayerData, setLessPickedPlayerData] = useState<Player[]>(
    () => {
      const lessPickedPlayer = localStorage.getItem(
        '@VenturusTest:lessPickedPlayer',
      );

      if (lessPickedPlayer) {
        return JSON.parse(lessPickedPlayer);
      }

      return [] as Player[];
    },
  );
  const [lessPickedPlayerBoolean, setLessPickedPlayerBoolean] = useState<
    boolean
  >(() => {
    const lessPickedPlayer = localStorage.getItem(
      '@VenturusTest:lessPickedPlayer',
    );

    if (lessPickedPlayer) {
      return true;
    }

    return false;
  });

  // Used in CREATE Teams Page when submitting data
  const saveTeamInformation = useCallback(
    teamSubmitInfo => {
      setUserTeamsInformation([...userTeamsInformation, teamSubmitInfo]);
    },
    [userTeamsInformation],
  );

  // Used in UPDATE Teams Page when submitting data
  const handleUpdateTeamData = useCallback(
    teamUpdateSubmitInfo => {
      const filteredData = userTeamsInformation.filter(
        teamInformation => teamInformation.id !== teamUpdateSubmitInfo.id,
      );

      setUserTeamsInformation([...filteredData, teamUpdateSubmitInfo]);
    },
    [userTeamsInformation],
  );

  // Used in MY DASHBOARD to REMOVE a team from data and table
  const handleDeleteTeam = useCallback((teamDataStringfied: string) => {
    const teamData = JSON.parse(teamDataStringfied);
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to remove this team?')) {
      setUserTeamsInformation(state =>
        state.filter(team => team.id !== teamData.id),
      );
    }
  }, []);

  // 2 methods used in MY DASHBOARD SOCCER FIELD1 to show data

  const handleShowMostAndLessPickedPlayers = useCallback(() => {
    const allPlayersNamesAndIds: MostLessPickedPlayers[] = [];
    const allselectedPlayersInfo: Player[] = [];

    if (userTeamsInformation.length > 0) {
      userTeamsInformation.map(userTeamData => {
        userTeamData.playersInfo.map(playerInfo => {
          allselectedPlayersInfo.push(playerInfo.player);
          allPlayersNamesAndIds.push({
            id: playerInfo.player.id,
            name: playerInfo.player.name,
          });
        });
      });
      setPlayersInfoDataState(allselectedPlayersInfo);

      const mostPickedPlayer = mostFrequentElementInArray(
        allPlayersNamesAndIds,
      );
      const lessPickedPlayer = lessFrequentElementInArray(
        allPlayersNamesAndIds,
      );

      if (mostPickedPlayer && lessPickedPlayer) {
        const mostPickedPercentage = Number(
          (
            (mostPickedPlayer.quantity / allPlayersNamesAndIds.length) *
            100
          ).toFixed(2),
        );
        const lessPickedPercentage = Number(
          (
            (lessPickedPlayer.quantity / allPlayersNamesAndIds.length) *
            100
          ).toFixed(2),
        );
        setMostPickedNumber(mostPickedPercentage);
        setLessPickedNumber(lessPickedPercentage);

        const realMostPickedPlayer = allPlayersNamesAndIds.filter(
          playersData =>
            playersData.id === Number(mostPickedPlayer.mostFrequent),
        );

        const realLessPickedPlayer = allPlayersNamesAndIds.filter(
          playersData =>
            playersData.id === Number(lessPickedPlayer.lessFrequent),
        );
        setTheMostPickedPlayer(realMostPickedPlayer);
        setTheLessPickedPlayer(realLessPickedPlayer);

        const firstNameMostPicked = realMostPickedPlayer[0].name.split(' ')[0];
        const lastNameMostPicked = realMostPickedPlayer[0].name
          .split(' ')
          .splice(-1)[0];
        const mostPickedInitials: string =
          firstNameMostPicked[0] + lastNameMostPicked[0];

        setMostPickedNameInitials(mostPickedInitials);
        localStorage.setItem(
          '@VenturusTest:mostPickedInitials',
          JSON.stringify(mostPickedInitials),
        );
        const mostPickedPlayerInfo = allselectedPlayersInfo.filter(
          (playerData: Player) => {
            return playerData.id === realMostPickedPlayer[0].id;
          },
        );

        setMostPickedPlayerData(mostPickedPlayerInfo);
        localStorage.setItem(
          '@VenturusTest:mostPickedPlayerInfo',
          JSON.stringify(mostPickedPlayerInfo),
        );
        setMostPickedPlayerBoolean(true);

        const firstNameLessPicked = realLessPickedPlayer[0].name.split(' ')[0];
        const lastNameLessPicked = realLessPickedPlayer[0].name
          .split(' ')
          .splice(-1)[0];
        const lessPickedInitials: string =
          firstNameLessPicked[0] + lastNameLessPicked[0];

        setLessPickedNameInitials(lessPickedInitials);
        localStorage.setItem(
          '@VenturusTest:lessPickedInitials',
          JSON.stringify(lessPickedInitials),
        );
        const lessPickedPlayerInfo = allselectedPlayersInfo.filter(
          (playerData: Player) => playerData.id === realLessPickedPlayer[0].id,
        );

        setLessPickedPlayerData(lessPickedPlayerInfo);
        localStorage.setItem(
          '@VenturusTest:lessPickedPlayerInfo',
          JSON.stringify(lessPickedPlayerInfo),
        );
        setLessPickedPlayerBoolean(true);
      }
    }
  }, [userTeamsInformation]);

  // Used in MY DASHBOARD TOP 5 to show data
  const handleHighestAndLowestAvgAgePlayers = useCallback(() => {
    const arrayPlayers: TeamPlayersObject = {};

    if (userTeamsInformation.length > 0) {
      userTeamsInformation.map(team => {
        team.playersInfo.map(playerData => {
        });
      });

      const teamAvgAges = Object.entries(arrayPlayers).map(([team]) => {
        const avgAge = Number(
          (
            arrayPlayers[team].reduce(
              (acc: number, age: number) => acc + age,
              0,
            ) / arrayPlayers[team].length
          ).toFixed(1),
        );

        return {
          team,
          avgAge,
        };
      });

      const sortedArrayByAge = teamAvgAges.sort((a, b) => a.avgAge - b.avgAge);

      const highestAvgAge: CalculatedAverageAges[] = [];
      const lowestAvgAge: CalculatedAverageAges[] = [];
      let z = sortedArrayByAge.length - 1;
      if (sortedArrayByAge.length < 4) {
        for (let i = 0; i < sortedArrayByAge.length; i++) {
          highestAvgAge.push(sortedArrayByAge[z]);
          lowestAvgAge.push(sortedArrayByAge[i]);
          z -= 1;
        }
      } else {
        for (let i = 0; i < 5; i++) {
          highestAvgAge.push(sortedArrayByAge[z]);
          lowestAvgAge.push(sortedArrayByAge[i]);
          z -= 1;
        }
      }
      setSortedHighestAvgAge(highestAvgAge);
      setSortedLowestAvgAge(lowestAvgAge);
      localStorage.setItem(
        '@VenturusTest:HighestAvgAge',
        JSON.stringify(highestAvgAge),
      );
      localStorage.setItem(
        '@VenturusTest:LowestAvgAge',
        JSON.stringify(lowestAvgAge),
      );
    }
  }, [userTeamsInformation]);

  return (
    <TeamsContext.Provider
      value={{
        teams: userTeamsInformation,
        mostPickedNameInitials,
        mostPickedPlayerData,
        mostPickedPlayerBoolean,
        lessPickedNameInitials,
        lessPickedPlayerData,
        lessPickedPlayerBoolean,
        sortedHighestAvgAge,
        sortedLowestAvgAge,
        updateTeamData,
        theMostPickedPlayer,
        theLessPickedPlayer,
        playersInfoDataState,
        lessPickedNumber,
        mostPickedNumber,
        saveTeamInformation,
        handleUpdateTeamData,
        handleDeleteTeam,
        setUpdateTeamData,
        handleShowMostAndLessPickedPlayers,
        handleHighestAndLowestAvgAgePlayers,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export function useTeams(): TeamsContextData {
  const context = useContext(TeamsContext);

  return context;
}
