//// 練習實作
// 上課實作
module ShoppingCart {
    interface IDiscounter {
        calculate(price : number, qty: number) : number;
    }

    class VipDiscounter implements  IDiscounter {
        calculate(price: number, qty: number): number {
            let totalPrice = price * qty;
            if (totalPrice > 500) {
                return totalPrice * 0.8;
            }
            return totalPrice;
        }
    }

    class NormalDiscounter implements  IDiscounter {
        calculate(price: number, qty: number): number {
            let totalPrice = price * qty;
            if (totalPrice > 1000 && qty > 3) {
                return totalPrice * 0.5;
            }
            return totalPrice;
        }
    }

    enum MemberLever {
        VIP,
        Normal
    }

    class DiscounterFactory {
        static getDiscounter(level: MemberLever) {
            if (level == MemberLever.VIP) {
                return new VipDiscounter();
            }else if (level == MemberLever.Normal) {
                return new NormalDiscounter();
            }

            return null;
        }
    }


    class ShoppingCart {
        calculatDiscountPrice(price: number, qty: number) : number {
            var discounter = DiscounterFactory.getDiscounter(MemberLever.VIP);
            if (discounter != null) {
                return discounter.calculate(price, qty);
            }

            return price * qty;
        }
    }
}


// Lab

module ShoppingCartLab {
    export interface IDiscounter {
        GetDiscount(price: number, qty: number, level: string);
    }
}

module ShoppingCartLab {

    export class Calculator {
        constructor(private discounterList: IDiscounter[]) {
            
        }

        Calculate(price : number, qty : number, level: string) {
            let totalPrice = price * qty;

            for (let discounter of this.discounterList) {
                var discount = discounter.GetDiscount(price, qty, level);
                totalPrice *= discount;
            }

            return totalPrice;
        }
    }
}

module ShoppingCartLab {
    export class PriceDiscounter implements IDiscounter {
        GetDiscount(price: number, qty: number, level: string) {
            if (price * qty > 500) {
                return 0.9;
            } else {
                return 1;
            }
        }
    }
}

module ShoppingCartLab {
    export class QtyDiscounter implements IDiscounter {
        GetDiscount(price: number, qty: number, level: string) {
            if (qty > 4) {
                return 0.8;
            }
            else if (qty > 2) {
                return 0.9;
            } else {
                return 1;
            }
        }
    }
}

module ShoppingCartLab {
    export class MemberDiscounter implements IDiscounter {
        GetDiscount(price: number, qty: number, level: string) {
            if (level === "VIP") {
                return 0.9;
            } else {
                return 1;
            }
        }
    }
}

module Page {
    import QtyDiscounter = ShoppingCartLab.QtyDiscounter;
    import PriceDiscounter = ShoppingCartLab.PriceDiscounter;
    import MemberDiscounter = ShoppingCartLab.MemberDiscounter;

    let discounterList: ShoppingCartLab.IDiscounter[] = [new QtyDiscounter(), new PriceDiscounter(), new MemberDiscounter()];
    let calculator = new ShoppingCartLab.Calculator(discounterList);
    calculator.Calculate(300, 2, "Normal");
    calculator.Calculate(100, 4, "VIP");
}