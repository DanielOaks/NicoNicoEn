// ==UserScript==
// @name		 NicoNicoEn
// @description  NicoNico, in English!
// @version      1.2
// @include	     http://www.nicovideo.jp/*
// @include      http://seiga.nicovideo.jp/*
// @include	     http://live.nicovideo.jp/*
// @include	     http://ch.nicovideo.jp/*
// @include	     https://secure.nicovideo.jp/*
// ==/UserScript==

/*** 
**** Prevents navigation from using onclick to load new
**** pages dynamically, and screwing up translation
**** Also, UGLY HACK TIME!
***/
for (var i = 0; i < document.links.length; i++) {
	if(document.links[i].href.split('/')[3] == 'top') {
		document.links[i].removeAttribute('onclick')
	}
	if(document.links[i].href == 'http://www.nicovideo.jp/?g=') {
		document.links[i].removeAttribute('onclick')
		document.links[i].href = 'http://www.nicovideo.jp/top/'
	}
}

/***
**** Page Modification
**** Required Objects and Functions
***/
function addGlobalStyle(css) {
		var head, style
		head = document.getElementsByTagName('head')[0]
		if (!head) { return; }
		style = document.createElement('style')
		style.type = 'text/css'
		style.innerHTML = css
		head.appendChild(style)
}

var trans = {
	words_so: [], //single old
	words_sn: [], //single new
	words_go: [], //global old
	words_gn: [], //global new
	
	add: function (mode, t_old, t_new) {
		if(mode == 's') {
			this.words_so.push(t_old)
			this.words_sn.push(t_new)
		}
		else if(mode == 'g') {
			this.words_go.push(t_old)
			this.words_gn.push(t_new)
		}
	},
	clear: function () {
		this.words_so.length = 0; //single old
		this.words_sn.length = 0; //single new
		this.words_go.length = 0; //global old
		this.words_gn.length = 0; //global new
	},
	translate: function (target) {
		if(typeof target == 'string') {
			return 0
		}
		
		// Grab html
		html = target.innerHTML

		// Replace words in html
		for(var i = 0; i < this.words_so.length; i++) {
			html = html.replace(new RegExp(this.words_so[i]), this.words_sn[i])
		}
		for(var i = 0; i < this.words_go.length; i++) {
			html = html.replace(new RegExp(this.words_go[i], 'g'), this.words_gn[i])
		}

		// Shove html
		target.innerHTML = html

		this.clear() // because yeah
	}
}


