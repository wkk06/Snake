// 引入其他lei
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'

// 游戏控制器，控制其他所有类
export default class GameControl {
	// 定义三个属性
	snake: Snake
	food: Food
	scorePanel: ScorePanel

	// 创建一个属性储存蛇的移动方向
	direction: string = ''
	// 创建一个属性用来记录游戏是否结束
	isLive = true

	constructor() {
		this.snake = new Snake()
		this.food = new Food()
		this.scorePanel = new ScorePanel(10, 5)
	}

	// 初始化游戏，调用后游戏开始
	init() {
		// 绑定键盘按下的事件
		// fn.bind(this)会创建一个与fn具有相同函数体和作用域的函数，但是在这个新函数中，this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。bind绑定的参数只生效一次。
		document.addEventListener('keydown', this.keydownHandler.bind(this))
		// 调用run方法，使蛇移动
		this.run()
	}

	/**
	 * 创建键盘按下的响应函数
	 * @param event
	 *
	 * Chrome浏览器    IE浏览器
	 * ArrowUp          Up
	 * ArrowDown        Down
	 * ArrowLeft        Left
	 * ArrowRight       Right
	 */
	keydownHandler(event: KeyboardEvent) {
		// console.log(event.key)
		// 检查按下键是否合法

		// 修改蛇移动方向
		this.direction = event.key
	}

	// 控制蛇移动
	run() {
		/*
		 *   根据方向（this.direction）来使蛇的位置改变
		 *       向上 top  减少
		 *       向下 top  增加
		 *       向左 left 减少
		 *       向右 left 增加
		 */
		// 获取蛇现在坐标
		let X = this.snake.X
		let Y = this.snake.Y

		// 根据按键方向来计算X值和Y值（未更新）
		switch (this.direction) {
			case 'ArrowUp':
			case 'Up':
				// 向上移动 top 减少
				Y -= 10
				break
			case 'ArrowDown':
			case 'Down':
				// 向下移动 top 增加
				Y += 10
				break
			case 'ArrowLeft':
			case 'Left':
				// 向左移动 left 减少
				X -= 10
				break
			case 'ArrowRight':
			case 'Right':
				// 向右移动 left 增加
				X += 10
				break
		}

		// 检查蛇是否吃到了食物
		this.checkEat(X, Y)

		// 修改蛇的X和Y值
		try {
			this.snake.X = X
			this.snake.Y = Y
		} catch (e: any) {
			// 进入到catch，说明出现异常，游戏结束,弹窗提醒
			alert(e.message + 'GAME OVER!')
			// 将isLive设置为false,若不设置为false，游戏一直进行着
			// this.isLive = false

			// 处理游戏终止后只能玩一次，需要手动刷新才能重新游戏的问题
			location.reload()
		}

		// 开启一个定时器调用
		this.isLive &&
			setTimeout(
				this.run.bind(this),
				300 - (this.scorePanel.level - 1) * 30
			)
	}

	// 定义一个方法，检查蛇是否吃到了食物
	checkEat(X: number, Y: number) {
		if (X === this.food.X && Y === this.food.Y) {
			// console.log('吃到食物了！')
			// 吃到食物了，食物位置重置
			this.food.change()
			// 针对食物随机位置不能和蛇头和蛇身重叠
			for (let i = 0; i < this.snake.snakeBodiesEle.length; i++) {
				let bd = this.snake.snakeBodiesEle[i] as HTMLElement
				// console.log('foodX:'+this.food.X);
				// console.log('snakeX:'+bd.offsetLeft);

				if (this.food.X === bd.offsetLeft) {
					this.food.change()
					// console.log("食物和蛇重叠了");
				}
			}
			// 分数增加
			this.scorePanel.addScore()
			// 蛇增加一节
			this.snake.addBody()
		}
	}
}
