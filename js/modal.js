// Get the modal
var modal = document.getElementById('projectModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the project item, open the modal 
document.querySelector('.project-item').onclick = function() {
  modal.style.display = "block";
  // Update modal content based on the project clicked, if necessary
  modal.querySelector('h2').textContent = 'Stock Price Forecasting and Trading Strategy Optimization';
  modal.querySelector('p').textContent = 'Project description here...';
  modal.querySelector('a').href = 'https://github.com/sshitol1/Stock-Price-Forecasting-and-Trading-Strategy-Optimization';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