/***
**** Bar Translation
**** Since they all use more-or-less the same bar
***/
{
	target = ''
	
	/*** NicoNicoGeneral
	***/
	trans.add('s', 'ニコニコTOP', 'NicoNico')
	
	// Links
	trans.add('s', '動画', 'Videos')
	trans.add('s', '静画', 'Images')
	trans.add('s', '生放送', 'Broadcasts')

	// Menu
	trans.add('s', 'その他', 'More')
	
	trans.add('s', 'チャンネル', 'Channels')
	trans.add('s', '市場', 'Shop')
	trans.add('s', '実況', 'Live TV')
	trans.add('s', 'コミュ二ティ', 'Community')
	trans.add('s', 'ニコニコ直販', 'Anime Store')
	trans.add('s', 'ニコゲー', 'Games')
	trans.add('s', 'ニュース', 'News')
	
	trans.add('s', '大百科', 'Guide')
	trans.add('s', 'ニコニ広告', 'NicoAds')
	trans.add('s', 'コモンズ', 'Commons')
	trans.add('s', 'ニコニコDVD', 'DVD Rental')
	trans.add('s', '遊園地', 'Park')
	trans.add('s', 'モバイル', 'Mobile')

	// Welcome Guest
	trans.add('s', 'ようこそ ゲスト さん', 'Welcome, Guest')
	trans.add('s', 'ようこそゲスト', 'Welcome, Guest'); //seiga
	trans.add('s', 'ログイン', 'Login/Register')
	
	// Welcome Regular Member
	trans.add('s', 'プレミアム登録', 'Upgrade')
	trans.add('s', '一般会員', 'Regular Member - ')
	//othermembertypes?
	
	// Welcome Everyone-san
	trans.add('s', 'さん', '')

	// Overall Ranking - Head Site
	trans.add('s', '総合ランキング', 'Overall Ranking')
	
	/*** NicoNicoDouga
	***/
	if(window.location.hostname == 'www.nicovideo.jp') {
		target = window.document.body.childNodes[1]

		// Links
		trans.add('s', 'マイページ', 'My Panel')
		trans.add('s', '動画を投稿', 'Post Video')
		trans.add('s', 'ランキング', 'Ranking')
		
		//Menu
		trans.add('s', 'メニュー', 'Menu')
		trans.add('s', 'マイリスト', 'My List')
		trans.add('s', 'ウオッチリスト', 'My Watchlist')
		trans.add('s', '投稿動画', 'My Videos')
		trans.add('s', '視聴履歴', 'History')
		trans.add('s', 'アカウント設定', 'Edit Profile')
		trans.add('s', 'ヘルプ', 'Help')
		trans.add('s', 'ログアウト', 'Logout')
	}
	
	/*** NicoNicoSeiga
	***/
	if(window.location.hostname == 'seiga.nicovideo.jp') {
		target = window.document.body.childNodes[1].childNodes[1]

		// Links
		trans.add('s', 'ニコニコ動画のマイページに移動します', 'My Panel');//title attribute
		trans.add('s', 'マイページ', 'My Panel')
		trans.add('s', 'ランキング', 'Ranking')
		
		//Menu
		trans.add('s', 'メニュー', 'Menu')
		
		trans.add('s', 'イラスト', 'Illustrations')
		trans.add('s', 'イラスト一覧', 'View')
		trans.add('s', 'イラスト投稿', 'Create')
		trans.add('s', 'ランキング', 'Ranking')
		trans.add('s', '公開クリップ一覧', 'List Clips')
		
		trans.add('s', 'お題', 'Themes')
		trans.add('s', 'お題一覧', 'View')
		trans.add('s', 'お題投稿', 'Create')

		trans.add('s', 'イベント', 'Events')
		trans.add('s', '開催中のイベント', 'Current')
		trans.add('s', '過去のイベント', 'Past')
		
		trans.add('s', 'マイページ', 'Profile')
		trans.add('s', 'クリップ', 'Clips')
		trans.add('s', '投稿画像一覧', 'Images')
		trans.add('s', '視聴履歴', 'History')
		trans.add('s', 'ログアウト', 'Logout')
	}
	
	/*** NicoNicoLive
	***/
	if(window.location.hostname == 'live.nicovideo.jp') {
		target = window.document.body.childNodes[1]
		
		//Menu
		trans.add('s', 'メニュー', 'Menu')
		
		trans.add('g', '一般', 'General')
		trans.add('g', 'やってみた', 'Doing')
		trans.add('g', 'ゲーム', 'Live')
		trans.add('g', '動画紹介', 'Req')
		trans.add('g', '顔出し', 'Face')
		trans.add('g', '凸待ち', 'Totu')
		trans.add('g', '遊園地', 'Park')
		trans.add('s', 'ニコニコ実況のチャンネル一覧を表示します', 'View Recently Online Channels')
		trans.add('s', '実況', 'Recent Channels')
		
		trans.add('s', 'ニコニコ生放送のマイページへ移動します', 'Head to My Panel')
		trans.add('g', 'マイページ', 'My Panel'); //why 'g'?
		trans.add('s', 'ユーザー生放送番組作成ページに移動します', 'Create a Live Stream!')
		trans.add('s', '放送する', 'Create Stream')
		trans.add('s', '現在出航中のニコ生クルーズへ移動します', 'Head to Cruise!')
		trans.add('s', 'ニコ生クルーズ', 'Cruise')
		trans.add('s', '現在放送中の世界の新着動画へ移動します', 'Video being Broadcast around the Globe, Live!')
		trans.add('s', '世界の新着動画', 'New World')
		trans.add('s', 'タイムシフト予約ランキングを表示します', 'View Current Rankings')
		trans.add('s', '注目の番組ランキング', 'Rankings')
		trans.add('s', '番組表へ移動します', 'See Listings')
		trans.add('s', '番組表', 'Listings')
		trans.add('s', 'ニコニコ生放送からログアウトします', 'Logout of NicoNicoLive')
		trans.add('s', 'ログアウト', 'Logout')
	}
	
	/*** NicoNicoCh
	***/
	if(window.location.hostname == 'ch.nicovideo.jp') {
		target = window.document.body.childNodes[3].childNodes[1]
		
		//Menu
		trans.add('s', 'メニュー', 'Menu')
		
		trans.add('s', 'お気に入り登録中・入会中のCH', 'Bookmark your favorite channels!')
		trans.add('s', '購入した動画', 'Purchace History')
		
		trans.add('s', 'ニコニコポイント購入', 'Purchace NicoNicoPoints')
		trans.add('s', 'ニコニコポイント確認', 'Check NicoNicoPoints')
		
		trans.add('s', 'マイページ', 'My Channels')
		trans.add('s', 'ログアウト', 'Logout')
		
		//Links
		trans.add('s', 'プレミアム会員登録', 'Upgrade')
	}
	
	/*** NicoNicoSecure
	***/
	if(window.location.hostname == 'secure.nicovideo.jp') {
		if((window.location.pathname != '/secure/login_form') &&
			(window.location.pathname != '/secure/static/register/index.html') &&
			(window.location.pathname != '/secure/register')) {
			target = window.document.body.childNodes[2]
			
			//Menu
			trans.add('s', 'ようこそ', 'Profile of ')
			trans.add('s', 'さん', '')
			trans.add('s', 'ログアウト', 'logout')
		}
	}
	
	/*** Translate and Clear
	***/
	trans.translate(target)
}


