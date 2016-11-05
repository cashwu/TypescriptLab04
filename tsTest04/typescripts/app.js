//// 練習實作
// 上課實作
var ShoppingCart;
(function (ShoppingCart_1) {
    var VipDiscounter = (function () {
        function VipDiscounter() {
        }
        VipDiscounter.prototype.calculate = function (price, qty) {
            var totalPrice = price * qty;
            if (totalPrice > 500) {
                return totalPrice * 0.8;
            }
            return totalPrice;
        };
        return VipDiscounter;
    }());
    var NormalDiscounter = (function () {
        function NormalDiscounter() {
        }
        NormalDiscounter.prototype.calculate = function (price, qty) {
            var totalPrice = price * qty;
            if (totalPrice > 1000 && qty > 3) {
                return totalPrice * 0.5;
            }
            return totalPrice;
        };
        return NormalDiscounter;
    }());
    var MemberLever;
    (function (MemberLever) {
        MemberLever[MemberLever["VIP"] = 0] = "VIP";
        MemberLever[MemberLever["Normal"] = 1] = "Normal";
    })(MemberLever || (MemberLever = {}));
    var DiscounterFactory = (function () {
        function DiscounterFactory() {
        }
        DiscounterFactory.getDiscounter = function (level) {
            if (level == MemberLever.VIP) {
                return new VipDiscounter();
            }
            else if (level == MemberLever.Normal) {
                return new NormalDiscounter();
            }
            return null;
        };
        return DiscounterFactory;
    }());
    var ShoppingCart = (function () {
        function ShoppingCart() {
        }
        ShoppingCart.prototype.calculatDiscountPrice = function (price, qty) {
            var discounter = DiscounterFactory.getDiscounter(MemberLever.VIP);
            if (discounter != null) {
                return discounter.calculate(price, qty);
            }
            return price * qty;
        };
        return ShoppingCart;
    }());
})(ShoppingCart || (ShoppingCart = {}));
var ShoppingCartLab;
(function (ShoppingCartLab) {
    var Calculator = (function () {
        function Calculator(discounterList) {
            this.discounterList = discounterList;
        }
        Calculator.prototype.Calculate = function (price, qty, level) {
            var totalPrice = price * qty;
            for (var _i = 0, _a = this.discounterList; _i < _a.length; _i++) {
                var discounter = _a[_i];
                var discount = discounter.GetDiscount(price, qty, level);
                totalPrice *= discount;
            }
            return totalPrice;
        };
        return Calculator;
    }());
    ShoppingCartLab.Calculator = Calculator;
})(ShoppingCartLab || (ShoppingCartLab = {}));
var ShoppingCartLab;
(function (ShoppingCartLab) {
    var PriceDiscounter = (function () {
        function PriceDiscounter() {
        }
        PriceDiscounter.prototype.GetDiscount = function (price, qty, level) {
            if (price * qty > 500) {
                return 0.9;
            }
            else {
                return 1;
            }
        };
        return PriceDiscounter;
    }());
    ShoppingCartLab.PriceDiscounter = PriceDiscounter;
})(ShoppingCartLab || (ShoppingCartLab = {}));
var ShoppingCartLab;
(function (ShoppingCartLab) {
    var QtyDiscounter = (function () {
        function QtyDiscounter() {
        }
        QtyDiscounter.prototype.GetDiscount = function (price, qty, level) {
            if (qty > 4) {
                return 0.8;
            }
            else if (qty > 2) {
                return 0.9;
            }
            else {
                return 1;
            }
        };
        return QtyDiscounter;
    }());
    ShoppingCartLab.QtyDiscounter = QtyDiscounter;
})(ShoppingCartLab || (ShoppingCartLab = {}));
var ShoppingCartLab;
(function (ShoppingCartLab) {
    var MemberDiscounter = (function () {
        function MemberDiscounter() {
        }
        MemberDiscounter.prototype.GetDiscount = function (price, qty, level) {
            if (level === "VIP") {
                return 0.9;
            }
            else {
                return 1;
            }
        };
        return MemberDiscounter;
    }());
    ShoppingCartLab.MemberDiscounter = MemberDiscounter;
})(ShoppingCartLab || (ShoppingCartLab = {}));
var Page;
(function (Page) {
    var QtyDiscounter = ShoppingCartLab.QtyDiscounter;
    var PriceDiscounter = ShoppingCartLab.PriceDiscounter;
    var MemberDiscounter = ShoppingCartLab.MemberDiscounter;
    var discounterList = [new QtyDiscounter(), new PriceDiscounter(), new MemberDiscounter()];
    var calculator = new ShoppingCartLab.Calculator(discounterList);
    calculator.Calculate(300, 2, "Normal");
    calculator.Calculate(100, 4, "VIP");
})(Page || (Page = {}));
//# sourceMappingURL=app.js.map