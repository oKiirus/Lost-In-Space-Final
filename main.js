//states: menu, fade, showS1, hideS1, showS2, hideS2 ... showS5, hideS5, => end

var timer = 3
var gamestate = 'menu'
var gamenum = 1
var Tr = 0
var diaTr = 0
var letters = []
var done = false
var ie2 = 0
var limit = 0
var colors = []
var timer2 = 0.5
var abc = 0
var heat = 2
var dia = 1
var dia2 = false
var start = true
var rec, col, laz, mirB, mir, wal, gal, dGal, div, mer, chek
var on = []
var moving = false
var oMoving = false
var PX = 0
var PY = 0
var oMov = null
var pd = 0 //1 : up   2 : right   3 : down   4 : left
var nes = []
var lSpeed = 6
var mirC = []
var timer5 = 0.3
var juice = []
var h = 0;
var size
var player,playerimg, spaceship
var fonts
var mTimer = 0
var edge
var lvlUp
var playHit

var menuMusic, music1, music2, musicOn = true

var grid = [[  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ],
            [  [], [], [], [], [], [], [], [], [], []  ],
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ], 
            [  [], [], [], [], [], [], [], [], [], []  ],
            [  [], [], [], [], [], [], [], [], [], []  ]]

var lazers = []
var lazerCol = []
var lvlI
var timerDed


function preload() {
  S1 = loadImage('ship1.png')
  S2 = loadImage('ship2.png')
  S3 = loadImage('ship3.png')
  S4 = loadImage('ship4.png')
  S5 = loadImage('ship5.png')

  astroid = loadImage('astroid.png')

  menuMusic = loadSound('menuMusic.mp3')
  music1 = loadSound('music1.mp3')
  music2 = loadSound('music2.mp3')

lvlUp = loadImage('levelup.png')

  lvlI = loadImage('score.png')

  spaceship = loadImage('spaceship.gif')

  fonts = loadFont('font/font-regular.ttf')

  red = loadImage('red.png')
  orange = loadImage('orange.png')
  yellow = loadImage('yellow.png')
  green = loadImage('green.png')
  blue = loadImage('blue.png')
  purple = loadImage('purple.png')
  white = loadImage('white.png')

  bg1 = loadImage('bg.png')

  //logoimg = loadImage("logo.gif")
  space = loadImage("space.gif")
  space2 = loadImage("space2.gif")
  popupimg = loadImage("popup.png")


  lred = loadImage('lred2.png')

  lblue = loadImage('lred2.png')
  lyellow = loadImage('lred2.png')
  lpurple = loadImage('lred2.png')
  lgreen = loadImage('lred2.png')
  lorange = loadImage('lred2.png')
  
  col1 = loadImage('ship2.gif')
  col2 = loadImage('ship3.gif')
  col3 = loadImage('ship4.gif')
  col4 = loadImage('ship5.gif')
  col5 = loadImage('ship6.gif')

mainS = loadImage('mainS.gif')

  playerimg=loadAnimation("Player/w1.png","Player/w2.png","Player/w3.png","Player/w4.png","Player/w5.png","Player/w6.png","Player/w7.png","Player/w8.png","Player/w9.png","Player/w10.png","Player/w11.png","Player/w12.png","Player/w13.png","Player/w14.png","Player/w15.png","Player/w16.png","Player/w17.png","Player/w18.png")

}

function setup() {
  createCanvas(800, 800);
textFont(fonts)



  createCanvas(windowWidth, windowHeight)
  timer = millis()

  /*logo = createSprite()
  logo.addImage(logoimg)*/

  popup = createSprite(windowWidth / 2, windowHeight / 2)
  popup.addImage(popupimg)
  popup.visible = false
  popup.scale = 2.7

  //logo.visible = false


  playbutton = createImg("play.png")
  playbutton.position(windowWidth - 150, windowHeight / 2 - 100)
  playbutton.size(100, 100)

  homebutton = createImg("home.png")
  homebutton.position(50, 300)
  homebutton.size(100, 100)

  aboutbutton = createImg("about.png")
  aboutbutton.position(50, 400)
  aboutbutton.size(100, 100)


 


  //making grid

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      grid[x][y].push(130 + 60 * x)
      grid[x][y].push(180 + 60 * y)
      grid[x][y].push('empty')
      grid[x][y].push('empty')
      grid[x][y].push(undefined)
      grid[x][y].push(undefined)
    }
  }




  



  walls = createGroup()


  rec = createGroup()
  col = createGroup()
  laz = createGroup()
  mirB = createGroup()
  mir = createGroup()
  wal = createGroup()
  gal = createGroup()
  dGal = createGroup()
  chek = createGroup()
  div = createGroup()
  mer = createGroup()


  if(windowHeight < windowWidth){
    size = windowHeight
  } else {
    size = windowHeight
  }
  edge = size / 10 * 8 / 11
  menuMusic.loop()

  var x3 = windowWidth / 22 * 3 
  var y3 = windowHeight / 20 * 4
  player = createSprite(x3, y3, 100, 100)
  player.addAnimation("walk",playerimg)
  player.visible = 0
  player.scale = 1.5* (size / 1000);
  grid[0][0][2] = player
}

