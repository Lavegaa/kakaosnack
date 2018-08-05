let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;
let titleWidth = gameWidth/5*4;
let titleHeight = titleWidth;
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
    SPECIAL:''
  },
  armor: {
    ID: undefined,
    PART: "armor",
    HP: 0,
    ATK: 0,
    SPECIAL:''
  },
  status: {
    ID: undefined,
    PART: "status",
    HP: 0,
    ATK: 0,
  },
  init: function() {
    this.weapon = {
      ID: undefined,
      PART: "weapon",
      HP: 0,
      ATK: 0,
      SPECIAL:''
    },
    this.armor = {
      ID: undefined,
      PART: "armor",
      HP: 0,
      ATK: 0,
      SPECIAL:''
    },
    this.status = {
      ID: undefined,
      PART: "status",
      HP: 0,
      ATK: 0,
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
    this.load.image('bg','img/bg_intro.png');
    this.load.image('title','img/title.png');
    this.load.image('button','img/button.png');
  }
  create() {
    //window.addEventListener('resize', resize);
    //resize();

    //set bg & title
    this.add.image(gameWidth/2, gameHeight/2, 'bg').setDisplaySize(gameWidth, gameHeight);
    this.add.image(gameWidth/2, gameHeight/4, 'title').setDisplaySize(titleWidth,titleHeight);

    //create button
    let btnStart = this.add.image(gameWidth/7*2, gameHeight/6*5, 'button').setDisplaySize(gameWidth/3,gameWidth/6).setInteractive();
    btnStart.name = 'start';
    let txtStart = this.add.text(0, 0, '게임시작', { fontSize: btnStart.displayHeight/3, fontStyle: 'bold'});
    txtStart.x = btnStart.x - txtStart.displayWidth/2;
    txtStart.y = btnStart.y - txtStart.displayHeight/2;
    let btnHow = this.add.image(gameWidth/7*5, gameHeight/6*5, 'button').setDisplaySize(gameWidth/3,gameWidth/6).setInteractive();
    btnHow.name = 'how';
    let txtHow = this.add.text(0, 0, '게임방법', { fontSize: btnStart.displayHeight/3, fontStyle: 'bold'});
    txtHow.x = btnHow.x - txtHow.displayWidth/2;
    txtHow.y = btnHow.y - txtHow.displayHeight/2;

    //input handler(buttons)
    this.input.on('gameobjectdown', function(pointer, button) {
      button.setTint(0xf0f0f0);
    });
    this.input.on('gameobjectup', function(pointer, button) {
      button.clearTint();
      switch (button.name) {
        case 'start':
          this.scene.start('first');
          break;
        case 'how':
          player.init();
          break;
      }
    }, this);
  }
}

