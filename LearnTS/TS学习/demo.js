var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Greeter(greeting) {
    return function (target) {
        target.prototype.greet = function () {
            console.log(greeting);
        };
    };
}
var Greeting = /** @class */ (function () {
    function Greeting() {
        // 内部实现
    }
    Greeting = __decorate([
        Greeter("Hello TS!")
    ], Greeting);
    return Greeting; 
}());
var myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello TS!';
