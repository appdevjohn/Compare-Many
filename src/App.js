import { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import OptionView from './containers/OptionView/OptionView';
import ResultsView from './containers/ResultsView/ResultsView';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      options: [],
      optionCombos: []
    }
  }

  getTopicOptions = id => {
    return new Promise((resolve, reject) => {
      axios.get('/topics/' + id).then(response => {
        const newOptions = response.data.items.map(option => {
          return {
            id: option.id,
            name: option.name,
            image: option.imageURL,
            score: 0
          };
        });

        // Creating every possible combination of comparison
        let optionCombos = [];
        for (let i = 0; i < newOptions.length - 1; i += 1) {
          for (let j = i + 1; j < newOptions.length; j += 1) {
            optionCombos.push({
              option1: newOptions[i].id,
              option2: newOptions[j].id
            })
          }
        }

        optionCombos = shuffle(optionCombos);

        resolve({
          options: newOptions,
          optionCombos: optionCombos
        });

      }).catch(error => reject(error));
    });
  }

  componentDidMount() {
    axios.get('/topics').then(topicResponse => {

      this.getTopicOptions(topicResponse.data.topics[0].id).then(newOptions => {
        this.setState({
          ...newOptions,
          topics: topicResponse.data.topics
        })
      })

    }).catch(error => {
      console.log(error);
    });
  }

  topicPickedHandler = id => {
    this.setState({
      options: [],
      optionCombos: []
    });
    
    this.getTopicOptions(id).then(newOptions => {
      this.setState(newOptions);
    })
  }

  optionPickedHandler = (options, choiceId) => {
    const updatedOptionCombos = [...this.state.optionCombos];
    updatedOptionCombos.shift();

    const updatedOptions = [...this.state.options];

    const option1 = updatedOptions.find(option => option.id === options.first.id);
    const option2 = updatedOptions.find(option => option.id === options.second.id);

    if (choiceId === option1.id) {
      option1.score += 1;
    } else {
      option2.score += 1;
    }

    this.setState({
      options: updatedOptions,
      optionCombos: updatedOptionCombos
    });
  }

  render() {
    if (this.state.options.length === 0) {
      return (
        <div className="App">
          <NavBar topics={this.state.topics} topicPicked={this.topicPickedHandler} />
          <h1>Loading...</h1>
        </div>
      )
    }

    let displayedOptions = {};
    if (this.state.optionCombos.length > 0) {
      displayedOptions = {
        first: this.state.options.find(option => option.id === this.state.optionCombos[0].option1),
        second: this.state.options.find(option => option.id === this.state.optionCombos[0].option2),
      }
    }

    return (
      <div className="App">
        <NavBar topics={this.state.topics} topicPicked={this.topicPickedHandler} />
        {this.state.optionCombos.length === 0 ?
          <ResultsView options={this.state.options} /> :
          <OptionView displayedOptions={displayedOptions} optionPickedHandler={this.optionPickedHandler} />}
      </div>
    );
  }
}

// Shuffle array from github (https://stackoverflow.com/a/2450976)
const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default App;
