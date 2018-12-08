const example1 = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;

function answer(input) {
  let arr = input.split("\n");
  let coords = arr.map(coord => {
    split = coord.split(", ");
    return split.map(num => parseInt(num));
  });
  console.log(coords);
}

answer(example1);
