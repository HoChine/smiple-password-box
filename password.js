;(function (win) {
    var PasswordBox = function (config) {
        // 配置
        this.config(config);
        
        // 初始化
        this.init();
        
        this.fnInput();
        this.addStyle();
    }
    PasswordBox.prototype.config = function (config) {
        this.settings = {
            length: 6,
            width: 30,
            height: 30,
            fontSize: 14,
            password: true,
            marginIndex: [],
            margin: 5
        }
        // 覆盖配置
        for (var t in config) {
            this.settings[t] =  config[t];
        }
        // 报错机制
        if (!this.settings.id) {
            throw new Error("缺少参数id")
        }
    }
    PasswordBox.prototype.init = function () {
        var _settings = this.settings;
        this.container = document.getElementById(_settings.id);
        var _dom = ['<ul class="password-container">'];
        for (var i = 0; i < _settings.length; i++) {
            _dom.push('<li><input type="' + (_settings.password ? "password" : "text") + '"></li>')
        }
        _dom.push('</ul>')
        this.container.innerHTML = _dom.join('');
    }
    PasswordBox.prototype.fnInput = function () {
        this.inputBox = this.container.getElementsByTagName("input");
        var THIS = this;
        
        for (var i = 0; i < this.inputBox.length; i++) {
            (function (item, index) {
                item.onkeydown = function (e) {
                    var _this = this;
                    setTimeout(function () {
                        var value = _this.value;
                        var length = value.length;
                        if (length > 1) {
                            console.log(_this.value);
                            _this.value = value[0];
                        }
                        if (length > 0) {
                            THIS.inputBox[index+1] && THIS.inputBox[index+1].focus();
                        }
    
                        if (THIS.inputBox[index-1] && (e.keyCode == 8 || e.keyCode == 37)) {
                            THIS.inputBox[index-1].focus();
                        }else if(e.keyCode == 39 && THIS.inputBox[index+1]){
                            THIS.inputBox[index+1].focus();
                        }
                    },1)
                }
            })(this.inputBox[i], i)
        }
    }
    PasswordBox.prototype.addStyle = function () {
        var _settings = this.settings;
        var styleElements = document.getElementsByTagName('style');
        if (styleElements.length == 0) {
            // 没有就创建一个样式表
            var tempStyle=document.createElement("style");
            tempStyle.setAttribute("type","text/css");
            document.getElementsByTagName("head")[0].appendChild(tempStyle);
        }
        var styleElem = styleElements[0];
        var cssStyles = [
            '.password-container li{float: left;list-style: none;}',
            '.password-container li input{' +
                'box-sizing: border-box;' +
                'text-align: center;' +
                'width: ' + this.settings.width + 'px;' +
                'height: ' + this.settings.height + 'px;' +
                'font-size: ' + this.settings.fontSize + 'px;' +
            '}'
        ]
        if (_settings.marginIndex && _settings.margin) {
            var marginStyle = [];
            for (var i = 0; i < _settings.marginIndex.length; i++) {
                marginStyle.push(
                    '.password-container li:nth-child('+ _settings.marginIndex[i] +'){' +
                        'margin-right:' + _settings.margin + 'px' +
                    '}'
                )
            }
            cssStyles.push(marginStyle.join(''))
        }
        
        if(styleElem.styleSheet){//IE
            styleElem.styleSheet.cssText+= cssStyles.join('\n');
        }else {
            styleElem.appendChild(document.createTextNode(cssStyles.join('\n')));
        }
    }
    PasswordBox.prototype.getData = function () {
        var res = '';
        for (var i = 0; i < this.inputBox.length; i++) {
            var ele = this.inputBox[i];
            res += ele.value
        }
        return res;
    }
    
    win.PasswordBox = PasswordBox;
})(window)