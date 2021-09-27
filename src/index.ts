import './style/index.less'
// import Food from './moduls/Food'
// import ScorePanel from './moduls/ScorePanel'
// const food = new Food()
// food.change()
// console.log(food.X, food.Y);

import GameControl from './moduls/GameControl'

const gc = new GameControl()
gc.init()

// setInterval(()=>{
//   console.log(gc.direction);
// },1000)