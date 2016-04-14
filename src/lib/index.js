var { Griddle, DefaultModules } = require('griddle-overhaul-render');

var React = require('react');
var extend = require('lodash.assign');

var { GriddleRedux } = require('griddle-overhaul-connector');

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.component = GriddleRedux({
      Griddle,
      Components: extend({}, DefaultModules, this.props.components),
      Plugins: this.props.plugins
    });
  }

  render() {
   return <div>
      <this.component {...this.props}>
        {this.props.children}
      </this.component>
    </div>
  }
}
