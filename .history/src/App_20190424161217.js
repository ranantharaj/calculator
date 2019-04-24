import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'val1': 0,
      'val2': 0,
      'result': 0,
      'operator': ''
    }
  }
  calculation(operator) {
    if (operator === 'x' || operator === '+' || operator === '-' || operator === '/') {
      this.setState({
        val1: this.state.val2,
        val2: 0,
        operator : operator,
        result: this.state.result + operator
      });
    }
    if (operator === 'CE') {
      this.setState({
        val1: 0,
        val2: 0,
        result: 0
      });
    } else if (operator === '=') {
      if (this.state.operator === 'x') {
        this.setState({
          result: (this.state.val1 * this.state.val2)
        });
      } else if (this.state.operator === '+') {
        this.setState({
          result: (this.state.val1 + this.state.val2)
        });
      } else if (this.state.operator === '-') {
        this.setState({
          result: (this.state.val1 - this.state.val2)
        });
      } else{
        this.setState({
          result: (this.state.val1 / this.state.val2)
        });
      }
    } else {

    }

  }

  render() {
    return (

      <div className="App text-center">
        <Form>
          <FormGroup>
            <Label for="calcResult">Result : </Label>
            <Input type="text" name="calcResult" value={this.state.result} />
          </FormGroup>
        </Form>

        <table>
          <tr>
            <td className="btn btn-success" onClick={(e) => this.setState({ val2: 7, result: this.state.result + '7' })}> 7 </td>
            <td onClick={(e) => this.setState({ val2: 8, result: this.state.result + '8' })}> 8 </td>
            <td onClick={(e) => this.setState({ val2: 9, result: this.state.result + '9' })}> 9 </td>
            <td onClick={(e) => this.calculation('x')}> x </td>
          </tr>
          <tr>
            <td onClick={(e) => this.setState({ val2: 4, result: this.state.result + '4'})}> 4 </td>
            <td onClick={(e) => this.setState({ val2: 5,  result: this.state.result + '5' })}> 5 </td>
            <td onClick={(e) => this.setState({ val2: 6,  result: this.state.result + '6' })}> 6 </td>
            <td onClick={(e) => this.calculation('-')}> - </td>
          </tr>
          <tr>
            <td onClick={(e) => this.setState({ val2: 1, result: this.state.result + '1' })}> 1 </td>
            <td onClick={(e) => this.setState({ val2: 2, result: this.state.result + '2' })}> 2 </td>
            <td onClick={(e) => this.setState({ val2: 3, result: this.state.result + '3' })}> 3 </td>
            <td onClick={(e) => this.calculation('+')}> + </td>
          </tr>
          <tr>
            <td onClick={(e) => this.calculation('CE')}> CE </td>
            <td onClick={(e) => this.setState({ val2: 0, result: this.state.result + '0' })}> 0 </td>
            <td onClick={(e) => this.calculation('/')}> / </td>
            <td onClick={(e) => this.calculation('=')}> = </td>
          </tr>

        </table>



      </div>
    )
  }
}

export default App;
