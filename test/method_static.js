const createCatchError = require('class-error-catch')

const config = {
    errorHandler: function (err, target, methodName, message) {
        console.log(`${methodName} in  ${target.constructor.name}\r\n`, `自定义消息:${message}\r\n`,)// `更多细节:${err.message} , ${err.stack}`)
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
    
    @catchError('error from DemoClass static method sayHi')
    static sayHi() {
        console.log(this.xxx.xxx)
    }

    @catchError('Error from DemoClass static async method sayHi2')
    static async sayHi2() {
        const r = await getPromise()
        console.log('result', r)
    }
}

DemoClass.sayHi()
DemoClass.sayHi2()