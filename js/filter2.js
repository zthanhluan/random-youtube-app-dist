export default function (text) {
  // Get the filter ID from the element's data attribute
  const filterId = text.getAttribute('data-filter');

  // Select the necessary SVG filter elements
  const feBlur = document.querySelector(`#${filterId} feGaussianBlur`);
  const feTurbulence = document.querySelector(`#${filterId} feTurbulence`);
  const feDisplacementMap = document.querySelector(`#${filterId} feDisplacementMap`);

  // Check if required elements exist
  if (!feBlur || !feDisplacementMap) {
    console.warn(`Filter with ID ${filterId} not found for element`, text);
    return;
  }

  // Apply the filter to the text element
  text.style.filter = `url(#${filterId})`;

  // Object to store the values for blur, scale, and turbulence frequency
  let primitiveValues = { stdDeviation: 0, scale: 0, baseFrequency: 0 };

  // Set initial opacity to 0
  gsap.set(text, { opacity: 0 });

  // Create the animation timeline
  const animationTimeline = gsap.timeline({
    defaults: {
      duration: 2,
      ease: 'expo',
    },
    // On every update, set the appropriate attributes in the SVG filters
    onUpdate: () => {
      feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute('scale', primitiveValues.scale);
      feTurbulence.setAttribute('baseFrequency', primitiveValues.baseFrequency);
    },
    repeat: -1, // Loop infinitely
    yoyo: true, // Reverse the animation on every loop for smoother transitions
  })
    .to(
      primitiveValues,
      {
        startAt: {
          stdDeviation: 20, // Start with a strong blur
          scale: 100, // Start with a high displacement
          baseFrequency: 0.1, // Start with a higher turbulence frequency
        },
        stdDeviation: 0,
        scale: 0,
        baseFrequency: 0.05,
      },
      0
    )
    .to(
      text,
      {
        startAt: {
          opacity: 0,
        },
        opacity: 1,
      },
      0
    );

  // Play the timeline immediately
  animationTimeline.play();
}

