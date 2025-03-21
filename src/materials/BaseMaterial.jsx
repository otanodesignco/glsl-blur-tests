import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'
import { RepeatWrapping, Vector2, Color, SRGBColorSpace } from 'three'

export default function BaseMaterial( {
    texture ='./textures/noise/noiseVoronoi.png',
    blurAmt = 2, // amount to blur image
    blurType = 1, // 1 box, 2 radial, 3 motion
    ...props
} ) 
{
    const self = useRef()

    const noise = useTexture( texture )
    noise.wrapS = RepeatWrapping
    noise.wrapT = RepeatWrapping

    const imgLego = useTexture('./imgs/lego.png')
    imgLego.colorSpace = SRGBColorSpace

    const uniforms =
    {
        uTime: 0,
        uNoiseTexture: noise,
        uBackgrounImage: imgLego,
        uResolution: new Vector2( imgLego.image.width, imgLego.image.height ),
        uBlurAmount: blurAmt,
        uBlurType: blurType,
    }

    useFrame( ( state, delta ) =>
    {
        self.current.uniforms.uTime.value += delta
    })

    const BaseMaterial = shaderMaterial( uniforms, vertex, fragment )
    extend( { BaseMaterial } )

    return (
        <baseMaterial
            key={ BaseMaterial.key }
            ref={ self }
            {...props}
            toneMapped={false}
        />
    )
}