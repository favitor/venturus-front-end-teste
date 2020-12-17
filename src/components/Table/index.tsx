/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSortUp, FaSortDown, FaSort, FaTrash } from 'react-icons/fa';
import { MdModeEdit, MdShare } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Container } from './Tablestyles';
import { useTeams } from '../../hooks/teams';

interface ITable {
  columns: any[];
  data: any[];
  ordering?: { acessor: string; desc: boolean };
}

const Table: React.FC<ITable> = ({ columns, data }: any) => {
  const history = useHistory();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data, columns, manualSortBy: true } as any, useSortBy);
  const { handleDeleteTeam, setUpdateTeamData } = useTeams();

  const handleGoToEditTeam = useCallback(
    (stringfiedTeamData: string) => {
      setUpdateTeamData(JSON.parse(stringfiedTeamData));
      history.push('/edit_team');
    },
    [history, setUpdateTeamData],
  );

  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown />
                      ) : (
                        <FaSortUp />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return index === 0 ? (
                    <td {...cell.getCellProps()}>
                      <p title={cell ? (cell.value as string) : ''}>
                        {cell.render('Cell')}
                      </p>
                    </td>
                  ) : (
                    <td {...cell.getCellProps()}>
                      <div>
                        <p title={cell ? (cell.value as string) : ''}>
                          {cell.render('Cell')}
                        </p>
                        <span>
                          <FaTrash
                            title="Remove"
                            onClick={() =>
                              handleDeleteTeam(
                                JSON.stringify(cell.row.original),
                              )
                            }
                          />
                          <MdShare title="Share" />
                          <MdModeEdit
                            title="Edit"
                            onClick={() =>
                              handleGoToEditTeam(
                                JSON.stringify(cell.row.original),
                              )
                            }
                          />
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