/***
**** Page Modification
**** Everything else
***/ 

/***
*** NicoNico
***/
if(window.location.hostname == 'www.nicovideo.jp') {

	/* Header
	*/
	
	  /* Search */
		trans.add('s', '動画', 'Videos')
		trans.add('s', 'マイリスト', 'My List')
		trans.add('s', '静画', 'Images')
		trans.add('s', '生放送', 'Broadcasts')
		//
		trans.add('s', '教えてくれ、俺はあと何回右上を考えればいい？', 'What do you truly believe you are searching for?') //WHATIS this shit
		//
		trans.translate(document.getElementById('searchFormWrap'))
		//
		addGlobalStyle('.ads_468 {visibility:hidden;} #web_pc_premium {visibility:hidden; height:30px;}')

	/* Left Sidebar
	*/

	  /* Services */
		trans.add('s', 'ニコニコサービス', 'NicoNico Services')
		trans.add('s', '動画', 'Videos'); trans.add('s', 'リニューアル', 'revamped')
		trans.add('s', '静画', 'Images')
		trans.add('s', '生放送', 'Broadcasts')
		trans.add('s', 'チャンネル', 'Channels')
		trans.add('s', '大百科', 'Nicopedia')
		trans.add('s', '市場', 'Market')
		trans.add('s', 'ニコニ広告', 'NicoAds')
		trans.add('s', '実況', 'Live TV')
		trans.add('s', 'コモンズ', 'Commons')
		trans.add('s', 'コミュニティ', 'Community')
		trans.add('s', 'ニコニコDVD', 'DVD Rental')
		trans.add('s', 'ニコニコ直販', 'Anime Store') //WHATIS ニコニコ直販
		trans.add('s', '遊園地', 'Park')
		trans.add('s', 'ニコゲー', 'Games')
		trans.add('s', 'モバイル', 'Mobile')
		trans.add('s', 'ニュース', 'News'); trans.add('s', '\>New\<', '\>new\<')
		trans.add('s', '一覧', 'More')
		//
		trans.translate(document.getElementById('nicoService'))

	  /* Events and Promotions */
		trans.add('s', 'イベント＆キャンペーン', 'Events & Promos')
		//
		trans.translate(document.getElementById('eventCampaign'))

	  /* Featured Game */
		trans.add('s', 'おすすめゲーム', 'Featured Game')
		//
		trans.translate(document.getElementById('recommendGame'))
		//
		addGlobalStyle('#recommendGame h2 { padding-left:20px; }')

	/* Content
	*/
	  /* TV Lineup */
		trans.add('s', '放送予定', 'TV Lineup')
		trans.add('s', 'ニコニコ生放送', 'NicoNicoBroadcasts')
		//
		trans.translate(document.getElementById('liveProgram'))

	  /* Current Events */
		trans.add('s', 'ニコニコニュース', 'Current Events')
		trans.add('s', '一覧', 'More')
		//
		trans.translate(document.getElementById('topicsInner'))

	  /* NicoNico News */
		trans.add('s', 'ニコニコからのお知らせ', 'NicoNico News')
		trans.add('s', '一覧', 'More')
		//
		trans.translate(document.getElementById('nicoNews'))

	  /* Anime Channel */
		trans.add('s', '毎週無料配信\！最新アニメはニコニコチャンネルで\！', 'New Anime Episodes Every Week\!')
		trans.add('s', '一覧', 'More')
		//
		trans.translate(document.getElementById('anime'))

	  /* Hot Videos */
		trans.add('s', '話題の動画', 'Hot Videos')
		trans.add('s', '一覧', 'More')
		//
		trans.translate(document.getElementById('hotVideo'))

	  /* User Adverts */
		trans.add('s', 'ユーザーが宣伝している動画', 'User Advertisments')
		trans.add('s', '前日ディリーTOP１０より', 'Daily from last Sun\'s TOP10')
		trans.add('s', 'ニコニ広告', 'NicoAds')
		//
		trans.translate(document.getElementById('uadVideo'))

	  /* Featured Videos */
		trans.add('s', 'テレ東アニメ特集', 'Featured Anime Videos')
		trans.add('s', '★前回のテーマ『サブカルチャー特集』', 'Themes from the last 『subculture★special』')
		trans.add('s', 'ニコニコチャンネル', 'NicoNicoChannels')
		//
		trans.translate(document.getElementById('featuredVideo'))

	/* Right Sidebar
	*/
		addGlobalStyle('.sideBanner, .sideAd, .sideTxtAd { display:none; }')

	  /* Events */
		trans.add('s', '各種ライブチケット発売中', 'Buy Tickets For These Events')
		trans.add('s', '一覧', 'More')
		//
		trans.translate(document.getElementById('liveEvent'))

	  /* Popular Shows */
		trans.add('s', '人気のあった生放送', 'Popular Shows')
		//
		trans.translate(document.getElementById('popularLive'))

	  /* Manga */
		trans.add('s', 'ニコニコで漫画を描いてみた', 'NicoNicoManga')
		trans.add('s', '特設ページへ', 'More')
		//
		trans.translate(document.getElementById('manga'))

	  /* Popular Pic, NicoNicoBlog */
		/* This does not work for the moment. Rather than show a pic, it displays a carefully selected nothing, so I'll just disable the thing for the moment, until NicoNico gets it working properly */
		addGlobalStyle('#popularPic { display:none; }')

	  /* Blog Column */
		trans.add('s', 'ニコニコラム', 'NicoNicoBlog')
		trans.add('s', '続きを読む', 'More')
		//
		trans.translate(document.getElementById('niconicolumn'))

	  /* Recommended News */
		trans.add('s', '掲載記事紹介', 'Recommended News')
		trans.add('s', '一覧', 'More')
		//
		trans.translate(document.getElementById('recommendNews'))

	/* Footer
	*/
	  /* Ads */
		addGlobalStyle('.footerBanner { display:none }')
		addGlobalStyle('#contents { margin-bottom:0; }')
		addGlobalStyle('#contentsWrap { padding-bottom:0; }')
		addGlobalStyle('.sidewallAd { display:none; }')
		
	  /* Links */
		trans.add('s', 'フィッシング詐欺にご注意！', 'Beware of Phishing!')
		trans.add('s', '利用規約', 'Terms and Conditions')
		trans.add('s', '宣言', 'Declaration')
		trans.add('s', '受賞', 'Awards')
		trans.add('s', '掲示板', 'BBS')
		trans.add('s', '広告出稿に関するお問い合わせ', 'Advertisments')
		//
		trans.translate(document.getElementById('footerWrap'))
}

