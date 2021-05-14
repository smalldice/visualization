## rgb 和 rgba 颜色

#rrggbb 表示 red green blue 色阶， 每个色阶分别用两位 16 进制， 因此可以表示 2⁴ _ 2⁴ _ 2⁴ _ 2⁴ _ 2⁴ \* 2⁴ = 2²⁴ = 16777216 种不同的颜色

rgb(red, green, blue) red, green, blue 为[0, 256]的十进制数字

rgba(red, green, blue, alpha) 在 rgb 的基础上加上了 alpha [0, 1] 表示透明度的数字。

webgl 的 shader 默认支持 RGBA， 在 webgl 中我们是使用四维向量来表示颜色的

```GLSL
vec4 color = [red, green, blue, alpha]
```
