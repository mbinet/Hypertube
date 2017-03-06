import React from 'react';


class SelectInput extends React.Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
        <label>
        {this.props.name}:
        <select name={this.props.name}>
        {
            this.props.values.map(function(thisvalue) {
            return <option key={thisvalue}
            value={thisvalue}>{thisvalue}</option>;
        })
        }
        </select>
        </label>
  );
  }
}
export default SelectInput;
