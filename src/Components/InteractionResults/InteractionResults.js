import React, { Component } from "react";
import "./InteractionResults.css";

class InteractionResults extends Component {
  render() {
    let results = [];
    const resultsLength = Object.keys(this.props.results).length;
    for (let index = 0; index < resultsLength; index++) {
      results.push(
        <div className="drugInteractionElement">
          <h3>
            {this.props.results[index].drug1} -{this.props.results[index].drug2}
          </h3>
          <h6>{this.props.results[index].description}</h6>
        </div>
      );
    }

    // console.log(results);
    // this.props.results.forEach((element) => {
    //   results.push(
    //     <div className="drugInteractionElement">
    //       <h3>
    //         {element.drug1} - {element.drug2}
    //       </h3>
    //       <h6>{element.description}</h6>
    //     </div>
    //   );
    // });

    return <div>{results}</div>;
  }
}

export default InteractionResults;
