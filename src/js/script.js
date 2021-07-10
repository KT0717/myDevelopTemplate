// 目標物
{
  /* <ul id="board">
      <li class="pressed"></li>
      <li class="pressed"></li>
      <li class="pressed"></li>
      <li class="pressed"></li>
  </ul> */
}

'use strict';

{

  // ２）
  // Panel クラス
  // コンストラクターを書く
  // 要素（li）をプロパティとして持たせたいので、プロパティ名は、 element の element と
  class Panel {
    constructor() {
      this.element = document.createElement('li');
      this.element.classList.add('pressed');
    }

    getEl() {
      return this.element;
    }
  }

  // １）
  // Boradクラスを作成
  // コンストラクターを書く
  // コンストラクターの処理ですが、パネルを管理したいので、とりあえずプロパティ（this.panels）で配列として持っておきましょう。空の配列を用意
  // パネルを 4 枚作りたいので、ループ、// this.panels に対してあとで作っていく Panel クラスのインスタンスを push()
  // 4 つのパネルをページに追加していく、コンストラクターのほうではそれをsetupメソッドとして呼び出すだけ
  class Board {
    constructor() {
      // ↓check
      // this.paneles = '';
      this.paneles = [];
      for (let i = 0; i < 4; i++) {
        this.paneles.push(new Panel());
      }
      // ↓check
      this.setup();
    }

    setup() {
      const board = document.getElementById('board');
      console.log(this.paneles);
      this.paneles.forEach(panel => {
        console.log(panel);
        console.log(panel.element);
        // board.appendChild(panel.element);
        board.appendChild(panel.getEl());
      });
   }
  }

  // ３）
  // setup() メソッドですが、ますは board 要素を取得しておきます。setup() の中でしか使わないので、プロパティにする必要はなくて const で定数で宣言しておきましょう。
  // そのうえで panels の数だけ要素を追加していけばいいので、 forEach() を使っていきます。ひとつひとつの要素を panel としつつ、 board に対して appendChild() してあげれば OK でしょう。
  // 今回追加するのは li 要素なので、 panel の element プロパティを追加してあげればよいのですけれども、実はクラスのプロパティに外部から直接アクセスしないほうがよいとされているので、こちらのプロパティはメソッド経由で取得するようにしてあげたほうがいいでしょう。
  // では、いったんこちらコメントにしてあげて、 getElement という意味で getEl() というメソッドを Panel クラスのほうにあとで作っていきましょう。

  // インスタンスを作る
  const board = new Board();
}