function draw() {
mTimer -= 0.1
  timer5 -= 0.1
  

  timerDed -= 0.1;

  if(gamestate == 'S1' || gamestate == 'S2' || gamestate == 'S3' ){
  background(space)
} else {
  background(space2)
}

if(gamestate === 'dead'){
  fill(255)
  textSize(80)
  stroke(0)
  strokeWeight(3)
  text('You got lost in space\nPress "r" to try again', windowWidth / 3, windowHeight / 2)
  if(keyDown('r') && timerDed <= 0){
    clearGrid(0, 0)
    homebutton.show()
        aboutbutton.show()
        playbutton.show()
     timer = 3
 gamestate = 'menu'
 gamenum = 1
 
  }
}

  for (let i = 0; i < lazers.length; i++) {

    if (!lazers[i][0][4]) {

      lazers.splice(i, 1)
    }
  }

  if (gamestate !== 'menu' && gamestate !== 'fade' && gamestate !== 'Gfade') {

    if (keyDown('a') && moving === false && PX !== 0) {
      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX - 1][PY][4] === 'mirror') {
            if (grid[PX - 1][PY][5] === 1) {
              setRotation(grid[PX - 1][PY][2], 2)
              grid[PX - 1][PY][5] = 2


            } else {
              setRotation(grid[PX - 1][PY][2], 1)
              grid[PX - 1][PY][5] = 1


            }
          }

          else if (grid[PX - 1][PY][5] === 4) {
            setRotation(grid[PX - 1][PY][2], 1)
            grid[PX - 1][PY][5] = 1
          } else {
            setRotation(grid[PX - 1][PY][2], grid[PX - 1][PY][5] + 1)
            grid[PX - 1][PY][5] += 1
          }

        }
      }//sus

      else if (grid[PX - 1][PY][4] === 'finish') {
        finish()

      } else if (grid[PX - 1][PY][4] === 'wall') {
        gamestate = 'dead'; timerDed = 2

      }else if (keyDown(' ') && PX !== 9 && grid[PX + 1][PY][3] === true && grid[PX - 1][PY][2] === 'empty') {

        pull(4, grid[PX + 1][PY][2])

        move(-1, 0, player)
        pd = 4

        PX--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'


      } else if (grid[PX - 1][PY][3] === true && PX !== 1 && grid[PX - 2][PY][2] === 'empty') {



        shove(4, grid[PX - 1][PY][2])

        move(-1, 0, player)
        pd = 4
        grid[PX][PY][2] = 'empty'
        PX--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX - 1][PY][3] === false) {

      } else if (PX !== 9 && keyDown(' ') && grid[PX + 1][PY][3] === false) {

      } else if (grid[PX - 1][PY][2] === 'empty') {
        move(-1, 0, player)
        pd = 4
        grid[PX][PY][2] = 'empty'
        PX--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }

    }
    if (keyDown('d') && moving === false && PX !== 9) {
      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX + 1][PY][4] === 'mirror') {
            if (grid[PX + 1][PY][5] === 1) {
              setRotation(grid[PX + 1][PY][2], 2)
              grid[PX + 1][PY][5] = 2


            } else {
              setRotation(grid[PX + 1][PY][2], 1)
              grid[PX + 1][PY][5] = 1


            }
          }

          else if (grid[PX + 1][PY][5] === 4) {
            setRotation(grid[PX + 1][PY][2], 1)
            grid[PX + 1][PY][5] = 1
          } else {
            setRotation(grid[PX + 1][PY][2], grid[PX + 1][PY][5] + 1)
            grid[PX + 1][PY][5] += 1
          }

        }
      }//sus
      else if (grid[PX + 1][PY][4] === 'finish') {
        finish()

      } else if (grid[PX + 1][PY][4] === 'wall') {
        gamestate = 'dead'; timerDed = 2

      } else if (keyDown(' ') && PX !== 0 && grid[PX - 1][PY][3] === true && grid[PX + 1][PY][2] === 'empty') {

        pull(2, grid[PX - 1][PY][2])

        move(1, 0, player)
        pd = 2

        PX++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'

      }

      else if (grid[PX + 1][PY][3] === true && PX !== 8 && grid[PX + 2][PY][2] === 'empty') {

        shove(2, grid[PX + 1][PY][2])

        move(1, 0, player)
        pd = 2
        grid[PX][PY][2] = 'empty'
        PX++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX + 1][PY][3] === false) {

      } else if (PX !== 0 && keyDown(' ') && grid[PX - 1][PY][3] === false) {

      } else if (grid[PX + 1][PY][2] === 'empty') {
        move(1, 0, player)
        pd = 2
        grid[PX][PY][2] = 'empty'
        PX++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }
    }
    if (keyDown('w') && moving === false && PY !== 0) {


      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX][PY - 1][4] === 'mirror') {
            if (grid[PX][PY - 1][5] === 1) {
              setRotation(grid[PX][PY - 1][2], 2)
              grid[PX][PY - 1][5] = 2


            } else {
              setRotation(grid[PX][PY - 1][2], 1)
              grid[PX][PY - 1][5] = 1


            }
          }

          else if (grid[PX][PY - 1][5] === 4) {

            setRotation(grid[PX][PY - 1][2], 1)
            grid[PX][PY - 1][5] = 1
          } else {

            setRotation(grid[PX][PY - 1][2], grid[PX][PY - 1][5] + 1)
            grid[PX][PY - 1][5] += 1
          }

        }
      }//sus

      else if (grid[PX][PY - 1][4] === 'finish') {

        finish()

      } else if (grid[PX][PY - 1][4] === 'wall') {
        gamestate = 'dead'; timerDed = 2

      }else if (keyDown(' ') && PY !== 9 && grid[PX][PY + 1][3] === true && grid[PX][PY - 1][2] === 'empty') {

        pull(1, grid[PX][PY + 1][2])

        move(0, -1, player)
        pd = 1

        PY--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'


      } else if (grid[PX][PY - 1][3] === true && PY !== 1 && grid[PX][PY - 2][2] === 'empty') {



        shove(1, grid[PX][PY - 1][2])

        move(0, -1, player)
        pd = 1
        grid[PX][PY][2] = 'empty'
        PY--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX][PY - 1][3] === false) {

      } else if (PY !== 9 && keyDown(' ') && grid[PX][PY + 1][3] === false) {

      } else if (grid[PX][PY - 1][2] === 'empty') {
        move(0, -1, player)
        pd = 1
        grid[PX][PY][2] = 'empty'
        PY--
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }
    }
    if (keyDown('s') && moving === false && PY !== 9) {
      if (keyIsDown(16)) {
        if (timer5 <= 0) {
          timer5 = 0.3
          if (grid[PX][PY + 1][4] === 'mirror') {
            if (grid[PX][PY + 1][5] === 1) {
              setRotation(grid[PX][PY + 1][2], 2)
              grid[PX][PY + 1][5] = 2


            } else {
              setRotation(grid[PX][PY + 1][2], 1)
              grid[PX][PY + 1][5] = 1


            }
          }

          else if (grid[PX][PY + 1][5] === 4) {
            setRotation(grid[PX][PY + 1][2], 1)
            grid[PX][PY + 1][5] = 1
          } else {
            setRotation(grid[PX][PY + 1][2], grid[PX][PY + 1][5] + 1)
            grid[PX][PY + 1][5] += 1
          }

        }
      }//sus

      else if (grid[PX][PY + 1][4] === 'finish') {
        finish()

      } else if (grid[PX][PY + 1][4] === 'wall') {
        gamestate = 'dead'; timerDed = 2

      }else if (keyDown(' ') && PY !== 0 && grid[PX][PY - 1][3] === true && grid[PX][PY + 1][2] === 'empty') {

        pull(3, grid[PX][PY - 1][2])

        move(0, 1, player)
        pd = 3

        PY++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX][PY + 1][3] === true && PY !== 8 && grid[PX][PY + 2][2] === 'empty') {





        shove(3, grid[PX][PY + 1][2])

        move(0, 1, player)
        pd = 3
        grid[PX][PY][2] = 'empty'
        PY++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'



      } else if (grid[PX][PY + 1][3] === false) {

      } else if (PY !== 0 && keyDown(' ') && grid[PX][PY - 1][3] === false) {

      } else if (grid[PX][PY + 1][2] === 'empty') {
        move(0, 1, player)
        pd = 3
        grid[PX][PY][2] = 'empty'
        PY++
        grid[PX][PY][2] = player
        grid[PX][PY][3] = 'empty'
      }
    }
  }

  if (moving === true) {

    if(mTimer <= 0){
moving = false
    }


  }

  if (oMov !== null || undefined) {

    oMov.velocityY = player.velocityY

    oMov.velocityX = player.velocityX

    if (moving === false) {
      oMov = null
    }


  }

  if (gamestate === 'menu' || gamestate === 'fade' || gamestate === 'about') {

   
    if (gamestate == 'menu') {
      background(bg1)
      popup.visible = false
     // background(logoimg)
      
      
      
      //sound.setVolume(volume.value())

  }
  if (homebutton.mousePressed(() => {
      gamestate = "menu"
  }))



      if (aboutbutton.mousePressed(() => {
          gamestate = "about"
      }))


      if (playbutton.mousePressed(() => {
        gamestate = "S1"
        homebutton.hide()
        aboutbutton.hide()
        playbutton.hide()
       
    }))

          if (gamestate === "about") {
            drawSprites()
              popup.visible = true
            fill(0)
            textSize(80)
            stroke(0)
            strokeWeight(3)
              text('Your ship was destroyed!\nUse WASD to move\nHold space to pull crystals\nShoot lazer of same color to enemy spaceship\nGet all 4 ship pieces to escape!', 400, windowHeight / 12 * 3 )
          
          }
 

  }
  if (gamestate === 'fade') {
    
    rectMode(CORNER)
    fill(0, Tr)
    rect(0, 0, 800, 800)

    Tr += 4

    if (Tr >= 255) {
      gamestate = 'S' + gamenum
      start = true
    }
  }

  switch (dia) {

    case 2: talk('when you are singing a song and; your idiot friend starts singing; too', '?')

      break

    case 3:
      talk('i need too pee sod; your idiot friend starts singing; too', '?')

      break
  }

  if (done === true) {





    for (let i = 0; i <= limit; i++) {
      if (si.length > 0 && letters[i]) {
        letters[i].show()
      }
    }

    timer2--

    if (timer2 <= 0) {
      timer2 = 0.5
      limit++
    }





  }

  if (gamestate === 'S1' || gamestate === 'S2' || gamestate === 'S3' || gamestate === 'S4' || gamestate === 'S5') {
    rectMode(CENTER)

   

      popup.visible = false
  

    h++

    push()

 
    /*

    for(let i =  0; i <= windowHeight; i += windowHeight / 10){
      strokeWeight(2)
      stroke(255)
   
      line(windowWidth / 11 , i, windowWidth, i)
    }



    for(let i =  windowWidth / 11; i <= windowWidth; i += windowWidth / 11 ){
      strokeWeight(2)
      stroke(255)
      
      line( i, 0, i, windowHeight)
    }

    */
pop()

    player.visible = 1




    drawSprites()
    for (let i = 0; i < lazers.length; i++) {
      lazers[i] = [[lazers[i][0][0], lazers[i][0][1], lazers[i][0][2], lazers[i][0][3], lazers[i][0][4]]]




      start = true

      X = lazers[i][0][0]
      Y = lazers[i][0][1]
      d = lazers[i][0][2]
      c = lazers[i][0][3]
      s = lazers[i][0][4]


      while (start) {



        if (d === 1) {
          Y -= 1
        } else if (d === 2) {
          X += 1
        } else if (d === 3) {
          Y += 1
        } else if (d === 4) {
          X -= 1
        }



        if (X === -1 || X === 10 || Y === -1 || Y === 10 || grid[X][Y][4] == 'wall') {
          start = false

          lazers[i].push([X, Y, d, c, s])

        } else if (grid[X][Y][4] == 'mirror') {

          var mc = grid[X][Y][2].shapeColor
          var ls = []
          var lp = []


          if (c !== undefined && mc !== undefined) {

            for (let e = 0; e < 3; e++) {

              if (colorD(c)[e] === colorD(mc)[e]) {

                ls.push(colorD(c)[e])
                lp.push('')
              } else if (c !== '') {
                lp.push(colorD(c)[e])
                ls.push('')
              } else {
                ls.push('')
                lp.push('')
              }
            }
          }




          ls = colorM(ls)
          if (colorM(lp) !== []) {
            lp = colorM(lp)
          }




          for (let i = 0; i < lazers.length; i++) {
            for (let e = 0; e < lazers[i].length; e++) {

              if (lazers[i][e][0] === X && lazers[i][e][1] === Y && lazers[i][e][2] === d) {
                if (d === MF(d, grid[X][Y][5])) {
                  if (ls === c && lazers[i][e][3] !== undefined && c !== undefined) {
                    ls = colorMerge(lazers[i][e][3], c)
                  }
                }
                if (lp === c && lazers[i][e][3] !== undefined && c !== undefined) {
                  lp = colorMerge(lazers[i][e][3], c)
                }


              }
            }
          }



          lazers.push([[X, Y, d, lp, false]])

          d = MF(d, grid[X][Y][5])

          lazers[i].push([X, Y, d, ls, s])

          c = ls



        } else if (grid[X][Y][4] == 'col') {
          start = false

          lazers[i].push([X, Y, d, c, s])

        }


        else if (grid[X][Y][4] == 'diverger' && c !== undefined) {
          if (grid[X][Y][5] === d) {
            yed = colorD(c)

            if (yed[0] !== '') {
              if (d !== 4) {
                lazers.push([[X, Y, d + 1, 'red', false]])
                c = 'red'
              } else {
                lazers.push([[X, Y, 1, 'red', false]])
              }
            }

            if (yed[1] !== '') {
              if (d !== 4) {
                lazers.push([[X, Y, d, 'yellow', false]])
                c = 'yellow'
              }
            }

            if (yed[2] !== '') {
              if (d !== 1) {
                lazers.push([[X, Y, d - 1, 'blue', false]])
                c = 'blue'
              } else {
                lazers.push([[X, Y, 4, 'blue', false]])
              }
            }

            lazers[i].push([X, Y, d, c, s])

          } else {
            start = false
            lazers[i].push([X, Y, d, c, s])
          }
          start = false
          lazers[i].push([X, Y, d, c, s])
        }
        else if (grid[X][Y][4] == 'merger' && c !== undefined) {

          start = false
          lazers[i].push([X, Y, d, c, s])

          juice = []

          for (let e = 0; e < mer.length; e++) {
            juice.push([xTX(mer[e].x), yTY(mer[e].y), getRotation(mer[e]), ''])
          }
          //X Y d c s
          for (let i = 0; i < lazers.length; i++) {
            for (let a = 0; a < lazers[i].length; a++) {
              for (let e = 0; e < mer.length; e++) {

                if (xTX(mer[e].x) === lazers[i][a][0] && yTY(mer[e].y) === lazers[i][a][1]) {
                  if (getRotation(mer[e]) === 1 && lazers[i][a][2] === 3) {

                  }
                  else if (getRotation(mer[e]) === 2 && lazers[i][a][2] === 4) {

                  }
                  else if (getRotation(mer[e]) === 3 && lazers[i][a][2] === 1) {

                  }
                  else if (getRotation(mer[e]) === 4 && lazers[i][a][2] === 2) {

                  }
                  else {
                    if (juice[e][3] === '') {
                      juice[e][3] = lazers[i][a][3]
                    } else {
                      juice[e][3] = colorMerge(juice[e][3], lazers[i][a][3])

                    }
                  }
                }
              }
            }
          }

          for (let i = 0; i < juice.length; i++) {
            if (juice[i][3] !== '') {
              lazers.push([[juice[i][0], juice[i][1], juice[i][2], juice[i][3], false]])
            }
          }



        }
        else if (grid[X][Y][4] == 'checkpoint') {
          var dir1 = getRotation(grid[X][Y][2])

          if (dir1 === 1 && d === 1) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 2 && d === 2) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 3 && d === 3) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 4 && d === 4) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 5 && d === 1 || d === 3) {
            lazers[i].push([X, Y, d, c, s])
          } else if (dir1 === 6 && d === 2 || d === 4) {
            lazers[i].push([X, Y, d, c, s])
          } else {
            start = false
            lazers[i].push([X, Y, d, c, s])
          }

        }
        else if (grid[X][Y][4] == 'glass' || grid[X][Y][4] == 'dGlass') {
          var t = grid[X][Y][4]
          var yes = ''
          var no = ['', '', '']
          yes1 = colorD(c)
          yes2 = colorD(grid[X][Y][2].shapeColor)
          if (yes1 !== undefined && yes2 !== undefined) {
            if (yes2[0] !== '' && yes1[0] !== '') {
              no[0] = yes2[0]
            }
            if (yes2[1] !== '' && yes1[1] !== '') {
              no[1] = yes2[1]
            }
            if (yes2[2] !== '' && yes1[2] !== '') {
              no[2] = yes2[2]
            }
          } else {
            continue
          }
          yes = colorM(no)
          c = yes

          if (t === 'glass') {
            lazers[i].push([X, Y, d, c, s])
          } else {
            var dir = getRotation(grid[X][Y][2])


            if (dir === 1 && d === 1) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 2 && d === 2) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 3 && d === 3) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 4 && d === 4) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 5 && d === 1 || d === 3) {
              lazers[i].push([X, Y, d, c, s])
            } else if (dir === 6 && d === 2 || d === 4) {
              lazers[i].push([X, Y, d, c, s])
            } else {
              start = false
              lazers[i].push([X, Y, d, c, s])
            }
          }


        }







      }//while...




      for (let e = 0; e < lazers[i].length - 1; e++) {

        if (lazers[i][e][3] !== [] && lazers[i][e][3] !== undefined) {

          stroke(lazers[i][e][3])

          strokeWeight(2)
          line(Xx(lazers[i][e][0]), Yy(lazers[i][e][1]), Xx(lazers[i][e + 1][0]), Yy(lazers[i][e + 1][1]))
        }
      }

      loop1:
      for (let e = 0; e < col.length; e++) {
        for (let i = 0; i < lazers.length; i++) {
          for (let x = 0; x < lazers[i].length; x++) {

            X = xTX(col[e].x)
            Y = yTY(col[e].y)
            d = getRotation(col[e])
            ct = false


            if (grid[X][Y][4] === 'col') {
              lX = lazers[i][lazers[i].length - 1][0]
              lY = lazers[i][lazers[i].length - 1][1]
              lD = lazers[i][lazers[i].length - 1][2]
              lC = colorD(lazers[i][lazers[i].length - 1][3])
            } else {

              lC = colorD(lazers[i][x][3])
              lX = lazers[i][x][0]
              lY = lazers[i][x][1]
              lD = lazers[i][x][2]
            }
            c = colorD(col[e].shapeColor)

            if (lC !== undefined && c !== undefined) {
              for (let x = 0; x < c.length; x++) {
                if (c[x] === '') {
                  continue
                } else if (lC[x] === c[x]) {
                  ct = true
                } else {
                  ct = false
                  break
                }
              }
            } else {
              ct = false
            }

            if (X === lX && Y === lY && d === lD && ct) {
              on[e] = true
              continue loop1
            } else {
              on[e] = false
            }
          }
        }
      }



    }







  } // everythang

  if (gamestate === 'S1') {

    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWheheWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    
   

    if (start === true) {
      mirC = []

      
      makeBox(0, 4, false, 'lazer', 2, 'red')
      
      makeBox(1, 4, true, 'mirror', 2, 'red')
      
      makeBox(4, 0, false, 'col', 1, 'red')

      makeBox(7, 1, false, 'wall', 1, 'red')
      makeBox(0, 7, false, 'wall', 1, 'red')
      makeBox(7, 4, false, 'wall', 1, 'red')
      makeBox(3, 0, false, 'wall', 1, 'red')
      makeBox(1, 1, false, 'wall', 1, 'red')
      makeBox(8, 5, false, 'wall', 1, 'red')
      makeBox(3, 3, false, 'wall', 1, 'red')
      makeBox(5, 9, false, 'wall', 1, 'red')
      
      makeBox(9, 0, false, 'finish', null)
      


      nes.push(0)


  



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)


   



    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Lazer, Mirror, Colector, done

  if (gamestate === 'S2') {

    if (start === true) {

      mirC = []

      makeBox(4, 9, false, 'lazer', 1, 'blue')

      makeBox(0, 4, false, 'lazer', 2, 'red')

      makeBox(3, 3, true, 'mirror', 2, 'white')

      makeBox(4, 0, false, 'col', 1, 'red')

      makeBox(9, 4, false, 'col', 2, 'blue')

      makeBox(9, 0, false, 'finish', null)

      makeBox(5, 0, false, 'wall', 1, 'red')
      makeBox(0, 7, false, 'wall', 1, 'red')
      makeBox(1, 0, false, 'wall', 1, 'red')
      makeBox(0, 5, false, 'wall', 1, 'red')
      makeBox(3, 6, false, 'wall', 1, 'red')
      makeBox(7, 5, false, 'wall', 1, 'red')
      makeBox(2, 9, false, 'wall', 1, 'red')
      makeBox(8, 1, false, 'wall', 1, 'red')



      nes.push(0)
      nes.push(1)

    



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



   

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Color, done

  if (gamestate === 'S3') {

    if (start === true) {


      mirC = []


      makeBox(0, 4, false, 'lazer', 2, 'purple')

      makeBox(4, 3, true, 'mirror', 2, 'red')


      makeBox(5, 0, false, 'col', 1, 'red')

      makeBox(9, 4, false, 'col', 2, 'blue')

      makeBox(9, 0, false, 'finish', null)

      makeBox(3, 3, false, 'wall', 1, 'red')
      makeBox(1, 9, false, 'wall', 1, 'red')
      makeBox(8, 2, false, 'wall', 1, 'red')
      makeBox(4, 6, false, 'wall', 1, 'red')
      makeBox(4, 9, false, 'wall', 1, 'red')
      makeBox(2, 8, false, 'wall', 1, 'red')
      makeBox(7, 7, false, 'wall', 1, 'red')
      makeBox(0, 1, false, 'wall', 1, 'red')

      nes.push(0)
      nes.push(1)

      



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



    

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Tinted Mirror

  if (gamestate === 'S4') {

    if (start === true) {

      mirC = []

      makeBox(5, 0, false, 'lazer', 3, 'red')
      makeBox(0, 4, false, 'lazer', 2, 'blue')
     
  

      makeBox(9, 4, false, 'col', 2, 'purple')

      makeBox(3, 5, true, 'mirror', 1, 'red')

      makeBox(9, 0, false, 'finish', 2, 'yellow')



      makeBox(3, 2, false, 'wall', 1, 'red')
      makeBox(0, 8, false, 'wall', 1, 'red')
      makeBox(1, 0, false, 'wall', 1, 'red')
      makeBox(5, 6, false, 'wall', 1, 'red')
      makeBox(2, 5, false, 'wall', 1, 'red')
      makeBox(7, 5, false, 'wall', 1, 'red')
      makeBox(8, 8, false, 'wall', 1, 'red')
      makeBox(8, 1, false, 'wall', 1, 'red')



      nes.push(0)


     



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)




    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // Merger, Glass



  if (gamestate === 'S5') {
    
    textAlign(CENTER)
    textSize(200)
    fill(255)
  image(mainS, windowWidth / 4, windowHeight / 2, windowWidth / 2, windowHeight / 2)
    text('Ship Assembled!', windowWidth / 2, 200)
    text('You Win!', windowWidth / 2, 400)
  }

  if (gamestate === 'Gfade') {

    textAlign(CENTER)
    textSize(100)
    fill(255)
    
    image(lvlUp, windowWidth / 4, windowHeight / 4, windowWidth / 2, windowHeight / 2)

    if(gamenum === 2){
      image(S1, windowWidth / 6, windowHeight / 4 * 3)
      text('Collected Rocket Stabilizers, 3 parts remaining!', windowWidth / 2, windowHeight / 5)
    } else if(gamenum === 3){
      image(S1, windowWidth / 6, windowHeight / 4 * 3 )
      image(S2, windowWidth / 6 * 2, windowHeight / 4 * 3 )
      text('Collected Rocket Docks, 2 parts remaining!', windowWidth / 2, windowHeight / 5)
    } else if(gamenum === 4){
      image(S1, windowWidth / 6, windowHeight / 4 * 3 )
      image(S2, windowWidth / 6 * 2, windowHeight / 4 * 3 )
      image(S3, windowWidth / 6 * 4, windowHeight / 4 * 3 )
      text('Collected Rocket Hull, 1 part remaining!', windowWidth / 2, windowHeight / 5)
    } else if(gamenum === 5){
      image(S1, windowWidth / 6, windowHeight / 4 * 3 )
      image(S2, windowWidth / 6 * 2, windowHeight / 4 * 3 )
      image(S3, windowWidth / 6 * 4, windowHeight / 4 * 3 )
      image(S4, windowWidth / 6 * 5, windowHeight / 4 * 3 )
      text('Collected Rocket Blasters, 0 parts remaining!', windowWidth / 2, windowHeight / 5)
    }
    Tr += 3

    if (Tr >= 255) {
      gamestate = 'S' + gamenum
      start = true
    }
  }

  if (gamestate === 'end') {

    if (start === true) {



      makeBox(4, 0, false, 'lazer', 5, 'blue')

      makeBox(0, 4, false, 'lazer', 2, 'red')

      makeBox(3, 3, true, 'mirror', 2)

      makeBox(4, 0, false, 'col', 1, 'red')

      makeBox(9, 4, false, 'col', 2, 'blue')

      makeBox(9, 0, false, 'finish', null)



      nes.push(0)
      nes.push(1)

     



      start = false

    }
    rectMode(CENTER)
    fill('grey')
    stroke(100)



    

    drawSprites(mir)
    drawSprites(laz)
    drawSprites(col)
    drawSprites(rec)
    drawSprites(walls)
    drawSprites(wal)
    drawSprites(mer)
    drawSprites(div)
    drawSprites(gal)
    drawSprites(dGal)
    drawSprites(chek)


  } // play 2

  {

    noStroke() //balls
    for (let i = 0; i < mer.length; i++) {
      d = getRotation(mer[i])
      p = mer[i]

      if (d === 1) {

        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        rect(p.x + 15, p.y, 20, 6)
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x - 2, p.y - 15, 2, 20)
        fill('yellow')
        rect(p.x, p.y - 15, 2, 20)
        fill('blue')
        rect(p.x + 2, p.y - 15, 2, 20)

      }
      else if (d === 2) {
        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        rect(p.x, p.y - 15, 6, 20)
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x + 15, p.y - 2, 20, 2)
        fill('yellow')
        rect(p.x + 15, p.y, 20, 2)
        fill('blue')
        rect(p.x + 15, p.y + 2, 20, 2)
      }
      else if (d === 3) {
        fill('white')
        rect(p.x, p.y - 15, 6, 20)
        rect(p.x + 15, p.y, 20, 6)
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x - 2, p.y + 15, 2, 20)
        fill('yellow')
        rect(p.x, p.y + 15, 2, 20)
        fill('blue')
        rect(p.x + 2, p.y + 15, 2, 20)
      }
      else if (d === 4) {
        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        rect(p.x, p.y - 15, 6, 20)
        rect(p.x + 15, p.y, 20, 6)
        fill('red')
        rect(p.x - 15, p.y - 2, 20, 2)
        fill('yellow')
        rect(p.x - 15, p.y, 20, 2)
        fill('blue')
        rect(p.x - 15, p.y + 2, 20, 2)
      }
    }
    for (let i = 0; i < div.length; i++) {
      d = getRotation(div[i])
      p = div[i]

      if (d === 1) {
        fill('white')
        rect(p.x, p.y + 15, 6, 20)
        fill('red')
        rect(p.x + 15, p.y, 20, 6)
        fill('yellow')
        rect(p.x, p.y - 15, 6, 20)
        fill('blue')
        rect(p.x - 15, p.y, 20, 6)
      }
      else if (d === 2) {
        fill('white')
        rect(p.x - 15, p.y, 20, 6)
        fill('red')
        rect(p.x, p.y + 15, 6, 20)
        fill('yellow')
        rect(p.x + 15, p.y, 20, 6)
        fill('blue')
        rect(p.x, p.y - 15, 6, 20)
      }
      else if (d === 3) {
        fill('white')
        rect(p.x, p.y - 15, 6, 20)
        fill('red')
        rect(p.x - 15, p.y, 20, 6)
        fill('yellow')
        rect(p.x, p.y + 15, 6, 20)
        fill('blue')
        rect(p.x + 15, p.y, 20, 6)
      }
      else if (d === 4) {
        fill('white')
        rect(p.x + 15, p.y, 20, 6)
        fill('red')
        rect(p.x, p.y - 15, 6, 20)
        fill('yellow')
        rect(p.x - 15, p.y, 20, 6)
        fill('blue')
        rect(p.x, p.y + 15, 6, 20)
      }
    }

    for (let i = 0; i < chek.length; i++) {
      d = getRotation(chek[i])
      p = chek[i]

      if (d === 1) {
        fill('white')
        rect(p.x, p.y, 5, 50)
      }
      else if (d === 2) {
        fill('white')
        rect(p.x, p.y, 50, 5)
      }


    }
  }//hehe
  if (gamestate === 'S1' || gamestate === 'S2' || gamestate === 'S3' || gamestate === 'S4' ) {
    textSize(80)
     noStroke(255)
     fill(255)
     image(lvlI, 0, 0, 200, 100)
     fill(0)
    textAlign(CORNER)
    text('Task ' + gamestate.split('')[1], 30, 80)
  }
}











