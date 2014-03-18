# grunt-psdslicer

> grunt-psdslicerは、Photoshopファイル(.psd)をパースし、ユーザスライス情報を取得します。読み取ったスライス情報は、Mustache形式のテンプレートから参照され、各スライスの座標やサイズ等の値が代入された状態の別ファイルを生成します。昨今のWeb開発では、compass等を利用し画像を自動的にスプライトシート化するスタイルが主流になりつつあるようですが、このプラグインの場合は、専用のpsdファイルを用意し、そこからスプライトシートを書き出すような開発スタイルに、便利に使えるのではないかと思い作成しました。

## はじめに
Grunt `~0.4.0`が必要です。

[Grunt](http://gruntjs.com/)の使用経験がない場合は, [Getting Started](http://gruntjs.com/getting-started) ガイドをご覧ください。[Gruntfile](http://gruntjs.com/sample-gruntfile) の作成方法や、Gruntプラグインのインストール方法について説明されています。Gruntに馴染んできたら、以下のコマンドを実行し、このプラグインをインストールしてみてください。:

```js
npm install grunt-psdslicer --save-dev
```

インストールしたプラグインは、次のようなJavaScriptでGruntfile内で利用することができます。:

```js
grunt.loadNpmTasks('grunt-psdslicer');
```

## Grunt-psdslicerタスク

### 概要
プロジェクトのGruntfile内にて`grunt.initConfig()`に渡されるデータオブジェクトに対し、`grunt-psdslicer`という名前のセクションを追加します。

```js
grunt.initConfig({
  psdslicer: {
    taskNama: {
      psd:      // [ psdファイルのパス（複数指定可能）],
      template: // Mustache形式のテンプレートファイルのパス,  
      dest:     // 生成するファイルのパス  
    }
  },
})
```

### 設定例

```js
grunt.initConfig({
  psdslicer: {
    myTask: {
      psd: [ 'src/psd/psd_01.psd', 'src/psd/psd_02.psd' ],  
      template: 'src/template/template.css',
      dest: 'src/css/main.css'  
    }  
  }  
})  
```

### 謝辞

psd-slicerはmovableinkさんの [The PSD.js](https://github.com/movableink/psd.js) nodeモジュールを利用し、psdファイルのパースをしています。

### Mustacheテンプレート

テンプレートファイルは[mustache](http://mustache.github.io/)にてパースされます。スライス情報は、以下のようにpsdファイル名、スライス名、プロパティ名を.（ドット）で連結した上で、{{ と }} に挟む形で取得できます。

例） {{ myPsdName.mySlice.width }}

スライス情報には以下が含まれています:

- `width` 
psd内のスライスの幅

- `height`
psd内のスライスの高さ

- `x`
psd内のスライスのx座標

- `y`
psd内のスライスのy座標


## To Do
- テンプレートの上書き（別ファイルを生成しない）
- テストケースの作成
