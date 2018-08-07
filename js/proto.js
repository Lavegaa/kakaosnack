let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;
let player = {
  ID: undefined,
  T_HP: true,
  HP: 0,
  ATK: 0,
  SPECIAL: '',
  init: function() {
    this.ID = undefined;
    this.T_HP = true,
    this.HP = 0;
    this.ATK = 0;
    this.SPECIAL = '';
  }
};
let equip = {
  weapon: {
    ID: undefined,
    PART: "weapon",
    HP: 0,
    ATK: 0,
    SPECIAL:'None'
  },
  armor: {
    ID: undefined,
    PART: "armor",
    HP: 0,
    ATK: 0,
    SPECIAL:'None'
  },
  init: function() {
    this.weapon = {
      ID: undefined,
      PART: "weapon",
      HP: 0,
      ATK: 0,
      SPECIAL:'None'
    },
    this.armor = {
      ID: undefined,
      PART: "armor",
      HP: 0,
      ATK: 0,
      SPECIAL:'None'
    }
  }
};
let level = 1;
let stage = 1;
let small_stage = 1;
let itemNum = 0;
let isStat = false;
let isItem = false;
let isClear = false;

class IntroScene extends Phaser.Scene {
  constructor(config) {
    super({ key: 'intro' });
  }
  preload() {
    var progressBox = this.add.graphics();
    var progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.5);
    progressBox.fillRect(gameWidth*0.15, gameHeight/2-25, gameWidth*0.7, 50);