class ChooseCharacterScene extends Phaser.Scene {
  constructor(config) {
    super({ key: 'first' });
  }
  preload() {
    //load images
    this.load.image('char1','img/character1.png');
    this.load.image('char2','img/character2.png');
    this.load.image('char3','img/character3.png');
    this.load.image('UI','img/status.png');
    this.load.image('left','img/left.png');
    this.load.image('right','img/right.png');
    this.load.image('button', 'img/button.png');
  }
  create() {
    this.input.manager.enabled = true;
    //create character selection
    let imgNav = this.add.image(gameWidth/2, gameHeight/16, 'UI').setDisplaySize(gameWidth, gameHeight/8);
    let txtNav = this.add.text(imgNav.x-imgNav.displayWidth/2,imgNav.y-imgNav.displayHeight/2,'Choose your character', { fontSize: imgNav.displayHeight/3, fill: '#000' }).setPadding({ left: imgNav.displayWidth/20, top: imgNav.displayHeight/10 });

    let now = 0;
    let charList = [
      this.createCharacter(gameWidth/2, gameHeight/16*9, 1, 20, 6),
      this.createCharacter(gameWidth/2, gameHeight/16*9, 2, 17, 8),
      this.createCharacter(gameWidth/2, gameHeight/16*9, 3, 14, 10)
    ];
    charList[1].setVisible(false);
    charList[2].setVisible(false);

    let btnLeft = this.add.image(gameWidth*0.1, gameHeight/16*9, 'left').setDisplaySize(gameWidth*0.2, gameWidth*0.2).setInteractive();
    btnLeft.setName('left');
    let btnRight = this.add.image(gameWidth*0.9, gameHeight/16*9, 'right').setDisplaySize(gameWidth*0.2, gameWidth*0.2).setInteractive();
    btnRight.setName('right');

    this.input.on('gameobjectdown', function(pointer, button) {
      button.setTint(0x505050);
    });
    this.input.on('gameobjectup', function(pointer, button) {
      button.clearTint();
      switch (button.name) {
        case 'left':
          charList[now].setVisible(false);
          if (now == 0) { now = 2; }
          else { now--; }
          charList[now].setVisible(true);
          break;
        case 'right':
          charList[now].setVisible(false);
          if (now == 2) { now = 0; }
          else { now++; }
          charList[now].setVisible(true);
          break;
        default:
          player.ID = button.name;
          player.HP = button.getData('hp');
          player.ATK = button.getData('atk');

          console.log(player);
          //change scene
          this.scene.start('second');
          break;
      }
    }, this);

  }
  createCharacter(x, y, id, hp, atk) {
    let container = this.add.container(x,y).setSize(gameWidth*0.6,gameHeight*0.6).setDepth(id);
    let bg = this.add.image(0, 0, 'UI').setDisplaySize(container.width,container.height);
    let char = this.add.image(0, -container.height*0.2, 'char'+id).setDisplaySize(container.width,container.height*0.6);
    let status = this.add.image(0, container.height*0.2, 'UI').setDisplaySize(container.width*0.8, container.height*0.2);
    let txtStatus = this.add.text(-status.displayWidth/2, status.y-status.displayHeight/2, [
      'HP: ' + hp,
      'ATK: ' + atk
    ], { fontSize: 12, fontStyle: 'bold', padding: 8 });

    let btnSelect = this.add.image(0, container.height*0.38, 'button').setDisplaySize(container.width/3,container.width/6).setInteractive();
    let txtSelect = this.add.text(0, 0, '선택', { fontSize: btnSelect.displayHeight/3, fontStyle: 'bold'});
    txtSelect.x = btnSelect.x - txtSelect.displayWidth/2;
    txtSelect.y = btnSelect.y - txtSelect.displayHeight/2;

    btnSelect.setName(id);
    btnSelect.setData({ hp: hp, atk: atk });

    container.add([bg, char, status, txtStatus, btnSelect, txtSelect]);

    return container;
  }
}

