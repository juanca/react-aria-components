import debounce from './debounce.js';

const eventHandlersMap = {
  onClick: name => _ => console.log(`${name}: onClick`),
  onContextMenu: name => _ => console.log(`${name}: onContextMenu`),
  onDoubleClick: name => _ => console.log(`${name}: onDoubleClick`),
  onDrag: name => debounce(_ => console.log(`${name}: onDrag`)),
  onDragEnd: name => _ => console.log(`${name}: onDragEnd`),
  onDragEnter: name => _ => console.log(`${name}: onDragEnter`),
  onDragExit: name => _ => console.log(`${name}: onDragExit`),
  onDragLeave: name => _ => console.log(`${name}: onDragLeave`),
  onDragOver: name => debounce(_ => console.log(`${name}: onDragOver`)),
  onDragStart: name => _ => console.log(`${name}: onDragStart`),
  onDrop: name => _ => console.log(`${name}: onDrop`),
  onMouseDown: name => _ => console.log(`${name}: onMouseDown`),
  onMouseEnter: name => _ => console.log(`${name}: onMouseEnter`),
  onMouseLeave: name => _ => console.log(`${name}: onMouseLeave`),
  onMouseMove: name => debounce(_ => console.log(`${name}: onMouseMove`)),
  onMouseOut: name => _ => console.log(`${name}: onMouseOut`),
  onMouseOver: name => debounce(_ => console.log(`${name}: onMouseOver`)),
  onMouseUp: name => _ => console.log(`${name}: onMouseUp`),
  onPointerDown: name => _ => console.log(`${name}: onPointerDown`),
  onPointerMove: name => debounce(_ => console.log(`${name}: onPointerMove`)),
  onPointerUp: name => _ => console.log(`${name}: onPointerUp`),
  onPointerCancel: name => _ => console.log(`${name}: onPointerCancel`),
  onGotPointerCapture: name => _ => console.log(`${name}: onGotPointerCapture`),
  onLostPointerCapture: name => _ => console.log(`${name}: onLostPointerCapture`),
  onPointerEnter: name => _ => console.log(`${name}: onPointerEnter`),
  onPointerLeave: name => _ => console.log(`${name}: onPointerLeave`),
  onPointerOver: name => debounce(_ => console.log(`${name}: onPointerOver`)),
  onPointerOut: name => _ => console.log(`${name}: onPointerOut`),
};

const eventTypes = Object.keys(eventHandlersMap);

export default function eventHandlersFactory(name, typePatterns) {
  return typePatterns
    .map(typePattern => eventTypes.filter(handlerType => handlerType.includes(typePattern)))
    .reduce((flat, a) => flat.concat(a), [])
    .map(eventType => ({ [eventType]: eventHandlersMap[eventType](name) }))
    .reduce((merge, a) => Object.assign(merge, a));
};
