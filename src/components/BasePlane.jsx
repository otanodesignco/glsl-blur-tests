import React from 'react'
import BaseMaterial from '../materials/BaseMaterial.jsx'
import { useControls } from 'leva'

export default function BasePlane() 
{

  const { blurAmount, blurType } = useControls({
    blurAmount:
    {
      min: 0,
      max: 10,
      value: 0.3,
      step: 0.01,
      label: 'Blur Amount'
    },
    blurType:
    {
      options: ['Box', 'Motion', 'Radial'],
      label: 'Blur Type'
    }
  })

  let blurKind = 1

  switch( blurType )
  {
    case 'Box':

    blurKind = 1

    break

    case 'Motion':
      blurKind = 3
    break

    case 'Radial':
      blurKind = 2
    break

    default:
      blurKind = 1
    break

  }
  return (
    <mesh>
        <planeGeometry
            args={ [ 5, 7, 64, 64 ] }
        />
        <BaseMaterial
          blurAmt={ blurAmount }
          blurType={ blurKind }
        />
    </mesh>
  )
}
