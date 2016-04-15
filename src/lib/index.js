import React, { Component, PropTypes } from 'react'
//import GriddleProvider from './components/GriddleProvider'
import { Griddle, DefaultModules } from 'griddle-overhaul-react'
const ROOT_STATE_KEY = 'griddle'


class ReduxGriddle extends Component {
  static propTypes =  { id: PropTypes.string.isRequired
                      , dataKey: PropTypes.string.isRequired
                      };
  static defaultProps = { dataKey: 'visibleData' };

  componentWillMount() { this.loadData() }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data)
      this.loadData(nextProps)
  }

  loadData = () => {
    const { dispatch, data, columns, ignoredColumns, children } = this.props
    const allColumns = data && data.length > 0 ? Object.keys(data[0]) : []
    const properties = PropertyHelper.propertiesToJS( { rowProperties: children
                                                      , defaultColumns: columns
                                                      , ignoredColumns
                                                      , allColumns
                                                      } )

    dispatch(initializeGrid(properties))
    if(props.data)
      dispatch(loadData(data))
  };

  render() {
    const { actionCreators, dataKey, data, columns, ignoredColumns, children } = this.props
    return (
      <Griddle
        {...actionCreators}
        dataKey={dataKey}
        data={griddle[dataKey]}
        columns={columns}
        ignoredColumns={ignoredColumns}
        children={children}
      />
    )
  }
}


const mapGriddleStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const { data, columns, ignoredColumns, children } = bisectState(state, id)
  const actionCreators = bindActionCreators(actions, dispatch)
  return { data, columns, ignoredColumns, children }
}

const bisectState = (state, id) => {
  if(process.env.NODE_ENV !== 'production') assert.ok(state, 'state is required')
  const griddleRoot = state[ROOT_STATE_KEY]
  if(process.env.NODE_ENV !== 'production') assert.ok(griddleRoot, `'${ROOT_STATE_KEY}' state must exist in redux (should import configured reducers from griddle-overhaul-redux into combineReducers as a top-level 'griddle' node)`)
  const griddleState = griddleRoot[id]
  if(process.env.NODE_ENV !== 'production') assert.ok(griddleState, `Griddle component with id '${id}' is required in redux state. Check your configuration.`)
  return griddleState
}





export const connectGriddle = GriddleComponent => connect(mapGriddleStateToProps)(GriddleComponent)

//export { GriddleProvider }
