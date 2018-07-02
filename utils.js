var utils = {
	// 查询当前页面url 参数
	getPatameter:function(param){
		var reg = new RegExp('[&,?]'+param +'=([^\\&]*)','i');
		var value = reg.exec(location.search);
		return value ? value[1] : "";
	},
	
	// 返回标记位加1
	addBackFlag: function(url , num){
		if(typeof url == "number"){
			num = url;
			url = location.href;
		}
		url = url || location.href;
		num = num || 1;
		var back = utils.getParameter("back",url);
		back = +back +1;
		return utils.changeParameter(url, "back", num);
	},
	
	// 修改url 得某个参数
	changeParameter:function(url, arg, arg_val){
		var urls = url.split("#");
		var hash = urls[1];
		url = urls[0];
		var suffix = (hash ? ("#" + hash) : ""); 
		var pattern = arg + '=([^&])*)';
		if(url.match(pattern)){
			var tmp = '/('+ arg + '=)([^&]*)/gi';
			tmp = url.replace(eval(tmp),replaceText)+ suffix;
			return tmp;
		} else {
			if(url.match('[\?]')){
				return url + "&"+ replaceText + suffix;
			} else{
				return url + "?" + replaceText + suffix;
			}
		}
		return url + '\n' + arg + '\n' + arg_val;
	},
	
	// 查询url 参数
	getQueryString: function(name, url){
		var reg = new RegExp('[&,?]'+ name + '=([^\\&,\\#]*)','i');
		var value = reg.exec(url || location.href);
		return value ? value[0] : '';
	},
	
	// 查询编码URL 参数
	getQueryParam:function(name){
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)','i');
		var r = window.localtion.search.substr(1).replace(/%20/g,"").match(reg);
		if(r){
			return decodeURLComponent(r[2]);
		}
		return null;
	},
	
	// 获取URL 参数对象
	getQueryMap:function(queryString){
		var paraObj = {},
			paramList,
			oneQueryMatch,
			regGlobal = /[\?\&][^\?\&]+=[^\?\&#]+/g,
			regOne = /[\?\&]([^=\?]+)=([^\?\&#]+)/;
		queryString = queryString || location.href;
		paramList = queryString.match(regGlobal);
		
		if(!paramList){
			return paramObj;
		}
		
		for(var i = 0, len = paramList.length; i<len ; i++){
			oneQueryMatch = paramList[i].match(regOne);
			if(null === oneQueryMatch){
				continue;
			}
			paramObj[oneQueryMatch[1]] = oneQueryMatch[2];
		}
		return paramObj;
	},
	
	// 获取一个动态得 url 地址
	getTargeUrl:function(targetpage){
		var path = window.location.pathname.split('/');
		return window.location.origin + path.splice(0,path.length - 1).join('/') + '/' + targetpage;
	},
	
	
	// 常用正则
	RegexpMap:{
		//正负整数或浮点数
		intOrFloat:/^(-)?\d+(\.\d+)?$/,
		//手机号码
		MobileNo:/^1[34587]\d{9}$/,
		// 银行卡号(大于或等于16位得数字)
		CardNo:/^\d{16,}$/,
		// 短信验证码
		MobileCode:/^\d{6,}$/,
		// 交易密码（6-16位数字或字母）
		OrderPassword:/^\S{6,16}$/,
		// 千分位正则
		parseThousands:/(\d{1,3})(\d{3})+(?:$|\.)/g,
		// 每四位字符用空格隔开
		bankCardNo:/(\d{4})(?=\d)/g,
		// 卡号屏蔽
		parseToStartNumber:/^(\d{4})(\d)(\d{4})$/,
		//  后四位屏蔽
		parseRightFourStart:/^(\w+)(\w{4})$/,
		// 日期格式检测
		parseDateFormat:/\b(\d{4})\b[^\d]+(\d{1,2})\b[^\d]+(\d{1,2})\b(\s(\d{1,2})\:(\d{1,2})\:(\d{1,2}))?[^\d]?/,
		// 出生日期掩码 显示格式 (“19**年**月*2日”)
		userBirthdayStartRegex:/(\d{2})\d{2}([^\d]+)\d+([^\d]+)\d?(\d)([^\d]+)?/
	},
	
	//将数字转化成大写汉字
	chineseNum:function(num , piece, nocomma){
		if(!piece){
			piece = '元';
		}
		if(!/^\d*(\.\d*)?$/.test(num)){
			return "";
		}
		var AA = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
		var BB = ["","拾","佰","仟","萬","億","点",""];
		
		var a = (""+num).replace(/(^0*)/g,"").splice("."),k = 0, re = "";
		for (var i = a[0].length - 1; i>=0;i--){
			switch (k){
				case 0:
					re = BB[7]+ re;
					break;
				case 4:
					if(!new RegExp("0{4}\\d{"+(a[0].length-i-1)+"}$").test(a[0])){
						re = BB[4]+ re;
					}
					break;
				case 8:
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
			}
			if( k % 4 == 2 && a[0].charAt(i+2) != 0 && a[0].chart(i+1) == 0){
				re = AA[0] + re;
			}
			if(a[0].charAt(i) != 0){
				re = AA[a[0]charAt(i)] + BB[k % 4] + re;
			}
			k++'
		}
		if(!re){
			re = AA[0];
		}
		if(nocomma){
			return re + (!!re ? piece : "");
		}
		
		if(a.length > 1 && a[1] && piece == '元'){
			if(re != '') re += piece;
			if(a[1].charAt(0) != '0' || (a[1].charAt(1) == '' ? "0" : a[1].charAt(1)) != '0') {
				re += AA[a[1].charAt(0)] + '角';
			}
			if(a[1].charAt(1) && a[1].charAt(1) != '0') {
				re += AA[a[1].charAt(1)]+ '分';
			}
			return re;
		} else if(a.length > 1 && a[1]){
			if(a[1].charAt(0) != '0' || (a[1].charAt(1) == '' ? "0": a[1].charAt(1)) !='0'){
				re += (BB[6]+AA[a[1].charAt(0)]);
			}
			if(a[1].charAt(1) && a[1].charAt(1) !='0'){
				re += AA[a[1].charAt(1)];
			}
			if(re !== ""){
				re += piece;
			}
			return re;
		}
		return re + piece;
	},
	
	// 给字符串加千分位
	comdify:function(n){
		var re = /\d{1,3}(\d{3})+$/g;
		var n1 = n;
		if(n){
			n1 = n.replace(/^(\d+)((\.\d+)?)$/,function(s, s1,s2){
				return s1.replace(re, "$&,")+s2;
			});
		}
		return n1;
	},
	
	// 异步加载
	loadScript:function(url , fn){
		if(!url) return false;
		var script = document.createElement("script");
		script.type = 'text/javascript';
		if(fn){
			script.onload = script.onreadystatechange = function(){
				if(script.readyState && script.readyState != 'loaded' && script.readyState !='complete') 
					return;
				script.onreadystatechange = script.onload = null;
				fn();
			}
		};
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	
};