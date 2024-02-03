const widgetContainer = document.getElementById('widget-container');

// Create your widget's HTML structure here
const widgetElement = document.createElement('div');
widgetElement.classList.add('widget');
widgetElement.textContent = 'This is my widget!';

// Append the widget element to the container
widgetContainer.appendChild(widgetElement);