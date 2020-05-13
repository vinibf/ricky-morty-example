import React from 'react';

import Container from './components/Container';
import FormGroup from './components/FormGroup';
import Label from './components/Label';
import Button from './components/Button';
import Select from './components/Select';
import Loading from "./components/Loading";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from './components/Card';

import data from './data/data.json';

import './App.css';

import { filterByStatus, generateEpisodesCharacters } from './utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      characters: [],
      loading: false
    };
    console.log('Constructor!');
  }

  componentDidMount() {
    console.log('DidMount');
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        characters: data.results,
        loading: false
      });
    }, 2000);
  }

  componentDidUpdate() {
    console.log('DidUpdate');
  }

  handleClickStatus(event, status) {
    event.preventDefault();

    const newChars = filterByStatus(data.results, status);

    this.setState({
      characters: newChars
    });
  }

  handleChange(episode) {
    const episodes = generateEpisodesCharacters(data.results);

    this.setState({
      characters: episodes[episode]
    });
  };

  render() {
    console.log('Render!', this.state.name);
    return (
      <Container>
        <FormGroup>
          <Label label="Status" />
          <div>
            <Button name="Todos" handleClick={event => this.handleClickStatus(event, '')} />
            <Button name="Vivo" handleClick={event => this.handleClickStatus(event, 'Alive')} />
            <Button name="Morto" handleClick={event => this.handleClickStatus(event, 'Dead')} />
            <Button name="Desconhecido" handleClick={event => this.handleClickStatus(event, 'Unknown')} />
          </div>
        </FormGroup>

        <FormGroup>
          <Label label="Sexo" />
          <div>
            <Button name="Todos" />
            <Button name="Homem" />
            <Button name="Mulher" />
            <Button name="Desconhecido" />
          </div>
        </FormGroup>

        <FormGroup>
          <Label label="Episódio" />
          <Select
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
            handleChange={value => this.handleChange(value)}
          />
        </FormGroup>

        {this.state.loading ? <Loading /> : null}

        <section>
          {this.state.characters.map(char => {
            return (
              <Card key={char.id}>
                <CardImg
                  image={char.image}
                  alt={char.name}
                />
                <CardBody>
                  <CardTitle title={char.name} />
                  <CardText text={`Situação: ${char.status}`} />
                  <CardText text={`Sexo: ${char.gender}`} />
                </CardBody>
              </Card>
            );
          })}
        </section>
      </Container>
    );
  }
}

export default App;