class ChooseItemScene extends Phaser.Scene {
  constructor() {
    super( { key: 'second' } );
  }
  preload() {
    //load images
    this.load.image('char1','img/character1.png');
    this.load.image('char2','img/character2.png');
    this.load.image('char3','img/character3.png');
    this.load.image('UI','img/status.png');
    this.load.image('inventory','img/inventory.png');
    this.load.image('armor1','img/armor1.png');
    this.load.image('armor2','img/armor2.png');
    this.load.image('armor3','img/armor3.png');
    this.load.image('armor4','img/armor4.png');
    this.load.image('armor5','img/armor5.png');
    this.load.image('armor6','img/armor6.png');
    this.load.image('armor7','img/armor7.png');
    this.load.image('armor8','img/armor8.png');
    this.load.image('armor9','img/armor9.png');
    this.load.image('armor10','img/armor10.png');
    this.load.image('armor11','img/armor11.png');
    this.load.image('weapon1','img/weapon1.png');
    this.load.image('weapon2','img/weapon2.png');
    this.load.image('weapon3','img/weapon3.png');
    this.load.image('weapon4','img/weapon4.png');
    this.load.image('weapon5','img/weapon5.png');
    this.load.image('weapon6','img/weapon6.png');
    this.load.image('weapon7','img/weapon7.png');
    this.load.image('weapon8','img/weapon8.png');
    this.load.image('weapon9','img/weapon9.png');
    this.load.image('weapon10','img/weapon10.png');
    this.load.image('weapon11','img/weapon11.png');
    this.load.image('select','img/select.png')
    this.load.image('blank','img/blank.png');


    this.load.audio('bell',['sound/bell.wav']);
    this.load.audio('chooseitem',['sound/chooseitem.wav']);

  }
  create() {

    let bell = this.sound.add('bell',{
      volume: 0.5
    });
    bell.play();

    let chooseitem = this.sound.add('chooseitem',{
      volume: 0.5
    });
    chooseitem.play({loop:true});


    let nav = this.add.container(gameWidth/2,gameHeight*0.05).setSize(gameWidth,gameHeight*0.1);
    let imgNavbg = this.add.image(0, 0, 'UI').setDisplaySize(nav.width, nav.height);
    let txtNav = this.add.text(0, 0,'아이탬을 고르세요', { fontSize: nav.height*0.3, fill: '#000' }).setPadding({ left: nav.width/20 });
    txtNav.x = -nav.width/2;
    txtNav.y = -txtNav.height/2 - nav.height/6;
    let txtNow = this.add.text(0, 0,'level: '+level+' stage : '+stage, { fontSize: nav.height*0.3, fill: '#000' }).setPadding({ left: nav.width/20 });
    txtNow.x = -nav.width/2;
    txtNow.y = -txtNow.height/2 + nav.height/6;
    nav.add([imgNavbg,txtNav,txtNow]);
    //show chosen character & recent status
    let container = this.add.container(gameWidth/2,gameHeight*0.85).setSize(gameWidth,gameHeight*0.3);
    let imgBg = this.add.image(0,0,'UI').setDisplaySize(container.width, container.height);
    let imgChar = this.add.image(-container.width*0.35, 0,  'char'+player.ID).setDisplaySize(container.height,container.height);
    let imgWeaponBg = this.add.image(-container.width*0.025, -container.height*0.2, 'inventory').setDisplaySize(container.height*0.5, container.height*0.5);
    let imgArmorBg = this.add.image(container.width*0.325, -container.height*0.2, 'inventory').setDisplaySize(container.height*0.5, container.height*0.5);
    let imgWeapon, imgArmor;
    if (equip.weapon.ID != undefined) {
      imgWeapon = this.add.image(-container.width*0.025, -container.height*0.2, 'weapon'+equip.weapon.ID).setDisplaySize(container.height*0.5, container.height*0.5);
    } else {
      imgWeapon = this.add.image(-container.width*0.025, -container.height*0.2, 'blank').setDisplaySize(container.height*0.5, container.height*0.5);
    }
    if (equip.armor.ID != undefined) {
      imgArmor = this.add.image(container.width*0.325, -container.height*0.2, 'armor'+equip.armor.ID).setDisplaySize(container.height*0.5, container.height*0.5);
    } else {
      imgArmor = this.add.image(430, 250, 'blank').setDisplaySize(container.height*0.5, container.height*0.5);
    }
    let imgStatusBg = this.add.image(container.width*0.15, container.height*0.3, 'UI').setDisplaySize(container.width*0.7,container.height*0.4);
    let playerStatus = {
      HP: this.add.text(imgStatusBg.x-imgStatusBg.displayWidth/2, imgStatusBg.y-imgStatusBg.displayHeight/2, 'HP: '+player.HP, { fontSize: imgStatusBg.displayHeight/4, fontStyle: 'bold' }).setPadding({ left: 8, top: 8 }),
      ATK: this.add.text(imgStatusBg.x-imgStatusBg.displayWidth/2, imgStatusBg.y-imgStatusBg.displayHeight/4, 'ATK: '+player.ATK, { fontSize: imgStatusBg.displayHeight/4, fontStyle: 'bold' }).setPadding({ left: 8, top: 8 })
    }
    container.add([imgBg,imgChar,imgWeaponBg,imgWeapon,imgArmorBg,imgArmor,imgStatusBg, playerStatus.HP, playerStatus.ATK]);

    //create item selection
    let itemList = [
      this.createItem(gameWidth/4, gameHeight*0.25, this.setRandom()),
      this.createItem(gameWidth/4*3, gameHeight*0.25, this.setRandom()),
      this.createItem(gameWidth/4, gameHeight*0.55, this.setRandom()),
      this.createItem(gameWidth/4*3, gameHeight*0.55, this.setRandom())
    ];

    this.input.on('gameobjectdown', function(pointer, gameObject) {
      if (gameObject.name == 'conPick') {
        //call data variable
        let itemPART = gameObject.getByName('btnPick').getData('part');
        let itemHP = gameObject.getByName('btnPick').getData('hp');
        let itemATK = gameObject.getByName('btnPick').getData('atk');

        //initialize player status text
        playerStatus.HP.setText('HP: ' + player.HP).clearTint();
        playerStatus.ATK.setText('ATK: ' + player.ATK).clearTint();

        //show status change
        if (itemPART=='weapon') {
          playerStatus.HP.setText('HP: ' + (player.HP-equip.weapon.HP+itemHP));
          playerStatus.ATK.setText('ATK: ' + (player.ATK-equip.weapon.ATK+itemATK));

          if (equip.weapon.HP<itemHP) {
            playerStatus.HP.setTintFill(0x00ff00);
          } else if (equip.weapon.HP>itemHP) {
            playerStatus.HP.setTintFill(0xff0000);
          }
          if (equip.weapon.ATK<itemATK) {
            playerStatus.ATK.setTintFill(0x00ff00);
          } else if (equip.weapon.ATK>itemATK) {
            playerStatus.ATK.setTintFill(0xff0000);
          }
        } else if (itemPART=='armor') {
          playerStatus.HP.setText('HP: ' +  (player.HP-equip.armor.HP+itemHP));
          playerStatus.ATK.setText('ATK: ' + (player.ATK-equip.armor.ATK+itemATK));

          if (equip.armor.HP<itemHP) {
            playerStatus.HP.setTintFill(0x00ff00);
          } else if (equip.armor.HP>itemHP) {
            playerStatus.HP.setTintFill(0xff0000);
          }
          if (equip.armor.ATK<itemATK) {
            playerStatus.ATK.setTintFill(0x00ff00);
          } else if (equip.armor.ATK>itemATK) {
            playerStatus.ATK.setTintFill(0xff0000);
          }
        }
      } else {
        //set button tint
        gameObject.setTint(0x606060);
      }
    }, this);
    this.input.on('gameobjectup', function(pointer, gameObject) {
      if (gameObject.name == 'conPick') {
        if (gameObject.getData('pick')) {
          gameObject.setData('pick',false);
          //hide button and show item image
          gameObject.getByName('btnPick').setVisible(false);
          gameObject.getByName('txtPick').setVisible(false);
          gameObject.getByName('imgItem').setVisible(true);

          playerStatus.HP.setText('HP: ' + player.HP).clearTint();
          playerStatus.ATK.setText('ATK: ' + player.ATK).clearTint();

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

      } else {
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

  createItem(x, y, item) {
    let container = this.add.container(x,y).setSize(gameWidth*0.5,gameHeight*0.3);
    let imgBg = this.add.image(0, 0, 'UI').setDisplaySize(container.width,container.height);
    let imgItem;
    if(itemNum<3 && itemNum!=0){
       imgItem = this.add.image(0, -container.height*0.2, 'weapon'+item.ID).setDisplaySize(container.height*0.6,container.height*0.6).setName('imgItem');
    }else{
       imgItem = this.add.image(0, -container.height*0.2, 'armor'+item.ID).setDisplaySize(container.height*0.6,container.height*0.6).setName('imgItem');
    }
    let imgStatusBg = this.add.image(0, container.height*0.3, 'UI').setDisplaySize(container.width, container.height*0.4);
    let txtStatus = this.add.text(-imgStatusBg.displayWidth/2, 0, [
      'PART: ' + item.PART,
      'HP: ' + item.HP,
      'ATK: ' + item.ATK,
      'SPECIAL: ' + item.SPECIAL
    ], { fontSize: imgStatusBg.displayHeight/4, fontStyle: 'bold' }).setPadding({ left: 8 });
    txtStatus.y = imgStatusBg.y - txtStatus.height/2;

    let btnSelect = this.add.image(0, -container.height*0.2, 'button').setDisplaySize(container.width/2,container.width/4).setInteractive();
    btnSelect.setName('btnPick').setVisible(false);
    btnSelect.setData({ id: item.ID, part: item.PART, hp: item.HP, atk: item.ATK, special: item.SPECIAL });
    let txtSelect = this.add.text(0, 0, '선택', { fontSize: btnSelect.displayHeight/3, fontStyle: 'bold'});
    txtSelect.x = btnSelect.x - txtSelect.displayWidth/2;
    txtSelect.y = btnSelect.y - txtSelect.displayHeight/2;
    txtSelect.setName('txtPick').setVisible(false);

    container.add([imgBg, imgItem, imgStatusBg, txtStatus, btnSelect, txtSelect]);
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

  preload() {
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
    this.load.image('ATK','img/ATK.png');
    this.load.image('HP','img/HP.png');
    this.load.image('boss1','img/ryan1.png');
    this.load.image('boss2','img/ryan2.png');
    this.load.image('boss3','img/ryan3.png');
    this.load.image('boss4','img/ryan4.png');
    this.load.image('UI', 'img/status.png');
    this.load.image('inventory', 'img/inventory.png');
    this.load.image('Wequip', 'img/weapon'+equip.weapon.ID+'.png');
    this.load.image('Aequip', 'img/weapon'+equip.armor.ID+'.png');
    this.load.image('blank','img/blank.png');
    this.load.image('win', 'img/win.png');
    this.load.image('lose', 'img/lose.png');
    this.load.image('button', 'img/button.png');
    this.load.image('background','img/background.png');
    this.load.image('plate','img/plate.png');
    this.load.image('GetHP','img/GetHP.png');
    this.load.image('Block','img/Block.png');
    this.load.image('Dattack','img/Dattack.png');
    this.load.image('Evade','img/Evade.png');
    this.load.image('potion0','img/potion0.png');
    this.load.image('potion1','img/potion1.png');
    this.load.image('potion2','img/potion2.png');
    this.load.image('stageplate','img/stageplate.png');

    this.load.audio('pattack',['sound/pattack.wav']);
    this.load.audio('mattack1',['sound/mattack1.wav']);
    this.load.audio('mattack2',['sound/mattack2.wav']);
    this.load.audio('fight',['sound/fight.wav']);

  }

  create() {
    //create container
    
    let bgm = this.sound.add('fight',{
      volume: 0.5
    });
    bgm.play({loop:true});

    let playerBox = this.add.container(gameWidth/2,gameHeight*0.95).setSize(gameWidth,gameHeight*0.1);
    //view status
    if(player.T_HP){
      this.playerHP = player.HP;
      player.T_HP = false;
    }
    
    let playerbg = this.add.image(0, 0, 'background').setDisplaySize(playerBox.width, playerBox.height);
    this.HP = this.add.text(-playerBox.width*0.2,-playerBox.height*0.17, this.playerHP, { fontSize: playerBox.displayHeight*0.36, fill: '#000' });
    let CHEAD__img = this.add.image(-playerBox.width*0.4 ,0,'head'+player.ID).setDisplaySize(playerBox.height*0.8,playerBox.height*0.8);
    let HP__img = this.add.image(-playerBox.width*0.25, 0,'HP').setDisplaySize(playerBox.height*0.5,playerBox.height*0.5);
    let ATK = this.add.text(playerBox.width*0.05, -playerBox.height*0.17, player.ATK, { fontSize: playerBox.displayHeight*0.36, fill: '#000' });
    let ATK__img = this.add.image(0 ,0,'ATK').setDisplaySize(playerBox.height*0.5,playerBox.height*0.5);
    let DATK__img = this.add.image(playerBox.width*0.3 ,0,'Dattack').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    let GATK__img = this.add.image(playerBox.width*0.3 ,0,'GetHP').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    let BARMOR__img = this.add.image(playerBox.width*0.4 ,0,'Block').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    let EARMOR__img = this.add.image(playerBox.width*0.4 ,0,'Evade').setDisplaySize(playerBox.height*0.7,playerBox.height*0.7).setVisible(false);
    this.WIN__text = this.add.text(0, -playerBox.height*0.2 ,'W    I    N',{fontSize:playerBox.height*0.4}).setVisible(false);    
    this.WIN__img = this.add.image(0, 0, 'background').setDisplaySize(playerBox.width, playerBox.height).setVisible(false);
    this.WIN__text.x = this.WIN__img.x - this.WIN__text.width/2;
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
    this.STAGE__text = this.add.text(gameWidth*0.045,gameHeight*0.145,stage+'-'+small_stage,{fontSize:gameHeight*0.05, fill:'#000'});

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
    this.M__HP = this.add.text(-monsterBox.width*0.2, -monsterBox.height*0.17,this.monster.HP, { fontSize:monsterBox.displayHeight*0.36 , fill: '#000' });
    let MATK__img = this.add.image(0, 0,'ATK').setDisplaySize(monsterBox.height*0.5,monsterBox.height*0.5);
    let M__ATK = this.add.text(monsterBox.width*0.05, -monsterBox.height*0.17, this.monster.ATK, { fontSize: monsterBox.displayHeight*0.36, fill: '#000' });
    let MDATK__img = this.add.image(monsterBox.width*0.25 ,0,'Dattack').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    let MGATK__img = this.add.image(monsterBox.width*0.25 ,0,'GetHP').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    let MBARMOR__img = this.add.image(monsterBox.width*0.4 ,0,'Block').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    let MEARMOR__img = this.add.image(monsterBox.width*0.4 ,0,'Evade').setDisplaySize(monsterBox.height*0.7,monsterBox.height*0.7).setVisible(false);
    this.SELECT__text = this.add.text(-monsterBox.width*0.3,-monsterBox.height*0.2,'스텟을 골라주세요',{fontSize:monsterBox.height*0.4}).setVisible(false);
    this.SELECT__img = this.add.image(0, 0, 'background').setDisplaySize(monsterBox.width, monsterBox.height).setVisible(false);
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
      bgm.stop();
      switch (button.name) {
        case 'replay':
          player.init();
          equip.init();
          level = 1;
          stage = 1;
          small_stage = 1;
          isStat = false;
          this.scene.start('first');
          break;
        case 'exit':
          player.init();
          equip.init();
          level = 1;
          stage = 1;
          small_stage = 1;
          isStat = false;
          this.scene.start('intro');
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
    let hp__text = this.add.text(-statusBox.width*0.2, statusBox.height*0.27, status.HP , {fontSize : statusBox.height*0.1});
    let atk__img = this.add.image(statusBox.width*0.1, statusBox.height*0.32,'ATK').setDisplaySize(statusBox.height*0.13,statusBox.height*0.13);
    let atk__text = this.add.text(statusBox.width*0.22, statusBox.height*0.27, status.ATK , {fontSize : statusBox.height*0.1});
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
      let container = this.add.container(gameWidth*0.6, gameHeight/2).setSize(gameWidth/2, gameHeight/2);
      let imgBg = this.add.image(0, 0, 'UI').setDisplaySize(container.width,container.height);
      let imgLose = this.add.image(0, -container.height*0.3, 'lose').setDisplaySize(container.width,container.height*0.6);
      let btnReplay = this.add.image(-container.width*0.2, container.height*0.3, 'button').setDisplaySize(container.width*0.3,container.width*0.15).setInteractive();
      let txtReplay = this.add.text(0, 0, '다시시작', { fontSize: btnReplay.displayHeight/3, fontStyle: 'bold' });
      txtReplay.x = btnReplay.x - txtReplay.width/2;
      txtReplay.y = btnReplay.y - txtReplay.height/2;
      let btnExit = this.add.image(container.width*0.2, container.height*0.3, 'button').setDisplaySize(container.width*0.3,container.width*0.15).setInteractive();;
      let txtExit = this.add.text(0, 0, '게임종료', { fontSize: btnExit.displayHeight/3, fontStyle: 'bold' });
      txtExit.x = btnExit.x - txtExit.width/2;
      txtExit.y = btnExit.y - txtExit.height/2;

      btnReplay.name = 'replay';
      btnExit.name = 'exit';

      container.add([imgBg, imgLose, btnReplay, txtReplay, btnExit, txtExit]);
    }
  }

}

let config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  backgroundColor: '#fff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [ IntroScene, ChooseCharacterScene, ChooseItemScene, FightScene ]
};

let game = new Phaser.Game(config);