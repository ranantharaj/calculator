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
        operator: operator,
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
      } else {
        this.setState({
          result: (this.state.val1 / this.state.val2)
        });
      }
    } else {

    }

  }

  parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    let calculation = [],
      current = '';
    for (let i = 0, ch; ch = s.charAt(i); i++) {
      if ('^*/+-'.indexOf(ch) > -1) {
        if (current == '' && ch == '-') {
          current = '-';
        } else {
          calculation.push(parseFloat(current), ch);
          current = '';
        }
      } else {
        current += s.charAt(i);
      }
    }
    if (current != '') {
      calculation.push(parseFloat(current));
    }
    return calculation;
  }

  calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    let ops = [{ '^': (a, b) => Math.pow(a, b) },
    { '*': (a, b) => a * b, '/': (a, b) => a / b },
    { '+': (a, b) => a + b, '-': (a, b) => a - b }],
      newCalc = [],
      currentOp;
    for (let i = 0; i < ops.length; i++) {
      for (let j = 0; j < calc.length; j++) {
        if (ops[i][calc[j]]) {
          currentOp = ops[i][calc[j]];
        } else if (currentOp) {
          newCalc[newCalc.length - 1] =
            currentOp(newCalc[newCalc.length - 1], calc[j]);
          currentOp = null;
        } else {
          newCalc.push(calc[j]);
        }
      }
      calc = newCalc;
      newCalc = [];
    }
    if (calc.length > 1) {
      return calc;
    } else {
      return calc[0];
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
             <td  className="btn btn-success" className="btn btn-success" onClick={(e) => this.setState({ val2: 7, result: this.state.result + '7' })}> 7 </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 8, result: this.state.result + '8' })}> 8 </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 9, result: this.state.result + '9' })}> 9 </td>
             <td  className="btn btn-success" onClick={(e) => this.calculation('x')}> x </td>
          </tr>
          <tr>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 4, result: this.state.result + '4' })}> 4 </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 5, result: this.state.result + '5' })}> 5 </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 6, result: this.state.result + '6' })}> 6 </td>
             <td  className="btn btn-success" onClick={(e) => this.calculation('-')}> - </td>
          </tr>
          <tr>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 1, result: this.state.result + '1' })}> 1 </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 2, result: this.state.result + '2' })}> 2 </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 3, result: this.state.result + '3' })}> 3 </td>
             <td  className="btn btn-success" onClick={(e) => this.calculation('+')}> + </td>
          </tr>
          <tr>
             <td  className="btn btn-success" onClick={(e) => this.calculation('CE')}> CE </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ val2: 0, result: this.state.result + '0' })}> 0 </td>
             <td  className="btn btn-success" onClick={(e) => this.calculation('/')}> / </td>
             <td  className="btn btn-success" onClick={(e) => this.setState({ result: this.calculate(this.parseCalculationString(this.state.result))} )}> = </td>
          </tr>

        </table>



      </div>
    )
  }
}

export default App;
