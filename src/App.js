import React from 'react';
import styled from '@emotion/styled';
import CardInput from './components/cardInput/CardInput';

const Main = styled.div({
    backgroundColor: '#f0f0f0',
    padding: 40,
});

function App() {
  return (
    <Main>
        <CardInput />
    </Main>
  );
}

export default App;
