import React from 'react';

import { Container, Label } from './styles';

export default function Card() {
  return (
    <Container>
      <header>
        <Label color="#B11" />
      </header>
      <p>Fazer a migração completa do servidor</p>
      <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="" />
    </Container>
  );
}
