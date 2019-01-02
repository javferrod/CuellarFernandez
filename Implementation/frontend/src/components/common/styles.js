import { css } from 'emotion';

const R = require('ramda');


const height32 = css`
  height:32px;
`;

const marginTop32 = css`
  margin-top:32px;
`;

const bold = css`
  font-weight: bold;
`;

const boxContainer = css`
  margin:0 auto;
  max-width:300px;
`;

const joinCSS = R.join(' ');


export {
  height32, marginTop32, bold, boxContainer, joinCSS,
};