/***
*** NicoNicoSecure
***/

else if(window.location.hostname == 'secure.nicovideo.jp') {
	
	//Edit Overview
	if(window.location.pathname == '/secure/') {
		/*Header*/
			trans.add('s', 'ようこそ', 'Profile of ')
			trans.add('s', 'さん', '')
			trans.add('s', '終了する場合は必ず', 'After editing, please')
			trans.add('s', 'ログアウト', 'logout')
			trans.add('s', ' してください。', '')
			
			trans.translate(window.document.body.childNodes[8])
		
		/*Content*/
			trans.add('s', '会員状態・所持ニコニコポイント', 'Member Details')
			trans.add('s', '会員状態', 'Membership')
			trans.add('s', '一般会員', 'Regular')
			trans.add('s', 'プレミアム会員登録', 'Upgrade Account')
			trans.add('s', '所持ニコニコポイント', 'NicoNico Points')
			trans.add('s', 'ポイント', 'Points')
			trans.add('s', 'ポイントの購入・明細の確認', 'NicoNicoPoints')
			
			trans.add('s', 'プロフィール', 'Profile')
			trans.add('s', 'ニックネーム', 'Username')
			trans.add('s', '性別', 'Sex')
			trans.add('s', '男性', 'Male')
			trans.add('s', '生年月日', 'Birthday')
			trans.add('s', 'お住まいの地域', 'Location')
			trans.add('s', 'プロフィールの変更', 'Edit Profile')
			trans.add('s', 'が付いている項目は変更できません', 'cannot be edited')
			trans.add('s', '登録メールアドレス', 'Contact')
			trans.add('s', 'PC', 'Email')
			trans.add('s', '携帯', 'Phone')
			trans.add('s', '未登録', 'None')
			trans.add('s', '登録メールアドレスの変更', 'Edit Contacts')
			
			trans.add('s', '公開・非公開', 'Public and Private Details')
			trans.add('s', 'プロフィール', 'Profile')
			trans.add('s', 'ニックネーム', 'Username')
			trans.add('s', '性別', 'Sex')
			trans.add('s', '生年月日', 'Birthday')
			trans.add('s', 'お住まいの地域', 'Location')
			trans.add('s', '一覧', 'Lists')
			trans.add('s', '投稿動画', 'My Videos')
			trans.add('s', '公開マイリスト', 'mylist')
			trans.add('s', '参加コミュニティ', 'Communities')
			trans.add('s', '入会チャンネル', 'Watched Channels')
			trans.add('s', '公開・非公開設定の変更', 'Edit Profile')
			trans.add('s', 'ニックネームは常に公開されます', 'must remail public')
			trans.add('g', '非公開', 'Private'); //must come becore public
			trans.add('g', '公開', 'Public')
			
			trans.add('s', 'ニコレポ', 'Nicorepo')
			trans.add('s', 'あなたのニコレポは', 'Your Nicorepo')
			trans.add('s', 'twitter連携', 'Twitter')
			trans.add('s', '全ユーザーに公開', 'All Public Users')
			trans.add('s', '連携していません', 'None')
			trans.add('s', '表示設定の変更', 'Edit Preferences')
			trans.add('s', 'twitter連携の変更', 'Edit Twitter')
			
			trans.add('s', 'メールサービス', 'Mail Services')
			trans.add('s', '最新情報やニコレポメールなどのメールサービスを個別に開始・停止します', 'The start and stop individual services such as e-mail updates and Nikorepomeru'); //check, this is pasted direct from google translator
			trans.add('s', 'メールサービスの変更', 'Edit Mail')
			
			trans.add('s', 'セキュリティ', 'Security')
			trans.add('s', 'パスワード', 'Password')
			trans.add('s', '秘密の質問・答え', 'Secret Question Answer')
			trans.add('s', '初心者モード', 'Starter'); //check
			trans.add('s', '無効', 'invalid'); //check
			trans.add('s', '質問', 'Q')
			trans.add('s', '答え', 'A')
			trans.add('s', 'セキュリティの変更', 'Edit Security')
			
			trans.translate(window.document.body.childNodes[10])
			
			trans.add('s', 'ニコニコ動画を退会する', 'Delete NicoNico Account')
			
			trans.translate(window.document.body.childNodes[12])
		
		/*Footer*/
			trans.add('s', '【ニコニコ動画アカウントで利用できるサービス一覧】', '【NicoNico Provided Services】')
			trans.add('s', 'ニコニコ動画', 'NicoNicoDouga')
			trans.add('s', 'ニコニコ静画', 'NicoNicoSeiga')
			trans.add('s', 'ニコニコ生放送', 'NicoNicoLive')
			trans.add('s', 'ニコニコチャンネル', 'NicoNicoChannels')
			
			trans.translate(window.document.body.childNodes[18])
			
			trans.add('s', 'このサイトは、サイバートラストの ', 'This site has been authenticated by ')
			trans.add('s', 'サーバ証明書', 'Cybertrust')
			trans.add('s', 'により実在性が認証されています。', '')
			trans.add('s', 'また、SSLページは通信が暗号化されプライバシーが守られています。', 'This page uses encrypted SSL communications')
			
			trans.translate(window.document.body.childNodes[24])
		}
	
	//Edit Profile
	if(window.location.pathname == '/secure/profile_edit') {
		/*Header*/ {
			trans.add('s', 'プロフィールの変更', 'Edit Profile')
			
			trans.translate(window.document.body.childNodes[4])
			
			trans.add('s', '変更したい情報に新しい情報を入力して', '')
			trans.add('s', '変更', 'Please')
			trans.add('s', 'を押してください。', 'enter your information correctly')
			trans.add('s', 'が付いている項目は', 'Hidden entries')
			trans.add('s', '非表示にはできず、すべてのユーザーに公開されます。', 'cannot be open to all users')
			trans.add('s', '利用規約に触れるような内容を含まないよう、十分にご注意ください。', 'Please note this page does not contain content that touches upon the Terms of Service')
			
			trans.translate(window.document.body.childNodes[8])
		}
		
		/*Body*/ {
			trans.add('s', 'プロフィール', 'Profile')
			trans.add('s', 'ニックネーム', 'Username')
			trans.add('s', '全半角問わず2～16字以内', '16 characters or less')
			trans.add('s', '現在のニックネーム：', 'Current Username:')
			trans.add('s', '新しいニックネーム：', 'New Username:')
			trans.add('s', 'ニコニコ動画 ', 'Change your profile picture on ')
			trans.add('s', 'プロフィール画像の変更', 'NicoNicoDouga')
			trans.add('s', 'で変更することができます。', 'directly')
			trans.add('s', 'プレミアム会員にご登録いただくと、自己紹介のテキスト中にhtmlタグを使うことができます。', 'Registered members can use HTML in their Description')
			trans.add('s', 'プロフィール画像', 'Profile Picture')
			trans.add('s', '自己紹介', 'Description')
			trans.add('s', '性別', 'Sex')
			trans.add('s', '男性', 'Male')
			trans.add('s', '生年月日', 'Birthday')
			trans.add('s', 'お住まいの地域', 'Location')
			trans.add('s', '現在のお住まいの地域', 'Current Area:')
			trans.add('s', '新しいお住まいの地域', 'New Area:')
			
			trans.add('g', '※現在の状態は', '※ This item is currently ')
			trans.add('g', '非公開', 'private');//must come becore public
			trans.add('g', '公開', 'public')
			trans.add('g', 'です', '')
			trans.add('g', '変更不可', 'Cannot Edit')
			trans.add('g', '変更', 'Submit')
			
			trans.translate(window.document.body.childNodes[10])
		}
		
		/*Footer*/ {
			trans.add('s', 'アカウント設定のトップへ', 'Return to Overview')
			
			trans.translate(window.document.body.childNodes[14])
		}
	}
	
	//Edit Contacts
	if(window.location.pathname == '/secure/user_edit') {
		/*Header*/ {
			trans.add('s', '登録メールアドレスの変更', 'Edit Contacts')
			trans.translate(window.document.body.childNodes[4])
			
			trans.add('s', '変更したい情報に新しい情報を入力して', 'Please enter your new information and hit ')
			trans.add('s', '変更', 'Submit')
			trans.add('s', 'をクリックしてください。', '')
			
			trans.translate(window.document.body.childNodes[8])
		}
		
		/*Body*/ {
			trans.add('s', 'PCメールアドレス：', 'Email Address: ')
			trans.add('s', '携帯メール不可', '')
			trans.add('s', '新しいPCメールアドレス：', 'New Email Address: ')
			trans.add('s', 'PCメールアドレス変更の際、新しいPCメールアドレス宛にメールを自動送信します。', 'A conformation message will be sent to the new address')
			trans.add('s', '必ず新しいPCメールアドレス宛のメールを受け取れる状態で変更手続きをおこなってください。', 'Please be sure to follow the instructions contained in the message')
			
			trans.add('s', '携帯メールアドレス：', 'Mobile Phone Email: ')
			trans.add('s', '新しい携帯メールアドレス：', 'Current address: ')
			trans.add('s', '未登録', 'None')
			trans.add('s', 'ドメイン指定等されている方は', 'Please allow the domain ')
			trans.add('s', 'ドメインを許可してください', ' access to this address')
			
			trans.add('g', '変更', 'Submit')
			
			trans.translate(window.document.body.childNodes[10])
		}
		
		/*Footer*/ {
			trans.add('s', '登録メールアドレスの確認', 'Check Mail')
			trans.add('s', 'アカウント設定のトップへ', 'Return to Overview')
			
			trans.translate(window.document.body.childNodes[14])
		}
	}
	
	//Edit Published Details
	if(window.location.pathname == '/secure/user_publish') {
		/*Header*/ {
			trans.add('s', '公開・非公開の変更', 'Published Details')
			
			trans.translate(window.document.body.childNodes[6])
		}
		
		/*Content*/ {
			trans.add('s', '個人情報', 'Personal Information')
			trans.add('s', '性別', 'Sex')
			trans.add('s', '生年月日', 'Birthday')
			trans.add('s', 'お住まいの地域', 'Location')
			
			trans.add('s', '一覧情報', 'List Information')
			trans.add('s', '公開マイリスト', 'Mylist')
			trans.add('s', '投稿動画', 'Posted Videos')
			trans.add('s', '参加中のコミュニティ', 'Community Participation')
			trans.add('s', 'お気に入りのチャンネル', 'Favourite Channels')
			
			trans.add('g', 'すべてのユーザーに公開', 'Public')
			trans.add('g', '誰にも見せない\\( 非公開 \\)', 'Private')
			
			trans.translate(window.document.body.childNodes[10])
			
			trans.add('s', 'あなたのニコレポを見ることができるのは…', 'My Nicorepo can be seen by…')
			
			trans.add('s', 'すべてのユーザー', 'All Users')
			trans.add('s', '自分だけ\\( 非公開 \\)', 'Me Only')
			
			trans.add('s', '▼ニコレポに反映される行動を個別に設定する▼', '▼ set individual actions are reflected in Nikorepo ▼'); //the fuck? get this checked
			trans.add('s', '設定を保存して終了', 'Save and Exit')
			
			trans.translate(window.document.body.childNodes[10])
		}
		
		/*Footer*/ {
			trans.add('s', '現在の状態を確認\\( 新規ウインドウが開きます \\)', 'View my profile (opens new window)')
			trans.add('s', 'アカウント設定のトップへ', 'Return to Overview')
			
			trans.translate(window.document.body.childNodes[16])
		}
		
	}
	//Login
	if(window.location.pathname == '/secure/login_form') {
		
		/*Body*/ {
			trans.add('s', 'ログイン', 'Login')
			trans.add('s', 'アカウント新規登録', 'Register')
			
			trans.add('s', 'メールアドレス', 'Email')
			trans.add('s', 'パスワード', 'Password')
			
			trans.add('s', '※パスワードを忘れた方は', '※ I have ')
			trans.add('s', '再発行の手続き', 'forgotton my password')
			trans.add('s', 'へ', '')
			
			trans.add('s', 'はじめての方は ', 'Click the button below to ')
			trans.add('s', '新規登録', 'Register')
			trans.add('s', 'へお進みください', ' ')
			
			trans.translate(window.document.body.childNodes[3])
		}
		
		/*Footer*/ {
			trans.add('s', 'このサイトは、サイバートラストの ', 'This site has been authenticated by ')
			trans.add('s', 'サーバ証明書', 'Cybertrust')
			trans.add('s', 'により実在性が認証されています。', '')
			trans.add('s', 'また、SSLページは通信が暗号化されプライバシーが守られています。', 'This page uses encrypted SSL communications')
			
			trans.translate(window.document.body.childNodes[11])
		}
	}
	//Login
	if(window.location.pathname == '/secure/static/register/index.html') {
		
		/*Body*/ {
			trans.add('s', 'ニコニコ動画をご利用になるにはアカウント登録が必要です。一般会員のアカウントは無料で登録できます。', 'Videos are only avaliable to those who register, right button is for a free account')
			
			trans.translate(window.document.body.childNodes[3])
		}
	}
	//Register1
	if(window.location.pathname == '/secure/register') {
		
		/*Header*/ {
			trans.add('s', 'ようこそ ゲスト さん', 'Account Creation')
			
			trans.translate(window.document.body.childNodes[2])
		}
		
		/*Body*/ {
			trans.add('s', 'アカウント新規登録', 'Register Account')
			
			trans.translate(window.document.body.childNodes[4])
			
			trans.add('s', 'ニコニコ動画 ', '')
			trans.add('s', '一般アカウント', 'NicoNico account creation')
			trans.add('s', 'の新規登録をおこないます。', '')
			trans.add('s', 'ご入力いただいた登録情報は以下の通りです。', 'Please check your details to be sure they are correct')
			trans.add('s', '登録情報を入力\\( 選択 \\)してください。', '')
			trans.add('s', 'が付いている項目は', 'Please note, marked items ')
			trans.add('s', '登録後の変更はできません', 'cannot be changed ')
			trans.add('s', 'のでご注意ください。', 'after registration')
			
			trans.add('s', 'アカウント登録を行うメールアドレスを入力してください。', 'Please enter a valid email account to register')
			
			trans.translate(window.document.body.childNodes[8])
			
			trans.add('s', 'メールアドレス：', 'Email:')
			trans.add('s', '指定受信設定をされている場合は、ドメイン ', 'If required, please allow ')
			trans.add('s', 'を受信可能に設定してください。', ' to send you emails')
			
			trans.add('s', '登録情報の入力画面へ', 'Submit Information')
			
			trans.translate(window.document.body.childNodes[10])
		}
	}
	//Register2
	if(window.location.pathname == '/secure/register') {
		
		/*Header*/ {
			trans.add('s', 'ようこそ ゲスト さん', 'Account Creation')
			
			trans.translate(window.document.body.childNodes[2])
		}
		
		/*Body*/ {
			trans.add('s', '会員タイプ:', 'Membership Type：')
			trans.add('s', '一般', 'General')
			
			trans.add('s', 'ニックネーム：', 'Nickname：')
			trans.add('s', '全半角問わず2～16字以内', '16 characters or less')
			
			trans.add('s', '性別', 'Gender')
			trans.add('s', '男性', 'Male')
			trans.add('s', '女性', 'Female')
			
			trans.add('s', '生年月日', 'Birthday')
			trans.add('s', 'お住まいの地域：', 'Location：<br /><p class="font12">English ones at the bottom</p>')
			trans.add('s', 'パスワード：', 'Password：')
			trans.add('s', '再入力：', 'Reenter：')
			trans.add('s', '半角英数記号8～16字以内', '8-16 Alphanumeric Characters')
			
			trans.add('s', '秘密の質問・答え：', 'Secret Question：')
			trans.add('s', '質問：全半角問わず4～64字以内', '')
			trans.add('s', '答え：全半角問わず1～16字以内', '')
			
			trans.add('s', '質問：', 'Question：')
			trans.add('s', '答え：', 'Answer：')
			
			/*Questions*/ {
				/* This roundabout way is required in order to
				 * keep the question values from going all honky-donky,
				 * as I only want to change their display name */
				trans.add('s', '好きな食べ物は？', '好？きな食べ物は？')
				trans.add('s', '好きな食べ物は？', 'What is your favorite food?')
				trans.add('s', '好？きな食べ物は？', '好きな食べ物は？')
				trans.add('s', '好きな食べ物は？', 'What is your favorite food?')
				
				trans.add('s', '嫌いな食べ物は？', '嫌？いな食べ物は？')
				trans.add('s', '嫌いな食べ物は？', 'What is your least liked food?')
				trans.add('s', '嫌？いな食べ物は？', '嫌いな食べ物は？')
				trans.add('s', '嫌いな食べ物は？', 'What is your least liked food?')
				
				trans.add('s', '卒業した学校名は？', '卒？業した学校名は？')
				trans.add('s', '卒業した学校名は？', 'What school did you graduate from?')
				trans.add('s', '卒？業した学校名は？', '卒業した学校名は？')
				trans.add('s', '卒業した学校名は？', 'What school did you graduate from?')
				
				trans.add('s', '母親の旧姓は？', '母?親の旧姓は？')
				trans.add('s', '母親の旧姓は？', 'What is your mother\'s maiden name?')
				trans.add('s', '母?親の旧姓は？', '母親の旧姓は？')
				trans.add('s', '母親の旧姓は？', 'What is your mother\'s maiden name?')
				
				trans.add('s', '好きな映画の題名は？', '好?きな映画の題名は？')
				trans.add('s', '好きな映画の題名は？', 'What is the title of your favorite movie?')
				trans.add('s', '好?きな映画の題名は？', '好きな映画の題名は？')
				trans.add('s', '好きな映画の題名は？', 'What is the title of your favorite movie?')
				
				trans.add('s', '飼っているペットの名前は？', '飼?っているペットの名前は？')
				trans.add('s', '飼っているペットの名前は？', 'What is the name of a pet?')
				trans.add('s', '飼?っているペットの名前は？', '飼っているペットの名前は？')
				trans.add('s', '飼っているペットの名前は？', 'What is the name of a pet?')
				
				trans.add('s', '好きな芸能人は？', '好?きな芸能人は？')
				trans.add('s', '好きな芸能人は？', 'Who is your favorite celebrity?')
				trans.add('s', '好?きな芸能人は？', '好きな芸能人は？')
				trans.add('s', '好きな芸能人は？', 'Who is your favorite celebrity?')
			}
			
			trans.add('s', '秘密の質問と答えはパスワード再発行などの手続きの際に使用します。', 'Secret questions are used during various password procedures')
			trans.add('s', '他人が予想しづらい・自分がすぐに思い出せる', 'Please ')
			trans.add('s', 'ような質問・答えを入力してください。', 'enter an answer that would be difficult to guess')
			
			trans.add('s', '上記の内容で宜しければ ', 'Please proceed to the confirmation screen, and continue if the above details are correct')
			trans.add('s', '登録確認画面へ', '')
			trans.add('s', 'をクリックして確認画面へお進みください。', '')
			
			trans.add('s', '登録確認画面へ', 'Continue')
			
			trans.add('g', '：', ': ')
			
			trans.translate(window.document.body.childNodes[10])
			
			trans.add('s', 'メールアドレスを修正したい場合は', 'To change the email address associated with this account, please return to the address entry screen')
			trans.add('s', 'メールアドレス入力画面に戻る', '')
			trans.add('s', 'をクリックしてください。', '')
			
			trans.translate(window.document.body.childNodes[12])
			
			trans.add('s', 'メールアドレス入力画面に戻る', 'Address Entry')
			
			trans.translate(window.document.body.childNodes[14])
		}
		/*Footer*/ {
			trans.add('s', '上記の内容で宜しければ下の ', '')
			trans.add('s', '利用規約', 'Please ')
			trans.add('s', 'を必ずお読みになり、', 'read the terms and conditions')
			trans.add('s', '左の画像の中に表示されている認証コードを入力した後', 'If you accept, please enter the auth code below and continue')
			trans.add('s', '利用規約に同意し登録', '')
			trans.add('s', 'をクリックしてください。', '')
			
			trans.add('g', '：', ': ')
			
			trans.translate(window.document.body.childNodes[12])
			trans.add('s', '認証コード：', 'Authentication Code：')
			trans.add('s', '別の画像を表示', 'New Captcha')
			trans.add('s', '利用規約に同意し登録', 'I accept the Terms and Conditions')
			
			trans.add('g', '：', ': ')
			
			trans.translate(window.document.body.childNodes[21])
			trans.add('s', '内容を修正したい場合は ', 'If these details are incorrect, click the button below to edit them')
			trans.add('s', '入力画面に戻る', '')
			trans.add('s', 'をクリックしてください。', '')
			
			trans.add('g', '：', ': ')
			
			trans.translate(window.document.body.childNodes[23])
			trans.add('s', '入力画面に戻る', 'Edit Details')
			
			trans.translate(window.document.body.childNodes[25])
		}
	}
}