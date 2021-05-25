## 二维向量

定义： 平面上一个有向线段

数学表现形式： [x, y]， 表示从坐标系原点[0, 0]指向[x, y]的线段。

## 转换坐标系

As we all know， canvas 的坐标系， 原点在左上角， 向右是 x 轴正轴方向， 向下是 y 轴正轴方向。
为了转换为笛卡尔坐标系（平面直角坐标系）方便计算， 我们需要对 canvas 的坐标系做一下转换。

```javascript
const canvas = document.getElementById("canvasId");
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(-1);
```

这样就完成了对 canvas 原点和 y 轴方向的转换。为了更加清楚， 我们在初始化 canvas 的时候画一下坐标轴。

> 示例见 index.html demo1

## 从一个圆说起

> 如何只用 ctx.lineTo() 在 canvas 上画一个圆?

圆的几何公式：

x² + y² = r²

如果只根据公式，从 x 入手， x 在[-r, r]之间变化，随着 x 的变化 y 的正平方根集合和 y 的负数平方根几何的倒叙组成的数组可以求出圆上每个点

> 示例见 index.html demo2

在求 y 轴坐标的时候，我们遵循的公式是

```javascript
y = Math.Sqrt(r ** 2 - x ** 2);

positivePoints.push(y);
negativePoints.unshift(-y);
```

但是如果圆心坐标发生了变化， 例如:

(x - 4)² + (y + 10)² = 100 (圆心坐标为 [4, -10])

在 x 变化的过程中， 求 y 的公式就会非常麻烦。

为了简化计算， 可以引入向量的方式来计算圆上的每一个点。

## 用向量画圆

示意图:

![圆上一点](https://pro-image.xiaoheiban.cn/202105/0ca084ec-d746-4156-ab48-f6002d9326fd.jpeg)

向量 u 绕原点旋转 θ ， 旋转后的点坐标为 [r * cosθ, r * sinθ], 向量 u 绕原点转一周， 顶部划过的路线就是圆, 根据这个公式， 很容易可以画出圆来

> 示例见 index.html demo3

## 向量的加法

当圆的原点不在原点上， 如何计算圆上的点呢？这个时候需要引入向量的加法

示意图:

![向量加法](https://pro-image.xiaoheiban.cn/202105/6e3a75ed-5987-43d9-a201-d25a98ece198.png)

那么圆上某一点的计算过程如图所示：

![圆上某一点](https://pro-image.xiaoheiban.cn/202105/af5d480a-0596-482c-adef-409e3343bd01.png)

可以得出， 在已知圆心和半径的情况下， 计算出圆上的某一点的公式如下：

x = x0 + r*cosθ
y = y0 + r*sinθ

> 示例见 index.html demo4

## 如何画圆弧？

已知初始向量， 和圆弧的角度， 画出一段 60° 的圆弧

![向量旋转](https://pro-image.xiaoheiban.cn/202105/342fec8f-3424-4bee-be1c-21040dd2a288.jpeg)

P 的 x,y 分别为[x0, y0]

x0 = r \* cosα
y0 = r \* sinα

P'的 x,y 分别为[x, y]

x = r \* cos(α + θ)
y = r \* sin(α + θ)

根据三角函数的公式

x = cosα \* cosθ \* r - sinα \* sinθ \* r
y = sinα \* cosθ \* r + cosα \* sinθ \* r

将 x0, y0 带入

x = x0 \* cosθ - y0 \* sinθ
y = x0 \* sinθ + y0 \* cosθ

这样我们就得到了向量的旋转公式。

> 示例见 index.html demo5
