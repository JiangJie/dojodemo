function byIds() {
	var elements = new Array();
	for(var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if( typeof element == 'string')
			element = document.getElementById(element);
		if(arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}//document.getElementById的简写

function byId(objectId) {
	if(document.getElementById && document.getElementById(objectId)) {
		return document.getElementById(objectId);
		// W3C DOM
	} else if(document.all && document.all(objectId)) {
		return document.all(objectId);
		// MSIE 4 DOM
	} else if(document.layers && document.layers[objectId]) {
		return document.layers[objectId];
		// NN 4 DOM.. note: this won't find nested layers
	} else {
		return false;
	}
}//document.getElementById的简写

function tag(name, elem) {
	if(!document.getElementsByTagName)
		return false;
	return (elem || document).getElementsByTagName(name);
}//getElementsByTagName的简写方式

function index(current, obj) {
	for(var i = 0; i < obj.length; i++) {
		if(obj[i] == current) {
			return i;
		}
	}
}//原生JavaScript中获取元素索引的函数

function iLoad(func) {
	var oLoad = window.onload;
	if( typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oLoad();
			func();
		}
	}
}//替代window.onload,可多次调用的加载函数

function nextElem(node) {
	if(node.nodeType == 1)
		return node;
	if(node.nextSibling)
		return nextElem(node.nextSibling);
	return null;
}//获取下一个元素节点

function prevElem(node) {
	if(node.nodeType == 1) {
		return node;
	} else if(node.previousSibling) {
		return nextElem(node.previousSibling);
	} else {
		return null;
	}
}//获取上一个元素节点(此函数须调用第五条中的函数)

function insertAfter(newChild, refChild) {
	var parElem = refChild.parentNode;
	if(parElem.lastChild == refChild) {
		refChild.appendChild(newChild);
	} else {
		parElem.insertBefore(newChild, refChild.nextSibling);
	}
}//原生JavaScript中有insertBefore方法,可惜却没有insertAfter方法,怎么办?用如下函数实现

function addClass(elem, value) {
	if(!elem.className) {
		elem.className = value;
	} else {
		var oValue = elem.className;
		oValue += " ";
		oValue += value;
		elem.className = oValue;
	}
}//为元素添加样式[记住是添加不是替换,相当于jQuery中的addClass(value)]

function getStyle(id, stylename) {
	var elem = $(id);
	var realStyle = null;
	if(elem.currentStyle) {
		realStyle = elem.currentStyle[stylename];
	} else if(window.getComputedStyle) {
		realStyle = window.getComputedStyle(elem,null)[stylename];
	}
	return realStyle;
}//获取元素的样式

function addEventSamp(obj, evt, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if(obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}// 兼容事件绑定

function removeEventSamp(obj, evt, fn) {
	if(obj.removeEventListener) {
		obj.removeEventListener(evt, fn, false);
	} else if(obj.detachEvent) {
		obj.detachEvent('on' + evt, fn);
	}
}//移除事件

function hasClass(element, className) {
	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	return element.className.match(reg);
}//检测样式

function removeClass(element, className) {
	if(hasClass(element, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		element.className = element.className.replace(reg, ' ');
	}
}//删除样式

function loadXml(fileName) {
	//@mrthink.net
	var xmlDoc = null;
	if(window.ActiveXObject) {//写给ie系
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		//这句别漏掉,否则IE系会报完成该操作所需的数据还不可用
		//xmlDoc.loadXML(fileName);//这个是用来加载xml字符串的
		xmlDoc.load(fileName);
		//如果用的是xml文件。
	} else if(document.implementation && document.implementation.createDocument) {//webkit,Geckos,Op内核的
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", fileName, false);
		//类型,文件名,是否缓存
		xmlhttp.send(null);
		xmlDoc = xmlhttp.responseXML;
	} else {
		xmlDoc = null;
	}
	return xmlDoc;
}//原生JavaScript版本