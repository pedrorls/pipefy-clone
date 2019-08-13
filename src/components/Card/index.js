import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import { Container, Label } from './styles';

export default function Card({data, index}) {
  const { move } = useContext(BoardContext);

  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: {type: 'CARD', index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }) 
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedIdx = item.index;
      const targetIdx = index;

      if(draggedIdx === targetIdx) return;

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffSet = monitor.getClientOffset();
      const draggedTop = draggedOffSet.y - targetSize.top;

      if(
        (draggedIdx < targetIdx && draggedTop < targetCenter) ||
        (draggedIdx > targetIdx && draggedTop > targetCenter)
      ) return;

      move(draggedIdx, targetIdx);
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
