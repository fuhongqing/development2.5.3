var orgTypeArr = [];
$.ajax({
	type: "get",
	url: "http://xiangmuglapi.ehaofang.com/api/property/v1/city",
	success: function(r) {
				console.log(r);
		'success' == r.status ? ($.each(r.data, function(a) {
			orgTypeArr[a] = {
				'value': r.data[a].cityName,
				'data': r.data[a].id
			}
		}), orgTypeArr[0].open = !1) : console.log("error")
		//		console.log(orgTypeArr)
	}
});
$(function() {
    //var dataStr = 'http://xmkfapi.ehaofang.net/api';//测试url
    var dataStr = 'http://xmkfapi.ehaofang.com/api';//正式url
	var thiscityID = 1;
	
//	var thisuserID = location.search.substr(2);
//	var thisState = location.search.substr(1, 1);

	var mp = new BMap.Map("allmap", {
		minZoom: 13,
		maxZoom: 18,
		enableMapClick: false
	}); //市级视图单位缩放比zoom18
	//	var mp = new BMap.Map("allmap");
	mp.disableDoubleClickZoom();
	mp.addControl(new BMap.ScaleControl()); // 添加默认比例尺控件
	mp.addControl(new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_BOTTOM_LEFT
	})); // 左下
	mp.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
	mp.addControl(new BMap.NavigationControl({
		anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
		//type: BMAP_NAVIGATION_CONTROL_SMALL
	})); //右上角，仅包含平移和缩放按钮
    var point = new BMap.Point(121.434902, 31.266209); //上海视图
    mp.centerAndZoom(point, 14);

	mp.enableScrollWheelZoom();
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	

	var urlData = decodeURIComponent(location.search.substr(1)).split('&');
	if(urlData.length == 5){
		var thisState = urlData[0];
		var thisuserID = urlData[1];
		var thiscityID = urlData[2];
		var thispropertyName = urlData[3];
		var thisAdressName = urlData[4];
		
		$("#search").attr('value',thispropertyName);
		myGeo.getPoint(thisAdressName, function(point1){
			if (point1) {
				mp.centerAndZoom(point1, 13);//定位城市
				addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, '', '', '', thispropertyName, 1, 30,thiscityID);
				
			}
		}, thisAdressName);
		
	}else if(urlData.length == 2){
		var thisState = urlData[0];
		var thisuserID = urlData[1];
		mp.centerAndZoom(point, 14);
		addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, '', '', '', $("#search").val(), 1, 30,1);
		
	}
	
	
