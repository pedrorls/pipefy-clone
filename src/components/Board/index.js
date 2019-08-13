import React, { useState } from 'react';
import produce from "immer";
import BoardContext from "./context";
import List from "../List";
import { Container } from './styles';
import { loadLists } from '../../Services/api';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);
  
  const move = (fromList, toList, from, to) => {
    const newList = produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    })
    setLists(newList);
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} data={list} index={index}/>)}
      </Container>
    </BoardContext.Provider>
  );
}
