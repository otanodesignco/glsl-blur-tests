uniform float uTime;
uniform sampler2D uBackgrounImage;
uniform vec2 uResolution;
uniform float uBlurAmount;
uniform int uBlurType;

in vec2 vUv;
in vec3 worldPosition;
in vec3 worldNormal;
in vec3 viewDirection;
in vec3 normals;

#include ./lib/uv/uvAspect.glsl
#include ./lib/blur/blurRadial.glsl
#include ./lib/blur/blurBox.glsl
#include ./lib/blur/blurMotion.glsl

void main()
{

    vec2 uv = vUv;
    vec2 uvWorld = worldPosition.xy;
    // uvWorld *= 0.5 + 0.5;
    float time = uTime;

    vec2 uvAspected = uvAspect( uv, uResolution );
    vec2 uvCenter = vec2( 0.5 );

    vec4 imageBGBlured = vec4( 0.0 );

    switch( uBlurType )
    {
        case 1:
            imageBGBlured = blurBox( uBackgrounImage, uv, uResolution, int( uBlurAmount ) );
        break;

        case 2:
            imageBGBlured = blurRadial( uBackgrounImage, uvAspected, uvCenter, 0.01, 64, uBlurAmount );
        break;

        case 3:
            imageBGBlured = blurMotion( uBackgrounImage, uvAspected, vec2(0.0, 1.0 ), uBlurAmount, 64 );
        break;

        default:
            imageBGBlured = blurBox( uBackgrounImage, uv, uResolution, int( uBlurAmount ) );
        break;
    }

    vec4 imageBase = texture( uBackgrounImage, uv );

    gl_FragColor = imageBGBlured;
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    
}