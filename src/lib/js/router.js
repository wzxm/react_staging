if (!window.localStorage) {
	window.myLocalStorage = {};
	window.myLocalStorage.storage = {};
	window.myLocalStorage.getItem = function(key) {
		return window.myLocalStorage.storage[key];
	};
	window.myLocalStorage.setItem = function(key, value) {
		return window.myLocalStorage.storage[key] = value;
	};
	window.myLocalStorage.removeItem = function(key) {
		delete window.myLocalStorage.storage[key];
	};
} else {
	window.myLocalStorage = window.localStorage;
}
var pageDuration = 400;
//获取url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = location.search.substr(1).match(reg) || location.hash.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return '';
}
function querystr2obj(queryStr){
    var argObj = {};
    if(!queryStr) return {};
    queryStr.split("&").forEach(function(itemQuery,i){
        itemQuery.replace(/(.*)=(.*)/g,function(){
            argObj[RegExp.$1] = decodeURIComponent(RegExp.$2);
        })
    });
    return argObj;
}
function obj2query(argObj){
    var queryStr = "";
    for(key in argObj){
        queryStr += "&" + key + "=" + argObj[key];
    }
    return queryStr.slice(1);
}

var router = function (args) {
	var me = this;
	this.init = function (args) {
		var hash = window.location.hash || args.hash;
		var params = args.params;
		var currentPage = new pageNode({hash:hash});
		this.changeStatusCallback = args.changeStatusCallback || (function(){});
		this.recordPageNodes(currentPage);
		this.getDOMByHash(this.getPageByHash(hash)).addClass('page-current');
		this.switch(hash,params);
	};
	this.load = function (hash, params) {
		this.pull(hash, params);
	};
	this.pull = function (hash, params) {
		var me = this;
		var targetPage = new pageNode({hash:hash});
		var currentPage = getCurrentPageFromLocalStorage();
		currentPage.changeNext(targetPage.id);
		targetPage.changePrev(currentPage.id);
		params = params || {};
		params.id = targetPage.id;
		params.hash = hash;
		this.changeState(params);
		this.recordPageNodes(currentPage);
		this.recordPageNodes(targetPage);
		this.showPage(this.getPageByHash(hash));
		this.changeStatusCallback(this.getPageByHash(hash), this.getStatusByHash(hash));
	};
	this.switch = function (hash, params) {
		var currentPage = getCurrentPageFromLocalStorage();
		params = params || {};
		params.id = currentPage.id;
		params.hash = currentPage.hash = hash;
		this.changeState(params, true);
		this.recordPageNodes(currentPage);
		this.changeStatusCallback(this.getPageByHash(hash), this.getStatusByHash(hash));
	};
	this.showPage = function (hash,isBack,callback){
		//isBack是否为退出
		var currentPage = $(".page.page-current");
		var thisPage = $('.page[data-router="' + hash + '"]');
		var currentPageAnimClass = "page-from-center-to-left";
		var thisPageAnimClass = "page-from-right-to-center";
		if(isBack){
			currentPageAnimClass = "page-from-center-to-right";
			thisPageAnimClass = "page-from-left-to-center";
		}
		currentPage.addClass(currentPageAnimClass);
		thisPage.addClass("page-current " + thisPageAnimClass);

		setTimeout(function(){
			currentPage.removeClass("page-current " + currentPageAnimClass);
			thisPage.removeClass(thisPageAnimClass);
			if (typeof callback == "function") {
				callback();
			}
		},pageDuration)
	};
	this.recordPageNodes = function (node) {
		//维护localStorage里的数据
		setCurrentPageToLocalStorage(node);
		setAllPageNodesToLocalStorage(node);
	};
	this.changeState = function (params,isReplace) {
		// console.log(lang);
		if (params.title != undefined) {
			changeTitle(params.title);
		}
		if (isReplace) {
			window.history.replaceState(params, "", params.hash);
		} else {
			window.history.pushState(params, "", params.hash);
		}
	};
	this.getDOMByHash = function (hash) {
		return $('div[data-router="' + hash + '"]');
	};
	this.getPageByHash = function (hash) {
		return hash.split("$")[0];
	};
	this.getStatusByHash = function (hash) {
		return hash.split("$")[1];
	};
	this.onForeward = function (state) {
		console.log("forward");
		if (state.title != undefined) {
			changeTitle(state.title);
		}
		this.showPage(this.getPageByHash(state.hash));
		this.changeStatusCallback(this.getPageByHash(state.hash), this.getStatusByHash(state.hash));
	};
	this.onBackward = function (state) {
		console.log("backward");
		if (state.title != undefined) {
			changeTitle(state.title);
		}
		this.showPage(this.getPageByHash(state.hash), true);
		this.changeStatusCallback(this.getPageByHash(state.hash), this.getStatusByHash(state.hash));
	};


	window.onpopstate = function (e) {

		var state = e.state;
		var currentPage = getCurrentPageFromLocalStorage();
		var allNodes = getAllPageNodesFromLocalStorage();

		if (!!state && !!state.id) {
			console.log(currentPage)
			if (state.id == currentPage.prevId) {
				me.onBackward(state);
			} else if (state.id == currentPage.nextId) {
				me.onForeward(state);
			}
			for (var i = 0; i < allNodes.length; i++) {
				var pageNode = allNodes[i];
				if (pageNode.id == state.id) {
					setCurrentPageToLocalStorage(pageNode);
				}
			}
		} else {
			return;
		}
	};

	this.init(args);
};

var pageNode = function (params) {
	var me = this;
	me.id = new Date ().getTime();
	for (var x in params) {
		me[x] = params[x];
	}
	this.changeNext = function (id) {
		this.nextId = id;
	};
	this.changePrev = function (id) {
		this.prevId = id;
	};
};

var changeTitle = function (title) {
	var $body = $('body');
	document.title = title;
	var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	$iframe.on('load',function() {
		setTimeout(function() {
			$iframe.off('load').remove();
		}, 0);
	}).appendTo($body);
};
var getCurrentPageFromLocalStorage = function () {
	var obj = !!window.myLocalStorage.getItem("currentPage")?JSON.parse(window.myLocalStorage.getItem("currentPage")):{};
	var node = obj.id != undefined?new pageNode(obj):{};
	return node;
};
var setCurrentPageToLocalStorage = function (obj) {
	window.myLocalStorage.removeItem("currentPage");
	window.myLocalStorage.setItem("currentPage", JSON.stringify(obj));
};
var getAllPageNodesFromLocalStorage = function () {
	var arr = !!window.myLocalStorage.getItem("allPageNodes")?JSON.parse(window.myLocalStorage.getItem("allPageNodes")):[];
	return arr;
};
var setAllPageNodesToLocalStorage = function (obj) {
	var allNodes = getAllPageNodesFromLocalStorage();
	var found = false;
	for (var i = 0; i < allNodes.length; i++) {
		if (obj.id == allNodes[i].id) {
			allNodes[i] = obj;
			found = true;
			break;
		}
	}
	if (!found) {
		allNodes.push(obj);
	}
	window.myLocalStorage.removeItem("allPageNodes");
	window.myLocalStorage.setItem("allPageNodes", JSON.stringify(allNodes));
};
//输出
window.router = router;
if (typeof module != 'undefined') {
	module.exports = router;
}