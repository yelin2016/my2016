# css干货
- `div h1块级元素`如果设置为浮动，那他们的宽度就不再是100%,而是内容的宽度
- `span等行内元素`如果设置为浮动，那就直接可以给他们设置宽度和高度
- 如果一个元素的高度或者宽度设置为百分比，那么这个百分比是相对于他块级或者行内块级或者一个是设置了浮动的行内元素，如果上级是一个没有设置浮动的行内元素，则会跳过，向上查找。（在图片那里遇到的）
- 如果为当前元素（不论之前是什么类型的元素，display:none除外）`position:absolute fixd` `float:left right`只要html代码中出现了以上语句之一，元素的display显示类型就会自动变为以display:inline-block的方式显示
### 字体图标
- 通过伪元素before或者after加属性名content通过\让编码转化为图标字体
### 覆盖样式
- 可以设置一个属性值为auto 以覆盖上级样式
### 设置隐藏
- 超出的部分隐藏，避免影响下面的元素 `overflow:hidden`
### 单行文本隐藏
>单行文本出现省略号必备的四个条件

    width:100px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
### 多行文本隐藏
>多行文本出现省略号必备的四个条件
>WebKit浏览器或移动端的页面

    display:-webkit-box;
    //文字的排列方向 垂直
    -webkit-box-orient:vertical;
    //文字的行数
    -webkit-line-clamp:2;
    //文字内容溢出隐藏
    overflow:hidden;
### 元素默认样式问题
#### 清除全局默认样式

    *{
    margin:0
    padding:0
    }
#### inline-block默认4个像素的间距问题
>解决方法 父元素设置font-size 为0
#### 图片下面默认三像素问题
>解决方法 设置图片`display:block`
### 图片宽高比例问题
>如果一个盒子设置了高度或者宽度其中一个，内部一个图片，设置高度或者宽度（一个）百分比，对应的另一个属性也会进行等比缩放
### margin为负数
>可以抵消不需要的padding
### 各选择器权重

```
id(100) div(1) class(10) 属性选择器10
```

   