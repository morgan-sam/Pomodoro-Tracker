import React from "react";

const MonthStatistics = (props) => {
  const {
    totalPomodoros,
    averagePomodoros,
    totalOutreach,
    averageOutreach,
    totalApplications,
    averageApplications,
  } = props;

  return (
    <table className="month-statistics-table">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Total</th>
          <th scope="col">Average</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Pomodoros</th>
          <td>{totalPomodoros}</td>
          <td>{averagePomodoros}</td>
        </tr>
        <tr>
          <th scope="row">Outreach</th>
          <td>{totalOutreach}</td>
          <td>{averageOutreach}</td>
        </tr>
        <tr>
          <th scope="row">Applications</th>
          <td>{totalApplications}</td>
          <td>{averageApplications}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonthStatistics;
