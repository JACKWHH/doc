# Dayjs 二次封装

## 需求

在项目中，我们经常会用到日期时间相关的功能，比如格式化日期、获取当前时间等。但是这些功能都需要依赖于第三方库，比如 moment.js、date-fns。

因此，我们需要自己封装一套日期时间相关的功能，以满足项目的需求。

## 方案

Dayjs 是一个轻量级的处理日期时间的 JavaScript 库，它和 moment.js、date-fns 类似，但它更加简单、易用。  

因此，我们可以基于 Dayjs 进行二次封装，以满足项目的需求。

## 封装

### 安装

```bash
npm install dayjs --save
```


### 格式化日期

```javascript
import dayjs from 'dayjs';

const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format);
};


// 调用
const date = new Date();
const formattedDate = formatDate(date);
console.log(formattedDate); // 2021-08-10 10:10:10
```


### 获取当前时间

```javascript
import dayjs from 'dayjs';


const getCurrentTime = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs().format(format);
};


// 调用
const currentDate = getCurrentTime();
console.log(currentDate); // 2021-08-10 10:10:10
```


### 日期计算


```javascript 
import dayjs from 'dayjs';

const addDays = (date, days) => {
  return dayjs(date).add(days, 'day').format('YYYY-MM-DD HH:mm:ss');
};

const addMonths = (date, months) => {
  return dayjs(date).add(months,'month').format('YYYY-MM-DD HH:mm:ss');
};

const addYears = (date, years) => {
  return dayjs(date).add(years, 'year').format('YYYY-MM-DD HH:mm:ss');
};

// 调用
const date = new Date();
const addDate = addDays(date, 1);
console.log(addDate); // 2021-08-11 10:10:10

const addMonth = addMonths(date, 1);
console.log(addMonth); // 2021-09-10 10:10:10

const addYear = addYears(date, 1); 
console.log(addYear); // 2022-08-10 10:10:10
```


## 总结

Dayjs 是一个轻量级的处理日期时间的 JavaScript 库，它和 moment.js、date-fns 类似，但它更加简单、易用。因此，我们可以基于 Dayjs 进行二次封装，以满足项目的需求。

Dayjs 封装的功能包括：

- 格式化日期
- 获取当前时间
- 日期计算

以上功能均已封装，可以直接调用。
