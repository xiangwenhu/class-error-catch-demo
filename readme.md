class-error-test demo


### 基本使用方法
```js
const createCatchError = require('class-error-catch')

const config = {
    errorHandler: function (err, target, methodName, message) {
        console.log(`${methodName} in  ${target.constructor.name}\r\n`, `自定义消息:${message}\r\n`) //, `更多细节:${err.message} , ${err.stack}`)
    }
}

const catchError = createCatchError(config)

function getPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject(new Error('超时错误'))
        },1000)
    })
}

class DemoClass {
    @catchError('Error from method sayHi')
    sayHi() {
        console.log(this.xxx.xxx)
    }

    @catchError('Error from async method sayHi2')
    async sayHi2() {
        const r = await getPromise()
        console.log('result', r)
    }
}
const demoClass = new DemoClass()
demoClass.sayHi()
demoClass.sayHi2()


//输出
//sayHi in  DemoClass
//自定义消息:Error from method sayHi

//sayHi2 in  DemoClass
//自定义消息:Error from async method sayHi2


```


### 更多demo
* [method](/test/method.js)
* [static method](/test/method_static.js)
* [property](/test/property.js)
* [getter](/test/getter.js)
* [class](/test/class.js)

index.js 选择相关的测试, 然后执行  node index.js
```js

require("@babel/register")()

require('./test/method')
// require('./test/method_static')
// require('./test/property')
// require('./test/class')
// require('./test/getter')

```