//部门类型选择	
$('#autocomplete').autocomplete({
	lookup: orgTypeArr,
	minChars: 0,
	onSelect: function(suggestion) {
		thiscityID = suggestion.data;
//		console.log(suggestion.value);
		var cityName = suggestion.value;
		$("#search").attr('value','');
		
		// 将地址解析结果显示在地图上，并调整地图视野
		myGeo.getPoint(cityName+'火车站', function(point){
			if (point) {
		console.log(point);
				mp.centerAndZoom(point, 13);//定位城市
	addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, '', '', '', '', 1, 30,thiscityID);
				
			}
		}, cityName);

	}
});
        
	var u = mp.getZoom(); // 定义地图缩放等级的变量
	var markerArr = [];
	var markerObj;
	//	addMarker('','','','','','','','',1,10);

	function Karea(msg) {
		if(msg) {
			return msg;
		} else {
			return "";
		}
	}
	var proSize;
	var proStr = "";
	var count = 1;
	//		var conditionNum;
	function addMarker(thisMaxLng, thisMinLng, thisMaxLat, thisMinLat, thisFollowType, thisbuildingType, thissaleValue, thispropertyName, thisPageNum, thisPageSize,thiscityID) {

		var markerArr = [];
		var markerObj = {};
		proStr = "";
		$.ajax({
			type: "get",
			url: dataStr + "/property/v1/maplist",
			async: false,
			data: {
				maxlongitude: thisMaxLng, //否	Double	最大经度
				minlongitude: thisMinLng, //否	Double	最小经度
				maxlatitude: thisMaxLat, //否	Double	最大纬度
				minlatitude: thisMinLat, //否	Double	最小纬度    
				buildingType: thisbuildingType, //否	Integer	跟进状态 1待扫盘 2 扫盘中 3 维护中 4 已提报 5 商务谈判 6 合同签订 7 无效盘
				followStatus: thisFollowType, //否	Integer	建筑类型 (此字段可多选 存储例如为 0,1,2)1别墅 2住宅 3商铺 4 商住 5其他
				totalValue: thissaleValue, //否	Integer	货值1 1亿以内 2 1-3亿 3 3-10亿 4 10亿以上
				//      			SearchStr:thispropertyName,
				pageNum: thisPageNum, //是	Integer	当前页（从1开始）
				pageSize: thisPageSize, //是	Integer	每页显示的页数
				propertyName: thispropertyName, //否	String	楼盘名
				state: thisState, //是	string	权限是否为管理员 1为个人 2为管理员（登录时获得）
				id: thisuserID, //是	Integer	维护人id
				cityId: thiscityID //是	string	cityId

			},
			success: function(data) {
//				console.log(data);
				proSize = data.data.mapListCount;
				count = 1;

				var mapList2 = data.data.mapList;
				if(mapList2.length != 0) {
					proStr = "";
					$.each(mapList2, function(i) {
						proStr +=
						'<a href="/floorDetail?propertyId=' + mapList2[i].id + '" target="_blank">' +
						'<li value="' + mapList2[i].id + '">' +
							'<div>' +
							'<p title="' + mapList2[i].name + '">' + mapList2[i].name + '</p>' +
							'<p>' + buildingType(mapList2[i].buildingType) + '</p>' +
							'</div>' +
							'<div>' +
							'<p>' + FollowType(mapList2[i].followStatus) + '</p>' +
							'<p title="' + mapList2[i].adressDetail + '">[' + mapList2[i].CityName + '-' + mapList2[i].BoroughName + ']' + mapList2[i].adressDetail + '</p>' +
							'</div>' +
							'<div>' +
							'<p>' + mapList2[i].saleValue + '亿</p>' +
							'<p>' + mapList2[i].saleHouse + '套</p>' +
							'</div>' +
							'</li>'+
							'</a>';

					});
					$(".listDiv ul").html(proStr);
				}else{
					$(".listDiv ul").html('');
					
				}
				if(mapList2.length == 1){
					var thispoint = new BMap.Point(mapList2[0].longitude, mapList2[0].latitude); 
					mp.centerAndZoom(thispoint, 13);
					
				}
				$(".listTop span").html('[' + data.data.mapListCount + "]");

				//					if ( mp.getZoom() > 13) {
				if(data.data.length != 0) {
					$.each(data.data.map, function(i) {
						markerObj = {
							title: data.data.map[i].name,
							num: data.data.map[i].count,
							id: data.data.map[i].id,
							point: data.data.map[i].longitude + '|' + data.data.map[i].latitude,
							isOpen: 0,
							icon: {
								w: 21,
								h: 21,
								l: 0,
								t: 0,
								x: 6,
								lb: 5
							}
						}
						markerArr.push(markerObj);
					});
				}
				//console.log(markerArr)

				// 复杂的自定义覆盖物
				function ComplexCustomOverlay(point, text, mouseoverText, num, id, name, areaName, citypoint, borough) {
					this._point = point;
					this._text = text;
					this._overText = mouseoverText;
					this._num = num;
					this._id = id;
					this._name = name;
					this._areaName = areaName;
					this._citypoint = citypoint;
					this._borough = borough;
				}
				ComplexCustomOverlay.prototype = new BMap.Overlay();
				ComplexCustomOverlay.prototype.initialize = function(map) {
					this._map = map;
					var div = this._div = document.createElement("div");
					div.style.position = "absolute";
					div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);

					div.style.height = "22px";
					div.style.width = "110px";
					div.style.padding = "0 5px";
					div.style.background = "#409DF4";
					div.style.boxShadow = "0 4px 6px 0 rgba(0,0,0,0.38)";
					div.style.borderRadius = "4px";
					div.style.overflow = "hidden";
					div.style.textOverflow = "ellipsis";
					div.style.whiteSpace = "nowrap";
					div.appendChild(document.createTextNode(this._name));
					div.style.color = "#fff";
					div.style.textAlign = "center";
					div.style.lineHeight = "22px";
					//						div.style.fontSize = "14px";
					div.style.cursor = "pointer";
					div.setAttribute("title", this._name);
					div.setAttribute("value", this._id);
					div.setAttribute("class", "area");
                    div.setAttribute("alt", this._name);
                    div.setAttribute("onClick", "javascript:window.open('/floorDetail?propertyId=" + this._id+"');");

                    div.onmouseover = function() {
                        div.style.background = "#ED9127";
                        $('li[value='+ $(this).attr('value') +']').css('background','#F3E7D7');
                    }
					div.onmouseout = function() {
						div.style.background = "#409DF4";
		$('li[value='+ $(this).attr('value') +']').css('background','');
					}//滑动列表条目地图标点时，列表条目地图标点高亮

					var that = this;
					var arrow = this._arrow = document.createElement("div");
					arrow.style.position = "absolute";
					//		arrow.style.width = "30px";
					//		arrow.style.height = "12px";
					arrow.style.top = "19px";
					arrow.style.left = "10px";
					arrow.style.overflow = "hidden";
					div.appendChild(arrow);


					mp.getPanes().labelPane.appendChild(div);

					return div;
				}
				ComplexCustomOverlay.prototype.draw = function() {
					var map = this._map;
					var pixel = map.pointToOverlayPixel(this._point);
					this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
					this._div.style.top = pixel.y - 30 + "px";
				}
				ComplexCustomOverlay.prototype.addEventListener = function(event, fun) { //点击事件
					this._div['on' + event] = fun;
				}

				var marker;
				var overlays = mp.getOverlays();
				var maker_arr = [];
				for(var i = 0; i < overlays.length; i++) {
					maker_arr.push(overlays[i]);
				}
				for(var i = 0; i < maker_arr.length; i++) {
					mp.removeOverlay(maker_arr[i]);
				}
				for(var i = 0; i < markerArr.length; i++) {
					var json = markerArr[i]
					var txt = markerArr[i].title;
					var num = markerArr[i].num;
					var id = markerArr[i].id;
					var name = markerArr[i]._name;
					var areaName = markerArr[i].title;
					var borough = markerArr[i].alt;
					var citypoint = markerArr[i].point;
					var pintx = markerArr[i].point.split('|')[0];
					var pinty = markerArr[i].point.split('|')[1];
					marker = new ComplexCustomOverlay(new BMap.Point(pintx, pinty), txt, txt, num, id, areaName, citypoint, borough)
					mp.addOverlay(marker);
				}

			}
		}).done(function() {
			proStr = "";
			setTimeout(function() {
				$(".map_tip").css("display", "none");
			}, 500)
			//			}).always(function(){
			//				setTimeout(function(){
			//					$(".map_tip").css("display","none");
			//				},2000)
		});
	};

	function buildingType(num) { //0 公寓 1:别墅 5:商业 6:住宅	
		//var num = num.split(",");
		var buildTypeStr = "";
		if(num.indexOf(",") != -1) {
			$.each(num.split(","), function(i) {
				buildTypeStr += "<span>" + buildMark(num.split(",")[i]) + "</span>"
			});
			return buildTypeStr;
		} else {
			return '<span>' + buildMark(num) + '</span>';
		}

		function buildMark(t) {
			switch(t) {
				case "1":
					return t = "别墅"
					break;
				case "2":
					return t = "住宅"
					break;
				case "3":
					return t = "商业"
					break;
				case "4":
					return t = "其他"
					break;
				default:
					return t = "其他"
					break;						
			}
		}
	};

	function SoldState(t) {
		switch(t) {
			case 0:
				return t = "在建";
				break;
			case 1:
				return t = "待开盘";
				break;
			case 2:
				return t = "在售";
				break;
			case 3:
				return t = "滞销";
				break;
			case 4:
				return t = "售罄";
				break;
			default:
				return t = "其他";
				break;
		}

	} //"FollowType": 1,//0 待扫盘 2，扫盘中 3， 维护中 4，已提报 5，商务谈判 6，合同签订 7，无效盘
	function FollowType(t) {
		switch(t) {
			case 1:
				return t = "待扫盘";
				break;
			case 2:
				return t = "扫盘中";
				break;
			case 3:
				return t = "维护中";
				break;
			case 4:
				return t = "已提报";
				break;
			case 5:
				return t = "商务谈判";
				break;
			case 6:
				return t = "合同签订";
				break;
			case 7:
				return t = "无效盘";
				break;
			default:
				return t = "其他";
				break;
		}
	}
	
	$('.listDiv').on('mouseover','li',function(){		
		$('div[value='+ $(this).attr('value') +']').css('background','#ED9127');
		$(this).css('background','#f0f0f0');
	}).on('mouseleave','li',function(){
		$('div[value='+ $(this).attr('value') +']').css('background','#409DF4');
		$(this).css('background','');
	})//滑动列表条目时，地图标点高亮

	$("#searchBtn").on("click", function() {
//      window.setTimeout(function(){
//			var lng1 = mp.getBounds().getNorthEast().lng;
//			var lng2 = mp.getBounds().getSouthWest().lng;
//			var lat1 = mp.getBounds().getNorthEast().lat;
//			var lat2 = mp.getBounds().getSouthWest().lat;
			addMarker( mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, $("#FollowType").val(), $("#buildingType").val(), $("#saleValue").val(), $("#search").val(), 1, 10,thiscityID);
//      },1000)
		

	})

	$("#FollowType").on("change", function() {
		addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, $(this).val(), $("#buildingType").val(), $("#saleValue").val(), $("#search").val(), 1, 10,thiscityID);
	})
	$("#buildingType").on("change", function() {
		addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, $("#FollowType").val(), $(this).val(), $("#saleValue").val(), $("#search").val(), 1, 10,thiscityID);
	})
	$("#saleValue").on("change", function() {
		addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, $("#FollowType").val(), $("#buildingType").val(), $(this).val(), $("#search").val(), 1, 10,thiscityID);
	});

	mp.addEventListener("dragend", function() {
//		$(".map_tip").css("display","block");

        window.clearTimeout(setTime)
        var setTime = window.setTimeout(function(){
			loadMaker(mp.getZoom());
        },600)
		
	});

	mp.addEventListener("zoomend", function() {

        addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, $("#FollowType").val(), $("#buildingType").val(), $("#saleValue").val(), $("#search").val(), 1, 10,thiscityID);
	});

	function loadMaker(u) {
		addMarker(mp.getBounds().getNorthEast().lng, mp.getBounds().getSouthWest().lng, mp.getBounds().getNorthEast().lat, mp.getBounds().getSouthWest().lat, $("#FollowType").val(), $("#buildingType").val(), $("#saleValue").val(), $("#search").val(), 1, 10,thiscityID);
	}

	//				var gc = new BMap.Geocoder();
	//				gc.getLocation(mp.getCenter(), function(rs){
	//				   addComp = rs.addressComponents;
	//					addMarker(addComp.city);
	//				});

	//百度api搜索地区
	function G(id) {
		return document.getElementById(id);
	}

	var ac = new BMap.Autocomplete( //建立一个自动完成的对象
		{
			"input": "suggestId",
			"location": mp
		});

	ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if(e.fromitem.index > -1) {
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

		value = "";
		if(e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
		G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		setPlace();
	});

	function setPlace() {
		//		mp.clearOverlays();    //清除地图上所有覆盖物
		function myFun() {
			var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
			mp.centerAndZoom(pp, 13);
			mp.addOverlay(new BMap.Marker(pp)); //添加标注
		}
		var local = new BMap.LocalSearch(mp, { //智能搜索
			onSearchComplete: myFun
		});
		local.search(myValue);
	}
	//list按钮控制展开收起
	$(".turn").on("click", function() {
		$(".listDiv").slideToggle();
	})
	
	
	/****************** 滚动上拉下拉加载 ***************/
	$(".listDiv ul").on("scroll", function() {

		var scrollTop = $(this).scrollTop();
		var contentH = $(this).get(0).scrollHeight;
		var viewH = $(this).height();
		if($(".listDiv ul li").length == proSize) {
			//          	console.log("加载完成！");
		} else {
			if(scrollTop + viewH + 10 == contentH) {
				//	                console.log("我到底部了");
				count++;
				$.ajax({
					type: "get",
					url: dataStr + "/property/v1/maplist",
					async: false,
					data: {
						maxlongitude: mp.getBounds().getNorthEast().lng,
						minlongitude: mp.getBounds().getSouthWest().lng,
						maxlatitude: mp.getBounds().getNorthEast().lat,
						minlatitude: mp.getBounds().getSouthWest().lat,
						buildingType: $("#buildingType").val(),
						followStatus: $("#FollowType").val(),
						totalValue: $("#saleValue").val(),
						propertyName: $("#search").val(),
						pageNum: count,
						pageSize: 10,
						state: thisState, //是	string	权限是否为管理员 1为个人 2为管理员（登录时获得）
						id: thisuserID, //是	Integer	维护人id
						cityId: thiscityID //是	string	cityId

					},
					success: function(data) {
						console.log(data);
						if (data.status == 'success') {
							proSize = data.data.mapListCount;
	
							var mapList2 = data.data.mapList;
							if(mapList2.length != 0) {
	
								$.each(mapList2, function(i) {
									proStr +=
										'<a href="/floorDetail?propertyId=' + mapList2[i].id + '"  target="_blank">' +
										'<li value="' + mapList2[i].id + '">' +
										'<div>' +
										'<p title="' + mapList2[i].name + '">' + mapList2[i].name + '</p>' +
										'<p>' + buildingType(mapList2[i].buildingType) + '</p>' +
										'</div>' +
										'<div>' +
										'<p>' + FollowType(mapList2[i].followStatus) + '</p>' +
										'<p title="' + mapList2[i].adressDetail + '">[' + mapList2[i].CityName + '-' + mapList2[i].BoroughName + ']' + mapList2[i].adressDetail + '</p>' +
										'</div>' +
										'<div>' +
										'<p>' + mapList2[i].saleValue + '亿</p>' +
										'<p>' + mapList2[i].saleHouse + '套</p>' +
										'</div>' +
										'</li>'+
										'</a>';
	
								});
							}
							$(".listDiv ul").append(proStr);
							proStr = "";
						}
													
					}

				})

			}
		}

	});
	$('#list-model').on('click',function(){
		window.open('/floorLists');
	});
});