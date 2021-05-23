import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
// import "./DrugSearchStats.css";

class DrugSearchStats extends Component {
  state = {
    chartData: null,
    severeSympt: 0,
    notSevereSympt: 0,
    reportNum: 0,
    noReport: false,
  };

  componentDidMount = () => {
    console.log(this.props.searchStats);
    let symptoms = Object.keys(this.props.searchStats["symptoms"]);
    let numOfSymp = Object.values(this.props.searchStats["symptoms"]);
    let reportNum = this.props.searchStats["report_num"];
    let severeSympt = this.props.searchStats["severity"]["sever"];
    let notSevereSympt = this.props.searchStats["severity"]["notSever"];

    let charDataObj = {
      labels: symptoms,
      datasets: [
        {
          label: "Symptoms",
          data: numOfSymp,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
        },
      ],
    };
    if (reportNum === 0) {
      this.setState({ noReport: true });
    }

    this.setState({
      chartData: charDataObj,
      reportNum: reportNum,
      severeSympt: severeSympt,
      notSevereSympt: notSevereSympt,
    });
  };

  render() {
    return this.state.noReport ? (
      <h6>אין דיווחים עבור התרופה שהזנת</h6>
    ) : (
      <div className="interaction-stats-chart">
        <div className="no-chart-data">
          <h6>
            {this.state.reportNum} דיווחים מכילים את התרופה{" "}
            {this.props.drugName}
          </h6>
          <h6>{this.state.notSevereSympt} חוו את תופעות הלוואי ברמה קלה</h6>
          <h6>{this.state.severeSympt} חוו את תופעות הלוואי ברמה קשה</h6>
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

export default DrugSearchStats;
