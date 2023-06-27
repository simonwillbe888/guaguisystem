/* 防抖节流函数 */
let timeout = null // 创建一个标记用来存放定时器的返回值
let canRun = true;
//!!!!这里一定要把变量设在外面，不然会失效！我搞了好久才搞明白！
export function debounce(fn) {
	return function() {
		clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉 
		timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
			fn.apply(this, arguments)
		}, 1000)
	}
}
export function throttle(fn) {
	return function() {
		if (!canRun) return
		canRun = false
		setTimeout(function() {
			fn.apply(this, arguments)
			canRun = true
		}, 1000);
	}
}
