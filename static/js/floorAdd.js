$(function() {
    var thisName,
        thisCityId,
        thisAreaId,
        thisAdressDetail,
        thisDeveloperFullName,
        thisDeveloperShortName,
        thisBuildingType,
        thisSaleStatus,
        thisMortgagePledge,
        thisConstructionProgress,
        thisIsLoan,
        thisIsSign,
        thisMaintainerId = createUserid,
        thisLongitude,
        thisLatitude,
        thisTotalValue,
        thisSaleValue,
        thisTotalArea,
        thisSaleArea,
        thisTotalHouse,
        thisSaleHouse,
        thisMinPrice,
        thisMaxPrice,
        thisMinAllPrice,
        thisMaxAllPrice,
        thisMinRecordPrice,
        thisMaxRecordPrice,
        thisMinFloorPrice,
        thisMaxFloorPrice,
        thisExperience,
        thisPermitForpresale,
        thisTermofValidity,
        thisOpenPropertyDate,
        thisCreateUserId = createUserid,
        thisUpdateUserId = createUserid,
        thisAgencyName,
        thisSaleType,
        thisFristAgentTime,
        thisEndAgentTime,
        thisAcceptSaleType,
        thisCommissionMethod,
        thisPartySupport,
        thisBond,
        thisGroupPurchase,
        thisEmergencyDegree,
        thisFollowEffect,
        thisLinkname,
        thisTelephone,
        thisPosition,
        thisCompeteDate,
        thisLandArea,
        thisStartingPrice,
        thisBidPrice,
        thisVolumetricRate,
        thisFloorPrice,
        thisLandNature,
        thisPropertyRightLife,
        thisManagmentCompany,
        thisCompletionTime,
        thisPropertyType,
        thisEarliestProvide,
        thisPlotRatio,
        thisGreeningRatio,
        thisPlanHouseholds,
        thisPropertyFee,
        thisParkingNumber,
        thisDecorationStatus,
        thisBuildingNumber,
        thisSupportingFacilities,
        thisStructureArea,
        thisFloorArea,
        thisBusinessCircle;
    function addSubmit() {
        thisName = $('#projectName').val();
        thisDeveloperFullName = $('#developer').val();
        thisDeveloperShortName = $('#abbreviation').val();
        thisSaleStatus = $('#saleStatusMenu>li.active').index() + 1;
        thisMortgagePledge = $('#mortgageMenu>li.active').index() + 1;
        thisConstructionProgress = $('#buildProgressMenu>li.active').index() + 1;
        thisIsLoan = $('#isLoanMenu>li.active').index() + 1;
        thisIsSign = $('#isSignMenu>li.active').index() + 1;
        thisTotalValue = $('#totalPrice').val();
        thisSaleValue = $('#availablePrice').val();
        thisTotalArea = $('#totalArea').val();
        thisSaleArea = $('#availableArea').val();
        thisTotalHouse = $('#totalSet').val();
        thisSaleHouse = $('#availableSet').val();
        thisMinPrice = $('#lowPrice').val();
        thisMaxPrice = $('#highPrice').val();
        thisMinAllPrice = $('#lowTotalPrice').val();
        thisMaxAllPrice = $('#highTotalPrice').val();
        thisMinRecordPrice = $('#lowRecordPrice').val();
        thisMaxRecordPrice = $('#highRecordPrice').val();
        thisMinFloorPrice = $('#bottomLowPrice').val();
        thisMaxFloorPrice = $('#bottomHighPrice').val();
        thisExperience = $('#experienceMenu>li.active').index() + 1;
        thisPermitForpresale = $('#permitCode').val();
        thisTermofValidity = $('#permitTime').val();
        thisOpenPropertyDate = $('#openTime').val();
        thisSaleType = $('#saleModelMenu>li.active').index() + 1;
        thisAcceptSaleType = $('#acceptSaleTypeMenu>li.active').index() + 1;
        thisCommissionMethod = $('#commissionMethodMenu>li.active').index() + 1;
        thisBond = $('#promiseMenu>li.active').index() + 1;
        thisGroupPurchase = $('#groupSituationMenu>li.active').index() + 1;
        thisEmergencyDegree = $('#urgencyMenu>li.active').index() + 1;
        thisFollowEffect = $('#followUpMenu>li.active').index() + 1;
        thisCompeteDate = $('#competitiveDate').val();
        thisLandArea = $('#buildingArea').val();
        thisStartingPrice = $('#startingPrice').val();
        thisBidPrice = $('#competitivePrice').val();
        thisVolumetricRate = $('#plotRatioStart').val();
        thisFloorPrice = $('#floorPrice').val();
        thisLandNature = $('#landTypeMenu>li.active').index() + 1;
        thisPropertyRightLife = $('#rightYears').val();
        thisManagmentCompany = $('#propertyCompany').val();
        thisCompletionTime = $('#completionTime').val();
        thisPropertyType = $('#propertyTypeMenu>li.active').index() + 1;
        thisEarliestProvide = $('#checkRoom').val();
        thisPlotRatio = $('#plotRatio').val();
        thisGreeningRatio = $('#afforestationRate').val();
        thisPlanHouseholds = $('#planningHouse').val();
        thisPropertyFee = $('#floorManagement').val();
        thisParkingNumber = $('#parkingSpace').val();
        thisDecorationStatus = $('#decorateMenu>li.active').index() + 1;
        thisBuildingNumber = $('#storiedBuilding').val();
        thisSupportingFacilities = $('#completeSet').val();
        thisStructureArea = $('#constructionArea').val();
        thisFloorArea = $('#coversArea').val();
        thisBusinessCircle = $('#businessCircle').val();
        $.ajax({
            type: 'post',
            url: floorUrl + 'api/property/v1/addproperty',
            data: {
                name: thisName,
                cityId: thisCityId,
                areaId: thisAreaId,
                adressDetail: thisAdressDetail,
                developerFullName: thisDeveloperFullName,
                developerShortName: thisDeveloperShortName,
                buildingType: thisBuildingType,
                saleStatus: thisSaleStatus,
                mortgagePledge: thisMortgagePledge,
                constructionProgress: thisConstructionProgress,
                isLoan: thisIsLoan,
                isSign: thisIsSign,
                maintainerId: thisMaintainerId,
                longitude: thisLongitude,
                latitude: thisLatitude,
                totalValue: thisTotalValue,
                saleValue: thisSaleValue,
                totalArea: thisTotalArea,
                saleArea: thisSaleArea,
                totalHouse: thisTotalHouse,
                saleHouse: thisSaleHouse,
                minPrice: thisMinPrice,
                maxPrice: thisMaxPrice,
                minAllPrice: thisMinAllPrice,
                maxAllPrice: thisMaxAllPrice,
                minRecordPrice: thisMinRecordPrice,
                maxRecordPrice: thisMaxRecordPrice,
                minFloorPrice: thisMinFloorPrice,
                maxFloorPrice: thisMaxFloorPrice,
                experience: thisExperience,
                permitForpresale: thisPermitForpresale,
                termofValidity: thisTermofValidity,
                openPropertyDate: thisOpenPropertyDate,
                createUserId: thisCreateUserId,
                updateUserId: thisUpdateUserId,
                agencyName: thisAgencyName,
                saleType: thisSaleType,
                fristAgentTime: thisFristAgentTime,
                endAgentTime: thisEndAgentTime,
                acceptSaleType: thisAcceptSaleType,
                commissionMethod: thisCommissionMethod,
                partySupport: thisPartySupport,
                bond: thisBond,
                groupPurchase: thisGroupPurchase,
                emergencyDegree: thisEmergencyDegree,
                followEffect: thisFollowEffect,
                linkname: thisLinkname,
                telephone: thisTelephone,
                position: thisPosition,
                competeDate: thisCompeteDate,
                landArea: thisLandArea,
                startingPrice: thisStartingPrice,
                bidPrice: thisBidPrice,
                volumetricRate: thisVolumetricRate,
                floorPrice: thisFloorPrice,
                landNature: thisLandNature,
                propertyRightLife: thisPropertyRightLife,
                managmentCompany: thisManagmentCompany,
                completionTime: thisCompletionTime,
                propertyType: thisPropertyType,
                earliestProvide: thisEarliestProvide,
                plotRatio: thisPlotRatio,
                greeningRatio: thisGreeningRatio,
                planHouseholds: thisPlanHouseholds,
                propertyFee: thisPropertyFee,
                parkingNumber: thisParkingNumber,
                decorationStatus: thisDecorationStatus,
                buildingNumber: thisBuildingNumber,
                supportingFacilities: thisSupportingFacilities,
                structureArea: thisStructureArea,
                floorArea: thisFloorArea,
                businessCircle: thisBusinessCircle
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('新增楼盘成功,2秒后跳转楼盘列表');
                    setTimeout(function() {
                        $(location).attr('href', '/floorLists');
                    }, 2000);
                } else {
                    alert('新增楼盘失败');
                }
            },
            error: function() {
                console.log('网络错误');
            }
        });
    }
    var buildArr = [],
        buildIndex = [];
    $('#buildingTypeMenu').on('click', 'li', function() {
        var curIndex = $(this).index() + 1;
        if (buildIndex.indexOf(curIndex) == -1) {
            buildIndex.push(curIndex);
        } else {
            return;
        }
        $(this).children('img').show();
        var aHtml = '';
        var buildName = $(this).children('div').text();
        if (buildArr.indexOf(buildName) == -1) {
            buildArr.push(buildName);
        } else {
            return;
        }
        $.each(buildArr, function(i) {
            aHtml += ("\n    <a><span>" + buildArr[i] + "</span><img class=\"delete\" src=\"../static/img/delete.png\" alt=\"\"/></a>\n    ");
        });
        $('#buildingType').html(aHtml);
        $('#buildingType>a>img').hover(function(e) {
            $(e.target).attr('src', '../static/img/delete-hover.png').css({
                top: 0,
                right: 0
            });
        }, function(e) {
            $(e.target).attr('src', '../static/img/delete.png').css({
                top: '2px',
                right: '2px'
            });
        });
    });
    $('#buildingType').on('click', 'img.delete', function(e) {
        $(e.target).parent().remove();
        var deleteName = $(e.target).prev().text();
        buildArr.remove(deleteName);
        if (buildArr.length == 0) {
            $('#buildingType').html('请选择（多选）');
        }
        switch (deleteName) {
            case '别墅':
                buildIndex.remove('1');
                $('#buildingTypeMenu>.right0>img').hide();
                break;
            case '住宅':
                buildIndex.remove('2');
                $('#buildingTypeMenu>.right1>img').hide();
                break;
            case '商业':
                buildIndex.remove('3');
                $('#buildingTypeMenu>.right2>img').hide();
                break;
            case '其他':
                buildIndex.remove('4');
                $('#buildingTypeMenu>.right3>img').hide();
                break;
            default:
                break;
        }
    });
    $(document).click(function(e) {
        var _con = $('#buildingType,#buildingTypeMenu,#suggestMenu');
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('#buildingTypeMenu,#suggestMenu').hide();
        }
    });
    $('#buildingType').on('click', function() {
        $('#buildingTypeMenu').show();
        $(this).css('border-color', '#ccc').parent().parent().parent().next().css('visibility', 'hidden');
    });
    $('#boroughDrop,#saleStatus').on('click', function() {
        $(this).css('border-color', '#ccc').parent().parent().parent().parent().next().css('visibility', 'hidden');
    });
    var map = new BMap.Map("attrMap", {
        minZoom: 7,
        maxZoom: 19
    });
    var point = new BMap.Point(121.351868, 31.228855);
    map.centerAndZoom(point, 10);
    map.enableScrollWheelZoom(true);
    map.enableDragging();
    var myIcon = new BMap.Icon("../static/img/circle.png", new BMap.Size(95, 95));
    var marker = new BMap.Marker(point, {icon: myIcon});
    map.addOverlay(marker);
    marker.enableDragging();
    map.panTo(point);
    marker.addEventListener("dragend", function(e) {
        map.panTo(new BMap.Point(e.point.lng, e.point.lat));
        new BMap.Geocoder().getLocation(new BMap.Point(e.point.lng, e.point.lat), function(rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            $('#suggestId').val(address);
        });
    });
    $('#mapCityName').blur(function() {
        map.centerAndZoom($('#mapCityName').val(), 10);
    });
    $('#mapBorough').click(function() {
        $('#mapBoroughMenu').show();
    });
    $('#boroughDrop').click(function() {
        $('#boroughMenu').show();
    });
    $('#mapBoroughMenu').on('click', 'a', function(e) {
        e.stopPropagation();
        $('#boroughDrop>a>span').html($(e.target).html()).css('color', '#333');
        $('#mapBorough>a>span').html($(e.target).html()).css('color', '#333');
        $('#mapBoroughMenu').hide();
        thisAreaId = $(e.target).parent().attr('class');
        map.centerAndZoom($('#mapCityName').val() + $(e.target).html(), 10);
    });
    var localSearch = new BMap.LocalSearch(map);
    localSearch.enableAutoViewport();
    function searchByStationName(keyword) {
        localSearch.setSearchCompleteCallback(function(searchResult) {
            var poi = searchResult.getPoi(0);
            thisLongitude = poi.point.lng;
            thisLatitude = poi.point.lat;
        });
        localSearch.search(keyword);
    }
    var suggestStr = '',
        region;
    $('#suggestId').focus(function() {
        $(this).css('border-color', '#ccc');
    });
    $('#suggestId').keyup(function() {
        suggestStr = $('#suggestId').val();
        region = $('#mapCityName').val() || $('#cityName').val();
        map.centerAndZoom(suggestStr, 10);
        $.ajax({
            url: 'http://api.map.baidu.com/place/v2/suggestion',
            type: 'GET',
            data: {
                query: suggestStr,
                region: region,
                city_limit: 'true',
                output: 'json',
                ak: 'CB2ede775afeb6e413abd40261396a69'
            },
            dataType: 'jsonP',
            success: function(data) {
                if (data.message == 'ok') {
                    $('#suggestMenu').show();
                    var resultData = data.result;
                    var suggestHtml = '';
                    $.each(resultData, function(i) {
                        suggestHtml += ("\n                        <li id=\"" + resultData[i].location.lng + "\" class=\"" + resultData[i].location.lat + "\">" + resultData[i].name + "</li>\n                        ");
                    });
                    $('#suggestMenu').html(suggestHtml);
                } else {
                    console.log('无匹配信息');
                }
            },
            error: function() {
                console.log('请求地图网络出错');
            }
        });
    });
    $('#suggestMenu').on('click', 'li', function(e) {
        $('#suggestMenu').hide();
        $('#suggestId').val($(e.target).html());
        map.clearOverlays();
        var suggestLat,
            suggestLng;
        suggestLng = $(e.target).attr('id');
        suggestLat = $(e.target).attr('class');
        var newPoint = new BMap.Point(suggestLng, suggestLat);
        map.centerAndZoom($(e.target).text(), 10);
        var marker = new BMap.Marker(newPoint, {icon: myIcon});
        map.addOverlay(marker);
        marker.enableDragging();
        marker.addEventListener("dragend", function(e) {
            map.panTo(new BMap.Point(e.point.lng, e.point.lat));
            new BMap.Geocoder().getLocation(new BMap.Point(e.point.lng, e.point.lat), function(rs) {
                var addComp = rs.addressComponents;
                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                $('#suggestId').val(address);
            });
        });
    });
    $('#mapAttress').click(function() {
        $('#mapAttress>div').css('visibility', 'visible');
    });
    $('#confirm>span:last-child').click(function(e) {
        e.stopPropagation();
        $('#mapAttress>div').css('visibility', 'hidden');
        $('#mapCityName').val('');
        $('#suggestId').val('');
        $('#mapBorough>a>span').html('请选择');
    });
    $('#confirm>span:first-child').click(function(e) {
        e.stopPropagation();
        if ($('#suggestId').val() == '') {
            $('#suggestId').css('border-color', '#FF4949');
            alert('详细地址不能为空');
            return;
        } else {
            thisAdressDetail = $('#suggestId').val();
            $('#mapAttress>p').html(thisAdressDetail);
            searchByStationName(thisAdressDetail);
            $('#mapAttress>div').css('visibility', 'hidden');
        }
    });
    $('#cityName').keyup(function() {
        var cityName = $(this).val();
        $.ajax({
            type: 'get',
            url: cityUrl + 'api/property/v1/city',
            data: {searchstr: cityName},
            success: function(data) {
                if (data.status == 'success') {
                    var result = data.data;
                    if (result.length > 0) {
                        $('#cityNameMenu').show();
                        var cityNameHtml = '';
                        $.each(result, function(i) {
                            cityNameHtml += ("\n                        <li class=\"" + result[i].id + "\">" + result[i].cityName + "</li>\n                        ");
                        });
                        $('#cityNameMenu').html(cityNameHtml);
                    }
                } else {
                    alert(data.info || '查询失败');
                }
            },
            error: function() {
                console.log('查询城市网络错误');
            }
        });
    });
    $('#cityNameMenu').on('click', 'li', function() {
        thisCityId = $(this).attr('class');
        $('#cityName').val($(this).html());
        $('#mapCityName').val($(this).html());
        map.centerAndZoom($(this).html(), 10);
        $('#cityNameMenu').hide();
        $.ajax({
            type: 'get',
            url: cityUrl + 'api/property/v1/borough',
            data: {cityId: thisCityId},
            success: function(data) {
                if (data.status == 'success') {
                    var result = data.data;
                    if (result.length > 0) {
                        var boroughHtml = '';
                        $.each(result, function(i) {
                            boroughHtml += ("\n                        <li class=\"" + result[i].id + "\" role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" >" + result[i].boroughName + "</a></li>\n                        ");
                        });
                        $('#boroughMenu').html(boroughHtml);
                        $('#mapBoroughMenu').html(boroughHtml);
                    }
                } else {
                    alert(data.info || '查询失败');
                }
            },
            error: function() {
                console.log('查询区域网络错误');
            }
        });
        var propertyName = $('#projectName').val();
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/property/v1/judgePropertyName',
            data: {
                propertyName: propertyName,
                cityId: thisCityId
            },
            success: function(data) {
                if (data.status == 'exist') {
                    alert('楼盘名重复');
                    return;
                }
            },
            error: function() {
                console.log('项目名验重网络错误');
            }
        });
    });
    $('#boroughMenu').on('click', 'a', function(e) {
        e.stopPropagation();
        thisAreaId = $(e.target).parent().attr('class');
        $('#mapBorough>a>span').html($(e.target).html()).css('color', '#333');
        $('#boroughDrop>a>span').html($(e.target).html()).css('color', '#333');
        $('#boroughMenu').hide();
        map.centerAndZoom($(e.target).html(), 10);
    });
    $('#mapCityName').keyup(function() {
        var cityName = $(this).val();
        $.ajax({
            type: 'get',
            url: cityUrl + 'api/property/v1/city',
            data: {searchstr: cityName},
            success: function(data) {
                if (data.status == 'success') {
                    var result = data.data;
                    if (result.length > 0) {
                        $('#mapCityNameMenu').show();
                        var mapCityNameHtml = '';
                        $.each(result, function(i) {
                            mapCityNameHtml += ("\n                        <li class=\"" + result[i].id + "\">" + result[i].cityName + "</li>\n                        ");
                        });
                        $('#mapCityNameMenu').html(mapCityNameHtml);
                    }
                } else {
                    alert(data.info || '查询失败');
                }
            },
            error: function() {
                console.log('查询城市网络错误');
            }
        });
    });
    $('#mapCityNameMenu').on('click', 'li', function() {
        $('#mapCityName').val($(this).html());
        $('#cityName').val($(this).html());
        $('#mapCityNameMenu').hide();
        thisCityId = $(this).attr('class');
        $.ajax({
            type: 'get',
            url: cityUrl + 'api/property/v1/borough',
            data: {cityId: thisCityId},
            success: function(data) {
                if (data.status == 'success') {
                    var result = data.data;
                    if (result.length > 0) {
                        var mapBoroughHtml = '';
                        $.each(result, function(i) {
                            mapBoroughHtml += ("\n                        <li class=\"" + result[i].id + "\" role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" >" + result[i].boroughName + "</a></li>\n                        ");
                        });
                        $('#boroughMenu').html(mapBoroughHtml);
                        $('#mapBoroughMenu').html(mapBoroughHtml);
                    }
                } else {
                    alert(data.info || '查询失败');
                }
            },
            error: function() {
                console.log('查询区域网络错误');
            }
        });
    });
    $('#cityName').focus(function() {
        $('#boroughDrop>a>span').html('请选择');
        $('#mapBorough>a>span').html('请选择');
    });
    $('#mapCityName').focus(function() {
        $('#mapBorough>a>span').html('请选择');
        $('#boroughDrop>a>span').html('请选择');
    });
    $('#basicInfo>footer>span').click(function() {
        if ($('#projectName').val() == '') {
            $('#projectName').css('border-color', '#FF4949').parent().parent().parent().next().css('visibility', 'visible');
            alert('请填写项目名称');
            return;
        }
        if ($('#cityName').val() == '') {
            $('#cityName').css('border-color', '#FF4949').parent().parent().parent().next().css('visibility', 'visible');
            alert('请填写城市名');
            return;
        }
        if ($('#boroughDrop>a>span').html() == '请选择') {
            $('#boroughDrop').css('border-color', '#FF4949').parent().parent().parent().parent().next().css('visibility', 'visible');
            alert('请选择区域');
            return;
        }
        if ($('#suggestId').val() == '') {
            $('#mapAttress>div').css('visibility', 'visible');
            $('#suggestId').css('border-color', '#FF4949');
            alert('请填写详细地址');
            return;
        }
        if ($('#developer').val() == '') {
            $('#developer').css('border-color', '#FF4949').parent().parent().parent().next().css('visibility', 'visible');
            alert('请填写开发商全称');
            return;
        }
        if ($('#abbreviation').val() == '') {
            $('#abbreviation').css('border-color', '#FF4949').parent().parent().parent().next().css('visibility', 'visible');
            alert('请填写开发商简称');
            return;
        }
        if ($('#buildingType').html() == '请选择（多选）') {
            $('#buildingType').css('border-color', '#FF4949').parent().parent().parent().next().css('visibility', 'visible');
            alert('请选择建筑类型');
            return;
        }
        if ($('#saleStatus>a>span').html() == '请选择') {
            $('#saleStatus').css('border-color', '#FF4949').parent().parent().parent().parent().next().css('visibility', 'visible');
            alert('请选择在售状态');
            return;
        }
        thisBuildingType = buildIndex.join(',');
        $('#basicInfo').hide();
        $('#countContent').show();
    });
    $('input.mustNum').blur(function(e) {
        if (!/^[0-9]*$/.test($.trim($(e.target).val()))) {
            alert('请输入合法数值');
            return;
        }
    });
    $('#countContent>footer>span:last-child').click(function() {
        $('#basicInfo').show();
        $('#countContent').hide();
    });
    $('#countContent>footer>span.gt').click(function() {
        $('#countContent').hide();
        $('#cooprate').show();
    });
    var acceptName = '';
    $('#saleModelMenu').on('click', 'a', function(e) {
        acceptName = $(e.target).html();
        if (acceptName == '独家代理') {
            $('#agent0').show();
        } else {
            $('.agentRow').hide();
        }
    });
    var agentCount = 0,
        agentIdCount = 0;
    var agentNameArr = [],
        agentTimeSArr = [],
        agentTimeEArr = [];
    $('#agent0').on('click', 'img.add', function() {
        agentCount += 1;
        agentIdCount += 1;
        if (agentCount >= 5) {
            agentCount = 5;
            alert('最多只能添加5条');
        } else {
            var agentHtml = ("\n        <div id=\"agent" + agentIdCount + "\" class=\"agentRow sui-row-fluid\">\n                <div class=\"span6 tipControl\">\n                    <form class=\"sui-form form-horizontal\">\n                        <div class=\"control-group\">\n                            <label class=\"control-label\">代理公司名</label>\n                            <div class=\"controls\">\n                                <input type=\"text\" id=\"agentCompany" + agentIdCount + "\" class=\"focusInput\" placeholder=\"请输入内容\"/>\n                            </div>\n                            <img src=\"../static/img/must.png\" alt=\"\"/>\n                        </div>\n                    </form>\n                    <span class=\"tipText\">请填写代理公司名</span>\n                </div>\n                <div class=\"span6\">\n                    <form class=\"sui-form form-horizontal\">\n                        <div data-toggle=\"datepicker\" class=\"control-group input-daterange\">\n                            <label class=\"control-label\">代理时间段</label>\n                            <div class=\"controls\">\n                                <input id=\"agentTimeStart" + agentIdCount + "\" type=\"text\" class=\"date input-medium\" placeholder=\"请选择\"/>\n                                <img class=\"agentDate\" src=\"../static/img/date.png\" alt=\"\"/>\n                                <span class=\"to\">至</span>\n                                <input id=\"agentTimeEnd" + agentIdCount + "\" type=\"text\" class=\"date dateEnd input-medium\" placeholder=\"请选择\"/>\n                                <img class=\"agentDate end\" src=\"../static/img/date.png\" alt=\"\"/>\n                                <img class=\"add reduce\" src=\"../static/img/reduce.png\" alt=\"\"/>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        ");
            $('#agent0').after(agentHtml);
        }
        $('.focusInput').focus(function(e) {
            $(e.target).css('border-color', '#ccc').parent().parent().parent().next().css('visibility', 'hidden');
        });
    });
    $('#cooprate>section>div:first-child').on('click', 'img.reduce', function(e) {
        agentCount -= 1;
        $(e.target).parent().parent().parent().parent().parent().remove();
    });
    $('.focusInput').focus(function(e) {
        $(e.target).css('border-color', '#ccc').parent().parent().parent().next().css('visibility', 'hidden');
    });
    $('#job').on('click', function() {
        $(this).css('border-color', '#ccc').parent().parent().parent().parent().next().css('visibility', 'hidden');
    });
    $('#cooprate').on('click', 'input.date', function(e) {
        $(e.target).css('border-color', '#ccc');
    });
    $('#LinkPhone').blur(function() {
        var phoneReg = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        if (!phoneReg.test($('#LinkPhone').val())) {
            alert('请输入合法的联系电话');
        }
    });
    var jobArr = [],
        nameArr = [],
        phoneArr = [];
    $('#contacts').on('click', 'span.add', function() {
        if ($('#job .job').html() == '请选择' || $('#LinkName').val() == '' || $('#LinkPhone').val() == '') {
            alert('请填完必填信息');
            return;
        }
        var jobSelect = $('#job>a>span').text();
        var contactName = $('#LinkName').val();
        var phoneNum = $('#LinkPhone').val();
        jobArr.push($('#jobMenu>li.active').index() + 1);
        nameArr.push(contactName);
        phoneArr.push(phoneNum);
        $('#job>a>span').text('请选择');
        $('#LinkName').val('');
        $('#LinkPhone').val('');
        var tblHtml = ("\n    <tr>\n        <td>" + jobSelect + "</td>\n        <td>" + contactName + "</td>\n        <td>\n            <span>" + phoneNum + "</span><img class=\"reduce\" src=\"../static/img/reduce.png\" alt=\"\"/>\n        </td>\n    </tr>\n    ");
        $('#tbl>tbody').append(tblHtml);
    });
    $('#tbl>tbody').on('click', 'img.reduce', function(e) {
        var removeIndex = $(e.target).parent().parent().index() - 1;
        jobArr.splice(removeIndex, 1);
        nameArr.splice(removeIndex, 1);
        phoneArr.splice(removeIndex, 1);
        $(e.target).parent().parent().remove();
    });
    var supportArr = [],
        supportIndex = [];
    $('#supportMenu').on('click', 'li', function() {
        var curIndex = $(this).index() + 1;
        var aHtml = '';
        var supportName = $(this).children('div').text();
        $(this).children('img').show();
        if (supportIndex.indexOf(curIndex) == -1) {
            supportIndex.push(curIndex);
        } else {
            return;
        }
        if (supportArr.indexOf(supportName) == -1) {
            supportArr.push(supportName);
        } else {
            return;
        }
        $.each(supportArr, function(i) {
            aHtml += ("\n    <a><span>" + supportArr[i] + "</span><img class=\"delete\" src=\"../static/img/delete.png\" alt=\"\"/></a>\n    ");
        });
        $('#support').html(aHtml);
        $('#support>a>img').hover(function(e) {
            $(e.target).attr('src', '../static/img/delete-hover.png').css({
                top: 0,
                right: 0
            });
        }, function(e) {
            $(e.target).attr('src', '../static/img/delete.png').css({
                top: '2px',
                right: '2px'
            });
        });
    });
    $('#support').on('click', 'img.delete', function(e) {
        $(e.target).parent().remove();
        var deleteName = $(e.target).prev().text();
        supportArr.remove(deleteName);
        if (supportArr.length == 0) {
            $('#support').html('请选择（多选）');
        }
        switch (deleteName) {
            case '班车':
                supportIndex.remove('1');
                $('#supportMenu>.right0>img').hide();
                break;
            case '样板房':
                supportIndex.remove('2');
                $('#supportMenu>.right1>img').hide();
                break;
            case '物料':
                supportIndex.remove('3');
                $('#supportMenu>.right2>img').hide();
                break;
            case '盒饭':
                supportIndex.remove('4');
                $('#supportMenu>.right3>img').hide();
                break;
            default:
                break;
        }
    });
    $(document).click(function(e) {
        var _con = $('#support,#supportMenu');
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('#supportMenu').hide();
        }
    });
    $('#support').on('click', function() {
        $('#supportMenu').show();
    });
    $('#cooprate>footer>span:last-child').click(function() {
        $('#countContent').show();
        $('#cooprate').hide();
    });
    $('#cooprate>footer>span.gt').click(function() {
        if (acceptName == '独家代理') {
            for (var i = 0; i <= agentIdCount; i++) {
                if ($('#agentCompany' + i).val() == '') {
                    $('#agent' + i + ' .tipText').css('visibility', 'visible');
                    $('#agentCompany' + i).css('border-color', '#FF4949');
                    alert('请填写代理公司名');
                    agentNameArr = [];
                    agentTimeSArr = [];
                    agentTimeEArr = [];
                    return;
                }
                if ($('#agentTimeStart' + i).val() == '' && $('#agentTimeEnd' + i).val() != '') {
                    $('#agentTimeStart' + i).css('border-color', '#FF4949');
                    alert('请填写代理开始时间');
                    agentNameArr = [];
                    agentTimeSArr = [];
                    agentTimeEArr = [];
                    return;
                }
                if ($('#agentTimeEnd' + i).val() == '' && $('#agentTimeStart' + i).val() != '') {
                    $('#agentTimeEnd' + i).css('border-color', '#FF4949');
                    alert('请填写代理结束时间');
                    agentNameArr = [];
                    agentTimeSArr = [];
                    agentTimeEArr = [];
                    return;
                }
                if ($('#agentCompany' + i).val() != undefined) {
                    agentNameArr.push($('#agentCompany' + i).val());
                    agentTimeSArr.push($('#agentTimeStart' + i).val());
                    agentTimeEArr.push($('#agentTimeEnd' + i).val());
                } else {
                    continue;
                }
            }
        }
        if ($('#tbl>tbody>tr').size() == 1) {
            if ($('#job .job').html() == '请选择') {
                $('td>.jobTip').css('visibility', 'visible');
                $('td.tipControl').css('padding-bottom', '20px');
                $('#job').css('border-color', '#FF4949');
                alert('请选择联系人职称');
                return;
            }
            if ($('#LinkName').val() == '') {
                $('#LinkName').css('border-color', '#FF4949');
                $('td.tipControl').css('padding-bottom', '20px');
                $('td>.nameTip').css('visibility', 'visible');
                alert('请填写联系人姓名');
                return;
            }
            if ($('#LinkPhone').val() == '') {
                $('#LinkPhone').css('border-color', '#FF4949');
                $('td.tipControl').css('padding-bottom', '20px');
                $('td>.phoneTip').css('visibility', 'visible');
                alert('请填写联系人电话');
                return;
            }
            thisPosition = $('#jobMenu>li.active').index() + 1;
            thisLinkname = $('#LinkName').val();
            thisTelephone = $('#LinkPhone').val();
        } else {
            thisPosition = jobArr.join(',');
            thisLinkname = nameArr.join(',');
            thisTelephone = phoneArr.join(',');
        }
        thisPartySupport = supportIndex.join(',');
        thisAgencyName = agentNameArr.join(',');
        thisFristAgentTime = agentTimeSArr.join(',');
        thisEndAgentTime = agentTimeEArr.join(',');
        $('#addLand').show();
        $('#cooprate').hide();
    });
    $('#addLand>footer>span:last-child').click(function() {
        agentNameArr = [];
        agentTimeSArr = [];
        agentTimeEArr = [];
        $('#addLand').hide();
        $('#cooprate').show();
    });
    $('#submit').click(function() {
        addSubmit();
    });
});