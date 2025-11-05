// Your code here.
// Get all cube elements and the container
const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');

// Function to ensure the cube stays within container bounds
function keepInBounds(x, y, cube) {
  const containerRect = container.getBoundingClientRect();
  const cubeRect = cube.getBoundingClientRect();

  const minX = containerRect.left;
  const minY = containerRect.top;
  const maxX = containerRect.right - cubeRect.width;
  const maxY = containerRect.bottom - cubeRect.height;

  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, minY), maxY),
  };
}

cubes.forEach(cube => {
  let isDragging = false;
  let offsetX, offsetY;

  cube.addEventListener('mousedown', (e) => {
    isDragging = true;

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.zIndex = '1000';  // Bring cube to front
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Keep in bounds
      const boundedPos = keepInBounds(newX, newY, cube);

      cube.style.left = `${boundedPos.x - container.offsetLeft}px`;
      cube.style.top = `${boundedPos.y - container.offsetTop}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      cube.style.zIndex = '1';  // Reset z-index after drop
    }
  });
});
