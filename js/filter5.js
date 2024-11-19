export default function (text) {
  // Get the filter ID from the element's data attribute
  const filterId = text.getAttribute('data-filter');

  // Select the necessary SVG filter elements
  const feBlur = document.querySelector(`#${filterId} feGaussianBlur`);
  const feDisplacementMap = document.querySelector(`#${filterId} feDisplacementMap`);

  // Check if required elements exist
  if (!feBlur || !feDisplacementMap) {
    console.warn(`Filter with ID ${filterId} not found for element`, text);
    return;
  }

  // Apply the filter to the text element
  text.style.filter = `url(#${filterId})`;

  // Object to store the values for blur and displacement
  let primitiveValues = { stdDeviation: 0, scale: 0 };

  // Set initial opacity to 0
  gsap.set(text, { opacity: 0 });

  // Create the animation timeline
  const animationTimeline = gsap.timeline({
    defaults: {
      duration: 1.7,
      ease: 'expo',
    },
    // On every update, set the appropriate attributes in the SVG filters
    onUpdate: () => {
      feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute('scale', primitiveValues.scale);
    },
    repeat: -1, // Loop infinitely
    yoyo: true, // Reverse the animation for a seamless loop
  })
    .to(
      primitiveValues,
      {
        startAt: { stdDeviation: 40, scale: 100 }, // Start with strong blur and displacement
        stdDeviation: 0,
        scale: 0,
      },
      0
    )
    .to(
      text,
      {
        startAt: {
          opacity: 0,
          scale: 0.6,
        },
        opacity: 1,
        scale: 1,
      },
      0
    );

  // Play the timeline immediately
  animationTimeline.play();
}
