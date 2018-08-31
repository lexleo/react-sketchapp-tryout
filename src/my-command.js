import * as React from 'react';
import * as PropTypes from 'prop-types';
import { render, Artboard, Text, View } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) {
    return '#FFF';
  }
  return chroma(hex)
    .darken(3)
    .hex();
};

// take a hex and give us a suitable border color
const borderColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite < 3) {
    return '#333';
  }
  return '#FFF'
};

const Swatch = ({ name, hex }) => (
  <View
    name={`Swatch ${name}`}
    style={{
      height: 96,
      width: 96,
      margin: 8,
      backgroundColor: hex,
      padding: 8,
      justifyContent: 'center',
      borderRadius: 50,
      borderColor: borderColor(hex),
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 15,
      shadowOpacity: 0.7
    }}
  >
    <Text
      name="Swatch Hex"
      style={{ 
        color: textColor(hex),
        textAlign: 'center'
      }}
    >
      {hex}
    </Text>
  </View>
);

const Color = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Swatch.propTypes = Color;

const Document = ({ colors }) => (
  <Artboard
    name="Circles"
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 18) * 4,
    }}
  >
    {Object.keys(colors).map(color => <Swatch name={color} hex={colors[color]} key={color} />)}
  </Artboard>
);

Document.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default () => {
  
  const colorList = chroma.scale(['#fafa6e','#2A4858'])
    .mode('lch')
    .colors(16);

  render(<Document colors={colorList} />, context.document.currentPage());
};
