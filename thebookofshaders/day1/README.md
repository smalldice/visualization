## the book of shader

[thebookofshader](https://thebookofshaders.com/02/?lan=ch)

## Hello world

先看一个最基本的例子：

```c
#ifdef GL_ES
precision mediump float;
#endif

void main() {
  gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}
```

#### 1. main 入口函数

shader 语言有一个 main 函数， 会在最后返回颜色值 (main 函数返回的仍然是 void)。

#### 2. 最终的像素颜色取决于预设的全局变量 gl_FragColor

gl_FragColor 的值是一个四维向量值， vec4 表示值的类型， vec4(r,g,b,a)

r,g,b 表示 r,g,b 色相的值 取值在[0.0, 1.0]范围内, a 表示 alpha 透明度， 取值也在[0.0, 1,0]范围内

除了 vec4 还有 vec2 vec3 int float bool 等数据类型

#### 预处理程序的宏指令

```c
# ifdef GL_ES
precision mediump float;
# endif
```

宏指令都是用 # 开头， 用于语言预编译。

上述宏指令用于判断 GL_ES 是否被定义， 常用于移动端或者浏览器的变异中

#### float 精度

float 类型在 shaders 中非常重要，是最常用的数据类型之一， float 精度则影响了 gpu 的浮点数运算

```C
precision mediump float;
```

代表 float 使用中等精度计算， 类似的设定还有 lowp（低精度） float 和 highp（高精度）float

#### 没有强制类型转换

GLSL 用于不同的硬件制造厂商之间的语言规范， 不会进行强制转换， 上述例子中的 gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);

vec4 的各个取值都必须是 float 类型， 使用 int 整形将运行失败。

> gl_FragColor = vec4(1,0,0,1) // 运行失败

#### vec 值的定义

vec 表示向量（vector）

vec4(1.0, 1.0, 1.0, 1.0)

vec3(1.0, 1.0, 1.0)

vec2(1.0, 1.0)

vec4 的取值可以直接将 vec2, vec3 传入 但是， 必须保证 vec4 的值是一个正确的值

例如：

vec4(vec3(1.0), 1.0)

vec4(vec2(1.0), vec2(0.0))

#### uniforms

uniform 的值是同时传入 gpu 的每个处理单元，这意味着 所有线程的输入值是一致的，并且是只读的

uniform 的值是 cpu 和 gpu 之间连通的桥梁， 在 cpu 内执行的代码， 通过特定的方法传入到 GLSL 中

例子：

```c
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main () {
  gl_FragColor = vec4(abs(sin(u_time)), 1.0, 0, 1.0)
}
```

```javascript
const loc = gl.getUniformLocation(program, "u_time");
gl.uniform1f(loc, t);
```

这样 javascript 就将 javascript 变量 t 的值传入到 glsl 中了。

一般情况下， uniform 变量 都是用 u\_ 开头 这样一眼就能看懂变量是一个 uniform

#### GLSL 中的数学函数

- 三角函数

  - sin()
  - cos()
  - tan()
  - asin()
  - acos()
  - atan()

- 指数函数

  - pow()
  - exp()
  - log()
  - sqrt()

- 其他函数

  - abs() // 绝对值
  - sign() // 取符号
  - floor()
  - ceil()
  - fract() // 取 float 小数部分
  - mod()
  - min()
  - max()
  - clamp()

#### gl_FragCoord

gl_FragCoord 的值是一个 vec4， 表示活动线程 正在处理的 **像素** 或 **屏幕碎片** 的坐标。 gl_FragCoord 是一个变化的值， 所以它在不同的线程是不一样的， 这类变化的值叫做 **varying** 变化值

```c
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
}
```

#### glslViewer

[macos 安装教程](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)

[加载.frag 文件](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Using-GlslViewer#1-loading-a-single-fragment-shader)

#### step 和 smoothstep

step(a, b) a 是极限阈值, 第二是检测通过的值, a < b 返回 1, a > b 返回 0

smoothstep(a, b, c) 代表的意思是， 将值 c 插入 [a, b] 的区间
