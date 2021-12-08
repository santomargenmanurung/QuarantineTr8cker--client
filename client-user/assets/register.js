const backgroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="378" height="816" viewBox="0 0 378 816">
  <defs>
    <linearGradient id="linear-gradient" x1="0.5" y1="1.04" x2="0.5" y2="0.004" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#02023a"/>
      <stop offset="0.143" stop-color="#040c4c"/>
      <stop offset="0.498" stop-color="#0a257a"/>
      <stop offset="1" stop-color="#0e3599"/>
    </linearGradient>
  </defs>
  <rect id="Background" width="377" height="815" transform="translate(0.5 0.5)" stroke="#e8a3a3" stroke-miterlimit="10" stroke-width="1" fill="url(#linear-gradient)"/>
</svg>
`;

const registerButtonStyle = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="147.588" height="55.388" viewBox="0 0 147.588 55.388">
<defs>
  <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#5a1c94"/>
    <stop offset="1" stop-color="#0e3599"/>
  </linearGradient>
  <filter id="Rectangle_12" x="0" y="0" width="147.588" height="55.388" filterUnits="userSpaceOnUse">
    <feOffset dx="4" dy="5" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_26" data-name="Group 26" transform="translate(-122.349 -497.231)">
  <g transform="matrix(1, 0, 0, 1, 122.35, 497.23)" filter="url(#Rectangle_12)">
    <path id="Rectangle_12-2" data-name="Rectangle 12" d="M0,0H110.891a18.7,18.7,0,0,1,18.7,18.7v0A18.691,18.691,0,0,1,110.9,37.388H18.945A18.945,18.945,0,0,1,0,18.443V0A0,0,0,0,1,0,0Z" transform="translate(5 4)" fill="url(#linear-gradient)"/>
  </g>
  <text id="Register" transform="translate(162 524)" fill="rgba(255,255,255,0.63)" font-size="13" font-family="Helvetica-Bold, Helvetica" font-weight="700"><tspan x="0" y="0">Register</tspan></text>
</g>
</svg>
`;
const loginForm = `<svg xmlns="http://www.w3.org/2000/svg" width="221" height="223" viewBox="0 0 221 223">
<g id="Group_12" data-name="Group 12" transform="translate(-79 -398)">
  <rect id="Rectangle_10" data-name="Rectangle 10" width="217" height="33" rx="16.5" transform="translate(83 398)" fill="#fff"/>
  <rect id="Rectangle_11" data-name="Rectangle 11" width="217" height="33" rx="16.5" transform="translate(83 444)" fill="#fff"/>
</g>
<g id="Group_22" data-name="Group 22" transform="translate(-79 -304)">
  <rect id="Rectangle_10-2" data-name="Rectangle 10" width="217" height="33" rx="16.5" transform="translate(83 398)" fill="#fff"/>
  <rect id="Rectangle_11-2" data-name="Rectangle 11" width="217" height="33" rx="16.5" transform="translate(83 446)" fill="#fff"/>
  <rect id="Rectangle_40" data-name="Rectangle 40" width="217" height="33" rx="16.5" transform="translate(79 494)" fill="#fff"/>
</g>
</svg>

`;
const sideItem = `<svg xmlns="http://www.w3.org/2000/svg" width="678.864" height="696.566" viewBox="0 0 678.864 696.566">
<path id="Path_8" data-name="Path 8" d="M434.688-4.172S412.276,166.952,220.15,165.875-2.41,276.962-2.41,276.962s-9.481,67.448,45.192,104.166,121.986-129.873,295.6,60.179,138.927-5.315,138.927-5.315Z" transform="translate(421.963 691.443) rotate(-151)" fill="#fff"/>
<text id="Welcome_to_" data-name="Welcome to " transform="translate(326.78 365.839)" fill="#59389f" font-size="35" font-family="Helvetica-Bold, Helvetica" font-weight="700"><tspan x="0" y="0">Welcome to </tspan></text>
<text id="INDONESIA" transform="translate(333.78 403.839)" fill="red" stroke="red" stroke-width="1" font-size="35" font-family="Helvetica-Bold, Helvetica" font-weight="700"><tspan x="0" y="0">IND</tspan><tspan y="0" fill="#fff">ONE</tspan><tspan y="0">SIA</tspan></text>
</svg>
`;
module.exports = {
  backgroundSvg,
  // loginButton,
  loginForm,
  registerButtonStyle,
  sideItem,
};
