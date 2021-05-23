import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import "./InteractionStats.css";

class InteractionStats extends Component {
  state = {
    chartData: null,
    severeSympt: 0,
    notSevereSympt: 0,
    reportNum: 0,
  };

  componentDidMount = () => {
    let symptoms = Object.keys(this.props.interacionStats["symptoms"]);
    let numOfSymp = Object.values(this.props.interacionStats["symptoms"]);
    let reportNum = this.props.interacionStats["report_num"];
    let severeSympt = this.props.interacionStats["severity"]["severe"];
    let notSevereSympt = this.props.interacionStats["severity"]["not_severe"];
    console.log(reportNum);
    console.log(severeSympt);
    console.log(notSevereSympt);

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
    this.setState({
      chartData: charDataObj,
      reportNum: reportNum,
      severeSympt: severeSympt,
      notSevereSympt: notSevereSympt,
    });
  };

  render() {
    let drugs = [];
    for (let index = 0; index < this.props.drugList.length; index++) {
      drugs.push(<span> {this.props.drugList[index].name},</span>);
    }

    return (
      <div className="interaction-stats-chart">
        <div className="no-chart-data">
          <h6>
            {this.state.reportNum} דיווחים מכילים את התרופות {drugs}
          </h6>
          <h6>{this.state.notSevereSympt} דיווחו על תופעות לוואי בדרגה קלה</h6>
          <h6>{this.state.severeSympt} דיווחו על תופעות לוואי בדרגה קשה</h6>
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
