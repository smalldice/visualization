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

这样就完成了对 canvas 原点和 y 轴方向的转换。为了更加清楚， 我们在初始化 canvas 的时候画一下坐标轴。（见示例 demo1）

## 从一个圆说起

如何只用 ctx.lineTo() 在 canvas 上画一个圆?

圆的几何公式：

x² + y² = r²

如果只根据公式，从 x 入手， x 在[-r, r]之间变化，随着 x 的变化 y 的正平方根集合和 y 的负数平方根几何的倒叙组成的数组可以求出圆上每个点

（见示例 demo2）

##
