## rgb 和 rgba 颜色

#rrggbb 表示 red green blue 色阶， 每个色阶分别用两位 16 进制， 因此可以表示 2⁴ _ 2⁴ _ 2⁴ _ 2⁴ _ 2⁴ \* 2⁴ = 2²⁴ = 16777216 种不同的颜色

rgb(red, green, blue) red, green, blue 为[0, 256]的十进制数字

rgba(red, green, blue, alpha) 在 rgb 的基础上加上了 alpha [0, 1] 表示透明度的数字。

webgl 的 shader 默认支持 RGBA， 在 webgl 中我们是使用四维向量来表示颜色的

```GLSL
vec4 color = [red, green, blue, alpha]
```

背景：
随机生成 N 组由暗到亮的颜色， 每一组为一行， 从左到右依次变亮

rgb 的缺点:

- 随机生成， 行与行之间的色差过大或者过小
- 无法控制颜色本身的亮度， 可能造成一行内的颜色， 色差过小

因此，在动态构建视觉颜色效果的时候， 使用 HSL HSV 颜色表示方式

## HSL 和 HSV

H: Hue 色相
S: Saturation 饱和度
L: Lightness 亮度
V: Value 明度

HSL 和 HSV 的表示结果比较相似

HSL 和 HSV 的缺陷：
同一行颜色差距可能很明显， 可能又不是很明显， 但都是从人观察的角度出发

## CIE Lab 和 CIE Lch

为了解决上述问题， 根据两个原则：

1. 人眼看到的色差 = 颜色向量间的欧氏距离
2. 相同的亮度， 能让人感觉亮度相同

产生了针对人类感知的 CIE Lab 和 CIE Lch 颜色

CIE Lab 目前没有能支持的图形系统。但是 Css-Level4 规范给出了 Lab 颜色值的定义

```bash
lab() = lab(<percentage> <number> <number> [/ <alpha-value>]? )
```

并且一些 javascript 库也可以直接处理 Lab 颜色空间了， 如 [d3-color](https://github.com/d3/d3-color)

## Cubehelix 色盘

立方螺旋色盘, 它的原理是在 RGB 立方体中构建一段螺旋线 让色相随着亮度增加螺旋变换。

社区的 cubehelix 库有 [cubehelix](https://www.npmjs.com/package/cubehelix)
