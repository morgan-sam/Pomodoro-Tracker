import React from "react";

const MonthStatistics = (props) => {
    const { totalPomodoros, averagePomodoros, totalOutreach, averageOutreach } = props;
    
    return (
      <table className="month-statistics-table">
        <tr>
          <th></th>
          <th scope="col">Total</th>
          <th scope="col">Average</th>
        </tr>
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
      </table>
    )
};

export default MonthStatistics;
