let counter = 0;

export default function uniqueId() {
  counter += 1;
  return `$rac$${counter}`;
}
