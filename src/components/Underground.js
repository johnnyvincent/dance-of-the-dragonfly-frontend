import React, { memo } from 'react'
import { Image } from 'react-native'
import Constants from '../Constant.js'
import undergroundImage from '../../assets/underground.png'

const Floor = memo(({ position }) => {
  const width = Constants.max_width
  const height = Constants.underground_height
  const [ x, y ] = position;

  return (
    <Image
      style={{
        position: 'absolute',
        width,
        height,
        top: y,
        left: x
      }}
      resizeMode="stretch"
      source={undergroundImage}
    />
  );
});

export default Floor;
