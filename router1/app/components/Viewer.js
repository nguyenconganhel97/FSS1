import React from 'react';

class Viewer extends React.Component {
  render() {
    return (
      <div>
          <p>{this.props.viewer}</p>
      </div>
    );
  }
}
module.exports = Viewer;