/* eslint-disable react/jsx-indent */
import React, { useMemo, useCallback, useEffect } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import SoccerField1 from '../../components/SoccerField1';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { MiddleContainer } from './Dashboardstyles';
import { useTeams } from '../../hooks/teams';

interface TableColumns {
  name: string;
  description: string;
}

const MyTeamsDashboard: React.FC = () => {
  const history = useHistory();
  const {
    teams,
    handleShowMostAndLessPickedPlayers,
    handleHighestAndLowestAvgAgePlayers,
    sortedHighestAvgAge,
    sortedLowestAvgAge,
  } = useTeams();

  useEffect(() => {
    localStorage.setItem('@VenturusTest:Teams', JSON.stringify(teams));
    localStorage.removeItem('@VenturusTest:updateTeam');
    handleHighestAndLowestAvgAgePlayers();
  }, [
    handleHighestAndLowestAvgAgePlayers,
    handleShowMostAndLessPickedPlayers,
    teams,
  ]);

  const handleGoToCreateTeam = useCallback(() => {
    history.push('/create_team');
  }, [history]);

  // Here i use lib react-table
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as keyof TableColumns,
      },
      {
        Header: 'Description',
        accessor: 'description' as keyof TableColumns,
      },
    ],
    [],
  );

  // The id will be used to remove or update the team.
  const treatedDataToTable = teams.map(team => ({
    id: team.id,
    name: team.teamName,
    description: team.description,
  }));

  return (
    <>
      <Header />

      <MiddleContainer>
        <div className="left-container">
          <div>
            <h1>My teams</h1>

            <button
              type="button"
              title="Create a team"
              onClick={handleGoToCreateTeam}
            >
              <HiOutlinePlus size={17} color="#fff" />
            </button>
          </div>
          <Table columns={columns} data={treatedDataToTable} />
        </div>
        <div className="right-container">
          <div className="top-container">
            <h1>Top 5</h1>
            <div className="player-data">
              <div className="pd-left-container">
                <h3>Highest avg age</h3>
                <div className="pd2-left-container">
                  {sortedHighestAvgAge &&
                    sortedHighestAvgAge.map((sortedArray, index) => (
                      <div className="team-info" key={index}>
                        <h5>{sortedArray.team}</h5>
                        <h5>{sortedArray.avgAge}</h5>
                      </div>
                    ))}
                </div>
              </div>
              <div className="pd-right-container">
                <h3>Lowest avg age</h3>
                <div className="pd2-right-container">
                  {sortedLowestAvgAge &&
                    sortedLowestAvgAge.map((sortedArray, index) => (
                      <div className="team-info" key={index}>
                        <h5>{sortedArray.team}</h5>
                        <h5>{sortedArray.avgAge}</h5>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <SoccerField1 />
        </div>
      </MiddleContainer>
      <Footer />
    </>
  );
};

export default MyTeamsDashboard;
