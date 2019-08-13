import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import { Container, Label } from './styles';

export default function Card({data, index, listIndex}) {
  const { move } = useContext(BoardContext);

  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: {type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }) 
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIdx = item.listIndex;
      const targetListIdx = listIndex;

      const draggedIdx = item.index;
      const targetIdx = index;

      if(draggedIdx === targetIdx && draggedListIdx === targetListIdx) return;

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffSet = monitor.getClientOffset();
      const draggedTop = draggedOffSet.y - targetSize.top;

      if(
        (draggedIdx < targetIdx && draggedTop < targetCenter) ||
        (draggedIdx > targetIdx && draggedTop > targetCenter)
      ) return;

      move(draggedListIdx, targetListIdx, draggedIdx, targetIdx);

      item.index = targetIdx;
      item.listIndex = targetListIdx;
    }
  }); 

  dragRef(dropRef(ref))

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label}/>)}
      </header>
      <p>{data.content}</p>
      {data.user ? <img src={data.user} alt="" /> : null}
    </Container>
  );
}
