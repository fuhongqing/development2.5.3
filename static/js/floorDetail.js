$(function() {
    var floorId = location.search.slice(1).split('=')[1];
    var attributeId = '';
    var salesinformationId = '';
    var cooperationId = '';
    var landId = '';
    var detailId = '';
    var departmentType = '大客户服务部';
    var weihuId = '';
    var isstats = 1;
    var weihuName = '';
    function modifyMol(mdId, myMolId) {
        $(mdId).click(function() {
            $('#cover').show();
            $(myMolId).show().css({
                'opacity': '1',
                'top': '15%'
            });
        });
        $(myMolId).on('click', '.cancel', function() {
            $('#cover').hide();
            $(myMolId).hide();
        });
    }
    modifyMol('#md1', '#myModal1');
    modifyMol('#md2', '#myModal2');
    modifyMol('#md3', '#myModal3');
    modifyMol('#md4', '#myModal4');
    modifyMol('#md5', '#myModal5');
    modifyMol('#md6', '#myModal6');
    modifyMol('#md7', '#myModal7');
    modifyMol('#md8', '#myModal8');
    var developShort = '',
        developFull = '',
        proName = '',
        soldStatus = '',
        buildTVal = '',
        propertyAdd = '',
        cityVal = '',
        broghVal = '',
        progressVal = '',
        mIndex = '',
        isLimitIndex = '',
        loadIndex = '',
        aMoney = '',
        keshou = '',
        salesA = '',
        allA = '',
        salesH = '',
        allHou = '',
        minPr = '',
        maxPr = '',
        minPrR = '',
        priceRan = '',
        minunder = '',
        maxunder = '',
        minFiling = '',
        maxFiling = '',
        saleVali = '',
        saleVa = '',
        basicExperience = '',
        opentime = '',
        curIndex = '',
        acceptIndex = '',
        suppIndex = '',
        urgentIndex = '',
        gropeIndex = '',
        followIndex = '',
        cIndex = '',
        bondIndex = '',
        competitive = '',
        plotRa = '',
        landTypeStart = '',
        startPri = '',
        buildingAr = '',
        competitivePr = '',
        floorPr = '',
        propertyRight = '',
        plotRat = '',
        propertyC = '',
        planning = '',
        prType = '',
        parking = '',
        storiedBu = '',
        coversA = '',
        businessCir = '',
        completionT = '',
        checkRo = '',
        afforestation = '',
        propertyManage = '',
        decorateIndex = '',
        completeVal = '',
        constructionA = '';
    var thisAreaId = 0,
        thisCityId = 0;
    var buildInitArr = [],
        supportInitArr = [],
        soldInitIndex = 0,
        progressInit = 0,
        mInitIndex = 0,
        isLimitInit = 0,
        loadInitIndex = 0,
        experienceInit = 0,
        curInitIndex = 0,
        acceptInitIndex = 0,
        urgentInitIndex = 0,
        gropeInitIndex = 0,
        followInitIndex = 0,
        cInitIndex = 0,
        bondInitIndex = 0,
        landTypeInit = 0,
        prTypeInit = 0,
        decorateInit = 0,
        agentNameArr = [],
        agentStartArr = [],
        agentEndArr = [],
        agentNameInit = '',
        agentStartInit = '',
        agentEndInit = '';
    function floorDetail() {
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/property/v1/propertyInfo',
            data: {propertyId: floorId},
            success: function(data) {
                if (data.status == 'success') {
                    if (data.data.status_jc == 1) {
                        var basicData = data.data.property_jc;
                        weihuName = basicData.maintainerName;
                        $('#contacts>li:last-child>span.name').html(weihuName);
                        if (weihuName != '') {
                            isstats = 0;
                        }
                        if (!basicData.propertyAdress) {
                            basicData.propertyAdress = '';
                        }
                        thisCityId = basicData.cityId;
                        thisAreaId = basicData.areaId;
                        developShort = basicData.shortName;
                        developFull = basicData.fullShortName;
                        proName = basicData.propertyName;
                        soldStatus = basicData.saleStatus;
                        buildTVal = basicData.buildingType;
                        propertyAdd = basicData.propertyAdress;
                        cityVal = basicData.cityName;
                        broghVal = basicData.boroughName;
                        progressVal = basicData.constructionProgress;
                        mIndex = basicData.mortgagePledge;
                        isLimitIndex = basicData.isSign;
                        loadIndex = basicData.isLoan;
                        switch (soldStatus) {
                            case '待售':
                                soldInitIndex = 1;
                                break;
                            case '在售':
                                soldInitIndex = 2;
                                break;
                            case '售罄':
                                soldInitIndex = 3;
                                break;
                            default:
                                break;
                        }
                        switch (progressVal) {
                            case '打桩':
                                progressInit = 1;
                                break;
                            case '浇筑':
                                progressInit = 2;
                                break;
                            case '封顶':
                                progressInit = 3;
                                break;
                            case '竣工':
                                progressInit = 4;
                                break;
                            default:
                                break;
                        }
                        switch (mIndex) {
                            case '有抵押':
                                mInitIndex = 1;
                                break;
                            case '无抵押':
                                mInitIndex = 2;
                                break;
                            default:
                                break;
                        }
                        switch (isLimitIndex) {
                            case '否':
                                isLimitInit = 1;
                                break;
                            case '是':
                                isLimitInit = 2;
                                break;
                            default:
                                break;
                        }
                        switch (loadIndex) {
                            case '否':
                                loadInitIndex = 1;
                                break;
                            case '是':
                                loadInitIndex = 2;
                                break;
                            default:
                                break;
                        }
                        var thisBuildTVal = buildTVal.split('、');
                        for (var i = 0; i < thisBuildTVal.length; i++) {
                            if (thisBuildTVal[i] == '别墅') {
                                buildInitArr.push('1');
                            } else if (thisBuildTVal[i] == '住宅') {
                                buildInitArr.push('2');
                            } else if (thisBuildTVal[i] == '商业') {
                                buildInitArr.push('3');
                            } else {
                                buildInitArr.push('4');
                            }
                        }
                        $('#projectName').val(proName);
                        $('#cityName').val(cityVal);
                        $('#boroughDrop>a>span').html(broghVal);
                        $('#projectAddr').val(propertyAdd);
                        $('#buildingType').html(thisBuildTVal.join(','));
                        $('#saleStatus>a>span').html(soldStatus);
                        $('#mortgage>a>span').html(mIndex);
                        $('#buildProgress>a>span').html(progressVal);
                        $('#isLoan>a>span').html(loadIndex);
                        $('#isSign>a>span').html(isLimitIndex);
                        $('#developer').val(developFull);
                        $('#abbreviation').val(developShort);
                        var buildValHtml = '';
                        if (thisBuildTVal.length > 0) {
                            $.each(thisBuildTVal, function(i) {
                                if (thisBuildTVal[i] != '') {
                                    buildValHtml += ("\n                                    <span class=\"buildType\">" + thisBuildTVal[i] + "</span>\n                                    ");
                                }
                            });
                        }
                        var soldHtml = ("\n                        <span class=\"name\">" + proName + "</span><span class=\"soldState\">" + soldStatus + "</span>\n                        ");
                        var basicHtml = ("\n                        <li id=\"stateLi\">\n\n                        </li>\n                        <li class=\"addrLi firstRowLi\">\n                            <img id=\"" + basicData.longitude + "\" class=\"" + basicData.latitude + " gt\" src=\"../static/img/map-a.png\" alt=\"\"/>\n                            <span class=\"key\">项目地址</span>\n                            <span>" + (cityVal + broghVal + propertyAdd) + "</span>\n                        </li>\n                        <li>\n                            <span class=\"key\">开发商</span>\n                            <span>" + developFull + "(" + developShort + ")</span>\n                        </li>\n                        ");
                        $('#basicInfo>ul.firstUl').html(basicHtml);
                        $('#stateLi').html(soldHtml + buildValHtml);
                        var secondHtml = ("\n                            <li class=\"firstRowLi\">\n                                <span class=\"key\">工程进度</span>\n                                <span>" + progressVal + "</span>\n                            </li>\n                            <li>\n                                <span class=\"key\">抵押情况</span>\n                                <span>" + mIndex + "</span>\n                            </li>\n                        ");
                        $('#basicInfo>ul.second').html(secondHtml);
                        var lastHtml = ("\n                            <li class=\"firstRowLi\">\n                                <span class=\"key\">是否可以贷款</span>\n                                <span>" + loadIndex + "</span>\n                            </li>\n                            <li>\n                                <span class=\"key\">可否限签</span>\n                                <span>" + isLimitIndex + "</span>\n                            </li>\n                        ");
                        $('#basicInfo>ul.last').html(lastHtml);
                        var thisHeight = $('#basicInfo .addrLi').height();
                        $('#basicInfo .firstRowLi').height(thisHeight);
                    } else {
                        var basicHtml = "\n                        <li>\n                        <span class=\"name\"></span>\n                        </li>\n                        <li class=\"addrLi firstRowLi\">\n                            <span class=\"key\">项目地址</span>\n                            <span></span>\n                        </li>\n                        <li>\n                            <span class=\"key\">开发商</span>\n                            <span></span>\n                        </li>\n                        ";
                        $('#basicInfo>ul.firstUl').html(basicHtml);
                        var secondHtml = "\n                            <li class=\"firstRowLi\">\n                                <span class=\"key\">工程进度</span>\n                                <span></span>\n                            </li>\n                            <li>\n                                <span class=\"key\">抵押情况</span>\n                                <span></span>\n                            </li>\n                        ";
                        $('#basicInfo>ul.second').html(secondHtml);
                        var lastHtml = "\n                            <li class=\"firstRowLi\">\n                                <span class=\"key\">是否可以贷款</span>\n                                <span></span>\n                            </li>\n                            <li>\n                                <span class=\"key\">可否限签</span>\n                                <span></span>\n                            </li>\n                        ";
                        $('#basicInfo>ul.last').html(lastHtml);
                    }
                    if (data.data.status_tl == 1) {
                        var countData = data.data.property_tl;
                        attributeId = countData.attributeId;
                        aMoney = countData.totalValue;
                        keshou = countData.saleValue;
                        salesA = countData.saleArea;
                        allA = countData.totalArea;
                        salesH = countData.saleHouse;
                        allHou = countData.totalHouse;
                        $('#totalPrice').val(aMoney);
                        $('#availablePrice').val(keshou);
                        $('#totalArea').val(allA);
                        $('#availableArea').val(salesA);
                        $('#totalSet').val(allHou);
                        $('#availableSet').val(salesH);
                        var leftHtml = ("\n                            <li>\n                                <span>总货值</span><span>" + aMoney + "亿</span>\n                            </li>\n                            <li>\n                                <span>总套数</span><span>" + allHou + "套</span>\n                            </li>\n                            <li>\n                                <span>总面积</span><span>" + allA + "m²</span>\n                            </li>\n                        ");
                        var rightHtml = ("\n                            <li>\n                                <span>可售货值</span><span>" + keshou + "亿</span>\n                            </li>\n                            <li>\n                                <span>可售套数</span><span>" + salesH + "套</span>\n                            </li>\n                            <li>\n                                <span>可售面积</span><span>" + salesA + "m²</span>\n                            </li>\n                        ");
                        $('#countSection>ul.lf').html(leftHtml);
                        $('#countSection>ul.rightUl').html(rightHtml);
                    } else {
                        var leftHtml = "\n                        <li>\n                            <span>总货值</span><span></span>\n                        </li>\n                        <li>\n                            <span>总套数</span><span></span>\n                        </li>\n                        <li>\n                            <span>总面积</span><span></span>\n                        </li>\n                        ";
                        var rightHtml = "\n                        <li>\n                            <span>可售货值</span><span></span>\n                        </li>\n                        <li>\n                            <span>可售套数</span><span></span>\n                        </li>\n                        <li>\n                            <span>可售面积</span><span></span>\n                        </li>\n                        ";
                        $('#countSection>ul.lf').html(leftHtml);
                        $('#countSection>ul.rightUl').html(rightHtml);
                    }
                    if (data.data.status_xs == 1) {
                        var saleData = data.data.property_xs;
                        salesinformationId = saleData.salesinformationId;
                        minPr = saleData.minAllPrice;
                        maxPr = saleData.maxAllPrice;
                        minPrR = saleData.minPrice;
                        priceRan = saleData.maxPrice;
                        minunder = saleData.minFloorPrice;
                        maxunder = saleData.maxFloorPrice;
                        minFiling = saleData.minRecordPrice;
                        maxFiling = saleData.maxRecordPrice;
                        saleVali = saleData.termofValidity;
                        saleVa = saleData.permitForpresale;
                        basicExperience = saleData.experience;
                        opentime = saleData.openPropertyDate;
                        switch (basicExperience) {
                            case '不需要保装':
                                experienceInit = 1;
                                break;
                            case '部分保装':
                                experienceInit = 2;
                                break;
                            case '整体重新保装':
                                experienceInit = 3;
                                break;
                            case '烂尾楼':
                                experienceInit = 4;
                                break;
                            default:
                                break;
                        }
                        $('#lowPrice').val(minPrR);
                        $('#highPrice').val(priceRan);
                        $('#lowTotalPrice').val(minPr);
                        $('#highTotalPrice').val(maxPr);
                        $('#lowRecordPrice').val(minFiling);
                        $('#highRecordPrice').val(maxFiling);
                        $('#bottomLowPrice').val(minunder);
                        $('#bottomHighPrice').val(maxunder);
                        $('#openTime').val(opentime);
                        $('#experience>a>span').html(basicExperience);
                        $('#permitCode').val(saleVa);
                        $('#permitTime').val(saleVali);
                        var leftHtml = ("\n                        <li>\n                            <span>单价区间</span><span>" + minPrR + " - " + priceRan + "元/m²</span>\n                        </li>\n                        <li>\n                            <span>备案价</span><span>" + minFiling + " - " + maxFiling + "元/m²</span>\n                        </li>\n                        <li>\n                            <span>首次开盘时间</span><span>" + opentime + "</span>\n                        </li>\n                        <li>\n                            <span>预售许可证</span><span>" + saleVa + "</span>\n                        </li>\n                        ");
                        var rightHtml = ("\n                        <li>\n                            <span>总价区间</span><span>" + minPr + "万-" + maxPr + "万/套</span>\n                        </li>\n                        <li>\n                            <span>底价区间</span><span>" + minunder + "-" + maxunder + "元/m²</span>\n                        </li>\n                        <li>\n                            <span>体验情况</span><span>" + basicExperience + "</span>\n                        </li>\n                        <li>\n                            <span>许可证有效期</span><span>" + saleVali + "</span>\n                        </li>\n                        ");
                        $('#saleSection>ul.lf').html(leftHtml);
                        $('#saleSection>ul.rightUl').html(rightHtml);
                    } else {
                        var leftHtml = "\n                        <li>\n                            <span>单价区间</span><span></span>\n                        </li>\n                        <li>\n                            <span>备案价</span><span></span>\n                        </li>\n                        <li>\n                            <span>首次开盘时间</span><span></span>\n                        </li>\n                        <li>\n                            <span>预售许可证</span><span></span>\n                        </li>\n                        ";
                        var rightHtml = "\n                        <li>\n                            <span>总价区间</span><span></span>\n                        </li>\n                        <li>\n                            <span>底价区间</span><span></span>\n                        </li>\n                        <li>\n                            <span>体验情况</span><span></span>\n                        </li>\n                        <li>\n                            <span>许可证有效期</span><span></span>\n                        </li>\n                        ";
                        $('#saleSection>ul.lf').html(leftHtml);
                        $('#saleSection>ul.rightUl').html(rightHtml);
                    }
                    if (data.data.status_hz == 1) {
                        var cooperateData = data.data.property_hz;
                        var agentData = cooperateData.agencyList;
                        cooperationId = cooperateData.cooperationId;
                        curIndex = cooperateData.saleType;
                        acceptIndex = cooperateData.acceptSaleType;
                        suppIndex = cooperateData.partySupport;
                        urgentIndex = cooperateData.emergencyDegree;
                        gropeIndex = cooperateData.groupPurchase;
                        followIndex = cooperateData.followEffect;
                        cIndex = cooperateData.commissionMethod;
                        bondIndex = cooperateData.bond;
                        switch (curIndex) {
                            case '独家代理':
                                curInitIndex = 1;
                                break;
                            case '自销':
                                curInitIndex = 2;
                                break;
                            case '联合代理':
                                curInitIndex = 3;
                                break;
                            default:
                                break;
                        }
                        switch (acceptIndex) {
                            case '接受代理目前无代理':
                                acceptInitIndex = 1;
                                break;
                            case '独家代理':
                                acceptInitIndex = 2;
                                break;
                            case '自销':
                                acceptInitIndex = 3;
                                break;
                            case '联合代理':
                                acceptInitIndex = 4;
                                break;
                            case '只做案场':
                                acceptInitIndex = 5;
                                break;
                            case '只做联动':
                                acceptInitIndex = 6;
                                break;
                            default:
                                break;
                        }
                        switch (urgentIndex) {
                            case '不紧急':
                                urgentInitIndex = 1;
                                break;
                            case '一般':
                                urgentInitIndex = 2;
                                break;
                            case '需要马上进场':
                                urgentInitIndex = 3;
                                break;
                            default:
                                break;
                        }
                        switch (gropeIndex) {
                            case '甲方收':
                                gropeInitIndex = 1;
                                break;
                            case '代理收':
                                gropeInitIndex = 2;
                                break;
                            default:
                                break;
                        }
                        switch (followIndex) {
                            case '后续合作机会':
                                followInitIndex = 1;
                                break;
                            case '提高知名度':
                                followInitIndex = 2;
                                break;
                            default:
                                break;
                        }
                        switch (cIndex) {
                            case '固定':
                                cInitIndex = 1;
                                break;
                            case '跳点':
                                cInitIndex = 2;
                                break;
                            case '报销':
                                cInitIndex = 3;
                                break;
                            default:
                                break;
                        }
                        switch (bondIndex) {
                            case '0-50万':
                                bondInitIndex = 1;
                                break;
                            case '50万-100万':
                                bondInitIndex = 2;
                                break;
                            case '100万-200万':
                                bondInitIndex = 3;
                                break;
                            case '200万 -300万':
                                bondInitIndex = 4;
                                break;
                            case '500万以上':
                                bondInitIndex = 5;
                                break;
                            default:
                                break;
                        }
                        var thisSuppIndex = suppIndex.split('、');
                        $.each(thisSuppIndex, function(i) {
                            switch (thisSuppIndex[i]) {
                                case '班车':
                                    supportInitArr.push('1');
                                    break;
                                case '样板房':
                                    supportInitArr.push('2');
                                    break;
                                case '物料':
                                    supportInitArr.push('3');
                                    break;
                                case '饭盒':
                                    supportInitArr.push('4');
                                    break;
                                default:
                                    break;
                            }
                        });
                        $('#saleModel>a>span').html(curIndex);
                        $('#followUp>a>span').html(followIndex);
                        $('#acceptSaleType>a>span').html(acceptIndex);
                        $('#commissionMethod>a>span').html(cIndex);
                        $('#support').html(thisSuppIndex.join(','));
                        $('#promise>a>span').html(bondIndex);
                        $('#groupSituation>a>span').html(gropeIndex);
                        $('#urgency>a>span').html(urgentIndex);
                        var agentCount = 0;
                        var agentTimeHtml = '',
                            agentNameHtml = '',
                            agentModalHtml = '';
                        var leftHtml = ("\n                            <li id=\"agentNameLi\">\n                                <span>目前销售类型</span><span>" + curIndex + "</span>\n                            </li>\n\n                            <li>\n                                <span>可接受销售类型</span><span>" + acceptIndex + "</span>\n                            </li>\n                            <li>\n                                <span>甲方支持</span><span>" + thisSuppIndex.join(',') + "</span>\n                            </li>\n                            <li>\n                                <span>团购情况</span><span>" + gropeIndex + "</span>\n                            </li>\n                            <li>\n                                <span>后续效应</span><span>" + followIndex + "</span>\n                            </li>\n                        ");
                        var rightHtml = ("\n                            <li id=\"agentTimeLi\">\n                               <span></span><span></span>\n                            </li>\n\n                            <li>\n                                <span>佣金方式</span><span>" + cIndex + "</span>\n                            </li>\n                            <li>\n                                <span>保证金</span><span>" + bondIndex + "</span>\n                            </li>\n                            <li>\n                                <span>紧急程度</span><span>" + urgentIndex + "</span>\n                            </li>\n                        ");
                        $('#cooperateSection>ul.lf').html(leftHtml);
                        $('#cooperateSection>ul.rightUl').html(rightHtml);
                        var agentCountInit = agentData.length;
                        $.each(agentData, function(i) {
                            agentNameArr.push(agentData[i].propertyAgencyName);
                            agentStartArr.push(agentData[i].fristAgentTime);
                            agentEndArr.push(agentData[i].endAgentTime);
                            agentNameInit = agentNameArr.join(',');
                            agentStartInit = agentStartArr.join(',');
                            agentEndInit = agentEndArr.join(',');
                            agentTimeHtml += ("\n                                <li class=\"agentTime\"><span>代理时间段</span><span>" + agentData[i].fristAgentTime + "至" + agentData[i].endAgentTime + "</span></li>\n                                ");
                            agentNameHtml += ("\n                                <li class=\"agentName\"><span>代理公司名</span><span>" + agentData[i].propertyAgencyName + "</span></li>\n                                ");
                            agentModalHtml += ("\n                                <div id=\"" + agentData[i].propertyAgencyId + "\" class=\"agentRow sui-row-fluid\">\n                                    <div class=\"span6\">\n                                        <form class=\"sui-form form-horizontal\">\n                                            <div class=\"control-group\">\n                                                <label class=\"control-label\">代理公司名</label>\n                                                <div class=\"controls\">\n                                                    <input type=\"text\" value=\"" + agentData[i].propertyAgencyName + "\" id=\"agentCompany" + (i + 1) + "\" placeholder=\"请输入内容\"/>\n                                                </div>\n                                            </div>\n                                        </form>\n                                    </div>\n                                    <div class=\"span6\">\n                                        <form class=\"sui-form form-horizontal\">\n                                            <div data-toggle=\"datepicker\" class=\"control-group input-daterange\">\n                                                <label class=\"control-label\">代理时间段</label>\n                                                <div class=\"controls\">\n                                                    <input type=\"text\" value=\"" + agentData[i].fristAgentTime + "\" id=\"agentTimeStart" + (i + 1) + "\" class=\"fromTo date input-medium\" placeholder=\"请选择\"/>\n                                                    <img class=\"agentDate\" src=\"../static/img/date.png\" alt=\"\"/>\n                                                    <span class=\"to\">至</span>\n                                                    <input type=\"text\" value=\"" + agentData[i].endAgentTime + "\" id=\"agentTimeEnd" + (i + 1) + "\" class=\"fromTo date dateEnd input-medium\" placeholder=\"请选择\"/>\n                                                    <img class=\"agentDate end\" src=\"../static/img/date.png\" alt=\"\"/>\n                                                    <img class=\"add reduce\" src=\"../static/img/reduce.png\" alt=\"\"/>\n                                                </div>\n                                            </div>\n                                        </form>\n                                    </div>\n                                </div>\n                            ");
                        });
                        $('#agentTimeLi').after(agentTimeHtml);
                        $('#agentNameLi').after(agentNameHtml);
                        $('#agentRows').html(agentModalHtml);
                        if ($.trim(curIndex) == '独家代理') {
                            $('.agentName,.agentTime,#agent0').show();
                            $('#agentCompany0').val('');
                            $('#agentTimeStart0').val('');
                            $('#agentTimeEnd0').val('');
                        } else {
                            $('.agentName,.agentTime,#agent0').hide();
                        }
                        $('#agent0').on('click', 'img.add', function(e) {
                            e.stopPropagation();
                            var nameVal = $('#agentCompany0').val();
                            var startVal = $('#agentTimeStart0').val();
                            var endVal = $('#agentTimeEnd0').val();
                            console.log(nameVal);
                            agentCount += 1;
                            agentCountInit += 1;
                            if (agentCount >= 5) {
                                agentCount = 5;
                                alert('最多只能添加5条');
                                return;
                            } else {
                                var agentHtml = ("\n                                    <div id=\"\" class=\"agentRow sui-row-fluid\">\n                                            <div class=\"span6 tipControl\">\n                                                <form class=\"sui-form form-horizontal\">\n                                                    <div class=\"control-group\">\n                                                        <label class=\"control-label\">代理公司名</label>\n                                                        <div class=\"controls\">\n                                                            <input type=\"text\" id=\"agentCompany" + agentCountInit + "\" value=\"" + nameVal + "\" placeholder=\"请输入内容\"/>\n                                                        </div>\n                                                    </div>\n                                                </form>\n                                            </div>\n                                            <div class=\"span6\">\n                                                <form class=\"sui-form form-horizontal\">\n                                                    <div data-toggle=\"datepicker\" class=\"control-group input-daterange\">\n                                                        <label class=\"control-label\">代理时间段</label>\n                                                        <div class=\"controls\">\n                                                            <input value=\"" + startVal + "\" id=\"agentTimeStart" + agentCountInit + "\" type=\"text\" class=\"fromTo date input-medium\" placeholder=\"请选择\"/>\n                                                            <img class=\"agentDate\" src=\"../static/img/date.png\" alt=\"\"/>\n                                                            <span class=\"to\">至</span>\n                                                            <input value=\"" + endVal + "\" id=\"agentTimeEnd" + agentCountInit + "\" type=\"text\" class=\"fromTo date dateEnd input-medium\" placeholder=\"请选择\"/>\n                                                            <img class=\"agentDate end\" src=\"../static/img/date.png\" alt=\"\"/>\n                                                            <img class=\"add reduce\" src=\"../static/img/reduce.png\" alt=\"\"/>\n                                                        </div>\n                                                    </div>\n                                                </form>\n                                            </div>\n                                        </div>\n                                    ");
                                $('#agent0Rows').html(agentHtml);
                            }
                        });
                        $('#myModal6').on('click', 'img.reduce', function(e) {
                            e.stopPropagation();
                            agentCount -= 1;
                            $(e.target).parent().parent().parent().parent().parent().remove();
                        });
                    } else {
                        var leftHtml = "\n                           <li>\n                                <span>目前销售类型</span><span></span>\n                            </li>\n                            <li>\n                                <span>可接受销售类型</span><span></span>\n                            </li>\n                            <li>\n                                <span>甲方支持</span><span></span>\n                            </li>\n                            <li>\n                                <span>团购情况</span><span></span>\n                            </li>\n                            <li>\n                                <span>后续效应</span><span></span>\n                            </li>\n                        ";
                        var rightHtml = "\n                            <li>\n                                <span></span><span></span>\n                            </li>\n                            <li>\n                                <span>佣金方式</span><span></span>\n                            </li>\n                            <li>\n                                <span>保证金</span><span></span>\n                            </li>\n                            <li>\n                                <span>紧急程度</span><span></span>\n                            </li>\n                        ";
                        $('#cooperateSection>ul.lf').html(leftHtml);
                        $('#cooperateSection>ul.rightUl').html(rightHtml);
                    }
                    if (data.data.status_td == 1) {
                        var landData = data.data.property_td;
                        landId = landData.landId;
                        competitive = landData.competeDate;
                        plotRa = landData.volumetricRate;
                        landTypeStart = landData.landNature;
                        startPri = landData.startingPrice;
                        buildingAr = landData.landArea;
                        competitivePr = landData.bidPrice;
                        floorPr = landData.floorPrice;
                        propertyRight = landData.propertyRightLife;
                        switch (landTypeStart) {
                            case '住宅':
                                landTypeInit = 1;
                                break;
                            case '商业/办公':
                                landTypeInit = 2;
                                break;
                            case '工业':
                                landTypeInit = 3;
                                break;
                            case '其他':
                                landTypeInit = 4;
                                break;
                            default:
                                break;
                        }
                        $('#competitiveDate').val(competitive);
                        $('#buildingArea').val(buildingAr);
                        $('#startingPrice').val(startPri);
                        $('#competitivePrice').val(competitivePr);
                        $('#landType>a>span').html(landTypeStart);
                        $('#rightYears').val(propertyRight);
                        $('#plotRatioStart').val(plotRa);
                        $('#floorPrice').val(floorPr);
                        var leftHtml = ("\n                        <li>\n                            <span>竞得日期</span><span>" + competitive + "</span>\n                        </li>\n                        <li>\n                            <span>起始价</span><span>" + startPri + "万</span>\n                        </li>\n                        <li>\n                            <span>容积率</span><span>" + plotRa + "</span>\n                        </li>\n                        <li>\n                            <span>用地性质</span><span>" + landTypeStart + "</span>\n                        </li>\n                        ");
                        var rightHtml = ("\n                        <li>\n                            <span>建筑用地面积</span><span>" + buildingAr + "m²</span>\n                        </li>\n                        <li>\n                            <span>竞得价</span><span>" + competitivePr + "万</span>\n                        </li>\n                        <li>\n                            <span>楼面价</span><span>" + floorPr + "元/m²</span>\n                        </li>\n                        <li>\n                            <span>产权年限</span><span>" + propertyRight + "年</span>\n                        </li>\n                        ");
                        $('#landSection>ul.lf').html(leftHtml);
                        $('#landSection>ul.rightUl').html(rightHtml);
                    } else {
                        var leftHtml = "\n                        <li>\n                            <span>竞得日期</span><span></span>\n                        </li>\n                        <li>\n                            <span>起始价</span><span></span>\n                        </li>\n                        <li>\n                            <span>容积率</span><span></span>\n                        </li>\n                        <li>\n                            <span>用地性质</span><span></span>\n                        </li>\n                        ";
                        var rightHtml = "\n                        <li>\n                            <span>建筑用地面积</span><span></span>\n                        </li>\n                        <li>\n                            <span>竞得价</span><span></span>\n                        </li>\n                        <li>\n                            <span>楼面价</span><span></span>\n                        </li>\n                        <li>\n                            <span>产权年限</span><span></span>\n                        </li>\n                        ";
                        $('#landSection>ul.lf').html(leftHtml);
                        $('#landSection>ul.rightUl').html(rightHtml);
                    }
                    if (data.data.status_xq == 1) {
                        var detailData = data.data.property_xq;
                        detailId = detailData.detailId;
                        plotRat = detailData.plotRatio;
                        propertyC = detailData.managmentCompany;
                        planning = detailData.planHouseholds;
                        prType = detailData.propertyType;
                        parking = detailData.parkingNumber;
                        storiedBu = detailData.buildingNumber;
                        coversA = detailData.floorArea;
                        businessCir = detailData.businessCircle;
                        completionT = detailData.completionTime;
                        checkRo = detailData.earliestProvide;
                        afforestation = detailData.greeningRatio;
                        propertyManage = detailData.propertyFee;
                        decorateIndex = detailData.decorationStatus;
                        completeVal = detailData.supportingFacilities;
                        constructionA = detailData.structureArea;
                        switch (prType) {
                            case '别墅':
                                prTypeInit = 1;
                                break;
                            case '住宅':
                                prTypeInit = 2;
                                break;
                            case '商铺':
                                prTypeInit = 3;
                                break;
                            case '商住':
                                prTypeInit = 4;
                                break;
                            default:
                                break;
                        }
                        switch (decorateIndex) {
                            case '毛坯':
                                decorateInit = 1;
                                break;
                            case '简装修':
                                decorateInit = 2;
                                break;
                            case '精装修':
                                decorateInit = 3;
                                break;
                            default:
                                break;
                        }
                        $('#propertyCompany').val(propertyC);
                        $('#propertyType>a>span').html(prType);
                        $('#plotRatio').val(plotRat);
                        $('#planningHouse').val(planning);
                        $('#parkingSpace').val(parking);
                        $('#storiedBuilding').val(storiedBu);
                        $('#coversArea').val(coversA);
                        $('#businessCircle').val(businessCir);
                        $('#completionTime').val(completionT);
                        $('#checkRoom').val(checkRo);
                        $('#afforestationRate').val(afforestation);
                        $('#floorManagement').val(propertyManage);
                        $('#decorate>a>span').html(decorateIndex);
                        $('#completeSet').val(completeVal);
                        $('#constructionArea').val(constructionA);
                        var leftHtml = ("\n                        <li>\n                            <span>物业公司</span><span>" + propertyC + "</span>\n                        </li>\n                        <li>\n                            <span>物业类型</span><span>" + prType + "</span>\n                        </li>\n                        <li>\n                            <span>容积率</span><span>" + plotRat + "</span>\n                        </li>\n                        <li>\n                            <span>规划户数</span><span>" + planning + "</span>\n                        </li>\n                        <li>\n                            <span>车位数</span><span>" + parking + "</span>\n                        </li>\n                        <li>\n                            <span>楼栋总数</span><span>" + storiedBu + "</span>\n                        </li>\n                        <li>\n                            <span>占地面积</span><span>" + coversA + "m²</span>\n                        </li>\n                        <li>\n                            <span>周边商圈</span><span>" + businessCir + "</span>\n                        </li>\n                        ");
                        var rightHtml = ("\n                        <li>\n                            <span>竣工时间</span><span>" + completionT + "</span>\n                        </li>\n                        <li>\n                            <span>最早交房</span><span>" + checkRo + "</span>\n                        </li>\n                        <li>\n                            <span>绿化率</span><span>" + afforestation + "</span>\n                        </li>\n                        <li>\n                            <span>物业费</span><span>" + propertyManage + "元/月</span>\n                        </li>\n                        <li>\n                            <span>装修情况</span><span>" + decorateIndex + "</span>\n                        </li>\n                        <li>\n                            <span>配套设施</span><span>" + completeVal + "</span>\n                        </li>\n                        <li>\n                            <span>建筑面积</span><span>" + constructionA + "m²</span>\n                        </li>\n                        <li><span></span><span></span></li>\n                        ");
                        $('#detailSection>ul.lf').html(leftHtml);
                        $('#detailSection>ul.rightUl').html(rightHtml);
                    } else {
                        var leftHtml = "\n                        <li>\n                            <span>物业公司</span><span></span>\n                        </li>\n                        <li>\n                            <span>物业类型</span><span></span>\n                        </li>\n                        <li>\n                            <span>容积率</span><span></span>\n                        </li>\n                        <li>\n                            <span>规划户数</span><span></span>\n                        </li>\n                        <li>\n                            <span>车位数</span><span></span>\n                        </li>\n                        <li>\n                            <span>楼栋总数</span><span></span>\n                        </li>\n                        <li>\n                            <span>占地面积</span><span></span>\n                        </li>\n                        <li>\n                            <span>周边商圈</span><span></span>\n                        </li>\n                        ";
                        var rightHtml = "\n                        <li>\n                            <span>竣工时间</span><span></span>\n                        </li>\n                        <li>\n                            <span>最早交房</span><span></span>\n                        </li>\n                        <li>\n                            <span>绿化率</span><span></span>\n                        </li>\n                        <li>\n                            <span>物业费</span><span></span>\n                        </li>\n                        <li>\n                            <span>装修情况</span><span></span>\n                        </li>\n                        <li>\n                            <span>配套设施</span><span></span>\n                        </li>\n                        <li>\n                            <span>建筑面积</span><span></span>\n                        </li>\n                        <li><span></span><span></span></li>\n                        ";
                        $('#detailSection>ul.lf').html(leftHtml);
                        $('#detailSection>ul.rightUl').html(rightHtml);
                    }
                    if (data.data.status_lx > 0) {
                        var contactData = data.data.property_lx;
                        if (contactData.length > 0) {
                            var contactHtml = '';
                            $.each(contactData, function(i) {
                                var thisPhoneNum = contactData[i].contactPhone;
                                var hidePhoneNum = thisPhoneNum.slice(0, 3) + '****' + thisPhoneNum.slice(-4);
                                contactHtml += ("\n                            <li class=\"clear\">\n                            <div>" + contactData[i].position + "</div>\n                            <a class=\"gt\">查看</a>\n                            <span class=\"linkName\">" + contactData[i].contactName + "</span><span id=\"" + thisPhoneNum + "\" class=\"linkPhone\">" + hidePhoneNum + "</span>\n                            </li>\n                            ");
                            });
                            $('#contactList').html(contactHtml);
                        }
                    }
                } else {
                    alert(data.info || '获得楼盘详情失败');
                }
            },
            error: function() {
                console.log('获取楼盘详情网络错误');
            }
        });
    }
    floorDetail();
    $('#md3').on('click', function() {
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
                            weihurenHtml += ("\n                        <li id=\"" + result[i].userId + "\" role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" >" + result[i].userName + "</a></li>\n                            ");
                        });
                        $('#weihurenMenu').html(weihurenHtml);
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
    $('#weihurenMenu').on('click', 'li', function() {
        weihuId = $(this).attr('id');
        weihuName = $(this).children('a').html();
    });
    $('#myModal3').on('click', '.modify', function() {
        $.ajax({
            type: 'post',
            url: floorUrl + 'api/property/v1/setPropertyMaintainer',
            data: {
                userId: createUserid,
                id: floorId,
                maintainerId: weihuId
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('设置维护人成功!');
                    $('#myModal3').hide();
                    $('#cover').hide();
                    floorDetail();
                } else {
                    alert('设置维护人失败!');
                }
            },
            error: function() {
                console.log('设置维护人网络错误');
            }
        });
    }).on('click', '.cancel', function() {
        $('#weihuren>a>span').html('请选择');
    });
    $('#myModal2').on('click', '.modify', function() {
        var linkJob = $('#job>a>span').html();
        var linkJobIndex = $('#jobMenu>li.active').index() + 1;
        var linkName = $('#LinkName').val();
        var linkPhone = $('#LinkPhone').val();
        if (linkJob == '请选择') {
            alert("请选择联系人职位");
            return;
        }
        if (linkName == '') {
            alert("请填写联系人姓名");
            return;
        }
        if (linkPhone == '') {
            alert("请填写联系人电话");
            return;
        }
        if (!(/^1[3456789]\d{9}$/.test(linkPhone))) {
            alert("手机号无效");
            return;
        }
        $.ajax({
            type: 'post',
            url: floorUrl + 'api/property/v1/addLinkPserson',
            data: {
                name: linkName,
                telephone: linkPhone,
                id: createUserid,
                propertyId: floorId,
                level: linkJobIndex,
                stats: isstats
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('新增联系人成功');
                    $('#myModal2').hide();
                    $('#cover').hide();
                    $('#job>a>span').html('请选择');
                    $('#LinkName').val('');
                    $('#LinkPhone').val('');
                    floorDetail();
                } else {
                    alert('新增联系人失败');
                }
            },
            error: function() {
                console.log('新增联系人网络错误');
            }
        });
    }).on('click', '.cancel', function() {
        $('#job>a>span').html('请选择');
        $('#LinkName').val('');
        $('#LinkPhone').val('');
    });
    $('#contactList').on('click', 'a', function(e) {
        $(e.target).next().next().html($(e.target).next().next().attr('id'));
    });
    var fileUrl,
        fileName = '附件';
    $('#followProgressMenu>li').on('click', 'a', function(e) {
        var stateVal = $(e.target).html();
        if (stateVal == '已提报') {
            $('#upLoad').css('visibility', 'visible');
        } else {
            $('#upLoad').css('visibility', 'hidden');
        }
    });
    $('#upLoad').on('click', function() {
        $('#btn-file').click();
    });
    $('#btn-file').change(function(e) {
        if ($(e.target).val() == '') {
            alert('文件不能为空');
        }
        var files = $(e.target).prop('files');
        var formData = new FormData();
        $.each(files, function(i) {
            if (files[i].size > 5 * 1024 * 1024) {
                alert("单个文件大小不可超过5M");
                return;
            }
            formData.append('files', files[i]);
        });
        $.ajax({
            url: 'http://www.ehaofang.com:8888/publicshow/qiniuUtil/fileToQiniu',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function(data) {
                fileUrl = data.pathUrls;
                if (data.statas == 'true') {
                    alert(data.message);
                } else if (data.statas == 'false') {
                    alert(data.message);
                }
            },
            error: function(jqXHR) {
                console.log(JSON.stringify(jqXHR));
            }
        });
    });
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
    });
    $('#boroughDrop').on('click', function() {
        $('#boroughMenu').show().css('top', '34px');
    });
    $('#boroughMenu').on('click', 'li', function(e) {
        e.stopPropagation();
        $('#boroughDrop>a>span').html($(this).children('a').html());
        thisAreaId = $(this).attr('class');
        $('#boroughMenu').hide();
    });
    $('#basicInfo').on('click', '.addrLi', function() {
        $(location).attr('href', '/propertyMap?' + thisstate + '&' + createUserid + '&' + thisCityId + '&' + proName + '&' + propertyAdd);
    });
    $('#myModal1').on('click', '.modify', function() {
        var thisLongitude = $('#basicInfo .addrLi>img').attr('id');
        var thisLatitude = parseFloat($('#basicInfo .addrLi>img').attr('class'));
        var basicFollowArr = [];
        var developShortModal = $('#abbreviation').val(),
            developFullModal = $('#developer').val(),
            proNameModal = $('#projectName').val(),
            soldStatusModal = $('#saleStatusMenu>li.active').index() == -1 ? soldInitIndex : $('#saleStatusMenu>li.active').index() + 1,
            buildTValModal = buildIndex.join(',') == '' ? buildInitArr.join(',') : buildIndex.join(','),
            propertyAddModal = $('#projectAddr').val(),
            progressValModal = $('#buildProgressMenu>li.active').index() == -1 ? progressInit : $('#buildProgressMenu>li.active').index() + 1,
            mIndexModal = $('#mortgageMenu>li.active').index() == -1 ? mInitIndex : $('#mortgageMenu>li.active').index() + 1,
            isLimitIndexModal = $('#isSignMenu>li.active').index() == -1 ? isLimitInit : $('#isSignMenu>li.active').index() + 1,
            loadIndexModal = $('#isLoanMenu>li.active').index() == -1 ? loadInitIndex : $('#isLoanMenu>li.active').index() + 1;
        if (developShortModal != developShort) {
            basicFollowArr.push('开发商简称由' + developShort + '变更为' + developShortModal);
        }
        if (developFullModal != developFull) {
            basicFollowArr.push('开发商全称由' + developFull + '变更为' + developFullModal);
        }
        if (proNameModal != proName) {
            basicFollowArr.push('项目名由' + proName + '变更为' + proNameModal);
        }
        if ($('#saleStatus>a>span').html() != soldStatus) {
            basicFollowArr.push('在售状态由' + soldStatus + '变更为' + $('#saleStatus>a>span').html());
        }
        if (buildIndex.length > 0) {
            basicFollowArr.push('建筑类型由' + buildTVal + '变更为' + buildArr.join('、'));
        }
        if (propertyAddModal != propertyAdd) {
            basicFollowArr.push('项目地址由' + propertyAdd + '变更为' + propertyAddModal);
        }
        if ($('#cityName').val() != cityVal) {
            basicFollowArr.push('城市由' + cityVal + '变更为' + $('#cityName').val());
        }
        if ($('#boroughDrop>a>span').html() != broghVal) {
            basicFollowArr.push('区域由' + broghVal + '变更为' + $('#boroughDrop>a>span').html());
        }
        if ($('#buildProgress>a>span').html() != progressVal) {
            basicFollowArr.push('建设进度由' + progressVal + '变更为' + $('#buildProgress>a>span').html());
        }
        if ($('#mortgage>a>span').html() != mIndex) {
            basicFollowArr.push('抵押情况由' + mIndex + '变更为' + $('#mortgage>a>span').html());
        }
        if ($('#isSign>a>span').html() != isLimitIndex) {
            basicFollowArr.push('可否限签由' + isLimitIndex + '变更为' + $('#isSign>a>span').html());
        }
        if ($('#isLoan>a>span').html() != loadIndex) {
            basicFollowArr.push('可否贷款由' + loadIndex + '变更为' + $('#isLoan>a>span').html());
        }
        $.ajax({
            type: 'PUT',
            url: floorUrl + 'api/property/v1/updateProperty',
            data: {
                name: proNameModal,
                cityId: thisCityId,
                areaId: thisAreaId,
                adressDetail: propertyAddModal,
                developerFullName: developFullModal,
                developerShortName: developShortModal,
                buildingType: buildTValModal,
                saleStatus: soldStatusModal,
                mortgagePledge: mIndexModal,
                constructionProgress: progressValModal,
                isLoan: loadIndexModal,
                isSign: isLimitIndexModal,
                maintainerId: createUserid,
                longitude: thisLongitude,
                latitude: thisLatitude,
                updateUserId: createUserid,
                id: floorId,
                content: basicFollowArr.join(',')
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('修改成功!');
                    $('#basicModal').before('');
                    $('#basicInfo').append('');
                    floorDetail();
                    followLists();
                    buildInitArr = [];
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                console.log('基本信息修改网络错误');
            }
        });
        $('#myModal1').hide();
        $('#cover').hide();
    });
    $('input.mustNum').blur(function(e) {
        if (!/^[0-9]*$/.test($.trim($(e.target).val()))) {
            alert('请输入合法数值');
            return;
        }
    });
    $('#myModal4').on('click', '.modify', function() {
        var countFollowArr = [];
        var aMoneyModal = $('#totalPrice').val(),
            keshouModal = $('#availablePrice').val(),
            salesAModal = $('#availableArea').val(),
            allAModal = $('#totalArea').val(),
            salesHModal = $('#availableSet').val(),
            allHouModal = $('#totalSet').val();
        if (aMoneyModal != aMoney) {
            countFollowArr.push('总货值由' + aMoney + '变更为' + aMoneyModal);
        }
        if (keshouModal != keshou) {
            countFollowArr.push('可售货值由' + keshou + '变更为' + keshouModal);
        }
        if (salesAModal != salesA) {
            countFollowArr.push('可售面积由' + salesA + '变更为' + salesAModal);
        }
        if (allAModal != allA) {
            countFollowArr.push('总面积由' + allA + '变更为' + allAModal);
        }
        if (salesHModal != salesH) {
            countFollowArr.push('可售套数由' + salesH + '变更为' + salesHModal);
        }
        if (allHouModal != allHou) {
            countFollowArr.push('总套数由' + allHou + '变更为' + allHouModal);
        }
        $.ajax({
            type: 'PUT',
            url: floorUrl + 'api/property/v1/updatePropertyAttribute',
            data: {
                totalValue: aMoneyModal,
                saleValue: keshouModal,
                totalArea: allAModal,
                saleArea: salesAModal,
                totalHouse: allHouModal,
                saleHouse: salesHModal,
                updateUserId: createUserid,
                attributeId: attributeId,
                id: floorId,
                content: countFollowArr.join(',')
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                console.log('体量信息修改网络错误');
            }
        });
        $('#myModal4').hide();
        $('#cover').hide();
    });
    $('#myModal5').on('click', '.modify', function() {
        var saleFollowArr = [];
        var minPrModal = $('#lowTotalPrice').val(),
            maxPrModal = $('#highTotalPrice').val(),
            minPrRModal = $('#lowPrice').val(),
            priceRanModal = $('#highPrice').val(),
            minunderModal = $('#bottomLowPrice').val(),
            maxunderModal = $('#bottomHighPrice').val(),
            minFilingModal = $('#lowRecordPrice').val(),
            maxFilingModal = $('#highRecordPrice').val(),
            saleValiModal = $.trim($('#permitTime').val()),
            saleVaModal = $('#permitCode').val(),
            basicExperienceModal = $('#experienceMenu>li.active').index() == -1 ? experienceInit : $('#experienceMenu>li.active').index() + 1,
            opentimeModal = $.trim($('#openTime').val());
        if (minPrModal != minPr) {
            saleFollowArr.push('总价最小由' + minPr + '变更为' + minPrModal);
        }
        if (maxPrModal != maxPr) {
            saleFollowArr.push('总价最大由' + maxPr + '变更为' + maxPrModal);
        }
        if (minPrRModal != minPrR) {
            saleFollowArr.push('单价最小由' + minPrR + '变更为' + minPrRModal);
        }
        if (priceRanModal != priceRan) {
            saleFollowArr.push('单价最大由' + priceRan + '变更为' + priceRanModal);
        }
        if (minunderModal != minunder) {
            saleFollowArr.push('最底低价由' + minunder + '变更为' + minunderModal);
        }
        if (maxunderModal != maxunder) {
            saleFollowArr.push('最高低价由' + maxunder + '变更为' + maxunderModal);
        }
        if (minFilingModal != minFiling) {
            saleFollowArr.push('最小备案价由' + minFiling + '变更为' + minFilingModal);
        }
        if (maxFilingModal != maxFiling) {
            saleFollowArr.push('最大备案价由' + maxFiling + '变更为' + maxFilingModal);
        }
        if (saleValiModal != saleVali) {
            saleFollowArr.push('许可证有效期由' + saleVali + '变更为' + saleValiModal);
        }
        if (saleVaModal != saleVa) {
            saleFollowArr.push('预售许可证由' + saleVa + '变更为' + saleVaModal);
        }
        if ($('#experience>a>span').html() != basicExperience) {
            saleFollowArr.push('体验情况由' + basicExperience + '变更为' + $('#experience>a>span').html());
        }
        if (opentimeModal != opentime) {
            saleFollowArr.push('开盘时间由' + opentime + '变更为' + opentimeModal);
        }
        $.ajax({
            type: 'PUT',
            url: floorUrl + 'api/property/v1/updatePropertySalesinformation',
            data: {
                minPrice: minPrRModal,
                maxPrice: priceRanModal,
                minAllPrice: minPrModal,
                maxAllPrice: maxPrModal,
                minRecordPrice: minFilingModal,
                maxRecordPrice: maxFilingModal,
                minFloorPrice: minunderModal,
                maxFloorPrice: maxunderModal,
                experience: basicExperienceModal,
                permitForpresale: saleVaModal,
                termofValidity: saleValiModal,
                openPropertyDate: opentimeModal,
                updateUserId: createUserid,
                salesinformationId: salesinformationId,
                id: floorId,
                content: saleFollowArr.join(',')
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                console.log('销售信息修改网络错误');
            }
        });
        $('#myModal5').hide();
        $('#cover').hide();
    });
    $('#saleModelMenu').on('click', 'a', function(e) {
        if ($(e.target).html() == '独家代理') {
            $('#agent0').show();
        } else {
            $('#agent0').hide();
        }
    });
    $('#myModal6').on('click', '.modify', function() {
        var coopFollowArr = [];
        var curIndexModal = $('#saleModelMenu>li.active').index() == -1 ? curInitIndex : $('#saleModelMenu>li.active').index() + 1,
            acceptIndexModal = $('#acceptSaleTypeMenu>li.active').index() == -1 ? acceptInitIndex : $('#acceptSaleTypeMenu>li.active').index() + 1,
            suppIndexModal = supportIndex.join(',') == '' ? supportInitArr.join(',') : supportIndex.join(','),
            urgentIndexModal = $('#urgencyMenu>li.active').index() == -1 ? urgentInitIndex : $('#urgencyMenu>li.active').index() + 1,
            gropeIndexModal = $('#groupSituationMenu>li.active').index() == -1 ? gropeInitIndex : $('#groupSituationMenu>li.active').index() + 1,
            followIndexModal = $('#followUpMenu>li.active').index() == -1 ? followInitIndex : $('#followUpMenu>li.active').index() + 1,
            cIndexModal = $('#commissionMethodMenu>li.active').index() == -1 ? cInitIndex : $('#commissionMethodMenu>li.active').index() + 1,
            bondIndexModal = $('#promiseMenu>li.active').index() == -1 ? bondInitIndex : $('#promiseMenu>li.active').index() + 1;
        var agentNameMArr = [],
            agentStartMArr = [],
            agentEndMArr = [],
            agentNameModal = '',
            agentStartModal = '',
            agentEndModal = '',
            agentIdMArr = [],
            agentIdModal = '';
        var agentCount = $('.agentRow').size();
        if ($('#saleModel>a>span').html() == '独家代理') {
            for (var i = 1; i < agentCount; i++) {
                var thisId = $('#agentCompany' + i).parent().parent().parent().parent().parent().attr('id');
                if (isNaN(parseFloat(thisId))) {
                    thisId = '';
                }
                agentIdMArr.push(thisId);
                agentNameMArr.push($('#agentCompany' + i).val());
                agentStartMArr.push($('#agentTimeStart' + i).val());
                agentEndMArr.push($('#agentTimeEnd' + i).val());
            }
            agentIdModal = agentIdMArr.join(',');
            agentNameModal = agentNameMArr.join(',');
            agentStartModal = agentStartMArr.join(',');
            agentEndModal = agentEndMArr.join(',');
        }
        if (agentNameArr.length != agentNameMArr.length) {
            coopFollowArr.push('代理公司名由' + agentNameArr.join('、') + '变更为' + agentNameMArr.join('、'));
        }
        if (agentStartArr.length != agentStartMArr.length) {
            coopFollowArr.push('代理开始时间由' + agentStartArr.join('、') + '变更为' + agentStartMArr.join('、'));
        }
        if (agentEndArr.length != agentEndMArr.length) {
            coopFollowArr.push('代理结束时间由' + agentEndArr.join('、') + '变更为' + agentEndMArr.join('、'));
        }
        if (curIndexModal != curInitIndex) {
            coopFollowArr.push('目前销售模式由' + curIndex + '变更为' + $('#saleModel>a>span').html());
        }
        if (acceptIndexModal != acceptInitIndex) {
            coopFollowArr.push('可接受销售类型由' + acceptIndex + '变更为' + $('#acceptSaleType>a>span').html());
        }
        if (supportIndex.length > 0) {
            coopFollowArr.push('甲方支持由' + suppIndex + '变更为' + supportArr.join('、'));
        }
        if (urgentIndexModal != urgentInitIndex) {
            coopFollowArr.push('紧急程度由' + urgentIndex + '变更为' + $('#urgency>a>span').html());
        }
        if (gropeIndexModal != gropeInitIndex) {
            coopFollowArr.push('团购收取由' + gropeIndex + '变更为' + $('#groupSituation>a>span').html());
        }
        if (followIndexModal != followInitIndex) {
            coopFollowArr.push('后续效应由' + followIndex + '变更为' + $('#followUp>a>span').html());
        }
        if (cIndexModal != cInitIndex) {
            coopFollowArr.push('佣金方式由' + cIndex + '变更为' + $('#commissionMethod>a>span').html());
        }
        if (bondIndexModal != bondInitIndex) {
            coopFollowArr.push('保证金由' + bondIndex + '变更为' + $('#promise>a>span').html());
        }
        $.ajax({
            type: 'PUT',
            url: floorUrl + 'api/property/v1/updatePropertyCooperation',
            data: {
                agencyId: agentIdModal,
                agencyName: agentNameModal,
                saleType: curIndexModal,
                fristAgentTime: agentStartModal,
                endAgentTime: agentEndModal,
                acceptSaleType: acceptIndexModal,
                partySupport: suppIndexModal,
                bond: bondIndexModal,
                groupPurchase: gropeIndexModal,
                emergencyDegree: urgentIndexModal,
                followEffect: followIndexModal,
                updateUserId: createUserid,
                id: floorId,
                cooperationId: cooperationId,
                content: coopFollowArr.join(','),
                commissionMethod: cIndexModal
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('修改成功!');
                    $('#agent0Rows').html('');
                    floorDetail();
                    followLists();
                    supportInitArr = [];
                    agentNameArr = [];
                    agentStartArr = [];
                    agentEndArr = [];
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                console.log('合作信息修改网络错误');
            }
        });
        $('#myModal6').hide();
        $('#cover').hide();
    });
    $('#myModal7').on('click', '.modify', function() {
        var landFollowArr = [];
        var competitiveModal = $.trim($('#competitiveDate').val()),
            plotRaModal = $('#plotRatioStart').val(),
            landTypeStartModal = $('#landTypeMenu>li.active').index() == -1 ? landTypeInit : $('#landTypeMenu>li.active').index() + 1,
            startPriModal = $('#startingPrice').val(),
            buildingArModal = $('#buildingArea').val(),
            competitivePrModal = $('#competitivePrice').val(),
            floorPrModal = $('#floorPrice').val(),
            propertyRightModal = $('#rightYears').val();
        if (competitiveModal != competitive) {
            landFollowArr.push('竞得日期由' + competitive + '变更为' + competitiveModal);
        }
        if (plotRaModal != plotRa) {
            landFollowArr.push('容积率由' + plotRa + '变更为' + plotRaModal);
        }
        if (startPriModal != startPri) {
            landFollowArr.push('起始价由' + startPri + '变更为' + startPriModal);
        }
        if (buildingArModal != buildingAr) {
            landFollowArr.push('建筑用地面积由' + buildingAr + '变更为' + buildingArModal);
        }
        if (competitivePrModal != competitivePr) {
            landFollowArr.push('竞得价由' + competitivePr + '变更为' + competitivePrModal);
        }
        if (floorPrModal != floorPr) {
            landFollowArr.push('楼面价由' + floorPr + '变更为' + floorPrModal);
        }
        if (propertyRightModal != propertyRight) {
            landFollowArr.push('产权年限由' + propertyRight + '变更为' + propertyRightModal);
        }
        if ($('#landType>a>span').html() != landTypeStart) {
            landFollowArr.push('用地性质由' + landTypeStart + '变更为' + $('#landType>a>span').html());
        }
        $.ajax({
            type: 'PUT',
            url: floorUrl + 'api/property/v1/updatePropertyLand',
            data: {
                competeDate: competitiveModal,
                landArea: buildingArModal,
                startingPrice: startPriModal,
                bidPrice: competitivePrModal,
                volumetricRate: plotRaModal,
                floorPrice: floorPrModal,
                landNature: landTypeStartModal,
                propertyRightLife: propertyRightModal,
                updateUserId: createUserid,
                landId: landId,
                id: floorId,
                content: landFollowArr.join(',')
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                console.log('土地信息修改网络错误');
            }
        });
        $('#myModal7').hide();
        $('#cover').hide();
    });
    $('#myModal8').on('click', '.modify', function() {
        var detailFollowArr = [];
        var plotRatModal = $('#plotRatio').val(),
            propertyCModal = $('#propertyCompany').val(),
            planningModal = $('#planningHouse').val(),
            prTypeModal = $('#propertyTypeMenu>li.active').index() == -1 ? prTypeInit : $('#propertyTypeMenu>li.active').index() + 1,
            parkingModal = $('#parkingSpace').val(),
            storiedBuModal = $('#storiedBuilding').val(),
            coversAModal = $('#coversArea').val(),
            businessCirModal = $('#businessCircle').val(),
            completionTModal = $.trim($('#completionTime').val()),
            checkRoModal = $.trim($('#checkRoom').val()),
            afforestationModal = $('#afforestationRate').val(),
            propertyManageModal = $('#floorManagement').val(),
            decorateIndexModal = $('#decorateMenu>li.active').index() == -1 ? decorateInit : $('#decorateMenu>li.active').index() + 1,
            completeValModal = $('#completeSet').val(),
            constructionAModal = $('#constructionArea').val();
        if (plotRatModal != plotRat) {
            detailFollowArr.push('容积率由' + plotRat + '变更为' + plotRatModal);
        }
        if (propertyCModal != propertyC) {
            detailFollowArr.push('物业公司由' + propertyC + '变更为' + propertyCModal);
        }
        if (planningModal != planning) {
            detailFollowArr.push('规划户数由' + planning + '变更为' + planningModal);
        }
        if (prTypeModal != prTypeInit) {
            detailFollowArr.push('物业类型由' + prType + '变更为' + $('#propertyType>a>span').html());
        }
        if (parkingModal != parking) {
            detailFollowArr.push('车位数由' + parking + '变更为' + parkingModal);
        }
        if (storiedBuModal != storiedBu) {
            detailFollowArr.push('楼栋总数由' + storiedBu + '变更为' + storiedBuModal);
        }
        if (coversAModal != coversA) {
            detailFollowArr.push('占地面积由' + coversA + '变更为' + coversAModal);
        }
        if (businessCirModal != businessCir) {
            detailFollowArr.push('周边商圈由' + businessCir + '变更为' + businessCirModal);
        }
        if (completionTModal != completionT) {
            detailFollowArr.push('竣工时间由' + completionT + '变更为' + completionTModal);
        }
        if (checkRoModal != checkRo) {
            detailFollowArr.push('最早交房由' + checkRo + '变更为' + checkRoModal);
        }
        if (afforestationModal != afforestation) {
            detailFollowArr.push('绿化率由' + afforestation + '变更为' + afforestationModal);
        }
        if (propertyManageModal != propertyManage) {
            detailFollowArr.push('物业费用由' + propertyManage + '变更为' + propertyManageModal);
        }
        if (decorateIndexModal != decorateInit) {
            detailFollowArr.push('装修情况由' + decorateIndex + '变更为' + $('#decorate>a>span').html());
        }
        if (completeValModal != completeVal) {
            detailFollowArr.push('配套设施由' + completeVal + '变更为' + completeValModal);
        }
        if (constructionAModal != constructionA) {
            detailFollowArr.push('建筑面积由' + constructionA + '变更为' + constructionAModal);
        }
        $.ajax({
            type: 'PUT',
            url: floorUrl + 'api/property/v1/updatePropertyDetail',
            data: {
                managmentCompany: propertyCModal,
                completionTime: completionTModal,
                propertyType: prTypeModal,
                earliestProvide: checkRoModal,
                plotRatio: plotRatModal,
                greeningRatio: afforestationModal,
                planHouseholds: planningModal,
                propertyFee: propertyManageModal,
                parkingNumber: parkingModal,
                decorationStatus: decorateIndexModal,
                buildingNumber: storiedBuModal,
                supportingFacilities: completeValModal,
                structureArea: constructionAModal,
                floorArea: coversAModal,
                businessCircle: businessCirModal,
                updateUserId: createUserid,
                id: floorId,
                propertyDetailId: detailId,
                content: detailFollowArr.join(',')
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('修改成功!');
                    floorDetail();
                    followLists();
                } else {
                    alert('修改失败!');
                }
            },
            error: function() {
                console.log('土地信息修改网络错误');
            }
        });
        $('#myModal8').hide();
        $('#cover').hide();
    });
    function followRecord(t) {
        var followValHtml = '';
        if (t != '') {
            var followVal = t.split(',');
            for (var i = 0; i < followVal.length; i++) {
                followValHtml += ("\n            <li>" + (i + 1) + "、" + followVal[i] + "</li>\n            ");
            }
        }
        return followValHtml;
    }
    var thispageNum = 1,
        thispageSize = 10,
        followStatusIndex = 0,
        followTargetIndex = 0;
    var followListCount,
        pageSize;
    function followLists() {
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/property/v1/property_gjPage',
            data: {
                propertyId: floorId,
                pageNum: thispageNum,
                pageSize: thispageSize,
                followStatus: followStatusIndex,
                followTarget: followTargetIndex
            },
            success: function(data) {
                if (data.status == 'success') {
                    var followData = data.data.data;
                    followListCount = data.data.dataCount;
                    pageSize = Math.ceil(followListCount / 10);
                    if (followListCount == 0) {
                        $('#pageNum').html('');
                    }
                    var followHtml = '';
                    if (followData.length > 0) {
                        $.each(followData, function(i) {
                            var fProgressHtml = '',
                                fTypeHtml = '',
                                fObjHtml = '',
                                hasAttachHtml = '';
                            if (followData[i].followPhase) {
                                fProgressHtml = ("<span class=\"fProgress\">" + followData[i].followPhase + "</span>");
                            }
                            if (followData[i].followStatus) {
                                fTypeHtml = ("<span class=\"fType\">" + followData[i].followStatus + "</span>");
                            }
                            if (followData[i].followTarget) {
                                fObjHtml = ("<span class=\"fObj\">" + followData[i].followTarget + "</span>");
                            }
                            if (followData[i].followAttach != '') {
                                hasAttachHtml = ("\n                                <li class=\"fileLi clear\">\n                                    <a href=\"http://images.ehaofang.com/" + followData[i].followAttach + "\" class=\"gt downLoad\">下载</a><img src=\"../static/img/file.png\" alt=\"\"/><span class=\"file\">" + fileName + "</span>\n                                </li>\n                                ");
                            }
                            followHtml += ("\n                            <ul class=\"gt\">\n                                " + hasAttachHtml + "\n                                <li class=\"timeLi clear\">\n                                    <span class=\"gt time\">" + followData[i].followTime + "</span><img src=\"../static/img/time.png\" alt=\"\"/>\n                                </li>\n                            </ul>\n                            <ul class=\"lists\">\n                                <li>\n                                    <b>" + followData[i].followName + "</b>" + (fProgressHtml + fTypeHtml + fObjHtml) + "\n                                </li>\n                                <li>\n                                    <ul id=\"followLists\">\n                                    " + followRecord(followData[i].followUpdate) + "\n                                    </ul>\n                                </li>\n                                <li>" + followData[i].followRemark + "</li>\n                            </ul>\n                            ");
                        });
                        $('#followMenu').html(followHtml);
                        var pageHtml = '',
                            styleHtml = '';
                        if (pageSize == 0) {
                            pageSize = 1;
                        }
                        if (pageSize < 7) {
                            for (var i = 1; i <= pageSize; i++) {
                                pageHtml += ("\n                               <li><a class=\"" + i + "\">" + i + "</a></li>\n                             ");
                            }
                            $('#pageNum').html(pageHtml);
                        } else {
                            styleHtml += ("\n                              <li><a class=\"1\">1</a></li>\n                              <li><a class=\"2\">2</a></li>\n                              <li><a class=\"3\">3</a></li>\n                              <li><a class=\"4\">4</a></li>\n                              <li class=\"more\"><a>...</a></li>\n                              <li class=\"gtFour\"><a></a></li>\n                              <li class=\"nextMore\"><a>...</a></li>\n                              <li><a class=\"" + pageSize + "\">" + pageSize + "</a></li>\n                            ");
                            $('#pageNum').html(styleHtml);
                        }
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
                        $('#pageNum>li>a.' + thispageNum).parent().addClass('active');
                    }
                } else {
                    alert('获取跟进列表失败');
                }
            },
            error: function() {
                console.log('获取跟进记录网络错误');
            }
        });
    }
    followLists();
    $('#followTypeMenu>li').click(function() {
        followStatusIndex = $('#followTypeMenu>li.active').index() + 1;
        followLists();
    });
    $('#followObjMenu>li').click(function() {
        followTargetIndex = $('#followObjMenu>li.active').index() + 1;
        followLists();
    });
    $('#followSelect').on('click', '.modifyBtn', function() {
        $('#followEdit').show();
    });
    var followProIndex,
        followEditIndex,
        followObjEditIndex,
        followText;
    function followEdit() {
        $.ajax({
            type: 'post',
            url: floorUrl + 'api/property/v1/addPropetyFollow',
            data: {
                followStatus: followEditIndex,
                followPhase: followProIndex,
                followRemark: followText,
                followAttach: fileUrl,
                followTarget: followObjEditIndex,
                userId: createUserid,
                id: floorId
            },
            success: function(data) {
                if (data.status == 'success') {
                    alert('新增成功!');
                    followLists();
                    $('#followProgress>a>span').html('请选择');
                    $('#followTypeEdit>a>span').html('请选择');
                    $('#followObjEdit>a>span').html('请选择');
                    $('#followText').val('');
                } else {
                    alert('新增失败!');
                }
            },
            error: function() {
                console.log('提交跟进网络错误');
            }
        });
    }
    $('#submit').on('click', function() {
        followProIndex = $('#followProgressMenu>li.active').index() + 1;
        followEditIndex = $('#followTypeEditMenu>li.active').index() + 1;
        followObjEditIndex = $('#followObjEditMenu>li.active').index() + 1;
        followText = $('#followText').val();
        followEdit();
    });
    $('#pageNum').on('click', 'li:not(.more)>a', function(e) {
        $(e.target).parent().addClass('active').siblings().removeClass('active');
        thispageNum = $(e.target).html();
        followLists();
        if (thispageNum <= 4) {
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if (thispageNum >= followListCount) {
            $('#pageNum>li.nextMore').hide();
            $('#pageNum>li.gtFour').hide();
        }
        if (thispageNum == 1) {
            $('#pages>ul>li.prev').addClass('disabled').siblings().removeClass('disabled');
        } else {
            $('#pages>ul>li.prev').removeClass('disabled');
        }
        if (thispageNum == followListCount) {
            $('#pages>ul>li.next').addClass('disabled').siblings().removeClass('disabled');
        } else {
            $('#pages>ul>li.next').removeClass('disabled');
        }
    });
    $('#pages>ul>li.next').on('click', 'a', function(e) {
        thispageNum++;
        followLists();
        $('#pages>ul>li.prev').removeClass('disabled');
        if (thispageNum <= 4) {
            $('#pageNum>li.active').removeClass('active').next().addClass('active');
        }
    });
    $('#pages>ul>li.prev').on('click', 'a', function(e) {
        thispageNum--;
        followLists();
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