export default function disableButtonTemporarily(button, delay = 300) {
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, delay);
}
