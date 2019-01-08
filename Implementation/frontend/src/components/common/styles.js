import { css } from 'emotion';

const R = require('ramda');


const height32 = css`
  height:32px;
`;

const marginTop32 = css`
  margin-top:32px;
`;

const center = css`
  margin: 0 auto;
  display: block;
`;

const bold = css`
  font-weight: bold;
`;

const boxContainer = css`
  margin:0 auto;
  max-width:300px;
`;

const textCentered = css`
  text-align: center;
`;

const joinCSS = R.join(' ');


export {
  height32, marginTop32, center, bold, boxContainer, textCentered, joinCSS,
};
