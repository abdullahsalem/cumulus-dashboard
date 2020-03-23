'use strict';
import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar/sidebar';
import DatePickerHeader from '../DatePickerHeader/DatePickerHeader';
import ExecutionOverview from './overview';
import ExecutionStatus from './execution-status';
import ExecutionLogs from './execution-logs';
import { getCount, listExecutions } from '../../actions';

class Executions extends React.Component {
  query () {
    this.props.dispatch(getCount({
      type: 'executions',
      field: 'status'
    }));
    this.props.dispatch(listExecutions());
  }

  render () {
    return (
      <div className='page__workflows'>
        <div className='content__header'>
          <div className='row'>
            <ul className='datetimeheader'>
              <li>
                <div className='datetimeheader__content'>
                  <h1 className='heading--xlarge'>Executions</h1>
                </div>
              </li>
              <li>
                <DatePickerHeader onChange={this.query} />
              </li>
            </ul>
          </div>
        </div>
        <div className='page__content'>
          <div className='wrapper__sidebar'>
            <Sidebar
              currentPath={this.props.location.pathname}
              params={this.props.params}
            />
            <div className='page__content--shortened'>
              <Switch>
                <Route exact path='/executions' component={ExecutionOverview} />
                <Route path='/executions/execution/:executionName/logs' component={ExecutionLogs} />
                <Route path='/executions/execution/:executionArn' component={ExecutionStatus} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Executions.propTypes = {
  children: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object
};

export default withRouter(Executions);
