import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import "./InteractionStats.css";

class InteractionStats extends Component {
  state = {
    chartData: {
      labels: ["עייפות", "סחרחורת", "אדמומיות", "כאב בטן"],

      datasets: [
        {
          label: "Symptoms",

          data: [100, 20, 30, 5],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
  };
  render() {
    return (
      <div className="interaction-and-chart-cont">
        <div className="no-chart-data">
          <h6>80 דיווחים מכילים את התרופות aspirin, coumadin, optalgin</h6>
          <h6>80% דיווחו על תופעות לוואי בדרגה קלה</h6>
          <h6>20% דיווחו על תופעות לוואי בדרגה קשה</h6>
        </div>

        <div className="pie-chart-container">
          <Pie
            className="pie-chart"
            style={{
              display: "inline-block",
              postion: "relative",
            }}
            data={this.state.chartData}
            width={400}
            height={200}
            options={{
              maintainAspectRatio: false,
              responsive: false,
              plugins: {
                title: {
                  display: true,
                  text: "תופעות לוואי מדווחות",
                },
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default InteractionStats;