    var loadingText = this.make.text({
        x: gameWidth / 2,
        y: gameHeight / 2 - 50,
        text: 'Loading...',
        style: {
            fontSize: 15,
            fontStyle: 'bold',
            fill: '#000000'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
        x: gameWidth/2,
        y: gameHeight/2,
        text: '0%',
        style: {
            fontSize: 20,
            fontStyle: 'bold',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xFFCC00, 1);
      progressBar.fillRect(gameWidth*0.15, gameHeight/2-25, gameWidth*0.7 * value, 50);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    this.load.image('bg','img/bg_intro.png');
    this.load.image('title','img/title.png');
    for (let i=1; i<5; i++) { this.load.image('how'+i,'img/howto/'+i+'.png'); }
    this.load.image('exit','img/exit.png');
    this.load.image('button','img/button.png');
    this.load.image('UI','img/status.png');
    this.load.image('nav','img/nav_ch.png');
    this.load.image('bgChar1','img/bg_character1.png');
    this.load.image('bgChar2','img/bg_character2.png');
    this.load.image('bgChar3','img/bg_character3.png');
    this.load.image('HP','img/HP.png');
    this.load.image('ATK','img/ATK.png');
    this.load.image('left','img/left.png');
    this.load.image('right','img/right.png');
    this.load.image('nav_item','img/nav_item.png');
    this.load.image('nav_stage','img/nav_stage.png');
    this.load.image('nav_coin','img/nav_coin.png');
    this.load.image('bg_ch','img/bg_ch.png');
    this.load.image('bg_stage','img/bg_stage.png');
    this.load.image('bg_coin','img/bg_coin.png');
    this.load.image('bg_status','img/bg_status.png');
    this.load.image('char1','img/character1.png');
    this.load.image('char2','img/character2.png');
    this.load.image('char3','img/character3.png');
    this.load.image('redraw','img/redraw.png');
    this.load.image('plate','img/plate.png');
    this.load.image('weapon','img/weapon.png');
    this.load.image('armor','img/armor.png');
    for (let i=1; i<12; i++) { this.load.image('armor'+i,'img/armor/'+i+'.png'); }
    for (let i=1; i<12; i++) { this.load.image('weapon'+i,'img/weapon/'+i+'.png'); }
    this.load.image('Block','img/Block.png');
    this.load.image('GetHP','img/GetHP.png');
    this.load.image('DAttack','img/Dattack.png');
    this.load.image('Evade','img/Evade.png');
    this.load.image('blank','img/blank.png');
    this.load.image('char1','img/character1.png');
    this.load.image('char2','img/character2.png');
    this.load.image('char3','img/character3.png');
    this.load.image('head1','img/head1.png');
    this.load.image('head2','img/head2.png');
    this.load.image('head3','img/head3.png');
    this.load.image('mon1','img/monster1.png');
    this.load.image('mon2','img/monster2.png');
    this.load.image('mon3','img/monster3.png');
    this.load.image('mhead1','img/mhead1.png');
    this.load.image('mhead2','img/mhead2.png');
    this.load.image('mhead3','img/mhead3.png');
    this.load.image('mhead0','img/mhead0.png');
    this.load.image('boss1','img/ryan1.png');
    this.load.image('boss2','img/ryan2.png');
    this.load.image('boss3','img/ryan3.png');
    this.load.image('boss4','img/ryan4.png');
    this.load.image('button', 'img/button.png');
    this.load.image('background','img/background.png');
    this.load.image('plate','img/plate.png');
    this.load.image('potion0','img/potion0.png');
    this.load.image('potion1','img/potion1.png');
    this.load.image('potion2','img/potion2.png');
    this.load.image('stageplate','img/stageplate.png');
    this.load.image('bg_gameover','img/bg_gameover.png');

    this.load.audio('character',['sound/character.wav']);
    this.load.audio('pick1',['sound/pick1.wav']);
    this.load.audio('pick2',['sound/pick2.wav']);
    this.load.audio('bell',['sound/bell.wav']);
    this.load.audio('chooseitem',['sound/chooseitem.wav']);
    this.load.audio('coin',['sound/coin.wav']);
    this.load.audio('pattack',['sound/pattack.wav']);
    this.load.audio('mattack1',['sound/mattack1.wav']);
    this.load.audio('mattack2',['sound/mattack2.wav']);
    this.load.audio('fight',['sound/fight.wav']);
  }
  create() {
    //set bg & title
    this.add.image(gameWidth/2, gameHeight/2, 'bg').setDisplaySize(gameWidth, gameHeight);
    this.add.image(gameWidth/2, gameHeight/6, 'title').setScale(0.2);

    //show ranking
    let dataRank;
    if (localStorage.rank) { dataRank = JSON.parse(localStorage.rank); }
    let bgRank = this.add.image(gameWidth*0.5, gameHeight*0.5, 'UI').setDisplaySize(gameWidth*0.3, gameHeight*0.3).setAlpha(0.5);
    let txtRank = this.add.text(0, bgRank.y-bgRank.displayHeight*0.45, "랭킹", { fontSize: bgRank.displayHeight*0.1, fontStyle: 'bold' });
    txtRank.x = bgRank.x - txtRank.width/2;
    let maxIndex = 0;
    if (dataRank != undefined) {
      if (dataRank.length > 5) { maxIndex = 5; }
      else { maxIndex = dataRank.length; }
    }
    for (let i=0; i<maxIndex; i++) {
      let txtNth = this.add.text(0, txtRank.y+txtRank.height*1.5+bgRank.displayHeight*0.15*i, (i+1)+"등: "+dataRank[i].stage+"-"+dataRank[i].level, { fontSize: bgRank.displayHeight*0.07, fontStyle: 'bold' }).setPadding({ top: bgRank.displayHeight*0.03 });
      txtNth.x = bgRank.x - txtNth.width/2;
    }

    //create button
    let btnStart = this.add.image(gameWidth/2, gameHeight*0.78, 'button').setDisplaySize(gameWidth/3,gameWidth/6).setInteractive();
    btnStart.name = 'start';
    let txtStart = this.add.text(0, 0, '게임시작', { fontSize: btnStart.displayHeight/3, fontStyle: 'bold'});
    txtStart.x = btnStart.x - txtStart.displayWidth/2;
    txtStart.y = btnStart.y - txtStart.displayHeight/2;

    let btnHow = this.add.image(gameWidth/2, gameHeight*0.9, 'button').setDisplaySize(gameWidth/3,gameWidth/6).setInteractive();
    btnHow.name = 'how';
    let txtHow = this.add.text(0, 0, '게임방법', { fontSize: btnStart.displayHeight/3, fontStyle: 'bold'});
    txtHow.x = btnHow.x - txtHow.displayWidth/2;
    txtHow.y = btnHow.y - txtHow.displayHeight/2;

    let conHow = this.howTo();
    let pick1 = this.sound.add('pick1',{volume: 0.5});
    let now = 1;

    //input handler(buttons)
    this.input.on('gameobjectdown', function(pointer, button) {
      button.setTint(0xf0f0f0);
    });
    this.input.on('gameobjectup', function(pointer, button) {
      button.clearTint();
      pick1.play();
      switch (button.name) {
        case 'start':
          this.scene.start('first');
          break;
        case 'how':
          if (conHow.visible) { conHow.setVisible(false); now = 1; }
          else { conHow.setVisible(true); }
          break;
        case 'left':
          button.setTintFill(0xFFCC00);
          conHow.getByName(now).setVisible(false);
          if (now == 1) { now = 4; }
          else { now--; }
          conHow.getByName(now).setVisible(true);
          break;
        case 'right':
          button.setTintFill(0xFFCC00);
          conHow.getByName(now).setVisible(false);
          if (now == 4) { now = 1; }
          else { now++; }
          conHow.getByName(now).setVisible(true);
          break;
        case 'close':
          now = 1;
          conHow.setVisible(false);
          break;
      }
    }, this);
  }
  howTo() {
    let container = this.add.container(gameWidth*0.5, gameHeight*0.5).setSize(gameWidth*0.8, gameHeight*0.7);
    let bg = this.add.image(0, 0, 'bg_ch').setDisplaySize(container.width, container.height);

    let imgHow = [
      this.add.image(0, 0, 'how1').setDisplaySize(container.width, container.height).setVisible(true).setName(1),
      this.add.image(0, 0, 'how2').setDisplaySize(container.width, container.height).setVisible(false).setName(2),
      this.add.image(0, 0, 'how3').setDisplaySize(container.width, container.height).setVisible(false).setName(3),
      this.add.image(0, 0, 'how4').setDisplaySize(container.width, container.height).setVisible(false).setName(4)
    ];

    let btnLeft = this.add.image(0, 0, 'left').setDisplaySize(container.height*0.1, container.height*0.1).setInteractive();
    btnLeft.setName('left').setTintFill(0xFFCC00);
    let btnRight = this.add.image(0, 0, 'right').setDisplaySize(container.height*0.1, container.height*0.1).setInteractive();
    btnRight.setName('right').setTintFill(0xFFCC00);
    btnLeft.x = -container.width/2 + btnLeft.displayWidth/2;
    btnLeft.y = -container.height/2 + btnLeft.displayHeight/2;
    btnRight.x = container.width/2 - btnRight.displayWidth/2;
    btnRight.y = btnLeft.y;

    let btnClose = this.add.image(0, 0, 'exit').setDisplaySize(container.height*0.1, container.height*0.1);
    btnClose.setName('close').setInteractive();
    btnClose.x = container.width/2 - btnClose.displayWidth/2;
    btnClose.y = -container.height/2 - btnClose.displayHeight/2;

    container.add([bg, imgHow[0], imgHow[1], imgHow[2], imgHow[3], btnLeft, btnRight, btnClose]);
    container.setVisible(false);
    return container;
  }
}

class ChooseCharacterScene extends Phaser.Scene {
  constructor(config) {
    super({ key: 'first' });
  }
  create() {
    let character = this.sound.add('character',{
      volume: 0.3
    });
    character.play();

    let pick1 = this.sound.add('pick1',{
      volume: 0.5
    });
    let pick2 = this.sound.add('pick2',{
      volume: 0.5
    });

    this.input.manager.enabled = true;
    //create character selection
    let imgNav = this.add.image(gameWidth/2, gameHeight/20, 'nav').setDisplaySize(gameWidth, gameHeight/10).setDepth(1);

    let now = 0;
    let charList = [
      this.createCharacter(gameWidth/2, gameHeight/2, 1, 20, 6),
      this.createCharacter(gameWidth/2, gameHeight/2, 2, 17, 8),
      this.createCharacter(gameWidth/2, gameHeight/2, 3, 14, 10)
    ];
    charList[1].setVisible(false);
    charList[2].setVisible(false);

    let btnLeft = this.add.image(gameWidth*0.1, gameHeight*0.15, 'left').setDisplaySize(gameHeight*0.1, gameHeight*0.1).setInteractive();
    btnLeft.setName('left').setTintFill(0xffffff);
    let btnRight = this.add.image(gameWidth*0.9, gameHeight*0.15, 'right').setDisplaySize(gameHeight*0.1, gameHeight*0.1).setInteractive();
    btnRight.setName('right').setTintFill(0xffffff);

    this.input.on('gameobjectdown', function(pointer, button) {
      button.setTint(0x505050);
    });
    this.input.on('gameobjectup', function(pointer, button) {
      button.setTintFill(0xffffff);
      switch (button.name) {
        case 'left':
          charList[now].setVisible(false);
          if (now == 0) { now = 2; }
          else { now--; }
          charList[now].setVisible(true);
          pick1.play();
          break;
        case 'right':
          charList[now].setVisible(false);
          if (now == 2) { now = 0; }
          else { now++; }
          charList[now].setVisible(true);
          pick1.play();
          break;
        default:
          button.clearTint();
          player.ID = button.name;
          player.HP = button.getData('hp');
          player.ATK = button.getData('atk');
          pick2.play();
          character.stop();
          console.log(player);
          //change scene
          this.scene.start('second');
          break;
      }
    }, this);

  }
  createCharacter(x, y, id, hp, atk) {
    let container = this.add.container(x,y).setSize(gameWidth,gameHeight);
    let bg = this.add.image(0, 0, 'bgChar'+id).setDisplaySize(container.width,container.height);

    let imgHp = this.add.image(-container.width*0.4, -container.height*0.25, 'HP').setDisplaySize(container.height*0.05,container.height*0.05);
    let txtHp = this.add.text(imgHp.x+imgHp.displayWidth, imgHp.y-imgHp.displayHeight/2, hp, { fontSize: imgHp.displayHeight, fontStyle: 'bold', fontFamily:'font1' });
    let imgAtk = this.add.image(txtHp.x+txtHp.width*2, imgHp.y, 'ATK').setDisplaySize(container.height*0.05,container.height*0.05);
    let txtAtk = this.add.text(imgAtk.x+imgAtk.displayWidth, txtHp.y, atk, { fontSize: imgAtk.displayHeight, fontStyle: 'bold' , fontFamily:'font1'});

    let btnSelect = this.add.image(0, -container.height*0.35, 'button').setDisplaySize(container.height*0.2,container.height*0.1).setInteractive();
    let txtSelect = this.add.text(0, 0, '선택', { fontSize: btnSelect.displayHeight/3, fontStyle: 'bold', fontFamily:'font1'});
    txtSelect.x = btnSelect.x - txtSelect.displayWidth/2;
    txtSelect.y = btnSelect.y - txtSelect.displayHeight/2;

    btnSelect.setName(id);
    btnSelect.setData({ hp: hp, atk: atk });

    container.add([bg, imgHp, txtHp, imgAtk, txtAtk, btnSelect, txtSelect]);

    return container;
  }
}

class ChooseItemScene extends Phaser.Scene {
  constructor() {
    super( { key: 'second' } );
  }
  create() {
    let coin = this.sound.add('coin',{
      volume: 0.5
    });
    let nenough = this.sound.add('nenough',{
      volume: 0.5
    });
    let pick1 = this.sound.add('pick1',{
      volume: 0.5
    });
    let bell = this.sound.add('bell',{
      volume: 0.5
    });
    let chooseitem = this.sound.add('chooseitem',{
      volume: 0.5
    });
    bell.play();
    chooseitem.play({loop:true});


    //top nav part
    let nav = this.add.container(gameWidth/2,gameHeight*0.1).setSize(gameWidth,gameHeight*0.2);

    let imgNavbg = this.add.image(0, 0, 'nav_item').setDisplaySize(nav.width, nav.height);

    let imgStage = this.add.image(0, nav.height*0.2, 'bg_stage').setDisplaySize(nav.height,nav.height*0.5);
    imgStage.x = -nav.width/2 + imgStage.displayWidth/2;
    let txtStage = this.add.text(0, 0, "stage: "+stage, { fontSize: imgStage.displayHeight/4, padding: imgStage.displayWidth*0.05,fontStyle: 'bold', fill: '#805252' , fontFamily:'font1'});
    txtStage.x = imgStage.x - txtStage.width/2;
    txtStage.y = imgStage.y - txtStage.height/2;

    let dataCoin;
    if (localStorage.coin) { dataCoin = JSON.parse(localStorage.coin); }
    else { dataCoin = 0; }
    let txtCoin = this.add.text(0,-nav.height*0.4,""+dataCoin, { fontSize: nav.height*0.2, fontStyle: 'bold', fill: '#000' , fontFamily:'font1'});
    txtCoin.x = nav.width/2 - txtCoin.width - txtCoin.height;
    let imgCoin = this.add.image(0, txtCoin.y+txtCoin.height/2, 'nav_coin').setDisplaySize(txtCoin.height*1.5, txtCoin.height);
    imgCoin.x = txtCoin.x - imgCoin.displayWidth;

    let btnRedraw = this.add.image(0, nav.height*0.2,'redraw').setDisplaySize(nav.height,nav.height*0.5).setInteractive().setName('redraw');
    btnRedraw.x = nav.width/2 - btnRedraw.displayWidth/2;

    nav.add([imgNavbg, imgStage, txtStage, txtCoin, imgCoin, btnRedraw]);

    //show chosen character & recent status
    let container = this.add.container(gameWidth/2,gameHeight*0.85).setSize(gameWidth,gameHeight*0.3);

    let imgCharBg = this.add.image(-container.width*0.35, 0, 'bg_ch').setDisplaySize(container.width*0.3, container.height);
    let imgChar = this.add.image(imgCharBg.x, imgCharBg.y,  'char'+player.ID).setDisplaySize(container.width*0.26,container.height*0.9);

    let eWeapon = this.createItem(-container.width*0.025, -container.height*0.5+container.width*0.175, container.width*0.36, container.width*0.35, equip.weapon);
    let eArmor = this.createItem(container.width*0.325, -container.height*0.5+container.width*0.175, container.width*0.36, container.width*0.35, equip.armor);

    let imgStatusBg = this.add.image(container.width*0.15, 0, 'bg_status').setDisplaySize(container.width*0.7,container.height-eWeapon.displayHeight+2);
    imgStatusBg.y = eWeapon.y + eWeapon.displayHeight/2 + imgStatusBg.displayHeight/2 - 2;
    let imgHP =  this.add.image(imgStatusBg.x-imgStatusBg.displayWidth*0.4, imgStatusBg.y, 'HP').setDisplaySize(imgStatusBg.displayHeight/2, imgStatusBg.displayHeight/2);
    let HP = this.add.text(imgHP.x+imgHP.displayWidth, imgStatusBg.y-imgHP.displayHeight/2, player.HP, { fontSize: imgHP.displayHeight, fontStyle: 'bold', fontFamily:'font1' });
    let imgATK = this.add.image(imgStatusBg.x+imgStatusBg.displayWidth*0.05, imgStatusBg.y, 'ATK').setDisplaySize(imgHP.displayHeight, imgHP.displayHeight);
    let ATK = this.add.text(imgATK.x+imgATK.displayWidth, HP.y, player.ATK, { fontSize: HP.height, fontStyle: 'bold' , fontFamily:'font1'});

    container.add([imgCharBg, imgChar, eWeapon, eArmor, imgStatusBg, imgHP, HP, imgATK, ATK]);

    //create item selection
    let itemList = [
      this.createItem(gameWidth/4, gameHeight*0.325, gameWidth*0.5,gameHeight*0.25, this.setRandom()),
      this.createItem(gameWidth/4*3, gameHeight*0.325, gameWidth*0.5,gameHeight*0.25, this.setRandom()),
      this.createItem(gameWidth/4, gameHeight*0.575, gameWidth*0.5,gameHeight*0.25, this.setRandom()),
      this.createItem(gameWidth/4*3, gameHeight*0.575, gameWidth*0.5,gameHeight*0.25, this.setRandom())
    ];

    this.input.on('gameobjectdown', function(pointer, gameObject) {
      if (gameObject.name == 'conPick') {
        //call data variable
        let itemPART = gameObject.getByName('btnPick').getData('part');
        let itemHP = gameObject.getByName('btnPick').getData('hp');
        let itemATK = gameObject.getByName('btnPick').getData('atk');

        //initialize player status text
        HP.setText(player.HP).clearTint();
        ATK.setText(player.ATK).clearTint();

        //show status change
        if (itemPART=='weapon') {
          HP.setText(player.HP-equip.weapon.HP+itemHP);
          ATK.setText(player.ATK-equip.weapon.ATK+itemATK);

          if (equip.weapon.HP<itemHP) {
            HP.setTintFill(0x00ff00);
          } else if (equip.weapon.HP>itemHP) {
            HP.setTintFill(0xff0000);
          }
          if (equip.weapon.ATK<itemATK) {
            ATK.setTintFill(0x00ff00);
          } else if (equip.weapon.ATK>itemATK) {
            ATK.setTintFill(0xff0000);
          }
        } else if (itemPART=='armor') {
          HP.setText(player.HP-equip.armor.HP+itemHP);
          ATK.setText(player.ATK-equip.armor.ATK+itemATK);

          if (equip.armor.HP<itemHP) {
            HP.setTintFill(0x00ff00);
          } else if (equip.armor.HP>itemHP) {
            HP.setTintFill(0xff0000);
          }
          if (equip.armor.ATK<itemATK) {
            ATK.setTintFill(0x00ff00);
          } else if (equip.armor.ATK>itemATK) {
            ATK.setTintFill(0xff0000);
          }
        }
      } else {
        //set button tint
        gameObject.setTint(0x606060);
      }
    }, this);
    this.input.on('gameobjectup', function(pointer, gameObject) {
      if (gameObject.name == 'conPick') {
        pick1.play();
        if (gameObject.getData('pick')) {
          gameObject.setData('pick',false);
          //hide button and show item image
          gameObject.getByName('btnPick').setVisible(false);
          gameObject.getByName('txtPick').setVisible(false);
          gameObject.getByName('imgItem').setVisible(true);

          HP.setText(player.HP).clearTint();
          ATK.setText(player.ATK).clearTint();
        } else {
          //hide item image and show button & status change
          for (let item of itemList) {
            if (item == gameObject) {
              item.setData('pick',true);
              item.getByName('btnPick').setVisible(true);
              item.getByName('txtPick').setVisible(true);
              item.getByName('imgItem').setVisible(false);
            } else {
              item.setData('pick',false);
              item.getByName('btnPick').setVisible(false);
              item.getByName('txtPick').setVisible(false);
              item.getByName('imgItem').setVisible(true);
            }
          }
        }

      }  else if (gameObject.name == 'redraw') {
        gameObject.clearTint();
        if (dataCoin >= 10) {
          localStorage.coin = dataCoin - 10;
          coin.play();
          chooseitem.stop();
          this.scene.restart();
        } else {
          nenough.play();
        }

      } else {
        chooseitem.stop();
        //set tint to show it clearly
        gameObject.clearTint();
        //create item object & push into equip
        let item = {
          ID: gameObject.getData('id'),
          PART: gameObject.getData('part'),
          HP: gameObject.getData('hp'),
          ATK: gameObject.getData('atk'),
          SPECIAL: gameObject.getData('special')
        }
        switch (item.PART) {
          case 'weapon':
            player.HP += (item.HP-equip.weapon.HP);
            player.ATK += (item.ATK-equip.weapon.ATK);
            equip.weapon = item;
            break;
          case 'armor':
            player.HP += (item.HP-equip.armor.HP);
            player.ATK += (item.ATK-equip.armor.ATK);
            equip.armor = item;
            break;
        }
        console.log("item: ", item);
        console.log("equip: ", equip);
        //change scene with data(image and status)
        this.scene.start('third');
      }
    }, this);
  }

  setRandom() {
    // item's status instance randomly
      let HP__item=0;
      let ATK__item=0;
      let percent = Math.floor(Math.random()*100);
      let part = Math.floor(Math.random()*11)+1;
      let part_what;
      let special='None';
      let special_key=Math.floor(Math.random()*2);

      if(itemNum < 2){
        if(percent<90){
          ATK__item = Math.floor(Math.random()*2)+3*stage;
          part_what = "weapon";
        }else if(percent<20){
          HP__item = Math.floor(Math.random()*3)+2*stage;
          ATK__item = Math.floor(Math.random()*2)+2*stage;
          part_what = "weapon";
        }else{
          if(special_key==0){
            HP__item = Math.floor(Math.random()*3)+4*stage;
            ATK__item = Math.floor(Math.random()*2)+4*stage;
            part_what = "weapon";
            special='DAttack';
          }else{
            HP__item = Math.floor(Math.random()*3)+4*stage;
            ATK__item = Math.floor(Math.random()*2)+4*stage;
            part_what = "weapon";
            special='GetHP';
          }
        }
      }else{
        if(percent<90){
          HP__item = Math.floor(Math.random()*3)+8*stage;
          part_what = "armor";
        }else if(percent<20){
          HP__item = Math.floor(Math.random()*8*stage)+2;
          ATK__item = Math.floor(Math.random()*2*stage)+1;
          part_what = "armor";
        }else{
          if(special_key==0){
            HP__item = Math.floor(Math.random()*3)+10*stage;
            ATK__item = Math.floor(Math.random()*2)+2*stage;
            part_what = "armor";
            special='Block';
          }else{
            HP__item = Math.floor(Math.random()*3)+10*stage;
            ATK__item = Math.floor(Math.random()*2)+2*stage;
            part_what = "armor";
            special='Evade';
          }
        }
      }
      itemNum++;
      if(itemNum==4){
        itemNum=0;
      }

    let item = {
      ID: part,
      PART: part_what,
      HP: HP__item,
      ATK: ATK__item,
      SPECIAL : special
    };
    return item;
  }

  createItem(x, y, w, h, item) {
    let container = this.add.container(x,y).setSize(w, h);
    let imgBg = this.add.image(0, 0, 'plate').setDisplaySize(container.width*1.05,container.height*1.05);
    let imgItem;
    if (item.ID == undefined) {
      imgItem = this.add.image(0, -container.height*0.1, 'blank').setDisplaySize(container.height*0.6,container.height*0.6).setName('imgItem');
    } else if(itemNum<3 && itemNum!=0){
       imgItem = this.add.image(0, -container.height*0.1, 'weapon'+item.ID).setDisplaySize(container.height*0.6,container.height*0.6).setName('imgItem');
    } else{
       imgItem = this.add.image(0, -container.height*0.1, 'armor'+item.ID).setDisplaySize(container.height*0.6,container.height*0.6).setName('imgItem');
    }
    let imgPart = this.add.image(-container.width*0.35, -container.height*0.35, ''+item.PART).setDisplaySize(container.height*0.2,container.height*0.2);
    let imgHP = this.add.image(-container.width*0.3, container.height*0.32,'HP').setDisplaySize(container.height*0.13,container.height*0.13);
    let txtHP = this.add.text(-container.width*0.2, container.height*0.245, item.HP , {fontSize : container.height*0.13, fontFamily:'font1'});
    let imgATK = this.add.image(container.width*0.1, container.height*0.32,'ATK').setDisplaySize(container.height*0.13,container.height*0.13);
    let txtATK = this.add.text(container.width*0.22, container.height*0.245, item.ATK , {fontSize : container.height*0.13, fontFamily:'font1'});
    let imgSpc;
    if (item.SPECIAL == 'None') {
      imgSpc = this.add.image(container.width*0.4, -container.height*0.4, 'blank').setDisplaySize(container.height*0.25,container.height*0.25);
    } else {
      imgSpc = this.add.image(container.width*0.35, -container.height*0.35, ''+item.SPECIAL).setDisplaySize(container.height*0.25,container.height*0.25);
    }

    let btnSelect = this.add.image(0, -container.height*0.1, 'button').setDisplaySize(container.width/2,container.width/4).setInteractive();
    btnSelect.setName('btnPick').setVisible(false);
    btnSelect.setData({ id: item.ID, part: item.PART, hp: item.HP, atk: item.ATK, special: item.SPECIAL });
    let txtSelect = this.add.text(0, 0, '선택', { fontSize: btnSelect.displayHeight/3, fontStyle: 'bold', fontFamily:'font1'});
    txtSelect.x = btnSelect.x - txtSelect.displayWidth/2;
    txtSelect.y = btnSelect.y - txtSelect.displayHeight/2;
    txtSelect.setName('txtPick').setVisible(false);

    container.add([imgBg, imgItem, imgPart, imgHP, txtHP, imgATK, txtATK, imgSpc, btnSelect, txtSelect]);
    container.setName('conPick').setData('pick', false).setInteractive();

    return container;
  }

}

class FightScene extends Phaser.Scene {
  constructor() {
    super({ key: 'third' });
  }
  //get data from pre scene
  init() {
    this.timer = 0;
    this.turn = 'p';
  }

  create() {

    let bgm = this.sound.add('fight',{
      volume: 0.5
    });
    bgm.play({loop:true});

    //create container
    let playerBox = this.add.container(gameWidth/2,gameHeight*0.95).setSize(gameWidth,gameHeight*0.1);
    //view status
    if(player.T_HP){
      this.playerHP = player.HP;
      player.T_HP = false;
    }

    let playerbg = this.add.image(0, 0, 'background').setDisplaySize(playerBox.width, playerBox.height);
    this.HP = this.add.text(-playerBox.width*0.2,-playerBox.height*0.22, this.playerHP, { fontSize: playerBox.displayHeight*0.36, fill: '#000' , fontFamily:'font1'});
    let CHEAD__img = this.add.image(-playerBox.width*0.4 ,0,'head'+player.ID).setDisplaySize(playerBox.height*0.8,playerBox.height*0.8);
    let HP__img = this.add.image(-playerBox.width*0.25, 0,'HP').setDisplaySize(playerBox.height*0.5,playerBox.height*0.5);
    let ATK = this.add.text(playerBox.width*0.05, -playerBox.height*0.22, player.ATK, { fontSize: playerBox.displayHeight*0.36, fill: '#000' , fontFamily:'font1'});
    let ATK__img = this.add.image(0 ,0,'ATK').setDisplaySize(playerBox.height*0.5,playerBox.height*0.5);
    let DATK__img = this.add.image(playerBox.width*0.3 ,0,'DAttack').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    let GATK__img = this.add.image(playerBox.width*0.3 ,0,'GetHP').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    let BARMOR__img = this.add.image(playerBox.width*0.4 ,0,'Block').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    let EARMOR__img = this.add.image(playerBox.width*0.4 ,0,'Evade').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    this.WIN__text = this.add.text(0, 0 , 'W    I    N', { fontSize:playerBox.width*0.1, fontStyle: 'bold' , fontFamily:'font1'}).setVisible(false);
    this.WIN__img = this.add.image(0, 0, 'background').setDisplaySize(playerBox.width, playerBox.height).setVisible(false);
    this.WIN__text.x = this.WIN__img.x - this.WIN__text.width/2;
    this.WIN__text.y = this.WIN__img.y - this.WIN__text.height/2;

    playerBox.add([playerbg,this.HP,HP__img,CHEAD__img,ATK,ATK__img,DATK__img,GATK__img,BARMOR__img,EARMOR__img,this.WIN__img,this.WIN__text]);
    if(equip.weapon.SPECIAL == 'DAttack'){
      DATK__img.setVisible(true);
      GATK__img.setVisible(false);
    }else if(equip.weapon.SPECIAL == 'GetHP'){
      GATK__img.setVisible(true);
      DATK__img.setVisible(false);
    }
    if(equip.armor.SPECIAL == 'Block'){
      BARMOR__img.setVisible(true);
      EARMOR__img.setVisible(false);
    }else if(equip.armor.SPECIAL == 'Evade'){
      EARMOR__img.setVisible(true);
      BARMOR__img.setVisible(false);
    }

    this.playerImg = this.add.sprite(gameWidth*0.2, gameHeight*0.5, 'char'+player.ID).setDisplaySize(gameWidth*0.25,gameHeight*0.4);
    if(level%4 == 0){
      let ranBoss = Math.floor(Math.random()*4)+1;
      this.monsterImg = this.add.sprite(gameWidth*0.8, gameHeight*0.5, 'boss'+ranBoss).setDisplaySize(gameWidth*0.25,gameHeight*0.4);
    }else if(level%4 == 2){
      this.monsterImg = this.add.sprite(gameWidth*0.8, gameHeight*0.63, 'mon'+(level%4)).setDisplaySize(gameWidth*0.08,gameHeight*0.12);
    }else{
      this.monsterImg = this.add.sprite(gameWidth*0.8, gameHeight*0.5, 'mon'+(level%4)).setDisplaySize(gameWidth*0.25,gameHeight*0.4);
    }
    this.stageplate = this.add.image(gameWidth*0.12,gameHeight*0.15,'stageplate').setDisplaySize(gameWidth*0.22,gameWidth*0.22);
    this.STAGE__text = this.add.text(gameWidth*0.06,gameHeight*0.135,stage+'-'+small_stage,{fontSize:gameHeight*0.05, fill:'#000', fontFamily:'font1'});

//===============================================MONSTER=============================================================================

    this.monster = {
      HP : 0,
      ATK : 0,
      SPECIAL : 'None'
    }
    //monster's status
    if(level%4 == 0){
      let Boss_special = Math.floor(Math.random()*4);
      this.monster.HP = (level*5) + (stage*5) + 15;
      this.monster.ATK = (level) + (stage*5) + 1;
      if(Boss_special == 0){
        this.monster.SPECIAL = 'DAttack';
      }else if(Boss_special == 1){
        this.monster.SPECIAL = 'GetHP';
      }else if(Boss_special == 2){
        this.monster.SPECIAL='Block';
      }else if(Boss_special == 3){
        this.monster.SPECIAL='Evade';
      }

    }else{
      this.monster.HP = (level*4) + 12;
      this.monster.ATK = (stage+2);
      this.monster.SPECIAL = 'None';
    }

    this.monsterHP = this.monster.HP;
    let monsterBox = this.add.container(gameWidth/2,gameHeight*0.05).setSize(gameWidth,gameHeight*0.1);
    let monsterbg = this.add.image(0, 0, 'background').setDisplaySize(monsterBox.width, monsterBox.height);
    let MHEAD__img = this.add.image(-monsterBox.width*0.4, 0,'mhead'+(level%4)).setDisplaySize(playerBox.height*0.8,playerBox.height*0.8);
    let MHP__img = this.add.image(-monsterBox.width*0.25, 0,'HP').setDisplaySize(monsterBox.height*0.5,monsterBox.height*0.5);
    this.M__HP = this.add.text(-monsterBox.width*0.2, -monsterBox.height*0.22,this.monster.HP, { fontSize:monsterBox.displayHeight*0.36 , fill: '#000' , fontFamily:'font1'});
    let MATK__img = this.add.image(0, 0,'ATK').setDisplaySize(monsterBox.height*0.5,monsterBox.height*0.5);
    let M__ATK = this.add.text(monsterBox.width*0.05, -monsterBox.height*0.22, this.monster.ATK, { fontSize: monsterBox.displayHeight*0.36, fill: '#000' , fontFamily:'font1'});
    let MDATK__img = this.add.image(monsterBox.width*0.3 ,0,'DAttack').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    let MGATK__img = this.add.image(monsterBox.width*0.25 ,0,'GetHP').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    let MBARMOR__img = this.add.image(monsterBox.width*0.4 ,0,'Block').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    let MEARMOR__img = this.add.image(monsterBox.width*0.4 ,0,'Evade').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    this.SELECT__text = this.add.text(0,0,'스텟을 골라주세요',{fontSize:monsterBox.width*0.1,fontStyle:'bold' ,fontFamily:'font1'}).setVisible(false);
    this.SELECT__img = this.add.image(0, 0, 'background').setDisplaySize(monsterBox.width, monsterBox.height).setVisible(false);
    this.SELECT__text.x = this.SELECT__img.x - this.SELECT__text.displayWidth/2;
    this.SELECT__text.y = this.SELECT__img.y - this.SELECT__text.displayHeight/2;
    monsterBox.add([monsterbg,MHP__img,MHEAD__img,MATK__img,this.M__HP,M__ATK,MDATK__img,MGATK__img,MBARMOR__img,MEARMOR__img,this.SELECT__img,this.SELECT__text]);

    if(this.monster.SPECIAL == 'DAttack'){
      MDATK__img.setVisible(true);
      MGATK__img.setVisible(false);
    }else if(this.monster.SPECIAL == 'GetHP'){
      MGATK__img.setVisible(true);
      MDATK__img.setVisible(false);
    }else if(this.monster.SPECIAL == 'Block'){
      MBARMOR__img.setVisible(true);
      MEARMOR__img.setVisible(false);
    }else if(this.monster.SPECIAL == 'Evade'){
      MEARMOR__img.setVisible(true);
      MBARMOR__img.setVisible(false);
    }

    //fight event (per 1 second)
    this.fightEvent = this.time.addEvent({ delay: 600, callback: this.onEvent, callbackScope: this, loop: true });



    this.input.on('gameobjectdown', function(pointer ,gameObject) {
      if(gameObject.name=='status'){
        let status = {
          HP: gameObject.getData('hp'),
          ATK: gameObject.getData('atk'),
        }
        player.HP += status.HP;
        this.playerHP += status.HP;
        player.ATK += status.ATK;
        this.scene.start('third');
        level++;
        small_stage++;
        if(small_stage==5){
          small_stage=1;
        }
        bgm.stop();
      }
    },this);
    this.input.on('gameobjectup', function(pointer, button) {
      switch (button.name) {
        case 'replay':
          player.init();
          equip.init();
          level = 1;
          stage = 1;
          small_stage = 1;
          isStat = false;
          this.scene.start('first');
          bgm.stop();
          break;
        case 'exit':
          player.init();
          equip.init();
          level = 1;
          stage = 1;
          small_stage = 1;
          isStat = false;
          this.scene.start('intro');
          bgm.stop();
          break;
      }
    }, this);
  } //create end

  update() {
    //clearTint timer
    this.timer++;
    if (this.timer%60 == 20) {
      this.HP.clearTint();
      this.M__HP.clearTint();
    }
  }

  playerMove(){
    this.playerImg.x+=10;
  }
  monsterMove(){
    this.monsterImg.x-=10;
  }

  onEvent() {
    //fight with turn
    let lefthand = Math.floor(Math.random()*99);
    if (this.turn == 'p') {

      if(isClear){
        this.stageClear(false);
        this.fightEvent.remove(false);
        this.playerImg.setVisible(false);
        this.monsterImg.setVisible(false);
        this.stageplate.setVisible(false);
        this.STAGE__text.setVisible(false);
        this.playerHP = 0;
        isClear = false;
      }else{

        this.tweens.add({
          targets: this.playerImg,
          x: gameWidth*0.6,
          duration: 75,
          ease: 'Power2',
          yoyo: true,
          delay: 0
        });
        this.tweens.add({
          targets: this.monsterImg,
          x: gameWidth*0.83,
          duration: 75,
          ease: 'Power2',
          yoyo: true,
          delay: 0
        });
        let pAttack__sound = this.sound.add('pattack',{
          volume: 0.5
        });
        pAttack__sound.play();

        if(equip.weapon.SPECIAL == 'DAttack' && lefthand<10){
          this.monster.HP -= player.ATK;
          console.log('DoubleAttack!');
        }else if(equip.weapon.SPECIAL == 'GetHP' && lefthand<50){
          if(this.playerHP + 2 > player.HP){
            this.playerHP = player.HP;
          }else{
            this.playerHP += 2;
          }
          this.HP.setText(this.playerHP).setTintFill(0x00ff00);
          console.log('GetHP +2');
        }

        this.monster.HP -= player.ATK;
        if(this.monster.SPECIAL == 'Block' && lefthand<10){
          if(this.monster.HP + 2 > this.monsterHP){
            this.monster.HP = this.monsterHP;
          }else{
            this.monster.HP += 2;
          }
        }else if(this.monster.SPECIAL == 'Evade' && lefthand<10){
          this.monster.HP += player.ATK;
        }

        if (this.monster.HP<=0) {
          if(level%4 == 0){
            isItem = true;
          }else{
            isStat = true;
          }
          this.monster.HP = 0;
        }
        this.M__HP.setText(this.monster.HP).setTintFill(0xff0000);


        this.turn = 'm';
      }
    } else {
      if(isStat){
        this.stageClear(true);
        this.fightEvent.remove(false);
        this.playerImg.setVisible(false);
        this.monsterImg.setVisible(false);
        this.stageplate.setVisible(false);
        this.STAGE__text.setVisible(false);
        isStat = false;
      }else if(isItem){
        level++;
        stage++;
        small_stage++;
        if(small_stage==5){
          small_stage=1;
        }
        this.playerHP = player.HP;
        player.T_HP = true;
        this.scene.start('second');
        this.fightEvent.remove(false);
        isItem = false;
      }else{
        this.tweens.add({
          targets: this.monsterImg,
          x: gameWidth*0.4,
          duration: 75,
          ease: 'Power2',
          yoyo: true,
          delay: 10
        });

        this.tweens.add({
          targets: this.playerImg,
          x: gameWidth*0.17,
          duration: 75,
          ease: 'Power2',
          yoyo: true,
          delay: 10
        });

        if(level%4 == 0){
          let mAttack__sound = this.sound.add('mattack2',{
            volume: 0.5
          });
          mAttack__sound.play();
        }else{
          let mAttack__sound = this.sound.add('mattack1',{
            volume: 2
          });
          mAttack__sound.play();
        }

        if(equip.armor.SPECIAL == 'Block' && lefthand<50){
          if(this.playerHP + 2 > player.HP){
            this.playerHP = player.HP;
          }else{
            this.playerHP += 2;
          }
          console.log('Block!');
        }else if(equip.armor.SPECIAL == 'Evade' && lefthand<20){
          this.playerHP += this.monster.ATK;
          console.log('Evade!');
        }

        this.playerHP -= this.monster.ATK;
        if(this.monster.SPECIAL == 'DAttack' && lefthand<10){
          this.playerHP -= this.monster.ATK;
        }else if(this.monster.SPECIAL == 'GetHP' && lefthand<10){
          if(this.monster.HP + 2 > this.monsterHP){
            this.monster.HP = this.monsteHP;
          }else{
            this.monster.HP += 2;
          }
        }

        if (this.playerHP<=0) {
          isClear = true;
          this.playerHP = 0;
        }
        this.HP.setText(this.playerHP).setTintFill(0xff0000);
        this.turn = 'p';
      }
    }
  }


  statRandom(){
    let ATK__status = 0;
    let HP__status = 0;
    let ranStatus = Math.floor(Math.random()*3);

//=================================================STATUS======================================================

    if(ranStatus==0){
      ATK__status = Math.floor(Math.random()*2)+stage;
    }
    else if(ranStatus==1){
      HP__status = Math.floor(Math.random()*3)+1+stage;
    }
    else if(ranStatus==2){
      HP__status = Math.floor(Math.random()*2)+1+stage;
      ATK__status = Math.floor(Math.random()*1)+stage;
    }
    let status = {
      HP: HP__status,
      ATK: ATK__status,
      random: ranStatus
    }

    return status;
  }

  createStatus(x,y,status){
    let statusBox = this.add.container(x,y).setSize(gameWidth*0.5,gameHeight*0.4);
    let imgBg = this.add.image(0, 0, 'plate').setDisplaySize(statusBox.width,statusBox.height);
    let hp__img = this.add.image(-statusBox.width*0.3, statusBox.height*0.32,'HP').setDisplaySize(statusBox.height*0.13,statusBox.height*0.13);
    let hp__text = this.add.text(-statusBox.width*0.2, statusBox.height*0.255, status.HP , {fontSize : statusBox.height*0.1, fontFamily:'font1'});
    let atk__img = this.add.image(statusBox.width*0.1, statusBox.height*0.32,'ATK').setDisplaySize(statusBox.height*0.13,statusBox.height*0.13);
    let atk__text = this.add.text(statusBox.width*0.22, statusBox.height*0.255, status.ATK , {fontSize : statusBox.height*0.1, fontFamily:'font1'});
    let potion__img = this.add.image(0,-statusBox.height*0.1,'potion'+status.random).setDisplaySize(statusBox.width*0.7,statusBox.width*0.7);

    statusBox.setName('status').setInteractive();
    statusBox.setData({hp: status.HP, atk: status.ATK });

    statusBox.add([imgBg, hp__img, hp__text, atk__img, atk__text, potion__img]);

    return statusBox;
  }
  //show ui when stage clear or fail
  stageClear(clear) {
    if (clear) {
      this.createStatus(gameWidth/4, gameHeight*0.3, this.statRandom());
      this.createStatus(gameWidth/4*3, gameHeight*0.3, this.statRandom());
      this.createStatus(gameWidth/4, gameHeight*0.7, this.statRandom());
      this.createStatus(gameWidth/4*3, gameHeight*0.7, this.statRandom());
      this.WIN__img.setVisible(true);
      this.WIN__text.setVisible(true);
      this.SELECT__img.setVisible(true);
      this.SELECT__text.setVisible(true);
    } else {
      console.log('Fail...');
      //storage process
      if (typeof(Storage) !== undefined) {
        //save record
        let dataRank;
        if (localStorage.rank) { dataRank = JSON.parse(localStorage.rank); }
        let saveRank = { 'stage': stage, 'level': level };
        if (dataRank != undefined) {
          if (dataRank.length > 10) {
            localStorage.clear();
            dataRank = [];
          }
          dataRank.push(saveRank);
          dataRank.sort( function(a,b) {
            let diffStage = a.stage - b.stage;
            if (diffStage != 0) { return diffStage; }
            else {
              let diffLevel = a.level - b.level;
              if (diffLevel != 0) { return diffLevel; }
              return ;
            }
          });
          localStorage.rank = JSON.stringify(dataRank.reverse());
          console.log(dataRank);
        } else {
          let arrRank = [];
          arrRank.push(saveRank);
          localStorage.rank = JSON.stringify(arrRank);
        }

        //add coin
        let dataCoin;
        if (localStorage.coin) { dataCoin = JSON.parse(localStorage.coin); }
        else { dataCoin = 0; }
        localStorage.coin = dataCoin + level;

      } else {
        console.log("Can't save record: No Web Storage support..");
      }

      //create lose interface
      let container = this.add.container(gameWidth*0.5, gameHeight*0.5).setSize(gameWidth*0.7, gameHeight*0.5);
      let imgBg = this.add.image(0, 0, 'bg_gameover').setDisplaySize(container.width,container.height);
      let txtScore = this.add.text(0, container.height*0.1, "< "+stage+" - "+small_stage+" >", { fontSize: container.height*0.06, fontStyle: 'bold', fill: '#000' , fontFamily:'font1'});
      txtScore.x = -txtScore.width/2;
      let txtCoin = this.add.text(0, txtScore.y+txtScore.height, ""+level, { fontSize: container.height*0.06, fontStyle: 'bold', fill: '#000' , fontFamily:'font1'}).setPadding({ top: txtScore.height*0.2 });
      let imgCoin = this.add.image(0, txtCoin.y+txtCoin.height/2, 'nav_coin').setDisplaySize(txtCoin.height*1.5, txtCoin.height);
      txtCoin.x = -txtCoin.width/2 + imgCoin.displayWidth/2;
      imgCoin.x = txtCoin.x - imgCoin.displayWidth/2;

      let btnReplay = this.add.image(-container.width*0.23, container.height*0.37, 'button').setDisplaySize(container.width*0.4,container.width*0.2).setInteractive();
      let txtReplay = this.add.text(0, 0, '다시시작', { fontSize: btnReplay.displayHeight/3, fontStyle: 'bold' , fontFamily:'font1'});
      txtReplay.x = btnReplay.x - txtReplay.width/2;
      txtReplay.y = btnReplay.y - txtReplay.height/2;
      let btnExit = this.add.image(container.width*0.23, container.height*0.37, 'button').setDisplaySize(container.width*0.4,container.width*0.2).setInteractive();
      let txtExit = this.add.text(0, 0, '게임종료', { fontSize: btnExit.displayHeight/3, fontStyle: 'bold' , fontFamily:'font1'});
      txtExit.x = btnExit.x - txtExit.width/2;
      txtExit.y = btnExit.y - txtExit.height/2;

      btnReplay.name = 'replay';
      btnExit.name = 'exit';

      container.add([imgBg, txtScore, txtCoin, imgCoin, btnReplay, txtReplay, btnExit, txtExit]);
    }
  }

}

let config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: '#fff',
  scene: [ IntroScene, ChooseCharacterScene, ChooseItemScene, FightScene ]
};

let game = new Phaser.Game(config);
