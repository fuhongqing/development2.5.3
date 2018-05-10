$(function() {
    var isShowMore = false;
    $('#fold').click(function() {
        isShowMore = !isShowMore;
        if (isShowMore) {
            $('#filter>.moreUl').show();
            $(this).children('span').html('收起选项').end().children('img').attr('src', '../static/img/doubleUp.png');
        } else {
            $('#filter>.moreUl').hide();
            $(this).children('span').html('展开选项').end().children('img').attr('src', '../static/img/doubleDown.png');
        }
    });
    function getCitys() {
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/property/v1/cityList',
            success: function(data) {
                if (data.status == 'success') {
                    var cityData = data.data;
                    var cityHtml = '';
                    if (cityData.length > 0) {
                        $.each(cityData, function(i) {
                            cityHtml += ("\n                           <li id=\"" + cityData[i].ID + "\" class=\"city\">" + cityData[i].CityName + "</li>\n                           ");
                        });
                        $('#filter>.area>.all').after(cityHtml);
                        var moreHtml = "\n                        <li class=\"more\">\n                          <span>更多</span><img src=\"../static/img/down.png\" alt=\"\"/>\n                        </li>\n                        ";
                        if ($('#filter>.area>li').size() > 15) {
                            $('#filter>.area>li:nth-child(15)').nextAll().hide().end().after(moreHtml);
                        }
                    } else {
                        console.log('获取城市列表失败');
                    }
                }
            },
            error: function() {
                console.log('获取城市网络错误');
            }
        });
    }
    getCitys();
    var isCityMore = false;
    $('#filter>.area').on('click', 'li.more', function(e) {
        e.stopPropagation();
        isCityMore = !isCityMore;
        if (isCityMore) {
            $(this).children('span').html('收起').next('img').attr('src', '../static/img/up.png');
            $('#filter>.area>li:nth-child(16)').nextAll().show().end().next().css('margin-left', '70px');
        } else {
            $(this).children('span').html('更多').next('img').attr('src', '../static/img/down.png');
            $('#filter>.area>li:nth-child(16)').nextAll().hide();
        }
    }).on('click', 'li.city', function(e) {
        e.stopPropagation();
        $(e.target).addClass('active').siblings().removeClass('active');
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX - 90 + 'px' || e.clientX - 90 + scrollX + 'px';
        var y = e.pageY - 105 + 'px' || e.clientY - 105 + scrollY + 'px';
        if (parseFloat(x) > 535) {
            x = e.pageX + 33 - 656 + 'px' || e.clientX + scrollX + 33 - 656 + 'px';
        }
        $('#filter>.borough').css({
            left: x,
            top: y
        });
        thiscityId = $(e.target).attr('id');
        floorLists();
        $('#filter>.borough').show();
        $.ajax({
            type: 'get',
            url: cityUrl + 'api/property/v1/borough',
            data: {cityId: thiscityId},
            success: function(data) {
                if (data.status == 'success') {
                    var boroughData = data.data;
                    var boroughHtml = '';
                    if (boroughData.length > 0) {
                        $.each(boroughData, function(i) {
                            boroughHtml += ("\n                                <li id=\"" + boroughData[i].id + "\" class=\"boroughName\">" + boroughData[i].boroughName + "</li>\n                                ");
                        });
                        var labelHtml = "\n                            <li class=\"label\">区域：</li>\n                            <li class=\"all\">不限</li>\n                            ";
                        $('#borough').html(labelHtml + boroughHtml);
                    }
                } else {
                    console.log('获取区域失败');
                }
            },
            error: function() {
                console.log('获取区域网络错误');
            }
        });
    }).on('click', 'li.all', function(e) {
        $('#filter>.borough').hide();
        $(e.target).addClass('active').siblings().removeClass('active');
        thiscityId = '';
        floorLists();
    });
    $(document).click(function(e) {
        var _con = $('#filter>.borough,#filter>.area');
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('#filter>.borough').hide();
        }
    });
    var thissortType = 1,
        thiscityId = '',
        thisareaId = '',
        thisbuildType = '',
        thissaleState = '',
        thisfollowStatus = '',
        thissaleValue = '',
        thissearch = '',
        thismaintainerTimeBeg = '',
        thismaintainerTimeEnd = '',
        thispageNum = 1,
        thispageSize = 20;
    var propertyListCount,
        pageSize;
    var departmentType = '大客户服务部';
    $('header').on('click', '.btn', function(e) {
        $(e.target).addClass('btnActive').siblings().removeClass('btnActive');
        if ($(e.target).html() == '地图模式') {
            $(location).attr('href', '/propertyMap?' + thisstate + '&' + createUserid);
        }
    });
    if (thisstate == 2) {
        $("#filter>ul.weihuren").css({
            'position': 'static',
            'visibility': 'visible'
        });
    }
    function followStatus(t) {
        switch (t) {
            case 1:
                return t = '待扫盘';
                break;
            case 2:
                return t = '扫盘中';
                break;
            case 3:
                return t = '维护中';
                break;
            case 4:
                return t = '已提报';
                break;
            case 5:
                return t = '商务谈判';
                break;
            case 6:
                return t = '合同签订';
                break;
            case 7:
                return t = '无效盘';
                break;
            default:
                return t = '其他';
                break;
        }
    }
    function saleType(t) {
        switch (t) {
            case 1:
                return t = '独家代理';
                break;
            case 2:
                return t = '自销';
                break;
            case 3:
                return t = '联合代理';
                break;
            default:
                return t = '其他';
                break;
        }
    }
    function saleState(t) {
        switch (t) {
            case 1:
                return t = '待售';
                break;
            case 2:
                return t = '在售';
                break;
            case 3:
                return t = '售罄';
                break;
            default:
                return t = '其他';
                break;
        }
    }
    function buildingTypeNum(t) {
        var buildVal = t.split(',');
        var buildTypeHtml = '';
        for (var i = 0; i < buildVal.length; i++) {
            if (buildVal[i] == '1') {
                buildTypeHtml += "\n                     <span class=\"buildBtn\">别墅</span>\n                ";
            } else if (buildVal[i] == '2') {
                buildTypeHtml += "\n                     <span class=\"buildBtn\">住宅</span>\n                ";
            } else if (buildVal[i] == '3') {
                buildTypeHtml += "\n                     <span class=\"buildBtn\">商业</span>\n                ";
            } else {
                buildTypeHtml += "\n                     <span class=\"buildBtn\">其他</span>\n                ";
            }
        }
        return buildTypeHtml;
    }
    function floorLists() {
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/property/v1/propertyList',
            data: {
                state: thisstate,
                sortType: thissortType,
                cityId: thiscityId,
                areaId: thisareaId,
                buildType: thisbuildType,
                saleStates: thissaleState,
                followStatus: thisfollowStatus,
                saleValue: thissaleValue,
                search: thissearch,
                maintainerTimeBeg: thismaintainerTimeBeg,
                maintainerTimeEnd: thismaintainerTimeEnd,
                maintainerId: maintainerId,
                pageNum: thispageNum,
                pageSize: thispageSize
            },
            success: function(data) {
                if (data.status == 'success') {
                    propertyListCount = data.data.propertyListCount;
                    pageSize = Math.ceil(propertyListCount / 20);
                    if (propertyListCount == 0) {
                        $('#pageNum').html('');
                    }
                    var floorListData = data.data.propertyList;
                    var floorListHtml = '';
                    if (floorListData.length > 0) {
                        $.each(floorListData, function(i) {
                            var buildTypeNum = floorListData[i].buildingType;
                            if (!floorListData[i].BoroughName) {
                                floorListData[i].BoroughName = '';
                            }
                            if (!floorListData[i].CityName) {
                                floorListData[i].CityName = '';
                            }
                            if (!floorListData[i].FullName) {
                                floorListData[i].FullName = '';
                            }
                            if (floorListData[i].saleValue == null) {
                                floorListData[i].saleValue = '';
                            }
                            if (floorListData[i].saleHouse == null) {
                                floorListData[i].saleHouse = '';
                            }
                            floorListHtml += ("\n                            <tr id=\"" + floorListData[i].id + "\">\n                                <td class=\"clear\">\n                                    <div>" + floorListData[i].name + "</div>\n                                    <div class=\"gt\">" + buildingTypeNum(buildTypeNum) + "<span class=\"soldBtn\">" + saleState(floorListData[i].saleStatus) + "</span></div>\n                                    <div class=\"" + floorListData[i].latitude + "\" id=\"" + floorListData[i].longitude + "\"><span class=\"name\">" + floorListData[i].developerShortName + "</span></div>\n                                </td>\n                                <td class=\"" + floorListData[i].areaId + "\" id=\"" + floorListData[i].cityId + "\">" + floorListData[i].CityName + "-" + floorListData[i].BoroughName + "</td>\n                                <td>" + followStatus(floorListData[i].followStatus) + "</td>\n                                <td>" + floorListData[i].saleHouse + "套</td>\n                                <td>" + floorListData[i].saleValue + "亿</td>\n                                <td>" + saleType(floorListData[i].saleType) + "</td>\n                                <td>" + floorListData[i].maintainerTime + "</td>\n                                <td id=\"" + floorListData[i].maintainerId + "\">" + floorListData[i].FullName + "</td>\n                            </tr>\n                            ");
                        });
                        $('#tblLists>tbody').html(floorListHtml);
                        var pageHtml = '',
                            styleHtml = '';
                        if (pageSize == 0) {
                            pageSize = 1;
                        }
                        if (pageSize < 7) {
                            for (var i = 1; i <= pageSize; i++) {
                                pageHtml += ("\n                           <li><a class=\"" + i + "\">" + i + "</a></li>\n                         ");
                            }
                            $('#pageNum').html(pageHtml);
                        } else {
                            styleHtml += ("\n                          <li><a class=\"1\">1</a></li>\n                          <li><a class=\"2\">2</a></li>\n                          <li><a class=\"3\">3</a></li>\n                          <li><a class=\"4\">4</a></li>\n                          <li class=\"more\"><a>...</a></li>\n                          <li class=\"gtFour\"><a></a></li>\n                          <li class=\"nextMore\"><a>...</a></li>\n                          <li><a class=\"" + pageSize + "\">" + pageSize + "</a></li>\n                        ");
                            $('#pageNum').html(styleHtml);
                        }
                        $('#pageNum>li>a.' + thispageNum).parent().addClass('active');
                        if (thispageNum >= pageSize) {
                            thispageNum = pageSize;
                            $('#pages>ul>li.next').addClass('disabled');
                            $('#pageNum>li:last-child').addClass('active');
                            $('#pageNum>li.nextMore').hide();
                            $('#pageNum>li.gtFour').hide();
                        } else if (thispageNum > 4) {
                            $('#pageNum>li.gtFour').show().addClass('active').siblings().removeClass('active').end().children('a').html(thispageNum).addClass(thispageNum);
                            $('#pageNum>li.nextMore').show();
                        }
                    } else {
                        $('#tblLists>tbody').html('');
                    }
                } else {
                    alert(data.info || '获取楼盘列表失败');
                }
            },
            error: function() {
                console.log('获取楼盘列表网络错误');
            }
        });
    }
    floorLists();
    $('#weihuDrop').on('click', function(e) {
        $.ajax({
            type: 'get',
            url: weihuUrl + 'api/outside/dept-users',
            data: {departmentType: departmentType},
            success: function(data) {
                if (data.status == 'success') {
                    var result = data.data;
                    if (result.length > 0) {
                        var weihurenHtml = '';
                        $.each(result, function(i) {
                            weihurenHtml += ("\n                         <li id=\"" + result[i].userId + "\" role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" >" + result[i].userName + "</a></li>\n                            ");
                        });
                        $('#weihuDropMenu').html(weihurenHtml);
                    }
                } else {
                    alert(data.info || '获取维护人失败');
                }
            },
            error: function() {
                console.log('获取维护人网络错误');
            }
        });
    });
    $('#weihuDropMenu').on('click', 'a', function(e) {
        maintainerId = $(e.target).parent().attr('id');
        floorLists();
    });
    $('#filter>.borough').on('click', 'li.boroughName', function(e) {
        e.stopPropagation();
        $(e.target).addClass('active').siblings().removeClass('active');
        thisareaId = $(e.target).attr('id');
        floorLists();
        $('#filter>.borough').hide();
    });
    $('#borough').on('click', '.all', function(e) {
        $('#filter>.borough').hide();
        $(e.target).addClass('active').siblings().removeClass('active');
        thisareaId = '';
        floorLists();
    });
    $('#filter>.buildingType').on('click', 'li:not(.label)', function(e) {
        $(e.target).addClass('active').siblings().removeClass('active');
        if ($(e.target).hasClass('all')) {
            thisbuildType = '';
            floorLists();
        } else {
            thisbuildType = $(e.target).index() - 1;
            floorLists();
        }
    });
    $('#filter>.saleStatus').on('click', 'li:not(.label)', function(e) {
        $(e.target).addClass('active').siblings().removeClass('active');
        if ($(e.target).hasClass('all')) {
            thissaleState = '';
            floorLists();
        } else {
            thissaleState = $(e.target).index() - 1;
            floorLists();
        }
    });
    $('#filter>.followStatus').on('click', 'li:not(.label)', function(e) {
        $(e.target).addClass('active').siblings().removeClass('active');
        if ($(e.target).hasClass('all')) {
            thisfollowStatus = '';
            floorLists();
        } else {
            thisfollowStatus = $(e.target).index() - 1;
            floorLists();
        }
    });
    $('#filter>.totalCount').on('click', 'li:not(.label)', function(e) {
        $(e.target).addClass('active').siblings().removeClass('active');
        if ($(e.target).hasClass('all')) {
            thissaleValue = '';
            floorLists();
        } else {
            thissaleValue = $(e.target).index() - 1;
            floorLists();
        }
    });
    $('#weihuTimeSure').on('click', function() {
        thismaintainerTimeBeg = $('#weihuTimeStart').val();
        thismaintainerTimeEnd = $('#weihuTimeEnd').val();
        if (thismaintainerTimeEnd == '') {
            thismaintainerTimeEnd = new Date().toLocaleDateString();
        }
        floorLists();
    });
    var isCountOrder = false;
    $('#tblLists>thead').on('click', '.count', function() {
        isCountOrder = !isCountOrder;
        if (isCountOrder) {
            thissortType = 2;
            floorLists();
            $('#tblLists>thead .count .upImg').attr('src', '../static/img/selectUp.png');
            $('#tblLists>thead .count .downImg').attr('src', '../static/img/selectDown-a.png');
        } else {
            thissortType = 3;
            floorLists();
            $('#tblLists>thead .count .upImg').attr('src', '../static/img/selectUp-a.png');
            $('#tblLists>thead .count .downImg').attr('src', '../static/img/selectDown.png');
        }
    });
    var isTotalVal = false;
    $('#tblLists>thead').on('click', '.totalVal', function() {
        isTotalVal = !isTotalVal;
        if (isTotalVal) {
            thissortType = 4;
            floorLists();
            $('#tblLists>thead .totalVal .upImg').attr('src', '../static/img/selectUp.png');
            $('#tblLists>thead .totalVal .downImg').attr('src', '../static/img/selectDown-a.png');
        } else {
            thissortType = 5;
            floorLists();
            $('#tblLists>thead .totalVal .upImg').attr('src', '../static/img/selectUp-a.png');
            $('#tblLists>thead .totalVal .downImg').attr('src', '../static/img/selectDown.png');
        }
    });
    var isWeihu = false;
    $('#tblLists>thead').on('click', '.weihu', function() {
        isWeihu = !isWeihu;
        if (isWeihu) {
            thissortType = 6;
            floorLists();
            $('#tblLists>thead .weihu .upImg').attr('src', '../static/img/selectUp.png');
            $('#tblLists>thead .weihu .downImg').attr('src', '../static/img/selectDown-a.png');
        } else {
            thissortType = 7;
            floorLists();
            $('#tblLists>thead .weihu .upImg').attr('src', '../static/img/selectUp-a.png');
            $('#tblLists>thead .weihu .downImg').attr('src', '../static/img/selectDown.png');
        }
    });
    $('#search').on('click', '.add-on', function() {
        thissearch = $('#searchInput').val();
        floorLists();
        $('#searchInput').val('');
    });
    $(window).keydown(function(e) {
        if (e.which == '13') {
            event.returnValue = false;
            event.cancel = true;
            $('#search span.add-on').click();
        }
    });
    $('#tblLists>tbody').on('click', 'tr', function() {
        var floorId = $(this).attr('id');
        $(location).attr('href', '/floorDetail?propertyId=' + floorId);
    });
    $('#pageNum').on('click', 'li:not(.more)>a', function(e) {
        $(e.target).parent().addClass('active').siblings().removeClass('active');
        thispageNum = $(e.target).html();
        floorLists();
        if (thispageNum <= 4) {
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if (thispageNum >= propertyListCount) {
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if (thispageNum == 1) {
            $('#pages>ul>li.prev').addClass('disabled').siblings().removeClass('disabled');
        } else {
            $('#pages>ul>li.prev').removeClass('disabled');
        }
        if (thispageNum == propertyListCount) {
            $('#pages>ul>li.next').addClass('disabled').siblings().removeClass('disabled');
        } else {
            $('#pages>ul>li.next').removeClass('disabled');
        }
    });
    $('#pages>ul>li.next').on('click', 'a', function(e) {
        thispageNum++;
        floorLists();
        $('#pages>ul>li.prev').removeClass('disabled');
        if (thispageNum <= 4) {
            $('#pageNum>li.active').removeClass('active').next().addClass('active');
        }
    });
    $('#pages>ul>li.prev').on('click', 'a', function(e) {
        thispageNum--;
        floorLists();
        $('#pages>ul>li.next').removeClass('disabled');
        if (thispageNum < 5) {
            $('#pageNum>li.gtFour').hide();
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.active').removeClass('active').prev().addClass('active');
            if ($('#pageNum>li.more').hasClass('active')) {
                $('#pageNum>li.more').removeClass('active').prev().addClass('active');
            }
        } else {
            $('#pageNum>li.gtFour').show().addClass('active').siblings().removeClass('active').end().children('a').html(thispageNum).addClass(thispageNum);
            $('#pageNum>li.nextMore').show();
        }
        if (thispageNum <= 1) {
            thispageNum = 1;
            $('#pages>ul>li.prev').addClass('disabled');
            $('#pageNum>li:first-child').addClass('active');
        }
    });
});