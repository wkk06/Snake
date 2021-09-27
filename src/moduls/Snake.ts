export default class Snake {
	// 获取蛇的容器
	snakeEle: HTMLElement
	// 表示蛇头的元素
	snakeHeadEle: HTMLElement
	// 蛇的身体（包括蛇头）,HTMLCollection集合，会实时刷新
	snakeBodiesEle: HTMLCollection

	constructor() {
		this.snakeEle = document.getElementById('snake')!
		this.snakeHeadEle = document.querySelector('#snake > div')!
		this.snakeBodiesEle = document
			.getElementById('snake')!
			.getElementsByTagName('div')
	}

	get X() {
		return this.snakeHeadEle.offsetLeft
	}
	get Y() {
		return this.snakeHeadEle.offsetTop
	}

	set X(value: number) {
		// 如果新值和旧值相同，则不处理
		if (this.X === value) {
			return
		}

		// 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
		if (
			this.snakeBodiesEle[1] &&
			(this.snakeBodiesEle[1] as HTMLElement).offsetLeft === value
		) {
			// console.log('水平方向发生了掉头');
			// 如果发生了掉头，让蛇向反方向继续移动
			if (value > this.X) {
				// 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
				value = this.X - 10
			} else {
				// 向左走
				value = this.X + 10
			}
		}

    // bug1: 撞墙前一直按反方向会穿墙,把判断撞墙条件放判断反方向条件后面就行,加个return;
		// X 的值的合法范围为0-290
		if (value < 0 || value > 290) {
			// 进入判断说明蛇撞墙死了
			throw new Error('蛇撞墙死了！')
			return
		}

		// 移动身体
		this.moveBody()

		this.snakeHeadEle.style.left = value + 'px'
		// 检查有没有撞到自己
		this.checkHeadBody()
	}

	set Y(value: number) {
		if (this.Y === value) {
			return
		}

		// 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
		if (
			this.snakeBodiesEle[1] &&
			(this.snakeBodiesEle[1] as HTMLElement).offsetTop === value
		) {
			if (value > this.Y) {
				value = this.Y - 10
			} else {
				value = this.Y + 10
			}
		}

		// Y 的值的合法范围为0-290
		if (value < 0 || value > 290) {
			// 进入判断说明蛇撞墙死了
			throw new Error('蛇撞墙死了！')
      return;
		}

		// 移动身体
		this.moveBody()

		this.snakeHeadEle.style.top = value + 'px'
		// 检查有没有撞到自己
		this.checkHeadBody()
	}

	// 蛇增加身体的方法
	addBody() {
		// 向蛇的容器添加一个div
		this.snakeEle.insertAdjacentHTML('beforeend', '<div></div>')
	}

	// 添加一个蛇身体移动的方法
	moveBody() {
		/*
		 *   将后边的身体设置为前边身体的位置
		 *       举例子：
		 *           第4节 = 第3节的位置
		 *           第3节 = 第2节的位置
		 *           第2节 = 蛇头的位置
		 */
		// 遍历获取所有的身体
		for (let i = this.snakeBodiesEle.length - 1; i > 0; i--) {
			// 获取前边身体的位置
			let X = (this.snakeBodiesEle[i - 1] as HTMLElement).offsetLeft
			let Y = (this.snakeBodiesEle[i - 1] as HTMLElement).offsetTop

			// 将值设置到当前身体上
			;(this.snakeBodiesEle[i] as HTMLElement).style.left = X + 'px'
			;(this.snakeBodiesEle[i] as HTMLElement).style.top = Y + 'px'
		}
	}

	// 检查蛇头是否撞到身体的方法
	checkHeadBody() {
		// 获取所有的身体，检查其是否和蛇头的坐标发生重叠
		for (let i = 1; i < this.snakeBodiesEle.length; i++) {
			let bd = this.snakeBodiesEle[i] as HTMLElement
			if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
				// 进入判断说明蛇头撞到了身体，游戏结束
				throw new Error('撞到自己了！')
			}
		}
	}
}
